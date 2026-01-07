import Link from "next/link";
import { authUserSession } from "../libs/auth";
import InputSearch from "./InputSearch";
import UserActionButton from "./UserActionButton";
const Navbar = async () => {
  const user = await authUserSession();
  return (
    <div>
      <header className="bg-indigo-500">
        <div className="flex md:flex-row flex-col justify-between p-4 gap-2">
          <Link href="/" className="font-bold text-white text-2xl">
            Anime List
          </Link>
          {user ? <Link href="/users/dashboard">Dashboard</Link> : null}
          <InputSearch />
          <UserActionButton />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
