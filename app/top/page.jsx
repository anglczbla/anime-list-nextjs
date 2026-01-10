"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AnimeList from "../_components/AnimeList";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import Loading from "../ui/Loading";
import HeaderMenu from "../utils/HeaderMenu";
import Pagination from "../utils/Pagination";

const TopContent = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const endpoint = keyword || category ? "anime" : "top/anime";

  const {
    isPending,
    error,
    data: popularAnime,
    pagination,
    page,
    setPage,
  } = useAnimeQuery({
    endpoint: endpoint,
    initialLimit: 24,
    searchQuery: keyword,
    genres: category,
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <HeaderMenu title={`Top Anime #${page}`} />
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
              No top anime found for your search.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default function TopPage() {
  return (
    <Suspense fallback={<Loading />}>
      <TopContent />
    </Suspense>
  );
}
