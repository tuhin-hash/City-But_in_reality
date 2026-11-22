import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Users,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';

interface RoadmapPhase {
  id: string;
  name: string;
  weeks: string;
  timeframe: string;
  status: 'completed' | 'active' | 'upcoming';
  progress: number;
  objectives: string[];
  deliverables: string[];
  entryCriteria: string;
  exitCriteria: string;
  responsibleLead: string;
  keyMilestone: string;
}

export function Roadmap() {
  const { addToast } = useToast();
  const { milestones } = useProjectStore();

  const [phases, setPhases] = useState<RoadmapPhase[]>([
    {
      id: 'phase-1',
      name: '01. INITIATION & STAKEHOLDER ALIGNMENT',
      weeks: 'WEEKS 1–2',
      timeframe: 'Sep 15 – Sep 28, 2026',
      status: 'completed',
      progress: 100,
      objectives: [
        'Secure formal sponsor authorization and project charter approval',
        'Identify and map municipal, academic, and community stakeholders',
        'Validate initial high-level technical feasibility for Bengaluru GIS',
        'Conduct formal project kickoff and establish governance rhythm',
      ],
      deliverables: [
        'Approved Project Charter',
        'Stakeholder Register & Power-Interest Grid',
        'Technical Feasibility Assessment',
        'Kickoff Meeting Minutes',
      ],
      entryCriteria: 'Sponsor concept approval & preliminary budget envelope',
      exitCriteria: 'Signed Project Charter & Baselined Team Roster',
      responsibleLead: 'Rahul Sharma (PM) & Anjali Mehra (Tech Lead)',
      keyMilestone: 'M01: Project Charter Approved (Day 11)',
    },
    {
      id: 'phase-2',
      name: '02. DISCOVERY & PLANNING',
      weeks: 'WEEKS 3–4',
      timeframe: 'Sep 29 – Oct 12, 2026',
      status: 'completed',
      progress: 100,
      objectives: [
        'Interview 20 daily pedestrians in Yelahanka, Hebbal, Indiranagar',
        'Select and survey 3 priority pilot pedestrian corridors',
        'Freeze functional requirements for reality scoring and reporting',
        'Establish architecture, technology stack, and CI/CD pipelines',
      ],
      deliverables: [
        'User Research Insights Report',
        'Pilot Corridor Mapping Specification',
        'Frozen Requirements Traceability Matrix',
        'Technical Architecture Blueprint',
      ],
      entryCriteria: 'Charter baseline signed',
      exitCriteria: 'Requirements frozen & Architecture sign-off',
      responsibleLead: 'Arjun Patel (UX) & Anjali Mehra (Tech Lead)',
      keyMilestone: 'M02: Requirements Frozen (Day 27)',
    },
    {
      id: 'phase-3',
      name: '03. DESIGN & DEVELOPMENT (CURRENT)',
      weeks: 'WEEKS 5–8',
      timeframe: 'Oct 13 – Nov 09, 2026',
      status: 'active',
      progress: 72,
      objectives: [
        'Enrich OpenStreetMap (OSM) sidewalk datasets with physical friction',
        'Build high-performance React + Leaflet interactive city map console',
        'Implement transparent 0-100 Reality Scoring algorithm across 5 vectors',
        'Develop crowdsourced issue reporting module with local caching',
      ],
      deliverables: [
        'Enriched GIS Sidewalk Dataset',
        'Interactive City Map Console',
        '5-Factor Reality Score Engine',
        'Community Reporting Subsystem',
      ],
      entryCriteria: 'Frozen requirements & Approved API contracts',
      exitCriteria: 'Feature-complete prototype ready for QA',
      responsibleLead: 'Siddharth Rao (Frontend) & Vikram Suresh (GIS)',
      keyMilestone: 'M04: Prototype Ready for Demo (Day 56)',
    },
    {
      id: 'phase-4',
      name: '04. INTEGRATION & QUALITY TESTING',
      weeks: 'WEEKS 9–10',
      timeframe: 'Nov 10 – Nov 23, 2026',
      status: 'upcoming',
      progress: 15,
      objectives: [
        'Execute 32 functional test cases across routing and reporting flows',
        'Conduct end-to-end integration testing (Frontend, Backend, GIS)',
        'Run 10 moderated usability sessions with pilot area residents',
        'Triage and resolve all severity-1 and severity-2 defects',
      ],
      deliverables: [
        'Functional Test Execution Report',
        'Integration Verification Sign-off',
        'Usability Assessment Findings',
        'Defect Closure Log (Zero Criticals)',
      ],
      entryCriteria: 'Code freeze & Staging deployment verified',
      exitCriteria: 'QA sign-off & Zero Sev-1/Sev-2 open bugs',
      responsibleLead: 'Sneha Iyer (QA Lead)',
      keyMilestone: 'M05: Testing Complete & QA Sign-off (Day 70)',
    },
    {
      id: 'phase-5',
      name: '05. PILOT DEPLOYMENT & CLOSURE',
      weeks: 'WEEKS 11–12',
      timeframe: 'Nov 24 – Dec 08, 2026',
      status: 'upcoming',
      progress: 0,
      objectives: [
        'Conduct formal executive demonstration to BBMP Infrastructure team',
        'Deploy public pilot release across Bengaluru North pilot corridor',
        'Gather and synthesize 2 weeks of live community friction feedback',
        'Facilitate formal project closure, EVM audit, and lessons learned',
      ],
      deliverables: [
        'BBMP Demonstration Sign-off',
        'Live Pilot Web Application',
        'Pilot Evaluation & Community Feedback Report',
        'Project Closure Report & Lessons Learned Archive',
      ],
      entryCriteria: 'QA Sign-off & BBMP Data Sharing Agreement',
      exitCriteria: 'Formal Sponsor Sign-off & Project Dissolution',
      responsibleLead: 'Rahul Sharma (PM) & Kavya Reddy (Liaison)',
      keyMilestone: 'M06: Pilot Launch & M07: Project Closure (Day 84)',
    },
  ]);

  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase>(phases[2]); // Phase 3 active

  const handleUpdateProgress = (phaseId: string, delta: number) => {
    setPhases((prev) =>
      prev.map((p) => {
        if (p.id === phaseId) {
          const newProg = Math.max(0, Math.min(100, p.progress + delta));
          const newStatus =
            newProg === 100 ? 'completed' : newProg > 0 ? 'active' : 'upcoming';
          const updated = { ...p, progress: newProg, status: newStatus as any };
          if (selectedPhase.id === phaseId) setSelectedPhase(updated);
          return updated;
        }
        return p;
      })
    );
    addToast('Roadmap phase progress updated.', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Phase Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-1.5 py-0.5 bg-[#C6FF54]/5">
              12-WEEK ROADMAP MASTER SCHEDULE
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              STAGE-GATE WATERFALL + AGILE SPRINTS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            PROJECT ROADMAP
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Visual progression across five delivery phases. Balances stage-gate executive
            governance with bi-weekly development sprint iterations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="lime" dot>
            CURRENT: PHASE 03 (WEEK 8)
          </Badge>
        </div>
      </div>

      {/* Horizontal Phase Timeline Tracker */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 font-mono">
        {phases.map((p, idx) => {
          const isSelected = selectedPhase.id === p.id;
          const isCompleted = p.status === 'completed';
          const isActive = p.status === 'active';

          return (
            <div
              key={p.id}
              onClick={() => setSelectedPhase(p)}
              className={`p-3 border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#C6FF54] bg-[#C6FF54]/10'
                  : isCompleted
                  ? 'border-[#C6FF54]/30 bg-[#181B18] hover:border-[#C6FF54]/60'
                  : isActive
                  ? 'border-[#79B8FF] bg-[#181B18] hover:border-[#79B8FF]'
                  : 'border-[#2A2E2A] bg-[#141714] hover:border-[#5F655B]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="font-bold text-[#F1F0E8]">PHASE 0{idx + 1}</span>
                  <span
                    className={`font-semibold ${
                      isCompleted
                        ? 'text-[#C6FF54]'
                        : isActive
                        ? 'text-[#79B8FF]'
                        : 'text-[#5F655B]'
                    }`}
                  >
                    {p.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs font-bold text-[#F1F0E8] line-clamp-2 leading-tight">
                  {p.name.replace(/^\d+\.\s*/, '')}
                </div>
                <div className="text-[10px] text-[#969B92] mt-1">{p.weeks}</div>
              </div>

              <div className="mt-3 pt-2 border-t border-[#2A2E2A]">
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="text-[#969B92]">Progress</span>
                  <span className="text-[#F1F0E8] font-bold">{p.progress}%</span>
                </div>
                <div className="h-1 bg-[#202420] w-full">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${p.progress}%`,
                      backgroundColor: isCompleted ? '#C6FF54' : '#79B8FF',
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Phase Deep Dive Card */}
      <div className="bg-[#181B18] border border-[#2A2E2A] p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2A2E2A] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs text-[#C6FF54] font-bold">
                {selectedPhase.weeks}
              </span>
              <span className="text-[#5F655B]">·</span>
              <span className="font-mono text-xs text-[#969B92]">
                {selectedPhase.timeframe}
              </span>
            </div>
            <h2 className="text-xl font-bold text-[#F1F0E8]">
              {selectedPhase.name}
            </h2>
          </div>

          {/* Interactive Progress Controls */}
          <div className="flex items-center gap-2 font-mono">
            <span className="text-xs text-[#969B92]">Adjust Progress:</span>
            <Button
              variant="secondary"
              size="xs"
              onClick={() => handleUpdateProgress(selectedPhase.id, -5)}
            >
              -5%
            </Button>
            <span className="text-xs font-bold text-[#C6FF54] px-1">
              {selectedPhase.progress}%
            </span>
            <Button
              variant="secondary"
              size="xs"
              onClick={() => handleUpdateProgress(selectedPhase.id, 5)}
            >
              +5%
            </Button>
          </div>
        </div>

        {/* Phase Meta Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs p-4 bg-[#141714] border border-[#2A2E2A]">
          <div>
            <div className="text-[10px] text-[#969B92] uppercase flex items-center gap-1">
              <Users size={12} className="text-[#C6FF54]" />
              <span>RESPONSIBLE LEADERSHIP</span>
            </div>
            <div className="text-[#F1F0E8] font-bold mt-1">
              {selectedPhase.responsibleLead}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#969B92] uppercase flex items-center gap-1">
              <Sparkles size={12} className="text-[#79B8FF]" />
              <span>KEY STAGE-GATE MILESTONE</span>
            </div>
            <div className="text-[#79B8FF] font-bold mt-1">
              {selectedPhase.keyMilestone}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#969B92] uppercase flex items-center gap-1">
              <Clock size={12} className="text-[#C6FF54]" />
              <span>CURRENT STATUS</span>
            </div>
            <div className="text-[#C6FF54] font-bold mt-1">
              {selectedPhase.status.toUpperCase()} ({selectedPhase.progress}% DONE)
            </div>
          </div>
        </div>

        {/* Objectives & Deliverables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Objectives */}
          <div className="bg-[#141714] border border-[#2A2E2A] p-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#C6FF54] mb-3 flex items-center gap-2">
              <CheckCircle2 size={13} />
              <span>PHASE OBJECTIVES & SUCCESS GATES</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-[#F1F0E8]">
              {selectedPhase.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-mono text-[#C6FF54] text-[11px] shrink-0 mt-0.5">
                    0{i + 1}.
                  </span>
                  <span className="leading-relaxed">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Deliverables */}
          <div className="bg-[#141714] border border-[#2A2E2A] p-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#79B8FF] mb-3 flex items-center gap-2">
              <Calendar size={13} />
              <span>CONTRACTED DELIVERABLES</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-[#F1F0E8]">
              {selectedPhase.deliverables.map((del, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-mono text-[#79B8FF] text-[11px] shrink-0 mt-0.5">
                    D{i + 1}.
                  </span>
                  <span className="leading-relaxed">{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Entry and Exit Criteria */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono text-xs">
          <div className="p-3 border border-[#2A2E2A] bg-[#141714]">
            <span className="text-[10px] text-[#969B92] uppercase font-bold block mb-1">
              ENTRY CRITERIA (STAGE-GATE IN)
            </span>
            <div className="text-[#F1F0E8]">{selectedPhase.entryCriteria}</div>
          </div>

          <div className="p-3 border border-[#2A2E2A] bg-[#141714]">
            <span className="text-[10px] text-[#C6FF54] uppercase font-bold block mb-1">
              EXIT CRITERIA (STAGE-GATE OUT)
            </span>
            <div className="text-[#F1F0E8]">{selectedPhase.exitCriteria}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
