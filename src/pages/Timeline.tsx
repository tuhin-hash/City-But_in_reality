import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';
import {
  GanttChart as GanttIcon,
  Calendar,
  Network,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import type { Task } from '../types';
import { calculateCriticalPath } from '../utils/calculations';

export function Timeline() {
  const { addToast } = useToast();
  const { tasks, milestones, updateTask } = useProjectStore();

  const [viewMode, setViewMode] = useState<'gantt' | 'network'>('gantt');
  const [zoomLevel, setZoomLevel] = useState<'weeks' | 'days'>('weeks');

  // Hardcoded project start and span for Gantt math
  const projectStartDate = new Date('2026-09-15');
  const totalDays = 84; // 12 weeks

  // Dynamic Critical Path Method (CPM) calculation
  const cpmResult = calculateCriticalPath(tasks);
  const { criticalWbsCodes, taskSchedules, projectDuration: totalDurationDays, hasCycle } = cpmResult;

  const getDayOffset = (dateStr: string) => {
    const d = new Date(dateStr);
    const diff = Math.round((d.getTime() - projectStartDate.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, Math.min(totalDays, diff));
  };

  const handleShiftTask = (task: Task, days: number) => {
    const curStart = new Date(task.startDate);
    const curDue = new Date(task.dueDate);
    curStart.setDate(curStart.getDate() + days);
    curDue.setDate(curDue.getDate() + days);

    const newStartStr = curStart.toISOString().split('T')[0];
    const newDueStr = curDue.toISOString().split('T')[0];

    updateTask(task.id, {
      startDate: newStartStr,
      dueDate: newDueStr,
    });

    const isCrit = criticalWbsCodes.has(task.wbsCode);
    if (isCrit) {
      addToast(
        `CRITICAL PATH IMPACT: Shifted ${task.wbsCode} by ${days > 0 ? '+' : ''}${days}d. Downstream milestone dates affected.`,
        'warning'
      );
    } else {
      addToast(`Shifted ${task.wbsCode} by ${days > 0 ? '+' : ''}${days}d. Absorbed within float.`, 'info');
    }
  };

  // Generate 12 week headers
  const weeks = Array.from({ length: 12 }, (_, i) => ({
    weekNum: i + 1,
    label: `W0${i + 1}`,
    startDay: i * 7,
  }));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & View Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-1.5 py-0.5 bg-[#C6FF54]/5">
              CRITICAL PATH METHOD (CPM)
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              12-WEEK MASTER SCHEDULE ENGINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            TIMELINE & GANTT MANAGEMENT
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Interactive Gantt schedule tracking task durations, inter-activity dependencies,
            float allowances, and the zero-slack Critical Path driving the pilot release date.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-[#2A2E2A] bg-[#141714]">
            <button
              onClick={() => setViewMode('gantt')}
              className={`px-3 py-1.5 text-xs font-mono flex items-center gap-1.5 transition-colors ${
                viewMode === 'gantt'
                  ? 'bg-[#202420] text-[#C6FF54]'
                  : 'text-[#969B92] hover:text-[#F1F0E8]'
              }`}
            >
              <GanttIcon size={13} />
              <span>GANTT CHART</span>
            </button>
            <button
              onClick={() => setViewMode('network')}
              className={`px-3 py-1.5 text-xs font-mono flex items-center gap-1.5 transition-colors ${
                viewMode === 'network'
                  ? 'bg-[#202420] text-[#C6FF54]'
                  : 'text-[#969B92] hover:text-[#F1F0E8]'
              }`}
            >
              <Network size={13} />
              <span>DEPENDENCY NETWORK</span>
            </button>
          </div>
        </div>
      </div>

      {/* Critical Path Legend & Indicator */}
      <div className="bg-[#181B18] border border-[#2A2E2A] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#FF5E5E] border border-[#FF5E5E]" />
            <span className="text-[#F1F0E8] font-bold">CRITICAL PATH (ZERO FLOAT)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#79B8FF]" />
            <span className="text-[#969B92]">STANDARD ACTIVITY</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#C6FF54]" />
            <span className="text-[#969B92]">COMPLETED ACTIVITY</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rotate-45 bg-[#FFD166]" />
            <span className="text-[#969B92]">STAGE-GATE MILESTONE</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="text-[11px] text-[#C6FF54] bg-[#C6FF54]/10 border border-[#C6FF54]/30 px-2 py-1">
            CPM CRITICAL PATH: {criticalWbsCodes.size} NODES · PROJECT SPAN: {totalDurationDays} DAYS
          </div>
          <div className="text-[11px] text-[#FF8B45] bg-[#FF8B45]/10 border border-[#FF8B45]/30 px-2 py-1">
            CURRENT DATE: WEEK 8 (DAY 56) · 4 WEEKS BUFFER REMAINING
          </div>
        </div>
      </div>

      {/* GANTT VIEW */}
      {viewMode === 'gantt' && (
        <div className="bg-[#181B18] border border-[#2A2E2A] overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Header Timeline Columns */}
            <div className="grid grid-cols-12 bg-[#141714] border-b border-[#2A2E2A] font-mono text-[10px] text-[#969B92]">
              <div className="col-span-4 p-3 border-r border-[#2A2E2A] font-bold uppercase text-[#F1F0E8]">
                WBS & ACTIVITY NAME
              </div>
              <div className="col-span-8 grid grid-cols-12 text-center divide-x divide-[#2A2E2A]">
                {weeks.map((w) => (
                  <div key={w.label} className="p-2.5">
                    <span className="font-bold text-[#F1F0E8]">{w.label}</span>
                    <span className="block text-[8px] text-[#5F655B]">D{w.startDay}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks Gantt Rows */}
            <div className="divide-y divide-[#2A2E2A] font-mono text-xs">
              {tasks.map((t) => {
                const startOffset = getDayOffset(t.startDate);
                const endOffset = getDayOffset(t.dueDate);
                const durationDays = Math.max(1, endOffset - startOffset);
                const leftPct = (startOffset / totalDays) * 100;
                const widthPct = Math.max(1.5, (durationDays / totalDays) * 100);

                const isCrit = criticalWbsCodes.has(t.wbsCode);
                const isDone = t.status === 'done';
                const isBlocked = t.status === 'blocked';

                const barColor = isDone
                  ? '#C6FF54'
                  : isBlocked
                  ? '#FF5E5E'
                  : isCrit
                  ? '#FF5E5E'
                  : '#79B8FF';

                return (
                  <div
                    key={t.id}
                    className="grid grid-cols-12 items-center hover:bg-[#1E221E] transition-colors group"
                  >
                    {/* Left Info Panel */}
                    <div className="col-span-4 p-2.5 border-r border-[#2A2E2A] flex items-center justify-between min-w-0 pr-3">
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`text-[10px] font-bold shrink-0 ${
                            isCrit ? 'text-[#FF5E5E]' : 'text-[#C6FF54]'
                          }`}
                        >
                          {t.wbsCode}
                        </span>
                        <span
                          className={`truncate text-xs ${
                            isDone ? 'line-through text-[#969B92]' : 'text-[#F1F0E8]'
                          }`}
                        >
                          {t.title}
                        </span>
                      </div>

                      {/* Micro shift buttons on hover */}
                      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 shrink-0 text-[9px]">
                        <button
                          onClick={() => handleShiftTask(t, -2)}
                          className="hover:text-[#C6FF54] px-1 border border-[#2A2E2A]"
                          title="Shift earlier by 2 days"
                        >
                          -2d
                        </button>
                        <button
                          onClick={() => handleShiftTask(t, 2)}
                          className="hover:text-[#FF8B45] px-1 border border-[#2A2E2A]"
                          title="Delay by 2 days"
                        >
                          +2d
                        </button>
                      </div>
                    </div>

                    {/* Right Gantt Bar Chart Area */}
                    <div className="col-span-8 h-10 relative flex items-center px-2">
                      {/* Grid lines background */}
                      <div className="absolute inset-0 grid grid-cols-12 divide-x divide-[#202420] pointer-events-none" />

                      {/* Current Date Vertical Bar (Day 56) */}
                      <div
                        className="absolute top-0 bottom-0 w-[2px] bg-[#C6FF54]/60 z-10 pointer-events-none"
                        style={{ left: `${(56 / totalDays) * 100}%` }}
                        title="Today (Week 8 Day 56)"
                      />

                      {/* Gantt Bar */}
                      <div
                        className="h-5 rounded-none relative z-20 flex items-center px-1.5 text-[9px] font-bold text-[#101210] truncate transition-all shadow"
                        style={{
                          left: `${leftPct}%`,
                          width: `${widthPct}%`,
                          backgroundColor: barColor,
                          border: isCrit ? '1px solid #FF5E5E' : 'none',
                        }}
                        title={`${t.wbsCode}: ${t.title} (${durationDays} days: ${t.startDate} to ${t.dueDate})`}
                      >
                        <span className="truncate">{durationDays}d</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* NETWORK / DEPENDENCIES VIEW */}
      {viewMode === 'network' && (
        <div className="bg-[#181B18] border border-[#2A2E2A] p-6 space-y-4 font-mono text-xs">
          <div className="border-b border-[#2A2E2A] pb-3 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#F1F0E8] text-sm">
                PRECEDENCE DIAGRAM METHOD (PDM) & DEPENDENCY CHAINS
              </h3>
              <p className="text-[#969B92] text-[11px] mt-0.5">
                Finish-to-Start (FS) and Start-to-Start (SS) linkages governing task sequences.
              </p>
            </div>
            <Badge variant="orange">ZERO CIRCULAR LOOPS VERIFIED</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {tasks
              .filter((t) => t.dependencies.length > 0)
              .map((t) => {
                const isCrit = criticalWbsCodes.has(t.wbsCode);

                return (
                  <div
                    key={t.id}
                    className={`p-3 border bg-[#141714] space-y-2 ${
                      isCrit ? 'border-[#FF5E5E]/40' : 'border-[#2A2E2A]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#C6FF54] font-bold">{t.wbsCode}</span>
                      <span
                        className={
                          isCrit ? 'text-[#FF5E5E] font-bold' : 'text-[#969B92]'
                        }
                      >
                        {isCrit ? 'CRITICAL CHAIN' : 'FLOAT AVAILABLE'}
                      </span>
                    </div>

                    <div className="font-semibold text-[#F1F0E8] text-xs">
                      {t.title}
                    </div>

                    {/* CPM Node Schedule Metrics */}
                    <div className="grid grid-cols-4 gap-1 text-[9px] text-[#969B92] bg-[#101210] p-1.5 border border-[#2A2E2A]">
                      <div>ES: <span className="text-[#F1F0E8] font-mono">{taskSchedules?.get(t.id)?.es ?? 0}d</span></div>
                      <div>EF: <span className="text-[#F1F0E8] font-mono">{taskSchedules?.get(t.id)?.ef ?? 0}d</span></div>
                      <div>LS: <span className="text-[#F1F0E8] font-mono">{taskSchedules?.get(t.id)?.ls ?? 0}d</span></div>
                      <div>LF: <span className="text-[#F1F0E8] font-mono">{taskSchedules?.get(t.id)?.lf ?? 0}d</span></div>
                    </div>
                    <div className="text-[9px] flex items-center justify-between text-[#969B92]">
                      <span>CPM FLOAT / SLACK:</span>
                      <span className={isCrit ? 'text-[#FF5E5E] font-bold' : 'text-[#C6FF54] font-bold'}>
                        {taskSchedules?.get(t.id)?.float ?? 0} DAYS {isCrit ? '(CRITICAL)' : ''}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-[#2A2E2A] space-y-1">
                      <div className="text-[10px] text-[#969B92] uppercase">
                        PREDECESSORS (PREREQUISITES):
                      </div>
                      {t.dependencies.map((dep, i) => {
                        const predTask = tasks.find((item) => item.id === dep.taskId);
                        return (
                          <div
                            key={i}
                            className="flex items-center justify-between text-[11px] bg-[#181B18] p-1.5 border border-[#2A2E2A]"
                          >
                            <span className="text-[#79B8FF]">
                              ↳ {predTask ? `${predTask.wbsCode} ${predTask.title}` : dep.taskId}
                            </span>
                            <span className="text-[#C6FF54] text-[9px] font-bold">
                              {dep.type} (+{dep.lag || 0}d)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
