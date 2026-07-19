# my-website

个人摄影 / 影像作品集网站,纯 HTML / CSS / JavaScript,无需任何构建工具。

## 文件结构

- `index.html` — 首页(视频大屏 + 作品流)
- `about.html` — Information 页(简介、联系方式)
- `data.js` — 全部内容配置(站点信息、首页视频、作品列表、简介),改文案/换素材只改这个文件
- `main.js` — 渲染与交互逻辑(作品流、灯箱看图看视频等),一般不需要改
- `style.css` — 样式
- `assets/` — 真实图片、视频素材存放位置

## 预览

直接用浏览器打开 `index.html` 即可查看(部分效果如首页视频需要通过本地服务器预览,双击打开也能看大致效果)。

## 在线访问

启用 GitHub Pages 后,可通过以下地址访问:
`https://<你的GitHub用户名>.github.io/my-website/`

之后也可以把 jimmy670.com 的 DNS 指过来,替换掉现在的 Cargo 建站。

## 更新内容

如需替换图片、视频、文字或联系方式,把素材发给负责维护此网站的助手,或告诉ta你想改成什么,不需要自己写代码或碰 `data.js`。
