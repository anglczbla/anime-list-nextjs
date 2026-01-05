"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { use, useState } from "react";
import AnimeList from "../../_components/AnimeList";
import Header from "../../ui/Header";

export default function Page({ params }) {
  const { keyword } = use(params);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { isPending, error, data, isPlaceholderData } = useQuery({
    queryKey: ["anime", keyword, page, limit],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${keyword}`;
      const response = await axios.get(url);
      return response.data;
    },
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.pagination?.last_visible_page;
  const searchAnime = data?.data;

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <section>
        <Header
          title={`Search for ${keyword}`}
          linkHref="/popular"
          linkTitle="See All Anime"
        />
        <AnimeList
          api={searchAnime}
          totalPages={totalPages}
          setPage={setPage}
          page={page}
        />
      </section>
    </div>
  );
}
