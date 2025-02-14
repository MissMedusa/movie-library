const API_URL = "https://6787f6f6c4a42c916108e8de.mockapi.io/movies";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  if (!id) {
    return new Response("Movie ID is required", { status: 400 });
  }

  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    return new Response("Movie not found", { status: 404 });
  }
  
  const data = await response.json();
  return Response.json(data);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params; 
  const { title, description, ageRating } = await req.json();

  if (!id || !title || !description || typeof ageRating !== 'number') {
    return new Response("Invalid data", { status: 400 });
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, ageRating }),
  });

  if (!response.ok) {
    return new Response("Error updating movie", { status: response.status });
  }

  const data = await response.json();
  return Response.json(data);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;

  if (!id) {
    return new Response("Movie ID is required", { status: 400 });
  }

  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    return new Response("Error deleting movie", { status: response.status });
  }

  return new Response(null, { status: 204 });
}