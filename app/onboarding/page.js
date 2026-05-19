import Header from "../components/Header";

export const metadata = {
  title: "Member Profile | Zeneka Loan"
};

export default function OnboardingPage() {
  return (
    <main className="route-page">
      <Header />

      <section className="shell route-hero">
        <p className="eyebrow">Member profile</p>
        <h1>Complete your lending profile.</h1>
        <p className="hero-lede">
          These details support identity checks, affordability review, source-of-income verification, and responsible lending decisions.
        </p>
      </section>

      <section className="route-card">
        <form className="loan-form auth-form" action="/api/member-profile" method="post">
          <div className="form-section wide">
            <h3>Identity and residence</h3>
          </div>
          <div className="field-group">
            <label htmlFor="nationalId">National ID number</label>
            <input id="nationalId" name="nationalId" type="text" required />
          </div>
          <div className="field-group">
            <label htmlFor="dateOfBirth">Date of birth</label>
            <input id="dateOfBirth" name="dateOfBirth" type="date" required />
          </div>
          <div className="field-group">
            <label htmlFor="maritalStatus">Marital status</label>
            <select id="maritalStatus" name="maritalStatus" required>
              <option value="">Choose status</option>
              <option>Single</option>
              <option>Married</option>
              <option>Separated</option>
              <option>Widowed</option>
            </select>
          </div>
          <div className="field-group">
            <label htmlFor="dependants">Number of dependants</label>
            <input id="dependants" name="dependants" type="number" min="0" required />
          </div>
          <div className="field-group wide">
            <label htmlFor="address">Residential address</label>
            <input id="address" name="address" type="text" autoComplete="street-address" required />
          </div>

          <div className="form-section wide">
            <h3>Income and work</h3>
          </div>
          <div className="field-group">
            <label htmlFor="employmentStatus">Employment status</label>
            <select id="employmentStatus" name="employmentStatus" required>
              <option value="">Choose status</option>
              <option>Employed full-time</option>
              <option>Employed part-time</option>
              <option>Self-employed</option>
              <option>Business owner</option>
              <option>Contract worker</option>
              <option>Student</option>
              <option>Unemployed</option>
            </select>
          </div>
          <div className="field-group">
            <label htmlFor="sourceOfIncome">Main source of income</label>
            <select id="sourceOfIncome" name="sourceOfIncome" required>
              <option value="">Choose source</option>
              <option>Salary</option>
              <option>Business revenue</option>
              <option>Farming</option>
              <option>Freelance work</option>
              <option>Rental income</option>
              <option>Remittances</option>
              <option>Commission</option>
              <option>Pension</option>
            </select>
          </div>
          <div className="field-group">
            <label htmlFor="employer">Employer or business name</label>
            <input id="employer" name="employer" type="text" required />
          </div>
          <div className="field-group">
            <label htmlFor="workDuration">Time at work or business</label>
            <select id="workDuration" name="workDuration" required>
              <option value="">Choose duration</option>
              <option>Less than 6 months</option>
              <option>6 to 12 months</option>
              <option>1 to 2 years</option>
              <option>2 to 5 years</option>
              <option>More than 5 years</option>
            </select>
          </div>
          <div className="field-group">
            <label htmlFor="monthlyIncome">Average monthly income</label>
            <input id="monthlyIncome" name="monthlyIncome" type="number" min="0" step="500" required />
          </div>
          <div className="field-group">
            <label htmlFor="monthlyExpenses">Average monthly expenses</label>
            <input id="monthlyExpenses" name="monthlyExpenses" type="number" min="0" step="500" required />
          </div>
          <div className="field-group">
            <label htmlFor="otherLoans">Existing loan payments</label>
            <input id="otherLoans" name="otherLoans" type="number" min="0" step="500" defaultValue="0" required />
          </div>
          <div className="field-group">
            <label htmlFor="incomeFrequency">Income frequency</label>
            <select id="incomeFrequency" name="incomeFrequency" required>
              <option value="">Choose frequency</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
              <option>Irregular</option>
            </select>
          </div>

          <div className="form-section wide">
            <h3>References and consent</h3>
          </div>
          <div className="field-group">
            <label htmlFor="nextOfKin">Next of kin name</label>
            <input id="nextOfKin" name="nextOfKin" type="text" required />
          </div>
          <div className="field-group">
            <label htmlFor="nextOfKinPhone">Next of kin phone</label>
            <input id="nextOfKinPhone" name="nextOfKinPhone" type="tel" required />
          </div>
          <div className="field-group">
            <label htmlFor="referenceName">Reference name</label>
            <input id="referenceName" name="referenceName" type="text" required />
          </div>
          <div className="field-group">
            <label htmlFor="referencePhone">Reference phone</label>
            <input id="referencePhone" name="referencePhone" type="tel" required />
          </div>
          <div className="field-group wide">
            <label htmlFor="profileNotes">Anything else we should know?</label>
            <textarea id="profileNotes" name="profileNotes" rows="3"></textarea>
          </div>
          <label className="consent wide">
            <input name="profileConsent" type="checkbox" required />
            <span>I confirm these details are true and I consent to identity, income, and affordability checks.</span>
          </label>
          <button className="button primary wide" type="submit">Save profile and continue</button>
        </form>
      </section>
    </main>
  );
}
