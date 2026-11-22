import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import {
  BarChart3,
  Download,
  Printer,
  FileText,
  Activity,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Wallet,
  Clock,
  Layers,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';
import {
  calculateProjectCompletion,
  calculateEVM,
  formatCurrency,
  projectHealthColor,
  projectHealthLabel,
} from '../utils/calculations';

export function Reports() {
  const { addToast } = useToast();
  const {
    tasks,
    risks,
    issues,
    budgetCategories,
    expenses,
    milestones,
    sprints,
  } = useProjectStore();

  const [selectedReportType, setSelectedReportType] = useState<string>('weekly-status');

  const completionPct = calculateProjectCompletion(tasks);
  const evm = calculateEVM(tasks, budgetCategories, expenses);
  const { bac, pv, ev, ac: totalActual, cpi, spi, eac, cv, sv, vac, etc } = evm;

  const blockedTasks = tasks.filter((t) => t.status === 'blocked');
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress');
  const completedTasks = tasks.filter((t) => t.status === 'done');
  const criticalRisks = risks.filter((r) => r.exposure >= 12);

  const handleExportJSON = () => {
    const reportData = {
      project: 'CITY, BUT IN REALITY',
      reportType: selectedReportType,
      generatedAt: new Date().toISOString(),
      metrics: {
        completionPct,
        cpi,
        spi,
        bac,
        ev,
        pv,
        ac: totalActual,
        eac,
      },
      counts: {
        totalTasks: tasks.length,
        completedTasks: completedTasks.length,
        blockedTasks: blockedTasks.length,
        openRisks: risks.length,
        openIssues: issues.length,
      },
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `project-report-${selectedReportType}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    addToast('Report data exported as JSON.', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-1.5 py-0.5 bg-[#C6FF54]/5">
              EXECUTIVE REPORTING ENGINE
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              AUTOMATED COMPREHENSIVE AUDIT SUMMARIES
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            REPORTS & ANALYTICS
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Live-calculated performance reporting. Exports real-time data across schedule,
            cost variances, risk posture, and sprint burndown metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleExportJSON}>
            <Download size={13} />
            <span>EXPORT JSON</span>
          </Button>
          <Button variant="lime" size="sm" onClick={handlePrint}>
            <Printer size={13} />
            <span>PRINT REPORT</span>
          </Button>
        </div>
      </div>

      {/* Report Type Selector Tabs */}
      <div className="flex flex-wrap gap-2 font-mono text-xs border-b border-[#2A2E2A] pb-3">
        {[
          { id: 'weekly-status', label: 'WEEKLY STATUS REPORT' },
          { id: 'evm-financial', label: 'EVM FINANCIAL SUMMARY' },
          { id: 'risk-audit', label: 'RISK & RAID AUDIT' },
          { id: 'milestone-status', label: 'STAGE-GATE MILESTONE REPORT' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedReportType(tab.id)}
            className={`px-3 py-1.5 border transition-colors ${
              selectedReportType === tab.id
                ? 'border-[#C6FF54] bg-[#C6FF54]/10 text-[#C6FF54]'
                : 'border-[#2A2E2A] bg-[#141714] text-[#969B92] hover:text-[#F1F0E8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* REPORT CONTENT CANVAS (PRINTABLE) */}
      <div className="bg-[#181B18] border border-[#2A2E2A] p-6 space-y-6 font-mono text-xs">
        {/* Document Header */}
        <div className="border-b border-[#2A2E2A] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-[#C6FF54] uppercase tracking-widest">
              OFFICIAL PROJECT MANAGEMENT REPORT
            </div>
            <div className="text-lg font-bold text-[#F1F0E8] mt-0.5">
              CITY, BUT IN REALITY · PILOT EXECUTIVE DASHBOARD
            </div>
            <div className="text-[11px] text-[#969B92]">
              As of: November 22, 2026 · Week 8 of 12 · Prepared by Rahul Sharma (PM Lead)
            </div>
          </div>
          <Badge variant="lime">EXECUTIVE AUDIT COPY</Badge>
        </div>

        {/* 1. Executive Summary */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#C6FF54] uppercase tracking-wider">
            01. EXECUTIVE SUMMARY & HEALTH AT A GLANCE
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-[#141714] border border-[#2A2E2A]">
              <span className="text-[10px] text-[#969B92]">SCHEDULE COMPLETION</span>
              <div className="text-base font-bold text-[#F1F0E8] mt-0.5">{completionPct}%</div>
            </div>
            <div className="p-3 bg-[#141714] border border-[#2A2E2A]">
              <span className="text-[10px] text-[#969B92]">COST PERFORMANCE (CPI)</span>
              <div className="text-base font-bold text-[#C6FF54] mt-0.5">{cpi}</div>
            </div>
            <div className="p-3 bg-[#141714] border border-[#2A2E2A]">
              <span className="text-[10px] text-[#969B92]">SCHEDULE INDEX (SPI)</span>
              <div className="text-base font-bold text-[#FF8B45] mt-0.5">{spi}</div>
            </div>
            <div className="p-3 bg-[#141714] border border-[#2A2E2A]">
              <span className="text-[10px] text-[#969B92]">ESTIMATE AT COMPLETION</span>
              <div className="text-base font-bold text-[#79B8FF] mt-0.5">{formatCurrency(eac)}</div>
            </div>
          </div>
        </div>

        {/* 2. Key Accomplishments This Period */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#C6FF54] uppercase tracking-wider">
            02. WORK ACTIVITIES COMPLETED (RECENT WEEKS)
          </div>
          <div className="space-y-1.5">
            {completedTasks.slice(0, 5).map((t) => (
              <div
                key={t.id}
                className="p-2.5 bg-[#141714] border border-[#2A2E2A] flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#C6FF54] font-bold">{t.wbsCode}</span>
                  <span className="text-[#F1F0E8]">{t.title}</span>
                </div>
                <span className="text-[#969B92] text-[10px]">
                  Effort: {t.actualHours || t.estimatedHours}h
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Blocked Work & Realized Issues */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#FF5E5E] uppercase tracking-wider">
            03. CRITICAL DELIVERY BLOCKERS REQUIRING ATTENTION
          </div>
          <div className="space-y-1.5">
            {blockedTasks.map((t) => (
              <div
                key={t.id}
                className="p-2.5 bg-[#FF5E5E]/5 border border-[#FF5E5E]/40 flex items-center justify-between text-[#FF5E5E]"
              >
                <div>
                  <span className="font-bold mr-2">{t.wbsCode}</span>
                  <span>{t.title}</span>
                </div>
                <span className="font-bold">CRITICAL BLOCKER</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Budget Position Table */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-[#79B8FF] uppercase tracking-wider">
            04. FINANCIAL VARIANCE AUDIT
          </div>
          <div className="border border-[#2A2E2A] overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#141714] border-b border-[#2A2E2A] text-[10px] text-[#969B92]">
                <tr>
                  <th className="p-2">Category</th>
                  <th className="p-2 text-right">Planned (BAC)</th>
                  <th className="p-2 text-right">Actual Burn</th>
                  <th className="p-2 text-right">Forecast (EAC)</th>
                  <th className="p-2 text-right">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2E2A]">
                {budgetCategories.map((b) => (
                  <tr key={b.id}>
                    <td className="p-2 text-[#F1F0E8]">{b.name}</td>
                    <td className="p-2 text-right text-[#969B92]">{formatCurrency(b.planned)}</td>
                    <td className="p-2 text-right text-[#C6FF54]">{formatCurrency(b.actual)}</td>
                    <td className="p-2 text-right text-[#79B8FF]">{formatCurrency(b.forecast)}</td>
                    <td className="p-2 text-right font-bold text-[#F1F0E8]">
                      {formatCurrency(b.planned - b.forecast)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formal Signatures Footer */}
        <div className="pt-4 border-t border-[#2A2E2A] grid grid-cols-2 gap-4 text-[10px] text-[#969B92]">
          <div>
            <span>PROJECT MANAGER: </span>
            <span className="text-[#F1F0E8] font-bold">Rahul Sharma, PMP</span>
          </div>
          <div className="text-right">
            <span>DISTRIBUTED TO: </span>
            <span className="text-[#F1F0E8] font-bold">Priya Nair (Sponsor), BBMP Lead</span>
          </div>
        </div>
      </div>
    </div>
  );
}
