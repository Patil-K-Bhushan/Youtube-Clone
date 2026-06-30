import React from "react";
import AppearanceSection from "./AppearanceSection";
import PlaybackSection from "./PlaybackSection";

const SettingsPage = () => {
  return (
    <main className="min-h-screen px-4 py-8 md:px-8 max-w-4xl">
      <h1 className="text-2xl font-bold border-b border-gray-200 dark:border-zinc-800 pb-4 text-gray-900 dark:text-zinc-100">
        Settings
      </h1>
      <div className="mt-8 space-y-8">
        <AppearanceSection />
        <PlaybackSection />
      </div>
    </main>
  );
};

export default SettingsPage;
