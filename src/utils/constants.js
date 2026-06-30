const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const BASE = "https://youtube.googleapis.com/youtube/v3";

export const MOST_POPULAR_API = (categoryId) =>
  `${BASE}/videos?part=snippet,statistics,contentDetails&chart=mostPopular&maxResults=50&regionCode=IN${
    categoryId ? `&videoCategoryId=${categoryId}` : ""
  }&key=${KEY}`;

export const VIDEO_BY_ID_API = (id) =>
  `${BASE}/videos?part=snippet,statistics,liveStreamingDetails&id=${id}&key=${KEY}`;

export const LIVE_CHAT_API = (liveChatId, pageToken = "") =>
  `${BASE}/liveChat/messages?part=snippet,authorDetails&liveChatId=${liveChatId}&maxResults=200${
    pageToken ? `&pageToken=${pageToken}` : ""
  }&key=${KEY}`;

export const COMMENTS_API = (id) =>
  `${BASE}/commentThreads?part=snippet,replies&videoId=${id}&maxResults=50&order=relevance&key=${KEY}`;

export const CHANNELS_API = (ids) =>
  `${BASE}/channels?part=snippet&id=${ids.join(",")}&key=${KEY}`;

export const VIDEOS_BY_IDS_API = (ids) =>
  `${BASE}/videos?part=snippet,statistics,contentDetails&id=${ids.join(",")}&key=${KEY}`;

export const SEARCH_API = (q) =>
  `${BASE}/search?part=snippet&type=video&maxResults=50&regionCode=IN&q=${encodeURIComponent(q)}&key=${KEY}`;

export const SUGGEST_API = "/complete/search?client=firefox&ds=yt&q=";
