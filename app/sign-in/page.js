import Header from "../components/Header";
import SignInForm from "../components/SignInForm";

export const metadata = {
  title: "Login | Zeneka Loan"
};

export default function SignInIndexPage() {
  const authReady = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <main className="route-page">
      <Header />

      <section className="shell route-hero">
        <p className="eyebrow">Member login</p>
        <h1>Login to Zeneka Loan.</h1>
        <p className="hero-lede">Access your membership, deposit status, loan limit, and loan application.</p>
      </section>

      <section className="route-card narrow auth-card">
        {authReady ? (
          <SignInForm />
        ) : (
          <div className="auth-config-notice">
            <span>Configuration needed</span>
            <h2>Login is almost ready</h2>
            <p>Add your authentication keys in the hosting environment variables, then redeploy Zeneka Loan.</p>
          </div>
        )}
      </section>
    </main>
  );
}
