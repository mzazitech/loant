const currency = new Intl.NumberFormat("en-KE", {
  style: "currency",
  currency: "KES",
  maximumFractionDigits: 0
});

const dateFormat = new Intl.DateTimeFormat("en-KE", {
  month: "short",
  day: "numeric",
  year: "numeric"
});

const elements = {
  amount: document.querySelector("#amount"),
  term: document.querySelector("#term"),
  rate: document.querySelector("#rate"),
  amountOutput: document.querySelector("#amountOutput"),
  termOutput: document.querySelector("#termOutput"),
  rateOutput: document.querySelector("#rateOutput"),
  monthlyPayment: document.querySelector("#monthlyPayment"),
  totalInterest: document.querySelector("#totalInterest"),
  totalRepayment: document.querySelector("#totalRepayment"),
  firstDueDate: document.querySelector("#firstDueDate"),
  offerAmount: document.querySelector("#offerAmount"),
  eligibilityScore: document.querySelector("#eligibilityScore"),
  eligibilityMeter: document.querySelector("#eligibilityMeter"),
  decisionSignal: document.querySelector("#decisionSignal"),
  decisionNote: document.querySelector("#decisionNote"),
  scheduleList: document.querySelector("#scheduleList"),
  applicationRows: document.querySelector("#applicationRows"),
  loanForm: document.querySelector("#loanForm"),
  applicantName: document.querySelector("#applicantName"),
  income: document.querySelector("#income"),
  applyGate: document.querySelector("#applyGate"),
  submitLoan: document.querySelector("#submitLoan"),
  clearRecords: document.querySelector("#clearRecords"),
  toast: document.querySelector("#toast"),
  registerForm: document.querySelector("#registerForm"),
  loginForm: document.querySelector("#loginForm"),
  showRegister: document.querySelector("#showRegister"),
  showLogin: document.querySelector("#showLogin"),
  accountStatus: document.querySelector("#accountStatus"),
  accountHint: document.querySelector("#accountHint"),
  depositForm: document.querySelector("#depositForm"),
  depositAmount: document.querySelector("#depositAmount"),
  quickDeposit: document.querySelector("#quickDeposit"),
  membershipPill: document.querySelector("#membershipPill"),
  activeDeposit: document.querySelector("#activeDeposit"),
  activeLoanLimit: document.querySelector("#activeLoanLimit"),
  depositHint: document.querySelector("#depositHint")
};

const storeKeys = {
  applications: "zeneka-loan-applications",
  members: "zeneka-loan-members",
  session: "zeneka-loan-session",
  deposit: "zeneka-loan-deposit"
};

const minimumDeposit = 250;
const loanLimitMultiplier = 5;

const sampleApplications = [
  {
    name: "Amina Otieno",
    phone: "+254 711 204 810",
    income: 120000,
    amount: 85000,
    term: 10,
    payment: 10982,
    purpose: "Working capital",
    sourceOfIncome: "Business revenue",
    deposit: 20000,
    createdAt: new Date().toISOString()
  },
  {
    name: "Brian Mwangi",
    phone: "+254 722 441 119",
    income: 58000,
    amount: 45000,
    term: 6,
    payment: 8748,
    purpose: "School fees",
    sourceOfIncome: "Salary",
    deposit: 10000,
    createdAt: new Date().toISOString()
  }
];

function readJson(key, fallback) {
  const saved = localStorage.getItem(key);
  if (!saved) return fallback;

  try {
    return JSON.parse(saved);
  } catch {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getApplications() {
  const saved = localStorage.getItem(storeKeys.applications);
  if (!saved) {
    writeJson(storeKeys.applications, sampleApplications);
    return sampleApplications;
  }

  return readJson(storeKeys.applications, sampleApplications);
}

function saveApplications(applications) {
  writeJson(storeKeys.applications, applications);
}

function getMembers() {
  return readJson(storeKeys.members, []);
}

function saveMembers(members) {
  writeJson(storeKeys.members, members);
}

function getSessionEmail() {
  return localStorage.getItem(storeKeys.session);
}

function getCurrentMember() {
  const email = getSessionEmail();
  if (!email) return null;

  return getMembers().find((member) => member.email === email) || null;
}

function saveSession(email) {
  localStorage.setItem(storeKeys.session, email);
}

function getDeposit() {
  return Number(localStorage.getItem(storeKeys.deposit) || 0);
}

function saveDeposit(amount) {
  localStorage.setItem(storeKeys.deposit, String(amount));
}

function getLoanLimit() {
  return getDeposit() * loanLimitMultiplier;
}

function isActiveMember() {
  return Boolean(getCurrentMember()) && getDeposit() >= minimumDeposit;
}

function getQuote() {
  const loanLimit = Math.max(5000, getLoanLimit() || 250000);
  const amount = Math.min(Number(elements.amount.value), loanLimit);
  const term = Number(elements.term.value);
  const monthlyRate = Number(elements.rate.value) / 100;
  const monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
  const totalRepayment = monthlyPayment * term;
  const totalInterest = totalRepayment - amount;
  const firstDueDate = new Date();
  firstDueDate.setMonth(firstDueDate.getMonth() + 1);

  return {
    amount,
    term,
    rate: Number(elements.rate.value),
    monthlyPayment,
    totalInterest,
    totalRepayment,
    firstDueDate
  };
}

function getDecision(income, monthlyPayment, amount) {
  const deposit = getDeposit();
  const burden = income > 0 ? monthlyPayment / income : 1;

  if (!getCurrentMember()) {
    return {
      risk: "High",
      status: "Needs review",
      signal: "Register first",
      note: "Create or login to a member account before applying."
    };
  }

  if (deposit < minimumDeposit) {
    return {
      risk: "High",
      status: "Needs review",
      signal: "Deposit required",
      note: "Membership activates after a deposit of at least KES 250."
    };
  }

  if (amount > getLoanLimit()) {
    return {
      risk: "High",
      status: "Needs review",
      signal: "Above limit",
      note: "Increase your deposit or reduce the requested loan amount."
    };
  }

  if (burden <= 0.28 && amount <= income * 2.5) {
    return {
      risk: "Low",
      status: "Approved",
      signal: "Strong fit",
      note: "The repayment is comfortably within affordability and membership limits."
    };
  }

  if (burden <= 0.45 && amount <= income * 4) {
    return {
      risk: "Medium",
      status: "In review",
      signal: "Good fit",
      note: "Approval is possible with income verification and repayment confirmation."
    };
  }

  return {
    risk: "High",
    status: "Needs review",
    signal: "Review needed",
    note: "The payment burden is high. Consider lowering the amount or extending the term."
  };
}

function updateQuote() {
  const loanLimit = getLoanLimit();
  const maxLoan = Math.max(5000, loanLimit || 250000);

  elements.amount.max = String(maxLoan);
  if (Number(elements.amount.value) > maxLoan) {
    elements.amount.value = String(maxLoan);
  }

  const quote = getQuote();
  const member = getCurrentMember();
  const estimatedIncome = member ? Number(member.monthlyIncome) : 90000;
  const decision = getDecision(estimatedIncome, quote.monthlyPayment, quote.amount);
  const eligibility = Math.max(24, Math.min(94, Math.round(100 - (quote.monthlyPayment / Math.max(estimatedIncome, 1)) * 130)));

  elements.amountOutput.value = currency.format(quote.amount);
  elements.termOutput.value = `${quote.term} ${quote.term === 1 ? "month" : "months"}`;
  elements.rateOutput.value = `${quote.rate.toFixed(1)}%`;
  elements.monthlyPayment.textContent = currency.format(quote.monthlyPayment);
  elements.totalInterest.textContent = currency.format(quote.totalInterest);
  elements.totalRepayment.textContent = currency.format(quote.totalRepayment);
  elements.firstDueDate.textContent = dateFormat.format(quote.firstDueDate);
  elements.offerAmount.textContent = currency.format(loanLimit || 0);
  elements.eligibilityScore.textContent = `${eligibility}%`;
  elements.eligibilityMeter.style.width = `${eligibility}%`;
  elements.decisionSignal.textContent = decision.signal;
  elements.decisionNote.textContent = decision.note;

  renderSchedule(quote);
  renderAccountState();
}

function renderSchedule(quote) {
  const rows = [];
  const dueDate = new Date(quote.firstDueDate);
  const count = Math.min(4, quote.term);

  for (let index = 0; index < count; index += 1) {
    const installmentDate = new Date(dueDate);
    installmentDate.setMonth(dueDate.getMonth() + index);
    rows.push(`
      <li>
        <span>${dateFormat.format(installmentDate)}</span>
        <strong>${currency.format(quote.monthlyPayment)}</strong>
      </li>
    `);
  }

  elements.scheduleList.innerHTML = rows.join("");
}

function renderApplications() {
  const applications = getApplications();

  if (applications.length === 0) {
    elements.applicationRows.innerHTML = `
      <tr class="empty-row">
        <td colspan="5">No applications yet. Submit a member application to begin.</td>
      </tr>
    `;
    return;
  }

  elements.applicationRows.innerHTML = applications.map((application) => {
    const decision = getDecision(Number(application.income), Number(application.payment), Number(application.amount));
    const riskClass = decision.risk.toLowerCase();
    const statusClass = decision.status === "Approved" ? "approved" : decision.status === "In review" ? "review" : "declined";

    return `
      <tr>
        <td>
          <strong>${escapeHtml(application.name)}</strong><br>
          <span>${escapeHtml(application.purpose)}</span>
        </td>
        <td>${currency.format(application.amount)}</td>
        <td>${application.term} mo</td>
        <td><span class="risk ${riskClass}">${decision.risk}</span></td>
        <td><span class="loan-status ${statusClass}">${decision.status}</span></td>
      </tr>
    `;
  }).join("");
}

function renderAccountState() {
  const member = getCurrentMember();
  const deposit = getDeposit();
  const limit = getLoanLimit();
  const active = isActiveMember();

  if (member) {
    elements.accountStatus.textContent = `Signed in as ${member.name}`;
    elements.accountHint.textContent = active ? "Membership is active. You can apply for a loan." : "Make a deposit of at least KES 250 to activate membership.";
    elements.applicantName.value = member.name;
    elements.income.value = member.monthlyIncome || "";
  } else {
    elements.accountStatus.textContent = "Not signed in";
    elements.accountHint.textContent = "Create an account or sign in to continue.";
    elements.applicantName.value = "";
    elements.income.value = "";
  }

  elements.activeDeposit.textContent = currency.format(deposit);
  elements.activeLoanLimit.textContent = currency.format(limit);
  elements.membershipPill.textContent = active ? "Active" : "Inactive";
  elements.depositHint.textContent = active ? "You can apply up to your active loan limit." : "Activate membership to unlock applications.";
  elements.applyGate.textContent = active ? "Ready" : "Locked";
  elements.submitLoan.disabled = !active;
  elements.loanForm.classList.toggle("locked", !active);

  for (const control of elements.loanForm.elements) {
    if (control.id !== "applicantName") {
      control.disabled = !active;
    }
  }
  elements.applicantName.disabled = false;
}

function setAuthMode(mode) {
  const isRegister = mode === "register";
  elements.registerForm.classList.toggle("hidden", !isRegister);
  elements.loginForm.classList.toggle("hidden", isRegister);
  elements.showRegister.classList.toggle("active", isRegister);
  elements.showLogin.classList.toggle("active", !isRegister);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 3200);
}

function openPaystackCheckout(amount) {
  const paymentUrl = `https://paystack.com/pay/zeneka-loan?amount=${encodeURIComponent(amount * 100)}&currency=KES`;
  window.open(paymentUrl, "_blank", "noopener,noreferrer");
}

elements.amount.addEventListener("input", updateQuote);
elements.term.addEventListener("input", updateQuote);
elements.rate.addEventListener("input", updateQuote);
elements.showRegister.addEventListener("click", () => setAuthMode("register"));
elements.showLogin.addEventListener("click", () => setAuthMode("login"));

elements.registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(elements.registerForm);
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  if (password !== confirmPassword) {
    showToast("Passwords do not match.");
    return;
  }

  const email = formData.get("email").trim().toLowerCase();
  const members = getMembers();

  if (members.some((member) => member.email === email)) {
    showToast("This email is already registered. Please login.");
    setAuthMode("login");
    return;
  }

  const member = {
    name: formData.get("name").trim(),
    email,
    phone: formData.get("phone").trim(),
    nationalId: formData.get("nationalId").trim(),
    dateOfBirth: formData.get("dateOfBirth"),
    maritalStatus: formData.get("maritalStatus"),
    address: formData.get("address").trim(),
    employmentStatus: formData.get("employmentStatus"),
    sourceOfIncome: formData.get("sourceOfIncome"),
    employer: formData.get("employer").trim(),
    workDuration: formData.get("workDuration"),
    monthlyIncome: Number(formData.get("monthlyIncome")),
    monthlyExpenses: Number(formData.get("monthlyExpenses")),
    otherLoans: Number(formData.get("otherLoans")),
    incomeFrequency: formData.get("incomeFrequency"),
    nextOfKin: formData.get("nextOfKin").trim(),
    nextOfKinPhone: formData.get("nextOfKinPhone").trim(),
    referenceName: formData.get("referenceName").trim(),
    referencePhone: formData.get("referencePhone").trim(),
    registrationNotes: formData.get("registrationNotes").trim(),
    createdAt: new Date().toISOString()
  };

  saveMembers([member, ...members]);
  saveSession(email);
  elements.registerForm.reset();
  updateQuote();
  showToast("Account created. Make your membership deposit to activate loan applications.");
  window.location.hash = "membership";
});

elements.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(elements.loginForm);
  const email = formData.get("email").trim().toLowerCase();
  const member = getMembers().find((entry) => entry.email === email);

  if (!member) {
    showToast("No account found for that email. Please register first.");
    setAuthMode("register");
    return;
  }

  saveSession(email);
  elements.loginForm.reset();
  updateQuote();
  showToast("Login successful. Continue to membership activation.");
  window.location.hash = "membership";
});

elements.depositForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!getCurrentMember()) {
    showToast("Please register or login before making a membership deposit.");
    window.location.hash = "account";
    return;
  }

  const deposit = Number(elements.depositAmount.value);
  if (deposit < minimumDeposit) {
    showToast("Minimum membership deposit is KES 250.");
    return;
  }

  openPaystackCheckout(deposit);
  saveDeposit(deposit);
  updateQuote();
  showToast(`Membership active. Estimated loan limit is ${currency.format(getLoanLimit())}.`);
});

elements.quickDeposit.addEventListener("click", () => {
  elements.depositAmount.value = "1000";
  elements.depositAmount.focus();
});

elements.loanForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!isActiveMember()) {
    showToast("Register and activate membership before applying.");
    window.location.hash = getCurrentMember() ? "membership" : "account";
    return;
  }

  const formData = new FormData(elements.loanForm);
  const quote = getQuote();

  if (quote.amount > getLoanLimit()) {
    showToast("Requested amount is above your active loan limit.");
    return;
  }

  const member = getCurrentMember();
  const application = {
    name: member.name,
    phone: member.phone,
    income: Number(formData.get("income")),
    purpose: formData.get("purpose"),
    repaymentSource: formData.get("repaymentSource"),
    paymentChannel: formData.get("paymentChannel"),
    collateral: formData.get("collateral"),
    requestedDate: formData.get("requestedDate"),
    notes: formData.get("notes").trim(),
    amount: quote.amount,
    term: quote.term,
    rate: quote.rate,
    payment: Math.round(quote.monthlyPayment),
    deposit: getDeposit(),
    createdAt: new Date().toISOString()
  };

  const decision = getDecision(application.income, application.payment, application.amount);
  saveApplications([application, ...getApplications()]);
  renderApplications();
  elements.loanForm.reset();
  updateQuote();
  showToast(`Application submitted. Decision signal: ${decision.signal}.`);
});

elements.clearRecords.addEventListener("click", () => {
  saveApplications([]);
  renderApplications();
  showToast("Application records cleared.");
});

updateQuote();
renderApplications();
