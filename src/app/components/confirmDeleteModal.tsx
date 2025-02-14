"use client";

interface ConfirmDeleteModalProps {
  movieId: string;
  onClose: () => void;
}

export default function ConfirmDeleteModal({ movieId, onClose }: ConfirmDeleteModalProps) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Movie deleted successfully!");
        onClose();
      } else {
        console.error("Failed to delete movie:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="modal">
      <p>Are you sure you want to delete this movie?</p>
      <button onClick={handleDelete}>Yes, Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}