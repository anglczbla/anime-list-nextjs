"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AnimeList from "../_components/AnimeList";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import Loading from "../ui/Loading";
import HeaderMenu from "../utils/HeaderMenu";
import Pagination from "../utils/Pagination";

const RecommendationContent = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";

  const endpoint = keyword || category ? "anime" : "seasons/now";

  const {
    isPending,
    error,
    data: recAnime,
    setPage,
    pagination,
    page,
  } = useAnimeQuery({
    endpoint: endpoint,
    initialLimit: 24,
    searchQuery: keyword,
    genres: category,
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <HeaderMenu title={`Anime Recommendation #${page}`} />
      <div className="container mx-auto px-4">
        {isPending ? (
          <Loading />
        ) : recAnime?.length > 0 ? (
          <>
            <AnimeList api={recAnime} />
            <Pagination
              page={page}
              lastPage={pagination?.last_visible_page}
              setPage={setPage}
            />
          </>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-bold text-color-dark">
              No recommendations anime found for your search.
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
