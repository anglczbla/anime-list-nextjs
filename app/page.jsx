"use client";
import AnimeList from "./_components/AnimeList";
import { useAnimeQuery } from "./hooks/useAnimeQuery";
import Header from "./ui/Header";
import Loading from "./ui/Loading";

export default function Page() {
  const {
    isPending: loadingTop,
    error,
    data: topAnime,
  } = useAnimeQuery({
    endpoint: "top/anime",
    initialLimit: 8,
  });

  const { isPending: loadingRecs, data: recommendation } = useAnimeQuery({
    endpoint: "recommendations/anime",
  });

  const recommendAnime = recommendation
    ?.flatMap((r) => r.entry)
    .filter(
      (anime, index, self) =>
        index === self.findIndex((t) => t.mal_id === anime.mal_id)
    )
    .slice(0, 10);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {loadingTop || loadingRecs ? (
        <Loading />
      ) : (
        <>
          <section className="container mx-auto px-4">
            <Header
              title="FEATURED"
              linkHref="/popular"
              linkTitle="See All Anime"
            />
            <AnimeList api={topAnime} />
          </section>

          <section className="container mx-auto px-4 pb-8">
            <Header title="Anime Recommendations" />
            <AnimeList api={recommendAnime} />
          </section>
        </>
      )}
    </div>
  );
}
