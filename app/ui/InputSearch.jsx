"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import Option from "../utils/Option";

const InputSearch = () => {
  const searchRef = useRef();
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeoutRef = useRef(null);

  const { data: genresList } = useAnimeQuery({ endpoint: "genres/anime" });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const updateURL = (keyword, category) => {
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (category) params.set("category", category);

    if (!keyword && !category) {
      router.push("/");
    } else {
      router.push(`/search?${params.toString()}`);
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
        className="p-2 rounded cursor-pointer text-slate-800"
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
        className="w-full p-2 rounded text-slate-800"
        ref={searchRef}
        onChange={handleInput}
        defaultValue={searchParams.get("q") || ""}
      />
    </div>
  );
};

export default InputSearch;
