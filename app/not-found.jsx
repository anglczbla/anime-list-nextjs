"use client";
import { Ban } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-4 text-slate-800 dark:text-slate-200">
      <div className="flex items-center gap-4">
        <Ban size={64} className="text-red-500" />
        <h1 className="text-4xl font-bold text-indigo-500">404</h1>
      </div>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-slate-400">The resource you requested could not be found.</p>
      <button 
        onClick={() => router.back()} 
        className="mt-4 flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-semibold shadow-lg hover:shadow-indigo-500/20"
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
