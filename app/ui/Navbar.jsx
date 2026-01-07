import Link from "next/link";
import { authUserSession } from "../libs/auth";
import InputSearch from "./InputSearch";
import UserActionButton from "./UserActionButton";

const Navbar = async () => {
  const user = await authUserSession();
  return (
    <header className="sticky top-0 z-50 glass shadow-sm">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link
            href="/"
            className="font-extrabold text-2xl tracking-tighter text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            AnimeList<span className="text-violet-500">.</span>
          </Link>
          
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
             {user && (
              <Link 
                href="/users/dashboard" 
                className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Dashboard
              </Link>
            )}
            <InputSearch />
            <UserActionButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
