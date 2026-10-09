# MomCo Tokyo — 官网（静态站）

纯静态页面，无需构建：`index.html` + `styles.css` + `app.js` + `assets/`。
直接双击 `index.html` 或放到任意静态托管即可。

## 目录

| 文件 | 说明 |
|---|---|
| `index.html` | 页面结构，**日文文案直接写在这里** |
| `app.js` | 英文翻译表（`english` 对象）+ 日/英切换逻辑 |
| `styles.css` | 全部样式（含 1050 / 760 / 370px 断点、打印样式） |
| `assets/hero-photo.webp` | 首屏照片（从 A3 英文海报 300dpi 原图裁出，带透明曲线边） |
| `assets/register-qr.png` | 报名表二维码（内容为 `https://forms.gle/9KYzrbFyqxYVgSMz6`，与页面按钮链接同一表单） |
| `assets/momco-japanese.pdf` / `momco-english.pdf` | 页面底部可下载的 A3 海报 |
| `assets/favicon.svg` | 站点图标 |

## 改文案

- 日文：改 `index.html` 里对应元素的文字。
- 英文：改 `app.js` 里 `english` 对象中同名 key（key 与 HTML 的 `data-i18n="..."` 一一对应）。
  换行用 `\n`。
- 新增一段文字时：HTML 元素加 `data-i18n="newKey"`，并在 `app.js` 补 `newKey: '...'`。
- 报名表链接、邮箱、地图链接、时间地点都在 `index.html` 里搜索替换即可。

语言切换：默认日文；`?lang=en` 可直达英文；用户的选择会记在 localStorage。

## 更新海报 PDF

把新的 PDF 覆盖到 `assets/momco-japanese.pdf` / `assets/momco-english.pdf`，文件名不变即可。现在放的还是旧的 A3 版；新版海报是 `成品/MomCo_MomKid_A5_日英.pdf`（A5，第 1 页英文、第 2 页日文）。

## 部署

**现在的线上地址**：https://vastsea8890-ux.github.io/momco-website/
由公开仓库 `vastsea8890-ux/momco-website` 的 GitHub Pages（main / root）发布。
源文件以 `tmc-church/代码/momco-website/` 为准，**只改这里，不要直接改公开仓库**。
改完提交并推送 `tmc-church` 的 main，GitHub Actions（`.github/workflows/sync-momco-website.yml`）会自动把这个文件夹同步到公开仓库，1〜2 分钟后上线。
要手动重新发布：GitHub 上 tmc-church → Actions → Sync MomCo website → Run workflow。

其他托管方式（都是把这个文件夹原样上传）：

- **Netlify / Cloudflare Pages**：把文件夹拖进控制台即可。
- 教会现有网站空间：FTP 上传到某个子目录（如 `/momco/`），所有路径都是相对路径，放哪都能用。

上线拿到正式域名后建议补两项（现在因为没有域名先空着）：

1. 已加 canonical / og:url 指向 GitHub Pages 地址；换自定义域名时同步改掉
2. 加 `<meta property="og:image" content="https://正式域名/assets/og.png">`（1200×630 分享图，需另做）
