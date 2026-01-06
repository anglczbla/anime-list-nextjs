import Pagination from "../ui/Pagination";
import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ api, totalPages, setPage, page }) => {
  return (
    <div>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        {api?.map((anime) => {
          return (
            <Link
              key={anime.mal_id}
              href={`/${anime.mal_id}`}
              className="cursor-pointer text-color-blue hover:text-color-accent transition-all"
            >
              <Image
                src={anime.images.webp.image_url}
                alt="..."
                width={350}
                height={350}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <h3 className="font-bold md:text-xl text-md p-4">
                {anime.title}
              </h3>
            </Link>
          );
        })}
      </div>
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
};

export default AnimeList;
