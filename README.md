# 潘潘的小站

一个纯静态的个人网站。没有框架、没有构建工具、没有外部依赖，双击 `index.html` 就能看。

风格参考了「超大标题 + 米白底 + 纯黑字 + 极少彩色点缀」的编辑式排版。

## 文件说明

```
个人工作台/
├── index.html        关于我（首页）
├── works.html        作品
├── reading.html      阅读书籍
├── contact.html      联系方式
├── assets/
│   ├── style.css     全站样式（改颜色只需要动文件开头的变量）
│   ├── main.js       页脚年份 + 复制邮箱
│   └── fonts/
│       ├── smiley-sans.woff2   标题字体「得意黑」SIL OFL 授权
│       ├── plex-mono-400.woff2 正文字体 IBM Plex Mono
│       └── plex-mono-600.woff2
├── favicon.svg       站点图标
├── docs/
│   ├── preview/      桌面端 / 移动端 / 深色模式的渲染截图
│   └── superpowers/specs/  改版前的设计分析稿
└── .backup-2026-10-03-old-site/   改版前的旧站，确认不需要可以整个删掉
```

字体都是**自托管**的，页面不会向 Google Fonts 之类的外部服务发请求，国内打开不会卡。

## 本地预览

直接双击 `index.html` 即可。想测复制邮箱这类浏览器功能，可以在目录里起一个本地服务：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000/`。

## 换成你自己的内容

### 邮箱和社交链接

- 打开 `contact.html`，把 `hello@example.com` 换成你的邮箱。
- 同页往下四张卡片（小红书 / 即刻 / GitHub / 微信）现在是不可点的 `<div class="contact-card">`，因为链接还没填。拿到链接后，把那张卡片的 `<div class="contact-card">…</div>` 改成 `<a class="contact-card" href="你的链接">…</a>`，悬停抬起效果会自动出现。
- 作品页同理：有真实链接的作品，把标题改成 `<h2 class="entry-title"><a href="链接">名字</a></h2>`。
- `index.html` 首页没有邮箱，不用改。

### 改名字和自我介绍

- 全站导航里的「潘潘的小站」在四个页面都有，改的时候四个都改。
- 首页超大标题是**手动断行**的，在 `index.html` 里找到 `<h1 class="display">`，里面每个 `<span>` 就是一行。想让标题换行方式变，就调整 `<span>` 的划分。
- 首页右侧是拼贴照片：换头像直接替换 `assets/avatar.webp`（比例约 1:1.09）。票根贴纸改 `<span class="ticket">`，便签改 `<div class="memo">` 里的列表。
- 头像是 AI 生成的插画，照片下方保留了「插画：AI 生成」的标注。
- 「关于我」里的兴趣贴纸在 `<ul class="stickers">`，形状类名有 `sticker--oval / --stamp / --ticket / --star / --circle` 五种。

### 加作品

作品页和阅读页都是「索引」样式：每条一行，从左到右是贴图、标题和说明、笔记、大号分数圆圈。

打开 `works.html`，复制一整块 `<li class="entry">...</li>`，然后改：

| 位置 | 改什么 |
| --- | --- |
| `<figure class="entry-pic pic--orange">` | 贴图。颜色类名可选 `pic--pink / orange / yellow / green / blue / plain`；`<span>` 里放一两个大字。有截图时把 `<span>…</span>` 换成 `<img src="assets/xxx.webp" alt="">` |
| `<span class="entry-no">` | 编号，01、02、03…… |
| `<h2 class="entry-title">` | 项目名，`<a href>` 换成项目链接 |
| `<p class="entry-meta">` | 两个 `<span>`：类型、技术（第二个会加下划线） |
| `<p class="entry-desc">` | 两三句说明 |
| `<span class="stamp-tag …">` | 状态印章：`stamp-tag--orange`（在做）、`--green`（已完成）、`--yellow`（持续更新）、`--blue`（进行中）、`--plain`（占位） |
| `<div class="entry-notes">` | 制作笔记，3–4 条短句 |
| `<span class="score">` | 完成度数字，`<small>%</small>` 是百分号 |

### 加书

`reading.html` 结构和作品页一样，区别是贴图多了 `entry-pic--book`（竖版书封，书名竖排），右边圆圈是「想重读指数」。没想好分数时，用 `<span class="score score--empty">—</span>` 显示虚线空圈。

目前最后一条是**占位示例**，换成你真正读过的书之后删掉它，并把下面那行提示文字也删掉。

### 动效

主题是「贴上去」和「盖章」，样式集中在 `assets/style.css` 的「动效」一节，脚本在 `assets/main.js` 末尾。

- 首页打开：标题按行升起 → 介绍和按钮淡入 → 照片拍到桌面上 → 票根、便签依次贴上，约 1.3 秒播完。
- 滚动到贴纸和作品/书目时才播放，只播一次；分数从 0 数到最终值。
- 所有按钮按下时轻微缩小。
- 系统开了「减少动态」时全部不播放，内容直接显示。
- 想调快慢：改 CSS 里各条 `animation` 的时长和延迟；条目之间的间隔是 `calc(var(--i) * 80ms)`。

### 改颜色

打开 `assets/style.css`，文件最上面 `:root { ... }` 里全是变量：

```css
--ground: #f4efe7;   /* 底色，米白 */
--ink:    #000000;   /* 文字和线条，纯黑 */
--pink:   #fcb8c4;   /* 以下五个是点缀色，只用在标签和卡片阴影 */
--blue:   #2f6fd6;
--orange: #ee6130;
--yellow: #e8a830;
--green:  #c0c888;
```

改这里，四个页面同时生效。深色模式的配色在下面的 `:root[data-theme="dark"]` 里，跟着改一份即可。

有两个变量不要随手删：

- `--tag-ink: #14120f` —— 彩色标签上的文字色。那五个点缀色都是亮色，配近黑字才够清楚（对比度都在 5.6:1 以上）。**无色标签**用的是 `--ink`，因为它落在 `--paper` 上，深浅两种模式都要能读。
- `--on-blue: #ffffff` —— 蓝底上的文字。蓝色偏深，浅色模式用白字；深色模式的蓝换成了亮蓝，所以要配近黑字。

改完颜色建议跑一遍对比度检查：正文要 ≥ 4.5:1，18.66px 以上的粗体或 24px 以上大字要 ≥ 3:1。

## 关于字体

标题用的「得意黑」是开源字体（SIL OFL 1.1），当前文件已经**子集化**到 GB2312 一级字（约 3900 个常用字），体积 490KB。日常改文案够用。

如果之后遇到某个生僻字显示成了系统默认字体，说明它不在子集里。解决办法是重新生成一份更完整的字体文件，把字集换成 GB2312 全集或全字库即可。

## 发布到 GitHub Pages

1. 把本站文件放进 GitHub 仓库根目录，提交到默认分支。
2. 仓库 **Settings → Pages**，选择从分支部署，选默认分支和根目录。
3. 等部署完成，用生成的地址访问。
4. 绑了自定义域名之后，可以在四个页面的 `<head>` 里补一行 `og:url`，分享到微信时卡片更完整。

所有内部链接都是相对路径，放在 GitHub Pages 的子路径下也能正常打开。当前目录还不是 Git 仓库，上线前需要先 `git init` 并建远端仓库。
