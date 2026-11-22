import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Plus,
  IndianRupee,
  Receipt,
  AlertTriangle,
  Info,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import {
  calculateProjectCompletion,
  calculateEVM,
  formatCurrency,
} from '../utils/calculations';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import type { Expense } from '../types';

export function Budget() {
  const { addToast } = useToast();
  const { budgetCategories, expenses, addExpense, deleteExpense, tasks } = useProjectStore();

  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [forecastingMethod, setForecastingMethod] = useState<'cpi' | 'budgeted' | 'composite'>('cpi');
  const [expenseForm, setExpenseForm] = useState({
    category: 'GIS & Data',
    description: '',
    amount: 15000,
    date: new Date().toISOString().split('T')[0],
    approvedBy: 'Rahul Sharma (PM)',
  });

  // Unified Audited EVM Calculations
  const evm = calculateEVM(tasks, budgetCategories, expenses, undefined, forecastingMethod);
  const { bac, pv, ev, ac: totalActual, cpi, spi, cv, sv, eac, etc, vac, completionPct } = evm;

  const chartData = budgetCategories.map((b) => ({
    name: b.name.replace('&', '+'),
    Planned: b.planned / 1000,
    Actual: b.actual / 1000,
    Forecast: b.forecast / 1000,
  }));

  const handleAddExpense = () => {
    if (!expenseForm.description.trim() || expenseForm.amount <= 0) {
      addToast('Please enter a description and valid amount.', 'error');
      return;
    }

    const newExp: Expense = {
      id: `exp-${Date.now()}`,
      category: expenseForm.category,
      description: expenseForm.description,
      amount: Number(expenseForm.amount),
      date: expenseForm.date,
      approvedBy: expenseForm.approvedBy,
    };
    addExpense(newExp);
    addToast(`Expense logged: ${formatCurrency(newExp.amount)} (${newExp.category})`, 'success');
    setExpenseModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Governance */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-1.5 py-0.5 bg-[#C6FF54]/5">
              EARNED VALUE MANAGEMENT (EVM)
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              BASELINE BUDGET: ₹12,00,000 (INR 12 LAKHS)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            BUDGET & COST CONTROL
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Mathematical cost variance monitoring, Earned Value calculations,
            Forecast at Completion (EAC), and transaction logs across all 7 cost categories.
          </p>
        </div>

        <Button variant="lime" size="sm" onClick={() => setExpenseModalOpen(true)}>
          <Plus size={13} />
          <span>LOG ACTUAL EXPENSE</span>
        </Button>
      </div>

      {/* FORECASTING METHOD SELECTOR TABS */}
      <div className="bg-[#181B18] border border-[#2A2E2A] p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#969B92] uppercase tracking-wider">EAC FORECASTING METHOD:</span>
          <div className="flex bg-[#101210] p-0.5 border border-[#2A2E2A]">
            <button
              onClick={() => setForecastingMethod('cpi')}
              className={`px-3 py-1 text-[11px] font-bold transition-all ${
                forecastingMethod === 'cpi'
                  ? 'bg-[#C6FF54] text-[#101210]'
                  : 'text-[#969B92] hover:text-[#F1F0E8]'
              }`}
            >
              CPI Trend (BAC / CPI)
            </button>
            <button
              onClick={() => setForecastingMethod('budgeted')}
              className={`px-3 py-1 text-[11px] font-bold transition-all ${
                forecastingMethod === 'budgeted'
                  ? 'bg-[#C6FF54] text-[#101210]'
                  : 'text-[#969B92] hover:text-[#F1F0E8]'
              }`}
            >
              Budgeted Rate (AC + BAC - EV)
            </button>
            <button
              onClick={() => setForecastingMethod('composite')}
              className={`px-3 py-1 text-[11px] font-bold transition-all ${
                forecastingMethod === 'composite'
                  ? 'bg-[#C6FF54] text-[#101210]'
                  : 'text-[#969B92] hover:text-[#F1F0E8]'
              }`}
            >
              Composite (CPI × SPI)
            </button>
          </div>
        </div>
        <div className="text-[11px] text-[#79B8FF] bg-[#79B8FF]/10 px-2 py-1 border border-[#79B8FF]/20">
          {forecastingMethod === 'cpi' && 'Active Model: EAC = BAC / CPI (Assumes present cost variance continues)'}
          {forecastingMethod === 'budgeted' && 'Active Model: EAC = AC + (BAC - EV) (Assumes remaining work proceeds at planned rate)'}
          {forecastingMethod === 'composite' && 'Active Model: EAC = AC + [(BAC - EV) / (CPI × SPI)] (Factors both cost and schedule indices)'}
        </div>
      </div>

      {/* EVM KPI METRICS STRIP (8 METRICS) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 font-mono">
        {/* Planned Value (PV) */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-2.5">
          <div className="text-[9px] text-[#969B92] uppercase">PLANNED VALUE (PV)</div>
          <div className="text-base font-bold text-[#F1F0E8] mt-0.5">{formatCurrency(pv)}</div>
          <div className="text-[9px] text-[#5F655B] mt-0.5">Budget scheduled</div>
        </div>

        {/* Earned Value (EV) */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-2.5">
          <div className="text-[9px] text-[#969B92] uppercase">EARNED VALUE (EV)</div>
          <div className="text-base font-bold text-[#C6FF54] mt-0.5">{formatCurrency(ev)}</div>
          <div className="text-[9px] text-[#5F655B] mt-0.5">{completionPct}% completed</div>
        </div>

        {/* Actual Cost (AC) */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-2.5">
          <div className="text-[9px] text-[#969B92] uppercase">ACTUAL COST (AC)</div>
          <div className="text-base font-bold text-[#F1F0E8] mt-0.5">{formatCurrency(totalActual)}</div>
          <div className="text-[9px] text-[#5F655B] mt-0.5">Spent to date</div>
        </div>

        {/* Cost Performance Index (CPI) */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-2.5">
          <div className="text-[9px] text-[#969B92] uppercase">COST INDEX (CPI)</div>
          <div
            className="text-base font-bold mt-0.5"
            style={{ color: cpi >= 1 ? '#C6FF54' : '#FF8B45' }}
          >
            {cpi}
          </div>
          <div className="text-[9px] text-[#5F655B] mt-0.5">EV / AC</div>
        </div>

        {/* Schedule Performance Index (SPI) */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-2.5">
          <div className="text-[9px] text-[#969B92] uppercase">SCHEDULE (SPI)</div>
          <div
            className="text-base font-bold mt-0.5"
            style={{ color: spi >= 1 ? '#C6FF54' : '#FF8B45' }}
          >
            {spi}
          </div>
          <div className="text-[9px] text-[#5F655B] mt-0.5">EV / PV</div>
        </div>

        {/* Estimate at Completion (EAC) */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-2.5">
          <div className="text-[9px] text-[#969B92] uppercase">FORECAST (EAC)</div>
          <div className="text-base font-bold text-[#79B8FF] mt-0.5">{formatCurrency(eac)}</div>
          <div className="text-[9px] text-[#5F655B] mt-0.5">Projected total</div>
        </div>

        {/* Estimate to Complete (ETC) */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-2.5">
          <div className="text-[9px] text-[#969B92] uppercase">REMAINING (ETC)</div>
          <div className="text-base font-bold text-[#F1F0E8] mt-0.5">{formatCurrency(etc)}</div>
          <div className="text-[9px] text-[#5F655B] mt-0.5">EAC - AC</div>
        </div>

        {/* Variance at Completion (VAC) */}
        <div className="bg-[#181B18] border border-[#2A2E2A] p-2.5">
          <div className="text-[9px] text-[#969B92] uppercase">VARIANCE (VAC)</div>
          <div
            className="text-base font-bold mt-0.5"
            style={{ color: vac >= 0 ? '#C6FF54' : '#FF5E5E' }}
          >
            {vac >= 0 ? '+' : ''}
            {formatCurrency(vac)}
          </div>
          <div className="text-[9px] text-[#5F655B] mt-0.5">BAC - EAC</div>
        </div>
      </div>

      {/* EVM Formulas Educational Banner */}
      <div className="bg-[#141714] border border-[#2A2E2A] p-3 font-mono text-[11px] text-[#969B92] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-[#C6FF54]">
          <Info size={13} />
          <span className="font-bold">AUDITED EVM FORMULAS:</span>
        </div>
        <span>CPI = EV / AC = {cpi}</span>
        <span>SPI = EV / PV = {spi}</span>
        <span>CV = EV - AC = {cv >= 0 ? '+' : ''}{formatCurrency(cv)}</span>
        <span>SV = EV - PV = {sv >= 0 ? '+' : ''}{formatCurrency(sv)}</span>
        <span>ETC = EAC - AC = {formatCurrency(etc)}</span>
        <span>VAC = BAC - EAC = {vac >= 0 ? '+' : ''}{formatCurrency(vac)}</span>
      </div>

      {/* Chart: Category Allocations vs Actual vs Forecast */}
      <div className="bg-[#181B18] border border-[#2A2E2A] p-5 space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-[#2A2E2A] pb-3">
          <div>
            <h3 className="font-bold text-[#F1F0E8] text-sm">
              CATEGORY-LEVEL FINANCIAL BREAKDOWN (₹ THOUSANDS)
            </h3>
            <p className="text-[#969B92] text-xs mt-0.5">
              Comparing original planned allocation against actual burn and EAC forecast.
            </p>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1 text-[#5F655B]">
              <span className="w-2 h-2 bg-[#2A2E2A]" /> Planned
            </span>
            <span className="flex items-center gap-1 text-[#C6FF54]">
              <span className="w-2 h-2 bg-[#C6FF54]" /> Actual Burn
            </span>
            <span className="flex items-center gap-1 text-[#79B8FF]">
              <span className="w-2 h-2 bg-[#79B8FF]" /> Forecast
            </span>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
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
              <Bar dataKey="Forecast" fill="#79B8FF" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-[#181B18] border border-[#2A2E2A] overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#141714] border-b border-[#2A2E2A] text-[10px] text-[#969B92] uppercase">
            <tr>
              <th className="p-3">Cost Category</th>
              <th className="p-3 text-right">Planned (BAC)</th>
              <th className="p-3 text-right">Actual (AC)</th>
              <th className="p-3 text-right">Forecast (EAC)</th>
              <th className="p-3 text-right">Variance</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2E2A]">
            {budgetCategories.map((b) => {
              const diff = b.planned - b.forecast;
              const isOver = diff < 0;

              return (
                <tr key={b.id} className="hover:bg-[#202420] transition-colors">
                  <td className="p-3 font-semibold text-[#F1F0E8]">{b.name}</td>
                  <td className="p-3 text-right text-[#969B92]">{formatCurrency(b.planned)}</td>
                  <td className="p-3 text-right font-bold text-[#C6FF54]">{formatCurrency(b.actual)}</td>
                  <td className="p-3 text-right text-[#79B8FF]">{formatCurrency(b.forecast)}</td>
                  <td className={`p-3 text-right font-bold ${isOver ? 'text-[#FF8B45]' : 'text-[#C6FF54]'}`}>
                    {diff >= 0 ? '+' : ''}{formatCurrency(diff)}
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant={isOver ? 'orange' : 'lime'}>
                      {isOver ? 'VARIANCE' : 'ON TRACK'}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Transaction Expenses Log */}
      <div className="bg-[#181B18] border border-[#2A2E2A] p-4 space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-[#2A2E2A] pb-2">
          <h3 className="font-bold text-[#F1F0E8] text-sm">
            ACTUAL EXPENDITURE AUDIT LEDGER ({expenses.length} ITEMS)
          </h3>
          <span className="text-[10px] text-[#C6FF54]">
            Total Incurred: {formatCurrency(totalActual)}
          </span>
        </div>

        <div className="space-y-1.5">
          {expenses.map((exp) => (
            <div
              key={exp.id}
              className="p-2.5 bg-[#141714] border border-[#2A2E2A] flex items-center justify-between"
            >
              <div>
                <div className="font-semibold text-[#F1F0E8]">{exp.description}</div>
                <div className="text-[10px] text-[#969B92] mt-0.5">
                  {exp.category} · Approved by {exp.approvedBy} · {exp.date}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#C6FF54] text-sm">
                  {formatCurrency(exp.amount)}
                </span>
                <button
                  onClick={() => {
                    deleteExpense(exp.id);
                    addToast(`Expense removed: ${exp.description}`, 'info');
                  }}
                  className="text-[#969B92] hover:text-[#FF5E5E] transition-colors p-1"
                  title="Delete Expense"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Log Expense Modal */}
      <Modal
        open={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
        title="RECORD ACTUAL PROJECT EXPENDITURE"
        size="md"
      >
        <div className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              BUDGET CATEGORY
            </label>
            <select
              value={expenseForm.category}
              onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
            >
              {budgetCategories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              EXPENSE DESCRIPTION / VENDOR
            </label>
            <input
              type="text"
              value={expenseForm.description}
              onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
              placeholder="e.g. QGIS Cloud hosting server renewal"
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                AMOUNT (INR ₹)
              </label>
              <input
                type="number"
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm({ ...expenseForm, amount: Number(e.target.value) })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                INCURRED DATE
              </label>
              <input
                type="date"
                value={expenseForm.date}
                onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#2A2E2A] flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setExpenseModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="lime" size="sm" onClick={handleAddExpense}>
              RECORD EXPENDITURE
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
