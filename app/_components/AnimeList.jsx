import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ api }) => {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
      {api?.map((anime, index) => {
        return (
          <Link
            key={`${anime.mal_id}-${index}`}
            href={`/anime/${anime.mal_id}`}
            className="group relative block overflow-hidden rounded-lg shadow-sm card-hover"
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
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 pointer-events-none">
              <h3 className="font-bold text-white text-md md:text-lg leading-tight line-clamp-2 drop-shadow-md">
                {anime.title}
              </h3>
              {anime.year && (
                <p className="text-xs text-slate-200 mt-1 font-medium">
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
