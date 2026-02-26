const Loading = () => {
  return (
    <div className="mt-4 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
      {Array.from(new Array(12)).map((_, index) => (
        <div key={index} className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          <div className="aspect-[2/3] w-full bg-slate-200 dark:bg-slate-700/50 animate-pulse" />
          <div className="p-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-700/50 animate-pulse rounded w-3/4 mb-2" />
            <div className="h-3 bg-slate-200 dark:bg-slate-700/50 animate-pulse rounded w-1/4 mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
