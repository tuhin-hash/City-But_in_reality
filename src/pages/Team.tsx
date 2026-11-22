import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import {
  Users,
  UserCheck,
  Mail,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import type { TeamMember } from '../types';

export function Team() {
  const { addToast } = useToast();
  const { team, tasks, updateTask } = useProjectStore();

  const [activeTab, setActiveTab] = useState<'roster' | 'raci' | 'allocation'>('roster');
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Calculate workloads
  const memberWorkloads = team.map((member) => {
    const assignedTasks = tasks.filter((t) => t.assigneeId === member.id && t.status !== 'done');
    const assignedHours = assignedTasks.reduce(
      (sum, t) => sum + (t.estimatedHours || 16),
      0
    );
    // 40 hours per week * 4 active weeks = 160h standard capacity
    const availableHours = (member.availability / 100) * 160;
    const utilizationPct = Math.round((assignedHours / availableHours) * 100);

    return {
      ...member,
      assignedCount: assignedTasks.length,
      assignedHours,
      availableHours,
      utilizationPct,
      isOverAllocated: utilizationPct > 100,
    };
  });

  const chartData = memberWorkloads.map((m) => ({
    name: m.avatar,
    Allocated: m.assignedHours,
    Available: m.availableHours,
  }));

  // RACI Matrix definition across core Work Packages
  const raciData = [
    { wp: '01. Project Initiation & Charter', R: 'Rahul (PM)', A: 'Priya (Sponsor)', C: 'Anjali (Tech Lead)', I: 'All Team' },
    { wp: '02. User Research & Requirements', R: 'Arjun (UX)', A: 'Rahul (PM)', C: 'Deepa (Data)', I: 'BBMP Liaison' },
    { wp: '03. GIS & Sidewalk Data Collection', R: 'Vikram (GIS)', A: 'Anjali (Tech Lead)', C: 'Mohan (Field)', I: 'Rahul (PM)' },
    { wp: '04. Frontend & Route Intelligence', R: 'Siddharth (FE)', A: 'Anjali (Tech Lead)', C: 'Vikram (GIS)', I: 'QA Lead' },
    { wp: '05. Backend APIs & Architecture', R: 'Pooja (BE)', A: 'Anjali (Tech Lead)', C: 'Deepa (Data)', I: 'Frontend' },
    { wp: '06. QA Testing & Defect Triage', R: 'Sneha (QA)', A: 'Rahul (PM)', C: 'All Developers', I: 'Sponsor' },
    { wp: '07. Pilot Deployment & BBMP Demo', R: 'Rahul (PM)', A: 'Priya (Sponsor)', C: 'Kavya (Liaison)', I: 'BBMP Division' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-1.5 py-0.5 bg-[#C6FF54]/5">
              10-PERSON CROSS-FUNCTIONAL CREW
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              HUMAN RESOURCE & CAPACITY ALLOCATION
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            TEAM & RESOURCE MANAGEMENT
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Workload distribution, individual capacity ceilings, skill-set mapping,
            and RACI governance across engineering, GIS, design, and municipal operations.
          </p>
        </div>

        <div className="flex items-center border border-[#2A2E2A] bg-[#141714]">
          <button
            onClick={() => setActiveTab('roster')}
            className={`px-3 py-1.5 text-xs font-mono transition-colors ${
              activeTab === 'roster'
                ? 'bg-[#202420] text-[#C6FF54]'
                : 'text-[#969B92] hover:text-[#F1F0E8]'
            }`}
          >
            TEAM ROSTER
          </button>
          <button
            onClick={() => setActiveTab('allocation')}
            className={`px-3 py-1.5 text-xs font-mono transition-colors ${
              activeTab === 'allocation'
                ? 'bg-[#202420] text-[#C6FF54]'
                : 'text-[#969B92] hover:text-[#F1F0E8]'
            }`}
          >
            UTILIZATION CHART
          </button>
          <button
            onClick={() => setActiveTab('raci')}
            className={`px-3 py-1.5 text-xs font-mono transition-colors ${
              activeTab === 'raci'
                ? 'bg-[#202420] text-[#C6FF54]'
                : 'text-[#969B92] hover:text-[#F1F0E8]'
            }`}
          >
            RACI MATRIX
          </button>
        </div>
      </div>

      {/* OVER-ALLOCATION BANNER */}
      {memberWorkloads.some((m) => m.isOverAllocated) && (
        <div className="bg-[#FF5E5E]/10 border border-[#FF5E5E]/40 p-3 flex items-center justify-between text-xs font-mono text-[#FF5E5E]">
          <div className="flex items-center gap-2">
            <AlertTriangle size={15} />
            <span>
              WORKLOAD CONFLICT: 1 or more team members allocated beyond 100% capacity ceiling.
            </span>
          </div>
          <span className="text-[10px] underline cursor-pointer">Rebalance tasks</span>
        </div>
      )}

      {/* TAB: ROSTER GRID */}
      {activeTab === 'roster' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {memberWorkloads.map((m) => (
            <div
              key={m.id}
              className={`p-4 border bg-[#181B18] space-y-3 font-mono text-xs flex flex-col justify-between ${
                m.isOverAllocated
                  ? 'border-[#FF5E5E]/40'
                  : 'border-[#2A2E2A] hover:border-[#969B92]'
              } transition-colors`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-[#202420] border border-[#2A2E2A] flex items-center justify-center font-bold text-[#C6FF54]">
                      {m.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#F1F0E8]">{m.name}</div>
                      <div className="text-[10px] text-[#79B8FF]">{m.role}</div>
                    </div>
                  </div>
                  <Badge variant={m.availability < 100 ? 'orange' : 'lime'}>
                    {m.availability}% AVAIL
                  </Badge>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {m.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[9px] bg-[#141714] border border-[#2A2E2A] text-[#969B92] px-1.5 py-0.2"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Workload Progress Bar */}
              <div className="pt-3 border-t border-[#2A2E2A] space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#969B92]">
                    Assigned: {m.assignedCount} tasks ({m.assignedHours}h)
                  </span>
                  <span
                    className={
                      m.isOverAllocated
                        ? 'text-[#FF5E5E] font-bold'
                        : 'text-[#C6FF54] font-bold'
                    }
                  >
                    {m.utilizationPct}% Util
                  </span>
                </div>
                <div className="h-1.5 bg-[#202420] w-full">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${Math.min(100, m.utilizationPct)}%`,
                      backgroundColor: m.isOverAllocated ? '#FF5E5E' : '#C6FF54',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB: ALLOCATION CHART */}
      {activeTab === 'allocation' && (
        <div className="bg-[#181B18] border border-[#2A2E2A] p-5 space-y-4 font-mono">
          <div className="border-b border-[#2A2E2A] pb-3">
            <h3 className="font-bold text-[#F1F0E8] text-sm">
              HOURS ALLOCATED VS. CAPACITY CEILING (HOURS)
            </h3>
            <p className="text-[#969B92] text-xs mt-0.5">
              Based on 4-week active execution window. Red bars exceed standard 160h capacity.
            </p>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#5F655B" fontSize={11} tickLine={false} />
                <YAxis stroke="#5F655B" fontSize={10} tickLine={false} unit="h" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#181B18',
                    border: '1px solid #2A2E2A',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono',
                  }}
                />
                <Bar dataKey="Available" fill="#2A2E2A" />
                <Bar dataKey="Allocated" fill="#C6FF54" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* TAB: RACI MATRIX */}
      {activeTab === 'raci' && (
        <div className="bg-[#181B18] border border-[#2A2E2A] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#141714] border-b border-[#2A2E2A] text-[10px] text-[#969B92] uppercase">
              <tr>
                <th className="p-3">Deliverable / Work Package</th>
                <th className="p-3 text-[#C6FF54]">Responsible (R)</th>
                <th className="p-3 text-[#FF8B45]">Accountable (A)</th>
                <th className="p-3 text-[#79B8FF]">Consulted (C)</th>
                <th className="p-3 text-[#969B92]">Informed (I)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E2A]">
              {raciData.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#202420] transition-colors">
                  <td className="p-3 font-semibold text-[#F1F0E8]">{row.wp}</td>
                  <td className="p-3 text-[#C6FF54]">{row.R}</td>
                  <td className="p-3 text-[#FF8B45] font-bold">{row.A}</td>
                  <td className="p-3 text-[#79B8FF]">{row.C}</td>
                  <td className="p-3 text-[#969B92]">{row.I}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
