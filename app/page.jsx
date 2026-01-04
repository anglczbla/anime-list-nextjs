import AnimeList from "./components/AnimeList/AnimeList";
import Search from "./components/Search/Search";

export default function Home() {
  return (
    <div>
      <h1>Anime List</h1>
      <Search />
      <AnimeList />
    </div>
  );
}
