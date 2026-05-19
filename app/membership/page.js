import Header from "../components/Header";

export const metadata = {
  title: "Membership Deposit | Zeneka Loan"
};

export default function MembershipPage() {
  return (
    <main className="route-page">
      <Header />

      <section className="shell route-hero">
        <p className="eyebrow">Membership deposit</p>
        <h1>Activate membership with Paystack.</h1>
        <p className="hero-lede">Minimum deposit is KES 250. A higher deposit increases the estimated loan limit.</p>
      </section>

      <section className="shell membership-grid">
        <form className="tool-panel deposit-panel" action="/api/paystack/initialize" method="post">
          <div className="field-group">
            <label htmlFor="depositAmount">Deposit amount</label>
            <input id="depositAmount" name="depositAmount" type="number" min="250" step="50" defaultValue="250" required />
          </div>
          <button className="button primary" type="submit">Pay with Paystack</button>
          <p className="deposit-note">Production should verify every successful transaction on the server before increasing a loan limit.</p>
        </form>

        <div className="limit-card">
          <span>Minimum deposit</span>
          <strong>KES 250</strong>
          <span>Loan limit rule</span>
          <strong>5x deposit</strong>
          <small>Example: KES 1,000 deposit gives an estimated KES 5,000 limit.</small>
        </div>
      </section>
    </main>
  );
}
