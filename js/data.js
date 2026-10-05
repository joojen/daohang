const DEFAULT_CATEGORIES = [
  { id: 'mine', name: '我的网站', icon: '⭐' },
  { id: 'ai', name: '人工智能', icon: '🤖' },
  { id: 'finance', name: '财经资讯', icon: '📈' },
  { id: 'dev', name: '开发工具', icon: '🛠️' }
];

const DEFAULT_SITES = [
  // 我的网站
  { title: 'JZhou个人网站', desc: 'joojen 的个人主页与作品', url: 'https://joojen.com', category: 'mine' },
  { title: '兜兜爸投资备忘录', desc: '投资记录与思考笔记', url: 'https://ddbzhou.com', category: 'mine' },

  // 人工智能
  { title: 'DeepSeek', desc: '国产高性能大模型，免费开放', url: 'https://chat.deepseek.com', category: 'ai' },
  { title: '豆包', desc: '字节跳动 AI 助手', url: 'https://www.doubao.com', category: 'ai' },
  { title: 'Kimi', desc: '长文本对话与资料阅读', url: 'https://kimi.moonshot.cn', category: 'ai' },
  { title: '通义千问', desc: '阿里云大模型与效率工具', url: 'https://tongyi.aliyun.com', category: 'ai' },
  { title: '文心一言', desc: '百度大模型对话平台', url: 'https://yiyan.baidu.com', category: 'ai' },
  { title: 'ChatGPT', desc: 'OpenAI 对话助手', url: 'https://chat.openai.com', category: 'ai' },
  { title: 'Claude', desc: 'Anthropic 长上下文助手', url: 'https://claude.ai', category: 'ai' },
  { title: 'Gemini', desc: 'Google 多模态大模型', url: 'https://gemini.google.com', category: 'ai' },
  { title: 'Hugging Face', desc: '模型与数据集社区', url: 'https://huggingface.co', category: 'ai' },
  { title: '秘塔搜索', desc: '无广告 AI 搜索引擎', url: 'https://metaso.cn', category: 'ai' },

  // 财经资讯
  { title: '东方财富', desc: '行情、资讯与基金数据', url: 'https://www.eastmoney.com', category: 'finance' },
  { title: '同花顺', desc: '行情软件与财经门户', url: 'https://www.10jqka.com.cn', category: 'finance' },
  { title: '雪球', desc: '投资者社区与组合讨论', url: 'https://xueqiu.com', category: 'finance' },
  { title: '财联社', desc: '快讯与深度财经报道', url: 'https://www.cls.cn', category: 'finance' },
  { title: '新浪财经', desc: '全球市场行情与资讯', url: 'https://finance.sina.com.cn', category: 'finance' },
  { title: '华尔街见闻', desc: '全球宏观与市场解读', url: 'https://wallstreetcn.com', category: 'finance' },
  { title: '第一财经', desc: '财经新闻与数据服务', url: 'https://www.yicai.com', category: 'finance' },
  { title: '金十数据', desc: '实时快讯与行情日历', url: 'https://www.jin10.com', category: 'finance' },
  { title: '巨潮资讯', desc: '上市公司公告披露', url: 'http://www.cninfo.com.cn', category: 'finance' },

  // 开发工具
  { title: 'GitHub', desc: '代码托管与协作', url: 'https://github.com', category: 'dev' },
  { title: 'MDN Web Docs', desc: 'Web 技术权威文档', url: 'https://developer.mozilla.org', category: 'dev' },
  { title: 'Can I use', desc: '浏览器兼容性查询', url: 'https://caniuse.com', category: 'dev' },
  { title: 'Stack Overflow', desc: '程序员问答社区', url: 'https://stackoverflow.com', category: 'dev' },
  { title: 'npm', desc: '前端包仓库', url: 'https://www.npmjs.com', category: 'dev' },
  { title: 'Vite', desc: '现代化前端构建工具', url: 'https://vitejs.dev', category: 'dev' },
  { title: 'Tailwind CSS', desc: '原子化 CSS 框架', url: 'https://tailwindcss.com', category: 'dev' },
  { title: 'Figma', desc: '界面设计与协作', url: 'https://www.figma.com', category: 'dev' },
  { title: 'CodePen', desc: '在线前端代码实验场', url: 'https://codepen.io', category: 'dev' },
  { title: 'iconfont', desc: '阿里巴巴矢量图标库', url: 'https://www.iconfont.cn', category: 'dev' },
  { title: '菜鸟教程', desc: '编程基础入门文档', url: 'https://www.runoob.com', category: 'dev' }
];
