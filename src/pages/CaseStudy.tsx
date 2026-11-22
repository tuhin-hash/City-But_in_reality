import React from 'react';
import {
  BookOpen,
  Award,
  Layers,
  ShieldAlert,
  Wallet,
  Clock,
  CheckCircle2,
  Users,
  Compass,
  ArrowRight,
  ExternalLink,
  Info,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';

export function CaseStudy() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-12 font-sans">
      {/* Portfolio Header Banner */}
      <div className="border-b border-[#2A2E2A] pb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-2 py-0.5 bg-[#C6FF54]/10 font-bold">
            GOOGLE APPLICANT PORTFOLIO CASE STUDY
          </span>
          <span className="font-mono text-[10px] text-[#969B92]">
            ENTRY-LEVEL TECHNICAL PROJECT MANAGER
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#F1F0E8] leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          How I Would Manage a 12-Week Urban Technology Pilot
        </h1>

        <p className="text-sm sm:text-base text-[#969B92] leading-relaxed max-w-3xl">
          An end-to-end project management architecture demonstrating hybrid agile delivery,
          Earned Value financial governance, multi-agency stakeholder alignment, and quantitative
          risk control for an urban pedestrian mobility intelligence platform in Bengaluru.
        </p>

        {/* Candidate Meta Strip */}
        <div className="p-4 bg-[#181B18] border border-[#2A2E2A] grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
          <div>
            <span className="text-[10px] text-[#5F655B] block">PROJECT LEAD</span>
            <span className="text-[#F1F0E8] font-bold">Rahul Sharma</span>
          </div>
          <div>
            <span className="text-[10px] text-[#5F655B] block">TARGET ORG</span>
            <span className="text-[#C6FF54] font-bold">Google (Technical PM)</span>
          </div>
          <div>
            <span className="text-[10px] text-[#5F655B] block">METHODOLOGY</span>
            <span className="text-[#79B8FF] font-bold">Hybrid Agile (Scrum + CPM)</span>
          </div>
          <div>
            <span className="text-[10px] text-[#5F655B] block">BUDGET ENVELOPE</span>
            <span className="text-[#F1F0E8] font-bold">₹12,00,000 (INR 12L)</span>
          </div>
        </div>
      </div>

      {/* Disclaimers & Ethics */}
      <div className="p-4 bg-[#141714] border border-[#2A2E2A] text-xs text-[#969B92] font-mono leading-relaxed space-y-1">
        <div className="text-[#C6FF54] font-bold flex items-center gap-1.5">
          <Info size={13} />
          <span>PORTFOLIO NOTICE & TRANSPARENCY STATEMENT:</span>
        </div>
        <p>
          This case study and the accompanying interactive Command Center application represent
          an independently designed project management simulation. All budgets, teams, risks, and
          sprint metrics are illustrative models constructed to demonstrate PM competencies expected
          at technology organizations such as Google. It does not claim formal municipal endorsement.
        </p>
      </div>

      {/* Section 1: Executive Overview & The Problem */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C6FF54] font-bold">
          <span>01</span>
          <span className="w-6 h-[1px] bg-[#C6FF54]" />
          <span>THE PROBLEM & PROJECT VISION</span>
        </div>
        <h2 className="text-2xl font-bold text-[#F1F0E8]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          The City You See Isn't Always The City You Experience
        </h2>
        <p className="text-sm text-[#969B92] leading-relaxed">
          Traditional digital maps optimize almost exclusively for Euclidean distance and motorized travel time.
          However, real pedestrian journeys are dictated by physical urban friction: broken sidewalks, missing crossings,
          flooded underpasses during monsoon downpours, construction encroachments, and unshaded heat corridors.
        </p>
        <p className="text-sm text-[#969B92] leading-relaxed">
          <strong>The PM Mandate:</strong> Lead a cross-functional 10-person crew across engineering, GIS, design, and
          field operations to build, pilot, and evaluate a prototype mobility intelligence platform in Bengaluru within
          a strict 12-week timebox and ₹12,00,000 budget.
        </p>
      </section>

      {/* Section 2: Hybrid Delivery Methodology */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C6FF54] font-bold">
          <span>02</span>
          <span className="w-6 h-[1px] bg-[#C6FF54]" />
          <span>HYBRID AGILE GOVERNANCE ARCHITECTURE</span>
        </div>
        <h2 className="text-2xl font-bold text-[#F1F0E8]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Why Hybrid Agile Was Selected
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-[#181B18] border border-[#2A2E2A] space-y-2">
            <div className="font-mono text-xs text-[#C6FF54] font-bold">
              WATERFALL STAGE-GATES (GOVERNANCE)
            </div>
            <p className="text-xs text-[#969B92] leading-relaxed">
              Municipal stakeholders (BBMP) require formal baseline commitments, scope freezes, and milestone
              verification gates before permitting public trials.
            </p>
          </div>
          <div className="p-4 bg-[#181B18] border border-[#2A2E2A] space-y-2">
            <div className="font-mono text-xs text-[#79B8FF] font-bold">
              2-WEEK SCRUM ITERATIONS (EXECUTION)
            </div>
            <p className="text-xs text-[#969B92] leading-relaxed">
              Software and GIS mapping integration involves technical ambiguity. Bi-weekly sprints allow continuous
              backlog refinement, velocity tracking, and early defect detection.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Earned Value Management (EVM) */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C6FF54] font-bold">
          <span>03</span>
          <span className="w-6 h-[1px] bg-[#C6FF54]" />
          <span>FINANCIAL RIGOR & EARNED VALUE ANALYSIS</span>
        </div>
        <h2 className="text-2xl font-bold text-[#F1F0E8]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Managing Cost Variance Mathematically
        </h2>
        <p className="text-sm text-[#969B92] leading-relaxed">
          Rather than relying on subjective status updates, project health is tracked using standard EVM indices.
          At Week 8, with 42% of total work packages verified:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3 bg-[#181B18] border border-[#2A2E2A]">
            <span className="text-[10px] text-[#969B92]">CPI: 0.94</span>
            <div className="text-sm font-bold text-[#FF8B45] mt-1">Slight Cost Variance</div>
            <p className="text-[10px] text-[#5F655B] mt-1">Due to upfront commercial GIS building footprints</p>
          </div>
          <div className="p-3 bg-[#181B18] border border-[#2A2E2A]">
            <span className="text-[10px] text-[#969B92]">SPI: 0.85</span>
            <div className="text-sm font-bold text-[#FF8B45] mt-1">Minor Schedule Lag</div>
            <p className="text-[10px] text-[#5F655B] mt-1">Absorbed by parallelizing GIS data validation</p>
          </div>
          <div className="p-3 bg-[#181B18] border border-[#2A2E2A]">
            <span className="text-[10px] text-[#969B92]">EAC: ₹12,76,595</span>
            <div className="text-sm font-bold text-[#79B8FF] mt-1">Forecast At Completion</div>
            <p className="text-[10px] text-[#5F655B] mt-1">Covered by ₹1,50,000 contingency reserve</p>
          </div>
        </div>
      </section>

      {/* Section 4: Risk Management & RAID */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C6FF54] font-bold">
          <span>04</span>
          <span className="w-6 h-[1px] bg-[#C6FF54]" />
          <span>PROACTIVE RISK & IMPEDIMENT CONTROL</span>
        </div>
        <h2 className="text-2xl font-bold text-[#F1F0E8]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Treating Risks as Measurable Probabilities
        </h2>
        <p className="text-sm text-[#969B92] leading-relaxed">
          Risks are quantified on a 1–5 probability and impact scale. High exposure items (e.g. backend API dependencies)
          are assigned active mitigation triggers. When a risk materializes into an issue (e.g. schema blocker), it enters
          a formalized resolution workflow with designated owners.
        </p>
      </section>

      {/* Section 5: Signature Scenarios Summary */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C6FF54] font-bold">
          <span>05</span>
          <span className="w-6 h-[1px] bg-[#C6FF54]" />
          <span>DELIVERY SIMULATION & TRADE-OFF PHILOSOPHY</span>
        </div>
        <h2 className="text-2xl font-bold text-[#F1F0E8]" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          PM Decision-Making Under Uncertainty
        </h2>
        <p className="text-sm text-[#969B92] leading-relaxed">
          A successful PM does not simply pick the cheapest or fastest option. The built-in delivery simulation
          evaluates 6 real-world crisis scenarios (weather delays, resource outages, scope creep requests) and rewards:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-[#969B92]">
          <li className="p-2.5 bg-[#181B18] border border-[#2A2E2A]">
            <strong className="text-[#C6FF54]">✓ Proactive Parallelization:</strong> Using available data segments rather than halting downstream teams.
          </li>
          <li className="p-2.5 bg-[#181B18] border border-[#2A2E2A]">
            <strong className="text-[#C6FF54]">✓ Formal Change Control:</strong> Logging scope expansions formally rather than accepting informal creep.
          </li>
          <li className="p-2.5 bg-[#181B18] border border-[#2A2E2A]">
            <strong className="text-[#C6FF54]">✓ Transparent Escalation:</strong> Informing sponsors early when critical path milestones are threatened.
          </li>
          <li className="p-2.5 bg-[#181B18] border border-[#2A2E2A]">
            <strong className="text-[#C6FF54]">✓ Ethical Team Management:</strong> Refusing to force excessive unpaid overtime for minor schedule variations.
          </li>
        </ul>
      </section>

      {/* Call to Action: Explore Live Command Center */}
      <div className="p-6 bg-[#181B18] border border-[#C6FF54]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono">
        <div>
          <div className="text-xs text-[#C6FF54] font-bold uppercase">
            EXPERIENCE THE LIVE WORKING PROTOTYPE
          </div>
          <div className="text-sm font-bold text-[#F1F0E8] mt-1">
            Test all 17 interactive modules, calculations, and simulations.
          </div>
        </div>

        <Button variant="lime" size="md" onClick={() => navigate('/overview')}>
          <span>LAUNCH COMMAND CENTER</span>
          <ArrowRight size={13} />
        </Button>
      </div>
    </div>
  );
}
