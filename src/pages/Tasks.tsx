import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import {
  CheckSquare,
  LayoutGrid,
  List,
  Calendar as CalendarIcon,
  Plus,
  Search,
  Filter,
  User,
  Clock,
  AlertTriangle,
  ArrowRight,
  MessageSquare,
  Edit2,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';
import type { Task, TaskStatus, Priority } from '../types';

export function Tasks() {
  const { addToast } = useToast();
  const { tasks, team, addTask, updateTask, deleteTask, logActivity } = useProjectStore();

  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'calendar'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [activeTaskForComment, setActiveTaskForComment] = useState<Task | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [form, setForm] = useState({
    wbsCode: '4.2',
    title: '',
    description: '',
    status: 'todo' as TaskStatus,
    priority: 'high' as Priority,
    assigneeId: 'tm-03',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    estimatedHours: 16,
    actualHours: 0,
    deliverable: '',
    workPackageId: 'wp-04-2',
  });

  const columns: { id: TaskStatus; label: string; color: string }[] = [
    { id: 'backlog', label: 'BACKLOG', color: '#5F655B' },
    { id: 'todo', label: 'TO DO', color: '#969B92' },
    { id: 'in-progress', label: 'IN PROGRESS', color: '#79B8FF' },
    { id: 'blocked', label: 'BLOCKED', color: '#FF5E5E' },
    { id: 'review', label: 'IN REVIEW', color: '#FF8B45' },
    { id: 'done', label: 'COMPLETED', color: '#C6FF54' },
  ];

  // Filtering
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.wbsCode.includes(searchQuery) ||
      (t.deliverable && t.deliverable.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesAssignee = assigneeFilter === 'all' || t.assigneeId === assigneeFilter;

    return matchesSearch && matchesPriority && matchesStatus && matchesAssignee;
  });

  const handleOpenAdd = () => {
    setEditingTask(null);
    setForm({
      wbsCode: '4.2',
      title: '',
      description: '',
      status: 'todo',
      priority: 'high',
      assigneeId: 'tm-03',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      estimatedHours: 16,
      actualHours: 0,
      deliverable: '',
      workPackageId: 'wp-04-2',
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setForm({
      wbsCode: task.wbsCode,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      assigneeId: task.assigneeId,
      startDate: task.startDate,
      dueDate: task.dueDate,
      estimatedHours: task.estimatedHours,
      actualHours: task.actualHours,
      deliverable: task.deliverable || '',
      workPackageId: task.workPackageId,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      addToast('Please enter a task title.', 'error');
      return;
    }

    if (editingTask) {
      updateTask(editingTask.id, form);
      logActivity({
        timestamp: new Date().toISOString(),
        actor: 'Rahul Sharma',
        entityType: 'Task',
        entityId: editingTask.id,
        action: 'Updated',
        details: `Task updated: ${form.title}`,
      });
      addToast(`Updated task ${form.wbsCode}: ${form.title}`, 'success');
    } else {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        ...form,
        dependencies: [],
        comments: [],
        tags: ['manual-task'],
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      addTask(newTask);
      logActivity({
        timestamp: new Date().toISOString(),
        actor: 'Rahul Sharma',
        entityType: 'Task',
        entityId: newTask.id,
        action: 'Created',
        details: `Task created: ${newTask.title}`,
      });
      addToast(`Created task ${form.wbsCode}: ${form.title}`, 'success');
    }
    setModalOpen(false);
  };

  const handleStatusChange = (task: Task, newStatus: TaskStatus) => {
    updateTask(task.id, { status: newStatus });
    logActivity({
      timestamp: new Date().toISOString(),
      actor: 'Rahul Sharma',
      entityType: 'Task',
      entityId: task.id,
      action: 'StatusChange',
      details: `Moved ${task.wbsCode} to ${newStatus.toUpperCase()}`,
    });
    addToast(`Moved ${task.wbsCode} to ${newStatus.toUpperCase()}`, 'info');
  };

  const handleDelete = (id: string, code: string) => {
    if (window.confirm(`Delete task ${code}?`)) {
      deleteTask(id);
      logActivity({
        timestamp: new Date().toISOString(),
        actor: 'Rahul Sharma',
        entityType: 'Task',
        entityId: id,
        action: 'Deleted',
        details: `Deleted task ${code}`,
      });
      addToast(`Task ${code} deleted.`, 'info');
    }
  };

  const handleAddComment = () => {
    if (!activeTaskForComment || !newCommentText.trim()) return;
    const comment = {
      id: `comm-${Date.now()}`,
      authorId: 'tm-01',
      text: newCommentText.trim(),
      timestamp: new Date().toISOString(),
    };
    const updated = {
      ...activeTaskForComment,
      comments: [...activeTaskForComment.comments, comment],
    };
    updateTask(activeTaskForComment.id, { comments: updated.comments });
    setActiveTaskForComment(updated);
    setNewCommentText('');
    addToast('Comment logged on task record.', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Title & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-1.5 py-0.5 bg-[#C6FF54]/5">
              HYBRID EXECUTION TRACKER
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              TOTAL RECORD COUNT: {tasks.length}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            TASK MANAGEMENT
          </h1>
          <p className="text-xs text-[#969B92] mt-1 max-w-2xl">
            Operational work board tracking sprint stories, architecture spikes,
            field surveys, and quality assurance tickets with full audit trails.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Buttons */}
          <div className="flex items-center border border-[#2A2E2A] bg-[#141714]">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-2 transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-[#202420] text-[#C6FF54]'
                  : 'text-[#969B92] hover:text-[#F1F0E8]'
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid size={14} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#202420] text-[#C6FF54]'
                  : 'text-[#969B92] hover:text-[#F1F0E8]'
              }`}
              title="List View"
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`p-2 transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-[#202420] text-[#C6FF54]'
                  : 'text-[#969B92] hover:text-[#F1F0E8]'
              }`}
              title="Calendar Schedule View"
            >
              <CalendarIcon size={14} />
            </button>
          </div>

          <Button variant="lime" size="sm" onClick={handleOpenAdd}>
            <Plus size={13} />
            <span>CREATE TASK</span>
          </Button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-[#181B18] border border-[#2A2E2A] p-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Search size={14} className="text-[#5F655B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, deliverable, or WBS code..."
            className="w-full bg-[#101210] border border-[#2A2E2A] px-2.5 py-1.5 text-xs text-[#F1F0E8] focus:outline-none focus:border-[#C6FF54]"
          />
        </div>

        <div className="flex items-center gap-2">
          {/* Priority */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="bg-[#101210] border border-[#2A2E2A] px-2 py-1.5 text-xs text-[#969B92] focus:outline-none"
          >
            <option value="all">Priority: All</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#101210] border border-[#2A2E2A] px-2 py-1.5 text-xs text-[#969B92] focus:outline-none"
          >
            <option value="all">Status: All</option>
            <option value="backlog">Backlog</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="review">In Review</option>
            <option value="done">Completed</option>
          </select>

          {/* Assignee */}
          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
            className="bg-[#101210] border border-[#2A2E2A] px-2 py-1.5 text-xs text-[#969B92] focus:outline-none"
          >
            <option value="all">Assignee: All</option>
            {team.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* VIEW: KANBAN BOARD */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 overflow-x-auto pb-4">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);

            return (
              <div
                key={col.id}
                className="bg-[#141714] border border-[#2A2E2A] flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className="p-2.5 border-b border-[#2A2E2A] bg-[#181B18] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold">
                    <span className="w-2 h-2" style={{ backgroundColor: col.color }} />
                    <span className="text-[#F1F0E8]">{col.label}</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#969B92] bg-[#101210] border border-[#2A2E2A] px-1.5">
                    {colTasks.length}
                  </span>
                </div>

                {/* Task Cards Container */}
                <div className="p-2 flex-1 space-y-2 overflow-y-auto">
                  {colTasks.map((t) => {
                    const assignedMember = team.find((m) => m.id === t.assigneeId);
                    const isOverdue = t.dueDate < '2026-11-22' && t.status !== 'done';

                    return (
                      <div
                        key={t.id}
                        className="bg-[#181B18] border border-[#2A2E2A] hover:border-[#969B92] p-2.5 space-y-2 text-xs transition-colors flex flex-col justify-between"
                      >
                        <div>
                          {/* WBS Code & Priority */}
                          <div className="flex items-center justify-between font-mono text-[9px] mb-1">
                            <span className="text-[#C6FF54] font-bold">{t.wbsCode}</span>
                            <span
                              className={`uppercase font-bold ${
                                t.priority === 'critical'
                                  ? 'text-[#FF5E5E]'
                                  : t.priority === 'high'
                                  ? 'text-[#FF8B45]'
                                  : 'text-[#969B92]'
                              }`}
                            >
                              {t.priority}
                            </span>
                          </div>

                          <div className="font-semibold text-[#F1F0E8] leading-tight">
                            {t.title}
                          </div>

                          {t.deliverable && (
                            <div className="text-[10px] text-[#79B8FF] truncate mt-1">
                              ↳ {t.deliverable}
                            </div>
                          )}
                        </div>

                        {/* Meta & Quick Transitions */}
                        <div className="pt-2 border-t border-[#2A2E2A] flex items-center justify-between font-mono text-[10px] text-[#969B92]">
                          <span className="flex items-center gap-1">
                            <User size={10} />
                            {assignedMember?.avatar || 'Unassigned'}
                          </span>

                          <span
                            className={isOverdue ? 'text-[#FF5E5E] font-bold' : ''}
                            title={`Due: ${t.dueDate}`}
                          >
                            {t.dueDate.slice(5)}
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setActiveTaskForComment(t);
                                setCommentsModalOpen(true);
                              }}
                              className="text-[#969B92] hover:text-[#C6FF54] p-0.5"
                              title="Comments"
                            >
                              <MessageSquare size={11} />
                            </button>
                            <button
                              onClick={() => handleOpenEdit(t)}
                              className="text-[#969B92] hover:text-[#F1F0E8] p-0.5"
                              title="Edit"
                            >
                              <Edit2 size={11} />
                            </button>
                            <button
                              onClick={() => handleDelete(t.id, t.wbsCode)}
                              className="text-[#969B92] hover:text-[#FF5E5E] p-0.5"
                              title="Delete"
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>

                        {/* Quick Move Buttons */}
                        <div className="pt-1 flex items-center gap-1 justify-between text-[8px] font-mono text-[#5F655B]">
                          {col.id !== 'todo' && col.id !== 'backlog' && (
                            <button
                              onClick={() => handleStatusChange(t, 'todo')}
                              className="hover:text-[#F1F0E8]"
                            >
                              ← ToDo
                            </button>
                          )}
                          {col.id !== 'in-progress' && (
                            <button
                              onClick={() => handleStatusChange(t, 'in-progress')}
                              className="hover:text-[#79B8FF]"
                            >
                              Progress
                            </button>
                          )}
                          {col.id !== 'blocked' && (
                            <button
                              onClick={() => handleStatusChange(t, 'blocked')}
                              className="hover:text-[#FF5E5E]"
                            >
                              Block
                            </button>
                          )}
                          {col.id !== 'done' && (
                            <button
                              onClick={() => handleStatusChange(t, 'done')}
                              className="hover:text-[#C6FF54]"
                            >
                              Done →
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW: LIST VIEW */}
      {viewMode === 'list' && (
        <div className="bg-[#181B18] border border-[#2A2E2A] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#141714] border-b border-[#2A2E2A] text-[10px] text-[#969B92] uppercase">
              <tr>
                <th className="p-3">WBS</th>
                <th className="p-3">Task Title & Deliverable</th>
                <th className="p-3">Assignee</th>
                <th className="p-3">Priority</th>
                <th className="p-3">Status</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Effort</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E2A]">
              {filteredTasks.map((t) => {
                const assignedMember = team.find((m) => m.id === t.assigneeId);
                const isOverdue = t.dueDate < '2026-11-22' && t.status !== 'done';

                return (
                  <tr key={t.id} className="hover:bg-[#202420] transition-colors">
                    <td className="p-3 font-bold text-[#C6FF54]">{t.wbsCode}</td>
                    <td className="p-3 max-w-md">
                      <div className="font-semibold text-[#F1F0E8]">{t.title}</div>
                      {t.deliverable && (
                        <div className="text-[10px] text-[#79B8FF] truncate">
                          ↳ {t.deliverable}
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-[#969B92]">
                      {assignedMember ? `${assignedMember.name} (${assignedMember.avatar})` : 'Unassigned'}
                    </td>
                    <td className="p-3">
                      <Badge
                        variant={
                          t.priority === 'critical'
                            ? 'coral'
                            : t.priority === 'high'
                            ? 'orange'
                            : 'default'
                        }
                      >
                        {t.priority}
                      </Badge>
                    </td>
                    <td className="p-3">
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
                    </td>
                    <td className={`p-3 ${isOverdue ? 'text-[#FF5E5E] font-bold' : 'text-[#969B92]'}`}>
                      {t.dueDate}
                    </td>
                    <td className="p-3 text-[#969B92]">
                      {t.actualHours || t.estimatedHours}h
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => {
                          setActiveTaskForComment(t);
                          setCommentsModalOpen(true);
                        }}
                        className="text-[#969B92] hover:text-[#C6FF54]"
                        title="Comments"
                      >
                        <MessageSquare size={13} />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(t)}
                        className="text-[#969B92] hover:text-[#F1F0E8]"
                        title="Edit"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id, t.wbsCode)}
                        className="text-[#969B92] hover:text-[#FF5E5E]"
                        title="Delete"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* VIEW: CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <div className="bg-[#181B18] border border-[#2A2E2A] p-4 font-mono text-xs">
          <div className="flex items-center justify-between mb-4 border-b border-[#2A2E2A] pb-3">
            <h3 className="font-bold text-[#F1F0E8] text-sm">
              DELIVERY SCHEDULE BY DUE DATES (OCT – NOV 2026)
            </h3>
            <span className="text-[#969B92] text-[10px]">
              Showing due dates across project execution window
            </span>
          </div>

          <div className="space-y-3">
            {filteredTasks
              .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
              .map((t) => (
                <div
                  key={t.id}
                  className="p-3 border border-[#2A2E2A] bg-[#141714] flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#79B8FF] font-bold w-24 shrink-0">
                      {t.dueDate}
                    </span>
                    <span className="text-[#C6FF54] font-bold w-12 shrink-0">
                      {t.wbsCode}
                    </span>
                    <span className="text-[#F1F0E8]">{t.title}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge variant={t.status === 'done' ? 'lime' : 'default'}>
                      {t.status}
                    </Badge>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Add / Edit Task Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTask ? 'EDIT TASK RECORD' : 'CREATE NEW TASK RECORD'}
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
                value={form.wbsCode}
                onChange={(e) => setForm({ ...form, wbsCode: e.target.value })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                PRIORITY
              </label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as any })}
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
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] text-[#969B92] uppercase mb-1">
              DESCRIPTION
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none font-sans"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                ASSIGNEE
              </label>
              <select
                value={form.assigneeId}
                onChange={(e) => setForm({ ...form, assigneeId: e.target.value })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              >
                {team.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                STATUS
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
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
                EST. HOURS
              </label>
              <input
                type="number"
                value={form.estimatedHours}
                onChange={(e) => setForm({ ...form, estimatedHours: Number(e.target.value) })}
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
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#969B92] uppercase mb-1">
                DUE DATE
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
              DELIVERABLE
            </label>
            <input
              type="text"
              value={form.deliverable}
              onChange={(e) => setForm({ ...form, deliverable: e.target.value })}
              placeholder="e.g. Verified Pedestrian Sidewalk GeoJSON"
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-[#2A2E2A] flex justify-end gap-2">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              CANCEL
            </Button>
            <Button variant="lime" size="sm" onClick={handleSave}>
              SAVE TASK
            </Button>
          </div>
        </div>
      </Modal>

      {/* Task Comments Modal */}
      <Modal
        open={commentsModalOpen}
        onClose={() => setCommentsModalOpen(false)}
        title={activeTaskForComment ? `COMMENTS & AUDIT · ${activeTaskForComment.wbsCode}` : 'TASK COMMENTS'}
        size="md"
      >
        <div className="space-y-4 font-mono text-xs">
          <div className="max-h-60 overflow-y-auto space-y-2">
            {activeTaskForComment && activeTaskForComment.comments.length > 0 ? (
              activeTaskForComment.comments.map((c) => (
                <div key={c.id} className="p-2.5 bg-[#141714] border border-[#2A2E2A] space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-[#969B92]">
                    <span className="text-[#C6FF54] font-bold">Rahul Sharma (PM)</span>
                    <span>{c.timestamp.slice(0, 16).replace('T', ' ')}</span>
                  </div>
                  <div className="text-xs text-[#F1F0E8] font-sans">{c.text}</div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-xs text-[#969B92]">
                No comments or audit notes on this task yet.
              </div>
            )}
          </div>

          <div className="space-y-2 pt-2 border-t border-[#2A2E2A]">
            <textarea
              rows={2}
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Add project management observation or technical note..."
              className="w-full bg-[#101210] border border-[#2A2E2A] p-2 text-[#F1F0E8] focus:border-[#C6FF54] focus:outline-none font-sans text-xs"
            />
            <div className="flex justify-end">
              <Button variant="lime" size="xs" onClick={handleAddComment}>
                LOG COMMENT
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
