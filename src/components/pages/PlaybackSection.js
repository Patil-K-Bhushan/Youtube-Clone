import React from "react";

const PlaybackSection = () => {
  return (
    <section className="space-y-4 pt-4 border-t border-gray-150 dark:border-zinc-800">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-zinc-200">
          Playback & performance
        </h2>
        <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5 font-medium">
          Control video playback quality, annotations, and captions.
        </p>
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 p-4 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="font-semibold text-gray-800 dark:text-zinc-200">Info Cards</p>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">Show in-video notifications</p>
          </div>
          <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-gray-300 accent-blue-600 cursor-pointer" />
        </div>
        <hr className="border-gray-100 dark:border-zinc-850" />
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="font-semibold text-gray-800 dark:text-zinc-200">Captions</p>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5">Always show captions when available</p>
          </div>
          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 accent-blue-600 cursor-pointer" />
        </div>
      </div>
    </section>
  );
};

export default PlaybackSection;
