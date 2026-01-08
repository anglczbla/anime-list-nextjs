import Skeleton from "@mui/material/Skeleton";

const LoadingDetail = () => {
  return (
    <div className="pt-4 px-4 container mx-auto mb-6">
      {/* Title & Button Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <Skeleton variant="text" width="60%" height={50} />
        <Skeleton
          variant="rectangular"
          width={180}
          height={40}
          className="rounded"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Skeleton */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          {/* Main Image */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={600}
            className="rounded-xl"
          />

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
            {Array.from(new Array(6)).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={60}
                className="rounded-lg"
              />
            ))}
          </div>

          {/* Genres/Producers */}
          <div className="p-3 rounded-lg border border-slate-200">
            <Skeleton
              variant="text"
              width="40%"
              height={25}
              className="mb-2"
            />
            <div className="flex gap-2 mb-4">
              <Skeleton variant="rounded" width={50} height={20} />
              <Skeleton variant="rounded" width={50} height={20} />
              <Skeleton variant="rounded" width={50} height={20} />
            </div>

            {/* Staff Skeleton */}
            <Skeleton
              variant="text"
              width="30%"
              height={25}
              className="mb-2"
            />
            <div className="flex flex-col gap-2 mb-4">
              {Array.from(new Array(5)).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton
                    variant="rectangular"
                    width={40}
                    height={40}
                    className="rounded-md shrink-0"
                  />
                  <div className="flex flex-col gap-1 w-full">
                    <Skeleton variant="text" width="70%" height={15} />
                    <Skeleton variant="text" width="40%" height={10} />
                  </div>
                </div>
              ))}
            </div>

            {/* Producers Skeleton */}
            <Skeleton
              variant="text"
              width="40%"
              height={25}
              className="mb-2"
            />
            <div className="flex gap-2">
              <Skeleton variant="rounded" width={70} height={20} />
              <Skeleton variant="rounded" width={70} height={20} />
            </div>
          </div>

          {/* Statistics Skeleton (Now in Sidebar) */}
          <div className="flex flex-col gap-4">
            <Skeleton
              variant="rectangular"
              width="100%"
              height={150}
              className="rounded-lg"
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="w-full md:w-2/3 flex flex-col gap-6">
          {/* Synopsis */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={150}
            className="rounded-xl"
          />

          {/* Background */}
          <Skeleton
            variant="rectangular"
            width="100%"
            height={80}
            className="rounded-xl"
          />

          {/* Characters Slider */}
          <div>
            <Skeleton
              variant="text"
              width="30%"
              height={40}
              className="mb-2"
            />
            <div className="flex gap-3 overflow-hidden">
              {Array.from(new Array(5)).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width={120}
                  height={180}
                  className="rounded-lg shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Gallery Slider */}
          <div>
            <Skeleton
              variant="text"
              width="30%"
              height={40}
              className="mb-2"
            />
            <div className="flex gap-3 overflow-hidden">
              {Array.from(new Array(3)).map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rectangular"
                  width={200}
                  height={280}
                  className="rounded-lg shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Trailer */}
          <div className="w-full aspect-video">
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDetail;