const LoadingDetail = () => {
  return (
    <div className="pt-4 px-4 container mx-auto mb-6">
      {/* Title & Button Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="w-3/5 h-12 bg-slate-200 dark:bg-slate-800 animate-pulse rounded" />
        <div className="w-44 h-10 bg-slate-200 dark:bg-slate-800 animate-pulse rounded" />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Skeleton */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          {/* Main Image */}
          <div className="w-full h-[600px] bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl" />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
            {Array.from(new Array(6)).map((_, i) => (
              <div key={i} className="h-14 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg" />
            ))}
          </div>

          {/* Genres/Producers */}
          <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900/50">
            <div className="w-2/5 h-6 bg-slate-200 dark:bg-slate-800 animate-pulse rounded mb-2" />
            <div className="flex gap-2 mb-4">
              <div className="w-12 h-5 bg-slate-200 dark:bg-slate-800 animate-pulse rounded" />
              <div className="w-12 h-5 bg-slate-200 dark:bg-slate-800 animate-pulse rounded" />
              <div className="w-12 h-5 bg-slate-200 dark:bg-slate-800 animate-pulse rounded" />
            </div>

            {/* Staff Skeleton */}
            <div className="w-1/3 h-6 bg-slate-200 dark:bg-slate-800 animate-pulse rounded mb-2" />
            <div className="flex flex-col gap-2 mb-4">
              {Array.from(new Array(5)).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-md shrink-0" />
                  <div className="flex flex-col gap-1 w-full">
                    <div className="w-9/12 h-4 bg-slate-200 dark:bg-slate-800 animate-pulse rounded" />
                    <div className="w-5/12 h-3 bg-slate-200 dark:bg-slate-800 animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </div>

            {/* Producers Skeleton */}
            <div className="w-2/5 h-6 bg-slate-200 dark:bg-slate-800 animate-pulse rounded mb-2" />
            <div className="flex gap-2">
              <div className="w-20 h-5 bg-slate-200 dark:bg-slate-800 animate-pulse rounded" />
              <div className="w-20 h-5 bg-slate-200 dark:bg-slate-800 animate-pulse rounded" />
            </div>
          </div>

          {/* Statistics Skeleton (Now in Sidebar) */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-36 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg" />
            <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {/* Synopsis */}
          <div className="w-full h-36 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl" />

          {/* Background */}
          <div className="w-full h-20 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl" />

          {/* Characters Slider */}
          <div>
            <div className="w-1/3 h-8 bg-slate-200 dark:bg-slate-800 animate-pulse rounded mb-2" />
            <div className="flex gap-3 overflow-hidden">
              {Array.from(new Array(5)).map((_, i) => (
                <div
                  key={i}
                  className="w-[120px] h-[180px] bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Gallery Slider */}
          <div>
            <div className="w-1/3 h-8 bg-slate-200 dark:bg-slate-800 animate-pulse rounded mb-2" />
            <div className="flex gap-3 overflow-hidden">
              {Array.from(new Array(3)).map((_, i) => (
                <div
                  key={i}
                  className="w-[200px] h-[280px] bg-slate-200 dark:bg-slate-800 animate-pulse rounded-lg shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Trailer */}
          <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800 animate-pulse rounded-xl" />

          {/* Comments Section Skeleton */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm mt-4">
            <div className="w-2/5 h-8 bg-slate-200 dark:bg-slate-700 animate-pulse rounded mb-6" />
            
            {/* Input Skeleton */}
            <div className="w-full h-28 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-lg mb-8" />

            {/* List Skeleton */}
            <div className="flex flex-col gap-4">
               {Array.from(new Array(3)).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-full shrink-0" />
                  <div className="flex flex-col w-full gap-2">
                     <div className="w-1/3 h-5 bg-slate-200 dark:bg-slate-700 animate-pulse rounded" />
                     <div className="w-11/12 h-4 bg-slate-200 dark:bg-slate-700 animate-pulse rounded" />
                     <div className="w-3/5 h-4 bg-slate-200 dark:bg-slate-700 animate-pulse rounded" />
                  </div>
                </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDetail;