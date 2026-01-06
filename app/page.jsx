"use client";
import AnimeList from "./_components/AnimeList";
import { useAnimeQuery } from "./hooks/useAnimeQuery";
import Header from "./ui/Header";
import Loading from "./ui/Loading";

export default function Page() {
  const { isPending, error, data, page, setPage } = useAnimeQuery({
    endpoint: "top/anime",
  });

  const totalPages = data?.pagination?.last_visible_page;
  const topAnime = data;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <section>
        <Header
          title="FEATURED"
          linkHref="/popular"
          linkTitle="See All Anime"
        />
        {isPending ? (
          <Loading />
        ) : (
          <AnimeList
            api={topAnime}
            totalPages={totalPages}
            setPage={setPage}
            page={page}
          />
        )}
      </section>
    </div>
  );
}
