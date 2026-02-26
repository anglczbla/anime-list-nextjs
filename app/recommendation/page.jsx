"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AnimeList from "../_components/AnimeList";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import Loading from "../ui/Loading";
import HeaderMenu from "../utils/HeaderMenu";

const RecommendationContent = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";

  const {
    isPending,
    error,
    data: recAnime,
    setPage,
    pagination,
    hasNextPage,
    page,
  } = useAnimeQuery({
    endpoint: "recommendations/anime",
    initialLimit: 12,
  });

  const recommendAnime = recAnime
    ?.flatMap((r) => r.entry)
    .filter(
      (anime, index, self) =>
        index === self.findIndex((t) => t.mal_id === anime.mal_id),
    )
    .filter((anime) => {
      const matchTitle = anime.title.toLowerCase().includes(keyword);
      const matchGenre = category
        ? (anime.genres?.some((g) => g.mal_id.toString() === category) ?? false)
        : true;
      return matchTitle && matchGenre;
    });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <HeaderMenu title={`Anime Recommendation`} />
      <div className="container mx-auto px-4">
        {isPending ? (
          <Loading />
        ) : recommendAnime?.length > 0 ? (
          <>
            <AnimeList api={recommendAnime} />
          </>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-bold text-color-dark">
              No recommendations found for your search.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default function RecommendationPage() {
  return (
    <Suspense fallback={<Loading />}>
      <RecommendationContent />
    </Suspense>
  );
}
