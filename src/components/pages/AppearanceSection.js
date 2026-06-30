import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../utils/appSlice";
import { MdOutlineLightMode, MdOutlineDarkMode, MdCheck } from "react-icons/md";

const AppearanceSection = () => {
  const darkMode = useSelector((store) => store.app.darkMode);
  const dispatch = useDispatch();

  const renderMockUI = (isDark) => (
    <div className={`mt-4 rounded-lg border p-2 shadow-inner pointer-events-none ${isDark ? "bg-zinc-950 border-zinc-800" : "bg-white border-gray-100"}`}>
      <div className={`flex items-center gap-1.5 border-b pb-1.5 ${isDark ? "border-zinc-800" : "border-gray-100"}`}>
        <div className="h-2 w-2 rounded-full bg-red-400" />
        <div className="h-2 w-2 rounded-full bg-yellow-400" />
        <div className="h-2 w-2 rounded-full bg-green-400" />
        <div className={`h-2 w-20 rounded ml-1 ${isDark ? "bg-zinc-800" : "bg-gray-100"}`} />
      </div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        <div className={`aspect-video rounded ${isDark ? "bg-zinc-850" : "bg-gray-100"}`} />
        <div className={`aspect-video rounded ${isDark ? "bg-zinc-850" : "bg-gray-100"}`} />
        <div className={`aspect-video rounded ${isDark ? "bg-zinc-850" : "bg-gray-100"}`} />
      </div>
    </div>
  );

  const cardClass = (active) =>
    `relative cursor-pointer rounded-2xl border p-4 transition-all duration-350 select-none ${
      active
        ? "border-blue-500 bg-blue-50/10 dark:bg-zinc-900/50 ring-2 ring-blue-500/20 text-blue-900 dark:text-zinc-100"
        : "border-gray-250 dark:border-zinc-800 hover:border-gray-305 dark:hover:border-zinc-700 bg-white dark:bg-zinc-950/20 text-gray-500"
    }`;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-zinc-200">Appearance</h2>
        <p className="text-xs text-gray-500 dark:text-zinc-400 mt-0.5 font-medium">Choose your theme preference.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <div onClick={() => darkMode && dispatch(toggleTheme())} className={cardClass(!darkMode)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`rounded-xl p-2.5 ${!darkMode ? "bg-blue-100 text-blue-600" : "bg-zinc-800 text-zinc-550"}`}><MdOutlineLightMode className="text-xl" /></div>
              <div><h3 className="font-bold text-sm">Light theme</h3></div>
            </div>
            {!darkMode && <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white"><MdCheck className="text-sm" /></div>}
          </div>
          {renderMockUI(false)}
        </div>
        <div onClick={() => !darkMode && dispatch(toggleTheme())} className={cardClass(darkMode)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`rounded-xl p-2.5 ${darkMode ? "bg-blue-600/20 text-blue-400" : "bg-gray-105 text-gray-550"}`}><MdOutlineDarkMode className="text-xl" /></div>
              <div><h3 className="font-bold text-sm">Dark theme</h3></div>
            </div>
            {darkMode && <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white"><MdCheck className="text-sm" /></div>}
          </div>
          {renderMockUI(true)}
        </div>
      </div>
    </section>
  );
};

export default AppearanceSection;
