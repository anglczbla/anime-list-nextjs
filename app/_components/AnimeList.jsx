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
            className="group block overflow-hidden rounded-lg shadow-sm card-hover bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
          >
            <div className="relative w-full aspect-[2/3] overflow-hidden">
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
            </div>

            <div className="p-2">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-md leading-tight line-clamp-2 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {anime.title}
              </h3>
              {anime.year && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
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
