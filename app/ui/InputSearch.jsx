"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const InputSearch = () => {
  const searchRef = useRef();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search/${searchRef.current.value}`);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search Anime"
        className="w-full p-2 rounded"
        ref={searchRef}
      />
      <button
        className="absolute top-1 end-1 cursor-pointer"
        onClick={handleSearch}
      >
        <Search size={32} />
      </button>
    </div>
  );
};

export default InputSearch;
