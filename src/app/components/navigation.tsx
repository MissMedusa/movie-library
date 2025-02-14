"use client";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div>
        <Link href="/" className="mr-4">Home</Link>
        <Link href="/movies" className="mr-4">Movies</Link>
        <Link href="/movies/new" className="mr-4">Add Movie</Link>
      </div>
    </nav>
  );
}