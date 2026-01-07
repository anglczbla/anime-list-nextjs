import Image from "next/image";
import Link from "next/link";
import { authUserSession } from "../../libs/auth";
const Page = async () => {
  const user = await authUserSession();
  console.log(user);

  return (
    <div>
      <h3>Dashboard</h3>
      <h5 className="mt-8 text-2xl flex flex-col font-bold justify-center items-center">
        WELCOME, {user?.name}
      </h5>
      <Image src={user?.image} alt="..." width={250} height={250} />
      <div className="flex flex-wrap gap-4 py-8">
        <Link
          href="/users/dashboard/collection"
          className="bg-color-blue text-color-dark font-bold px-4 py-2 text-xl"
        >
          My Collection
        </Link>
        <Link
          href="/users/dashboard/comment"
          className="bg-color-blue text-color-dark font-bold px-4 py-2 text-xl"
        >
          My Comment
        </Link>
      </div>
    </div>
  );
};

export default Page;
