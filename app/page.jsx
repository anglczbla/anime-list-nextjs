"use client";
import AnimeList from "./_components/AnimeList";
import GenrePage from "./genres/page";
import { useAnimeQuery } from "./hooks/useAnimeQuery";
import Header from "./ui/Header";
import Loading from "./ui/Loading";

export default function Page() {
  const {
    isPending,
    error,
    data: topAnime,
  } = useAnimeQuery({
    endpoint: "top/anime",
    initialLimit: 24,
  });

  const { isPending: pending, data: recommendation } = useAnimeQuery({
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
      <section>
        <Header
          title="FEATURED"
          linkHref="/popular"
          linkTitle="See All Anime"
        />
      </section>
      <section>
        <GenrePage />
      </section>
      {isPending || pending ? (
        <Loading />
      ) : (
        <>
          <section>
            <AnimeList api={topAnime} />
          </section>

          <section>
            <Header title="Anime Recommendations" />
            <AnimeList api={recommendAnime} />
          </section>
        </>
      )}
    </div>
  );
}
