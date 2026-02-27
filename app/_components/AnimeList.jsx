import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

const AnimeList = ({ api }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {api?.map((anime, index) => {
        return (
          <Link
            key={`${anime.mal_id}-${index}`}
            href={`/anime/${anime.mal_id}`}
            className="group relative flex flex-col bg-slate-50 dark:bg-slate-900/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 border border-slate-200 dark:border-white/5"
          >
            <div className="relative w-full aspect-[3/4.5] overflow-hidden">
              <Image
                src={
                  anime?.images?.webp?.large_image_url ||
                  anime?.images?.jpg?.large_image_url
                }
                alt={anime.title}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Score Badge */}
              {anime.score && (
                <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-amber-400 text-[10px] font-black shadow-lg">
                  <Star size={10} fill="currentColor" />
                  <span>{anime.score}</span>
                </div>
              )}

              {/* Rank/Type Badge */}
              {anime.type && (
                <div className="absolute top-2 left-2 px-2 py-1 rounded-lg bg-indigo-600/80 backdrop-blur-md text-white text-[10px] font-bold shadow-lg uppercase tracking-wider">
                   {anime.type}
                </div>
              )}
            </div>

            <div className="p-4 flex flex-col gap-1.5">
              <h3 className="font-extrabold text-slate-800 dark:text-slate-100 text-sm leading-tight line-clamp-2 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {anime.title}
              </h3>
              <div className="flex items-center justify-between mt-auto">
                 {anime.year ? (
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                       {anime.year}
                    </span>
                 ) : (
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                       Ongoing
                    </span>
                 )}
                 {anime.episodes && (
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                       {anime.episodes} EPS
                    </span>
                 )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AnimeList;
