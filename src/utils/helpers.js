export const formatCount = (count) =>
  Intl.NumberFormat("en-US", { notation: "compact" }).format(
    Number(count) || 0,
  );

export const timeAgo = (dateString) => {
  const seconds = Math.floor((Date.now() - new Date(dateString)) / 1000);
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [name, secs] of units) {
    const value = Math.floor(seconds / secs);
    if (value >= 1) return `${value} ${name}${value > 1 ? "s" : ""} ago`;
  }
  return "just now";
};

export const makeLocalComment = (text) => ({
  id: crypto.randomUUID
    ? crypto.randomUUID()
    : `local-${Date.now()}-${Math.random()}`,
  author: "You",
  avatar: null,
  text,
  likeCount: 0,
  publishedAt: new Date().toISOString(),
  isLocal: true,
  replies: [],
});

export const parseDuration = (durationStr) => {
  if (!durationStr) return "";
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";
  const hours = match[1] ? parseInt(match[1]) : 0;
  const minutes = match[2] ? parseInt(match[2]) : 0;
  const seconds = match[3] ? parseInt(match[3]) : 0;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};
