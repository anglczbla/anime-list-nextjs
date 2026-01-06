"use client";
import Image from "next/image";
import { use } from "react";
import { useAnimeQuery } from "../../hooks/useAnimeQuery";
import Loading from "../../ui/Loading";

const Page = ({ params }) => {
  const { id } = use(params);
  const {
    isPending,
    error,
    data: anime,
  } = useAnimeQuery({
    endpoint: `anime/${id}`,
  });

  return (
    <>
      {isPending ? (
        <Loading />
      ) : (
        <div className="pt-4 px-4 text-slate-800 container mx-auto mb-6">
          <h3 className="text-2xl font-bold mb-4">
            {anime?.title} - {anime?.year}
          </h3>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="w-full flex flex-col justify-center items-center rounded border p-2 bg-white shadow-sm">
                  <h3 className="font-bold text-gray-700">Rank</h3>
                  <p>{anime?.rank}</p>
                </div>
                <div className="w-full flex flex-col justify-center items-center rounded border p-2 bg-white shadow-sm">
                  <h3 className="font-bold text-gray-700">Score</h3>
                  <p>{anime?.score}</p>
                </div>
                <div className="w-full flex flex-col justify-center items-center rounded border p-2 bg-white shadow-sm">
                  <h3 className="font-bold text-gray-700">Duration</h3>
                  <p>{anime?.duration}</p>
                </div>
                <div className="w-full flex flex-col justify-center items-center rounded border p-2 bg-white shadow-sm">
                  <h3 className="font-bold text-gray-700">Season</h3>
                  <p>{anime?.season}</p>
                </div>
                <div className="w-full flex flex-col justify-center items-center rounded border p-2 bg-white shadow-sm">
                  <h3 className="font-bold text-gray-700">Episodes</h3>
                  <p>{anime?.episodes}</p>
                </div>
                <div className="w-full flex flex-col justify-center items-center rounded border p-2 bg-white shadow-sm">
                  <h3 className="font-bold text-gray-700">Type</h3>
                  <p>{anime?.type}</p>
                </div>
              </div>

              <Image
                src={anime?.images?.webp?.large_image_url}
                alt={anime?.title || "Anime Image"}
                width={350}
                height={350}
                className="w-full rounded object-cover shadow-md"
              />

              <div className="flex flex-wrap gap-2">
                {anime?.genres?.map((g) => (
                  <span
                    key={g.mal_id}
                    className="px-3 py-1 bg-slate-200 rounded-full text-sm text-slate-700"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full md:w-2/3 flex flex-col gap-4">
              <div className="bg-white p-4 rounded border shadow-sm">
                <h3 className="text-xl font-bold mb-2">Synopsis</h3>
                <p className="text-justify text-slate-700 leading-relaxed">
                  {anime?.synopsis}
                </p>
              </div>

              {anime?.background && (
                <div className="bg-white p-4 rounded border shadow-sm">
                  <h3 className="text-xl font-bold mb-2">Background</h3>
                  <p className="text-justify text-slate-700 leading-relaxed">
                    {anime.background}
                  </p>
                </div>
              )}

              {anime?.trailer?.embed_url && (
                <div className="w-full aspect-video rounded overflow-hidden shadow-md">
                  <iframe
                    src={anime.trailer.embed_url}
                    title="Trailer"
                    className="w-full h-full"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
