import prisma from "../libs/prisma";
import DeleteComment from "./DeleteComment";

const CommentList = async ({ anime_mal_id, user_email }) => {
  const comments = await prisma.comment.findMany({
    where: { anime_mal_id },
    orderBy: { id: "desc" },
  });

  if (comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <p className="text-slate-500 font-medium">No comments yet.</p>
        <p className="text-sm text-slate-400">
          Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-xl font-bold text-indigo-900 mb-2">
        Comments ({comments.length})
      </h4>
      {comments.map((comment) => {
        const initial = comment.user_name
          ? comment.user_name[0].toUpperCase()
          : "?";
        return (
          <div
            key={comment.id}
            className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg border border-indigo-200">
              {initial}
            </div>
            <div className="flex flex-col w-full">
              <div className="flex justify-between items-baseline mb-1">
                <p className="font-bold text-indigo-900 text-sm">
                  {comment.user_name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
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
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
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
