import "../styles.css";
import "./routes.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Zeneka Loan",
  description: "Zeneka Loan membership, deposits, loan limits, and responsible digital credit applications."
};

export default function RootLayout({ children }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
