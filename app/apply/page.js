import Link from "next/link";
import Header from "../components/Header";

export const metadata = {
  title: "Apply | Zeneka Loan"
};

export default function ApplyPage() {
  return (
    <main className="route-page">
      <Header />

      <section className="shell route-hero">
        <p className="eyebrow">Loan application</p>
        <h1>Apply within your active member limit.</h1>
        <p className="hero-lede">Members must register, login, and activate a deposit before submitting a loan request.</p>
      </section>

      <section className="route-card">
        <div className="section-head">
          <div>
            <p className="eyebrow">Application gate</p>
            <h2>Required steps</h2>
          </div>
          <span className="status-pill">Protected route</span>
        </div>

        <ul className="route-list">
          <li>1. Create an account at <strong>/sign-up</strong>.</li>
          <li>2. Login at <strong>/sign-in</strong>.</li>
          <li>3. Activate membership at <strong>/membership</strong> with at least KES 250.</li>
          <li>4. Submit the loan request within the deposit-based limit.</li>
        </ul>

        <div className="route-actions">
          <Link className="button primary" href="/sign-up">Register first</Link>
          <Link className="button ghost" href="/membership" prefetch={false}>Activate membership</Link>
        </div>
      </section>
    </main>
  );
}
