import { authUserSession } from "../../libs/auth";
import prisma from "../../libs/prisma";
import CommentList from "../../ui/CommentList";
import AnimeDetail from "./AnimeDetail";

const Page = async ({ params }) => {
  const { id } = await params;
  const user = await authUserSession();
  const collection = await prisma.collection.findFirst({
    where: { user_email: user?.email, anime_mal_id: id },
  });

  return (
    <AnimeDetail
      id={id}
      user_email={user?.email}
      collection={collection}
      user={user}
      commentList={<CommentList anime_mal_id={id} user_email={user?.email} />}
    />
  );
};

export default Page;