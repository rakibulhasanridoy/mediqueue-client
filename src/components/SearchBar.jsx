"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("searchTerm") || "";
  const [search, setSearch] = useState(initialSearch);

  useEffect(() => {
    setSearch(searchParams.get("searchTerm") || "");
  }, [searchParams]);

  const triggerSearch = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("searchTerm", value);
    } else {
      params.delete("searchTerm");
    }
    router.push(`/tutors?${params.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      triggerSearch(search);
    }
  };

  const handleClear = () => {
    setSearch("");
    triggerSearch("");
  };

  return (
    <div className="relative w-full max-w-lg">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-slate-400 dark:text-slate-500" />
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          // Optional: instant search
          // triggerSearch(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Search by tutor's name..."
        className="block w-full pl-11 pr-24 py-3 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-[#111827] text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400 focus:border-transparent text-sm font-semibold transition-all duration-300 shadow-sm"
      />
      <div className="absolute inset-y-1.5 right-1.5 flex items-center gap-1.5">
        {search && (
          <button
            onClick={handleClear}
            className="px-2 py-1 text-xs font-bold text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
          >
            Clear
          </button>
        )}
        <button
          onClick={() => triggerSearch(search)}
          className="px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:opacity-95 shadow-md shadow-cyan-500/10 focus:outline-none transition-all"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;