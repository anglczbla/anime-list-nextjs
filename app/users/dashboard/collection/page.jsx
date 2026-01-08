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

  console.log(collection);

  return (
    <section className="mt-4 w-full">
      <HeaderDashboard title="My Anime Collection" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {collection.length > 0 ? (
          collection.map((c, i) => (
            <Link
              key={c.anime_mal_id || i}
              href={`/anime/${c.anime_mal_id}`}
              className="relative border-2"
            >
              <Image
                src={
                  c.anime_image || "https://placehold.co/350x350?text=No+Image"
                }
                alt={c.anime_title || c.anime_mal_id}
                width={350}
                height={350}
                className="w-full"
              />
              <div className="absolute bottom-0 flex items-center justify-center w-full bg-color-blue h-16">
                <h5 className="text-xl text-center">{c.anime_title}</h5>
              </div>
            </Link>
          ))
        ) : (
          <h3 className="col-span-full text-center text-xl">
            No anime in your collection, lets collect!
            <Header linkHref="/" linkTitle="view all anime" />
          </h3>
        )}
      </div>
    </section>
  );
};

export default Page;
