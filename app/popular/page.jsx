"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AnimeList from "../_components/AnimeList";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import Loading from "../ui/Loading";
import HeaderMenu from "../utils/HeaderMenu";
import Pagination from "../utils/Pagination";

const PopularContent = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";

  const endpoint = keyword || category ? "anime" : "top/anime";

  const {
    isPending,
    error,
    data: popularAnime,
    setPage,
    pagination,
    page,
  } = useAnimeQuery({
    endpoint: endpoint,
    filter: keyword || category ? "" : "bypopularity",
    initialLimit: 24,
    searchQuery: keyword,
    genres: category,
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <HeaderMenu title={`Most Popular #${page}`} />
      <div className="container mx-auto px-4">
        {isPending ? (
          <Loading />
        ) : popularAnime?.length > 0 ? (
          <>
            <AnimeList api={popularAnime} />
            <Pagination
              page={page}
              lastPage={pagination?.last_visible_page}
              setPage={setPage}
            />
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
};

export default function PopularPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PopularContent />
    </Suspense>
  );
}
