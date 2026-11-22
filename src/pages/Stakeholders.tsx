import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import {
  Compass,
  Users,
  Grid,
  Radio,
  Plus,
  Edit2,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  Shield,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import type { Stakeholder } from '../types';

export function Stakeholders() {
  const { addToast } = useToast();
  const { stakeholders, addStakeholder, updateStakeholder, deleteStakeholder } = useProjectStore();

  const [activeTab, setActiveTab] = useState<'matrix' | 'register'>('matrix');
  const [editingStakeholder, setEditingStakeholder] = useState<Stakeholder | null>(null);
  const [isNewStakeholder, setIsNewStakeholder] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Power-Interest Quadrants
  // High Influence / High Interest: Manage Closely
  const manageClosely = stakeholders.filter(
    (s) => s.influence === 'high' && (s.interest === 'high' || s.interest === 'medium')
  );
  // High Influence / Low Interest: Keep Satisfied
  const keepSatisfied = stakeholders.filter(
    (s) => s.influence === 'high' && s.interest === 'low'
  );
  // Low Influence / High Interest: Keep Informed
  const keepInformed = stakeholders.filter(
    (s) => (s.influence === 'low' || s.influence === 'medium') && s.interest === 'high'
  );
  // Low Influence / Low Interest: Monitor
  const monitor = stakeholders.filter(
    (s) => s.influence === 'low' && (s.interest === 'low' || s.interest === 'medium')
  );

  const handleOpenAdd = () => {
    setIsNewStakeholder(true);
    setEditingStakeholder({
      id: `sh-00${stakeholders.length + 1}`,
      name: '',
      role: '',
      organization: '',
      influence: 'medium',
      interest: 'high',
      engagementLevel: 'supporter',
      communicationPreference: 'Weekly email status summaries',
      keyConcerns: ['Project schedule', 'Quality'],
      notes: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (sh: Stakeholder) => {
    setIsNewStakeholder(false);
    setEditingStakeholder({ ...sh });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!editingStakeholder) return;
    if (!editingStakeholder.name.trim()) {
      addToast('Please enter a stakeholder name.', 'error');
      return;
    }
    if (isNewStakeholder) {
      addStakeholder(editingStakeholder);
      addToast(`Added new stakeholder: ${editingStakeholder.name}`, 'success');
    } else {
      updateStakeholder(editingStakeholder.id, editingStakeholder);
      addToast(`Updated stakeholder engagement: ${editingStakeholder.name}`, 'success');
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-1.5 py-0.5 bg-[#C6FF54]/5">
              STAKEHOLDER ENGAGEMENT GOVERNANCE
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              POWER-INTEREST GRID & ACTION PLANS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            STAKEHOLDER MANAGEMENT
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Systematic stakeholder analysis ensuring municipal authorities, executive sponsors,
            academic partners, and local pedestrians receive tailored communication.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center border border-[#2A2E2A] bg-[#141714]">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                activeTab === 'matrix'
                  ? 'bg-[#202420] text-[#C6FF54]'
                  : 'text-[#969B92] hover:text-[#F1F0E8]'
              }`}
            >
              POWER-INTEREST GRID
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                activeTab === 'register'
                  ? 'bg-[#202420] text-[#C6FF54]'
                  : 'text-[#969B92] hover:text-[#F1F0E8]'
              }`}
            >
              STAKEHOLDER REGISTER
            </button>
          </div>
          <Button variant="lime" size="sm" onClick={handleOpenAdd}>
            <Plus size={13} />
            <span>ADD STAKEHOLDER</span>
          </Button>
        </div>
      </div>

      {/* TAB: POWER-INTEREST GRID (2x2 MATRIX) */}
      {activeTab === 'matrix' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quadrant 1: Manage Closely (High Power, High Interest) */}
            <div className="bg-[#181B18] border-2 border-[#C6FF54]/40 p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#2A2E2A] pb-2">
                <span className="font-bold text-[#C6FF54] text-xs">
                  MANAGE CLOSELY (HIGH POWER / HIGH INTEREST)
                </span>
                <span className="text-[10px] text-[#969B92] bg-[#141714] px-1.5 border border-[#2A2E2A]">
                  {manageClosely.length} KEY PLAYERS
                </span>
              </div>
              <p className="text-[11px] text-[#969B92] font-sans">
                Critical decision-makers requiring daily to weekly direct collaboration and approval sign-off.
              </p>

              <div className="space-y-2">
                {manageClosely.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleOpenEdit(s)}
                    className="p-3 bg-[#141714] border border-[#2A2E2A] hover:border-[#C6FF54] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#F1F0E8]">{s.name}</span>
                      <Badge variant="lime">{s.engagementLevel}</Badge>
                    </div>
                    <div className="text-[10px] text-[#79B8FF] mt-0.5">{s.role}</div>
                    <div className="text-[10px] text-[#969B92] mt-1 truncate">
                      ↳ Cadence: {s.communicationPreference}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quadrant 2: Keep Satisfied (High Power, Low Interest) */}
            <div className="bg-[#181B18] border border-[#FF8B45]/40 p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#2A2E2A] pb-2">
                <span className="font-bold text-[#FF8B45] text-xs">
                  KEEP SATISFIED (HIGH POWER / LOW INTEREST)
                </span>
                <span className="text-[10px] text-[#969B92] bg-[#141714] px-1.5 border border-[#2A2E2A]">
                  {keepSatisfied.length} STAKEHOLDERS
                </span>
              </div>
              <p className="text-[11px] text-[#969B92] font-sans">
                Regulatory and institutional bodies that must be kept compliant and satisfied without overwhelming detail.
              </p>

              <div className="space-y-2">
                {keepSatisfied.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleOpenEdit(s)}
                    className="p-3 bg-[#141714] border border-[#2A2E2A] hover:border-[#FF8B45] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#F1F0E8]">{s.name}</span>
                      <Badge variant="orange">{s.engagementLevel}</Badge>
                    </div>
                    <div className="text-[10px] text-[#FF8B45] mt-0.5">{s.role}</div>
                    <div className="text-[10px] text-[#969B92] mt-1 truncate">
                      ↳ Cadence: {s.communicationPreference}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quadrant 3: Keep Informed (Low Power, High Interest) */}
            <div className="bg-[#181B18] border border-[#79B8FF]/40 p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#2A2E2A] pb-2">
                <span className="font-bold text-[#79B8FF] text-xs">
                  KEEP INFORMED (LOW POWER / HIGH INTEREST)
                </span>
                <span className="text-[10px] text-[#969B92] bg-[#141714] px-1.5 border border-[#2A2E2A]">
                  {keepInformed.length} ADVOCATES
                </span>
              </div>
              <p className="text-[11px] text-[#969B92] font-sans">
                Community groups and end-users who provide critical feedback and grassroots adoption advocacy.
              </p>

              <div className="space-y-2">
                {keepInformed.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleOpenEdit(s)}
                    className="p-3 bg-[#141714] border border-[#2A2E2A] hover:border-[#79B8FF] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#F1F0E8]">{s.name}</span>
                      <Badge variant="blue">{s.engagementLevel}</Badge>
                    </div>
                    <div className="text-[10px] text-[#79B8FF] mt-0.5">{s.role}</div>
                    <div className="text-[10px] text-[#969B92] mt-1 truncate">
                      ↳ Cadence: {s.communicationPreference}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quadrant 4: Monitor (Low Power, Low Interest) */}
            <div className="bg-[#181B18] border border-[#2A2E2A] p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#2A2E2A] pb-2">
                <span className="font-bold text-[#969B92] text-xs">
                  MONITOR (LOW POWER / LOW INTEREST)
                </span>
                <span className="text-[10px] text-[#5F655B] bg-[#141714] px-1.5 border border-[#2A2E2A]">
                  {monitor.length} OBSERVERS
                </span>
              </div>
              <p className="text-[11px] text-[#969B92] font-sans">
                General public and peripheral academic observers requiring minimal engagement effort.
              </p>

              <div className="space-y-2">
                {monitor.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => handleOpenEdit(s)}
                    className="p-3 bg-[#141714] border border-[#2A2E2A] hover:border-[#969B92] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#F1F0E8]">{s.name}</span>
                      <Badge variant="default">{s.engagementLevel}</Badge>
                    </div>
                    <div className="text-[10px] text-[#969B92] mt-0.5">{s.role}</div>
                    <div className="text-[10px] text-[#969B92] mt-1 truncate">
                      ↳ Cadence: {s.communicationPreference}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: STAKEHOLDER REGISTER TABLE */}
      {activeTab === 'register' && (
        <div className="bg-[#181B18] border border-[#2A2E2A] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#141714] border-b border-[#2A2E2A] text-[10px] text-[#969B92] uppercase">
              <tr>
                <th className="p-3">Stakeholder</th>
                <th className="p-3">Organization & Role</th>
                <th className="p-3">Power / Interest</th>
                <th className="p-3">Engagement Strategy</th>
                <th className="p-3">Key Concerns</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E2A]">
              {stakeholders.map((s) => (
                <tr key={s.id} className="hover:bg-[#202420] transition-colors">
                  <td className="p-3 font-semibold text-[#F1F0E8]">{s.name}</td>
                  <td className="p-3">
                    <div className="text-[#C6FF54]">{s.organization}</div>
                    <div className="text-[10px] text-[#969B92]">{s.role}</div>
                  </td>
                  <td className="p-3">
                    <span className="text-[#F1F0E8] font-bold">P:{s.influence.toUpperCase()}</span>
                    <span className="text-[#969B92]"> / I:{s.interest.toUpperCase()}</span>
                  </td>
                  <td className="p-3 max-w-xs text-[#969B92] text-[11px] truncate">
                    {s.communicationPreference}
                  </td>
                  <td className="p-3 text-[10px] text-[#969B92]">
                    {s.keyConcerns.join(', ')}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button variant="outline" size="xs" onClick={() => handleOpenEdit(s)}>
                        EDIT PLAN
                      </Button>
                      <Button
                        variant="secondary"
                        size="xs"
                        onClick={() => {
                          deleteStakeholder(s.id);
                          addToast(`Deleted stakeholder: ${s.name}`, 'info');
                        }}
                        className="hover:text-[#FF5E5E]"
                      >
                        DELETE
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit/Add Stakeholder Engagement Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isNewStakeholder ? 'REGISTER NEW STAKEHOLDER' : (editingStakeholder ? `STAKEHOLDER ENGAGEMENT: ${editingStakeholder.name}` : '')}
        size="md"
      >
        {editingStakeholder && (
          <div className="space-y-4 font-mono text-xs">
            {isNewStakeholder && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                      STAKEHOLDER NAME
                    </label>
                    <input
                      type="text"
                      value={editingStakeholder.name}
                      onChange={(e) =>
                        setEditingStakeholder({ ...editingStakeholder, name: e.target.value })
                      }
                      placeholder="e.g. Dr. Ramesh Kumar"
                      className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                      ORGANIZATION
                    </label>
                    <input
                      type="text"
                      value={editingStakeholder.organization}
                      onChange={(e) =>
                        setEditingStakeholder({ ...editingStakeholder, organization: e.target.value })
                      }
                      placeholder="e.g. BBMP Traffic Planning"
                      className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                      PROJECT ROLE
                    </label>
                    <input
                      type="text"
                      value={editingStakeholder.role}
                      onChange={(e) =>
                        setEditingStakeholder({ ...editingStakeholder, role: e.target.value })
                      }
                      placeholder="e.g. Executive Sponsor"
                      className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                      INFLUENCE (POWER)
                    </label>
                    <select
                      value={editingStakeholder.influence}
                      onChange={(e) =>
                        setEditingStakeholder({ ...editingStakeholder, influence: e.target.value as any })
                      }
                      className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                      INTEREST
                    </label>
                    <select
                      value={editingStakeholder.interest}
                      onChange={(e) =>
                        setEditingStakeholder({ ...editingStakeholder, interest: e.target.value as any })
                      }
                      className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                ENGAGEMENT LEVEL
              </label>
              <select
                value={editingStakeholder.engagementLevel}
                onChange={(e) =>
                  setEditingStakeholder({
                    ...editingStakeholder,
                    engagementLevel: e.target.value as any,
                  })
                }
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              >
                <option value="champion">Champion</option>
                <option value="supporter">Supporter</option>
                <option value="neutral">Neutral</option>
                <option value="resistant">Resistant</option>
                <option value="blocker">Blocker</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                COMMUNICATION PREFERENCE & CADENCE
              </label>
              <input
                type="text"
                value={editingStakeholder.communicationPreference}
                onChange={(e) =>
                  setEditingStakeholder({
                    ...editingStakeholder,
                    communicationPreference: e.target.value,
                  })
                }
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                ENGAGEMENT STRATEGY & NOTES
              </label>
              <textarea
                rows={3}
                value={editingStakeholder.notes}
                onChange={(e) =>
                  setEditingStakeholder({
                    ...editingStakeholder,
                    notes: e.target.value,
                  })
                }
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none font-sans text-xs"
              />
            </div>

            <div className="pt-3 border-t border-[#2A2E2A] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
                CANCEL
              </Button>
              <Button variant="lime" size="sm" onClick={handleSave}>
                {isNewStakeholder ? 'CREATE STAKEHOLDER' : 'SAVE ENGAGEMENT PLAN'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
