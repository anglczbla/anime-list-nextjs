import prisma from "../../../libs/prisma";

export async function POST(request) {
  try {
    const { anime_mal_id, user_email, comment, user_name, anime_title } =
      await request.json();

    const createComment = await prisma.comment.create({
      data: { anime_mal_id, user_email, comment, user_name, anime_title },
    });

    return Response.json({
      status: 200,
      isCreated: true,
      data: createComment,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      isCreated: false,
      error: error.message,
    });
  }
}

export async function DELETE(request) {
  try {
    const { anime_mal_id, user_email, comment, user_name, anime_title } =
      await request.json();

    const deleteComment = await prisma.comment.deleteMany({
      where: { anime_mal_id, user_email, comment, user_name, anime_title },
    });

    if (deleteComment.count === 0) {
      return Response.json({
        status: 404,
        isDeleted: false,
        message: "Comment not found",
      });
    }

    return Response.json({
      status: 200,
      isDeleted: true,
      data: deleteComment,
    });
  } catch (error) {
    return Response.json({
      status: 500,
      isDeleted: false,
      error: error.message,
    });
  }
}
