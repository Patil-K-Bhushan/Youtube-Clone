export const LIVE_CHAT_LIMIT = 25;

const NAMES = [
  "PixelNinja",
  "CodeWizard",
  "Aarav_07",
  "StreamQueen",
  "devFromMumbai",
  "noobMaster69",
  "reactFanboy",
  "Priya.dev",
  "GG_Gamer",
  "lurker_99",
  "TechBro",
  "SaiTeja",
  "frontend_fox",
  "BetaTester",
  "Anonymous_User",
];

const MESSAGES = [
  "🔥🔥🔥",
  "First!",
  "LET'S GOOO",
  "this is so cool",
  "W stream",
  "where you from?",
  "POG",
  "🐐🐐",
  "underrated fr",
  "❤️ from India",
  "can you do a tutorial on this?",
  "lol",
  "the editing is insane",
  "subscribed!",
  "GG",
  "facts",
  "who's here in 2026?",
  "🎉",
  "respect 🙏",
];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const uid = () =>
  crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

export const randomChatMessage = () => ({
  id: uid(),
  author: pick(NAMES),
  text: pick(MESSAGES),
  isUser: false,
});
export const makeUserMessage = (text) => ({
  id: uid(),
  author: "You",
  text,
  isUser: true,
});

const COLORS = [
  "from-rose-500 to-orange-400",
  "from-blue-500 to-cyan-400",
  "from-violet-500 to-fuchsia-400",
  "from-emerald-500 to-teal-400",
  "from-amber-500 to-yellow-400",
  "from-indigo-500 to-sky-400",
];
export const colorFor = (name) => COLORS[name.charCodeAt(0) % COLORS.length];

export const normalizeLiveMessage = (item) => ({
  id: item.id,
  author: item.authorDetails.displayName,
  avatar: item.authorDetails.profileImageUrl,
  text: item.snippet.displayMessage ?? "",
  isUser: false,
});
