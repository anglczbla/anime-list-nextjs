import Image from "next/image";
import Link from "next/link";
import { authUserSession } from "../../../libs/auth";
import prisma from "../../../libs/prisma";
import Header from "../../../ui/Header";
import HeaderDashboard from "../../../ui/HeaderDashboard";

const Page = async () => {
  const user = await authUserSession();
  const collection = await prisma.collection.findMany({
    where: { user_email: user.email },
  });

  return (
    <section className="mt-4 w-full px-4 mb-8">
      <HeaderDashboard title="My Anime Collection" />
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {collection.length > 0 ? (
          collection.map((c, i) => (
            <Link
              key={c.anime_mal_id || i}
              href={`/anime/${c.anime_mal_id}`}
              className="relative group overflow-hidden rounded-xl shadow-md border border-slate-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                  src={
                    c.anime_image ||
                    "https://placehold.co/350x450?text=No+Image"
                  }
                  alt={c.anime_title || c.anime_mal_id}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent pt-10">
                <h5 className="text-white font-bold text-center text-md line-clamp-2 drop-shadow-md group-hover:text-indigo-300 transition-colors">
                  {c.anime_title}
                </h5>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <h3 className="text-xl font-semibold mb-2">
              Your collection is empty
            </h3>
            <p className="mb-6">
              Start exploring anime and add them to your list!
            </p>
            <Link
              href="/"
              className="px-6 py-2 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Browse Anime
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
