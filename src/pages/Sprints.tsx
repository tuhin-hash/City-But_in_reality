import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import {
  Repeat,
  Flame,
  TrendingUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  MessageSquare,
  Users,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import type { Task, TaskStatus } from '../types';

export function Sprints() {
  const { addToast } = useToast();
  const { sprints, tasks, updateSprint, updateTask } = useProjectStore();

  const [activeSprintId, setActiveSprintId] = useState<string>('sprint-02'); // Sprint 2 active
  const selectedSprint = sprints.find((s) => s.id === activeSprintId) || sprints[1];

  const sprintTasks = tasks.filter((t) => selectedSprint.taskIds.includes(t.id));
  const completedPoints = sprintTasks
    .filter((t) => t.status === 'done')
    .reduce((sum, t) => sum + (t.storyPoints || 5), 0);
  const totalPoints = selectedSprint.totalPoints;
  const progressPct = totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0;

  // Burndown chart data for Sprint 2 (14 days)
  const burndownData = [
    { day: 'D01', ideal: 55, actual: 55 },
    { day: 'D03', ideal: 47, actual: 50 },
    { day: 'D05', ideal: 39, actual: 44 },
    { day: 'D07', ideal: 31, actual: 38 },
    { day: 'D09', ideal: 23, actual: 33 },
    { day: 'D11', ideal: 15, actual: 25 },
    { day: 'D13', ideal: 7, actual: 22 },
    { day: 'D14', ideal: 0, actual: null },
  ];

  // Velocity comparison chart data
  const velocityData = [
    { sprint: 'Sprint 1', committed: 42, delivered: 42 },
    { sprint: 'Sprint 2 (Cur)', committed: 55, delivered: 22 },
    { sprint: 'Sprint 3 (Est)', committed: 48, delivered: null },
    { sprint: 'Sprint 4 (Est)', committed: 50, delivered: null },
  ];

  const handleStatusChange = (task: Task, newStatus: TaskStatus) => {
    updateTask(task.id, { status: newStatus });
    addToast(`Updated task ${task.wbsCode} status to ${newStatus.toUpperCase()}`, 'info');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Governance */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-1.5 py-0.5 bg-[#C6FF54]/5">
              2-WEEK SPRINT CADENCE
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              HYBRID AGILE EXECUTION FRAMEWORK
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            SPRINT MANAGEMENT
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Bi-weekly iterative delivery cycles tracking velocity, story point burn-down,
            backlog execution, and team retrospectives within the stage-gate envelope.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="lime" dot>
            ACTIVE: SPRINT 02 (DAY 10/14)
          </Badge>
        </div>
      </div>

      {/* Sprints Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono">
        {sprints.map((sp) => {
          const isSelected = sp.id === activeSprintId;
          const isDone = sp.status === 'completed';
          const isActive = sp.status === 'active';

          return (
            <div
              key={sp.id}
              onClick={() => setActiveSprintId(sp.id)}
              className={`p-3 border cursor-pointer transition-all ${
                isSelected
                  ? 'border-[#C6FF54] bg-[#C6FF54]/10'
                  : isDone
                  ? 'border-[#C6FF54]/30 bg-[#181B18]'
                  : isActive
                  ? 'border-[#79B8FF] bg-[#181B18]'
                  : 'border-[#2A2E2A] bg-[#141714]'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className="font-bold text-[#F1F0E8]">{sp.name.split('—')[0]}</span>
                <span
                  className={
                    isDone
                      ? 'text-[#C6FF54]'
                      : isActive
                      ? 'text-[#79B8FF]'
                      : 'text-[#5F655B]'
                  }
                >
                  {sp.status.toUpperCase()}
                </span>
              </div>
              <div className="text-xs font-bold text-[#F1F0E8] truncate">
                {sp.name.split('—')[1] || sp.name}
              </div>
              <div className="text-[10px] text-[#969B92] mt-1">
                {sp.completedPoints}/{sp.totalPoints} Story Points
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Sprint Overview Banner */}
      <div className="bg-[#181B18] border border-[#2A2E2A] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#2A2E2A] pb-3">
          <div>
            <div className="font-mono text-xs text-[#C6FF54] font-bold">
              {selectedSprint.name.toUpperCase()}
            </div>
            <div className="text-sm font-semibold text-[#F1F0E8] mt-0.5">
              Goal: {selectedSprint.goal}
            </div>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[#969B92]">
              {selectedSprint.startDate} to {selectedSprint.endDate}
            </span>
            <Badge variant="blue">{selectedSprint.status}</Badge>
          </div>
        </div>

        {/* Sprint KPIs Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
          <div className="p-3 bg-[#141714] border border-[#2A2E2A]">
            <div className="text-[10px] text-[#969B92]">COMMITTED POINTS</div>
            <div className="text-lg font-bold text-[#F1F0E8] mt-0.5">
              {selectedSprint.totalPoints} pts
            </div>
          </div>

          <div className="p-3 bg-[#141714] border border-[#2A2E2A]">
            <div className="text-[10px] text-[#969B92]">DELIVERED TO DATE</div>
            <div className="text-lg font-bold text-[#C6FF54] mt-0.5">
              {completedPoints} pts ({progressPct}%)
            </div>
          </div>

          <div className="p-3 bg-[#141714] border border-[#2A2E2A]">
            <div className="text-[10px] text-[#969B92]">REMAINING BURNDOWN</div>
            <div className="text-lg font-bold text-[#FF8B45] mt-0.5">
              {totalPoints - completedPoints} pts
            </div>
          </div>

          <div className="p-3 bg-[#141714] border border-[#2A2E2A]">
            <div className="text-[10px] text-[#969B92]">SP Velocity Average</div>
            <div className="text-lg font-bold text-[#79B8FF] mt-0.5">
              42 pts / sprint
            </div>
          </div>
        </div>
      </div>

      {/* Sprint Charts: Burndown & Velocity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Burndown Chart */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-mono text-[10px] text-[#969B92] uppercase">
                BURNDOWN TRAJECTORY
              </div>
              <h3 className="text-sm font-semibold text-[#F1F0E8]">
                Sprint 2 Daily Story Point Burndown
              </h3>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px]">
              <span className="flex items-center gap-1 text-[#969B92]">
                <span className="w-2 h-0.5 bg-[#969B92]" /> Ideal
              </span>
              <span className="flex items-center gap-1 text-[#FF8B45]">
                <span className="w-2 h-1 bg-[#FF8B45]" /> Actual
              </span>
            </div>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={burndownData}>
                <XAxis dataKey="day" stroke="#5F655B" fontSize={10} tickLine={false} />
                <YAxis stroke="#5F655B" fontSize={10} tickLine={false} unit="p" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#181B18',
                    border: '1px solid #2A2E2A',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="ideal"
                  stroke="#5F655B"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#FF8B45"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#FF8B45' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Velocity Chart */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-mono text-[10px] text-[#969B92] uppercase">
                HISTORICAL CAPACITY
              </div>
              <h3 className="text-sm font-semibold text-[#F1F0E8]">
                Sprint Velocity: Committed vs. Delivered
              </h3>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px]">
              <span className="flex items-center gap-1 text-[#5F655B]">
                <span className="w-2 h-2 bg-[#2A2E2A]" /> Committed
              </span>
              <span className="flex items-center gap-1 text-[#C6FF54]">
                <span className="w-2 h-2 bg-[#C6FF54]" /> Delivered
              </span>
            </div>
          </div>

          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={velocityData}>
                <XAxis dataKey="sprint" stroke="#5F655B" fontSize={10} tickLine={false} />
                <YAxis stroke="#5F655B" fontSize={10} tickLine={false} unit="p" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#181B18',
                    border: '1px solid #2A2E2A',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono',
                  }}
                />
                <Bar dataKey="committed" fill="#2A2E2A" />
                <Bar dataKey="delivered" fill="#C6FF54" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SPRINT BACKLOG CARDS */}
      <div className="bg-[#181B18] border border-[#2A2E2A] p-4 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#2A2E2A] pb-2">
          <h3 className="font-bold text-[#F1F0E8] text-sm">
            ASSIGNED SPRINT BACKLOG ({sprintTasks.length} ACTIVITIES)
          </h3>
          <span className="text-[10px] text-[#969B92]">
            Story Points sum: {totalPoints}
          </span>
        </div>

        <div className="space-y-2">
          {sprintTasks.map((t) => {
            const isDone = t.status === 'done';
            const isBlocked = t.status === 'blocked';

            return (
              <div
                key={t.id}
                className={`p-3 border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                  isBlocked
                    ? 'border-[#FF5E5E]/40 bg-[#FF5E5E]/5'
                    : isDone
                    ? 'border-[#C6FF54]/20 bg-[#C6FF54]/5'
                    : 'border-[#2A2E2A] bg-[#141714]'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1 text-[10px]">
                    <span className="text-[#C6FF54] font-bold">{t.wbsCode}</span>
                    <span className="text-[#969B92]">
                      ({t.storyPoints || 5} Story Points)
                    </span>
                    {isBlocked && (
                      <span className="text-[#FF5E5E] font-bold bg-[#FF5E5E]/20 px-1">
                        BLOCKED ON SCHEMA SIGN-OFF
                      </span>
                    )}
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      isDone ? 'line-through text-[#969B92]' : 'text-[#F1F0E8]'
                    }`}
                  >
                    {t.title}
                  </div>
                  {t.deliverable && (
                    <div className="text-[10px] text-[#79B8FF] mt-0.5">
                      ↳ Deliverable: {t.deliverable}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <Badge
                    variant={
                      t.status === 'done'
                        ? 'lime'
                        : t.status === 'in-progress'
                        ? 'blue'
                        : t.status === 'blocked'
                        ? 'coral'
                        : 'default'
                    }
                  >
                    {t.status}
                  </Badge>

                  {/* Status Toggle Quick Buttons */}
                  <div className="flex items-center gap-1 text-[9px]">
                    {t.status !== 'in-progress' && (
                      <button
                        onClick={() => handleStatusChange(t, 'in-progress')}
                        className="px-1.5 py-0.5 border border-[#2A2E2A] hover:border-[#79B8FF] text-[#969B92] hover:text-[#79B8FF]"
                      >
                        In Prog
                      </button>
                    )}
                    {t.status !== 'done' && (
                      <button
                        onClick={() => handleStatusChange(t, 'done')}
                        className="px-1.5 py-0.5 border border-[#2A2E2A] hover:border-[#C6FF54] text-[#969B92] hover:text-[#C6FF54]"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Retrospective Section */}
      {selectedSprint.retrospective && (
        <div className="bg-[#181B18] border border-[#2A2E2A] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#2A2E2A] pb-3">
            <div>
              <div className="font-mono text-xs text-[#C6FF54] font-bold">
                CONTINUOUS IMPROVEMENT RETROSPECTIVE
              </div>
              <h3 className="text-sm font-semibold text-[#F1F0E8]">
                {selectedSprint.name} Retrospective Findings
              </h3>
            </div>
            <Badge variant="lime">AUDITED & ARCHIVED</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="p-3 bg-[#141714] border border-[#C6FF54]/20">
              <span className="text-[10px] text-[#C6FF54] font-bold block mb-2">
                WHAT WENT WELL
              </span>
              <ul className="space-y-1 text-[#F1F0E8] text-[11px] list-disc pl-4">
                {selectedSprint.retrospective.wentWell.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-[#141714] border border-[#FF8B45]/20">
              <span className="text-[10px] text-[#FF8B45] font-bold block mb-2">
                IMPROVEMENTS IDENTIFIED
              </span>
              <ul className="space-y-1 text-[#F1F0E8] text-[11px] list-disc pl-4">
                {selectedSprint.retrospective.improvements.map((imp, i) => (
                  <li key={i}>{imp}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-[#141714] border border-[#79B8FF]/20">
              <span className="text-[10px] text-[#79B8FF] font-bold block mb-2">
                ACTION ITEMS FOR NEXT SPRINT
              </span>
              <ul className="space-y-1 text-[#F1F0E8] text-[11px] list-disc pl-4">
                {selectedSprint.retrospective.actionItems.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
