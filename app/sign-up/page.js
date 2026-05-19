import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";

export const metadata = {
  title: "Create Account | Zeneka Loan"
};

export default function SignUpIndexPage() {
  const authReady = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <main className="route-page">
      <Header />

      <section className="shell route-hero">
        <p className="eyebrow">Member registration</p>
        <h1>Create your Zeneka Loan account.</h1>
        <p className="hero-lede">After account creation, complete your member profile and source-of-income details.</p>
      </section>

      <section className="route-card narrow auth-card">
        {authReady ? (
          <SignUpForm />
        ) : (
          <div className="auth-config-notice">
            <span>Configuration needed</span>
            <h2>Registration is almost ready</h2>
            <p>Add your authentication keys in the hosting environment variables, then redeploy Zeneka Loan.</p>
          </div>
        )}
      </section>
    </main>
  );
}
