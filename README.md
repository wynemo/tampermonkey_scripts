# Tampermonkey Scripts

这是一个 Tampermonkey 用户脚本集合，包含实用的浏览器增强功能。

## 脚本列表

### 1. NeoDB 安娜档案搜索 (neodb_search.js)

在 NeoDB 书籍页面自动搜索 Anna's Archive，帮助快速找到电子书资源。

**安装地址：** [Greasyfork - NeoDB 安娜档案搜索](https://greasyfork.org/en/scripts/529955-neodb-%E5%AE%89%E5%A8%9C%E6%A1%A3%E6%A1%88%E6%90%9C%E7%B4%A2)

**功能特性：**
- 自动从 NeoDB 书籍页面提取书名
- 在 Anna's Archive 中搜索并显示结果
- 支持自定义 Anna's Archive 域名
- 搜索结果直接显示在页面右侧栏

**支持网站：**
- `https://neodb.social/book/*`

**菜单命令：**
- `⚙️ 设置 Anna's Archive 域名` - 自定义镜像站域名
- `🔄 重置域名为默认值` - 恢复默认配置

---

### 2. 字体更改器 (font_changer.js)

在中文阅读网站上统一修改字体显示，提升阅读体验。

**功能特性：**
- 统一使用 `Zed Mono, LXGW WenKai, LXGW Neo XiHei` 等字体
- 优化阅读器内容的字体大小和行高
- 自动应用于多个阅读平台

**支持网站：**
- `https://weread.qq.com/*` - 微信读书
- `https://web.koodoreader.com/*` - Koodo Reader
- `https://reader.ttsu.app/*` - TT 阅读器

## 安装方法

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. 点击上方 Greasyfork 链接安装脚本，或手动创建新脚本并粘贴代码

## 许可证

MIT License
