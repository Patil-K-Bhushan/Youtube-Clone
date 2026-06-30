import React, { useState, useEffect } from "react";
import VideoCard from "../video/VideoCard";
import ShimmerCard from "../common/ShimmerCard";

const ChannelVideos = ({ channelId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
    if (!KEY) return;
    setLoading(true);
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&maxResults=20&order=date&key=${KEY}`)
      .then(res => res.json())
      .then(async (data) => {
        const items = data.items || [];
        const ids = items.map(v => v.id?.videoId).filter(Boolean);
        if (!ids.length) {
          setVideos([]);
          setLoading(false);
          return;
        }
        const stats = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${ids.join(",")}&key=${KEY}`).then(r => r.json());
        setVideos(stats.items || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [channelId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => <ShimmerCard key={i} />)}
      </div>
    );
  }

  if (!videos.length) return <p className="text-sm text-gray-500">No videos uploaded by this channel.</p>;

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map(video => (
        <VideoCard key={video.id} info={video} />
      ))}
    </div>
  );
};

export default ChannelVideos;
