import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Task, Risk, Issue, ChangeRequest, Expense, Sprint,
  Communication, LessonLearned, SimulationScenario, ActivityLog, Stakeholder, TeamMember, Milestone
} from '../types';
import {
  DEMO_TASKS, DEMO_RISKS, DEMO_ISSUES, DEMO_CHANGE_REQUESTS,
  DEMO_EXPENSES, DEMO_SPRINTS, DEMO_COMMUNICATIONS, DEMO_LESSONS_LEARNED,
  DEMO_SIMULATION_SCENARIOS, DEMO_ACTIVITY_LOG, DEMO_STAKEHOLDERS,
  DEMO_TEAM, DEMO_MILESTONES, DEMO_BUDGET_CATEGORIES
} from '../data/demoData';
import type { BudgetCategory } from '../types';

interface ProjectStore {
  tasks: Task[];
  risks: Risk[];
  issues: Issue[];
  changeRequests: ChangeRequest[];
  expenses: Expense[];
  budgetCategories: BudgetCategory[];
  sprints: Sprint[];
  communications: Communication[];
  lessonsLearned: LessonLearned[];
  simulationScenarios: SimulationScenario[];
  activityLog: ActivityLog[];
  stakeholders: Stakeholder[];
  team: TeamMember[];
  milestones: Milestone[];
  charterStatus: 'draft' | 'review' | 'approved' | 'baselined';
  charterData: Record<string, string>;
  simulationScore: number;
  simulationScheduleImpact: number;
  simulationBudgetImpact: number;

  // Task actions
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;

  // Risk actions
  addRisk: (risk: Risk) => void;
  updateRisk: (id: string, updates: Partial<Risk>) => void;
  deleteRisk: (id: string) => void;

  // Issue actions
  addIssue: (issue: Issue) => void;
  updateIssue: (id: string, updates: Partial<Issue>) => void;
  deleteIssue: (id: string) => void;

  // Change request actions
  updateChangeRequest: (id: string, updates: Partial<ChangeRequest>) => void;
  addChangeRequest: (cr: ChangeRequest) => void;
  deleteChangeRequest: (id: string) => void;

  // Expense actions
  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;

  // Sprint actions
  updateSprint: (id: string, updates: Partial<Sprint>) => void;

  // Communication actions
  addCommunication: (comm: Communication) => void;

  // Lessons learned actions
  addLessonLearned: (lesson: LessonLearned) => void;

  // Simulation actions
  activateScenario: (id: string) => void;
  completeScenario: (scenarioId: string, optionId: string) => void;
  resetSimulation: () => void;

  // Charter actions
  updateCharterStatus: (status: 'draft' | 'review' | 'approved' | 'baselined') => void;
  updateCharterData: (data: Record<string, string>) => void;

  // Stakeholder actions
  addStakeholder: (stakeholder: Stakeholder) => void;
  updateStakeholder: (id: string, updates: Partial<Stakeholder>) => void;
  deleteStakeholder: (id: string) => void;

  // Log action
  logActivity: (entry: Omit<ActivityLog, 'id'>) => void;

  // Reset
  resetToDemo: () => void;
}

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      tasks: DEMO_TASKS,
      risks: DEMO_RISKS,
      issues: DEMO_ISSUES,
      changeRequests: DEMO_CHANGE_REQUESTS,
      expenses: DEMO_EXPENSES,
      budgetCategories: DEMO_BUDGET_CATEGORIES,
      sprints: DEMO_SPRINTS,
      communications: DEMO_COMMUNICATIONS,
      lessonsLearned: DEMO_LESSONS_LEARNED,
      simulationScenarios: DEMO_SIMULATION_SCENARIOS,
      activityLog: DEMO_ACTIVITY_LOG,
      stakeholders: DEMO_STAKEHOLDERS,
      team: DEMO_TEAM,
      milestones: DEMO_MILESTONES,
      charterStatus: 'baselined',
      charterData: {},
      simulationScore: 0,
      simulationScheduleImpact: 0,
      simulationBudgetImpact: 0,

      addTask: (task) => set((s) => ({ tasks: [...s.tasks, task] })),
      updateTask: (id, updates) => set((s) => ({
        tasks: s.tasks.map((t) => t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString().split('T')[0] } : t),
      })),
      deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

      addRisk: (risk) => set((s) => ({ risks: [...s.risks, risk] })),
      updateRisk: (id, updates) => set((s) => ({
        risks: s.risks.map((r) => r.id === id ? { ...r, ...updates } : r),
      })),
      deleteRisk: (id) => set((s) => ({ risks: s.risks.filter((r) => r.id !== id) })),

      addIssue: (issue) => set((s) => ({ issues: [...s.issues, issue] })),
      updateIssue: (id, updates) => set((s) => ({
        issues: s.issues.map((i) => i.id === id ? { ...i, ...updates } : i),
      })),
      deleteIssue: (id) => set((s) => ({ issues: s.issues.filter((i) => i.id !== id) })),

      updateChangeRequest: (id, updates) => set((s) => ({
        changeRequests: s.changeRequests.map((cr) => cr.id === id ? { ...cr, ...updates } : cr),
      })),
      addChangeRequest: (cr) => set((s) => ({ changeRequests: [...s.changeRequests, cr] })),
      deleteChangeRequest: (id) => set((s) => ({ changeRequests: s.changeRequests.filter((cr) => cr.id !== id) })),

      addExpense: (expense) => set((s) => ({
        expenses: [expense, ...s.expenses],
        budgetCategories: s.budgetCategories.map((cat) => {
          if (
            cat.name.toLowerCase() === expense.category.toLowerCase() ||
            cat.id === expense.category ||
            expense.category.toLowerCase().includes(cat.name.toLowerCase())
          ) {
            const newActual = cat.actual + expense.amount;
            return {
              ...cat,
              actual: newActual,
              variance: cat.budgeted - newActual,
            };
          }
          return cat;
        }),
      })),
      deleteExpense: (id) => set((s) => {
        const expense = s.expenses.find((e) => e.id === id);
        if (!expense) return {};
        return {
          expenses: s.expenses.filter((e) => e.id !== id),
          budgetCategories: s.budgetCategories.map((cat) => {
            if (
              cat.name.toLowerCase() === expense.category.toLowerCase() ||
              cat.id === expense.category ||
              expense.category.toLowerCase().includes(cat.name.toLowerCase())
            ) {
              const newActual = Math.max(0, cat.actual - expense.amount);
              return {
                ...cat,
                actual: newActual,
                variance: cat.budgeted - newActual,
              };
            }
            return cat;
          }),
        };
      }),

      updateSprint: (id, updates) => set((s) => ({
        sprints: s.sprints.map((sp) => sp.id === id ? { ...sp, ...updates } : sp),
      })),

      addCommunication: (comm) => set((s) => ({ communications: [...s.communications, comm] })),

      addLessonLearned: (lesson) => set((s) => ({ lessonsLearned: [...s.lessonsLearned, lesson] })),

      activateScenario: (id) => set((s) => ({
        simulationScenarios: s.simulationScenarios.map((sc) =>
          sc.id === id ? { ...sc, isActive: true } : { ...sc, isActive: false }
        ),
      })),

      completeScenario: (scenarioId, optionId) => set((s) => {
        const scenario = s.simulationScenarios.find((sc) => sc.id === scenarioId);
        if (!scenario) return {};
        const option = scenario.options.find((o) => o.id === optionId);
        if (!option) return {};
        const newActivity: ActivityLog = {
          id: `act-${Date.now()}`,
          timestamp: new Date().toISOString(),
          user: 'Rahul Sharma (PM)',
          action: `Completed Simulation: "${scenario.title}" — Selected: "${option.title}" (Score: ${option.score > 0 ? '+' : ''}${option.score})`,
          category: 'governance',
        };
        return {
          simulationScenarios: s.simulationScenarios.map((sc) =>
            sc.id === scenarioId ? { ...sc, isCompleted: true, isActive: false, selectedOptionId: optionId, score: option.score } : sc
          ),
          simulationScore: s.simulationScore + option.score,
          simulationScheduleImpact: s.simulationScheduleImpact + option.scheduleImpact,
          simulationBudgetImpact: s.simulationBudgetImpact + option.budgetImpact,
          activityLog: [newActivity, ...s.activityLog],
        };
      }),

      resetSimulation: () => set(() => ({
        simulationScenarios: DEMO_SIMULATION_SCENARIOS.map((sc) => ({ ...sc, isActive: false, isCompleted: false, selectedOptionId: undefined, score: undefined })),
        simulationScore: 0,
        simulationScheduleImpact: 0,
        simulationBudgetImpact: 0,
      })),

      updateCharterStatus: (status) => set(() => ({ charterStatus: status })),
      updateCharterData: (data) => set((s) => ({ charterData: { ...s.charterData, ...data } })),

      addStakeholder: (stakeholder) => set((s) => ({ stakeholders: [...s.stakeholders, stakeholder] })),
      updateStakeholder: (id, updates) => set((s) => ({
        stakeholders: s.stakeholders.map((sh) => sh.id === id ? { ...sh, ...updates } : sh),
      })),
      deleteStakeholder: (id) => set((s) => ({ stakeholders: s.stakeholders.filter((sh) => sh.id !== id) })),

      logActivity: (entry) => set((s) => ({
        activityLog: [{ ...entry, id: `act-${Date.now()}` }, ...s.activityLog],
      })),

      resetToDemo: () => set(() => ({
        tasks: DEMO_TASKS,
        risks: DEMO_RISKS,
        issues: DEMO_ISSUES,
        changeRequests: DEMO_CHANGE_REQUESTS,
        expenses: DEMO_EXPENSES,
        budgetCategories: DEMO_BUDGET_CATEGORIES,
        sprints: DEMO_SPRINTS,
        communications: DEMO_COMMUNICATIONS,
        lessonsLearned: DEMO_LESSONS_LEARNED,
        simulationScenarios: DEMO_SIMULATION_SCENARIOS,
        activityLog: DEMO_ACTIVITY_LOG,
        stakeholders: DEMO_STAKEHOLDERS,
        team: DEMO_TEAM,
        milestones: DEMO_MILESTONES,
        charterStatus: 'baselined',
        charterData: {},
        simulationScore: 0,
        simulationScheduleImpact: 0,
        simulationBudgetImpact: 0,
      })),
    }),
    {
      name: 'city-but-in-reality-pm',
      version: 1,
    }
  )
);
