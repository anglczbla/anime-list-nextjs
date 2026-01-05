import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ api, totalPages, setPage, page }) => {
  console.log(api);

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
      {api.map((anime) => {
        return (
          <Link href={`/${anime.mal_id}`} className="cursor-pointer">
            <Image
              src={anime.images.webp.image_url}
              alt="..."
              width={350}
              height={350}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <h3 className="font-bold md:text-xl text-md p-4">{anime.title}</h3>
          </Link>
        );
      })}
      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setPage(idx + 1)}
            className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition ${
              page === idx + 1
                ? "bg-slate-800 text-white shadow-lg"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
