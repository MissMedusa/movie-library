"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Movie } from "../lib/movieType";
import Link from "next/link";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  // Fetch movie details when the component is mounted
  useEffect(() => {
    if (!id) return;
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMovie(data);
        }
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto mt-7 max-w-3xl p-4">
      <p className="p-4 text-3xl text-center">Movie Details</p>
      <h2 className="text-3xl font-bold">Title: {movie.title}</h2>
      <p className="mt-4 text-lg">Description: {movie.description}</p>
      <p className="mt-4 text-lg">Age Rating: <span className="font-semibold">{movie.ageRating}+</span></p>
      <Link
        href={`/movies/${movie.id}/edit`}
        className="bg-slate-600 text-white mt-5 py-1 px-4 rounded hover:bg-slate-900 inline-block"
      >
        Edit
      </Link>
    </div>
  );
};
