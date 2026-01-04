import Image from "next/image";

const AnimeList = ({ title, images }) => {
  return (
    <div className="bg-indigo-500 shadow-xl rounded-lg overflow-hidden transition-transform hover:scale-105 duration-300 h-full flex flex-col">
      <div className="relative w-full h-64 md:h-80">
        <Image 
          src={images} 
          alt={title} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4 flex flex-col justify-center flex-grow">
        <h3 className="font-bold text-white text-md md:text-lg text-center leading-tight">{title}</h3>
      </div>
    </div>
  );
};

export default AnimeList;