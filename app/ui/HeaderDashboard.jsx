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
      <button onClick={handleBack} className="text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
        <ArrowBigLeft size={32} />
      </button>
      <h3 className="text-2xl text-slate-800 dark:text-slate-200 font-bold">{title}</h3>
    </div>
  );
};

export default HeaderDashboard;
