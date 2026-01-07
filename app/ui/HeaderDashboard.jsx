"use client";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
const HeaderDashboard = ({ title }) => {
  const router = useRouter();

  const handleBack = (e) => {
    e.preventDefault();
    router.back();
  };
  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={handleBack} className="text-color-dark">
        <ArrowBigLeft size={32} />
      </button>
      <h3 className="text-2xl text-color-dark font-bold">{title}</h3>
    </div>
  );
};

export default HeaderDashboard;
