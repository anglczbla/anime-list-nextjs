"use client";
import AnimeList from "../_components/AnimeList";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import Loading from "../ui/Loading";
import HeaderMenu from "../utils/HeaderMenu";

export default function PopularPage() {
  const {
    isPending,
    error,
    data: recAnime,
    setPage,
    pagination,
    page,
  } = useAnimeQuery({
    endpoint: "recommendations/anime",
    initialLimit: 10,
  });

  const recommendAnime = recAnime
    ?.flatMap((r) => r.entry)
    .filter(
      (anime, index, self) =>
        index === self.findIndex((t) => t.mal_id === anime.mal_id)
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <HeaderMenu title={`Anime Recommendation`} />
      {isPending ? (
        <Loading />
      ) : (
        <>
          <AnimeList api={recommendAnime} />
        </>
      )}
    </div>
  );
}
