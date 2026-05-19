import "../styles.css";
import "./routes.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Zeneka Loan",
  description: "Zeneka Loan membership, deposits, loan limits, and responsible digital credit applications."
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
