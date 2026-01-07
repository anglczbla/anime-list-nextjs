"use client";
import { Ban } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.back()} className="">
        <Ban />
        Back
      </button>
    </div>
  );
};

export default NotFound;
