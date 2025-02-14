"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Movie } from "../lib/movieType";

export default function EditMovieForm() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [formData, setFormData] = useState<Omit<Movie, "id"> | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMovie(data);
          setFormData({
            title: data.title,
            description: data.description,
            ageRating: data.ageRating,
          });
        }
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData || !id) return;

    try {
      const response = await fetch(`/api/movies/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, id }),
      });

      if (response.ok) {
        console.log("Movie updated successfully!");
      } else {
        console.error("Failed to update movie:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-7 max-w-md p-4 space-y-4">
      <p className="p-4 text-3xl text-center">Edit Movie</p>
      <div>
        <label htmlFor="title" className="block mb-3 text-xl">Movie title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData?.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="p-2 border w-full rounded text-gray-500"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-3 text-xl">Movie description</label>
        <textarea
          name="description"
          id="description"
          value={formData?.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="max-w-md w-full p-2 border rounded text-gray-500"
          required
        />
      </div>
      <div>
        <p className="mb-3 text-xl">Age Rating</p>
        <div className="flex gap-4">
          {[0, 12, 16, 18].map((age) => (
            <label key={age} className="flex items-center mb-5">
              <input
                type="radio"
                name="ageRating"
                value={age}
                checked={formData?.ageRating === age}
                onChange={(e) => setFormData({ ...formData, ageRating: Number(e.target.value) })}
                className="mr-1"
              />
              {age}+
            </label>
          ))}
        </div>
      </div>
      <button type="submit" className="bg-slate-600 text-white p-2 rounded hover:bg-slate-900">
        Save Changes
      </button>
    </form>
  );
};