import Link from "next/link";
import { authUserSession } from "../libs/auth";
import InputSearch from "./InputSearch";
import ThemeToggle from "./ThemeToggle";
import UserActionButton from "./UserActionButton";

const Navbar = async () => {
  const user = await authUserSession();
  return (
    <header className="sticky top-0 z-50 glass shadow-sm">
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link
            href="/"
            className="font-extrabold text-2xl tracking-tighter text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors"
          >
            AnimeList<span className="text-violet-500">.</span>
          </Link>
          
          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
             {user && (
              <Link 
                href="/users/dashboard" 
                className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Dashboard
              </Link>
            )}
            <InputSearch />
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <UserActionButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
