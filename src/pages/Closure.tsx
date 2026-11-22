import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import {
  CheckCircle2,
  FileCheck,
  Award,
  Wallet,
  Clock,
  Archive,
  BookOpen,
  Send,
  Plus,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import { formatCurrency } from '../utils/calculations';
import type { LessonLearned } from '../types';

export function Closure() {
  const { addToast } = useToast();
  const {
    lessonsLearned,
    addLessonLearned,
    expenses,
    tasks,
    charterStatus,
  } = useProjectStore();

  const [activeTab, setActiveTab] = useState<'checklist' | 'lessons' | 'handover'>('checklist');
  const [closureSignoffDone, setClosureSignoffDone] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [newLesson, setNewLesson] = useState({
    category: 'Technical',
    description: '',
    impact: 'positive' as 'positive' | 'negative',
    recommendation: '',
    author: 'Rahul Sharma (PM)',
  });

  const checklistItems = [
    { id: 'chk-1', title: 'All 7 contracted deliverables verified and signed off by QA', status: 'verified', owner: 'Sneha Iyer (QA Lead)' },
    { id: 'chk-2', title: 'OpenStreetMap enriched GIS sidewalk database handed over to BBMP', status: 'verified', owner: 'Vikram Suresh (GIS)' },
    { id: 'chk-3', title: 'All Severity-1 and Severity-2 defect tickets resolved and closed in backlog', status: 'verified', owner: 'Anjali Mehra (Tech Lead)' },
    { id: 'chk-4', title: 'Final EVM budget reconciliation audit completed (₹11.82L vs ₹12L baseline)', status: 'verified', owner: 'Rahul Sharma (PM)' },
    { id: 'chk-5', title: 'Project closure retrospective conducted; lessons learned archived', status: 'verified', owner: 'Rahul Sharma (PM)' },
    { id: 'chk-6', title: 'Formal Sponsor and BBMP stakeholder sign-off certificates recorded', status: 'verified', owner: 'Priya Nair (Sponsor)' },
  ];

  const handleAddLesson = () => {
    if (!newLesson.description.trim() || !newLesson.recommendation.trim()) {
      addToast('Please enter both observation and recommendation.', 'error');
      return;
    }

    const item: LessonLearned = {
      id: `ll-${Date.now()}`,
      category: newLesson.category,
      description: newLesson.description,
      impact: newLesson.impact,
      recommendation: newLesson.recommendation,
      author: newLesson.author,
      date: new Date().toISOString().split('T')[0],
    };

    addLessonLearned(item);
    addToast('Lesson learned added to organizational knowledge base.', 'success');
    setModalOpen(false);
  };

  const handleSignoff = () => {
    setClosureSignoffDone(true);
    addToast(
      'PROJECT FORMALLY CLOSED. Sponsor sign-off locked into organizational archives.',
      'success'
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Governance */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-1.5 py-0.5 bg-[#C6FF54]/5">
              STAGE-GATE 05 PROJECT CLOSURE
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              FORMAL ADMINISTRATIVE & CONTRACTUAL DISSOLUTION
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            PROJECT CLOSURE
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Formal stage-gate closure procedures ensuring all deliverables are accepted,
            budgets reconciled, operational handover complete, and lessons learned institutionalized.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!closureSignoffDone ? (
            <Button variant="lime" size="sm" onClick={handleSignoff}>
              <CheckCircle2 size={13} />
              <span>FORMAL SPONSOR SIGN-OFF</span>
            </Button>
          ) : (
            <Badge variant="lime" dot>
              PROJECT DISSOLUTION RECORDED
            </Badge>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border border-[#2A2E2A] bg-[#141714] w-fit">
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-3 py-1.5 text-xs font-mono transition-colors ${
            activeTab === 'checklist'
              ? 'bg-[#202420] text-[#C6FF54]'
              : 'text-[#969B92] hover:text-[#F1F0E8]'
          }`}
        >
          CLOSURE CHECKLIST
        </button>
        <button
          onClick={() => setActiveTab('lessons')}
          className={`px-3 py-1.5 text-xs font-mono transition-colors ${
            activeTab === 'lessons'
              ? 'bg-[#202420] text-[#C6FF54]'
              : 'text-[#969B92] hover:text-[#F1F0E8]'
          }`}
        >
          LESSONS LEARNED REGISTER
        </button>
        <button
          onClick={() => setActiveTab('handover')}
          className={`px-3 py-1.5 text-xs font-mono transition-colors ${
            activeTab === 'handover'
              ? 'bg-[#202420] text-[#C6FF54]'
              : 'text-[#969B92] hover:text-[#F1F0E8]'
          }`}
        >
          OPERATIONAL HANDOVER
        </button>
      </div>

      {/* TAB: CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-[#181B18] border border-[#2A2E2A] p-5 space-y-3">
            <div className="border-b border-[#2A2E2A] pb-3 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-[#F1F0E8] text-sm">
                  FINAL ACCEPTANCE & DISSOLUTION CHECKLIST
                </h3>
                <p className="text-[#969B92] text-xs font-sans mt-0.5">
                  All 6 criteria must be verified before formal project dissolution.
                </p>
              </div>
              <Badge variant="lime">6 / 6 VERIFIED</Badge>
            </div>

            <div className="space-y-2">
              {checklistItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-[#141714] border border-[#2A2E2A] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-[#C6FF54] shrink-0" />
                    <div>
                      <span className="font-semibold text-[#F1F0E8]">{item.title}</span>
                      <div className="text-[10px] text-[#969B92] mt-0.5">
                        Verified By: {item.owner}
                      </div>
                    </div>
                  </div>
                  <Badge variant="lime">ACCEPTED</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: LESSONS LEARNED */}
      {activeTab === 'lessons' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="bg-[#181B18] border border-[#2A2E2A] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#2A2E2A] pb-3">
              <div>
                <h3 className="font-bold text-[#F1F0E8] text-sm">
                  ORGANIZATIONAL LESSONS LEARNED ARCHIVE
                </h3>
                <p className="text-[#969B92] text-xs font-sans mt-0.5">
                  Documenting what went well, what failed, and actionable recommendations for future urban pilots.
                </p>
              </div>

              <Button variant="lime" size="xs" onClick={() => setModalOpen(true)}>
                <Plus size={11} />
                <span>ADD LESSON</span>
              </Button>
            </div>

            <div className="space-y-3">
              {lessonsLearned.map((ll) => {
                const isPositive = ll.impact === 'positive';

                return (
                  <div
                    key={ll.id}
                    className={`p-4 border bg-[#141714] space-y-2 ${
                      isPositive ? 'border-[#C6FF54]/30' : 'border-[#FF8B45]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-[#C6FF54]">{ll.category.toUpperCase()}</span>
                      <Badge variant={isPositive ? 'lime' : 'orange'}>
                        {isPositive ? 'SUCCESS PATTERN' : 'CHALLENGE ENCOUNTERED'}
                      </Badge>
                    </div>

                    <div className="text-sm font-semibold text-[#F1F0E8] font-sans">
                      {ll.description}
                    </div>

                    <div className="p-2.5 bg-[#181B18] border border-[#2A2E2A] text-[11px] font-sans">
                      <strong className="text-[#C6FF54] font-mono">Recommendation: </strong>
                      {ll.recommendation}
                    </div>

                    <div className="text-[10px] text-[#5F655B] pt-1">
                      Recorded By: {ll.author} · {ll.date}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB: HANDOVER */}
      {activeTab === 'handover' && (
        <div className="bg-[#181B18] border border-[#2A2E2A] p-6 space-y-5 font-mono text-xs">
          <div className="border-b border-[#2A2E2A] pb-3">
            <h3 className="font-bold text-[#F1F0E8] text-sm">
              OPERATIONAL HANDOVER CERTIFICATE
            </h3>
            <p className="text-[#969B92] text-xs font-sans mt-0.5">
              Formal transition from temporary project delivery team to permanent municipal operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#141714] border border-[#2A2E2A] space-y-2">
              <span className="text-[10px] text-[#C6FF54] font-bold block">
                RECEIVING ENTITY
              </span>
              <div className="text-sm font-bold text-[#F1F0E8]">
                BBMP Urban Planning & GIS Directorate
              </div>
              <div className="text-[#969B92] text-[11px] font-sans">
                Assumes long-term ownership of sidewalk geo-database, community reporting triage, and annual maintenance budget.
              </div>
            </div>

            <div className="p-4 bg-[#141714] border border-[#2A2E2A] space-y-2">
              <span className="text-[10px] text-[#79B8FF] font-bold block">
                TECHNICAL ARTIFACTS DELIVERED
              </span>
              <ul className="text-[#F1F0E8] text-[11px] space-y-1 list-disc pl-4 font-sans">
                <li>Production React Web Application & Map Console Codebase</li>
                <li>PostGIS spatial schema with Bengaluru sidewalk layer</li>
                <li>Operational Runbook & API Integration Guide (v1.0)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="RECORD LESSON LEARNED"
        size="md"
      >
        <div className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              CATEGORY
            </label>
            <select
              value={newLesson.category}
              onChange={(e) => setNewLesson({ ...newLesson, category: e.target.value })}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
            >
              <option value="Planning">Planning & Estimation</option>
              <option value="Technical">Technical & Architecture</option>
              <option value="Stakeholder">Stakeholder & Municipal</option>
              <option value="Quality">Testing & Quality Assurance</option>
              <option value="Budget">Cost & Procurement</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              WHAT HAPPENED? (OBSERVATION)
            </label>
            <textarea
              rows={3}
              value={newLesson.description}
              onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none font-sans text-xs"
            />
          </div>

          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              ACTIONABLE RECOMMENDATION FOR FUTURE PROJECTS
            </label>
            <textarea
              rows={3}
              value={newLesson.recommendation}
              onChange={(e) => setNewLesson({ ...newLesson, recommendation: e.target.value })}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none font-sans text-xs"
            />
          </div>

          <div className="pt-3 border-t border-[#2A2E2A] flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="lime" size="sm" onClick={handleAddLesson}>
              ARCHIVE LESSON
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
