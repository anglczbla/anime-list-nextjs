const Option = ({ genre }) => {
  return (
    <option value={genre?.mal_id}>
      {genre?.name} ({genre?.count})
    </option>
  );
};

export default Option;
