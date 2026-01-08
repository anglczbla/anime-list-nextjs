"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CommentInput = ({ anime_mal_id, user_email, user_name, anime_title }) => {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [isComment, setIsComment] = useState(null);

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const data = {
        anime_mal_id,
        user_email,
        user_name,
        comment: payload.comment,
        anime_title,
      };

      const response = await axios.post("/api/v1/comment", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.isCreated) {
        setIsComment(true);
      } else if (data.isDeleted) {
        setIsComment(false);
      }
      setComment("");
      router.refresh();
    },
    onError: (error) => {
      console.error("Failed to post comment:", error);
      alert("Failed to post comment");
    },
  });

  const handleComment = (e) => {
    e.preventDefault();
    if (!user_email) {
      alert("Please login to add a comment");
      return;
    }
    if (!comment.trim()) return;
    mutation.mutate({ comment });
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
      <div className="flex justify-between items-center">
        <label className="text-lg font-bold text-indigo-900">
          Leave a Comment
        </label>
        {user_name && (
          <span className="text-xs text-slate-500 font-medium">
            Posting as <span className="text-indigo-600">{user_name}</span>
          </span>
        )}
      </div>
      <div className="relative">
        <textarea
          value={comment}
          onChange={handleChange}
          placeholder={
            user_email
              ? "Share your thoughts on this anime..."
              : "Please login to join the discussion."
          }
          className="w-full h-32 p-4 text-slate-700 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-y min-h-[100px]"
          disabled={!user_email || mutation.isPending}
        />
        <div className="absolute bottom-3 right-3 text-xs text-slate-400">
          {comment.length} chars
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleComment}
          disabled={mutation.isPending || !comment.trim() || !user_email}
          className={`px-6 py-2.5 rounded-lg font-semibold transition-all shadow-sm flex items-center gap-2
            ${
              mutation.isPending || !comment.trim() || !user_email
                ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md active:scale-95"
            }`}
        >
          {mutation.isPending ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
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
              Posting...
            </>
          ) : (
            "Post Comment"
          )}
        </button>
      </div>
    </div>
  );
};

export default CommentInput;
