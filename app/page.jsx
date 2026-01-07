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

  const {
    isPending: loadingRecs,
    error: erroRecs,
    data: recommendation,
  } = useAnimeQuery({
    endpoint: "recommendations/anime",
    initialLimit: 8,
  });

  const {
    isPending: loadingPop,
    error: errorPop,
    data: popularAnime,
  } = useAnimeQuery({
    endpoint: "watch/promos/popular",
    initialLimit: 8,
  });

  const displayPopular = popularAnime?.map((item) => item.entry).slice(0, 8);

  const recommendAnime = recommendation
    ?.flatMap((r) => r.entry)
    .filter(
      (anime, index, self) =>
        index === self.findIndex((t) => t.mal_id === anime.mal_id)
    )
    .slice(0, 8);

  if (error || erroRecs || errorPop) return <div>Error:{error.message} </div>;

  return (
    <div>
      {loadingTop || loadingRecs || loadingPop ? (
        <Loading />
      ) : (
        <>
          <section className="container mx-auto px-4">
            <Header title="Top Anime" linkHref="/top" linkTitle="View All" />
            <AnimeList api={topAnime} />
          </section>

          <section className="container mx-auto px-4 pb-8">
            <Header
              title="Popular Anime"
              linkHref="/popular"
              linkTitle="View All"
            />
            <AnimeList api={displayPopular} />
          </section>

          <section className="container mx-auto px-4 pb-8">
            <Header
              title="Anime Recommendations"
              linkHref="/recommendation"
              linkTitle="View All"
            />
            <AnimeList api={recommendAnime} />
          </section>
        </>
      )}
    </div>
  );
}
