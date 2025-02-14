"use client";
import { useState } from "react";
import { Movie } from "../lib/movieType";

export default function AddMovieForm() {
  const [formData, setFormData] = useState<Omit<Movie, "id">>({
    title: "",
    description: "",
    ageRating: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          title: "",
          description: "",
          ageRating: 0,
        });
        console.log("Movie added successfully!");
      } else {
        console.error("Failed to add movie:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.name === "ageRating" ? Number(e.target.value) : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-7 max-w-md p-4 space-y-4">
      <p className="p-4 text-3xl text-center">Add a new movie</p>
      <div>
        <label htmlFor="title" className="block mb-3 text-xl">Movie title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title}
          onChange={handleChange}
          className="p-2 border w-full rounded text-gray-500"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block mb-3 text-xl">Movie description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
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
                checked={formData.ageRating === age}
                onChange={handleChange}
                className="mr-1"
              />
              {age}+
            </label>
          ))}
        </div>
      </div>
      <button type="submit" className="bg-slate-600 text-white p-2 rounded hover:bg-slate-900">
        Add movie
      </button>
    </form>
  );
}