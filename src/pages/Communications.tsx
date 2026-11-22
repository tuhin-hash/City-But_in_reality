import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import {
  Radio,
  Mail,
  Calendar,
  FileText,
  CheckCircle,
  Copy,
  Download,
  Plus,
  Send,
  MessageSquare,
  Award,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';

export function Communications() {
  const { addToast } = useToast();
  const { communications, addCommunication, stakeholders } = useProjectStore();

  const [activeTab, setActiveTab] = useState<'matrix' | 'templates' | 'decisions'>('matrix');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('weekly-status');

  // Decision log records
  const [decisionLog, setDecisionLog] = useState([
    {
      id: 'DEC-01',
      date: '2026-09-22',
      decision: 'Adopt OpenStreetMap (OSM) as base GIS layer over paid Google Maps SDK.',
      rationale: 'Avoids recurring licensing fees; community data aligns with open smart city mandate.',
      decidedBy: 'Anjali Mehra (Tech Lead) & Rahul Sharma (PM)',
      status: 'ADOPTED',
    },
    {
      id: 'DEC-02',
      date: '2026-10-04',
      decision: 'Prioritize Yelahanka to Manyata Tech Park corridor as primary pilot testing zone.',
      rationale: 'Represents heavy pedestrian tech commuter traffic paired with severe monsoon sidewalk friction.',
      decidedBy: 'Steering Committee (BBMP + Sponsor)',
      status: 'ADOPTED',
    },
    {
      id: 'DEC-03',
      date: '2026-10-25',
      decision: 'Use 0-100 Reality Score weighted index (Footpath 25%, Safety 25%, Shade 20%, Obstruction 15%, Traffic 15%).',
      rationale: 'Validated with IISc Urban Lab urban mobility research findings.',
      decidedBy: 'Arjun Patel (UX) & Deepa Nair (Data)',
      status: 'ADOPTED',
    },
  ]);

  const templates: Record<string, { title: string; content: string }> = {
    'weekly-status': {
      title: 'Weekly Project Status Update (Week 8)',
      content: `PROJECT: CITY, BUT IN REALITY · Bengaluru Urban Mobility Pilot
DATE: November 22, 2026 | WEEK 8 OF 12
PREPARED BY: Rahul Sharma, Lead Project Manager
DISTRIBUTION: Priya Nair (Sponsor), BBMP Infrastructure Division

1. EXECUTIVE SUMMARY:
- Overall Project Health: AMBER (Schedule SPI: 0.94, Cost CPI: 0.94)
- Current Phase: Design & Development (72% complete)
- Sprint 2 status: 22/55 story points delivered; 4 days remaining in sprint.

2. MAJOR ACHIEVEMENTS THIS WEEK:
- Completed OSM sidewalk base layer data processing for Yelahanka sector.
- Deployed interactive Leaflet map canvas with 6 toggleable condition layers.
- Validated Reality Scoring mathematical weighting with IISc research team.

3. IMMEDIATE BLOCKERS & ATTENTION:
- BLOCKED: Backend API reports schema awaiting sign-off (Task 4.3).
- IMPACT: Delaying community reporting interface integration.
- RESOLUTION: Schema sign-off meeting scheduled for tomorrow 10:00 AM IST.

4. UPCOMING MILESTONES (NEXT 14 DAYS):
- Milestone 04: Working Prototype Ready for BBMP Demonstration (Target: Day 56).
- Sprint 3 Kickoff: Route intelligence & community reporting engine.`,
    },
    'risk-escalation': {
      title: 'Formal Risk Escalation Memo',
      content: `URGENT GOVERNANCE MEMORANDUM
TO: Priya Nair, Project Sponsor
FROM: Rahul Sharma, Project Manager
DATE: November 22, 2026
SUBJECT: Risk Escalation — Task 4.3 Backend API Impediment

SITUATION:
Task 4.3 (Backend API Reports Endpoint) has encountered an upstream dependency blocker regarding data validation schemas. Pooja Krishnan is currently blocked pending sign-off.

IMPACT ASSESSMENT:
- Schedule: Threatens to push Sprint 2 completion by +4 working days.
- Critical Path: Directly precedes Task 4.5 (Community Reporting Integration).
- Budget: No direct cost variance incurred yet.

PROPOSED MITIGATION ACTION:
1. Conduct urgent 30-minute alignment session with Deepa Nair today.
2. If unresolved by 5:00 PM, authorize Tech Lead Anjali Mehra to implement interim mock contract.
3. Maintain zero impact to BBMP Demonstration milestone date.`,
    },
    'meeting-minutes': {
      title: 'Bi-Weekly Stakeholder Steering Committee Minutes',
      content: `MEETING MINUTES: BBMP & SPONSOR STEERING REVIEW
DATE: November 18, 2026 | 11:00 AM – 12:00 PM IST
ATTENDEES: Priya Nair (Sponsor), BBMP Div Engineer, Rahul Sharma (PM), Kavya Reddy (Liaison)

AGENDA:
1. Progress review of pilot corridor sidewalk data collection.
2. Review of Community Reporting data structure & privacy compliance.
3. Preparation for Phase 4 stakeholder live demo.

KEY DECISIONS:
- BBMP approved sidewalk categorization schema (Smooth, Uneven, Damaged, Missing).
- Agreed to exclude personal identifiable information (PII) from public report exports.
- Fixed Demonstration date: December 02, 2026 at BBMP Head Office.`,
    },
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    addToast('Document template copied to clipboard.', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-1.5 py-0.5 bg-[#C6FF54]/5">
              COMMUNICATIONS MANAGEMENT PLAN
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              STAKEHOLDER INFORMATION DISTRIBUTION
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            COMMUNICATIONS CENTER
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Formal communication distribution plan, meeting cadences, executive reporting
            templates, and official steering committee decision logs.
          </p>
        </div>

        <div className="flex items-center border border-[#2A2E2A] bg-[#141714]">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3 py-1.5 text-xs font-mono transition-colors ${
              activeTab === 'matrix'
                ? 'bg-[#202420] text-[#C6FF54]'
                : 'text-[#969B92] hover:text-[#F1F0E8]'
            }`}
          >
            COMMUNICATION MATRIX
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-3 py-1.5 text-xs font-mono transition-colors ${
              activeTab === 'templates'
                ? 'bg-[#202420] text-[#C6FF54]'
                : 'text-[#969B92] hover:text-[#F1F0E8]'
            }`}
          >
            REPORT TEMPLATES
          </button>
          <button
            onClick={() => setActiveTab('decisions')}
            className={`px-3 py-1.5 text-xs font-mono transition-colors ${
              activeTab === 'decisions'
                ? 'bg-[#202420] text-[#C6FF54]'
                : 'text-[#969B92] hover:text-[#F1F0E8]'
            }`}
          >
            DECISION LOG
          </button>
        </div>
      </div>

      {/* TAB: COMMUNICATION MATRIX */}
      {activeTab === 'matrix' && (
        <div className="bg-[#181B18] border border-[#2A2E2A] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#141714] border-b border-[#2A2E2A] text-[10px] text-[#969B92] uppercase">
              <tr>
                <th className="p-3">Communication Event</th>
                <th className="p-3">Audience / Stakeholders</th>
                <th className="p-3">Frequency & Format</th>
                <th className="p-3">Responsible Owner</th>
                <th className="p-3">Objective & Output</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E2A]">
              <tr className="hover:bg-[#202420] transition-colors">
                <td className="p-3 font-semibold text-[#F1F0E8]">Daily Team Standup</td>
                <td className="p-3 text-[#969B92]">Technical & GIS Team (10 members)</td>
                <td className="p-3 text-[#79B8FF]">Daily (09:30 AM) · Google Meet</td>
                <td className="p-3 text-[#C6FF54]">Rahul Sharma (PM)</td>
                <td className="p-3 text-[#969B92] text-[11px]">Sprint progress & daily impediment clearing</td>
              </tr>
              <tr className="hover:bg-[#202420] transition-colors">
                <td className="p-3 font-semibold text-[#F1F0E8]">Weekly Project Status Report</td>
                <td className="p-3 text-[#969B92]">Priya Nair (Sponsor) & BBMP Lead</td>
                <td className="p-3 text-[#79B8FF]">Weekly (Fridays) · Executive Email + PDF</td>
                <td className="p-3 text-[#C6FF54]">Rahul Sharma (PM)</td>
                <td className="p-3 text-[#969B92] text-[11px]">EVM progress, health, budget burn, active risks</td>
              </tr>
              <tr className="hover:bg-[#202420] transition-colors">
                <td className="p-3 font-semibold text-[#F1F0E8]">Bi-Weekly Stakeholder Steering</td>
                <td className="p-3 text-[#969B92]">BBMP, Community Reps, Sponsor</td>
                <td className="p-3 text-[#79B8FF]">Every 2 Weeks · Hybrid In-person</td>
                <td className="p-3 text-[#C6FF54]">Kavya Reddy (Liaison)</td>
                <td className="p-3 text-[#969B92] text-[11px]">Corridor progress sign-off & scope alignment</td>
              </tr>
              <tr className="hover:bg-[#202420] transition-colors">
                <td className="p-3 font-semibold text-[#F1F0E8]">Sprint Review & Demo</td>
                <td className="p-3 text-[#969B92]">All Team & Sponsor</td>
                <td className="p-3 text-[#79B8FF]">Bi-weekly (End of Sprint) · Demo Session</td>
                <td className="p-3 text-[#C6FF54]">Anjali Mehra (Tech Lead)</td>
                <td className="p-3 text-[#969B92] text-[11px]">Demonstrate working software increments</td>
              </tr>
              <tr className="hover:bg-[#202420] transition-colors">
                <td className="p-3 font-semibold text-[#F1F0E8]">Risk Escalation Memo</td>
                <td className="p-3 text-[#969B92]">Project Sponsor</td>
                <td className="p-3 text-[#FF5E5E]">Ad-hoc (Within 4h of Sev-1 trigger)</td>
                <td className="p-3 text-[#C6FF54]">Rahul Sharma (PM)</td>
                <td className="p-3 text-[#969B92] text-[11px]">Urgent resource or schedule intervention</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* TAB: REPORT TEMPLATES */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Template Selectors */}
          <div className="space-y-2 font-mono text-xs">
            {Object.keys(templates).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedTemplate(key)}
                className={`w-full p-3 border text-left transition-colors flex items-center justify-between ${
                  selectedTemplate === key
                    ? 'border-[#C6FF54] bg-[#C6FF54]/10 text-[#C6FF54]'
                    : 'border-[#2A2E2A] bg-[#181B18] text-[#969B92] hover:text-[#F1F0E8]'
                }`}
              >
                <span>{templates[key].title.split('(')[0]}</span>
                <Radio size={12} className="shrink-0" />
              </button>
            ))}
          </div>

          {/* Template Preview Card */}
          <div className="md:col-span-3 bg-[#181B18] border border-[#2A2E2A] p-5 space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-[#2A2E2A] pb-3">
              <h3 className="font-bold text-[#F1F0E8] text-sm">
                {templates[selectedTemplate].title}
              </h3>
              <Button
                variant="outline"
                size="xs"
                onClick={() => handleCopy(templates[selectedTemplate].content)}
              >
                <Copy size={11} />
                <span>COPY TEMPLATE</span>
              </Button>
            </div>

            <pre className="p-4 bg-[#101210] border border-[#2A2E2A] text-xs text-[#969B92] font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-[460px]">
              {templates[selectedTemplate].content}
            </pre>
          </div>
        </div>
      )}

      {/* TAB: DECISION LOG */}
      {activeTab === 'decisions' && (
        <div className="bg-[#181B18] border border-[#2A2E2A] p-5 space-y-4 font-mono text-xs">
          <div className="border-b border-[#2A2E2A] pb-3">
            <h3 className="font-bold text-[#F1F0E8] text-sm">
              PROJECT DECISION LOG (AUDIT TRAIL)
            </h3>
            <p className="text-[#969B92] text-xs mt-0.5">
              Binding technical, operational, and scope governance decisions.
            </p>
          </div>

          <div className="space-y-3">
            {decisionLog.map((d) => (
              <div key={d.id} className="p-3.5 bg-[#141714] border border-[#2A2E2A] space-y-2">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#C6FF54] font-bold">{d.id}</span>
                  <span className="text-[#969B92]">{d.date}</span>
                  <Badge variant="lime">{d.status}</Badge>
                </div>

                <div className="font-bold text-[#F1F0E8] text-sm font-sans">
                  {d.decision}
                </div>

                <div className="text-[11px] text-[#969B92] font-sans">
                  <strong className="text-[#79B8FF] font-mono">Rationale: </strong>
                  {d.rationale}
                </div>

                <div className="text-[10px] text-[#5F655B] pt-1 border-t border-[#2A2E2A]">
                  Decided By: {d.decidedBy}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
