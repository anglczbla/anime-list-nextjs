import { authUserSession } from "../../../libs/auth";
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
    const { id } = await request.json();
    const user = await authUserSession();

    if (!user) {
      return Response.json({
        status: 401,
        isDeleted: false,
        error: "Unauthorized",
      });
    }

    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });

    if (!comment) {
      return Response.json({
        status: 404,
        isDeleted: false,
        error: "Comment not found",
      });
    }

    if (comment.user_email !== user.email) {
      return Response.json({
        status: 403,
        isDeleted: false,
        error: "Forbidden: You are not the owner of this comment",
      });
    }

    const deleteComment = await prisma.comment.delete({
      where: { id: Number(id) },
    });

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
