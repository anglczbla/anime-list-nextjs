import Image from "next/image";
import Link from "next/link";

const AnimeList = ({ title, images, id }) => {
  return (
    <Link href={`/${id}`} className="cursor-pointer">
      <div className="bg-indigo-500 shadow-xl rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300 h-full flex flex-col">
        <div className="relative w-full flex-grow">
          <Image
            src={images}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-2 flex flex-col justify-center">
          <h3 className="font-bold text-white text-sm text-center leading-tight line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default AnimeList;
