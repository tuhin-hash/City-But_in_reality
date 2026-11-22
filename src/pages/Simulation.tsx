import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import {
  Sparkles,
  CloudRain,
  DollarSign,
  UserX,
  Layers,
  AlertTriangle,
  Clock,
  RotateCcw,
  CheckCircle2,
  Award,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import type { SimulationScenario, SimulationOption } from '../types';

export function Simulation() {
  const { addToast } = useToast();
  const {
    simulationScenarios,
    completeScenario,
    resetSimulation,
    simulationScore,
    simulationScheduleImpact,
    simulationBudgetImpact,
  } = useProjectStore();

  const [activeScenarioId, setActiveScenarioId] = useState<string>(
    simulationScenarios[0]?.id || 'sim-001'
  );
  const selectedScenario =
    simulationScenarios.find((s) => s.id === activeScenarioId) ||
    simulationScenarios[0];

  const completedCount = simulationScenarios.filter((s) => s.isCompleted).length;
  const maxPossibleScore = simulationScenarios.length * 100;
  const averageScore = completedCount > 0 ? Math.round(simulationScore / completedCount) : 0;

  const handleSelectOption = (option: SimulationOption) => {
    completeScenario(selectedScenario.id, option.id);
    addToast(
      `Decision recorded: ${option.label}. PM Score: +${option.score} pts.`,
      option.score >= 80 ? 'success' : option.score >= 50 ? 'info' : 'warning'
    );
  };

  const handleReset = () => {
    if (window.confirm('Reset all delivery simulation scenarios and decision scores?')) {
      resetSimulation();
      addToast('Delivery simulation reset to initial state.', 'info');
    }
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: 'EXEMPLARY PM DECISION', color: '#C6FF54' };
    if (score >= 75) return { label: 'SOUND PM DECISION', color: '#79B8FF' };
    if (score >= 50) return { label: 'ACCEPTABLE TRADE-OFF', color: '#FF8B45' };
    return { label: 'POOR / GOVERNANCE FAILURE', color: '#FF5E5E' };
  };

  const scenarioIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    'sim-001': CloudRain,
    'sim-002': DollarSign,
    'sim-003': UserX,
    'sim-004': Layers,
    'sim-005': AlertTriangle,
    'sim-006': Clock,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & PM Assessment Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-1.5 py-0.5 bg-[#C6FF54]/5 flex items-center gap-1">
              <Sparkles size={11} />
              <span>SIGNATURE PORTFOLIO FEATURE</span>
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              INTERACTIVE PROJECT MANAGEMENT SCENARIO ENGINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            PROJECT DELIVERY SIMULATION
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Put yourself in the shoes of the Lead Project Manager. Face realistic unforeseen delivery
            impediments, evaluate competing trade-offs, and receive scored PM competency evaluations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" onClick={handleReset}>
            <RotateCcw size={12} />
            <span>RESET SIMULATION</span>
          </Button>
        </div>
      </div>

      {/* PM Decision Quality Scorecard Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono">
        {/* Scenarios Completed */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-4">
          <div className="text-[10px] text-[#969B92] uppercase">
            SCENARIOS RESOLVED
          </div>
          <div className="text-2xl font-bold text-[#F1F0E8] mt-1">
            {completedCount} / {simulationScenarios.length}
          </div>
          <div className="text-[10px] text-[#5F655B] mt-1">
            {simulationScenarios.length - completedCount} scenarios pending
          </div>
        </div>

        {/* PM Competency Score */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-4">
          <div className="text-[10px] text-[#969B92] uppercase flex items-center gap-1">
            <Award size={12} className="text-[#C6FF54]" />
            <span>PM DECISION SCORE</span>
          </div>
          <div className="text-2xl font-bold text-[#C6FF54] mt-1">
            {simulationScore} <span className="text-xs text-[#5F655B]">pts</span>
          </div>
          <div className="text-[10px] text-[#C6FF54] mt-1">
            Avg: {averageScore}/100 quality rating
          </div>
        </div>

        {/* Schedule Impact */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-4">
          <div className="text-[10px] text-[#969B92] uppercase">
            NET SCHEDULE DELTA
          </div>
          <div
            className={`text-2xl font-bold mt-1 ${
              simulationScheduleImpact > 5
                ? 'text-[#FF5E5E]'
                : simulationScheduleImpact > 0
                ? 'text-[#FF8B45]'
                : 'text-[#C6FF54]'
            }`}
          >
            {simulationScheduleImpact > 0 ? `+${simulationScheduleImpact}d` : `${simulationScheduleImpact}d`}
          </div>
          <div className="text-[10px] text-[#5F655B] mt-1">
            Cumulative timeline impact
          </div>
        </div>

        {/* Budget Impact */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-4">
          <div className="text-[10px] text-[#969B92] uppercase">
            NET BUDGET DELTA
          </div>
          <div
            className={`text-2xl font-bold mt-1 ${
              simulationBudgetImpact > 0
                ? 'text-[#FF5E5E]'
                : simulationBudgetImpact < 0
                ? 'text-[#FF8B45]'
                : 'text-[#C6FF54]'
            }`}
          >
            {simulationBudgetImpact !== 0
              ? `₹${Math.abs(simulationBudgetImpact).toLocaleString()}`
              : '₹0'}
          </div>
          <div className="text-[10px] text-[#5F655B] mt-1">
            {simulationBudgetImpact < 0 ? 'Contingency drawn' : 'Zero variance'}
          </div>
        </div>
      </div>

      {/* Scenarios Carousel Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 font-mono">
        {simulationScenarios.map((sc, idx) => {
          const Icon = scenarioIcons[sc.id] || Sparkles;
          const isSelected = sc.id === activeScenarioId;

          return (
            <div
              key={sc.id}
              onClick={() => setActiveScenarioId(sc.id)}
              className={`p-3 border cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#C6FF54] bg-[#C6FF54]/10'
                  : sc.isCompleted
                  ? 'border-[#C6FF54]/30 bg-[#181B18]'
                  : 'border-[#2A2E2A] bg-[#141714] hover:border-[#5F655B]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="text-[#969B92]">SCENARIO 0{idx + 1}</span>
                  {sc.isCompleted ? (
                    <CheckCircle2 size={12} className="text-[#C6FF54]" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF8B45]" />
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#F1F0E8] truncate">
                  <Icon size={12} className="text-[#C6FF54] shrink-0" />
                  <span className="truncate">{sc.title}</span>
                </div>
              </div>

              <div className="mt-2 text-[9px] text-[#969B92]">
                {sc.isCompleted ? (
                  <span className="text-[#C6FF54] font-bold">Score: {sc.score}/100</span>
                ) : (
                  'Pending Choice'
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* SELECTED SCENARIO DETAIL & DECISION CANVAS */}
      <div className="bg-[#181B18] border border-[#2A2E2A] p-6 space-y-6">
        {/* Scenario Header */}
        <div className="border-b border-[#2A2E2A] pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-[#C6FF54] mb-1 font-bold">
            <AlertTriangle size={14} className="text-[#FF8B45]" />
            <span>UNFORESEEN DELIVERY SITUATION</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F1F0E8]">
            {selectedScenario.title}
          </h2>
          <p className="text-xs text-[#F1F0E8] font-sans mt-2 leading-relaxed">
            {selectedScenario.description}
          </p>
          <div className="p-3 bg-[#141714] border border-[#2A2E2A] mt-3 text-xs text-[#969B92] font-sans leading-relaxed">
            <strong className="text-[#79B8FF] font-mono">OPERATIONAL CONTEXT: </strong>
            {selectedScenario.context}
          </div>
        </div>

        {/* Affected Areas */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="text-[#969B92]">AFFECTED DIMENSIONS:</span>
          {selectedScenario.affectedAreas.map((area) => (
            <span
              key={area}
              className="px-2 py-0.5 bg-[#141714] border border-[#2A2E2A] text-[#F1F0E8] text-[10px]"
            >
              {area}
            </span>
          ))}
        </div>

        {/* DECISION OPTIONS (THE 4 PATHS) */}
        <div className="space-y-3">
          <div className="font-mono text-xs uppercase tracking-wider text-[#C6FF54] font-bold">
            CHOOSE YOUR PROJECT MANAGER ACTION:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedScenario.options.map((opt) => {
              const isSelectedOption = selectedScenario.selectedOptionId === opt.id;
              const hasCompleted = selectedScenario.isCompleted;

              return (
                <div
                  key={opt.id}
                  onClick={() => !hasCompleted && handleSelectOption(opt)}
                  className={`p-4 border text-left font-mono text-xs transition-all flex flex-col justify-between ${
                    isSelectedOption
                      ? 'border-[#C6FF54] bg-[#C6FF54]/10 shadow-lg'
                      : hasCompleted
                      ? 'border-[#2A2E2A] bg-[#141714] opacity-50 cursor-not-allowed'
                      : 'border-[#2A2E2A] bg-[#141714] hover:border-[#969B92] cursor-pointer'
                  }`}
                >
                  <div>
                    {/* Option Label */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="font-bold text-sm text-[#F1F0E8] font-sans">
                        {opt.label}
                      </span>
                      {isSelectedOption && (
                        <CheckCircle2 size={16} className="text-[#C6FF54] shrink-0" />
                      )}
                    </div>

                    <p className="text-xs text-[#969B92] font-sans leading-relaxed mb-3">
                      {opt.description}
                    </p>

                    {/* Impact Metrics Pill Strip */}
                    <div className="grid grid-cols-3 gap-2 text-[10px] p-2 bg-[#101210] border border-[#2A2E2A]">
                      <div>
                        <span className="text-[#5F655B] block">SCHEDULE</span>
                        <span
                          className={
                            opt.scheduleImpact > 0
                              ? 'text-[#FF8B45]'
                              : 'text-[#C6FF54]'
                          }
                        >
                          {opt.scheduleImpact > 0 ? `+${opt.scheduleImpact}d` : '0d lag'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#5F655B] block">BUDGET</span>
                        <span
                          className={
                            opt.budgetImpact < 0
                              ? 'text-[#FF8B45]'
                              : opt.budgetImpact > 0
                              ? 'text-[#FF5E5E]'
                              : 'text-[#C6FF54]'
                          }
                        >
                          {opt.budgetImpact !== 0
                            ? `₹${Math.abs(opt.budgetImpact).toLocaleString()}`
                            : '₹0 delta'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#5F655B] block">RISK LEVEL</span>
                        <span
                          className={
                            opt.riskLevel === 'high'
                              ? 'text-[#FF5E5E]'
                              : opt.riskLevel === 'medium'
                              ? 'text-[#FF8B45]'
                              : 'text-[#C6FF54]'
                          }
                        >
                          {opt.riskLevel.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* If completed, show score & explanation */}
                  {hasCompleted && isSelectedOption && (
                    <div className="mt-4 pt-3 border-t border-[#C6FF54]/30 space-y-2">
                      <div className="flex items-center justify-between">
                        <span
                          className="font-bold text-[10px] px-1.5 py-0.5 border"
                          style={{
                            color: getScoreBadge(opt.score).color,
                            borderColor: getScoreBadge(opt.score).color,
                          }}
                        >
                          {getScoreBadge(opt.score).label}
                        </span>
                        <span className="text-sm font-bold text-[#C6FF54]">
                          SCORE: {opt.score}/100
                        </span>
                      </div>
                      <p className="text-xs text-[#F1F0E8] font-sans leading-relaxed">
                        {opt.explanation}
                      </p>
                    </div>
                  )}

                  {!hasCompleted && (
                    <button className="mt-3 text-[10px] text-[#C6FF54] hover:underline flex items-center gap-1 font-bold">
                      <span>CHOOSE THIS ACTION</span>
                      <ArrowRight size={11} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
