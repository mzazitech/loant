"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isLoaded) return;

    setIsSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const result = await signIn.create({
        identifier: String(formData.get("email")).trim(),
        password: String(formData.get("password"))
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/membership");
        return;
      }

      setError("We need one more verification step before login can finish.");
    } catch (caughtError) {
      setError(caughtError?.errors?.[0]?.message || "Login failed. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="loan-form custom-auth-form" onSubmit={handleSubmit}>
      <div className="auth-heading wide">
        <span>Secure access</span>
        <h2>Welcome back</h2>
        <p>Login to continue to membership, deposits, loan limits, and applications.</p>
      </div>

      <div className="field-group wide">
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>

      <div className="field-group wide">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
      </div>

      {error ? <p className="auth-error wide">{error}</p> : null}

      <button className="button primary wide" type="submit" disabled={isSubmitting || !isLoaded}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      <p className="auth-switch wide">
        New member? <Link href="/sign-up">Create an account</Link>
      </p>
    </form>
  );
}
