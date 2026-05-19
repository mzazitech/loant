import Header from "../components/Header";
import SignInForm from "../components/SignInForm";

export const metadata = {
  title: "Login | Zeneka Loan"
};

export default function SignInIndexPage() {
  return (
    <main className="route-page">
      <Header />

      <section className="shell route-hero">
        <p className="eyebrow">Member login</p>
        <h1>Login to Zeneka Loan.</h1>
        <p className="hero-lede">Access your membership, deposit status, loan limit, and loan application.</p>
      </section>

      <section className="route-card narrow auth-card">
        <SignInForm />
      </section>
    </main>
  );
}
