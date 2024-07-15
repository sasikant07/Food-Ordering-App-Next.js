"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginProgress] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoginProgress(true);
    await signIn("credentials", {email, password, callbackUrl: "/"});
    setLoginProgress(false);
  };
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          disabled={loginInProgress}
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          disabled={loginInProgress}
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loginInProgress}>
          Login
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button type="button" onClick={() => signIn('google', {callbackUrl: "/"})} className="flex gap-4 justify-center">
          <Image src="/google.png" alt="google" width={24} height={24} />
          Login with Google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Not registered? &nbsp;
          <Link className="underline" href={"/register"}>
            Register here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
