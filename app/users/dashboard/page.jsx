import Image from "next/image";
import Link from "next/link";
import { authUserSession } from "../../libs/auth";

const Page = async () => {
  const user = await authUserSession();

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex flex-col items-center w-full max-w-2xl">
        <div className="relative mb-6 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <Image
            src={user?.image || "https://placehold.co/250x250?text=User"}
            alt="User Profile"
            width={200}
            height={200}
            className="relative rounded-full border-4 border-white dark:border-slate-800 shadow-lg object-cover w-40 h-40 md:w-48 md:h-48"
          />
        </div>
        
        <h2 className="text-3xl font-black text-indigo-900 dark:text-indigo-300 mb-2">
          WELCOME, {user?.name}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10 font-medium">{user?.email}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <Link
            href="/users/dashboard/collection"
            className="flex items-center justify-between p-6 bg-indigo-600 text-white rounded-xl font-bold text-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 hover:shadow-indigo-300 transform hover:-translate-y-1"
          >
            <span>My Collection</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </Link>
          <Link
            href="/users/dashboard/comment"
            className="flex items-center justify-between p-6 bg-amber-500 text-white rounded-xl font-bold text-xl hover:bg-amber-600 transition-all shadow-lg shadow-amber-100 dark:shadow-amber-900/50 hover:shadow-amber-200 transform hover:-translate-y-1"
          >
            <span>My Comments</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
