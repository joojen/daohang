const STORAGE_KEY = 'daohang.sites.v1';
const CAT_KEY = 'daohang.categories.v1';

let categories = load(CAT_KEY, DEFAULT_CATEGORIES);
let sites = load(STORAGE_KEY, DEFAULT_SITES);
let activeCategory = 'all';
let keyword = '';

const board = document.getElementById('board');
const tabsEl = document.getElementById('tabs');
const emptyEl = document.getElementById('empty');
const searchEl = document.getElementById('search');
const modal = document.getElementById('modal');
const form = document.getElementById('add-form');
const catSelect = document.getElementById('category-select');
const newCatField = document.getElementById('new-cat-field');
const formError = document.getElementById('form-error');

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    return fallback;
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sites));
  localStorage.setItem(CAT_KEY, JSON.stringify(categories));
}

function esc(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function catById(id) {
  return categories.find((c) => c.id === id);
}

function faviconOf(url) {
  try {
    const host = new URL(url).origin;
    return host + '/favicon.ico';
  } catch (e) {
    return '';
  }
}

function ensureCategory(name) {
  const exist = categories.find((c) => c.name === name);
  if (exist) return exist.id;
  const id = 'c_' + Date.now().toString(36);
  categories.push({ id, name, icon: '🔖' });
  return id;
}

function renderTabs() {
  const counts = { all: sites.length };
  sites.forEach((s) => {
    counts[s.category] = (counts[s.category] || 0) + 1;
  });

  const items = [{ id: 'all', name: '全部' }].concat(categories);
  tabsEl.innerHTML = items
    .map(
      (c) => `<button class="tab${c.id === activeCategory ? ' is-active' : ''}" data-cat="${esc(c.id)}" type="button">
        ${c.icon ? `<span class="tab-icon">${esc(c.icon)}</span>` : ''}${esc(c.name)}
        <span class="tab-count">${counts[c.id] || 0}</span>
      </button>`
    )
    .join('');
}

function renderBoard() {
  const kw = keyword.trim().toLowerCase();
  const matched = sites.filter((s) => {
    const inCat = activeCategory === 'all' || s.category === activeCategory;
    const inKw = !kw || (s.title + ' ' + (s.desc || '')).toLowerCase().includes(kw);
    return inCat && inKw;
  });

  const groups = categories
    .map((c) => ({ cat: c, items: matched.filter((s) => s.category === c.id) }))
    .filter((g) => g.items.length);

  board.innerHTML = groups
    .map(
      (g) => `<section class="group">
        <h2 class="group-title"><span class="group-icon">${esc(g.cat.icon || '🔖')}</span>${esc(g.cat.name)}
          <span class="group-count">${g.items.length}</span>
        </h2>
        <div class="cards">
          ${g.items.map(cardHtml).join('')}
        </div>
      </section>`
    )
    .join('');

  emptyEl.hidden = matched.length > 0;
}

function cardHtml(site) {
  return `<a class="card" href="${esc(site.url)}" target="_blank" rel="noopener">
    <button class="card-del" data-id="${esc(site.id)}" type="button" title="删除" aria-label="删除">×</button>
    <div class="card-top">
      <img class="card-icon" src="${esc(faviconOf(site.url))}" alt="" loading="lazy"
           onerror="this.style.visibility='hidden'" />
      <span class="card-title">${esc(site.title)}</span>
    </div>
    <p class="card-desc">${esc(site.desc || site.url)}</p>
    <span class="card-link">立即访问 →</span>
  </a>`;
}

function render() {
  renderTabs();
  renderBoard();
}

function fillCategorySelect() {
  catSelect.innerHTML =
    categories
      .map((c) => `<option value="${esc(c.id)}">${esc(c.name)}</option>`)
      .join('') + '<option value="__new__">+ 新建分类…</option>';
}

function openModal() {
  fillCategorySelect();
  newCatField.hidden = true;
  formError.hidden = true;
  form.reset();
  modal.hidden = false;
  form.querySelector('[name="title"]').focus();
}

function closeModal() {
  modal.hidden = true;
}

/* ---------- 事件 ---------- */

tabsEl.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  activeCategory = tab.dataset.cat;
  render();
});

searchEl.addEventListener('input', (e) => {
  keyword = e.target.value;
  renderBoard();
});

document.getElementById('add-btn').addEventListener('click', openModal);
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('cancel-btn').addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.hidden) closeModal();
});

catSelect.addEventListener('change', () => {
  newCatField.hidden = catSelect.value !== '__new__';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const title = String(data.get('title') || '').trim();
  const url = String(data.get('url') || '').trim();
  const desc = String(data.get('desc') || '').trim();

  if (!title || !url) {
    return showError('请填写名称和网址');
  }
  let urlToUse = url;
  if (!/^https?:\/\//i.test(urlToUse)) urlToUse = 'https://' + urlToUse;
  try {
    new URL(urlToUse);
  } catch (err) {
    return showError('网址格式不正确，请检查后重试');
  }

  let category = catSelect.value;
  if (category === '__new__') {
    const newName = String(data.get('newCategory') || '').trim();
    if (!newName) return showError('请填写新分类名称');
    category = ensureCategory(newName);
  }

  sites.push({ id: 's_' + Date.now().toString(36), title, url: urlToUse, desc, category });
  save();
  render();
  closeModal();
});

function showError(msg) {
  formError.textContent = msg;
  formError.hidden = false;
}

board.addEventListener('click', (e) => {
  const del = e.target.closest('.card-del');
  if (!del) return;
  e.preventDefault();
  e.stopPropagation();
  if (!confirm('确定删除这个导航吗？')) return;
  sites = sites.filter((s) => s.id !== del.dataset.id);
  save();
  render();
});

document.getElementById('reset-btn').addEventListener('click', () => {
  if (!confirm('将清空自定义内容并恢复默认导航数据，确定继续？')) return;
  sites = JSON.parse(JSON.stringify(DEFAULT_SITES));
  categories = JSON.parse(JSON.stringify(DEFAULT_CATEGORIES));
  activeCategory = 'all';
  save();
  render();
});

/* ---------- 初始化 ---------- */

sites = sites.map((s) => (s.id ? s : Object.assign({}, s, { id: 's_' + Math.random().toString(36).slice(2) })));
document.getElementById('year').textContent = new Date().getFullYear();
render();
