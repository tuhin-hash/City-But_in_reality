import type { Task, BudgetCategory, Expense } from '../types';

export interface EVMMetrics {
  bac: number;       // Budget at Completion
  pv: number;        // Planned Value
  ev: number;        // Earned Value
  ac: number;        // Actual Cost
  cpi: number;       // Cost Performance Index: EV / AC
  spi: number;       // Schedule Performance Index: EV / PV
  cv: number;        // Cost Variance: EV - AC
  sv: number;        // Schedule Variance: EV - PV
  eac: number;       // Estimate at Completion
  etc: number;       // Estimate to Complete: EAC - AC
  vac: number;       // Variance at Completion: BAC - EAC
  forecastingMethod: 'cpi' | 'budgeted' | 'composite';
  completionPct: number;
}

export function calculateProjectCompletion(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  const done = tasks.filter((t) => t.status === 'done').length;
  return Math.round((done / tasks.length) * 100);
}

/**
 * Centralized, audited Earned Value Management calculation engine.
 * Ensures consistent EVM numbers across Overview, Budget, Reports, and Simulation.
 */
export function calculateEVM(
  tasks: Task[],
  budgetCategories: BudgetCategory[],
  expenses: Expense[],
  asOfDateStr: string = '2026-11-22',
  forecastingMethod: 'cpi' | 'budgeted' | 'composite' = 'cpi'
): EVMMetrics {
  // 1. BAC = Budget at Completion (Sum of all planned category allocations)
  const bac = budgetCategories.reduce((sum, b) => sum + (b.planned || 0), 0) || 1200000;

  // 2. AC = Actual Cost (Sum of all incurred expenses or category actuals)
  // Ensure consistency: use budget category actuals as source of truth
  const ac = budgetCategories.reduce((sum, b) => sum + (b.actual || 0), 0) ||
             expenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  // 3. EV = Earned Value (% complete * BAC)
  const completionPct = calculateProjectCompletion(tasks);
  const ev = Math.round((completionPct / 100) * bac);

  // 4. PV = Planned Value (Budgeted Cost of Work Scheduled by asOfDate)
  // Dynamically calculate from tasks scheduled to be finished by asOfDate
  const totalEstimatedHours = tasks.reduce((sum, t) => sum + (t.estimatedHours || 16), 0);
  const scheduledTasksHours = tasks
    .filter((t) => t.dueDate <= asOfDateStr)
    .reduce((sum, t) => sum + (t.estimatedHours || 16), 0);
  
  // Planned progress as fraction of scheduled hours vs total hours, clamped
  const plannedRatio = totalEstimatedHours > 0 ? (scheduledTasksHours / totalEstimatedHours) : 0.50;
  const pv = Math.round(plannedRatio * bac);

  // 5. CPI = EV / AC (Cost Performance Index)
  const cpi = ac > 0 ? parseFloat((ev / ac).toFixed(2)) : 1.0;

  // 6. SPI = EV / PV (Schedule Performance Index)
  const spi = pv > 0 ? parseFloat((ev / pv).toFixed(2)) : 1.0;

  // 7. Cost Variance (CV) & Schedule Variance (SV)
  const cv = ev - ac;
  const sv = ev - pv;

  // 8. EAC = Estimate at Completion
  let eac = bac;
  if (forecastingMethod === 'cpi') {
    // Standard: EAC = BAC / CPI
    eac = cpi > 0 ? Math.round(bac / cpi) : bac;
  } else if (forecastingMethod === 'budgeted') {
    // EAC = AC + (BAC - EV)
    eac = ac + Math.max(0, bac - ev);
  } else if (forecastingMethod === 'composite') {
    // EAC = AC + [(BAC - EV) / (CPI * SPI)]
    const factor = cpi * spi;
    eac = factor > 0 ? Math.round(ac + (bac - ev) / factor) : bac;
  }

  // 9. ETC = Estimate to Complete: EAC - AC
  const etc = Math.max(0, eac - ac);

  // 10. VAC = Variance at Completion: BAC - EAC
  const vac = bac - eac;

  return {
    bac,
    pv,
    ev,
    ac,
    cpi,
    spi,
    cv,
    sv,
    eac,
    etc,
    vac,
    forecastingMethod,
    completionPct,
  };
}

export function calculateCPI(ev: number, ac: number): number {
  if (ac === 0) return 1.0;
  return parseFloat((ev / ac).toFixed(2));
}

export function calculateSPI(ev: number, pv: number): number {
  if (pv === 0) return 1.0;
  return parseFloat((ev / pv).toFixed(2));
}

export function calculateEAC(bac: number, cpi: number): number {
  if (cpi === 0) return bac;
  return Math.round(bac / cpi);
}

export function calculateETC(eac: number, ac: number): number {
  return Math.max(0, eac - ac);
}

export function calculateRiskExposure(probability: number, impact: number): number {
  return probability * impact;
}

export function getRiskColor(exposure: number): string {
  if (exposure >= 15) return '#FF5E5E';
  if (exposure >= 8) return '#FF8B45';
  return '#C6FF54';
}

export function getRiskLabel(exposure: number): string {
  if (exposure >= 15) return 'HIGH';
  if (exposure >= 8) return 'MEDIUM';
  return 'LOW';
}

export function getTaskOverdueCount(tasks: Task[], asOfDateStr: string = '2026-11-22'): number {
  return tasks.filter((t) => t.dueDate < asOfDateStr && t.status !== 'done').length;
}

export function getBlockedTaskCount(tasks: Task[]): number {
  return tasks.filter((t) => t.status === 'blocked').length;
}

export function calculateResourceUtilization(assignedHours: number, availableHours: number): number {
  if (availableHours === 0) return 0;
  return Math.min(100, Math.round((assignedHours / availableHours) * 100));
}

export function calculateSprintVelocity(completedPoints: number, sprintCount: number): number {
  if (sprintCount === 0) return 0;
  return Math.round(completedPoints / sprintCount);
}

export function projectHealthColor(health: 'green' | 'amber' | 'red'): string {
  return health === 'green' ? '#C6FF54' : health === 'amber' ? '#FF8B45' : '#FF5E5E';
}

export function projectHealthLabel(health: 'green' | 'amber' | 'red'): string {
  return health === 'green' ? 'ON TRACK' : health === 'amber' ? 'AT RISK' : 'CRITICAL';
}

export function formatCurrency(amount: number): string {
  if (Math.abs(amount) >= 100000) {
    return `₹${(amount / 100000).toFixed(2)}L`;
  }
  if (Math.abs(amount) >= 1000) {
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount.toLocaleString()}`;
}

export function formatDuration(days: number): string {
  if (days >= 7) {
    const weeks = Math.floor(days / 7);
    const rem = days % 7;
    return rem > 0 ? `${weeks}w ${rem}d` : `${weeks}w`;
  }
  return `${days}d`;
}

export function getDaysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * Critical Path Method (CPM) Scheduling Algorithm
 * Computes Early Start (ES), Early Finish (EF), Late Start (LS), Late Finish (LF),
 * Total Float (Slack), identifies Critical Path activities, and checks for circular dependency cycles.
 */
export interface CPMResult {
  hasCycle: boolean;
  projectDuration: number;
  criticalTaskIds: Set<string>;
  criticalWbsCodes: Set<string>;
  taskSchedules: Map<
    string,
    {
      es: number;
      ef: number;
      ls: number;
      lf: number;
      float: number;
      isCritical: boolean;
    }
  >;
}

export function calculateCriticalPath(tasks: Task[], projectStartStr: string = '2026-09-15'): CPMResult {
  const projectStartDate = new Date(projectStartStr);
  const taskMap = new Map<string, Task>();
  const durationMap = new Map<string, number>();
  
  tasks.forEach((t) => {
    taskMap.set(t.id, t);
    const dStart = new Date(t.startDate);
    const dDue = new Date(t.dueDate);
    const dur = Math.max(1, Math.round((dDue.getTime() - dStart.getTime()) / (1000 * 60 * 60 * 24)));
    durationMap.set(t.id, dur);
  });

  // Build Adjacency Lists
  const successors = new Map<string, { id: string; lag: number }[]>();
  const predecessors = new Map<string, { id: string; lag: number }[]>();
  const inDegree = new Map<string, number>();

  tasks.forEach((t) => {
    successors.set(t.id, []);
    predecessors.set(t.id, []);
    inDegree.set(t.id, 0);
  });

  tasks.forEach((t) => {
    t.dependencies.forEach((dep) => {
      if (taskMap.has(dep.taskId)) {
        successors.get(dep.taskId)?.push({ id: t.id, lag: dep.lag || 0 });
        predecessors.get(t.id)?.push({ id: dep.taskId, lag: dep.lag || 0 });
        inDegree.set(t.id, (inDegree.get(t.id) || 0) + 1);
      }
    });
  });

  // 1. Topological Sort (Kahn's algorithm)
  const queue: string[] = [];
  inDegree.forEach((deg, id) => {
    if (deg === 0) queue.push(id);
  });

  const topoOrder: string[] = [];
  while (queue.length > 0) {
    const u = queue.shift()!;
    topoOrder.push(u);
    successors.get(u)?.forEach((succ) => {
      const curDeg = (inDegree.get(succ.id) || 1) - 1;
      inDegree.set(succ.id, curDeg);
      if (curDeg === 0) queue.push(succ.id);
    });
  }

  // Check for circular dependency cycles
  if (topoOrder.length < tasks.length) {
    // Fallback: cycle detected
    return {
      hasCycle: true,
      projectDuration: 84,
      criticalTaskIds: new Set(),
      criticalWbsCodes: new Set(),
      taskSchedules: new Map(),
    };
  }

  // 2. Forward Pass: Early Start (ES) and Early Finish (EF)
  const es = new Map<string, number>();
  const ef = new Map<string, number>();

  topoOrder.forEach((id) => {
    const dur = durationMap.get(id) || 1;
    const preds = predecessors.get(id) || [];
    
    // Also consider task's baseline start date offset from project start
    const taskObj = taskMap.get(id)!;
    const dateOffset = Math.max(0, Math.round((new Date(taskObj.startDate).getTime() - projectStartDate.getTime()) / (1000 * 60 * 60 * 24)));

    let maxPredEF = dateOffset;
    preds.forEach((p) => {
      const predEF = (ef.get(p.id) || 0) + p.lag;
      if (predEF > maxPredEF) maxPredEF = predEF;
    });

    const taskES = maxPredEF;
    const taskEF = taskES + dur;
    es.set(id, taskES);
    ef.set(id, taskEF);
  });

  let projectDuration = 0;
  ef.forEach((val) => {
    if (val > projectDuration) projectDuration = val;
  });

  // 3. Backward Pass: Late Finish (LF) and Late Start (LS)
  const lf = new Map<string, number>();
  const ls = new Map<string, number>();

  for (let i = topoOrder.length - 1; i >= 0; i--) {
    const id = topoOrder[i];
    const dur = durationMap.get(id) || 1;
    const succs = successors.get(id) || [];

    let minSuccLS = projectDuration;
    if (succs.length > 0) {
      succs.forEach((s) => {
        const succLS = (ls.get(s.id) ?? projectDuration) - s.lag;
        if (succLS < minSuccLS) minSuccLS = succLS;
      });
    }

    const taskLF = minSuccLS;
    const taskLS = taskLF - dur;
    lf.set(id, taskLF);
    ls.set(id, taskLS);
  }

  // 4. Calculate Float and identify Critical Path
  const criticalTaskIds = new Set<string>();
  const criticalWbsCodes = new Set<string>();
  const taskSchedules = new Map<
    string,
    { es: number; ef: number; ls: number; lf: number; float: number; isCritical: boolean }
  >();

  tasks.forEach((t) => {
    const taskES = es.get(t.id) || 0;
    const taskEF = ef.get(t.id) || 0;
    const taskLS = ls.get(t.id) || 0;
    const taskLF = lf.get(t.id) || 0;
    const float = Math.max(0, taskLS - taskES);
    const isCritical = float === 0;

    if (isCritical) {
      criticalTaskIds.add(t.id);
      criticalWbsCodes.add(t.wbsCode);
    }

    taskSchedules.set(t.id, {
      es: taskES,
      ef: taskEF,
      ls: taskLS,
      lf: taskLF,
      float,
      isCritical,
    });
  });

  return {
    hasCycle: false,
    projectDuration,
    criticalTaskIds,
    criticalWbsCodes,
    taskSchedules,
  };
}
