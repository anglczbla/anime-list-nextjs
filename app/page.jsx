"use client";
import { useState } from "react";
import AnimeList from "./_components/AnimeList";
import { useAnimeQuery } from "./hooks/useAnimeQuery";
import Header from "./ui/Header";
import Loading from "./ui/Loading";
import Option from "./utils/Option";
import Pagination from "./utils/Pagination";

export default function Page() {
  const [selectedGenreId, setSelectedGenreId] = useState("");

  const {
    isPending: loadingTop,
    error,
    data: topAnime,
  } = useAnimeQuery({
    endpoint: "top/anime",
    initialLimit: 8,
    enabled: !selectedGenreId,
  });

  const { isPending: loadingRecs, data: recommendation } = useAnimeQuery({
    endpoint: "recommendations/anime",
    enabled: !selectedGenreId,
  });

  const { data: genresList, isPending: loadingGenres } = useAnimeQuery({
    endpoint: "genres/anime",
  });

  const {
    isPending: loadingGenreAnime,
    data: animeByGenre,
    pagination,
    page,
    setPage,
  } = useAnimeQuery({
    endpoint: "anime",
    genres: selectedGenreId,
    initialLimit: 24,
    enabled: !!selectedGenreId,
  });

  const recommendAnime = recommendation
    ?.flatMap((r) => r.entry)
    .filter(
      (anime, index, self) =>
        index === self.findIndex((t) => t.mal_id === anime.mal_id)
    )
    .slice(0, 10);

  const handleGenreChange = (e) => {
    setSelectedGenreId(e.target.value);
    setPage(1);
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <section className="px-4 py-4 container mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white p-4 rounded shadow-sm border border-color-primary">
          <label className="font-bold text-color-dark whitespace-nowrap">
            Filter by Genre:
          </label>
          {loadingGenres ? (
            <div className="w-full max-w-md h-10 bg-gray-200 animate-pulse rounded"></div>
          ) : (
            <select
              className="p-2 border rounded w-full max-w-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-color-accent transition-all"
              onChange={handleGenreChange}
              value={selectedGenreId}
            >
              <option value="">All Genres (Featured)</option>
              {genresList?.map((genre) => (
                <Option key={genre.mal_id} genre={genre} />
              ))}
            </select>
          )}
        </div>
      </section>

      {selectedGenreId ? (
        <section className="container mx-auto px-4 pb-8">
          <Header
            title={`Result for Genre`}
            linkHref="#"
            linkTitle={`Total ${pagination?.items?.total || 0}`}
          />
          {loadingGenreAnime ? (
            <Loading />
          ) : animeByGenre?.length > 0 ? (
            <>
              <AnimeList api={animeByGenre} />
              <Pagination
                page={page}
                lastPage={pagination?.last_visible_page}
                setPage={setPage}
              />
            </>
          ) : (
            <div className="text-center py-10">
              <h3 className="text-xl font-bold text-color-dark">
                No anime found for this genre.
              </h3>
            </div>
          )}
        </section>
      ) : (
        <>
          {loadingTop || loadingRecs ? (
            <Loading />
          ) : (
            <>
              <section className="container mx-auto px-4">
                <Header
                  title="FEATURED"
                  linkHref="/popular"
                  linkTitle="See All Anime"
                />
                <AnimeList api={topAnime} />
              </section>

              <section className="container mx-auto px-4 pb-8">
                <Header title="Anime Recommendations" />
                <AnimeList api={recommendAnime} />
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
}
