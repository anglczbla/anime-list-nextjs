"use client";

import Image from "next/image";
import { useAnimeQuery } from "../../hooks/useAnimeQuery";
import CollectionButton from "../../ui/CollectionButton";
import CommentInput from "../../ui/CommentInput";
import Loading from "../../ui/LoadingDetail";
import Statistics from "../../ui/Statistics";

const AnimeDetail = ({ id, user_email, collection, user, commentList }) => {
  const {
    isPending,
    error,
    data: anime,
  } = useAnimeQuery({
    endpoint: `anime/${id}`,
  });

  const {
    isPending: pendingChar,
    error: errorChar,
    data: animeChar,
  } = useAnimeQuery({
    endpoint: `anime/${id}/characters`,
  });

  const {
    isPending: pendingPic,
    error: errorPic,
    data: animePic,
  } = useAnimeQuery({
    endpoint: `anime/${id}/pictures`,
  });

  const {
    isPending: pendingStac,
    error: errorStac,
    data: animeStac,
  } = useAnimeQuery({
    endpoint: `anime/${id}/statistics`,
  });

  const {
    isPending: pendingStaff,
    error: errorStaff,
    data: animeStaff,
  } = useAnimeQuery({
    endpoint: `anime/${id}/staff`,
  });

  if (isPending || pendingChar || pendingPic || pendingStac || pendingStaff)
    return <Loading />;
  if (error || errorChar || errorPic || errorStac || errorStaff)
    return (
      <div className="p-4 text-center text-red-500">
        Error: {error?.message || errorStaff?.message}
      </div>
    );

  return (
    <div className="pt-4 px-4 text-slate-800 container mx-auto mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <h3 className="text-2xl md:text-3xl font-bold text-color-primary">
          {anime?.title} {anime?.year ? `- ${anime.year}` : ""}
        </h3>

        <CollectionButton
          anime_mal_id={id}
          user_email={user_email}
          collection={collection}
          anime_image={anime?.images?.webp?.large_image_url}
          anime_title={anime?.title}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <Image
            src={
              anime?.images?.webp?.large_image_url ||
              anime?.images?.jpg?.large_image_url ||
              "https://placehold.co/450x600?text=No+Image"
            }
            alt={anime?.title || "Anime Image"}
            width={450}
            height={600}
            className="w-full h-auto rounded-xl object-cover shadow-xl"
            priority
            quality={95}
            sizes="(max-width: 768px) 100vw, 33vw"
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2 text-center">
            <div className="flex flex-col justify-center items-center rounded-lg border p-2 bg-white shadow-sm">
              <h4 className="font-bold text-gray-500 text-xs uppercase">
                Rank
              </h4>
              <p className="text-md font-semibold">{anime?.rank || "-"}</p>
            </div>
            <div className="flex flex-col justify-center items-center rounded-lg border p-2 bg-white shadow-sm">
              <h4 className="font-bold text-gray-500 text-xs uppercase">
                Score
              </h4>
              <p className="text-md font-semibold">{anime?.score || "-"}</p>
            </div>
            <div className="flex flex-col justify-center items-center rounded-lg border p-2 bg-white shadow-sm">
              <h4 className="font-bold text-gray-500 text-xs uppercase">
                Episodes
              </h4>
              <p className="text-md font-semibold">{anime?.episodes || "-"}</p>
            </div>
            <div className="flex flex-col justify-center items-center rounded-lg border p-2 bg-white shadow-sm">
              <h4 className="font-bold text-gray-500 text-xs uppercase">
                Type
              </h4>
              <p className="text-md font-semibold">{anime?.type || "-"}</p>
            </div>
            <div className="flex flex-col justify-center items-center rounded-lg border p-2 bg-white shadow-sm">
              <h4 className="font-bold text-gray-500 text-xs uppercase">
                Season
              </h4>
              <p className="text-md font-semibold capitalize">
                {anime?.season || "-"}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center rounded-lg border p-2 bg-white shadow-sm">
              <h4 className="font-bold text-gray-500 text-xs uppercase">
                Status
              </h4>
              <p className="text-md font-semibold">{anime?.status || "-"}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 bg-slate-50 p-3 rounded-lg border">
            {anime?.genres?.length > 0 && (
              <div>
                <h4 className="font-bold mb-2 border-b pb-1 text-sm">Genres</h4>
                <div className="flex flex-wrap gap-2">
                  {anime.genres.map((g) => (
                    <span
                      key={g.mal_id}
                      className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium"
                    >
                      {g.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {animeStaff?.length > 0 && (
              <div>
                <h4 className="font-bold mb-2 border-b pb-1 text-sm">Staff</h4>
                <div className="flex flex-col gap-2">
                  {animeStaff.slice(0, 5).map((staff) => (
                    <div
                      key={staff.person.mal_id}
                      className="flex items-center gap-3 bg-white p-2 rounded-lg border shadow-sm"
                    >
                      <div className="relative w-10 h-10 flex-shrink-0">
                        <Image
                          src={
                            staff.person.images.jpg.image_url ||
                            "https://placehold.co/40x40?text=?"
                          }
                          alt={staff.person.name}
                          fill
                          className="object-cover rounded-md"
                          sizes="40px"
                        />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <p className="text-[11px] font-bold text-indigo-900 truncate">
                          {staff.person.name}
                        </p>
                        <p className="text-[9px] text-slate-500 truncate">
                          {staff.positions[0] || "Staff"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {anime?.producers?.length > 0 && (
              <div>
                <h4 className="font-bold mb-2 border-b pb-1 text-sm">
                  Producers
                </h4>
                <div className="flex flex-wrap gap-2">
                  {anime.producers.map((p) => (
                    <span
                      key={p.mal_id}
                      className="px-2 py-1 bg-slate-200 text-slate-700 rounded-md text-xs"
                    >
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {anime?.studios?.length > 0 && (
              <div>
                <h4 className="font-bold mb-2 border-b pb-1 text-sm">
                  Studios
                </h4>
                <div className="flex flex-wrap gap-2">
                  {anime.studios.map((s) => (
                    <span
                      key={s.mal_id}
                      className="px-2 py-1 bg-amber-100 text-amber-800 rounded-md text-xs font-semibold"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {animeStac && <Statistics statistics={animeStac} />}
        </div>

        {/* Content */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <h3 className="text-2xl font-bold mb-2 text-indigo-900">
              Synopsis
            </h3>
            <p className="text-justify text-slate-700 leading-relaxed text-md">
              {anime?.synopsis || "No synopsis available."}
            </p>
          </div>

          {anime?.background && (
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <h3 className="text-2xl font-bold mb-2 text-indigo-900">
                Background
              </h3>
              <p className="text-justify text-slate-700 leading-relaxed text-md">
                {anime.background}
              </p>
            </div>
          )}

          {animeChar?.length > 0 && (
            <div>
              <h4 className="font-bold mb-2 border-b pb-1 text-2xl text-indigo-900">
                Characters
              </h4>
              <div className="flex overflow-x-auto gap-3 pb-4 py-2 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-slate-50">
                {animeChar.map((char) => {
                  const japaneseVA = char?.voice_actors?.find(
                    (va) => va.language === "Japanese"
                  );
                  return (
                    <div
                      key={char?.character?.mal_id}
                      className="min-w-[120px] w-[120px] flex-shrink-0 flex flex-col items-center bg-white p-2 rounded-lg shadow-sm border snap-start transition-transform hover:scale-105 justify-between"
                    >
                      <div className="flex flex-col items-center w-full">
                        <div className="relative w-full aspect-[3/4] overflow-hidden rounded mb-2 shadow-sm">
                          <Image
                            src={
                              char?.character?.images?.webp?.image_url ||
                              "https://placehold.co/120x160?text=No+Image"
                            }
                            alt={char?.character?.name}
                            fill
                            className="object-cover"
                            sizes="120px"
                          />
                        </div>
                        <p className="text-[10px] font-bold text-center leading-tight line-clamp-2 mb-1 text-indigo-900">
                          {char?.character?.name}
                        </p>
                        <p className="text-[9px] text-slate-500 text-center font-medium bg-slate-100 px-2 py-0.5 rounded-full mb-2">
                          {char?.role}
                        </p>
                      </div>

                      {japaneseVA && (
                        <div className="flex flex-col items-center w-full pt-2 border-t border-dashed border-slate-200">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200 mb-1">
                            <Image
                              src={
                                japaneseVA.person.images.jpg.image_url ||
                                "https://placehold.co/40x40?text=?"
                              }
                              alt={japaneseVA.person.name}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <p className="text-[9px] text-center leading-tight line-clamp-2 text-slate-700 font-medium">
                            {japaneseVA.person.name}
                          </p>
                          <p className="text-[8px] text-slate-400">Japanese</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {animePic?.length > 0 && (
            <div>
              <h4 className="text-2xl font-bold mb-4 text-indigo-900 border-b pb-2">
                Gallery
              </h4>
              <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-slate-50">
                {animePic.map((pic, index) => (
                  <div
                    key={index}
                    className="min-w-[200px] h-[300px] flex-shrink-0 relative rounded-lg overflow-hidden shadow-sm border snap-start hover:shadow-md transition-all"
                  >
                    <Image
                      src={
                        pic?.jpg?.large_image_url ||
                        pic?.jpg?.image_url ||
                        "https://placehold.co/200x300?text=No+Image"
                      }
                      alt={`Gallery ${index}`}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                      sizes="200px"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {(anime?.trailer?.youtube_id || anime?.trailer?.embed_url) && (
            <div className="flex flex-col gap-4">
              <h3 className="text-2xl font-bold text-indigo-900">Trailer</h3>
              <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg border-4 border-white">
                <iframe
                  src={anime.trailer.embed_url}
                  title="Trailer"
                  className="w-full h-full"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          <div className="px-4 py-2">
            <CommentInput
              anime_mal_id={id}
              user_email={user_email}
              user_name={user?.name}
              anime_title={anime?.title}
            />
            {commentList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
