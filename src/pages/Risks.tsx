import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import {
  ShieldAlert,
  AlertTriangle,
  FileQuestion,
  HelpCircle,
  Network,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import type { Risk, RiskStatus } from '../types';

export function Risks() {
  const { addToast } = useToast();
  const { risks, addRisk, updateRisk, deleteRisk, issues, tasks } = useProjectStore();

  const [activeTab, setActiveTab] = useState<'matrix' | 'register' | 'raid'>('matrix');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRisk, setEditingRisk] = useState<Risk | null>(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'schedule' as Risk['category'],
    probability: 3 as 1 | 2 | 3 | 4 | 5,
    impact: 4 as 1 | 2 | 3 | 4 | 5,
    owner: 'Rahul Sharma (PM)',
    mitigationStrategy: '',
    contingencyPlan: '',
    trigger: '',
    status: 'open' as RiskStatus,
  });

  const handleOpenAdd = () => {
    setEditingRisk(null);
    setForm({
      title: '',
      description: '',
      category: 'technical',
      probability: 3,
      impact: 3,
      owner: 'Anjali Mehra (Tech Lead)',
      mitigationStrategy: '',
      contingencyPlan: '',
      trigger: '',
      status: 'open',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (risk: Risk) => {
    setEditingRisk(risk);
    setForm({
      title: risk.title,
      description: risk.description,
      category: risk.category,
      probability: risk.probability,
      impact: risk.impact,
      owner: risk.owner,
      mitigationStrategy: risk.mitigationStrategy,
      contingencyPlan: risk.contingencyPlan,
      trigger: risk.trigger,
      status: risk.status,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      addToast('Please enter a risk title.', 'error');
      return;
    }

    const exposure = form.probability * form.impact;

    if (editingRisk) {
      updateRisk(editingRisk.id, {
        ...form,
        exposure,
      });
      addToast(`Updated risk ${editingRisk.id}: ${form.title}`, 'success');
    } else {
      const newRisk: Risk = {
        id: `risk-00${risks.length + 1}`,
        ...form,
        exposure,
        raisedDate: new Date().toISOString().split('T')[0],
        reviewDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        linkedTaskIds: [],
      };
      addRisk(newRisk);
      addToast(`Logged new risk ${newRisk.id}`, 'success');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#FF5E5E] uppercase tracking-widest border border-[#FF5E5E]/30 px-1.5 py-0.5 bg-[#FF5E5E]/5">
              RAID LOG MANAGEMENT
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              PROBABILITY × IMPACT SEVERITY ENGINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            RISK REGISTER & RAID LOG
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Proactive risk identification, quantification, mitigation tracking, and connected
            RAID log linking Risks, Assumptions, Issues, and Dependencies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-[#2A2E2A] bg-[#141714]">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                activeTab === 'matrix'
                  ? 'bg-[#202420] text-[#C6FF54]'
                  : 'text-[#969B92] hover:text-[#F1F0E8]'
              }`}
            >
              5×5 MATRIX
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                activeTab === 'register'
                  ? 'bg-[#202420] text-[#C6FF54]'
                  : 'text-[#969B92] hover:text-[#F1F0E8]'
              }`}
            >
              RISK REGISTER
            </button>
            <button
              onClick={() => setActiveTab('raid')}
              className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                activeTab === 'raid'
                  ? 'bg-[#202420] text-[#C6FF54]'
                  : 'text-[#969B92] hover:text-[#F1F0E8]'
              }`}
            >
              RAID VIEW
            </button>
          </div>

          <Button variant="lime" size="sm" onClick={handleOpenAdd}>
            <Plus size={13} />
            <span>LOG NEW RISK</span>
          </Button>
        </div>
      </div>

      {/* TAB: 5x5 RISK MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="bg-[#181B18] border border-[#2A2E2A] p-5">
            <div className="flex items-center justify-between mb-4 border-b border-[#2A2E2A] pb-3">
              <div>
                <h3 className="font-bold text-[#F1F0E8] text-sm font-mono">
                  5×5 PROBABILITY VS. IMPACT HEATMAP
                </h3>
                <p className="text-[#969B92] text-xs font-sans mt-0.5">
                  Severity Score = Probability (1–5) × Impact (1–5). Exposure range: 1 (Minimal) to 25 (Catastrophic).
                </p>
              </div>
              <div className="flex items-center gap-3 font-mono text-[10px]">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#FF5E5E]" /> High (15–25)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#FF8B45]" /> Medium (8–14)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-[#C6FF54]" /> Low (1–7)
                </span>
              </div>
            </div>

            {/* 5x5 Grid */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono text-[#969B92] text-center">
                ← PROBABILITY (VERTICAL) VS. IMPACT (HORIZONTAL) →
              </div>

              <div className="grid grid-cols-6 gap-1 font-mono text-xs">
                {/* Headers */}
                <div className="p-2 text-[10px] text-[#969B92] flex items-center justify-center">
                  P \ I
                </div>
                {[1, 2, 3, 4, 5].map((imp) => (
                  <div
                    key={`ih-${imp}`}
                    className="p-1.5 bg-[#141714] border border-[#2A2E2A] text-center text-[10px] font-bold text-[#969B92]"
                  >
                    IMP {imp}
                  </div>
                ))}

                {/* Rows from Probability 5 down to 1 */}
                {[5, 4, 3, 2, 1].map((prob) => (
                  <React.Fragment key={`row-${prob}`}>
                    <div className="p-1.5 bg-[#141714] border border-[#2A2E2A] text-center text-[10px] font-bold text-[#969B92] flex items-center justify-center">
                      PROB {prob}
                    </div>

                    {[1, 2, 3, 4, 5].map((imp) => {
                      const score = prob * imp;
                      const cellRisks = risks.filter(
                        (r) => r.probability === prob && r.impact === imp
                      );

                      const bgColor =
                        score >= 15
                          ? 'rgba(255, 94, 94, 0.15)'
                          : score >= 8
                          ? 'rgba(255, 139, 69, 0.12)'
                          : 'rgba(198, 255, 84, 0.08)';

                      const borderColor =
                        score >= 15
                          ? 'rgba(255, 94, 94, 0.4)'
                          : score >= 8
                          ? 'rgba(255, 139, 69, 0.3)'
                          : 'rgba(198, 255, 84, 0.2)';

                      return (
                        <div
                          key={`cell-${prob}-${imp}`}
                          className="min-h-[64px] p-1.5 border flex flex-col justify-between transition-colors relative"
                          style={{ backgroundColor: bgColor, borderColor }}
                        >
                          <span className="text-[9px] text-[#5F655B] absolute top-1 right-1">
                            {score}
                          </span>

                          <div className="space-y-1 mt-3">
                            {cellRisks.map((r) => (
                              <div
                                key={r.id}
                                onClick={() => handleOpenEdit(r)}
                                className="p-1 bg-[#101210] border border-[#2A2E2A] hover:border-[#F1F0E8] cursor-pointer text-[9px] font-bold truncate text-[#F1F0E8]"
                                title={`${r.id}: ${r.title} (Exposure: ${r.exposure})`}
                              >
                                {r.id}: {r.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: RISK REGISTER TABLE */}
      {activeTab === 'register' && (
        <div className="bg-[#181B18] border border-[#2A2E2A] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#141714] border-b border-[#2A2E2A] text-[10px] text-[#969B92] uppercase">
              <tr>
                <th className="p-3">ID & Category</th>
                <th className="p-3">Risk Event & Trigger</th>
                <th className="p-3 text-center">P × I = Score</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Mitigation Strategy</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E2A]">
              {risks.map((r) => {
                const isHigh = r.exposure >= 15;
                const isMed = r.exposure >= 8 && r.exposure < 15;

                return (
                  <tr key={r.id} className="hover:bg-[#202420] transition-colors">
                    <td className="p-3">
                      <div className="font-bold text-[#F1F0E8]">{r.id}</div>
                      <div className="text-[10px] text-[#79B8FF] uppercase">
                        {r.category}
                      </div>
                    </td>
                    <td className="p-3 max-w-sm">
                      <div className="font-semibold text-[#F1F0E8] leading-tight">
                        {r.title}
                      </div>
                      <div className="text-[10px] text-[#969B92] mt-0.5 font-sans">
                        Trigger: {r.trigger}
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div
                        className={`font-bold text-sm px-2 py-0.5 border inline-block ${
                          isHigh
                            ? 'bg-[#FF5E5E]/10 border-[#FF5E5E]/40 text-[#FF5E5E]'
                            : isMed
                            ? 'bg-[#FF8B45]/10 border-[#FF8B45]/40 text-[#FF8B45]'
                            : 'bg-[#C6FF54]/10 border-[#C6FF54]/40 text-[#C6FF54]'
                        }`}
                      >
                        {r.probability} × {r.impact} = {r.exposure}
                      </div>
                    </td>
                    <td className="p-3 text-[#969B92] text-[11px]">{r.owner}</td>
                    <td className="p-3 max-w-xs text-[11px] text-[#969B92] font-sans">
                      {r.mitigationStrategy}
                    </td>
                    <td className="p-3">
                      <Badge variant={r.status === 'closed' ? 'lime' : 'orange'}>
                        {r.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button variant="outline" size="xs" onClick={() => handleOpenEdit(r)}>
                          EDIT
                        </Button>
                        <Button
                          variant="secondary"
                          size="xs"
                          onClick={() => {
                            deleteRisk(r.id);
                            addToast(`Deleted risk ${r.id}`, 'info');
                          }}
                          className="hover:text-[#FF5E5E]"
                        >
                          DELETE
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB: CONNECTED RAID LOG */}
      {activeTab === 'raid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          {/* R: Risks */}
          <div className="bg-[#181B18] border border-[#FF5E5E]/40 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#2A2E2A] pb-2 text-[#FF5E5E]">
              <span className="font-bold">[R] RISKS (ACTIVE: {risks.length})</span>
              <ShieldAlert size={14} />
            </div>
            <div className="space-y-2">
              {risks.slice(0, 3).map((r) => (
                <div key={r.id} className="p-2.5 bg-[#141714] border border-[#2A2E2A]">
                  <div className="font-bold text-[#F1F0E8]">{r.title}</div>
                  <div className="text-[10px] text-[#FF5E5E] mt-0.5">
                    Score: {r.exposure} · Mitigation: {r.mitigationStrategy}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* A: Assumptions */}
          <div className="bg-[#181B18] border border-[#79B8FF]/40 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#2A2E2A] pb-2 text-[#79B8FF]">
              <span className="font-bold">[A] ASSUMPTIONS (LOGGED: 4)</span>
              <FileQuestion size={14} />
            </div>
            <div className="space-y-2 text-[#969B92] text-[11px] font-sans">
              <div className="p-2.5 bg-[#141714] border border-[#2A2E2A]">
                <strong className="text-[#F1F0E8] font-mono">A-01:</strong> OpenStreetMap data remains unthrottled and accessible throughout the 12-week execution.
              </div>
              <div className="p-2.5 bg-[#141714] border border-[#2A2E2A]">
                <strong className="text-[#F1F0E8] font-mono">A-02:</strong> BBMP corridor pedestrian access permits approved without delay.
              </div>
            </div>
          </div>

          {/* I: Issues */}
          <div className="bg-[#181B18] border border-[#FF8B45]/40 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#2A2E2A] pb-2 text-[#FF8B45]">
              <span className="font-bold">[I] ISSUES (REALIZED RISKS: {issues.length})</span>
              <AlertTriangle size={14} />
            </div>
            <div className="space-y-2">
              {issues.map((iss) => (
                <div key={iss.id} className="p-2.5 bg-[#141714] border border-[#2A2E2A]">
                  <div className="font-bold text-[#F1F0E8]">{iss.title}</div>
                  <div className="text-[10px] text-[#FF8B45] mt-0.5">
                    Status: {iss.status.toUpperCase()} · Owner: {iss.owner}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* D: Dependencies */}
          <div className="bg-[#181B18] border border-[#C6FF54]/40 p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[#2A2E2A] pb-2 text-[#C6FF54]">
              <span className="font-bold">[D] DEPENDENCIES (CRITICAL CHAINS)</span>
              <Network size={14} />
            </div>
            <div className="space-y-2 text-[11px] font-mono">
              <div className="p-2.5 bg-[#141714] border border-[#2A2E2A]">
                <span className="text-[#C6FF54]">Task 4.2 (Map Frontend)</span> depends on <span className="text-[#79B8FF]">Task 3.1 (GIS Base Dataset)</span>
              </div>
              <div className="p-2.5 bg-[#141714] border border-[#2A2E2A]">
                <span className="text-[#C6FF54]">Task 4.5 (Reporting)</span> depends on <span className="text-[#FF5E5E]">Task 4.3 (Backend API - BLOCKED)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Risk Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingRisk ? `EDIT RISK: ${editingRisk.id}` : 'LOG NEW RISK EVENT'}
        size="lg"
      >
        <div className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              RISK TITLE
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                CATEGORY
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              >
                <option value="technical">Technical</option>
                <option value="operational">Operational</option>
                <option value="financial">Financial</option>
                <option value="resource">Resource</option>
                <option value="schedule">Schedule</option>
                <option value="stakeholder">Stakeholder</option>
                <option value="external">External</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                PROBABILITY (1–5)
              </label>
              <select
                value={form.probability}
                onChange={(e) => setForm({ ...form, probability: Number(e.target.value) as any })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              >
                <option value={1}>1 - Rare (&lt;10%)</option>
                <option value={2}>2 - Unlikely (10-30%)</option>
                <option value={3}>3 - Possible (30-60%)</option>
                <option value={4}>4 - Likely (60-80%)</option>
                <option value={5}>5 - Almost Certain (&gt;80%)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                IMPACT (1–5)
              </label>
              <select
                value={form.impact}
                onChange={(e) => setForm({ ...form, impact: Number(e.target.value) as any })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              >
                <option value={1}>1 - Negligible (&lt;2d lag)</option>
                <option value={2}>2 - Minor (2-5d lag)</option>
                <option value={3}>3 - Moderate (&lt;10d / ₹50k)</option>
                <option value={4}>4 - Major (Milestone risk)</option>
                <option value={5}>5 - Critical (Project failure)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              PROACTIVE MITIGATION STRATEGY
            </label>
            <textarea
              rows={2}
              value={form.mitigationStrategy}
              onChange={(e) => setForm({ ...form, mitigationStrategy: e.target.value })}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none font-sans text-xs"
            />
          </div>

          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              REACTIVE CONTINGENCY PLAN
            </label>
            <textarea
              rows={2}
              value={form.contingencyPlan}
              onChange={(e) => setForm({ ...form, contingencyPlan: e.target.value })}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none font-sans text-xs"
            />
          </div>

          <div className="pt-3 border-t border-[#2A2E2A] flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="lime" size="sm" onClick={handleSave}>
              SAVE RISK RECORD
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
