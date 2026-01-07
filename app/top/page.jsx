"use client";
import AnimeList from "../_components/AnimeList";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import Loading from "../ui/Loading";
import HeaderMenu from "../utils/HeaderMenu";
import Pagination from "../utils/Pagination";

export default function TopPage() {
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

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <HeaderMenu title={`Top Anime #${page}`} />
      {isPending ? (
        <Loading />
      ) : (
        <>
          <AnimeList api={popularAnime} />
          <Pagination
            page={page}
            lastPage={pagination?.last_visible_page}
            setPage={setPage}
          />
        </>
      )}
    </div>
  );
}
