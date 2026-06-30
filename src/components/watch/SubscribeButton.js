import { useState } from "react";

const SubscribeButton = () => {
  const [subscribed, setSubscribed] = useState(false);

  return (
    <button
      onClick={() => setSubscribed((s) => !s)}
      className={`ml-2 shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
        subscribed
          ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
          : "bg-black text-white hover:bg-gray-800"
      }`}
    >
      {subscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
};

export default SubscribeButton;
