import Link from "next/link";

const Header = ({ title, linkHref, linkTitle, icon: Icon }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
            <Icon size={24} />
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h2>
      </div>

      {linkHref && linkTitle ? (
        <Link
          href={linkHref}
          className="group flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          <span>{linkTitle}</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 transition-transform group-hover:translate-x-1" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      ) : null}
    </div>
  );
};

export default Header;
