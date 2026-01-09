"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteComment = ({ id }) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const data = { id };
      const response = await axios.delete("/api/v1/comment", { data });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.isDeleted) {
        router.refresh();
      }
    },
    onError: (error) => {
      console.error("Failed to delete comment:", error);
      alert("Failed to delete comment");
    },
  });

  const handleDelete = (e) => {
    e.preventDefault();
    const isConfirmed = confirm(
      "Are you sure you want to delete this comment?"
    );
    if (isConfirmed) {
      mutation.mutate();
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={mutation.isPending}
      className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
      title="Delete Comment"
    >
      {mutation.isPending ? (
        <svg
          className="animate-spin h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        </svg>
      )}
    </button>
  );
};

export default DeleteComment;
