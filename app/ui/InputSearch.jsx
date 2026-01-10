"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import Option from "../utils/Option";

const InputSearch = () => {
  const searchRef = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const timeoutRef = useRef(null);
  const [year, setYear] = useState("");

  const { data: genresList } = useAnimeQuery({ endpoint: "genres/anime" });
  const { data: seasonList } = useAnimeQuery({
    endpoint: `genres/${year}/seasons`,
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.value = searchParams.get("q") || "";
    }
  }, [searchParams]);

  const updateURL = (keyword, category, seasons) => {
    const filterablePages = [
      "/top",
      "/popular",
      "/recommendation",
      "/search",
      "/season",
    ];
    const isFilterMode = filterablePages.includes(pathname);

    if (isFilterMode) {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("page");

      if (keyword) {
        params.set("q", keyword);
      } else {
        params.delete("q");
      }

      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }

      if (pathname === "/search" && !keyword && !category) {
        router.push("/");
      } else {
        router.push(`${pathname}?${params.toString()}`);
      }
    } else {
      const params = new URLSearchParams();
      if (keyword) params.set("q", keyword);
      if (category) params.set("category", category);
      if (seasons) params.set("seasons", seasons);

      if (!keyword && !category && !seasons) {
        router.push("/");
      } else {
        router.push(`/search?${params.toString()}`);
      }
    }
  };

  const handleInput = () => {
    const keyword = searchRef.current.value.trim();
    const category = searchParams.get("category");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      updateURL(keyword, category);
    }, 500);
  };

  const handleSelect = (e) => {
    const category = e.target.value;
    const keyword = searchRef.current.value.trim();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    updateURL(keyword, category);
  };

  return (
    <div className="relative flex md:flex-row flex-col gap-2">
      <select
        className="p-2 rounded cursor-pointer bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onChange={handleSelect}
        value={searchParams.get("category") || ""}
      >
        <option value="">All Genres</option>
        {genresList?.map((genre) => (
          <Option key={genre.mal_id} genre={genre} />
        ))}
      </select>
      <input
        type="text"
        placeholder="Search Anime"
        className="w-full p-2 rounded bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400 dark:placeholder-slate-500"
        ref={searchRef}
        onChange={handleInput}
        defaultValue={searchParams.get("q") || ""}
      />
    </div>
  );
};

export default InputSearch;
