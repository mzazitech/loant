# Zeneka Loan

Zeneka Loan is a polished front-end foundation for a digital loan platform. It includes a responsive customer experience, repayment calculator, application form, eligibility signal, application table, and repayment schedule preview.

## What is included

- Professional landing and loan workspace
- Account registration and login flow, ready to connect to Clerk authentication
- Detailed member onboarding questions including identity, address, income source, employment, expenses, references, and consent
- Membership activation deposit with Paystack payment entry point
- Minimum deposit rule of KES 250
- Deposit-based loan limit, currently calculated at 5x the active deposit
- Loan amount, term, and rate calculator
- Monthly payment, total interest, total repayment, and due-date preview
- Loan application form that unlocks only after login and active deposit
- Local application records for review
- Basic affordability and risk tiering logic
- Responsive design for phone, tablet, and desktop

## Open the platform

Open `index.html` in a browser:

```text
C:\Users\Administrator\Documents\Codex\2026-05-19\hello\index.html
```

## Next.js routes

The project now also includes a Next.js App Router structure for production URLs:

- `/` home
- `/sign-up` member registration
- `/sign-in` member login
- `/onboarding` member profile questions after account creation
- `/membership` deposit activation
- `/apply` loan application gate
- `/repayments` repayment dashboard
- `/paystack/callback` payment verification return page
- `/api/paystack/initialize` server endpoint placeholder for Paystack transaction initialization

When deployed on `zeneka.co.ke`, registration will be available at:

```text
https://zeneka.co.ke/sign-up
```

Login will be available at:

```text
https://zeneka.co.ke/sign-in
```

Copy `.env.example` to `.env.local`, add your live keys, then run locally as a Next.js app with:

```text
npm install
npm run dev
```

## Production next steps

Before accepting real loan applications, connect the front end to secure production services:

- Clerk authentication and role-based admin access
- Configure Clerk URLs as `/sign-up` and `/sign-in` so the live domain uses `https://zeneka.co.ke/sign-up` and `https://zeneka.co.ke/sign-in`
- Paystack transaction initialization, callback verification, webhook handling, and deposit ledger reconciliation
- Encrypted database storage
- Identity verification and KYC checks
- Credit scoring and affordability rules approved by the lender
- Payment collection and repayment reconciliation
- Audit logs, privacy policy, terms, disclosures, and regulatory review
- Server-side validation for all submitted data

The current build is ready as a professional front-end foundation for stakeholder review. Real lending decisions should be handled by a secure backend, not browser-only storage.
