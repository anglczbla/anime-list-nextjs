import Skeleton from "@mui/material/Skeleton";

const Loading = () => {
  return (
    <div className="mt-4 grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
      {Array.from(new Array(8)).map((_, index) => (
        <div key={index} className="w-full">
          <div className="aspect-[3/4] w-full">
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              className="rounded-md"
            />
          </div>
          <div className="p-4">
            <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} width="90%" />
            <Skeleton variant="text" sx={{ fontSize: "1.2rem" }} width="50%" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
