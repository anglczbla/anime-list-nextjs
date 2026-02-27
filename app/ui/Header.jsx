import Link from "next/link";
import { ChevronRight } from "lucide-react";

const Header = ({ title, linkHref, linkTitle, icon: Icon }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 group/header">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="relative">
             <div className="absolute inset-0 bg-indigo-500/20 blur-lg rounded-full group-hover/header:bg-indigo-500/30 transition-colors"></div>
             <div className="relative p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-indigo-600 dark:text-indigo-400 shadow-sm">
                <Icon size={24} strokeWidth={2.5} />
             </div>
          </div>
        )}
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>
      </div>

      {linkHref && linkTitle ? (
        <Link
          href={linkHref}
          className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
        >
          <span>{linkTitle}</span>
          <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      ) : null}
    </div>
  );
};

export default Header;
