"use client";
import { Compass, PlayCircle, Sparkles, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AnimeList from "./_components/AnimeList";
import { useAnimeQuery } from "./hooks/useAnimeQuery";
import Header from "./ui/Header";
import Loading from "./ui/Loading";

export default function Page() {
  const {
    isPending: loadingTop,
    error,
    data: topAnime,
  } = useAnimeQuery({
    endpoint: "top/anime",
    initialLimit: 12,
  });

  const {
    isPending: loadingRecs,
    error: erroRecs,
    data: recommendation,
  } = useAnimeQuery({
    endpoint: "recommendations/anime",
    initialLimit: 12,
  });

  const {
    isPending: loadingPop,
    error: errorPop,
    data: popularAnime,
  } = useAnimeQuery({
    endpoint: "watch/promos/popular",
    initialLimit: 12,
  });

  const displayPopular = popularAnime?.map((item) => item.entry).slice(0, 12);

  const recommendAnime = recommendation
    ?.flatMap((r) => r.entry)
    .filter(
      (anime, index, self) =>
        index === self.findIndex((t) => t.mal_id === anime.mal_id),
    )
    .slice(0, 12);

  if (error || erroRecs || errorPop) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] text-red-500 font-semibold">
        Error loading data. Please try again later.
      </div>
    );
  }

  const bgAnime = topAnime?.[0];
  const cardAnimes = topAnime?.slice(1, 4) || [];

  return (
    <div className="min-h-screen pb-20 bg-slate-50 dark:bg-[#0B1120]">
      {/* Hero Section */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center pt-16 pb-12 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        {/* Dynamic Background Image */}
        {bgAnime && !loadingTop && (
          <div className="absolute inset-0 z-0">
            <Image
              src={
                bgAnime?.images?.webp?.large_image_url ||
                bgAnime?.images?.jpg?.large_image_url
              }
              alt="Hero Background"
              fill
              className="object-cover opacity-40 dark:opacity-30 blur-sm scale-105"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/95 to-slate-50/40 dark:from-[#0B1120] dark:via-[#0B1120]/95 dark:to-[#0B1120]/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent dark:from-[#0B1120] dark:via-transparent dark:to-transparent" />
          </div>
        )}

        <div className="container relative z-10 mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
            <div className="flex-1 w-full max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-sm">
                <Sparkles size={14} />
                <span>#1 Anime Community Hub</span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-slate-900 dark:text-white mb-5 leading-[1.1] drop-shadow-sm">
                Discover Your <br className="hidden lg:block" /> Next{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-violet-400">
                  Favorite Anime
                </span>
              </h1>

              <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0 drop-shadow-sm font-medium">
                Track, discover, and share your favorite series. Explore
                top-rated shows, keep up with popular ongoing anime, and build
                your collection.
              </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-3 w-full">
                <Link
                  href="/search"
                  className="flex justify-center items-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-1 text-sm md:text-base"
                >
                  <Compass size={18} />
                  Explore Now
                </Link>
                <Link
                  href="/top"
                  className="flex justify-center items-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-all hover:-translate-y-1 shadow-sm text-sm md:text-base"
                >
                  <Star size={18} className="text-amber-500" />
                  View Top Rated
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full flex justify-center lg:justify-end mt-6 lg:mt-0">
              {loadingTop ? (
                <div className="w-[220px] sm:w-[260px] lg:w-[280px] aspect-[3/4] rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
              ) : (
                <div className="relative w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[280px] aspect-[3/4] group cursor-pointer perspective-1000">
                  {cardAnimes.map((anime, i) => (
                    <div
                      key={anime.mal_id}
                      className={`absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-out border-2 border-white/20 dark:border-white/10 origin-bottom
                        ${
                          i === 0
                            ? "z-30 transform group-hover:-translate-y-8 group-hover:scale-105 group-hover:rotate-0"
                            : i === 1
                              ? "z-20 transform translate-x-4 sm:translate-x-6 translate-y-3 sm:translate-y-4 rotate-6 group-hover:translate-x-12 group-hover:translate-y-0 group-hover:rotate-12 opacity-90"
                              : "z-10 transform -translate-x-4 sm:-translate-x-6 translate-y-6 sm:translate-y-8 -rotate-6 group-hover:-translate-x-12 group-hover:translate-y-3 group-hover:-rotate-12 opacity-80"
                        }
                      `}
                    >
                      <Image
                        src={
                          anime?.images?.webp?.large_image_url ||
                          anime?.images?.jpg?.large_image_url
                        }
                        alt={anime.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, 280px"
                        priority={i === 0}
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 sm:p-5 pt-16 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="text-white font-bold text-sm sm:text-base line-clamp-2 leading-tight">
                          {anime.title}
                        </h3>
                        {anime.score && (
                          <div className="flex items-center gap-1 mt-1 sm:mt-1.5 text-amber-400 text-xs sm:text-sm font-semibold">
                            <Star size={12} fill="currentColor" />
                            <span>{anime.score}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/30 dark:bg-indigo-500/20 blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pt-12 max-w-6xl flex flex-col gap-12 md:gap-16">
        {loadingTop || loadingRecs || loadingPop ? (
          <div className="py-16 w-full">
            <Loading />
          </div>
        ) : (
          <>
            <section>
              <Header
                title="Top Anime"
                linkHref="/top"
                linkTitle="View All"
                icon={Star}
              />
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/50 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
                <AnimeList api={topAnime} />
              </div>
            </section>

            <section>
              <Header
                title="Popular Anime"
                linkHref="/popular"
                linkTitle="View All"
                icon={TrendingUp}
              />
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/50 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
                <AnimeList api={displayPopular} />
              </div>
            </section>

            <section>
              <Header
                title="Recommendations"
                linkHref="/recommendation"
                linkTitle="View All"
                icon={PlayCircle}
              />
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900/50 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
                <AnimeList api={recommendAnime} />
              </div>
            </section>
          </>
        )}
      </div>

      {/* Footer / CTA Section */}
      {!loadingTop && !loadingRecs && !loadingPop && (
        <section className="container mx-auto px-4 pt-16 pb-12 max-w-6xl">
          <div className="relative isolate overflow-hidden bg-indigo-600 dark:bg-indigo-900 px-6 py-12 sm:py-16 text-center shadow-xl sm:rounded-3xl sm:px-16">
            <h2 className="mx-auto max-w-2xl text-2xl sm:text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Start building your collection today.
            </h2>
            <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-8 text-indigo-100">
              Create an account to track your progress, save your favorite
              series, and engage with the community.
            </p>
            <div className="mt-6 sm:mt-8 flex items-center justify-center gap-x-6">
              <Link
                href="/users/dashboard"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all hover:scale-105"
              >
                Go to Dashboard
              </Link>
            </div>
            {/* Background design element */}
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 h-[48rem] w-[48rem] sm:h-[64rem] sm:w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
              aria-hidden="true"
            >
              <circle
                cx="512"
                cy="512"
                r="512"
                fill="url(#gradient)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient id="gradient">
                  <stop stopColor="#818cf8" />
                  <stop offset="1" stopColor="#4f46e5" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </section>
      )}
    </div>
  );
}
