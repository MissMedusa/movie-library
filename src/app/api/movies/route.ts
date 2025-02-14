const API_URL = "https://6787f6f6c4a42c916108e8de.mockapi.io/movies";

export async function GET() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    return new Response("Error", { status: response.status });
  }
  const data = await response.json();
  return Response.json(data);
}

export async function POST(request: Request) {
  const movie = await request.json();
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    return new Response("Error", { status: response.status });
  }
  const data = await response.json();
  return Response.json(data);
}
