import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import { DEMO_WORK_PACKAGES } from '../data/demoData';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import {
  Layers,
  ChevronDown,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import type { Task, WorkPackage } from '../types';

export function WBS() {
  const { addToast } = useToast();
  const { tasks, team, addTask, updateTask, deleteTask } = useProjectStore();

  const [expandedPackages, setExpandedPackages] = useState<Record<string, boolean>>({
    'wp-01': true,
    'wp-02': true,
    'wp-03': true,
    'wp-04': true,
    'wp-05': true,
    'wp-06': false,
    'wp-07': false,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedWorkPackageId, setSelectedWorkPackageId] = useState<string>('wp-04-2');

  const [taskForm, setTaskForm] = useState({
    wbsCode: '4.2',
    title: '',
    description: '',
    priority: 'high' as Task['priority'],
    status: 'todo' as Task['status'],
    assigneeId: 'tm-03',
    startDate: '2026-10-20',
    dueDate: '2026-10-30',
    estimatedHours: 16,
    deliverable: '',
  });

  const togglePackage = (id: string) => {
    setExpandedPackages((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    DEMO_WORK_PACKAGES.forEach((wp) => {
      all[wp.id] = true;
    });
    setExpandedPackages(all);
  };

  const collapseAll = () => {
    setExpandedPackages({});
  };

  const handleOpenAdd = (workPackageId: string, wbsCode: string) => {
    setEditingTask(null);
    setSelectedWorkPackageId(workPackageId);
    setTaskForm({
      wbsCode,
      title: '',
      description: '',
      priority: 'high',
      status: 'todo',
      assigneeId: 'tm-03',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      estimatedHours: 16,
      deliverable: '',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setSelectedWorkPackageId(task.workPackageId);
    setTaskForm({
      wbsCode: task.wbsCode,
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      assigneeId: task.assigneeId,
      startDate: task.startDate,
      dueDate: task.dueDate,
      estimatedHours: task.estimatedHours,
      deliverable: task.deliverable || '',
    });
    setModalOpen(true);
  };

  const handleSaveTask = () => {
    if (!taskForm.title.trim()) {
      addToast('Task title is required.', 'error');
      return;
    }

    if (editingTask) {
      updateTask(editingTask.id, {
        ...taskForm,
        workPackageId: selectedWorkPackageId,
      });
      addToast(`Updated task ${taskForm.wbsCode}: ${taskForm.title}`, 'success');
    } else {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        ...taskForm,
        actualHours: 0,
        dependencies: [],
        comments: [],
        tags: ['wbs-added'],
        workPackageId: selectedWorkPackageId,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      addTask(newTask);
      addToast(`Added task ${taskForm.wbsCode}: ${taskForm.title}`, 'success');
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string, code: string) => {
    if (window.confirm(`Delete task ${code}? This action cannot be undone.`)) {
      deleteTask(id);
      addToast(`Task ${code} deleted.`, 'info');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-1.5 py-0.5 bg-[#C6FF54]/5">
              100% RULE HIERARCHY
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              DECOMPOSITION DOWN TO WORK PACKAGES & TASKS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            WORK BREAKDOWN STRUCTURE (WBS)
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Hierarchical decomposition of total project scope into manageable work packages
            and measurable deliverables. All scheduled activities link directly to WBS elements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="xs" onClick={expandAll}>
            EXPAND ALL
          </Button>
          <Button variant="secondary" size="xs" onClick={collapseAll}>
            COLLAPSE ALL
          </Button>
        </div>
      </div>

      {/* WBS Tree */}
      <div className="space-y-3 font-mono">
        {DEMO_WORK_PACKAGES.map((wp) => {
          const isExpanded = !!expandedPackages[wp.id];
          const wpTasks = tasks.filter((t) => t.workPackageId.startsWith(wp.id));
          const completedCount = wpTasks.filter((t) => t.status === 'done').length;
          const pct = wpTasks.length ? Math.round((completedCount / wpTasks.length) * 100) : 0;

          return (
            <div key={wp.id} className="border border-[#2A2E2A] bg-[#141714]">
              {/* Level 1 Header */}
              <div
                onClick={() => togglePackage(wp.id)}
                className="p-3 bg-[#181B18] border-b border-[#2A2E2A] flex items-center justify-between cursor-pointer hover:bg-[#1E221E] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <button className="text-[#C6FF54]">
                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                  </button>
                  <span className="text-xs font-bold text-[#C6FF54] px-1.5 py-0.5 border border-[#C6FF54]/30 bg-[#C6FF54]/10">
                    {wp.code}
                  </span>
                  <span className="text-xs font-bold text-[#F1F0E8]">{wp.name}</span>
                  <span className="text-[10px] text-[#969B92] hidden md:inline">
                    · Deliverable: {wp.deliverable}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-[10px]">
                  <span className="text-[#969B92] hidden sm:inline">
                    {completedCount}/{wpTasks.length} Done ({pct}%)
                  </span>
                  <div className="w-16 h-1.5 bg-[#202420] hidden sm:block">
                    <div
                      className="h-full bg-[#C6FF54]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[#79B8FF] font-semibold">{wp.phase}</span>
                </div>
              </div>

              {/* Children (Level 2 Work Packages & Tasks) */}
              {isExpanded && (
                <div className="p-3 space-y-4">
                  {wp.children?.map((child) => {
                    const childTasks = tasks.filter((t) => t.workPackageId === child.id);

                    return (
                      <div
                        key={child.id}
                        className="border border-[#2A2E2A] bg-[#101210] p-3 space-y-3"
                      >
                        {/* Level 2 Sub-package Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2A2E2A] pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-[#79B8FF] px-1.5 py-0.2 border border-[#79B8FF]/30 bg-[#79B8FF]/10">
                              {child.code}
                            </span>
                            <span className="text-xs font-semibold text-[#F1F0E8]">
                              {child.name}
                            </span>
                            <span className="text-[10px] text-[#969B92]">
                              ({child.estimatedDuration}d est)
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-[#969B92] truncate max-w-xs">
                              Output: {child.deliverable}
                            </span>
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => handleOpenAdd(child.id, child.code)}
                            >
                              <Plus size={10} />
                              <span>ADD TASK</span>
                            </Button>
                          </div>
                        </div>

                        {/* Task List under this sub-package */}
                        <div className="space-y-1.5">
                          {childTasks.length > 0 ? (
                            childTasks.map((t) => {
                              const assignedMember = team.find((m) => m.id === t.assigneeId);
                              const isBlocked = t.status === 'blocked';
                              const isDone = t.status === 'done';

                              return (
                                <div
                                  key={t.id}
                                  className={`p-2 border flex flex-col md:flex-row md:items-center justify-between gap-2 transition-colors ${
                                    isBlocked
                                      ? 'border-[#FF5E5E]/40 bg-[#FF5E5E]/5'
                                      : isDone
                                      ? 'border-[#C6FF54]/20 bg-[#C6FF54]/5'
                                      : 'border-[#2A2E2A] bg-[#141714] hover:border-[#5F655B]'
                                  }`}
                                >
                                  {/* Task Info */}
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <span className="text-[10px] text-[#5F655B] font-bold shrink-0">
                                      {t.wbsCode}
                                    </span>
                                    <span
                                      className={`text-xs truncate ${
                                        isDone ? 'line-through text-[#969B92]' : 'text-[#F1F0E8]'
                                      }`}
                                    >
                                      {t.title}
                                    </span>
                                    {isBlocked && (
                                      <span className="font-mono text-[8px] bg-[#FF5E5E]/20 text-[#FF5E5E] border border-[#FF5E5E]/40 px-1 py-0.2 shrink-0">
                                        BLOCKED
                                      </span>
                                    )}
                                  </div>

                                  {/* Meta & Actions */}
                                  <div className="flex items-center gap-3 shrink-0 text-[10px] justify-between md:justify-end">
                                    <span className="text-[#969B92] flex items-center gap-1">
                                      <User size={10} />
                                      {assignedMember?.avatar || 'Unassigned'}
                                    </span>

                                    <span className="text-[#969B92] flex items-center gap-1">
                                      <Clock size={10} />
                                      {t.actualHours || t.estimatedHours}h
                                    </span>

                                    <Badge
                                      variant={
                                        t.status === 'done'
                                          ? 'lime'
                                          : t.status === 'in-progress'
                                          ? 'blue'
                                          : t.status === 'blocked'
                                          ? 'coral'
                                          : 'default'
                                      }
                                    >
                                      {t.status}
                                    </Badge>

                                    <div className="flex items-center gap-1 pl-2 border-l border-[#2A2E2A]">
                                      <button
                                        onClick={() => handleOpenEdit(t)}
                                        className="text-[#969B92] hover:text-[#C6FF54] p-1"
                                        title="Edit Task"
                                      >
                                        <Edit2 size={12} />
                                      </button>
                                      <button
                                        onClick={() => handleDelete(t.id, t.wbsCode)}
                                        className="text-[#969B92] hover:text-[#FF5E5E] p-1"
                                        title="Delete Task"
                                      >
                                        <Trash2 size={12} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-[10px] text-[#5F655B] py-1 italic">
                              No tasks assigned to this work package yet.
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add / Edit Task Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTask ? 'EDIT WBS ACTIVITY' : 'ADD NEW WBS ACTIVITY'}
        subtitle="Decompose work package into assignable task activity"
        size="lg"
      >
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                WBS CODE
              </label>
              <input
                type="text"
                value={taskForm.wbsCode}
                onChange={(e) => setTaskForm({ ...taskForm, wbsCode: e.target.value })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                PRIORITY
              </label>
              <select
                value={taskForm.priority}
                onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value as any })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              TASK TITLE
            </label>
            <input
              type="text"
              value={taskForm.title}
              onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
              placeholder="e.g. Conduct pedestrian street lighting survey"
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              DETAILED DESCRIPTION & SPECIFICATION
            </label>
            <textarea
              rows={3}
              value={taskForm.description}
              onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none font-sans"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                ASSIGNEE
              </label>
              <select
                value={taskForm.assigneeId}
                onChange={(e) => setTaskForm({ ...taskForm, assigneeId: e.target.value })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              >
                {team.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                STATUS
              </label>
              <select
                value={taskForm.status}
                onChange={(e) => setTaskForm({ ...taskForm, status: e.target.value as any })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              >
                <option value="backlog">Backlog</option>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="blocked">Blocked</option>
                <option value="review">In Review</option>
                <option value="done">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                EST. EFFORT (HOURS)
              </label>
              <input
                type="number"
                value={taskForm.estimatedHours}
                onChange={(e) => setTaskForm({ ...taskForm, estimatedHours: Number(e.target.value) })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                START DATE
              </label>
              <input
                type="date"
                value={taskForm.startDate}
                onChange={(e) => setTaskForm({ ...taskForm, startDate: e.target.value })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                DUE DATE
              </label>
              <input
                type="date"
                value={taskForm.dueDate}
                onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              TANGIBLE DELIVERABLE / ARTIFACT
            </label>
            <input
              type="text"
              value={taskForm.deliverable}
              onChange={(e) => setTaskForm({ ...taskForm, deliverable: e.target.value })}
              placeholder="e.g. Verified Sidewalk GIS GeoJSON File"
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-[#2A2E2A] flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="lime" size="sm" onClick={handleSaveTask}>
              {editingTask ? 'UPDATE ACTIVITY' : 'CREATE ACTIVITY'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
