"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import AnimeList from "../_components/AnimeList";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import Header from "../ui/Header";
import Loading from "../ui/Loading";
import Pagination from "../utils/Pagination";

const SearchContent = () => {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const { data: genresList } = useAnimeQuery({
    endpoint: "genres/anime",
  });

  const {
    isPending,
    error,
    data: searchAnime,
    pagination,
    page,
    setPage,
  } = useAnimeQuery({
    endpoint: "anime",
    initialLimit: 12,
    searchQuery: keyword,
    genres: category,
    enabled: !!keyword || !!category,
  });

  const lastPage = pagination?.last_visible_page;

  const selectedGenre = genresList?.find(
    (g) => g.mal_id.toString() === category
  );

  let headerTitle = "Search Page";
  if (keyword && category) {
    headerTitle = `Search for "${keyword}" in Genre ${
      selectedGenre?.name || ""
    }`;
  } else if (keyword) {
    headerTitle = `Search for "${keyword}"`;
  } else if (category) {
    headerTitle = `Result for Genre ${selectedGenre?.name || ""}`;
  }

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <section className="px-4 py-4 container mx-auto">
        <Header title={headerTitle} />
        {isPending ? (
          <Loading />
        ) : searchAnime?.length > 0 ? (
          <>
            <AnimeList api={searchAnime} />
            <Pagination lastPage={lastPage} page={page} setPage={setPage} />
          </>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-xl font-bold text-color-dark">
              No anime found for your search.
            </h3>
          </div>
        )}
      </section>
    </div>
  );
};

export default function SearchPage() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchContent />
    </Suspense>
  );
}
