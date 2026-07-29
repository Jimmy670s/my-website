/*
 * 网站内容配置。
 * 以后要改文字、换图片/视频,只需要改这个文件里的值,不用碰 index.html / main.js / style.css。
 * 图片、视频文件放进 assets/ 文件夹,然后把对应的路径填进下面的字段里。
 * 暂时留空(""）的字段会自动显示一个占位色块,不会报错或显示"图片损坏"图标。
 */

const SITE = {
  name: "JIMMY LIU",
  tagline: "Portfolio / 作品集",
  email: "streetlights670@gmail.com",
  instagram: "", // 例如 "https://instagram.com/你的用户名"
  twitter: "",
  linkedin: ""
};

const HERO = {
  video: "assets/hero.mp4", // 首页大屏循环播放的混剪视频
  poster: "assets/hero-poster.jpg", // 视频加载出来之前的背景图
  title: SITE.name,
  subtitle: SITE.tagline
};

// type: "video" 或 "photo"
// video 类型: video 字段填视频文件路径, poster 填封面图路径
// coverVideo: 鼠标悬停(或手机上滑入屏幕)时,在网格缩略图里播放的预览片段;留空则悬停时还是显示 poster 图
// photo 类型: images 是这一组照片的路径数组; 如果还没有真实图片,用 count 指定占位图张数
// credits: 详情页底部 Credits 表格,是 [标签, 内容] 的数组,按填的顺序显示;不需要的行直接不写
const WORKS = [
  { id: 9, type: "video", title: "Cascade", category: "Visual Poem", year: 2023, video: "", poster: "assets/poster-cascade.jpg", coverVideo: "assets/cover-cascade.mp4", colorClass: "ph-1",
    credits: [["Directed by", "Jimmy Liu"], ["Cinematography by", "Jimmy Liu"], ["Colour by", "Jimmy Liu"], ["Camera", "Fujifilm XT4"], ["Runtime", "05:11"], ["Location", "London, UK"]] },
  { id: 1, type: "video", title: "Soleil's Summer", category: "Short Film", year: 2024, video: "", poster: "assets/poster-soleils-summer.jpg", coverVideo: "assets/cover-soleils-summer.mp4", colorClass: "ph-1",
    credits: [["Directed by", "Yuguang Wang"], ["Cinematography by", "Jimmy Liu"], ["Camera", "ARRI Alexa 35"], ["Runtime", "15:03"], ["Location", "London, UK"]] },
  { id: 3, type: "video", title: "Something Different Nothing Different", category: "Short Film", year: 2023, video: "", poster: "assets/poster-something-different.jpg", coverVideo: "assets/cover-something-different.mp4", colorClass: "ph-3",
    credits: [["Written & Directed by", "Jimmy Liu"], ["Cinematography by", "UGU"], ["Colour by", "Jimmy Liu"], ["Camera", "DJI Ronin 4D"], ["Runtime", "08:34"], ["Location", "London, UK"]] },
  { id: 5, type: "video", title: "A Day of Reiko", category: "Mood Film", year: 2024, video: "", poster: "assets/poster-a-day-of-reiko.jpg", coverVideo: "assets/cover-a-day-of-reiko.mp4", colorClass: "ph-5",
    credits: [["Directed by", "Raine"], ["Cinematography by", "Jimmy Liu"], ["Colour by", "Jimmy Liu"], ["Camera", "Sony FX3"], ["Runtime", "02:18"], ["Location", "London, UK"]] },
  { id: 7, type: "video", title: "Yi Crafts", category: "Brand Film", year: 2024, video: "", poster: "assets/poster-yicrafts.jpg", coverVideo: "assets/cover-yicrafts.mp4", colorClass: "ph-7",
    credits: [["Directed by", "Raine"], ["Cinematography by", "Jimmy Liu"], ["Colour by", "Jimmy Liu"], ["Camera", "Sony A7M4"], ["Runtime", "02:05"], ["Location", "London, UK"]] },
  { id: 10, type: "video", title: "Encounter", category: "Short Film", year: 2022, video: "", poster: "assets/poster-encounter.jpg", coverVideo: "assets/cover-encounter.mp4", colorClass: "ph-2",
    credits: [["Directed by", "Jimmy Liu"], ["Story by", "Jimmy Liu"], ["Camera", "Canon 5D2"], ["Runtime", "10:30"], ["Location", "Xinliao, CN"]] },
  { id: 12, type: "video", title: "Turner: The Interview", category: "Portrait Film", year: 2025, video: "", poster: "assets/poster-turner-interview.jpg", colorClass: "ph-6",
    credits: [["Shot by", "Jimmy Liu"], ["Colour by", "Jimmy Liu"], ["Camera", "Leica SL3, Fujifilm XT4"], ["Runtime", "03:04"]] },
  { id: 11, type: "video", title: "Maxsho: The Interview", category: "Interview", year: 2025, video: "", poster: "assets/poster-maxsho-interview.jpg", colorClass: "ph-4",
    credits: [["Directed & Shot by", "Jimmy Liu"], ["Camera", "Leica SL3"], ["Runtime", "02:24"]] },
  { id: 13, type: "video", title: "Live from Saatchi", category: "Exhibition Film", year: 2026, video: "", poster: "assets/poster-live-from-saatchi.jpg", colorClass: "ph-8",
    credits: [["Shot by", "Jimmy Liu"], ["Colour by", "Jimmy Liu"], ["Camera", "Sony A7M4"], ["Runtime", "04:02"]] },
  { id: 2, type: "photo", title: "Film", category: "Film Photography", year: 2026, images: [], count: 1, colorClass: "ph-2" },
  { id: 4, type: "photo", title: "Digital", category: "Digital Photography", year: 2026, images: [], count: 1, colorClass: "ph-6" },
  { id: 6, type: "photo", title: "Mobile", category: "Mobile Photography", year: 2026, images: [], count: 1, colorClass: "ph-8" }
];

// awards: Information 页的获奖列表,格式 [Client, 评选/奖项方, 奖项名称, 年份],不需要就留空数组(不会显示这个板块)
// services: 页面底部堆叠显示的擅长方向,第一个高亮显示,其余的会变浅
const ABOUT = {
  bio: "Hi, I'm Jimmy — a filmmaker and colourist working between London and China. I specialise in cinematography and colour grading, and I've worked on every stage from shoot to delivery. My work leans towards the emotional and the human — how a moment feels, not just how it looks. My short films have screened at Folkestone and RTF Real-Time Film Festivals. Feel free to reach out.",
  avatar: "assets/avatar.jpg", // 留空则显示渐变占位色块
  clockCity: "London",
  clockTimeZone: "Europe/London",
  awards: [
    // ["Client", "Award Show", "Award Name", "25'"]
  ],
  services: ["Cinematography", "Colour Grading", "Editing"]
};
