import NextAuth from "next-auth";
import githubAuth from "next-auth/providers/github";
import prisma from "../../../libs/prisma";

export const authOption = {
  providers: [
    githubAuth({
      clientId: process.env.GITHUB_CLIENT,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        const { email, name, image } = user;
        if (!email) return false;

        try {
          const userExists = await prisma.user.findUnique({
            where: { email },
          });

          if (!userExists) {
            await prisma.user.create({
              data: {
                email: email,
                name: name,
                photo: image,
              },
            });
          }
          return true;
        } catch (error) {
          console.error("Error creating user: ", error);
          return false;
        }
      }
      return true;
    },
  },
};

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
