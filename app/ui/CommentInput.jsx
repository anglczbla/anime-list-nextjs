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
      router.refresh();
    },
    onError: (error) => {
      console.error("Failed to update collection:", error);
      alert("Failed to update collection");
    },
  });

  console.log("isi data coomment", comment);

  const handleComment = (e) => {
    e.preventDefault();
    if (!user_email) {
      alert("Please login to add comment");
      return;
    }
    mutation.mutate({ comment });
    setComment("");
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <textarea
        value={comment}
        onChange={handleChange}
        className="w-full h-32"
      />
      <button
        onClick={handleComment}
        disabled={mutation.isPending}
        className={`px-4 py-2 font-bold rounded-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-600 text-white hover:bg-indigo-700`}
      >
        {mutation.isPending ? "...Loading" : "Post Comment"}
      </button>
    </div>
  );
};

export default CommentInput;
