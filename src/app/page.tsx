"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-5xl my-10">Welcome to the Movie Catalog</h1>
      <p className="text-3xl mb-10">A simple movie catalog web app built with React and Next.js</p>
      <div className="flex gap-6">
        <Link href="/movies" className="bg-slate-600 text-white p-3 rounded hover:bg-slate-900">View Movies</Link>
        <Link href="/movies/new" className="bg-slate-600 text-white p-3 rounded hover:bg-slate-900">Add New Movie</Link>
      </div>
    </div>
  );
}