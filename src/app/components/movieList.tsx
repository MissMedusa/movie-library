"use client";
import { useEffect, useState } from "react";
import { Movie } from "../lib/movieType";
import Link from "next/link";

export default function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [ageRatingFilter, setAgeRatingFilter] = useState<number | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movies");
        if (response.ok) {
          const data = await response.json();
          setMovies(data);
        }
      } catch (error) {
        console.error("Failed to fetch movies", error);
      }
    };
    fetchMovies();
  }, []);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value ? parseInt(event.target.value, 10) : null;
    setAgeRatingFilter(value);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/movies/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {

        setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
      } else {
        console.error("Failed to delete movie:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredMovies = ageRatingFilter
    ? movies.filter((movie) => movie.ageRating === ageRatingFilter)
    : movies;

  return (
    <div className="mx-auto mt-7 max-w-5xl p-4">
      <div className="mb-6">
        <label htmlFor="ageRating" className="mr-2 text-xl">Filter by Age Rating: </label>
        <select id="ageRating" onChange={handleFilterChange} className="border p-2 rounded text-lg">
          <option value="">All</option>
          <option value="18">18+</option>
          <option value="16">16+</option>
          <option value="12">12+</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="border p-6 rounded-lg bg-white shadow-lg hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-semibold">{movie.title}</h3>
            <p className="mt-2 text-gray-600">{movie.description}</p>
            <div className="mt-4 flex justify-between">
              <Link href={`/movies/${movie.id}`} className="text-cyan-700 hover:underline">View Details</Link>
              <Link href={`/movies/${movie.id}/edit`} className="text-cyan-700 hover:underline">Edit</Link>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(movie.id!)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
