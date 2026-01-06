"use client";
import { useState } from "react";
import AnimeList from "../_components/AnimeList";
import { useAnimeQuery } from "../hooks/useAnimeQuery";
import Loading from "../ui/Loading";
import Option from "../ui/Option";

export default function GenrePage() {
  const [selectedGenreId, setSelectedGenreId] = useState("");

  const { data: genresList, isPending: loadingGenres } = useAnimeQuery({
    endpoint: "genres/anime",
  });

  const {
    isPending: loadingAnime,
    data: animeByGenre,
    pagination,
  } = useAnimeQuery({
    endpoint: "anime",
    genres: selectedGenreId,
    initialLimit: 24,
    enabled: !!selectedGenreId,
  });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Genre:</label>
        {loadingGenres ? (
          <Loading />
        ) : (
          <select
            className="p-2 border rounded w-full max-w-md"
            onChange={(e) => setSelectedGenreId(e.target.value)}
            value={selectedGenreId}
          >
            <option value="">Choose a Genre</option>
            {genresList?.map((genre) => (
              <Option key={genre.mal_id} genre={genre} />
            ))}
          </select>
        )}
      </div>

      {selectedGenreId && (
        <>
          <h2 className="text-xl font-semibold mb-4">
            Results: {pagination?.items?.total || 0} anime found
          </h2>
          {loadingAnime ? (
            <Loading />
          ) : animeByGenre?.length > 0 ? (
            <AnimeList api={animeByGenre} />
          ) : (
            <p>No anime found for this genre.</p>
          )}
        </>
      )}
    </div>
  );
}
