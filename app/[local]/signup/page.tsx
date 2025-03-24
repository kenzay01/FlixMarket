"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useClientTranslation } from "@/app/hooks/useTranslate";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as "en" | "de") || "en";

  const signUp = useClientTranslation("sign_up");
  const nameLabel = useClientTranslation("name");
  const emailLabel = useClientTranslation("email");
  const passwordLabel = useClientTranslation("password");
  const confirmPasswordLabel = useClientTranslation("confirm_password");
  const alreadyHaveAccount = useClientTranslation("already_have_account");
  const signInLink = useClientTranslation("sign_in");
  const passwordsDoNotMatch = useClientTranslation("passwords_do_not_match");
  const emailExists = useClientTranslation("email_exists");
  const errorRegister = useClientTranslation("error_register");
  const registerSuccess = useClientTranslation("register_success");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError(passwordsDoNotMatch);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setError(emailExists);
        } else {
          setError(data.message || errorRegister);
        }
        setIsLoading(false);
        return;
      }

      setSuccess(registerSuccess);

      setTimeout(() => {
        router.push(`/${locale}/login`);
      }, 2000);
    } catch (error) {
      setError(errorRegister + " " + error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-auto items-start justify-center mb-12">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div>
          <h1 className="text-2xl font-bold">{signUp}</h1>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              {nameLabel}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
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
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
            >
              {confirmPasswordLabel}
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 duration-150 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? "..." : signUp}
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm">
              {alreadyHaveAccount}{" "}
              <Link
                href={`/${locale}/login`}
                className="text-indigo-600 hover:underline"
              >
                {signInLink}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
