import Image from "next/image";
import Link from "next/link";
import HeaderDashboard from "../../../ui/HeaderDashboard";

const Page = ({ title }) => {
  return (
    <section className="mt-4 w-full">
      <HeaderDashboard title="My Anime Collection" />
      <div className="grid gap-4 sm:grid-cols-2 glg:grid-cols-4">
        <Link href="/" className="relative border-2">
          <Image
            src=".."
            alt=".."
            width={350}
            height={350}
            className="w-full"
          />
          <div className="absolute flex items-center justify-center w-full bg-color-blue h-16">
            <h5 className="text-xl text-center">Judul Anime</h5>
          </div>
        </Link>
        <Link href="/" className="relative border-2">
          <Image
            src=".."
            alt=".."
            width={350}
            height={350}
            className="w-full"
          />
          <div className="absolute flex items-center justify-center w-full bg-color-blue h-16">
            <h5 className="text-xl text-center">Judul Anime</h5>
          </div>
        </Link>

        <Link href="/" className="relative border-2">
          <Image
            src=".."
            alt=".."
            width={350}
            height={350}
            className="w-fulll"
          />
          <div className="absolute flex items-center justify-center w-full bg-color-blue h-16">
            <h5 className="text-xl text-center">Judul Anime</h5>
          </div>
        </Link>
        <Link href="/" className="relative border-2">
          <Image
            src=".."
            alt=".."
            width={350}
            height={350}
            className="w-full"
          />
          <div className="absolute flex items-center justify-center w-full bg-color-blue h-16">
            <h5 className="text-xl text-center">Judul Anime</h5>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Page;
