import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import {
  AlertTriangle,
  Network,
  Plus,
  CheckCircle,
  Clock,
  ArrowRight,
  ShieldAlert,
  Flame,
  FileCheck,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import type { Issue, Priority, IssueStatus } from '../types';

export function Issues() {
  const { addToast } = useToast();
  const { issues, addIssue, updateIssue, deleteIssue, tasks, team } = useProjectStore();

  const [activeTab, setActiveTab] = useState<'issues' | 'dependencies'>('issues');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    severity: 'high' as Priority,
    owner: 'Anjali Mehra (Tech Lead)',
    dueDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
    resolutionPlan: '',
    status: 'open' as IssueStatus,
    escalated: false,
  });

  const handleOpenAdd = () => {
    setEditingIssue(null);
    setForm({
      title: '',
      description: '',
      severity: 'high',
      owner: 'Anjali Mehra (Tech Lead)',
      dueDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      resolutionPlan: '',
      status: 'open',
      escalated: false,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (iss: Issue) => {
    setEditingIssue(iss);
    setForm({
      title: iss.title,
      description: iss.description,
      severity: iss.severity,
      owner: iss.owner,
      dueDate: iss.dueDate,
      resolutionPlan: iss.resolutionPlan,
      status: iss.status,
      escalated: iss.escalated,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      addToast('Please enter an issue title.', 'error');
      return;
    }

    if (editingIssue) {
      updateIssue(editingIssue.id, form);
      addToast(`Updated issue ${editingIssue.id}`, 'success');
    } else {
      const newIssue: Issue = {
        id: `iss-00${issues.length + 1}`,
        ...form,
        raisedDate: new Date().toISOString().split('T')[0],
        linkedTaskIds: ['task-020'],
      };
      addIssue(newIssue);
      addToast(`Logged new project issue ${newIssue.id}`, 'success');
    }
    setModalOpen(false);
  };

  const handleToggleResolve = (iss: Issue) => {
    const newStatus = iss.status === 'resolved' ? 'open' : 'resolved';
    updateIssue(iss.id, {
      status: newStatus,
      resolutionDate: newStatus === 'resolved' ? new Date().toISOString().split('T')[0] : undefined,
    });
    addToast(
      `Issue ${iss.id} marked as ${newStatus.toUpperCase()}`,
      newStatus === 'resolved' ? 'success' : 'info'
    );
  };

  const handleToggleEscalate = (iss: Issue) => {
    updateIssue(iss.id, { escalated: !iss.escalated });
    addToast(
      `Issue ${iss.id} ${!iss.escalated ? 'ESCALATED to Sponsor' : 'de-escalated'}`,
      !iss.escalated ? 'warning' : 'info'
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#FF8B45] uppercase tracking-widest border border-[#FF8B45]/30 px-1.5 py-0.5 bg-[#FF8B45]/5">
              REALIZED DELIVERY IMPEDIMENTS
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              RESOLUTION WORKFLOW & ESCALATION PATHS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            ISSUES & DEPENDENCIES
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Active blockers impeding development sprints, technical dependencies between
            GIS and frontend modules, and formal sponsor escalation tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-[#2A2E2A] bg-[#141714]">
            <button
              onClick={() => setActiveTab('issues')}
              className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                activeTab === 'issues'
                  ? 'bg-[#202420] text-[#C6FF54]'
                  : 'text-[#969B92] hover:text-[#F1F0E8]'
              }`}
            >
              ACTIVE ISSUES ({issues.filter((i) => i.status !== 'resolved').length})
            </button>
            <button
              onClick={() => setActiveTab('dependencies')}
              className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                activeTab === 'dependencies'
                  ? 'bg-[#202420] text-[#C6FF54]'
                  : 'text-[#969B92] hover:text-[#F1F0E8]'
              }`}
            >
              DEPENDENCY MAPPING
            </button>
          </div>

          <Button variant="lime" size="sm" onClick={handleOpenAdd}>
            <Plus size={13} />
            <span>LOG NEW ISSUE</span>
          </Button>
        </div>
      </div>

      {/* TAB: ISSUES LIST */}
      {activeTab === 'issues' && (
        <div className="space-y-3 font-mono text-xs">
          {issues.map((iss) => {
            const isCritical = iss.severity === 'critical';
            const isResolved = iss.status === 'resolved';

            return (
              <div
                key={iss.id}
                className={`p-4 border bg-[#181B18] space-y-3 ${
                  isResolved
                    ? 'border-[#C6FF54]/20 opacity-75'
                    : isCritical
                    ? 'border-[#FF5E5E]/40'
                    : 'border-[#2A2E2A]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2A2E2A] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-[#FF8B45] px-1.5 py-0.5 border border-[#FF8B45]/30 bg-[#FF8B45]/10">
                      {iss.id}
                    </span>
                    <Badge variant={isCritical ? 'coral' : 'orange'}>
                      SEV: {iss.severity.toUpperCase()}
                    </Badge>
                    {iss.escalated && (
                      <span className="text-[9px] text-[#FF5E5E] font-bold border border-[#FF5E5E] px-1 py-0.2 bg-[#FF5E5E]/10 animate-pulse">
                        ESCALATED TO SPONSOR
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-[10px] text-[#969B92]">
                    <span>Raised: {iss.raisedDate}</span>
                    <span>Target Due: {iss.dueDate}</span>
                    <Badge variant={isResolved ? 'lime' : 'blue'}>
                      {iss.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-bold text-[#F1F0E8] leading-snug">
                    {iss.title}
                  </div>
                  <p className="text-xs text-[#969B92] font-sans mt-1 leading-relaxed">
                    {iss.description}
                  </p>
                </div>

                <div className="p-2.5 bg-[#141714] border border-[#2A2E2A] text-[11px]">
                  <span className="text-[#C6FF54] font-bold block mb-0.5">
                    RESOLUTION PLAN & ACTION:
                  </span>
                  <div className="text-[#F1F0E8] font-sans">{iss.resolutionPlan}</div>
                  <div className="text-[10px] text-[#969B92] mt-1">
                    Owner: {iss.owner}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-2 border-t border-[#2A2E2A] flex items-center justify-between">
                  <div className="text-[10px] text-[#5F655B]">
                    Linked tasks: {iss.linkedTaskIds.join(', ')}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={iss.escalated ? 'secondary' : 'danger'}
                      size="xs"
                      onClick={() => handleToggleEscalate(iss)}
                    >
                      {iss.escalated ? 'DE-ESCALATE' : 'ESCALATE TO SPONSOR'}
                    </Button>
                    <Button
                      variant={isResolved ? 'secondary' : 'lime'}
                      size="xs"
                      onClick={() => handleToggleResolve(iss)}
                    >
                      {isResolved ? 'RE-OPEN ISSUE' : 'MARK RESOLVED'}
                    </Button>
                    <Button variant="outline" size="xs" onClick={() => handleOpenEdit(iss)}>
                      EDIT
                    </Button>
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => {
                        deleteIssue(iss.id);
                        addToast(`Deleted issue ${iss.id}`, 'info');
                      }}
                      className="hover:text-[#FF5E5E]"
                    >
                      DELETE
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB: DEPENDENCIES MAPPING */}
      {activeTab === 'dependencies' && (
        <div className="bg-[#181B18] border border-[#2A2E2A] p-5 space-y-4 font-mono text-xs">
          <div className="border-b border-[#2A2E2A] pb-3">
            <h3 className="font-bold text-[#F1F0E8] text-sm">
              UPSTREAM PREDECESSORS & DOWNSTREAM IMPACT CONSEQUENCES
            </h3>
            <p className="text-[#969B92] text-xs mt-0.5">
              Highlighting how delayed upstream activities cascade through the 12-week schedule.
            </p>
          </div>

          <div className="space-y-3">
            {tasks
              .filter((t) => t.dependencies.length > 0)
              .map((t) => {
                const isBlocked = t.status === 'blocked';

                return (
                  <div
                    key={t.id}
                    className={`p-3 border bg-[#141714] space-y-2 ${
                      isBlocked ? 'border-[#FF5E5E]/40' : 'border-[#2A2E2A]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#F1F0E8] font-bold">
                        {t.wbsCode}: {t.title}
                      </span>
                      <Badge variant={isBlocked ? 'coral' : 'default'}>
                        {t.status}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      {t.dependencies.map((dep, idx) => {
                        const pred = tasks.find((item) => item.id === dep.taskId);
                        const isPredDone = pred?.status === 'done';

                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 bg-[#181B18] border border-[#2A2E2A] text-[10px]"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-[#969B92]">Prerequisite:</span>
                              <span className="text-[#79B8FF] font-bold">
                                {pred ? `${pred.wbsCode} ${pred.title}` : dep.taskId}
                              </span>
                            </div>
                            <span
                              className={`font-bold ${
                                isPredDone ? 'text-[#C6FF54]' : 'text-[#FF8B45]'
                              }`}
                            >
                              {isPredDone ? 'COMPLETED (UNBLOCKED)' : 'PENDING'}
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

      {/* Add / Edit Issue Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingIssue ? `EDIT ISSUE: ${editingIssue.id}` : 'LOG NEW REALIZED ISSUE'}
        size="lg"
      >
        <div className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              ISSUE TITLE
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
                SEVERITY
              </label>
              <select
                value={form.severity}
                onChange={(e) => setForm({ ...form, severity: e.target.value as any })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              >
                <option value="critical">Critical (Blocks Milestone)</option>
                <option value="high">High (Sprint Risk)</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                OWNER
              </label>
              <select
                value={form.owner}
                onChange={(e) => setForm({ ...form, owner: e.target.value })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              >
                {team.map((m) => (
                  <option key={m.id} value={`${m.name} (${m.role})`}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                RESOLUTION TARGET DUE
              </label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              DETAILED PROBLEM DESCRIPTION
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none font-sans text-xs"
            />
          </div>

          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              PROPOSED RESOLUTION PLAN
            </label>
            <textarea
              rows={2}
              value={form.resolutionPlan}
              onChange={(e) => setForm({ ...form, resolutionPlan: e.target.value })}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none font-sans text-xs"
            />
          </div>

          <div className="pt-3 border-t border-[#2A2E2A] flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="lime" size="sm" onClick={handleSave}>
              SAVE ISSUE RECORD
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
