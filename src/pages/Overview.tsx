import React from 'react';
import { useProjectStore } from '../store/projectStore';
import {
  calculateProjectCompletion,
  calculateEVM,
  formatCurrency,
  projectHealthColor,
  projectHealthLabel,
} from '../utils/calculations';
import {
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldAlert,
  Layers,
  CheckCircle2,
  Activity,
  Flame,
  Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

export function Overview() {
  const navigate = useNavigate();
  const {
    tasks,
    risks,
    expenses,
    budgetCategories,
    milestones,
    simulationScore,
  } = useProjectStore();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;
  const blockedTasks = tasks.filter((t) => t.status === 'blocked').length;
  const todoTasks = tasks.filter((t) => t.status === 'todo' || t.status === 'backlog').length;

  const completionPct = calculateProjectCompletion(tasks);

  // Audited unified Earned Value Management metrics
  const evm = calculateEVM(tasks, budgetCategories, expenses);
  const { bac, pv: plannedValue, ev, ac: totalActual, cpi, spi, eac, cv, sv, vac, etc } = evm;

  // Dynamic project health calculation
  let health: 'green' | 'amber' | 'red' = 'green';
  if (blockedTasks > 0 || cpi < 0.9 || spi < 0.85) {
    health = 'amber';
  }
  if (blockedTasks >= 3 || cpi < 0.75 || spi < 0.7) {
    health = 'red';
  }

  // Charts data
  const taskStatusData = [
    { name: 'Completed', count: completedTasks, color: '#C6FF54' },
    { name: 'In Progress', count: inProgressTasks, color: '#79B8FF' },
    { name: 'Blocked', count: blockedTasks, color: '#FF5E5E' },
    { name: 'To Do/Backlog', count: todoTasks, color: '#5F655B' },
  ];

  const budgetChartData = budgetCategories.map((b) => ({
    name: b.name.replace('&', '+'),
    Planned: b.planned / 1000,
    Actual: b.actual / 1000,
  }));

  const progressTrend = [
    { week: 'W1', planned: 5, actual: 5 },
    { week: 'W2', planned: 12, actual: 12 },
    { week: 'W3', planned: 20, actual: 18 },
    { week: 'W4', planned: 28, actual: 26 },
    { week: 'W5', planned: 38, actual: 34 },
    { week: 'W6', planned: 48, actual: 42 },
    { week: 'W7', planned: 58, actual: 50 },
    { week: 'W8', planned: 68, actual: completionPct },
  ];

  const attentionItems = [
    {
      id: 'att-1',
      title: 'Backend API Dependency Blocking Reporting Module',
      severity: 'CRITICAL',
      color: '#FF5E5E',
      type: 'BLOCKED TASK',
      desc: 'Task 4.3 (task-020) is blocked awaiting data schema sign-off. Directly delaying Sprint 2 completion.',
      route: '/tasks',
      actionText: 'Inspect Blocked Tasks',
    },
    {
      id: 'att-2',
      title: 'GIS Building Footprint Expenditure Approaching Ceiling',
      severity: 'WARNING',
      color: '#FF8B45',
      type: 'BUDGET VARIANCE',
      desc: 'GIS & Data actuals reached ₹1,18,000 (59% of budget) at Week 8. CPI is 0.94.',
      route: '/budget',
      actionText: 'Review EVM Forecast',
    },
    {
      id: 'att-3',
      title: 'BBMP Municipal Approval Scheduled in 12 Days',
      severity: 'ATTENTION',
      color: '#79B8FF',
      type: 'STAKEHOLDER GATE',
      desc: 'Milestone 04 (Prototype Demo) requires formal briefing pack sent to BBMP 5 days prior.',
      route: '/milestones',
      actionText: 'Check Milestone Gates',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner / Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-1.5 py-0.5 bg-[#C6FF54]/5">
              HYBRID AGILE COMMAND CENTER
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              WEEK 8 OF 12 · ACTIVE EXECUTION
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            PROJECT COMMAND CENTER
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Real-time urban mobility pilot operations. Tracking schedule performance,
            EVM budget metrics, critical path health, and delivery contingencies.
          </p>
        </div>

        {/* Dynamic Health Card */}
        <div className="flex items-center gap-3 bg-[#181B18] border border-[#2A2E2A] p-3 shrink-0">
          <div
            className="w-3 h-12 rounded-none"
            style={{ backgroundColor: projectHealthColor(health) }}
          />
          <div>
            <div className="font-mono text-[9px] uppercase tracking-wider text-[#969B92]">
              OVERALL PROJECT HEALTH
            </div>
            <div
              className="text-base font-bold font-mono tracking-tight"
              style={{ color: projectHealthColor(health) }}
            >
              {projectHealthLabel(health)}
            </div>
            <div className="text-[10px] text-[#969B92] font-mono">
              Schedule: SPI {spi} · Cost: CPI {cpi}
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
        {/* Completion */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-3">
          <div className="flex items-center justify-between text-[#969B92] text-[10px] mb-1">
            <span>COMPLETION</span>
            <Activity size={12} className="text-[#C6FF54]" />
          </div>
          <div className="text-xl font-bold text-[#F1F0E8]">{completionPct}%</div>
          <div className="text-[9px] text-[#969B92] mt-1">
            {completedTasks} of {totalTasks} tasks done
          </div>
        </div>

        {/* CPI */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-3">
          <div className="flex items-center justify-between text-[#969B92] text-[10px] mb-1">
            <span>COST INDEX (CPI)</span>
            <TrendingUp size={12} className={cpi >= 1 ? 'text-[#C6FF54]' : 'text-[#FF8B45]'} />
          </div>
          <div
            className="text-xl font-bold"
            style={{ color: cpi >= 1 ? '#C6FF54' : '#FF8B45' }}
          >
            {cpi}
          </div>
          <div className="text-[9px] text-[#969B92] mt-1">
            Target: ≥ 1.00 ({cpi >= 1 ? 'Under budget' : 'Cost variance'})
          </div>
        </div>

        {/* SPI */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-3">
          <div className="flex items-center justify-between text-[#969B92] text-[10px] mb-1">
            <span>SCHEDULE (SPI)</span>
            <Clock size={12} className={spi >= 1 ? 'text-[#C6FF54]' : 'text-[#FF8B45]'} />
          </div>
          <div
            className="text-xl font-bold"
            style={{ color: spi >= 1 ? '#C6FF54' : '#FF8B45' }}
          >
            {spi}
          </div>
          <div className="text-[9px] text-[#969B92] mt-1">
            Target: ≥ 1.00 ({spi >= 1 ? 'Ahead' : 'Slight lag'})
          </div>
        </div>

        {/* Budget EAC */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-3">
          <div className="flex items-center justify-between text-[#969B92] text-[10px] mb-1">
            <span>FORECAST (EAC)</span>
            <span className="text-[#79B8FF] text-[9px]">BAC ₹12L</span>
          </div>
          <div className="text-xl font-bold text-[#F1F0E8]">
            {formatCurrency(eac)}
          </div>
          <div className="text-[9px] text-[#969B92] mt-1">
            Spent: {formatCurrency(totalActual)}
          </div>
        </div>

        {/* Blocked Tasks */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-3">
          <div className="flex items-center justify-between text-[#969B92] text-[10px] mb-1">
            <span>BLOCKED ITEMS</span>
            <AlertTriangle size={12} className={blockedTasks > 0 ? 'text-[#FF5E5E]' : 'text-[#C6FF54]'} />
          </div>
          <div
            className="text-xl font-bold"
            style={{ color: blockedTasks > 0 ? '#FF5E5E' : '#C6FF54' }}
          >
            {blockedTasks}
          </div>
          <div className="text-[9px] text-[#969B92] mt-1">
            {inProgressTasks} actively in progress
          </div>
        </div>

        {/* Open Risks */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-3">
          <div className="flex items-center justify-between text-[#969B92] text-[10px] mb-1">
            <span>ACTIVE RISKS</span>
            <ShieldAlert size={12} className="text-[#FF8B45]" />
          </div>
          <div className="text-xl font-bold text-[#F1F0E8]">
            {risks.filter((r) => r.status === 'open' || r.status === 'mitigating').length}
          </div>
          <div className="text-[9px] text-[#969B92] mt-1">
            {risks.filter((r) => r.exposure >= 12).length} high severity
          </div>
        </div>
      </div>

      {/* SECTION: PROJECT MANAGER'S ATTENTION */}
      <div className="bg-[#141714] border border-[#2A2E2A] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame size={14} className="text-[#FF8B45]" />
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#F1F0E8]">
              PROJECT MANAGER'S ATTENTION · TOP PRIORITY ACTION ITEMS
            </h2>
          </div>
          <span className="font-mono text-[9px] text-[#969B92]">
            PRIORITIZED BY DELIVERY IMPACT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {attentionItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#181B18] border border-[#2A2E2A] p-3 flex flex-col justify-between hover:border-[#969B92] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-[9px] mb-1.5">
                  <span
                    className="font-bold px-1 py-0.5 border"
                    style={{
                      color: item.color,
                      borderColor: `${item.color}40`,
                      backgroundColor: `${item.color}10`,
                    }}
                  >
                    {item.severity}
                  </span>
                  <span className="text-[#969B92]">{item.type}</span>
                </div>
                <div className="text-xs font-semibold text-[#F1F0E8] mb-1 leading-snug">
                  {item.title}
                </div>
                <p className="text-[11px] text-[#969B92] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <button
                onClick={() => navigate(item.route)}
                className="mt-3 pt-2 border-t border-[#2A2E2A] flex items-center justify-between text-[10px] font-mono text-[#C6FF54] hover:underline"
              >
                <span>{item.actionText}</span>
                <ArrowRight size={11} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Grid: Planned vs Actual & Task Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Planned vs Actual Trend */}
        <div className="lg:col-span-2 bg-[#181B18] border border-[#2A2E2A] p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-mono text-[10px] text-[#969B92] uppercase tracking-wider">
                S-CURVE PROGRESS TRACKING
              </div>
              <h3 className="text-sm font-semibold text-[#F1F0E8]">
                Planned vs. Actual Completion Trend (%)
              </h3>
            </div>
            <div className="flex items-center gap-3 font-mono text-[10px]">
              <span className="flex items-center gap-1 text-[#969B92]">
                <span className="w-2 h-0.5 bg-[#969B92]" /> Planned
              </span>
              <span className="flex items-center gap-1 text-[#C6FF54]">
                <span className="w-2 h-1 bg-[#C6FF54]" /> Actual
              </span>
            </div>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressTrend}>
                <XAxis
                  dataKey="week"
                  stroke="#5F655B"
                  fontSize={10}
                  tickLine={false}
                />
                <YAxis
                  stroke="#5F655B"
                  fontSize={10}
                  tickLine={false}
                  domain={[0, 100]}
                  unit="%"
                />
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
                  dataKey="planned"
                  stroke="#5F655B"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#C6FF54"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#C6FF54' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Status Breakdown */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-4 flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[#969B92] uppercase tracking-wider mb-1">
              WORK BREAKDOWN METRICS
            </div>
            <h3 className="text-sm font-semibold text-[#F1F0E8]">
              Task Status Distribution
            </h3>

            <div className="h-40 my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#181B18',
                      border: '1px solid #2A2E2A',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 font-mono text-[10px] pt-2 border-t border-[#2A2E2A]">
            {taskStatusData.map((d) => (
              <div key={d.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2" style={{ backgroundColor: d.color }} />
                  <span className="text-[#969B92]">{d.name}</span>
                </div>
                <span className="text-[#F1F0E8] font-bold">{d.count} tasks</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Budget Breakdown Chart */}
      <div className="bg-[#181B18] border border-[#2A2E2A] p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="font-mono text-[10px] text-[#969B92] uppercase tracking-wider">
              FINANCIAL GOVERNANCE (₹ THOUSANDS)
            </div>
            <h3 className="text-sm font-semibold text-[#F1F0E8]">
              Category Allocation vs. Actual Expenditure
            </h3>
          </div>
          <button
            onClick={() => navigate('/budget')}
            className="text-[10px] font-mono text-[#C6FF54] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Full EVM Details</span>
            <ArrowRight size={11} />
          </button>
        </div>

        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgetChartData}>
              <XAxis dataKey="name" stroke="#5F655B" fontSize={10} tickLine={false} />
              <YAxis stroke="#5F655B" fontSize={10} tickLine={false} unit="k" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#181B18',
                  border: '1px solid #2A2E2A',
                  fontSize: '11px',
                  fontFamily: 'JetBrains Mono',
                }}
              />
              <Bar dataKey="Planned" fill="#2A2E2A" />
              <Bar dataKey="Actual" fill="#C6FF54" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Milestones Strip */}
      <div className="bg-[#181B18] border border-[#2A2E2A] p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-[#C6FF54]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#F1F0E8]">
              STAGE-GATE MILESTONE TRACKING
            </h3>
          </div>
          <button
            onClick={() => navigate('/roadmap')}
            className="text-[10px] font-mono text-[#C6FF54] hover:underline flex items-center gap-1"
          >
            <span>View Roadmap</span>
            <ArrowRight size={11} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {milestones.map((m, idx) => {
            const isDone = m.status === 'completed';
            const isInProg = m.status === 'in-progress';
            return (
              <div
                key={m.id}
                className={`p-2.5 border text-left flex flex-col justify-between ${
                  isDone
                    ? 'border-[#C6FF54]/30 bg-[#C6FF54]/5'
                    : isInProg
                    ? 'border-[#79B8FF]/40 bg-[#79B8FF]/5'
                    : 'border-[#2A2E2A] bg-[#141714]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[9px] text-[#969B92] mb-1">
                    <span>M0{idx + 1}</span>
                    <span
                      className={`font-semibold ${
                        isDone
                          ? 'text-[#C6FF54]'
                          : isInProg
                          ? 'text-[#79B8FF]'
                          : 'text-[#5F655B]'
                      }`}
                    >
                      {m.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-[#F1F0E8] line-clamp-2 leading-tight">
                    {m.name}
                  </div>
                </div>
                <div className="font-mono text-[9px] text-[#969B92] mt-2 pt-1 border-t border-[#2A2E2A]">
                  Due: {m.dueDate.slice(5)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
