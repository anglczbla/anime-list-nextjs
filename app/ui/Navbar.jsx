import Link from "next/link";
import InputSearch from "./InputSearch";
import UserActionButton from "./UserActionButton";
const Navbar = () => {
  return (
    <div>
      <header className="bg-indigo-500">
        <div className="flex md:flex-row flex-col justify-between p-4 gap-2">
          <Link href="/" className="font-bold text-white text-2xl">
            Anime List
          </Link>
          <InputSearch />
          <UserActionButton />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
