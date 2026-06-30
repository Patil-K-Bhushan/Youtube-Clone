import { useState } from "react";
import { useSelector } from "react-redux";
import { useWatch } from "../../context/WatchContext";
import { subscribeToChannel } from "../../utils/youtubeActions";

const SubscribeButton = () => {
  const { video } = useWatch();
  const accessToken = useSelector((store) => store.auth.accessToken);
  const [subscribed, setSubscribed] = useState(false);
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    if (subscribed) return setSubscribed(false);
    setSubscribed(true);
    if (!accessToken) return;
    try {
      setBusy(true);
      await subscribeToChannel(accessToken, video.snippet.channelId);
    } catch (err) {
      console.error("Subscribe failed:", err);
      setSubscribed(false);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={toggle}
      disabled={busy}
      className={`ml-2 shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${subscribed ? "bg-gray-100 text-gray-900 hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"}`}
    >
      {subscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
};

export default SubscribeButton;
