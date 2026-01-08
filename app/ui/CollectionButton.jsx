"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const CollectionButton = ({
  anime_mal_id,
  user_email,
  collection,
  anime_image,
  anime_title,
}) => {
  const router = useRouter();
  const [isCollected, setIsCollected] = useState(!!collection);

  const mutation = useMutation({
    mutationFn: async () => {
      const data = { anime_mal_id, user_email, anime_image, anime_title };

      if (isCollected) {
        const response = await axios.delete("/api/v1/collection", { data });
        return response.data;
      } else {
        const response = await axios.post("/api/v1/collection", data);
        return response.data;
      }
    },
    onSuccess: (data) => {
      if (data.isCreated) {
        setIsCollected(true);
      } else if (data.isDeleted) {
        setIsCollected(false);
      }
      router.refresh();
    },
    onError: (error) => {
      console.error("Failed to update collection:", error);
      alert("Failed to update collection");
    },
  });

  const handleCollection = (e) => {
    e.preventDefault();
    if (!user_email) {
      alert("Please login to manage your collection");
      return;
    }
    mutation.mutate();
  };

  return (
    <button
      onClick={handleCollection}
      disabled={mutation.isPending}
      className={`px-4 py-2 font-bold rounded-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed ${
        isCollected
          ? "bg-red-600 text-white hover:bg-red-700"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      {mutation.isPending
        ? "Loading..."
        : isCollected
        ? "Remove from Collection"
        : "Add to Collection"}
    </button>
  );
};

export default CollectionButton;
