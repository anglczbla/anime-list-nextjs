"use client";
import { useSearchParams } from "next/navigation";
import AnimeList from "../_components/AnimeList";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import Loading from "../ui/Loading";
import HeaderMenu from "../utils/HeaderMenu";

export default function PopularPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";

  const {
    isPending,
    error,
    data: popularAnime,
    setPage,
  } = useAnimeQuery({
    endpoint: "watch/promos/popular",
    initialLimit: 24,
  });

  const displayPopular = popularAnime
    ?.map((item) => item.entry)
    .filter((anime) => {
      const matchTitle = anime.title.toLowerCase().includes(keyword);
      const matchGenre = category
        ? anime.genres?.some((g) => g.mal_id.toString() === category) ?? false
        : true;

      return matchTitle && matchGenre;
    });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <HeaderMenu title={`Popular Anime`} />
      <div className="container mx-auto px-4">
        {isPending ? (
          <Loading />
        ) : displayPopular?.length > 0 ? (
          <>
            <AnimeList api={displayPopular} />
          </>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-bold text-color-dark">
              No popular anime found for your search.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
