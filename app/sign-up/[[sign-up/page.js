import { SignUp } from "@clerk/nextjs";
import Header from "../../components/Header";

export const metadata = {
  title: "Create Account | Zeneka Loan"
};

export default function SignUpPage() {
  return (
    <main className="route-page">
      <Header />

      <section className="shell route-hero">
        <p className="eyebrow">Member registration</p>
        <h1>Create your Zeneka Loan account.</h1>
        <p className="hero-lede">After account creation, complete your member profile and source-of-income details.</p>
      </section>

      <section className="route-card narrow auth-provider-card">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          forceRedirectUrl="/onboarding"
          appearance={{
            elements: {
              rootBox: "auth-provider-root",
              card: "auth-provider-inner"
            }
          }}
        />
      </section>
    </main>
  );
}
