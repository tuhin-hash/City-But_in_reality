// All TypeScript interfaces for the CITY, BUT IN REALITY PM application

export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'blocked' | 'review' | 'done';
export type RiskStatus = 'open' | 'mitigating' | 'closed' | 'realized';
export type IssueStatus = 'open' | 'investigating' | 'resolved' | 'escalated';
export type ChangeStatus = 'submitted' | 'assessment' | 'review' | 'approved' | 'rejected' | 'implemented';
export type CharterStatus = 'draft' | 'review' | 'approved' | 'baselined';
export type TaskDependencyType = 'FS' | 'SS' | 'FF' | 'SF';

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: 'planning' | 'active' | 'completed' | 'on-hold';
  phase: string;
  health: 'green' | 'amber' | 'red';
  sponsor: string;
  manager: string;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  actualDate?: string;
  status: 'planned' | 'in-progress' | 'completed' | 'delayed' | 'at-risk';
  phase: string;
  deliverables: string[];
  dependencies: string[];
}

export interface Task {
  id: string;
  wbsCode: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: Priority;
  assigneeId: string;
  startDate: string;
  dueDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  estimatedHours: number;
  actualHours: number;
  dependencies: TaskDependency[];
  sprintId?: string;
  storyPoints?: number;
  milestoneId?: string;
  deliverable?: string;
  comments: Comment[];
  tags: string[];
  workPackageId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskDependency {
  taskId: string;
  type: TaskDependencyType;
  lag?: number; // days
}

export interface Comment {
  id: string;
  authorId: string;
  text: string;
  timestamp: string;
}

export interface WorkPackage {
  id: string;
  code: string;
  name: string;
  description: string;
  phase: string;
  owner: string;
  estimatedDuration: number; // days
  deliverable: string;
  children?: WorkPackage[];
  tasks?: string[]; // task IDs
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string; // initials
  skills: string[];
  availability: number; // percentage
  dailyRate: number; // INR
  taskIds: string[];
  sprintCapacity: number; // story points per sprint
}

export interface Stakeholder {
  id: string;
  name: string;
  organization: string;
  role: string;
  interest: 'high' | 'medium' | 'low';
  influence: 'high' | 'medium' | 'low';
  impact: 'positive' | 'neutral' | 'negative';
  communicationPreference: string;
  engagementLevel: 'champion' | 'supporter' | 'neutral' | 'resistant' | 'blocker';
  keyConcerns: string[];
  ownerId: string;
  notes: string;
}

export interface Risk {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'operational' | 'financial' | 'resource' | 'schedule' | 'stakeholder' | 'external';
  probability: 1 | 2 | 3 | 4 | 5;
  impact: 1 | 2 | 3 | 4 | 5;
  exposure: number; // probability * impact
  owner: string;
  mitigationStrategy: string;
  contingencyPlan: string;
  trigger: string;
  status: RiskStatus;
  raisedDate: string;
  reviewDate: string;
  linkedTaskIds: string[];
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  severity: Priority;
  owner: string;
  raisedDate: string;
  dueDate: string;
  resolutionPlan: string;
  status: IssueStatus;
  linkedTaskIds: string[];
  escalated: boolean;
  resolutionDate?: string;
}

export interface Dependency {
  id: string;
  fromTaskId: string;
  toTaskId: string;
  type: TaskDependencyType;
  lag: number;
  description: string;
}

export interface ChangeRequest {
  id: string;
  title: string;
  description: string;
  requesterId: string;
  submittedDate: string;
  businessJustification: string;
  scheduleImpact: string; // e.g. "+5 days"
  budgetImpact: number; // INR delta
  resourceImpact: string;
  riskImpact: string;
  status: ChangeStatus;
  approverId?: string;
  decisionDate?: string;
  decisionReason?: string;
  linkedTaskIds: string[];
  auditTrail: AuditEntry[];
}

export interface AuditEntry {
  timestamp: string;
  actor: string;
  action: string;
  details: string;
}

export interface Expense {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  approvedBy: string;
  taskId?: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  planned: number;
  actual: number;
  forecast: number;
}

export interface Sprint {
  id: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  taskIds: string[];
  totalPoints: number;
  completedPoints: number;
  status: 'planned' | 'active' | 'completed';
  retrospective?: SprintRetrospective;
}

export interface SprintRetrospective {
  wentWell: string[];
  improvements: string[];
  actionItems: string[];
}

export interface Communication {
  id: string;
  type: string;
  subject: string;
  recipients: string[];
  date: string;
  owner: string;
  status: 'planned' | 'sent' | 'draft';
  content?: string;
  milestoneId?: string;
}

export interface LessonLearned {
  id: string;
  category: string;
  description: string;
  impact: 'positive' | 'negative';
  recommendation: string;
  author: string;
  date: string;
}

export interface SimulationScenario {
  id: string;
  title: string;
  description: string;
  context: string;
  affectedAreas: string[];
  options: SimulationOption[];
  isActive: boolean;
  isCompleted: boolean;
  selectedOptionId?: string;
  score?: number;
}

export interface SimulationOption {
  id: string;
  label: string;
  description: string;
  scheduleImpact: number; // days
  budgetImpact: number; // INR
  riskLevel: 'low' | 'medium' | 'high';
  qualityImpact: 'positive' | 'neutral' | 'negative';
  score: number; // 0-100 PM decision quality
  explanation: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  actor: string;
  entityType: string;
  entityId: string;
  action: string;
  details: string;
}
