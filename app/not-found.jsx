"use clien";
import { Ban } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div>
      <Link href="/" className="">
        <Ban />
        Back
      </Link>
    </div>
  );
};

export default NotFound;
