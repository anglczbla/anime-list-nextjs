import Skeleton from "@mui/material/Skeleton";

const LoadingDetail = () => {
  return (
    <div className="pt-4 px-4 container mx-auto mb-6">
      <div className="mb-4">
        <Skeleton variant="text" width="60%" height={40} />
      </div>
      <div className="mb-6">
        <Skeleton variant="rectangular" width={150} height={40} className="rounded" />
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2">
            {Array.from(new Array(6)).map((_, i) => (
              <Skeleton key={i} variant="rectangular" height={60} className="rounded" />
            ))}
          </div>
          <Skeleton variant="rectangular" width="100%" height={450} className="rounded" />
          <div className="flex flex-col gap-2">
            <Skeleton variant="text" width="40%" />
            <div className="flex gap-2">
                <Skeleton variant="circular" width={60} height={25} />
                <Skeleton variant="circular" width={60} height={25} />
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <Skeleton variant="rectangular" width="100%" height={200} className="rounded" />
          <Skeleton variant="rectangular" width="100%" height={150} className="rounded" />
          <Skeleton variant="rectangular" width="100%" height={300} className="rounded" />
        </div>
      </div>
    </div>
  );
};

export default LoadingDetail;
