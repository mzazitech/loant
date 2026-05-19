import Header from "../components/Header";

export const metadata = {
  title: "Repayments | Zeneka Loan"
};

export default function RepaymentsPage() {
  return (
    <main className="route-page">
      <Header />

      <section className="shell route-hero">
        <p className="eyebrow">Repayments</p>
        <h1>Track repayment schedules and loan status.</h1>
        <p className="hero-lede">This route is ready for a member dashboard once the backend is connected.</p>
      </section>

      <section className="route-card">
        <div className="quote-grid">
          <div>
            <span>Next payment</span>
            <strong>KES 0</strong>
          </div>
          <div>
            <span>Due date</span>
            <strong>--</strong>
          </div>
          <div>
            <span>Loan status</span>
            <strong>Pending</strong>
          </div>
          <div>
            <span>Member limit</span>
            <strong>KES 0</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
