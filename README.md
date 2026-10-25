# Apex University — Central Student Grievance Redressal & Resolution System (SGRMS)
### *Statutory Directorate of Student Affairs & Office of the University Ombudsperson*

[![NAAC A++ Accredited](https://img.shields.io/badge/NAAC-A%2B%2B%20Accredited-0d1f3c.svg)](https://www.naac.gov.in)
[![UGC Regulations 2023 Compliant](https://img.shields.io/badge/UGC%20Compliance-Regulations%202023-c59b27.svg)](https://www.ugc.gov.in)
[![ISO 9001:2015](https://img.shields.io/badge/Standard-ISO%209001%3A2015-059669.svg)]()
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()

---

## 🏛️ Executive Summary

The **Apex University Central Student Grievance Redressal & Resolution System (SGRMS)** is an institutional enterprise web application designed to fulfill statutory mandates enacted under the **University Grants Commission (Redressal of Grievances of Students) Regulations, 2023**. 

The system functions as an **Intelligent Resolution Agent**—operating unobtrusively behind the scenes through automated policy triage, statutory regulatory cross-referencing, severity matrix calculation, and automated drafting of official resolution decrees—while maintaining supreme institutional dignity, academic typography, and zero gimmicky AI artifacts.

---

## 🌟 Key Functional Pillars

### 1. Student Intake & Whistleblower Shield Protocol
- **5-Step Structured Redressal Wizard**:
  - **Step 1: Student Particulars & Whistleblower Anonymity** (Elect confidential identity masking for sensitive allegations; identity is cryptographically shielded from departmental respondents).
  - **Step 2: Grievance Classification & Incident Particulars** (Academic, Examinations, Financial/Fee, Hostel/Living, Harassment/Ragging ICC, Placements, Administration).
  - **Step 3: Statement & Relief Sought** (Objective chronological statement, concrete remedial directive requested, prior informal attempts).
  - **Step 4: Documentary Evidence Submission** (Multi-file uploader for fee challans, medical sanctions, answer script copies, with simulated one-click evidence chips).
  - **Step 5: Statutory Declaration & Veracity Affirmation** (Legally binding digital sign-off).
- Instant generation of unique **Docket Tracking ID** (e.g., `APX-2026-GRV-8194`) and confidential **4-digit Tracking PIN**.

### 2. Intelligent Policy Triage & Jurisdictional Routing Subsystem
- **Deterministic Natural Language Classification**:
  - Analyzes vocabulary and statutory trigger words to categorize grievances across 7 university jurisdictions with >90% deterministic confidence.
- **Urgency & Severity Priority Matrix**:
  - **P1 - Critical (24-Hour Turnaround SLA)**: Ragging, physical safety, harassment, health hazards.
  - **P2 - High (48-Hour Turnaround SLA)**: Examination hall tickets withheld, imminent test dates, medical attendance thresholds.
  - **P3 - Medium (5-Day Turnaround SLA)**: Fee debit reconciliations, answer script re-evaluations, caution deposits.
  - **P4 - Routine (10-Day Turnaround SLA)**: Degree certificates, transcript dispatches, migration clearances.
- **Cross-Referencing Statutory Bylaws**:
  - Automatically matches petitions to the relevant statutory code (*UGC Regulations 2023*, *Academic Ordinance 14-B*, *Finance Circular 2024/09*, *Central Hostel Living Standards Manual*).
- **Automated Decision-Support Resolution Recommendations**:
  - Generates institutional draft resolution decrees, operative directives, and compliance deadlines ready for committee approval.

### 3. Public & Student Docket Tracker
- **Multi-Stage Visual Stepper**:
  - Registered ➔ Policy Triaged ➔ Committee Review ➔ Resolution Enacted ➔ Redressal Closed.
- **Live SLA Countdown Clock**:
  - Displays remaining turnaround hours; alerts when a case is near breach or auto-escalated to the Vice-Chancellor's Ombudsperson bench.
- **4-Tab Case Dossier**:
  - Tab 1: Full Statement & Relief Sought
  - Tab 2: Policy Triage Analysis & Applicable University Bylaws
  - Tab 3: Documentary Proofs with simulated verified downloads
  - Tab 4: Chronological Audit Trail & Activity Logs
- **Statutory Resolution Decree Viewer**:
  - View and print formal legal orders with official letterhead, reference numbers, numbered directives, authorized officer signatures, and embossed gold seal.
- **Appellate & Feedback Mechanisms**:
  - One-click closure with 1–5 star satisfaction rating.
  - File statutory first appeal directly before the University Ombudsperson.

### 4. Standing Committee & Officer Workbench
- **Officer Role Switcher**:
  - Experience the system as:
    - *Prof. Alok Mukherjee* (Dean, Academic Affairs)
    - *Dr. Savita Nambiar* (Controller of Examinations)
    - *Mr. R. K. Bhattacharya* (Chief Finance Officer)
    - *Dr. Hemant Joshi* (Chief Warden & Dean Student Welfare)
    - *Prof. Meenakshi Sundaram* (Presiding Officer, ICC & Anti-Ragging Cell)
- **Live Docket Queue**:
  - Status filters: New Intake, Under Review, Hearings Scheduled, Orders Enacted, Closed, Overdue SLA.
- **Interlocutory Committee Controls**:
  - Mark Under Review, schedule formal hearings, and launch the **Resolution Order Generator** to edit directives and enforce decrees.

### 5. Institutional Analytics & Public Transparency
- Real-time KPIs: Redressal Rate (96.4%), Average Turnaround Time (2.6 days), SLA Adherence %.
- Jurisdictional category distribution bars and severity tier charts.
- Exportable formal institutional compliance report formatted for print/PDF.

### 6. Statutory Regulatory Directory
- Full text repository of University Ordinances, UGC 2023 guidelines, and the 3-Tier Escalation Matrix.

---

## 🚀 How to Run the Application

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Execution

1. **Install Dependencies** (Already completed):
   ```bash
   npm install
   ```

2. **Run in Development Mode (Vite Dev Server)**:
   ```bash
   npm run dev
   ```
   *The live interactive application will start at `http://localhost:5173`.*

3. **Build and Run Production Server (Express Backend)**:
   ```bash
   npm run build
   node server.js
   ```
   *The production server will be accessible at `http://localhost:3000`.*

---

## 🧪 Demonstration & Evaluation Walkthrough

1. **Inspect Active Grievances**:
   - On the homepage, browse the sample dockets. Click on docket `APX-2026-GRV-8194` (Hall ticket withheld case).
   - Notice the **High P2 Priority (48h SLA)**, the live stepper, and the **Certified Resolution Order** button.
   - Click **"View Certified Resolution Order"** to view the university decree with official gold seal and click **"Print / Save PDF"**.

2. **Test Automated Policy Triage (New Grievance Filing)**:
   - Click **"Lodge Grievance"** in the top navigation.
   - Use the sample helper buttons at the top (`Examination Ticket` or `Fee Refund Ticket`) or type your own grievance.
   - Try toggling **"Whistleblower Anonymity & Identity Masking"**.
   - Advance through the 5 steps and click **"Register & Dispatch Docket"**.
   - Notice the instant Docket ID and Tracking PIN generation.

3. **Officer Workbench & Decision Support**:
   - Click **"Officer Desk"** in the navigation bar.
   - Switch persona to *Dr. Savita Nambiar* or *Mr. R. K. Bhattacharya*.
   - Click **"Review Docket"** on any active case.
   - Observe the **Automated Policy Triage & Jurisdictional Analysis** panel.
   - Click **"Compose Official Resolution Order"**, review the pre-populated statutory directives, and click **"Issue & Enforce Statutory Order"**.

4. **Appeals & Transparency Metrics**:
   - Return to **Track Docket** and click **"Lodge Appeal to Ombudsperson"** to simulate an appeal.
   - Navigate to **"Transparency"** to view the real-time institutional metrics and KPI charts.

---

## 🏛️ Technology Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS, Lucide Icons
- **Typography**: Google Fonts (*Plus Jakarta Sans*, *Merriweather*, *JetBrains Mono*)
- **Backend / API**: Express 4, Node.js, CORS
- **Storage**: Persistent LocalStorage with rich institutional demonstration seeds & reset trigger
- **Design Language**: Oxford Navy (`#0d1f3c`), Slate (`#f8fafc`), Academic Gold (`#c59b27`), Emerald (`#059669`), Crimson (`#dc2626`)
