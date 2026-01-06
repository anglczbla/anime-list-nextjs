"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export const useAnimeQuery = ({
  endpoint = "",
  initialLimit = 20,
  searchQuery = "",
  enabled = true,
} = {}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  const { isPending, error, data, isPlaceholderData } = useQuery({
    queryKey: ["anime", endpoint, searchQuery, page, limit],
    queryFn: async () => {
      let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}?limit=${limit}&page=${page}`;

      if (searchQuery) {
        url += `&q=${searchQuery}`;
      }

      const response = await axios.get(url);
      return response.data.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    enabled,
  });

  return {
    isPending,
    error,
    data,
    isPlaceholderData,
    page,
    setPage,
    limit,
    setLimit,
  };
};
