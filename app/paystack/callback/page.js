import Link from "next/link";
import Header from "../../components/Header";

export const metadata = {
  title: "Payment Verification | Zeneka Loan"
};

export default function PaystackCallbackPage() {
  return (
    <main className="route-page">
      <Header />

      <section className="shell route-hero">
        <p className="eyebrow">Payment verification</p>
        <h1>Membership payment received for verification.</h1>
        <p className="hero-lede">
          In production, this route should verify the Paystack reference on the server before activating the deposit.
        </p>
        <div className="route-actions">
          <Link className="button primary" href="/apply">Continue to application</Link>
          <Link className="button ghost" href="/membership">Back to membership</Link>
        </div>
      </section>
    </main>
  );
}
