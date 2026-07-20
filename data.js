/*
 * 网站内容配置。
 * 以后要改文字、换图片/视频,只需要改这个文件里的值,不用碰 index.html / main.js / style.css。
 * 图片、视频文件放进 assets/ 文件夹,然后把对应的路径填进下面的字段里。
 * 暂时留空(""）的字段会自动显示一个占位色块,不会报错或显示"图片损坏"图标。
 */

const SITE = {
  name: "JIMMY LIU",
  tagline: "摄影 / 影像作品集",
  email: "streetlights670@gmail.com",
  instagram: "" // 例如 "https://instagram.com/你的用户名"
};

const HERO = {
  video: "assets/hero.mp4", // 首页大屏循环播放的混剪视频
  poster: "assets/hero-poster.jpg", // 视频加载出来之前的背景图
  title: SITE.name,
  subtitle: SITE.tagline
};

// type: "video" 或 "photo"
// video 类型: video 字段填视频文件路径, poster 填封面图路径
// photo 类型: images 是这一组照片的路径数组; 如果还没有真实图片,用 count 指定占位图张数
const WORKS = [
  { id: 1, type: "video", title: "城市夜行", category: "影像", year: 2026, video: "", poster: "", colorClass: "ph-1" },
  { id: 2, type: "photo", title: "山间光影", category: "风光摄影", year: 2025, images: [], count: 4, colorClass: "ph-2" },
  { id: 3, type: "video", title: "海岸线", category: "影像", year: 2025, video: "", poster: "", colorClass: "ph-3" },
  { id: 4, type: "photo", title: "人像特写", category: "人像摄影", year: 2025, images: [], count: 1, colorClass: "ph-4" },
  { id: 5, type: "video", title: "街头速写", category: "影像", year: 2025, video: "", poster: "", colorClass: "ph-5" },
  { id: 6, type: "photo", title: "旅行记录", category: "旅拍", year: 2024, images: [], count: 6, colorClass: "ph-6" },
  { id: 7, type: "video", title: "光影实验", category: "影像", year: 2024, video: "", poster: "", colorClass: "ph-7" },
  { id: 8, type: "photo", title: "黑白影像", category: "静物摄影", year: 2024, images: [], count: 3, colorClass: "ph-8" },
  { id: 9, type: "video", title: "四季", category: "影像", year: 2024, video: "", poster: "", colorClass: "ph-1" }
];

const ABOUT = {
  bio: "你好,我是 Jimmy,一名专注于影像与摄影的创作者。我的作品游走于静态照片与动态影像之间,喜欢捕捉光影、城市与人之间稍纵即逝的关系。这里收录了我近期的部分创作,欢迎交流与合作。",
  avatar: "" // assets/avatar.jpg,留空则显示渐变占位圆形头像
};
