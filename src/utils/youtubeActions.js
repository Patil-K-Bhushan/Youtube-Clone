const BASE = "https://youtube.googleapis.com/youtube/v3";

const post = async (url, token, body) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.status === 204 ? null : res.json();
};

export const postLiveChatMessage = (token, liveChatId, text) =>
  post(`${BASE}/liveChat/messages?part=snippet`, token, {
    snippet: {
      liveChatId,
      type: "textMessageEvent",
      textMessageDetails: { messageText: text },
    },
  });

export const rateVideo = (token, videoId, rating) =>
  post(`${BASE}/videos/rate?id=${videoId}&rating=${rating}`, token);

export const subscribeToChannel = (token, channelId) =>
  post(`${BASE}/subscriptions?part=snippet`, token, {
    snippet: { resourceId: { kind: "youtube#channel", channelId } },
  });
