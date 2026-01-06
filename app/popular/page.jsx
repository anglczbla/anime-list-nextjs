"use client";
import AnimeList from "../_components/AnimeList";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import HeaderMenu from "../ui/HeaderMenu";
import Loading from "../ui/Loading";

export default function PopularPage() {
  const { isPending, error, data, page, setPage } = useAnimeQuery({
    initialLimit: 24,
  });

  const popularAnime = data?.data;
  const totalPages = data?.pagination?.last_visible_page;

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
    </div>
  );
}
