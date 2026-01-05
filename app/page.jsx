"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import AnimeList from "./_components/AnimeList";
import Header from "./ui/Header";

export default function Page() {
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
  const topAnime = data?.data;

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <section>
        <Header
          title="FEATURED"
          linkHref="/popular"
          linkTitle="See All Anime"
        />
        <AnimeList
          api={topAnime}
          totalPages={totalPages}
          setPage={setPage}
          page={page}
        />
      </section>
    </div>
  );
}
