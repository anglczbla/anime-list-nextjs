"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import AnimeList from "./components/AnimeList";

export default function Home() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { isPending, error, data, isPlaceholderData } = useQuery({
    queryKey: ["anime", page, limit],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=${limit}&page=${page}`;
      const response = await axios.get(url);
      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.pagination?.last_visible_page;
  const animeData = data?.data;

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">FEATURED</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {animeData?.map((anime) => (
            <div key={anime.mal_id}>
              <AnimeList
                title={anime.title}
                images={anime.images.webp.image_url}
              />
            </div>
          ))}
        </div>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition ${
              page === idx + 1
                ? "bg-slate-800 text-white shadow-lg"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
