"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useClientTranslation } from "@/app/hooks/useTranslate";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as "en" | "de") || "en";
  const singIn = useClientTranslation("sign_in");
  const emailLabel = useClientTranslation("email");
  const passwordLabel = useClientTranslation("password");
  const invalidCredentials = useClientTranslation("invalid_credentials");
  const errorLogin = useClientTranslation("error_login");
  const dontHaveAccount = useClientTranslation("dont_have_account");
  const signUpLink = useClientTranslation("sign_up");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (response?.error) {
        setError(invalidCredentials);
        setIsLoading(false);
        return;
      }

      const userResponse = await fetch("/api/auth/session");
      const userSession = await userResponse.json();
      if (userSession.user?.role === "admin") {
        router.push(`/${locale}/admin`);
      } else {
        router.push(`/${locale}`);
      }

      router.refresh();
    } catch (error) {
      setError(errorLogin + " " + error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-auto items-start justify-center mt-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold">{singIn}</h1>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              {emailLabel}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              {passwordLabel}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 duration-150 disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "..." : singIn}
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm">
              {dontHaveAccount}{" "}
              <Link
                href={`/${locale}/signup`}
                className="text-blue-600 hover:underline"
              >
                {signUpLink}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
