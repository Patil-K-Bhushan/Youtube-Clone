import { useState, useEffect } from "react";
import { SUGGEST_API } from "../utils/constants";

const cache = new Map();

const useGetSearchSuggestion = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) return setSuggestions([]);
    if (cache.has(q)) return setSuggestions(cache.get(q));

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(SUGGEST_API + encodeURIComponent(q), {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        if (text.startsWith("<"))
          throw new Error("Got HTML, not JSON — proxy/path mismatch");
        const json = JSON.parse(text);
        const list = json[1] ?? [];
        cache.set(q, list);
        setSuggestions(list);
      } catch (err) {
        if (err.name !== "AbortError") console.error("Suggestions error:", err);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery]);

  return { searchQuery, setSearchQuery, suggestions };
};

export default useGetSearchSuggestion;
