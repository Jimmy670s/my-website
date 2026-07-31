# Jimmy Liu 摄影 / 影像作品集网站

**网址** https://jimmy670.com · **仓库** github.com/Jimmy670s/my-website · **本地** `/Users/jimmyliu/Claude/my-website/`

网站主人不写代码,也不打算学。所有编码工作由助手完成,并直接推送上线,不要让他自己改文件或跑命令。
沟通用中文。

---

## 部署方式

- **托管** GitHub Pages(`main` 分支根目录),推送后约 1-3 分钟自动上线
- **域名** jimmy670.com,DNS 在 Cloudflare,目前是「仅 DNS」模式(灰色云朵,未开代理)
- **HTTPS** 已启用 Enforce HTTPS,证书由 Let's Encrypt 自动签发
- **推送用 SSH**,密钥 `~/.ssh/id_ed25519_github_mywebsite` 已配好
- 提交署名统一用:
  ```
  git -c user.name="Jimmy670s" -c user.email="streetlights670@gmail.com" commit -m "..."
  ```

### 每次改完必须做的事:更新版本号

HTML 里所有 CSS/JS 引用都带 `?v=时间戳`。**不更新版本号,他刷新后会看到旧版本**,这个坑之前踩过好几次,他会以为"改了没反应"。

```bash
cd /Users/jimmyliu/Claude/my-website && V=$(date +%Y%m%d%H%M%S) && \
sed -i '' -E "s|(style\.css\?v=)[0-9]+|\1$V|; s|(data\.js\?v=)[0-9]+|\1$V|; s|(main\.js\?v=)[0-9]+|\1$V|; s|(about\.js\?v=)[0-9]+|\1$V|; s|(work\.js\?v=)[0-9]+|\1$V|; s|(contact\.js\?v=)[0-9]+|\1$V|" index.html about.html work.html contact.html
```

推送后线上要等几分钟才生效,验证时用 `curl -sk "https://jimmy670.com/xxx?nc=$RANDOM"` 轮询确认,别用浏览器判断(会被缓存误导)。

---

## 文件结构

| 文件 | 作用 |
|---|---|
| `data.js` | **所有内容都在这里**:作品列表、Credits、简介、联系方式。改文案/换素材只动这个文件 |
| `index.html` + `main.js` | 首页:全屏视频 + 作品网格 |
| `work.html` + `work.js` | 作品详情页,通过 `work.html?id=N` 传参 |
| `about.html` + `about.js` | About 页(导航显示 "About",文件名仍是 about) |
| `contact.html` + `contact.js` | Contact 页 |
| `style.css` | 全站样式 |
| `assets/` | 图片、视频、字体 |

## 设计约定

- **字体** Inter,**自托管**在 `assets/fonts/`。绝对不要改回 Google Fonts —— 国内访问 fonts.googleapis.com 会卡住几十秒,文字一直空白
- **背景** 纯白 `#ffffff`(封面图自带白边,换成米色会不搭)
- **作品详情页** 深色背景,和白色的首页/About 形成对比,这是刻意的
- 悬停作品卡片:黑色细边框(1px,留 4px 间距)+ 图片微微放大填满边框
- 有 `coverVideo` 的作品,悬停时在封面里播放预览片段;手机端没有悬停,改成滑到屏幕中间自动播放

## 素材来源

他把素材放在 **`/Volumes/JimmyB/web/`**(外接硬盘)。聊天里贴的图我拿不到文件,必须让他存到这个文件夹。
封面成品在 `/Volumes/JimmyB/web/color cover/`。

素材处理规范(用 `sips`):
- **封面图** 缩到 800px 宽、质量 72(网格里只显示约 400px,再大是浪费)
- **首页封面图** 1920px 宽、质量 65
- **视频** 他自己用 DaVinci 导出 MP4/H.264,不要试图用命令行转码

---

## 性能:国内访问优化(重要背景)

国内打开曾经**完全加载不出下面的内容**,原因和已做的处理:

1. **Google Fonts 被墙** → 已改为自托管(见上)
2. **首页视频 21MB 抢占带宽**,图片排队等到超时 → `main.js` 里改成 **页面其他内容加载完后才开始下载视频**,期间显示封面图。改这块时务必保留这个延迟逻辑
3. **封面图原本 1400px 宽**(显示只要 400px)→ 已压到 800px,总量 4.2MB → 1.4MB

首屏现在约 1.5MB。**还没做的**:首页视频本身仍是 21MB,建议他重新导出到 5-8MB(码率 2500-3000 Kb/s)。
Cloudflare 橙色云朵代理**建议先不开** —— 免费版在国内没有节点,共享 IP 反而可能被限速,收益不确定。

---

## 待办 / 他可能会继续提的

- 3 个照片作品(Film / Digital / Mobile)还是空占位,等他给照片
- Turner、Maxsho、Live from Saatchi 还没有 `coverVideo` 悬停预览片段
- 所有作品的 `video` 字段都是空的,详情页显示「Video coming soon」占位
- About 页的 `awards` 获奖列表是空数组(填了会自动显示);他提过 Folkestone 和 RTF 两个电影节
- 微信二维码代码接口留着,`wechatQR` 填上图片路径就会启用点击展开

## 沟通经验

- 他会截图并**画红圈/箭头**标注要改的地方,仔细看标注位置
- 他说"没变化"时,**先查是不是缓存**(直接 curl 线上文件确认),别急着改代码
- 预览面板的截图经常渲染异常(标签页在后台时懒加载图片不绘制、平滑滚动不执行),**以 JS 测量数值为准**,不要只看截图下结论
