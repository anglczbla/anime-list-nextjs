"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import AnimeList from "../_components/AnimeList";
import Header from "../ui/Header";
import Loading from "../ui/Loading";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") || "";
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { isPending, error, data } = useQuery({
    queryKey: ["anime", keyword, page],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${keyword}&page=${page}`;
      const response = await axios.get(url);
      return response.data;
    },
    placeholderData: keepPreviousData,
    enabled: !!keyword,
  });

  const totalPages = data?.pagination?.last_visible_page;
  const searchAnime = data?.data;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <section>
        <Header title={`Search for ${keyword}`} />
        {isPending ? (
          <Loading />
        ) : (
          <AnimeList
            api={searchAnime}
            totalPages={totalPages}
            setPage={setPage}
            page={page}
          />
        )}
      </section>
    </div>
  );
}
