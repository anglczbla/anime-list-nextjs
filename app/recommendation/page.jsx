"use client";
import { useSearchParams } from "next/navigation";
import AnimeList from "../_components/AnimeList";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import Loading from "../ui/Loading";
import HeaderMenu from "../utils/HeaderMenu";
import Pagination from "../utils/Pagination";

export default function PopularPage() {
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
    initialLimit: 10,
  });

  const recommendAnime = recAnime
    ?.flatMap((r) => r.entry)
    .filter(
      (anime, index, self) =>
        index === self.findIndex((t) => t.mal_id === anime.mal_id)
    )
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
      <HeaderMenu title={`Anime Recommendation`} />
      <div className="container mx-auto px-4">
        {isPending ? (
          <Loading />
        ) : recommendAnime?.length > 0 ? (
          <>
            <AnimeList api={recommendAnime} />
            <Pagination
              page={page}
              lastPage={pagination?.last_visible_page}
              hasNextPage={hasNextPage}
              setPage={setPage}
            />
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
}
