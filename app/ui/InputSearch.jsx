"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const InputSearch = () => {
  const searchRef = useRef();
  const router = useRouter();
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleInput = () => {
    const keyword = searchRef.current.value.trim();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (!keyword) {
        router.push("/");
      } else {
        router.push(`/search?q=${encodeURIComponent(keyword)}`);
      }
    }, 500);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search Anime"
        className="w-full p-2 rounded"
        ref={searchRef}
        onChange={handleInput}
      />
    </div>
  );
};

export default InputSearch;
