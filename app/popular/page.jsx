"use client";
import AnimeList from "../_components/AnimeList";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import Loading from "../ui/Loading";
import HeaderMenu from "../utils/HeaderMenu";
import Pagination from "../utils/Pagination";

export default function PopularPage() {
  const {
    isPending,
    error,
    data: popularAnime,
    pagination,
    page,
    setPage,
  } = useAnimeQuery({
    endpoint: "top/anime",
    initialLimit: 24,
  });

  const totalPages = pagination?.last_visible_page;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <HeaderMenu title={`Popular Anime #${page}`} />
      {isPending ? (
        <Loading />
      ) : (
        <AnimeList
          api={popularAnime}
          totalPages={totalPages}
          setPage={setPage}
          page={page}
        />
      )}
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
}
