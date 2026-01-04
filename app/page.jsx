"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import AnimeList from "./components/AnimeList";
import Search from "./components/Search";

export default function Home() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { isPending, error, data } = useQuery({
    queryKey: ["anime", page, limit],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=${limit}&page=${page}`;
      console.log("Fetching URL:", url);
      const response = await axios.get(url);
      return response.data;
    },
  });

  const totalPages = data?.pagination?.items.total;
  console.log(totalPages);

  console.log("isi data", data);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>FEATURED</h1>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition ${
            page === idx + 1
              ? "bg-slate-800 text-white shadow-lg"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          {idx + 1}
        </button>
      ))}
      <Search />
      <AnimeList data={data} />
    </div>
  );
}
