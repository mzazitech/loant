"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";

export default function SignUpForm() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateAccount(event) {
    event.preventDefault();
    if (!isLoaded) return;

    setIsSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("name")).trim();
    const [firstName, ...rest] = fullName.split(" ");

    try {
      await signUp.create({
        emailAddress: String(formData.get("email")).trim(),
        password: String(formData.get("password")),
        firstName: firstName || fullName,
        lastName: rest.join(" ")
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (caughtError) {
      setError(caughtError?.errors?.[0]?.message || "Account creation failed. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerifyEmail(event) {
    event.preventDefault();
    if (!isLoaded) return;

    setIsSubmitting(true);
    setError("");

    const formData = new FormData(event.currentTarget);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: String(formData.get("code")).trim()
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/onboarding");
        return;
      }

      setError("Verification is not complete yet. Please check the code and try again.");
    } catch (caughtError) {
      setError(caughtError?.errors?.[0]?.message || "Verification failed. Please check the code and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (pendingVerification) {
    return (
      <form className="loan-form custom-auth-form" onSubmit={handleVerifyEmail}>
        <div className="auth-heading wide">
          <span>Email verification</span>
          <h2>Enter your code</h2>
          <p>We sent a verification code to your email so we can protect your member account.</p>
        </div>

        <div className="field-group wide">
          <label htmlFor="code">Verification code</label>
          <input id="code" name="code" type="text" inputMode="numeric" autoComplete="one-time-code" required />
        </div>

        {error ? <p className="auth-error wide">{error}</p> : null}

        <button className="button primary wide" type="submit" disabled={isSubmitting || !isLoaded}>
          {isSubmitting ? "Verifying..." : "Verify and continue"}
        </button>
      </form>
    );
  }

  return (
    <form className="loan-form custom-auth-form" onSubmit={handleCreateAccount}>
      <div className="auth-heading wide">
        <span>Member registration</span>
        <h2>Start your account</h2>
        <p>Create secure access first. The next step collects your lending profile and source of income.</p>
      </div>

      <div className="field-group wide">
        <label htmlFor="name">Full legal name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
      </div>

      <div className="field-group wide">
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>

      <div className="field-group wide">
        <label htmlFor="password">Create password</label>
        <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required />
      </div>

      {error ? <p className="auth-error wide">{error}</p> : null}

      <button className="button primary wide" type="submit" disabled={isSubmitting || !isLoaded}>
        {isSubmitting ? "Creating account..." : "Create member account"}
      </button>

      <p className="auth-switch wide">
        Already registered? <Link href="/sign-in">Login here</Link>
      </p>
    </form>
  );
}
