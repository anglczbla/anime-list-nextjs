"use client";
import { useRouter, useSearchParams } from "next/navigation";
import AnimeList from "../_components/AnimeList";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import Header from "../ui/Header";
import Loading from "../ui/Loading";
import Pagination from "../utils/Pagination";
import Option from "../utils/Option";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const keyword = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const { data: genresList, isPending: loadingGenres } = useAnimeQuery({
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
    initialLimit: 10,
    searchQuery: keyword,
    genres: category,
    enabled: !!keyword,
  });

  const totalPages = pagination?.last_visible_page;

  const handleGenreChange = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("category", e.target.value);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`);
    setPage(1);
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <section className="px-4 py-4 container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded shadow-sm border border-color-primary mb-4">
          <label className="font-bold text-color-dark whitespace-nowrap">
            Filter by Genre:
          </label>
          {loadingGenres ? (
            <Loading />
          ) : (
            <select
              className="p-2 border rounded w-full max-w-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-color-accent transition-all"
              onChange={handleGenreChange}
              value={category}
            >
              <option value="">All Genres</option>
              {genresList?.map((genre) => (
                <Option key={genre.mal_id} genre={genre} />
              ))}
            </select>
          )}
        </div>
        <Header title={`Search for ${keyword}`} />
        {isPending ? (
          <Loading />
        ) : (
          <AnimeList
            api={searchAnime}
            totalPages={totalPages}
            setPage={setPage}
            page={page}
          />
        )}
        <Pagination totalPages={totalPages} page={page} setPage={setPage} />
      </section>
    </div>
  );
}
