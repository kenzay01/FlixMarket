// app/api/auth/[...nextauth]/route.ts
import NextAuth, {
  AuthOptions,
  SessionStrategy,
  User,
  Session,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { AppDataSource } from "../../../../lib/db";
import { User as UserEntity } from "../../../../entities/User";

// Custom interfaces
interface CustomUser extends User {
  role?: string;
}

interface CustomSession extends Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Спеціальна логіка для адміна
        if (
          credentials.email === "flixmarketadmin@gmail.com" &&
          credentials.password === "vVsssv636v"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "flixmarketadmin@gmail.com",
            role: "admin",
          } as CustomUser;
        }

        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
        }
        // Підключення до бази даних
        const userRepository = AppDataSource.getRepository(UserEntity);

        // Пошук користувача в базі даних
        const user = await userRepository.findOne({
          where: { email: credentials.email },
          select: ["id", "name", "email", "password", "role"],
        });

        if (!user) {
          return null;
        }

        // Перевірка паролю для звичайних користувачів
        const passwordMatch = await compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        } as CustomUser;
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub || (token.id as string),
          role: token.role as string,
        },
      } as CustomSession;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as CustomUser).role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth({
  ...authOptions,
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
