const Loading = () => {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from(new Array(12)).map((_, index) => (
        <div key={index} className="w-full">
          <div className="aspect-[3/4] w-full bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md" />
          <div className="p-3">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 animate-pulse rounded w-11/12 mb-2" />
            <div className="h-4 bg-slate-200 dark:bg-slate-800 animate-pulse rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
