import Link from "next/link";
import Header from "./components/Header";

export default function HomePage() {
  return (
    <main className="route-page">
      <Header />

      <section className="shell app-hero">
        <div className="hero-copy">
          <p className="eyebrow">Digital credit built for everyday growth</p>
          <h1>Zeneka Loan now uses clean production routes.</h1>
          <p className="hero-lede">
            When your domain is connected, members will register at zeneka.co.ke/sign-up, login at zeneka.co.ke/sign-in, activate deposits, then apply for loans.
          </p>
          <div className="hero-actions">
            <Link className="button primary" href="/sign-up">Create account</Link>
            <Link className="button ghost" href="/apply">Go to application</Link>
          </div>
          <dl className="trust-strip" aria-label="Platform highlights">
            <div>
              <dt>/sign-up</dt>
              <dd>Member registration</dd>
            </div>
            <div>
              <dt>/sign-in</dt>
              <dd>Member login</dd>
            </div>
            <div>
              <dt>/apply</dt>
              <dd>Loan request</dd>
            </div>
          </dl>
        </div>

        <div className="phone-preview" aria-label="Zeneka Loan mobile dashboard preview">
          <div className="phone-top">
            <span></span>
            <strong>Zeneka</strong>
            <span></span>
          </div>
          <div className="balance-card">
            <small>Active loan limit</small>
            <strong>KES 0</strong>
            <span>Deposit activates loan access</span>
          </div>
          <div className="mini-list">
            <article>
              <span className="dot green"></span>
              <div>
                <strong>Register</strong>
                <small>Complete member onboarding</small>
              </div>
            </article>
            <article>
              <span className="dot yellow"></span>
              <div>
                <strong>Deposit</strong>
                <small>Minimum KES 250</small>
              </div>
            </article>
            <article>
              <span className="dot blue"></span>
              <div>
                <strong>Apply</strong>
                <small>Stay within active limit</small>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
