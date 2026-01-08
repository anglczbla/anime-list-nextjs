import prisma from "../libs/prisma";

const CommentList = async ({ anime_mal_id }) => {
  //   const comments = await prisma.comment.findyMany({ where: { anime_mal_id } });
  const comments = await prisma.comment.findMany({ where: { anime_mal_id } });

  console.log("isi comment", comments);

  return (
    <div>
      {comments.map((comment) => {
        return (
          <div key={comment.id}>
            <p>{comment.user_name}</p>
            <p>{comment.comment}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
