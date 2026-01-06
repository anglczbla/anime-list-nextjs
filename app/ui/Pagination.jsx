const Pagination = ({ totalPages, page, setPage }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-6 justify-center">
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => setPage(idx + 1)}
          className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition ${
            page === idx + 1
              ? "bg-slate-800 text-white shadow-lg"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
