import Link from "next/link";
import { authUserSession } from "../../../libs/auth";
import prisma from "../../../libs/prisma";
import HeaderDashboard from "../../../ui/HeaderDashboard";
const Page = async () => {
  const user = await authUserSession();
  const comments = await prisma.comment.findMany({
    where: { user_email: user.user_email },
  });

  return (
    <div>
      <HeaderDashboard title="My Comment" />
      {comments.map((comment) => {
        return (
          <Link key={comment.id} href={`/anime/${comment.anime_mal_id}`}>
            <div key={comment.id}>
              <p>{comment.anime_title}</p>
              <p>{comment.comment}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Page;
