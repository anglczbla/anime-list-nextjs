"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AnimeList from "./components/AnimeList";
import Search from "./components/Search";

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ["anime"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime`;
      console.log("Fetching URL:", url);
      const response = await axios.get(url);
      return response.data;
    },
  });

  console.log("isi data", data);

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>FEATURED</h1>
      <Search />
      <AnimeList data={data} />
    </div>
  );
}
