const Option = ({ genre }) => {
  return (
    <option value={genre?.mal_id} className="text-slate-800">
      {genre?.name} {genre?.count ? `(${genre?.count})` : ""}
    </option>
  );
};

export default Option;
