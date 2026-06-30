import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChannelHeader from "./ChannelHeader";
import ChannelVideos from "./ChannelVideos";

const ChannelPage = () => {
  const { channelId } = useParams();
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    if (!KEY) return;
    setLoading(true);
    fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${KEY}`)
      .then(res => res.json())
      .then(data => {
        if (data.items?.length) setChannelData(data.items[0]);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [channelId]);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-12">
      {channelData && <ChannelHeader channel={channelData} />}
      <div className="px-6 mt-8">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-zinc-100">Videos</h2>
        <ChannelVideos channelId={channelId} />
      </div>
    </main>
  );
};

export default ChannelPage;
