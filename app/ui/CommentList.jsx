import Image from "next/image";
import prisma from "../libs/prisma";
import DeleteComment from "./DeleteComment";

const CommentList = async ({ anime_mal_id, user_email }) => {
  const comments = await prisma.comment.findMany({
    where: { anime_mal_id },
    include: {
      user: true,
    },
    orderBy: { id: "desc" },
  });

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          No comments yet.
        </p>
        <p className="text-sm text-slate-400 dark:text-slate-500">
          Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xl font-bold text-indigo-900 dark:text-indigo-300 mb-2">
        Comments ({comments.length})
      </h4>
      {comments.map((comment) => {
        return (
          <div
            key={comment.id}
            className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-lg border border-indigo-200 dark:border-indigo-800">
              <Image
                src={comment.user.photo}
                alt="..."
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-baseline mb-1">
                <p className="font-bold text-indigo-900 dark:text-indigo-300 text-sm">
                  {comment.user.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {new Date(comment.createdAt).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {user_email === comment.user_email && (
                    <DeleteComment id={comment.id} />
                  )}
                </div>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                {comment.comment}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
