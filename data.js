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
// credits: 视频作品详情页底部的 Credits 表格,留空的字段不会显示那一行
const WORKS = [
  { id: 9, type: "video", title: "Cascade", category: "Visual Poem", year: 2023, video: "", poster: "assets/poster-cascade.jpg", colorClass: "ph-1",
    credits: { directedBy: "", writtenBy: "", cinematographyBy: "Jimmy Liu", editedBy: "", colourBy: "", camera: "Sony FX3", aspectRatio: "2.39:1", runtime: "" } },
  { id: 1, type: "video", title: "Soleil's Summer", category: "Short Film", year: 2024, video: "", poster: "assets/poster-soleils-summer.jpg", colorClass: "ph-1",
    credits: { directedBy: "", writtenBy: "", cinematographyBy: "Jimmy Liu", editedBy: "", colourBy: "", camera: "Sony FX3", aspectRatio: "2.39:1", runtime: "" } },
  { id: 3, type: "video", title: "Something Different Nothing Different", category: "Short Film", year: 2023, video: "", poster: "assets/poster-something-different.jpg", colorClass: "ph-3",
    credits: { directedBy: "Jimmy Liu", writtenBy: "Jimmy Liu", cinematographyBy: "UGU", editedBy: "", colourBy: "", camera: "Sony FX3", aspectRatio: "2.39:1", runtime: "" } },
  { id: 5, type: "video", title: "A Day of Reiko", category: "Mood Film", year: 2024, video: "", poster: "assets/poster-a-day-of-reiko.jpg", colorClass: "ph-5",
    credits: { directedBy: "Raine", writtenBy: "", cinematographyBy: "Jimmy Liu", editedBy: "", colourBy: "", camera: "Sony FX3", aspectRatio: "2.39:1", runtime: "" } },
  { id: 7, type: "video", title: "Yi Crafts", category: "Brand Film", year: 2024, video: "", poster: "assets/poster-yicrafts.jpg", colorClass: "ph-7",
    credits: { directedBy: "Raine", writtenBy: "", cinematographyBy: "Jimmy Liu", editedBy: "", colourBy: "", camera: "Sony FX3", aspectRatio: "2.39:1", runtime: "" } },
  { id: 10, type: "video", title: "Encounter", category: "Short Film", year: 2022, video: "", poster: "assets/poster-encounter.jpg", colorClass: "ph-2",
    credits: { directedBy: "Jimmy Liu", writtenBy: "", cinematographyBy: "", editedBy: "", colourBy: "", camera: "Sony FX3", aspectRatio: "2.39:1", runtime: "" } },
  { id: 12, type: "video", title: "Turner: The Interview", category: "Portrait Film", year: 2025, video: "", poster: "assets/poster-turner-interview.jpg", colorClass: "ph-6",
    credits: { directedBy: "", writtenBy: "", cinematographyBy: "Jimmy Liu", editedBy: "", colourBy: "", camera: "Sony FX3", aspectRatio: "2.39:1", runtime: "" } },
  { id: 11, type: "video", title: "Maxsho: The Interview", category: "Interview", year: 2025, video: "", poster: "assets/poster-maxsho-interview.jpg", colorClass: "ph-4",
    credits: { directedBy: "", writtenBy: "", cinematographyBy: "Jimmy Liu", editedBy: "", colourBy: "", camera: "Sony FX3", aspectRatio: "2.39:1", runtime: "" } },
  { id: 2, type: "photo", title: "Mountain Light", category: "Landscape", year: 2025, images: [], count: 4, colorClass: "ph-2" },
  { id: 4, type: "photo", title: "Portrait Study", category: "Portrait", year: 2025, images: [], count: 1, colorClass: "ph-4" },
  { id: 6, type: "photo", title: "Travel Log", category: "Travel", year: 2024, images: [], count: 6, colorClass: "ph-6" },
  { id: 8, type: "photo", title: "Monochrome", category: "Still Life", year: 2024, images: [], count: 3, colorClass: "ph-8" }
];

const ABOUT = {
  bio: "Hi, I'm Jimmy — a creator focused on film and photography. My work moves between still images and moving pictures, drawn to the fleeting relationships between light, the city, and people. This is a collection of my recent work — feel free to reach out.",
  avatar: "" // assets/avatar.jpg,留空则显示渐变占位圆形头像
};
