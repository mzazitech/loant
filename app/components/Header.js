import Link from "next/link";

export default function Header() {
  return (
    <header className="topbar">
      <Link className="brand" href="/" aria-label="Zeneka Loan home">
        <span className="brand-mark" aria-hidden="true">Z</span>
        <span>
          <strong>Zeneka Loan</strong>
          <small>Smart lending</small>
        </span>
      </Link>

      <nav className="nav" aria-label="Primary navigation">
        <Link href="/sign-up">Register</Link>
        <Link href="/sign-in">Login</Link>
        <Link href="/membership" prefetch={false}>Membership</Link>
        <Link href="/apply" prefetch={false}>Apply</Link>
        <Link href="/repayments" prefetch={false}>Repayments</Link>
      </nav>

      <Link className="topbar-action" href="/sign-up">Join first</Link>
    </header>
  );
}
