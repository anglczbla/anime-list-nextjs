const Pagination = ({ page, lastPage, setPage }) => {
  const scrollTop = () => {
    scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  const handleNextPage = () => {
    setPage((prevState) => prevState + 1);
    scrollTop();
  };

  const handlePrevPage = () => {
    setPage((prevState) => prevState - 1);
    scrollTop();
  };

  if (lastPage <= 1) return null;

  return (
    <div className="flex justify-center items-center py-4 px-2 gap-4 text-slate-800 dark:text-slate-200 text-lg font-medium">
      {page > 1 && (
        <button
          onClick={handlePrevPage}
          className="transition-all hover:text-indigo-600 underline"
        >
          Prev
        </button>
      )}

      <p>
        {page} of {lastPage}
      </p>

      {page < lastPage && (
        <button
          onClick={handleNextPage}
          className="transition-all hover:text-indigo-600 underline"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
