"use client";
import { useSearchParams } from "next/navigation";
import AnimeList from "../_components/AnimeList";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import Header from "../ui/Header";
import Loading from "../ui/Loading";
import Pagination from "../utils/Pagination";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") || "";

  const {
    isPending,
    error,
    data: searchAnime,
    pagination,
    page,
    setPage,
  } = useAnimeQuery({
    endpoint: "anime",
    initialLimit: 10,
    searchQuery: keyword,
    enabled: !!keyword,
  });

  const totalPages = pagination?.last_visible_page;

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
        <Pagination totalPages={totalPages} page={page} setPage={setPage} />
      </section>
    </div>
  );
}
