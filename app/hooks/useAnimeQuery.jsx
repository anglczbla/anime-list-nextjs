"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export const useAnimeQuery = ({
  endpoint = "",
  initialLimit = 20,
  searchQuery = "",
  genres = "",
  seasons = "",
  year = "",
  enabled = true,
} = {}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, genres, seasons, year]);

  const { isPending, error, data, isPlaceholderData } = useQuery({
    queryKey: [
      "anime",
      endpoint,
      searchQuery,
      page,
      limit,
      genres,
      seasons,
      year,
    ],
    queryFn: async () => {
      const params = {
        limit,
        page,
      };

      if (searchQuery) {
        params.q = searchQuery;
        if (endpoint === "anime") {
          params.order_by = "popularity";
          params.sort = "asc";
        }
      }
      if (genres) params.genres = genres;
      if (seasons) params.seasons = seasons;
      if (year) params.year = year;

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`;
      const response = await axios.get(url, { params });
      return response.data;
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    enabled,
  });

  return {
    isPending,
    error,
    data: data?.data,
    pagination: data?.pagination,
    isPlaceholderData,
    page,
    setPage,
    limit,
    setLimit,
  };
};
