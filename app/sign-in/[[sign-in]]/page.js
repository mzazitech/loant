import { SignIn } from "@clerk/nextjs";
import Header from "../../components/Header";

export const metadata = {
  title: "Login | Zeneka Loan"
};

export default function SignInPage() {
  return (
    <main className="route-page">
      <Header />

      <section className="shell route-hero">
        <p className="eyebrow">Member login</p>
        <h1>Login to Zeneka Loan.</h1>
        <p className="hero-lede">Access your membership, deposit status, loan limit, and loan application.</p>
      </section>

      <section className="route-card narrow auth-provider-card">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          forceRedirectUrl="/membership"
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
