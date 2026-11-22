import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import {
  GitPullRequest,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  ShieldAlert,
  IndianRupee,
  Calendar,
  Plus,
  History,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import type { ChangeRequest, ChangeStatus } from '../types';

export function Changes() {
  const { addToast } = useToast();
  const { changeRequests, addChangeRequest, updateChangeRequest, deleteChangeRequest } = useProjectStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCR, setSelectedCR] = useState<ChangeRequest | null>(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    requesterId: 'BBMP Municipal Infrastructure',
    businessJustification: '',
    scheduleImpact: '+4 days to Sprint 3',
    budgetImpact: 35000,
    resourceImpact: 'Requires 1 additional week of data enrichment',
    riskImpact: 'Minor testing compression risk',
  });

  const handleOpenAdd = () => {
    setForm({
      title: '',
      description: '',
      requesterId: 'BBMP Infrastructure Division',
      businessJustification: '',
      scheduleImpact: '+5 days',
      budgetImpact: 25000,
      resourceImpact: 'Frontend dev 20h',
      riskImpact: 'Testing phase lag risk',
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      addToast('Please enter a change request title.', 'error');
      return;
    }

    const newCR: ChangeRequest = {
      id: `cr-00${changeRequests.length + 1}`,
      ...form,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'submitted',
      linkedTaskIds: ['task-023'],
      auditTrail: [
        {
          timestamp: new Date().toISOString(),
          actor: 'Rahul Sharma (PM)',
          action: 'Submitted',
          details: `Formal change request logged: ${form.title}`,
        },
      ],
    };

    addChangeRequest(newCR);
    addToast(`Change request ${newCR.id} submitted for assessment.`, 'success');
    setModalOpen(false);
  };

  const handleWorkflowTransition = (cr: ChangeRequest, nextStatus: ChangeStatus) => {
    const auditEntry = {
      timestamp: new Date().toISOString(),
      actor: 'Priya Nair (Sponsor)',
      action: `Status transitioned to ${nextStatus.toUpperCase()}`,
      details: `Formal decision recorded by project steering governance.`,
    };

    updateChangeRequest(cr.id, {
      status: nextStatus,
      decisionDate: new Date().toISOString().split('T')[0],
      approverId: 'sh-02',
      auditTrail: [...cr.auditTrail, auditEntry],
    });

    addToast(`Change Request ${cr.id} is now ${nextStatus.toUpperCase()}`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Governance */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-1.5 py-0.5 bg-[#C6FF54]/5">
              FORMAL SCOPE & BASELINE CONTROL
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              INTEGRATED CHANGE CONTROL BOARD (CCB)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            CHANGE REQUEST MANAGEMENT
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Controlled change governance preventing scope creep. Every proposed scope,
            budget, or timeline deviation requires triple-constraint impact assessment.
          </p>
        </div>

        <Button variant="lime" size="sm" onClick={handleOpenAdd}>
          <Plus size={13} />
          <span>SUBMIT CHANGE REQUEST</span>
        </Button>
      </div>

      {/* Change Requests List */}
      <div className="space-y-4 font-mono text-xs">
        {changeRequests.map((cr) => {
          const isApproved = cr.status === 'approved' || cr.status === 'implemented';
          const isReview = cr.status === 'review';
          const isAssessment = cr.status === 'assessment';
          const isRejected = cr.status === 'rejected';

          return (
            <div
              key={cr.id}
              className={`p-5 border bg-[#181B18] space-y-4 ${
                isApproved
                  ? 'border-[#C6FF54]/30'
                  : isRejected
                  ? 'border-[#FF5E5E]/40'
                  : 'border-[#2A2E2A]'
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2A2E2A] pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-bold text-[#C6FF54] px-1.5 py-0.5 border border-[#C6FF54]/30 bg-[#C6FF54]/10">
                    {cr.id}
                  </span>
                  <span className="text-sm font-bold text-[#F1F0E8]">{cr.title}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[#969B92] text-[10px]">
                    Submitted: {cr.submittedDate}
                  </span>
                  <Badge
                    variant={
                      isApproved
                        ? 'lime'
                        : isRejected
                        ? 'coral'
                        : isReview
                        ? 'orange'
                        : 'blue'
                    }
                  >
                    {cr.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              {/* Justification & Description */}
              <div>
                <p className="text-xs text-[#969B92] font-sans leading-relaxed">
                  {cr.description}
                </p>
                <div className="mt-2 text-[11px] text-[#F1F0E8] font-sans">
                  <strong className="text-[#C6FF54] font-mono">Business Need: </strong>
                  {cr.businessJustification}
                </div>
              </div>

              {/* 4-Vector Impact Assessment Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 p-3 bg-[#141714] border border-[#2A2E2A] text-[11px]">
                <div>
                  <div className="text-[9px] text-[#969B92] uppercase flex items-center gap-1">
                    <Calendar size={11} className="text-[#FF8B45]" />
                    <span>SCHEDULE IMPACT</span>
                  </div>
                  <div className="text-[#FF8B45] font-bold mt-0.5">
                    {cr.scheduleImpact}
                  </div>
                </div>

                <div>
                  <div className="text-[9px] text-[#969B92] uppercase flex items-center gap-1">
                    <IndianRupee size={11} className="text-[#C6FF54]" />
                    <span>BUDGET DELTA</span>
                  </div>
                  <div className="text-[#C6FF54] font-bold mt-0.5">
                    +₹{cr.budgetImpact.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-[9px] text-[#969B92] uppercase flex items-center gap-1">
                    <ShieldAlert size={11} className="text-[#79B8FF]" />
                    <span>RISK RATING</span>
                  </div>
                  <div className="text-[#79B8FF] font-bold mt-0.5">
                    {cr.riskImpact}
                  </div>
                </div>

                <div>
                  <div className="text-[9px] text-[#969B92] uppercase">REQUESTER</div>
                  <div className="text-[#F1F0E8] font-bold mt-0.5">
                    {cr.requesterId}
                  </div>
                </div>
              </div>

              {/* Audit Trail & Governance Action Buttons */}
              <div className="pt-2 border-t border-[#2A2E2A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-[10px] text-[#5F655B] flex items-center gap-1">
                  <History size={11} />
                  <span>Audit Trail: {cr.auditTrail.length} entries recorded</span>
                </div>

                {/* Workflow Transitions */}
                <div className="flex items-center gap-2">
                  {isAssessment && (
                    <Button
                      variant="secondary"
                      size="xs"
                      onClick={() => handleWorkflowTransition(cr, 'review')}
                    >
                      FORWARD TO CCB REVIEW
                    </Button>
                  )}

                  {isReview && (
                    <>
                      <Button
                        variant="danger"
                        size="xs"
                        onClick={() => handleWorkflowTransition(cr, 'rejected')}
                      >
                        REJECT CHANGE
                      </Button>
                      <Button
                        variant="lime"
                        size="xs"
                        onClick={() => handleWorkflowTransition(cr, 'approved')}
                      >
                        FORMALLY APPROVE (SPONSOR)
                      </Button>
                    </>
                  )}

                  {isApproved && cr.status !== 'implemented' && (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => handleWorkflowTransition(cr, 'implemented')}
                    >
                      MARK IMPLEMENTED
                    </Button>
                  )}

                  <Button
                    variant="secondary"
                    size="xs"
                    onClick={() => {
                      deleteChangeRequest(cr.id);
                      addToast(`Deleted change request ${cr.id}`, 'info');
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

      {/* Submit Change Request Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="SUBMIT FORMAL CHANGE REQUEST (CR)"
        size="lg"
      >
        <div className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              CHANGE TITLE
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Add Kannada language localization to reporting interface"
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              PROPOSED MODIFICATION / EXPANSION
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
              STRATEGIC BUSINESS JUSTIFICATION
            </label>
            <textarea
              rows={2}
              value={form.businessJustification}
              onChange={(e) => setForm({ ...form, businessJustification: e.target.value })}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none font-sans text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                SCHEDULE IMPACT
              </label>
              <input
                type="text"
                value={form.scheduleImpact}
                onChange={(e) => setForm({ ...form, scheduleImpact: e.target.value })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                BUDGET IMPACT (INR ₹)
              </label>
              <input
                type="number"
                value={form.budgetImpact}
                onChange={(e) => setForm({ ...form, budgetImpact: Number(e.target.value) })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[#2A2E2A] flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="lime" size="sm" onClick={handleSave}>
              LOG CHANGE REQUEST
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
