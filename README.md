# daohang

纯静态卡片式导航站（HTML / CSS / JavaScript），无需构建工具，数据保存在浏览器 `localStorage`。

## 运行

直接用浏览器打开 `index.html`，或启动本地静态服务器：

```bash
npx serve .
```

## 功能

- **分类导航**：内置「人工智能」「财经资讯」「开发工具」三类常用站点，可按分类筛选
- **添加导航**：点击右上角「添加导航」，填写名称、网址、描述并选择分类，也可新建自定义分类
- **删除导航**：鼠标悬停卡片，点击右上角 `×` 删除
- **搜索**：顶部搜索框按名称 / 描述实时过滤
- **数据持久化**：自定义内容保存在 `localStorage`，刷新不丢失
- **恢复默认**：底部「恢复默认数据」可还原内置导航

## 目录结构

```
daohang/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── data.js    内置分类与站点数据
│   └── main.js    渲染、搜索、增删与本地存储逻辑
└── README.md
```

## 部署

| 平台 | 仓库 / 地址 |
| --- | --- |
| CNB（Git） | https://cnb.cool/joojen/daohang |
| GitHub（Git） | https://github.com/joojen/daohang |
| Cloudflare Pages | https://daohang-2q5.pages.dev |

本地已配置两个远端，一次推送即可同步到两边：

```bash
git push origin main     # CNB
git push github main     # GitHub
```

手动部署到 Cloudflare Pages（需已登录 wrangler）：

```bash
npx wrangler pages deploy . --project-name daohang --branch main
```

## 自定义内置数据

编辑 `js/data.js`：

```js
const DEFAULT_SITES = [
  { title: '名称', desc: '描述', url: 'https://example.com', category: 'ai' }
];
```

`category` 需与 `DEFAULT_CATEGORIES` 中的 `id` 对应。修改后如需生效，点击页面底部「恢复默认数据」。
