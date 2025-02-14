import MovieList from "@/app/components/movieList";

export default function MoviesPage() {
  return (
    <div className="p-6">
      <h1 className="text-5xl my-10 text-center">Movie Catalog</h1>
      <MovieList />
    </div>
  );
}