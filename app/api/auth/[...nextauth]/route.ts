import NextAuth, {
  AuthOptions,
  SessionStrategy,
  User,
  Session,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

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

// Example users
const users = [
  {
    id: "1",
    name: "Admin",
    email: "admin@gmail.com",
    password: "$2b$10$your_hashed_admin_password",
    role: "admin",
  },
  {
    id: "2",
    name: "User",
    email: "test@gmail.com",
    password: "$2b$10$your_hashed_user_password",
    role: "user",
  },
];

// Auth options configuration
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

        // Admin simplified logic
        if (
          credentials.email === "admin@gmail.com" &&
          credentials.password === "adminPassword"
        ) {
          return {
            id: "1",
            name: "Admin",
            email: "admin@gmail.com",
            role: "admin",
          } as CustomUser;
        } else if (
          credentials.email === "test@gmail.com" &&
          credentials.password === "testPassword"
        ) {
          return {
            id: "2",
            name: "User",
            email: "test@gmail.com",
            role: "user",
          } as CustomUser;
        }

        // For other users
        const user = users.find((user) => user.email === credentials.email);

        if (!user) {
          return null;
        }

        // Password check
        if (user.id !== "1") {
          const passwordMatch = await compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch) {
            return null;
          }
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
