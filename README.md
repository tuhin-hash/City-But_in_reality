# CITY, BUT IN REALITY · Urban Mobility Pilot
## Project Management Command Center
**Google Project Manager Entry-Level Portfolio Demonstration**

---

### Project Overview
**CITY, BUT IN REALITY** is a 12-week hybrid agile urban technology initiative located in Bengaluru, Karnataka, India. The project's goal is to research, engineer, and pilot an urban mobility intelligence platform that maps physical pedestrian infrastructure friction (broken sidewalks, monsoon waterlogging, missing pedestrian crossings, construction encroachments, and unshaded heat corridors).

This web application serves as the **Project Manager Command Center**, demonstrating end-to-end planning, execution, monitoring, controlling, and closure of a complex technology delivery lifecycle.

---

### Technology Stack
- **Framework & Language:** React 19, TypeScript, Vite
- **Styling & Aesthetics:** Tailwind CSS v4, Custom Urban Intelligence Design System
- **State & Local Persistence:** Zustand with `persist` middleware (HTML5 LocalStorage)
- **Data Visualizations:** Recharts (S-Curve trends, Burndown, Velocity, EVM Category Burn, Task Distribution)
- **Icons & Motion:** Lucide React, Framer Motion
- **Date Calculations:** date-fns

---

### Key Modules & Capabilities

1. **Executive Overview Dashboard (`/overview`)**
   - Dynamic project health indicator (On Track / At Risk / Critical) calculated from SPI, CPI, and active blockers.
   - S-Curve Planned vs. Actual completion trend.
   - Project Manager's Attention section highlighting prioritized high-impact items with direct record links.

2. **Stage-Gate 01: Project Charter (`/charter`)**
   - Formal project charter authorizing resource commitments, defining scope boundaries (In-Scope vs. Explicitly Out-of-Scope), and success criteria.
   - Multi-step approval workflow: `Draft` → `Under Review` → `Approved` → `Baseline Established`.
   - Live editable fields with local persistence.

3. **12-Week Master Roadmap (`/roadmap`)**
   - 5-Phase delivery lifecycle (Initiation, Discovery & Planning, Design & Development, Testing, Pilot & Closure).
   - Documented stage-gate entry and exit criteria, contracted deliverables, and milestone dependencies.
   - Interactive progress adjustment controls.

4. **Work Breakdown Structure (`/wbs`)**
   - 100% Rule hierarchical decomposition from Level 1 phases down to Level 2 work packages and assignable task activities.
   - Interactive expand/collapse, add activity modal, edit, and deletion updating the global project state.

5. **Task Management Board (`/tasks`)**
   - Triple-view interface: Kanban Board, Tabular List, and Calendar Due-Date view.
   - Real-time status transitions (Backlog, To Do, In Progress, Blocked, In Review, Completed).
   - Per-task audit trails and comment logging.

6. **Timeline & Critical Path Gantt (`/timeline`)**
   - Master Gantt chart spanning all 12 delivery weeks.
   - Automatic highlighting of the zero-float **Critical Path**.
   - Micro date-shifting controls with real-time critical path impact alerts.
   - Precedence Diagram Method (PDM) dependency network view.

7. **Agile Sprint Management (`/sprints`)**
   - Hybrid Agile framework managing 4 development sprints (Foundation, Mapping & Data, Intelligence Layer, Testing & Release).
   - Dynamic Story Point Burndown chart and historical Velocity tracker.
   - Sprint backlog execution and documented Retrospective continuous improvement archives.

8. **Team & Human Resources (`/team`)**
   - 10-person cross-functional roster (PM, Tech Lead, Frontend, Backend, GIS Specialist, Data Analyst, UX, QA, Field Coordinator, Liaison).
   - Capacity ceiling and utilization bar charts with automatic over-allocation warnings (>100% capacity).
   - RACI Responsibility Assignment Matrix across core project deliverables.

9. **Stakeholder Engagement (`/stakeholders`)**
   - 4-Quadrant Power-Interest Grid (Manage Closely, Keep Satisfied, Keep Informed, Monitor).
   - Tailored communication cadences and concerns tracking for municipal authorities (BBMP), sponsors, and pedestrian advocates.

10. **Risk Register & RAID Management (`/risks`)**
    - 5×5 Probability × Impact Heatmap with automated exposure scoring.
    - Connected RAID log integrating Risks, Assumptions, Issues, and Dependencies.
    - Proactive mitigation strategies paired with reactive contingency plans.

11. **Earned Value Management Budget Control (`/budget`)**
    - Real-time mathematical EVM indices: Planned Value (PV), Earned Value (EV), Actual Cost (AC), CPI, SPI, EAC, and VAC.
    - 7-category budget breakdown against the ₹12,00,000 baseline.
    - Transaction expense logging modal.

12. **Issues & Blockers (`/issues`)**
    - Incident tracking with severity levels, owner assignments, and resolution action plans.
    - Sponsor escalation toggle and dependency consequence mapping.

13. **Change Control Board (`/changes`)**
    - Change Request (CR) workflow preventing informal scope creep: `Submitted` → `Impact Assessment` → `Under Review` → `Approved / Rejected` → `Implemented`.
    - Formal 4-vector impact assessment (Schedule, Budget, Resource, Risk).

14. **Communications Center (`/communications`)**
    - Comprehensive communication distribution matrix.
    - Ready-to-copy executive report templates (Weekly status, risk escalation, steering minutes).
    - Immutable Steering Committee Decision Log.

15. **Reports & Analytics (`/reports`)**
    - Formal printable project performance audits.
    - One-click JSON data export.

16. **Delivery Simulation — Signature Portfolio Feature (`/simulation`)**
    - Interactive crisis simulator putting the reviewer in the PM seat.
    - 6 realistic crisis scenarios: Monsoon weather delays, GIS cost overruns, developer illness, scope creep requests, coordinate system technical failures, and municipal approval delays.
    - Scored PM decision quality feedback explaining governance trade-offs.

17. **Project Closure (`/closure`)**
    - 6-point stage-gate dissolution checklist.
    - Organizational Lessons Learned knowledge base.
    - Operational handover certificate transferring assets to municipal authorities.

18. **Public Case Study (`/case-study`)**
    - "How I Would Manage a 12-Week Urban Technology Pilot": An editorial, interview-ready summary structured for executive recruiters.

---

### Setup and Running Instructions

1. **Navigate to the project root:**
   ```bash
   cd D:\GPM1
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Launch the development server:**
   ```bash
   npm run dev
   ```
   Open the browser at the local URL (typically `http://localhost:5173`).

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

---

### Resetting Demonstration Data
To restore the initial baseline at any point during review, click the **RESET DEMO** button located in the top navigation bar.

---

### Demo Limitations & Ethics
- All project metrics, financial budgets, contractor names, and municipal communications are simulated for portfolio evaluation purposes.
- Demonstrates technical and methodology competence without claiming actual municipal deployment.
