import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ api }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {api?.map((anime, index) => {
        return (
          <Link
            key={`${anime.mal_id}-${index}`}
            href={`/anime/${anime.mal_id}`}
            className="group relative block overflow-hidden rounded-lg shadow-sm card-hover bg-white dark:bg-slate-800"
          >
            <div className="relative w-full aspect-[3/4]">
              <Image
                src={
                  anime?.images?.webp?.large_image_url ||
                  anime?.images?.jpg?.large_image_url
                }
                alt={anime.title}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
              />
              <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black/90 dark:via-black/50 dark:to-transparent pointer-events-none" />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-3 pointer-events-none">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm md:text-md leading-tight line-clamp-2 drop-shadow-sm">
                {anime.title}
              </h3>
              {anime.year && (
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
                  {anime.year}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AnimeList;
