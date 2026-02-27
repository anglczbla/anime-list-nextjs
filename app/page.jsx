"use client";
import {
  ChevronDown,
  Compass,
  PlayCircle,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
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
    endpoint: "seasons/now",
    initialLimit: 12,
  });

  const {
    isPending: loadingPop,
    error: errorPop,
    data: popularAnime,
  } = useAnimeQuery({
    endpoint: "top/anime",
    filter: "bypopularity",
    initialLimit: 12,
  });

  const displayPopular = popularAnime;
  const recommendAnime = recommendation;

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
    <div className="min-h-screen pb-20 bg-slate-50 dark:bg-[#020617]">
      {/* Hero Section */}
      <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
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
              className="object-cover opacity-30 dark:opacity-20 blur-[2px] scale-105"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent dark:from-[#020617] dark:via-[#020617]/80 dark:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-50/20 dark:from-[#020617] dark:via-transparent dark:to-[#020617]/20" />
          </div>
        )}

        {/* Hero Branding (since Navbar is hidden) */}
        <div className="absolute top-8 left-8 z-20">
          <Link
            href="/"
            className="font-extrabold text-2xl tracking-tighter text-indigo-600 dark:text-indigo-400 hover:scale-105 transition-transform inline-block"
          >
            AnimeList<span className="text-violet-500">.</span>
          </Link>
        </div>

        <div className="container relative z-10 mx-auto px-6 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            <div className="flex-1 w-full max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-indigo-200/50 dark:border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-8 shadow-xl">
                <Sparkles size={14} className="animate-pulse" />
                <span className="tracking-wider uppercase">
                  #1 Anime Community Hub
                </span>
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

              <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4 w-full">
                <Link
                  href="/search"
                  className="flex justify-center items-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-1.5 active:scale-95 text-base"
                >
                  <Compass size={20} />
                  Explore Now
                </Link>
                <Link
                  href="/top"
                  className="flex justify-center items-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/60 dark:bg-slate-900/40 backdrop-blur-md text-slate-800 dark:text-slate-200 font-bold border border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all hover:-translate-y-1.5 active:scale-95 shadow-lg text-base"
                >
                  <Star size={20} className="text-amber-500" />
                  View Top Rated
                </Link>
              </div>
            </div>

            <div className="flex-1 w-full flex justify-center lg:justify-end">
              {loadingTop ? (
                <div className="w-[240px] sm:w-[300px] lg:w-[320px] aspect-[3/4] rounded-[2.5rem] bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
              ) : (
                <div className="relative w-full max-w-[240px] sm:max-w-[300px] lg:max-w-[320px] aspect-[3/4] group cursor-pointer perspective-1000 animate-float">
                  {cardAnimes.map((anime, i) => (
                    <div
                      key={anime.mal_id}
                      className={`absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] border-2 border-white/40 dark:border-white/10 origin-bottom
                        ${
                          i === 0
                            ? "z-30 transform group-hover:-translate-y-12 group-hover:scale-[1.08] group-hover:rotate-0"
                            : i === 1
                              ? "z-20 transform translate-x-8 translate-y-4 rotate-12 group-hover:translate-x-20 group-hover:translate-y-0 group-hover:rotate-[15deg] opacity-90 scale-95"
                              : "z-10 transform -translate-x-8 translate-y-8 -rotate-12 group-hover:-translate-x-20 group-hover:translate-y-4 group-hover:-rotate-[15deg] opacity-80 scale-90"
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
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, 320px"
                        priority={i === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <h3 className="text-white font-black text-lg sm:text-xl line-clamp-2 leading-tight">
                          {anime.title}
                        </h3>
                        {anime.score && (
                          <div className="flex items-center gap-1.5 mt-2 text-amber-400 text-sm font-bold bg-black/40 backdrop-blur-md w-fit px-3 py-1 rounded-full">
                            <Star size={14} fill="currentColor" />
                            <span>{anime.score}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {/* Glowing background behind cards */}
                  <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-indigo-500/40 dark:bg-indigo-600/30 blur-[80px] rounded-full opacity-40 group-hover:opacity-70 transition-all duration-700 group-hover:scale-110"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer animate-bounce-slow">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
            Scroll Down
          </span>
          <ChevronDown
            size={24}
            className="text-indigo-600 dark:text-indigo-400"
          />
        </div>
      </section>

      <div className="container mx-auto px-6 pt-24 max-w-6xl flex flex-col gap-20 md:gap-24">
        {loadingTop || loadingRecs || loadingPop ? (
          <div className="py-24 w-full flex justify-center">
            <Loading />
          </div>
        ) : (
          <>
            <section className="relative group">
              <Header
                title="Top Anime"
                linkHref="/top"
                linkTitle="View All"
                icon={Star}
              />
              <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/40 shadow-xl shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-white/5 transition-all duration-500 hover:ring-indigo-500/30">
                <AnimeList api={topAnime} />
              </div>
            </section>

            <section className="relative group">
              <Header
                title="Popular Anime"
                linkHref="/popular"
                linkTitle="View All"
                icon={TrendingUp}
              />
              <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/40 shadow-xl shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-white/5 transition-all duration-500 hover:ring-indigo-500/30">
                <AnimeList api={displayPopular} />
              </div>
            </section>

            <section className="relative group">
              <Header
                title="Recommendations"
                linkHref="/recommendation"
                linkTitle="View All"
                icon={PlayCircle}
              />
              <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/40 shadow-xl shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-white/5 transition-all duration-500 hover:ring-indigo-500/30">
                <AnimeList api={recommendAnime} />
              </div>
            </section>
          </>
        )}
      </div>

      {/* Footer / CTA Section */}
      {!loadingTop && !loadingRecs && !loadingPop && (
        <section className="container mx-auto px-6 pt-32 pb-16 max-w-6xl">
          <div className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-indigo-900 dark:to-violet-950 px-8 py-16 sm:py-24 text-center shadow-2xl rounded-[2.5rem] sm:px-20 group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>

            <h2 className="relative mx-auto max-w-2xl text-3xl sm:text-5xl font-black tracking-tight text-white transition-transform duration-500 group-hover:scale-105">
              Start building your collection today.
            </h2>
            <p className="relative mx-auto mt-6 max-w-xl text-lg sm:text-xl leading-8 text-indigo-100 opacity-90 font-medium">
              Create an account to track your progress, save your favorite
              series, and engage with the community.
            </p>
            <div className="relative mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/users/dashboard"
                className="rounded-2xl bg-white px-8 py-4 text-base font-bold text-indigo-600 shadow-xl hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all hover:scale-110 active:scale-95"
              >
                Go to Dashboard
              </Link>
            </div>

            {/* Animated background blobs */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-fuchsia-500/20 blur-[80px] rounded-full animate-float"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full animate-float-delayed"></div>
          </div>
        </section>
      )}
    </div>
  );
}
