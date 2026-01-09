import Link from "next/link";
import { authUserSession } from "../../../libs/auth";
import prisma from "../../../libs/prisma";
import HeaderDashboard from "../../../ui/HeaderDashboard";

const Page = async () => {
  const user = await authUserSession();
  const comments = await prisma.comment.findMany({
    where: { user_email: user.email },
  });

  return (
    <section className="mt-4 w-full px-4 mb-8">
      <HeaderDashboard title="My Comments" />
      <div className="grid grid-cols-1 gap-4 mt-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Link
              key={comment.id}
              href={`/anime/${comment.anime_mal_id}`}
              className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-300"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-bold text-indigo-900 group-hover:text-indigo-600 transition-colors">
                    {comment.anime_title}
                  </h4>
                  <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                    {new Date(comment.createdAt).toLocaleString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg italic text-slate-700 border-l-4 border-indigo-400">
                  <p className="text-sm">&quot;{comment.comment}&quot;</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mb-4 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <h3 className="text-xl font-semibold mb-2">
              You haven&apos;t posted any comments yet
            </h3>
            <p className="mb-6">Share your thoughts on your favorite anime!</p>
            <Link
              href="/"
              className="px-6 py-2 bg-amber-500 text-white rounded-full font-medium hover:bg-amber-600 transition-colors shadow-lg shadow-amber-100"
            >
              Start Commenting
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
