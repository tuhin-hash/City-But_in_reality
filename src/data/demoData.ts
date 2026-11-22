import { format, addDays } from 'date-fns';
import type {
  Project, Milestone, Task, WorkPackage, TeamMember, Stakeholder,
  Risk, Issue, ChangeRequest, Expense, BudgetCategory, Sprint,
  Communication, LessonLearned, SimulationScenario, ActivityLog
} from '../types';

const projectStart = new Date('2026-09-15');

function d(offset: number): string {
  return format(addDays(projectStart, offset), 'yyyy-MM-dd');
}

export const DEMO_PROJECT: Project = {
  id: 'proj-001',
  name: 'CITY, BUT IN REALITY',
  description: 'Urban Mobility Intelligence Pilot — Bengaluru',
  startDate: d(0),
  endDate: d(84),
  budget: 1200000,
  status: 'active',
  phase: 'Design & Development',
  health: 'amber',
  sponsor: 'Priya Nair',
  manager: 'Rahul Sharma',
};

export const DEMO_TEAM: TeamMember[] = [
  { id: 'tm-01', name: 'Rahul Sharma', role: 'Project Manager', email: 'rahul@demo.in', avatar: 'RS', skills: ['Agile','Risk Management','Stakeholder Management'], availability: 100, dailyRate: 3500, taskIds: [], sprintCapacity: 0 },
  { id: 'tm-02', name: 'Anjali Mehra', role: 'Technical Lead', email: 'anjali@demo.in', avatar: 'AM', skills: ['System Architecture','Node.js','React'], availability: 100, dailyRate: 4000, taskIds: [], sprintCapacity: 20 },
  { id: 'tm-03', name: 'Siddharth Rao', role: 'Frontend Developer', email: 'sid@demo.in', avatar: 'SR', skills: ['React','TypeScript','CSS'], availability: 100, dailyRate: 3200, taskIds: [], sprintCapacity: 18 },
  { id: 'tm-04', name: 'Pooja Krishnan', role: 'Backend Developer', email: 'pooja@demo.in', avatar: 'PK', skills: ['Node.js','PostgreSQL','APIs'], availability: 80, dailyRate: 3200, taskIds: [], sprintCapacity: 15 },
  { id: 'tm-05', name: 'Vikram Suresh', role: 'GIS Specialist', email: 'vikram@demo.in', avatar: 'VS', skills: ['GIS','OpenStreetMap','QGIS','Python'], availability: 100, dailyRate: 3600, taskIds: [], sprintCapacity: 12 },
  { id: 'tm-06', name: 'Deepa Nair', role: 'Data Analyst', email: 'deepa@demo.in', avatar: 'DN', skills: ['Python','SQL','Data Visualization'], availability: 100, dailyRate: 3000, taskIds: [], sprintCapacity: 10 },
  { id: 'tm-07', name: 'Arjun Patel', role: 'UI/UX Designer', email: 'arjun@demo.in', avatar: 'AP', skills: ['Figma','User Research','Prototyping'], availability: 100, dailyRate: 2800, taskIds: [], sprintCapacity: 14 },
  { id: 'tm-08', name: 'Sneha Iyer', role: 'QA Engineer', email: 'sneha@demo.in', avatar: 'SI', skills: ['Test Planning','Selenium','Manual Testing'], availability: 100, dailyRate: 2600, taskIds: [], sprintCapacity: 16 },
  { id: 'tm-09', name: 'Mohan Kumar', role: 'Field Survey Coordinator', email: 'mohan@demo.in', avatar: 'MK', skills: ['Field Operations','GPS Mapping','Data Collection'], availability: 100, dailyRate: 2200, taskIds: [], sprintCapacity: 0 },
  { id: 'tm-10', name: 'Kavya Reddy', role: 'Stakeholder Liaison', email: 'kavya@demo.in', avatar: 'KR', skills: ['Communication','Municipal Relations','Documentation'], availability: 100, dailyRate: 2500, taskIds: [], sprintCapacity: 0 },
];

export const DEMO_MILESTONES: Milestone[] = [
  { id: 'ms-01', name: 'Project Charter Approved', description: 'Formal approval of project charter and baseline establishment', dueDate: d(11), actualDate: d(11), status: 'completed', phase: 'Initiation', deliverables: ['Project Charter', 'Stakeholder Register'], dependencies: [] },
  { id: 'ms-02', name: 'Requirements Frozen', description: 'All functional and technical requirements documented and approved', dueDate: d(27), actualDate: d(27), status: 'completed', phase: 'Planning', deliverables: ['Requirements Document', 'Technical Feasibility Report'], dependencies: ['ms-01'] },
  { id: 'ms-03', name: 'GIS Data Collection Complete', description: 'All Bengaluru GIS datasets collected and validated', dueDate: d(44), status: 'completed', phase: 'Data & Infrastructure', deliverables: ['GIS Dataset', 'Data Validation Report'], dependencies: ['ms-02'] },
  { id: 'ms-04', name: 'Prototype Ready for Demo', description: 'Working prototype demonstrated to stakeholders', dueDate: d(56), status: 'in-progress', phase: 'Design & Development', deliverables: ['Prototype Build', 'Demo Script'], dependencies: ['ms-03'] },
  { id: 'ms-05', name: 'Testing Complete', description: 'All test cycles completed with sign-off from QA', dueDate: d(72), status: 'planned', phase: 'Testing', deliverables: ['Test Report', 'Defect Log'], dependencies: ['ms-04'] },
  { id: 'ms-06', name: 'Pilot Launch', description: 'Public pilot deployed in Bengaluru North area', dueDate: d(80), status: 'planned', phase: 'Pilot', deliverables: ['Live Pilot', 'User Guide'], dependencies: ['ms-05'] },
  { id: 'ms-07', name: 'Project Closure', description: 'Formal project closure and handover to operations', dueDate: d(84), status: 'planned', phase: 'Closure', deliverables: ['Closure Report', 'Lessons Learned'], dependencies: ['ms-06'] },
];

export const DEMO_WORK_PACKAGES: WorkPackage[] = [
  {
    id: 'wp-01', code: '01', name: 'PROJECT INITIATION', description: 'Establish project foundations', phase: 'Initiation', owner: 'tm-01', estimatedDuration: 11, deliverable: 'Approved Project Charter',
    children: [
      { id: 'wp-01-1', code: '1.1', name: 'Project Charter', description: 'Draft and obtain approval for project charter', phase: 'Initiation', owner: 'tm-01', estimatedDuration: 5, deliverable: 'Signed Charter' },
      { id: 'wp-01-2', code: '1.2', name: 'Stakeholder Identification', description: 'Identify and register all project stakeholders', phase: 'Initiation', owner: 'tm-10', estimatedDuration: 6, deliverable: 'Stakeholder Register' },
      { id: 'wp-01-3', code: '1.3', name: 'Initial Feasibility', description: 'Assess technical and operational feasibility', phase: 'Initiation', owner: 'tm-02', estimatedDuration: 6, deliverable: 'Feasibility Report' },
      { id: 'wp-01-4', code: '1.4', name: 'Project Kickoff', description: 'Conduct kickoff meeting with all stakeholders', phase: 'Initiation', owner: 'tm-01', estimatedDuration: 1, deliverable: 'Kickoff Minutes' },
    ]
  },
  {
    id: 'wp-02', code: '02', name: 'DISCOVERY & PLANNING', description: 'Research, planning and requirements', phase: 'Planning', owner: 'tm-01', estimatedDuration: 16, deliverable: 'Project Management Plan',
    children: [
      { id: 'wp-02-1', code: '2.1', name: 'User Research', description: 'Conduct urban mobility user research', phase: 'Planning', owner: 'tm-07', estimatedDuration: 9, deliverable: 'User Research Report' },
      { id: 'wp-02-2', code: '2.2', name: 'Location Selection', description: 'Identify and approve pilot locations in Bengaluru', phase: 'Planning', owner: 'tm-09', estimatedDuration: 6, deliverable: 'Location Map' },
      { id: 'wp-02-3', code: '2.3', name: 'Requirements Gathering', description: 'Collect and document all functional requirements', phase: 'Planning', owner: 'tm-02', estimatedDuration: 8, deliverable: 'Requirements Document' },
      { id: 'wp-02-4', code: '2.4', name: 'Technical Feasibility', description: 'Evaluate technical approach and tool selection', phase: 'Planning', owner: 'tm-02', estimatedDuration: 5, deliverable: 'Technical Architecture' },
      { id: 'wp-02-5', code: '2.5', name: 'Project Planning', description: 'Create detailed project management plan', phase: 'Planning', owner: 'tm-01', estimatedDuration: 7, deliverable: 'PM Plan' },
    ]
  },
  {
    id: 'wp-03', code: '03', name: 'DATA & INFRASTRUCTURE', description: 'GIS data, infrastructure and community requirements', phase: 'Data & Infrastructure', owner: 'tm-05', estimatedDuration: 22, deliverable: 'Validated GIS Dataset',
    children: [
      { id: 'wp-03-1', code: '3.1', name: 'GIS Data Collection', description: 'Collect street-level GIS data for Bengaluru North', phase: 'Data & Infrastructure', owner: 'tm-05', estimatedDuration: 16, deliverable: 'GIS Dataset' },
      { id: 'wp-03-2', code: '3.2', name: 'Street Condition Data', description: 'Survey and document pedestrian infrastructure conditions', phase: 'Data & Infrastructure', owner: 'tm-09', estimatedDuration: 10, deliverable: 'Condition Survey Report' },
      { id: 'wp-03-3', code: '3.3', name: 'Community Reporting Requirements', description: 'Define requirements for community issue reporting', phase: 'Data & Infrastructure', owner: 'tm-07', estimatedDuration: 5, deliverable: 'Reporting Specification' },
      { id: 'wp-03-4', code: '3.4', name: 'Data Validation', description: 'Validate collected data for accuracy and completeness', phase: 'Data & Infrastructure', owner: 'tm-06', estimatedDuration: 5, deliverable: 'Validated Dataset' },
    ]
  },
  {
    id: 'wp-04', code: '04', name: 'DESIGN & DEVELOPMENT', description: 'UX design and software development', phase: 'Design & Development', owner: 'tm-02', estimatedDuration: 29, deliverable: 'Working Application',
    children: [
      { id: 'wp-04-1', code: '4.1', name: 'UX Design', description: 'Design user experience for pedestrian intelligence platform', phase: 'Design & Development', owner: 'tm-07', estimatedDuration: 18, deliverable: 'Design System & Prototypes' },
      { id: 'wp-04-2', code: '4.2', name: 'Frontend Development', description: 'Build React application with mapping and routing', phase: 'Design & Development', owner: 'tm-03', estimatedDuration: 21, deliverable: 'Frontend Application' },
      { id: 'wp-04-3', code: '4.3', name: 'Backend Development', description: 'Build data APIs and server infrastructure', phase: 'Design & Development', owner: 'tm-04', estimatedDuration: 20, deliverable: 'Backend API' },
      { id: 'wp-04-4', code: '4.4', name: 'Mapping Integration', description: 'Integrate GIS data with Leaflet mapping layer', phase: 'Design & Development', owner: 'tm-05', estimatedDuration: 7, deliverable: 'Map Module' },
      { id: 'wp-04-5', code: '4.5', name: 'Reporting Module', description: 'Build community reporting and issue submission system', phase: 'Design & Development', owner: 'tm-03', estimatedDuration: 7, deliverable: 'Report Module' },
    ]
  },
  {
    id: 'wp-05', code: '05', name: 'TESTING & QUALITY', description: 'Quality assurance and defect resolution', phase: 'Testing', owner: 'tm-08', estimatedDuration: 22, deliverable: 'QA Sign-off',
    children: [
      { id: 'wp-05-1', code: '5.1', name: 'Functional Testing', description: 'Execute functional test cases against requirements', phase: 'Testing', owner: 'tm-08', estimatedDuration: 16, deliverable: 'Functional Test Report' },
      { id: 'wp-05-2', code: '5.2', name: 'Integration Testing', description: 'Test integration between frontend, backend and GIS', phase: 'Testing', owner: 'tm-08', estimatedDuration: 5, deliverable: 'Integration Test Report' },
      { id: 'wp-05-3', code: '5.3', name: 'Usability Testing', description: 'Conduct usability sessions with target users', phase: 'Testing', owner: 'tm-07', estimatedDuration: 6, deliverable: 'Usability Report' },
      { id: 'wp-05-4', code: '5.4', name: 'Defect Resolution', description: 'Fix identified defects and re-test', phase: 'Testing', owner: 'tm-02', estimatedDuration: 5, deliverable: 'Defect Closure Report' },
    ]
  },
  {
    id: 'wp-06', code: '06', name: 'PILOT DEPLOYMENT', description: 'Deployment and pilot execution', phase: 'Pilot', owner: 'tm-01', estimatedDuration: 12, deliverable: 'Live Pilot',
    children: [
      { id: 'wp-06-1', code: '6.1', name: 'Pilot Preparation', description: 'Prepare environment and documentation for pilot', phase: 'Pilot', owner: 'tm-02', estimatedDuration: 3, deliverable: 'Deployment Checklist' },
      { id: 'wp-06-2', code: '6.2', name: 'Stakeholder Demonstration', description: 'Present prototype to municipal authority and sponsor', phase: 'Pilot', owner: 'tm-01', estimatedDuration: 1, deliverable: 'Demo Sign-off' },
      { id: 'wp-06-3', code: '6.3', name: 'Pilot Release', description: 'Deploy and launch pilot to test community', phase: 'Pilot', owner: 'tm-04', estimatedDuration: 2, deliverable: 'Live Application' },
      { id: 'wp-06-4', code: '6.4', name: 'Feedback Collection', description: 'Gather and analyse pilot user feedback', phase: 'Pilot', owner: 'tm-07', estimatedDuration: 5, deliverable: 'Feedback Report' },
    ]
  },
  {
    id: 'wp-07', code: '07', name: 'PROJECT CLOSURE', description: 'Formal project closure activities', phase: 'Closure', owner: 'tm-01', estimatedDuration: 4, deliverable: 'Closure Report',
    children: [
      { id: 'wp-07-1', code: '7.1', name: 'Performance Evaluation', description: 'Evaluate project against success criteria', phase: 'Closure', owner: 'tm-01', estimatedDuration: 2, deliverable: 'Evaluation Report' },
      { id: 'wp-07-2', code: '7.2', name: 'Documentation', description: 'Compile and archive all project documentation', phase: 'Closure', owner: 'tm-10', estimatedDuration: 2, deliverable: 'Document Archive' },
      { id: 'wp-07-3', code: '7.3', name: 'Handover', description: 'Transfer ownership to operations team', phase: 'Closure', owner: 'tm-01', estimatedDuration: 2, deliverable: 'Handover Document' },
      { id: 'wp-07-4', code: '7.4', name: 'Lessons Learned', description: 'Document and share lessons learned', phase: 'Closure', owner: 'tm-01', estimatedDuration: 2, deliverable: 'Lessons Learned Report' },
    ]
  },
];

// Baseline: 43 tasks total
// Completed: 18 tasks (41.86% ~ 42%)
// In Progress: 9 tasks
// Blocked: 2 tasks
// Not Started: 14 tasks (3 To Do + 11 Backlog)
export const DEMO_TASKS: Task[] = [
  // 01 Initiation (Completed: 5 tasks)
  { id: 'task-001', wbsCode: '1.1', title: 'Draft project charter document', description: 'Prepare initial project charter covering objectives, scope, budget and team.', status: 'done', priority: 'critical', assigneeId: 'tm-01', startDate: d(0), dueDate: d(4), actualStartDate: d(0), actualEndDate: d(4), estimatedHours: 16, actualHours: 18, dependencies: [], storyPoints: 5, milestoneId: 'ms-01', deliverable: 'Draft Charter', comments: [], tags: ['initiation'], workPackageId: 'wp-01-1', createdAt: d(0), updatedAt: d(4) },
  { id: 'task-002', wbsCode: '1.1', title: 'Obtain charter approval from sponsor', description: 'Present charter to Priya Nair for formal approval.', status: 'done', priority: 'critical', assigneeId: 'tm-01', startDate: d(5), dueDate: d(9), actualStartDate: d(5), actualEndDate: d(11), estimatedHours: 4, actualHours: 4, dependencies: [{ taskId: 'task-001', type: 'FS', lag: 0 }], milestoneId: 'ms-01', deliverable: 'Signed Charter', comments: [], tags: ['initiation'], workPackageId: 'wp-01-1', createdAt: d(0), updatedAt: d(11) },
  { id: 'task-003', wbsCode: '1.2', title: 'Identify and document all stakeholders', description: 'Map all internal and external stakeholders and their interests.', status: 'done', priority: 'high', assigneeId: 'tm-10', startDate: d(2), dueDate: d(8), actualStartDate: d(2), actualEndDate: d(8), estimatedHours: 12, actualHours: 10, dependencies: [], milestoneId: 'ms-01', deliverable: 'Stakeholder Register', comments: [], tags: ['initiation'], workPackageId: 'wp-01-2', createdAt: d(0), updatedAt: d(8) },
  { id: 'task-004', wbsCode: '1.3', title: 'Technical feasibility assessment', description: 'Evaluate mapping APIs, GIS tools, and infrastructure options.', status: 'done', priority: 'high', assigneeId: 'tm-02', startDate: d(3), dueDate: d(9), actualStartDate: d(3), actualEndDate: d(10), estimatedHours: 20, actualHours: 24, dependencies: [], deliverable: 'Feasibility Report', comments: [], tags: ['technical'], workPackageId: 'wp-01-3', createdAt: d(0), updatedAt: d(10) },
  { id: 'task-005', wbsCode: '1.4', title: 'Conduct project kickoff meeting', description: 'Kickoff with all team members and key stakeholders.', status: 'done', priority: 'high', assigneeId: 'tm-01', startDate: d(11), dueDate: d(11), actualStartDate: d(11), actualEndDate: d(11), estimatedHours: 4, actualHours: 4, dependencies: [{ taskId: 'task-002', type: 'FS', lag: 0 }], deliverable: 'Kickoff Minutes', comments: [], tags: ['initiation'], workPackageId: 'wp-01-4', createdAt: d(0), updatedAt: d(11) },

  // 02 Discovery & Planning (Completed: 5 tasks)
  { id: 'task-006', wbsCode: '2.1', title: 'User research — urban mobility interviews', description: 'Interview 20 pedestrians in Yelahanka, Hebbal and Indiranagar.', status: 'done', priority: 'high', assigneeId: 'tm-07', startDate: d(12), dueDate: d(21), actualStartDate: d(12), actualEndDate: d(21), estimatedHours: 32, actualHours: 35, dependencies: [{ taskId: 'task-005', type: 'FS', lag: 0 }], deliverable: 'User Research Report', comments: [], tags: ['ux', 'research'], workPackageId: 'wp-02-1', createdAt: d(0), updatedAt: d(21) },
  { id: 'task-007', wbsCode: '2.2', title: 'Select pilot locations in Bengaluru', description: 'Evaluate and select three priority pilot corridors.', status: 'done', priority: 'high', assigneeId: 'tm-09', startDate: d(14), dueDate: d(20), actualStartDate: d(14), actualEndDate: d(20), estimatedHours: 16, actualHours: 14, dependencies: [], deliverable: 'Location Map', comments: [], tags: ['planning'], workPackageId: 'wp-02-2', createdAt: d(0), updatedAt: d(20) },
  { id: 'task-008', wbsCode: '2.3', title: 'Requirements gathering workshops', description: 'Conduct structured workshops to elicit all functional requirements.', status: 'done', priority: 'critical', assigneeId: 'tm-02', startDate: d(16), dueDate: d(24), actualStartDate: d(16), actualEndDate: d(26), estimatedHours: 24, actualHours: 28, dependencies: [{ taskId: 'task-006', type: 'SS', lag: 2 }], milestoneId: 'ms-02', deliverable: 'Requirements Document', comments: [], tags: ['planning'], workPackageId: 'wp-02-3', createdAt: d(0), updatedAt: d(26) },
  { id: 'task-009', wbsCode: '2.4', title: 'Architecture and technology selection', description: 'Select tech stack, define APIs, infrastructure diagram.', status: 'done', priority: 'high', assigneeId: 'tm-02', startDate: d(22), dueDate: d(27), actualStartDate: d(22), actualEndDate: d(27), estimatedHours: 20, actualHours: 20, dependencies: [{ taskId: 'task-008', type: 'FS', lag: 0 }], deliverable: 'Technical Architecture', comments: [], tags: ['technical'], workPackageId: 'wp-02-4', createdAt: d(0), updatedAt: d(27) },
  { id: 'task-010', wbsCode: '2.5', title: 'Create project management plan', description: 'Document scope, schedule, budget, risk, communication and quality plans.', status: 'done', priority: 'high', assigneeId: 'tm-01', startDate: d(20), dueDate: d(27), actualStartDate: d(20), actualEndDate: d(27), estimatedHours: 20, actualHours: 22, dependencies: [], deliverable: 'PM Plan', comments: [], tags: ['planning'], workPackageId: 'wp-02-5', createdAt: d(0), updatedAt: d(27) },

  // 03 Data & Infrastructure (Completed: 4 tasks, Blocked: 1 task)
  { id: 'task-011', wbsCode: '3.1', title: 'Download and process OSM data for Bengaluru', description: 'Extract, clean and format OpenStreetMap data for pilot area.', status: 'done', priority: 'high', assigneeId: 'tm-05', startDate: d(28), dueDate: d(35), actualStartDate: d(28), actualEndDate: d(35), estimatedHours: 24, actualHours: 26, dependencies: [{ taskId: 'task-009', type: 'FS', lag: 0 }], deliverable: 'GIS Base Dataset', comments: [], tags: ['gis', 'data'], workPackageId: 'wp-03-1', createdAt: d(0), updatedAt: d(35) },
  { id: 'task-012', wbsCode: '3.1', title: 'GIS attribute data enrichment', description: 'Add pedestrian infrastructure attributes to map data.', status: 'done', priority: 'high', assigneeId: 'tm-05', startDate: d(36), dueDate: d(44), actualStartDate: d(36), actualEndDate: d(44), estimatedHours: 32, actualHours: 30, dependencies: [{ taskId: 'task-011', type: 'FS', lag: 0 }], milestoneId: 'ms-03', deliverable: 'Enriched GIS Dataset', comments: [], tags: ['gis', 'data'], workPackageId: 'wp-03-1', createdAt: d(0), updatedAt: d(44) },
  { id: 'task-013', wbsCode: '3.2', title: 'Field survey — Yelahanka to Manyata corridor', description: 'Ground-truth pedestrian infrastructure survey. Temporarily blocked by road works.', status: 'blocked', priority: 'high', assigneeId: 'tm-09', startDate: d(32), dueDate: d(42), actualStartDate: d(34), estimatedHours: 40, actualHours: 24, dependencies: [{ taskId: 'task-007', type: 'FS', lag: 7 }], deliverable: 'Survey Report', comments: [], tags: ['field', 'data'], workPackageId: 'wp-03-2', createdAt: d(0), updatedAt: d(50) },
  { id: 'task-014', wbsCode: '3.3', title: 'Define community reporting data schema', description: 'Design data model for user-submitted issue reports.', status: 'done', priority: 'medium', assigneeId: 'tm-06', startDate: d(28), dueDate: d(33), actualStartDate: d(28), actualEndDate: d(33), estimatedHours: 12, actualHours: 10, dependencies: [{ taskId: 'task-008', type: 'FS', lag: 0 }], deliverable: 'Reporting Schema', comments: [], tags: ['data'], workPackageId: 'wp-03-3', createdAt: d(0), updatedAt: d(33) },
  { id: 'task-015', wbsCode: '3.4', title: 'GIS data quality validation', description: 'Validate collected data against quality criteria.', status: 'done', priority: 'high', assigneeId: 'tm-06', startDate: d(40), dueDate: d(44), actualStartDate: d(40), actualEndDate: d(44), estimatedHours: 20, actualHours: 18, dependencies: [{ taskId: 'task-012', type: 'FS', lag: 0 }], milestoneId: 'ms-03', deliverable: 'Validation Report', comments: [], tags: ['data', 'quality'], workPackageId: 'wp-03-4', createdAt: d(0), updatedAt: d(44) },

  // 04 Design & Development (Completed: 3 tasks, In-Progress: 3 tasks, Blocked: 1 task, To Do: 1 task)
  { id: 'task-016', wbsCode: '4.1', title: 'Design system and component library', description: 'Create Figma design system with all UI components.', status: 'done', priority: 'high', assigneeId: 'tm-07', startDate: d(28), dueDate: d(37), actualStartDate: d(28), actualEndDate: d(38), estimatedHours: 32, actualHours: 36, dependencies: [{ taskId: 'task-008', type: 'FS', lag: 0 }], deliverable: 'Design System', comments: [], tags: ['design'], workPackageId: 'wp-04-1', createdAt: d(0), updatedAt: d(38) },
  { id: 'task-017', wbsCode: '4.1', title: 'UX prototypes — routing and reporting', description: 'High-fidelity prototypes for route planner and issue reporting flows.', status: 'done', priority: 'high', assigneeId: 'tm-07', startDate: d(38), dueDate: d(46), actualStartDate: d(38), actualEndDate: d(46), estimatedHours: 24, actualHours: 24, dependencies: [{ taskId: 'task-016', type: 'FS', lag: 0 }], deliverable: 'UX Prototypes', comments: [], tags: ['design', 'ux'], workPackageId: 'wp-04-1', createdAt: d(0), updatedAt: d(46) },
  { id: 'task-018', wbsCode: '4.2', title: 'Set up frontend project (React/Vite)', description: 'Initialize codebase, routing, state management and CI pipeline.', status: 'done', priority: 'high', assigneeId: 'tm-03', startDate: d(28), dueDate: d(31), actualStartDate: d(28), actualEndDate: d(31), estimatedHours: 12, actualHours: 10, dependencies: [{ taskId: 'task-009', type: 'FS', lag: 0 }], deliverable: 'Project Scaffold', comments: [], tags: ['development'], workPackageId: 'wp-04-2', createdAt: d(0), updatedAt: d(31) },
  { id: 'task-019', wbsCode: '4.2', title: 'Build Leaflet mapping module', description: 'Interactive map with route visualization, layers, and markers.', status: 'in-progress', priority: 'critical', assigneeId: 'tm-03', startDate: d(39), dueDate: d(52), actualStartDate: d(39), estimatedHours: 32, actualHours: 24, dependencies: [{ taskId: 'task-016', type: 'FS', lag: 0 }, { taskId: 'task-018', type: 'FS', lag: 0 }], deliverable: 'Map Module', comments: [], tags: ['development', 'mapping'], workPackageId: 'wp-04-2', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-020', wbsCode: '4.3', title: 'Backend API — user reports endpoint', description: 'REST API for submitting, retrieving and updating community reports. Blocked on schema sign-off.', status: 'blocked', priority: 'critical', assigneeId: 'tm-04', startDate: d(35), dueDate: d(52), actualStartDate: d(35), estimatedHours: 28, actualHours: 10, dependencies: [{ taskId: 'task-014', type: 'FS', lag: 0 }], deliverable: 'Reports API', comments: [], tags: ['development', 'backend'], workPackageId: 'wp-04-3', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-021', wbsCode: '4.3', title: 'Backend API — route scoring endpoint', description: 'Calculate and return reality scores for given route coordinates.', status: 'in-progress', priority: 'high', assigneeId: 'tm-04', startDate: d(46), dueDate: d(56), actualStartDate: d(46), estimatedHours: 24, actualHours: 12, dependencies: [{ taskId: 'task-012', type: 'FS', lag: 0 }], deliverable: 'Scoring API', comments: [], tags: ['development', 'backend'], workPackageId: 'wp-04-3', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-022', wbsCode: '4.4', title: 'GIS layer integration with frontend', description: 'Connect GIS enriched data to map visualization layers.', status: 'in-progress', priority: 'high', assigneeId: 'tm-05', startDate: d(48), dueDate: d(56), actualStartDate: d(48), estimatedHours: 20, actualHours: 8, dependencies: [{ taskId: 'task-012', type: 'FS', lag: 0 }, { taskId: 'task-019', type: 'FS', lag: 0 }], milestoneId: 'ms-04', deliverable: 'GIS Integration', comments: [], tags: ['gis', 'development'], workPackageId: 'wp-04-4', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-023', wbsCode: '4.5', title: 'Build community reporting module', description: 'User-facing issue reporting form with photo upload and location selection.', status: 'todo', priority: 'high', assigneeId: 'tm-03', startDate: d(52), dueDate: d(58), estimatedHours: 24, actualHours: 0, dependencies: [{ taskId: 'task-020', type: 'FS', lag: 0 }, { taskId: 'task-017', type: 'FS', lag: 0 }], deliverable: 'Report Module', comments: [], tags: ['development', 'feature'], workPackageId: 'wp-04-5', createdAt: d(0), updatedAt: d(55) },

  // 05 Testing & Quality (Completed: 1 task, In-Progress: 3 tasks, To Do: 1 task, Backlog: 2 tasks)
  { id: 'task-024', wbsCode: '5.1', title: 'Write functional test cases', description: 'Document test cases for all 32 functional requirements.', status: 'done', priority: 'high', assigneeId: 'tm-08', startDate: d(46), dueDate: d(54), actualStartDate: d(46), actualEndDate: d(54), estimatedHours: 20, actualHours: 20, dependencies: [{ taskId: 'task-008', type: 'FS', lag: 0 }], deliverable: 'Test Case Document', comments: [], tags: ['testing', 'qa'], workPackageId: 'wp-05-1', createdAt: d(0), updatedAt: d(54) },
  { id: 'task-025', wbsCode: '5.1', title: 'Execute functional test cycle 1', description: 'Run initial functional tests against mapping increments.', status: 'in-progress', priority: 'high', assigneeId: 'tm-08', startDate: d(50), dueDate: d(60), actualStartDate: d(50), estimatedHours: 24, actualHours: 12, dependencies: [{ taskId: 'task-024', type: 'FS', lag: 0 }], deliverable: 'Cycle 1 Test Log', comments: [], tags: ['testing'], workPackageId: 'wp-05-1', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-026', wbsCode: '5.2', title: 'Integration testing — frontend/backend/GIS', description: 'Verify end-to-end data flows between map and APIs.', status: 'in-progress', priority: 'high', assigneeId: 'tm-08', startDate: d(52), dueDate: d(62), actualStartDate: d(52), estimatedHours: 20, actualHours: 6, dependencies: [{ taskId: 'task-022', type: 'FS', lag: 0 }], deliverable: 'Integration Test Report', comments: [], tags: ['testing', 'integration'], workPackageId: 'wp-05-2', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-027', wbsCode: '5.3', title: 'Usability testing sessions prep', description: 'Recruit 10 pedestrian users for moderated usability sessions.', status: 'in-progress', priority: 'medium', assigneeId: 'tm-07', startDate: d(50), dueDate: d(60), actualStartDate: d(50), estimatedHours: 20, actualHours: 8, dependencies: [{ taskId: 'task-017', type: 'FS', lag: 0 }], deliverable: 'Usability Cohort Guide', comments: [], tags: ['ux', 'testing'], workPackageId: 'wp-05-3', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-028', wbsCode: '5.4', title: 'Defect triage and resolution setup', description: 'Setup bug tracking boards and severity criteria.', status: 'todo', priority: 'critical', assigneeId: 'tm-02', startDate: d(58), dueDate: d(64), estimatedHours: 24, actualHours: 0, dependencies: [{ taskId: 'task-025', type: 'FS', lag: 0 }], deliverable: 'Defect Triage Board', comments: [], tags: ['quality'], workPackageId: 'wp-05-4', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-029', wbsCode: '5.4', title: 'Regression test execution', description: 'Final regression test cycle prior to release freeze.', status: 'backlog', priority: 'high', assigneeId: 'tm-08', startDate: d(66), dueDate: d(72), estimatedHours: 24, actualHours: 0, dependencies: [{ taskId: 'task-028', type: 'FS', lag: 0 }], milestoneId: 'ms-05', deliverable: 'Final QA Sign-off', comments: [], tags: ['testing'], workPackageId: 'wp-05-4', createdAt: d(0), updatedAt: d(55) },

  // 06 Pilot Deployment (In-Progress: 3 tasks, To Do: 1 task, Backlog: 3 tasks)
  { id: 'task-030', wbsCode: '6.1', title: 'Deployment checklist and staging verification', description: 'Prepare rollout runbook and verify cloud staging environment.', status: 'in-progress', priority: 'high', assigneeId: 'tm-02', startDate: d(50), dueDate: d(58), actualStartDate: d(50), estimatedHours: 16, actualHours: 6, dependencies: [{ taskId: 'task-018', type: 'FS', lag: 0 }], deliverable: 'Deployment Checklist', comments: [], tags: ['deployment'], workPackageId: 'wp-06-1', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-031', wbsCode: '6.1', title: 'Security audit & data anonymization check', description: 'Ensure compliance with BBMP data sovereignty and privacy.', status: 'in-progress', priority: 'high', assigneeId: 'tm-02', startDate: d(52), dueDate: d(60), actualStartDate: d(52), estimatedHours: 16, actualHours: 4, dependencies: [{ taskId: 'task-030', type: 'SS', lag: 2 }], deliverable: 'Security Sign-off', comments: [], tags: ['security'], workPackageId: 'wp-06-1', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-032', wbsCode: '6.2', title: 'Stakeholder briefing pack preparation', description: 'Prepare demonstration materials for BBMP infrastructure division.', status: 'in-progress', priority: 'critical', assigneeId: 'tm-01', startDate: d(50), dueDate: d(56), actualStartDate: d(50), estimatedHours: 16, actualHours: 10, dependencies: [{ taskId: 'task-019', type: 'FS', lag: 0 }], milestoneId: 'ms-04', deliverable: 'Demonstration Deck', comments: [], tags: ['stakeholder'], workPackageId: 'wp-06-2', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-033', wbsCode: '6.2', title: 'Conduct BBMP executive demonstration', description: 'Demonstrate working mobility intelligence platform to municipal chief engineer.', status: 'todo', priority: 'critical', assigneeId: 'tm-01', startDate: d(68), dueDate: d(72), estimatedHours: 8, actualHours: 0, dependencies: [{ taskId: 'task-032', type: 'FS', lag: 12 }], deliverable: 'Demo Minutes & Feedback', comments: [], tags: ['stakeholder'], workPackageId: 'wp-06-2', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-034', wbsCode: '6.3', title: 'Production release deployment', description: 'Deploy platform to production cloud cluster.', status: 'backlog', priority: 'critical', assigneeId: 'tm-04', startDate: d(74), dueDate: d(76), estimatedHours: 12, actualHours: 0, dependencies: [{ taskId: 'task-033', type: 'FS', lag: 2 }], milestoneId: 'ms-06', deliverable: 'Live Production URL', comments: [], tags: ['deployment'], workPackageId: 'wp-06-3', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-035', wbsCode: '6.4', title: 'Pilot community launch & onboarding', description: 'Distribute pilot access to Namma Pedestrian Collective members.', status: 'backlog', priority: 'high', assigneeId: 'tm-10', startDate: d(76), dueDate: d(80), estimatedHours: 16, actualHours: 0, dependencies: [{ taskId: 'task-034', type: 'FS', lag: 0 }], deliverable: 'Onboarding Report', comments: [], tags: ['community'], workPackageId: 'wp-06-4', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-036', wbsCode: '6.4', title: 'Collect & synthesize pilot telemetry', description: 'Aggregate user friction reports and routing choices.', status: 'backlog', priority: 'high', assigneeId: 'tm-06', startDate: d(78), dueDate: d(82), estimatedHours: 16, actualHours: 0, dependencies: [{ taskId: 'task-035', type: 'SS', lag: 2 }], deliverable: 'Pilot Analytics Report', comments: [], tags: ['analytics'], workPackageId: 'wp-06-4', createdAt: d(0), updatedAt: d(55) },

  // 07 Closure (Backlog: 7 tasks)
  { id: 'task-037', wbsCode: '7.1', title: 'Project performance & EVM reconciliation', description: 'Reconcile final budget, CPI, SPI, and schedule performance against baseline.', status: 'backlog', priority: 'high', assigneeId: 'tm-01', startDate: d(80), dueDate: d(82), estimatedHours: 12, actualHours: 0, dependencies: [{ taskId: 'task-036', type: 'FS', lag: 0 }], deliverable: 'Final EVM Audit Report', comments: [], tags: ['closure'], workPackageId: 'wp-07-1', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-038', wbsCode: '7.2', title: 'Archive all technical & governance assets', description: 'Package GitHub repositories, PostGIS dumps, and steering committee approvals.', status: 'backlog', priority: 'medium', assigneeId: 'tm-10', startDate: d(81), dueDate: d(83), estimatedHours: 8, actualHours: 0, dependencies: [{ taskId: 'task-037', type: 'SS', lag: 1 }], deliverable: 'Digital Archive Package', comments: [], tags: ['closure'], workPackageId: 'wp-07-2', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-039', wbsCode: '7.3', title: 'Operational handover to BBMP GIS team', description: 'Execute formal handover protocol to BBMP urban planning division.', status: 'backlog', priority: 'critical', assigneeId: 'tm-01', startDate: d(82), dueDate: d(84), estimatedHours: 8, actualHours: 0, dependencies: [{ taskId: 'task-038', type: 'SS', lag: 1 }], milestoneId: 'ms-07', deliverable: 'Signed Handover Certificate', comments: [], tags: ['closure'], workPackageId: 'wp-07-3', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-040', wbsCode: '7.4', title: 'Facilitate project closure retrospective', description: 'Facilitate team lessons learned workshop and log entries.', status: 'backlog', priority: 'high', assigneeId: 'tm-01', startDate: d(82), dueDate: d(84), estimatedHours: 8, actualHours: 0, dependencies: [{ taskId: 'task-039', type: 'SS', lag: 0 }], milestoneId: 'ms-07', deliverable: 'Lessons Learned Archive', comments: [], tags: ['closure'], workPackageId: 'wp-07-4', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-041', wbsCode: '7.4', title: 'Publish project closure summary report', description: 'Publish final closure document to sponsor and municipal partners.', status: 'backlog', priority: 'high', assigneeId: 'tm-01', startDate: d(83), dueDate: d(84), estimatedHours: 6, actualHours: 0, dependencies: [{ taskId: 'task-040', type: 'FS', lag: 0 }], deliverable: 'Executive Closure Report', comments: [], tags: ['closure'], workPackageId: 'wp-07-4', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-042', wbsCode: '7.4', title: 'Financial accounts closure & contract release', description: 'Finalize all vendor payments, contractor releases, and contingency closeout.', status: 'backlog', priority: 'high', assigneeId: 'tm-01', startDate: d(83), dueDate: d(84), estimatedHours: 4, actualHours: 0, dependencies: [{ taskId: 'task-041', type: 'SS', lag: 0 }], deliverable: 'Financial Settlement Sign-off', comments: [], tags: ['closure'], workPackageId: 'wp-07-4', createdAt: d(0), updatedAt: d(55) },
  { id: 'task-043', wbsCode: '7.4', title: 'Team release & celebration', description: 'Formally release team members back to functional departments.', status: 'backlog', priority: 'medium', assigneeId: 'tm-01', startDate: d(84), dueDate: d(84), estimatedHours: 2, actualHours: 0, dependencies: [{ taskId: 'task-042', type: 'FS', lag: 0 }], deliverable: 'Resource Release Confirmation', comments: [], tags: ['closure'], workPackageId: 'wp-07-4', createdAt: d(0), updatedAt: d(55) },
];

export const DEMO_STAKEHOLDERS: Stakeholder[] = [
  { id: 'sh-01', name: 'BBMP Infrastructure Division', organization: 'BBMP', role: 'Municipal Authority & Primary Stakeholder', interest: 'high', influence: 'high', impact: 'positive', communicationPreference: 'Formal meetings, written reports', engagementLevel: 'supporter', keyConcerns: ['Data privacy', 'Integration with BBMP systems', 'Long-term sustainability'], ownerId: 'tm-10', notes: 'Requires all data shared for review. Monthly formal update required.' },
  { id: 'sh-02', name: 'Priya Nair', organization: 'Internal', role: 'Project Sponsor', interest: 'high', influence: 'high', impact: 'positive', communicationPreference: 'Weekly summary email, bi-weekly call', engagementLevel: 'champion', keyConcerns: ['Budget adherence', 'On-time delivery', 'Portfolio impact'], ownerId: 'tm-01', notes: 'Approves all change requests over ₹50,000. Direct escalation path.' },
  { id: 'sh-03', name: 'Rahul Sharma', organization: 'Internal', role: 'Project Manager', interest: 'high', influence: 'high', impact: 'positive', communicationPreference: 'Daily standup, weekly status report', engagementLevel: 'champion', keyConcerns: ['Team delivery', 'Risk management', 'Quality outcomes'], ownerId: 'tm-01', notes: 'Internal PM — full project visibility.' },
  { id: 'sh-04', name: 'Namma Pedestrian Collective', organization: 'Community NGO', role: 'Community Representative', interest: 'high', influence: 'medium', impact: 'positive', communicationPreference: 'Monthly community update', engagementLevel: 'supporter', keyConcerns: ['Accessibility', 'Real street impact', 'Data representation'], ownerId: 'tm-10', notes: 'Pilot community advocates. Valuable for feedback.' },
  { id: 'sh-05', name: 'IISc Urban Lab', organization: 'Academic Partner', role: 'Research Advisor', interest: 'medium', influence: 'medium', impact: 'positive', communicationPreference: 'Email, quarterly meetings', engagementLevel: 'neutral', keyConcerns: ['Research methodology', 'Data accuracy'], ownerId: 'tm-06', notes: 'Advisory relationship only. No approval authority.' },
  { id: 'sh-06', name: 'BDA Planning Department', organization: 'BDA', role: 'Regulatory Stakeholder', interest: 'low', influence: 'high', impact: 'neutral', communicationPreference: 'Formal written notices', engagementLevel: 'neutral', keyConcerns: ['Regulatory compliance', 'Data sovereignty'], ownerId: 'tm-10', notes: 'Must be kept informed of data collection activities.' },
  { id: 'sh-07', name: 'Pilot Area Residents', organization: 'Public', role: 'End Users', interest: 'medium', influence: 'low', impact: 'positive', communicationPreference: 'App notifications, community boards', engagementLevel: 'neutral', keyConcerns: ['Ease of use', 'Privacy', 'Usefulness'], ownerId: 'tm-07', notes: 'Primary users of the final product. Usability testing participants.' },
];

export const DEMO_RISKS: Risk[] = [
  { id: 'risk-001', title: 'GIS data collection delayed by field access restrictions', description: 'Restricted access to some street segments may prevent complete data collection within schedule.', category: 'schedule', probability: 3, impact: 4, exposure: 12, owner: 'tm-09', mitigationStrategy: 'Pre-survey route planning, liaison with BBMP for access permission.', contingencyPlan: 'Use OSM data as fallback for restricted areas.', trigger: 'Field survey team unable to access >20% of planned segments.', status: 'mitigating', raisedDate: d(5), reviewDate: d(42), linkedTaskIds: ['task-013'] },
  { id: 'risk-002', title: 'Backend API integration dependency blocks frontend', description: 'Frontend map module is blocked waiting for backend reports API endpoint.', category: 'technical', probability: 4, impact: 4, exposure: 16, owner: 'tm-02', mitigationStrategy: 'Develop frontend using mock API contracts. Parallel development tracks.', contingencyPlan: 'Use localStorage as temporary data layer to unblock frontend.', trigger: 'Backend API not ready by Day 45.', status: 'mitigating', raisedDate: d(30), reviewDate: d(55), linkedTaskIds: ['task-020', 'task-023'] },
  { id: 'risk-003', title: 'Municipal stakeholder approval delays milestone', description: 'BBMP review and approval process may cause delays to data sharing and pilot launch approval.', category: 'stakeholder', probability: 3, impact: 3, exposure: 9, owner: 'tm-10', mitigationStrategy: 'Early engagement, regular updates, formal MoU agreement.', contingencyPlan: 'Pilot with community consent without formal BBMP approval if delayed beyond Day 70.', trigger: 'No approval received within 7 days of formal request.', status: 'open', raisedDate: d(8), reviewDate: d(60), linkedTaskIds: ['task-030'] },
  { id: 'risk-004', title: 'GIS data costs exceed budget allocation', description: 'Procurement of commercial GIS data layers may cost 20–30% more than estimated.', category: 'financial', probability: 3, impact: 3, exposure: 9, owner: 'tm-01', mitigationStrategy: 'Use OpenStreetMap as primary source. Limit commercial data to critical gaps only.', contingencyPlan: 'Use contingency reserve. Raise change request if budget variance exceeds 15%.', trigger: 'GIS data quotes received >₹2,40,000.', status: 'open', raisedDate: d(20), reviewDate: d(45), linkedTaskIds: ['task-011', 'task-012'] },
  { id: 'risk-005', title: 'Backend developer unavailability', description: 'Pooja Krishnan is at 80% availability. Full unavailability would block two critical backend tasks.', category: 'resource', probability: 2, impact: 4, exposure: 8, owner: 'tm-01', mitigationStrategy: 'Cross-train Technical Lead as backup. Document all APIs thoroughly.', contingencyPlan: 'Engage contract developer for 2-week interim support.', trigger: 'Pooja unable to work for more than 3 consecutive days.', status: 'open', raisedDate: d(28), reviewDate: d(55), linkedTaskIds: ['task-020', 'task-021'] },
  { id: 'risk-006', title: 'Scope creep from stakeholder feature requests', description: 'Community and BBMP stakeholders may request additional features beyond agreed scope.', category: 'operational', probability: 4, impact: 3, exposure: 12, owner: 'tm-01', mitigationStrategy: 'Formal change control process. All requests assessed for impact before acceptance.', contingencyPlan: 'Park all out-of-scope requests in product backlog for Phase 2.', trigger: 'Any feature request received after requirements freeze milestone.', status: 'open', raisedDate: d(25), reviewDate: d(60), linkedTaskIds: [] },
];

export const DEMO_ISSUES: Issue[] = [
  { id: 'iss-001', title: 'Backend reports API blocked — dependency on schema approval', description: 'The backend reports API (task-020) cannot be completed until the data schema is formally approved by the data analyst. This is blocking the reporting module development.', severity: 'critical', owner: 'tm-02', raisedDate: d(48), dueDate: d(52), resolutionPlan: 'Schedule urgent schema review meeting with Deepa Nair. Target sign-off by Day 52.', status: 'open', linkedTaskIds: ['task-020', 'task-023'], escalated: false },
  { id: 'iss-002', title: 'Field survey delayed — Yelahanka sector inaccessible due to road works', description: 'Two road segments in Yelahanka marked for survey are closed due to BBMP road widening. Survey team cannot collect data for these segments.', severity: 'high', owner: 'tm-09', raisedDate: d(38), dueDate: d(50), resolutionPlan: 'Request BBMP access permission via formal letter. Use satellite imagery as interim fallback.', status: 'investigating', linkedTaskIds: ['task-013'], escalated: false },
  { id: 'iss-003', title: 'Test environment configuration delay', description: 'The staging environment was not provisioned on the expected date due to infrastructure access approval pending.', severity: 'medium', owner: 'tm-04', raisedDate: d(50), dueDate: d(58), resolutionPlan: 'Escalate to IT operations. Use local Docker environment as interim workaround.', status: 'investigating', linkedTaskIds: ['task-025'], escalated: false },
];

export const DEMO_CHANGE_REQUESTS: ChangeRequest[] = [
  { id: 'cr-001', title: 'Add Kannada language support to reporting interface', description: 'Community stakeholders request the report submission form be available in Kannada for wider accessibility.', requesterId: 'sh-04', submittedDate: d(44), businessJustification: 'Increases accessibility for Bengaluru residents who primarily use Kannada. Aligns with inclusivity goals.', scheduleImpact: '+5 days to Sprint 3', budgetImpact: 25000, resourceImpact: 'Requires 1 week additional effort from frontend developer and translation support.', riskImpact: 'Minor delay risk to testing phase if approved.', status: 'assessment', linkedTaskIds: ['task-023'], auditTrail: [{ timestamp: d(44) + 'T10:00:00', actor: 'Rahul Sharma', action: 'Submitted', details: 'Change request raised following community feedback session.' }, { timestamp: d(46) + 'T14:00:00', actor: 'Rahul Sharma', action: 'Assessment started', details: 'Impact assessment assigned to Technical Lead.' }] },
  { id: 'cr-002', title: 'Expand pilot coverage from 3 to 5 corridors', description: 'BBMP requests expansion of pilot from 3 to 5 Bengaluru corridors to include Whitefield and Electronic City.', requesterId: 'sh-01', submittedDate: d(50), businessJustification: 'Greater coverage improves statistical significance of pilot data and BBMP investment value.', scheduleImpact: '+10 days overall, delays pilot launch', budgetImpact: 85000, resourceImpact: 'Requires additional field survey time and GIS processing.', riskImpact: 'Significant schedule risk. May not complete within 12-week budget.', status: 'review', linkedTaskIds: ['task-013', 'task-022'], auditTrail: [{ timestamp: d(50) + 'T09:00:00', actor: 'BBMP', action: 'Submitted', details: 'Formal request from BBMP Infrastructure Division.' }, { timestamp: d(52) + 'T11:00:00', actor: 'Rahul Sharma', action: 'Under review', details: 'Impact assessment complete. Scheduled for steering committee review.' }] },
];

export const DEMO_BUDGET_CATEGORIES: BudgetCategory[] = [
  { id: 'bc-01', name: 'Engineering', planned: 400000, actual: 220000, forecast: 395000 },
  { id: 'bc-02', name: 'GIS & Data', planned: 200000, actual: 118000, forecast: 215000 },
  { id: 'bc-03', name: 'Design & UX', planned: 100000, actual: 68000, forecast: 95000 },
  { id: 'bc-04', name: 'Field Operations', planned: 150000, actual: 72000, forecast: 162000 },
  { id: 'bc-05', name: 'Testing & QA', planned: 100000, actual: 18000, forecast: 95000 },
  { id: 'bc-06', name: 'Infrastructure', planned: 100000, actual: 42000, forecast: 100000 },
  { id: 'bc-07', name: 'Contingency', planned: 150000, actual: 0, forecast: 80000 },
];

// 15 audited transactions summing to exactly ₹5,38,000 to match category actuals 100%
export const DEMO_EXPENSES: Expense[] = [
  // Engineering: ₹2,20,000
  { id: 'exp-001', category: 'Engineering', description: 'Senior System Architect Sprint 1 & 2 Technical Lead effort', amount: 90000, date: d(30), approvedBy: 'Rahul Sharma' },
  { id: 'exp-002', category: 'Engineering', description: 'Frontend React & Leaflet development sprint delivery effort', amount: 65000, date: d(42), approvedBy: 'Rahul Sharma' },
  { id: 'exp-003', category: 'Engineering', description: 'Backend API data service implementation & schema endpoints', amount: 45000, date: d(35), approvedBy: 'Rahul Sharma' },
  { id: 'exp-004', category: 'Engineering', description: 'Developer toolchain, GitHub Enterprise seats & linter tooling', amount: 20000, date: d(28), approvedBy: 'Rahul Sharma' },

  // GIS & Data: ₹1,18,000
  { id: 'exp-005', category: 'GIS & Data', description: 'Commercial building footprint dataset (Bengaluru North)', amount: 55000, date: d(38), approvedBy: 'Priya Nair' },
  { id: 'exp-006', category: 'GIS & Data', description: 'Satellite high-resolution orthophoto imagery licensing', amount: 45000, date: d(32), approvedBy: 'Rahul Sharma' },
  { id: 'exp-007', category: 'GIS & Data', description: 'OpenStreetMap bulk data extraction compute pipeline', amount: 18000, date: d(30), approvedBy: 'Rahul Sharma' },

  // Design & UX: ₹68,000
  { id: 'exp-008', category: 'Design & UX', description: 'Urban mobility user research field interviews (20 participant honorariums)', amount: 35000, date: d(21), approvedBy: 'Rahul Sharma' },
  { id: 'exp-009', category: 'Design & UX', description: 'Figma Professional design system workspace (3 seats x 3 mos)', amount: 18000, date: d(28), approvedBy: 'Rahul Sharma' },
  { id: 'exp-010', category: 'Design & UX', description: 'Usability testing lab recording equipment rental', amount: 15000, date: d(48), approvedBy: 'Rahul Sharma' },

  // Field Operations: ₹72,000
  { id: 'exp-011', category: 'Field Operations', description: 'Field survey team GPS devices and high-accuracy handheld tablets (rental)', amount: 28000, date: d(32), approvedBy: 'Rahul Sharma' },
  { id: 'exp-012', category: 'Field Operations', description: 'Field survey team transport and on-ground logistics across pilot corridors', amount: 24000, date: d(35), approvedBy: 'Rahul Sharma' },
  { id: 'exp-013', category: 'Field Operations', description: 'Field survey coordinator stipend & safety equipment', amount: 20000, date: d(40), approvedBy: 'Rahul Sharma' },

  // Testing & QA: ₹18,000
  { id: 'exp-014', category: 'Testing & QA', description: 'Cloud automated cross-browser test runner licenses (Cypress/Selenium)', amount: 18000, date: d(50), approvedBy: 'Rahul Sharma' },

  // Infrastructure: ₹42,000
  { id: 'exp-015', category: 'Infrastructure', description: 'Cloud staging cluster, PostGIS database & Leaflet tile caching server', amount: 42000, date: d(42), approvedBy: 'Rahul Sharma' },
];

export const DEMO_SPRINTS: Sprint[] = [
  {
    id: 'sprint-01',
    name: 'Sprint 1 — Foundation',
    goal: 'Establish core infrastructure, project setup, and initial data collection framework.',
    startDate: d(28),
    endDate: d(41),
    taskIds: ['task-011', 'task-014', 'task-016', 'task-018'],
    totalPoints: 42,
    completedPoints: 42,
    status: 'completed',
    retrospective: {
      wentWell: ['Strong collaboration between GIS and dev team', 'Design system delivered on time', 'All Sprint 1 tasks completed'],
      improvements: ['Better estimation on GIS data tasks', 'Earlier stakeholder review cycles'],
      actionItems: ['Add buffer time for external data procurement', 'Weekly architecture review meetings']
    }
  },
  {
    id: 'sprint-02',
    name: 'Sprint 2 — Mapping & Data',
    goal: 'Complete GIS data enrichment and build the interactive mapping frontend module.',
    startDate: d(42),
    endDate: d(55),
    taskIds: ['task-012', 'task-013', 'task-017', 'task-019', 'task-020'],
    totalPoints: 55,
    completedPoints: 22,
    status: 'active',
    retrospective: undefined
  },
  {
    id: 'sprint-03',
    name: 'Sprint 3 — Intelligence Layer',
    goal: 'Build route scoring, community reporting, and GIS layer integration.',
    startDate: d(56),
    endDate: d(69),
    taskIds: ['task-021', 'task-022', 'task-023', 'task-024', 'task-015'],
    totalPoints: 48,
    completedPoints: 0,
    status: 'planned',
    retrospective: undefined
  },
  {
    id: 'sprint-04',
    name: 'Sprint 4 — Testing & Release',
    goal: 'Complete all testing cycles, resolve defects, and prepare for pilot launch.',
    startDate: d(70),
    endDate: d(84),
    taskIds: ['task-025', 'task-026', 'task-027', 'task-028', 'task-029', 'task-030', 'task-031'],
    totalPoints: 50,
    completedPoints: 0,
    status: 'planned',
    retrospective: undefined
  },
];

export const DEMO_COMMUNICATIONS: Communication[] = [
  { id: 'comm-001', type: 'Weekly Status Report', subject: 'Week 8 — Project Status Update', recipients: ['sh-02', 'sh-01'], date: d(55), owner: 'tm-01', status: 'sent', milestoneId: undefined },
  { id: 'comm-002', type: 'Sprint Review', subject: 'Sprint 1 Review — All Tasks Completed', recipients: ['sh-02'], date: d(41), owner: 'tm-01', status: 'sent' },
  { id: 'comm-003', type: 'Risk Escalation', subject: 'Risk Escalation: Backend API Dependency', recipients: ['sh-02'], date: d(48), owner: 'tm-01', status: 'sent' },
  { id: 'comm-004', type: 'Stakeholder Review', subject: 'Bi-weekly Stakeholder Review — Week 7', recipients: ['sh-01', 'sh-02', 'sh-04'], date: d(50), owner: 'tm-10', status: 'sent' },
  { id: 'comm-005', type: 'Weekly Standup', subject: 'Daily Standup — Week 8 Day 4', recipients: ['tm-02', 'tm-03', 'tm-04', 'tm-05'], date: d(54), owner: 'tm-01', status: 'planned' },
  { id: 'comm-006', type: 'Stakeholder Demo', subject: 'Prototype Demonstration — BBMP & Sponsor', recipients: ['sh-01', 'sh-02'], date: d(68), owner: 'tm-01', status: 'planned', milestoneId: 'ms-04' },
];

export const DEMO_LESSONS_LEARNED: LessonLearned[] = [
  { id: 'll-001', category: 'Planning', description: 'GIS data collection effort was underestimated by 25%. Real-world field access restrictions were not factored into initial estimates.', impact: 'negative', recommendation: 'Always include BBMP access approval timeline when planning field data collection. Add 25% buffer.', author: 'tm-09', date: d(55) },
  { id: 'll-002', category: 'Technical', description: 'Defining API contracts before development began enabled parallel frontend and backend work, reducing integration friction significantly.', impact: 'positive', recommendation: 'Always define and approve API contracts before coding begins. Use mock server during development.', author: 'tm-02', date: d(55) },
  { id: 'll-003', category: 'Stakeholder', description: 'Early engagement with BBMP built trust and reduced bureaucratic friction when requesting data access.', impact: 'positive', recommendation: 'Begin stakeholder engagement in Initiation phase, not during data collection.', author: 'tm-10', date: d(55) },
];

export const DEMO_SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'sim-001',
    title: 'WEATHER DELAY',
    description: 'A field survey team is unable to complete the Yelahanka corridor survey due to unexpected heavy rainfall. The survey is postponed by 3 working days.',
    context: 'The field survey (Task 3.2) is currently 60% complete. The delay will push completion from Day 42 to Day 45. GIS data validation (Task 3.4) and downstream development tasks depend on this survey completion.',
    affectedAreas: ['Schedule', 'Resources', 'GIS Data', 'Downstream Tasks'],
    isActive: false,
    isCompleted: false,
    options: [
      { id: 'sim-001-a', label: 'Accept the delay, adjust schedule', description: 'Formally update the project schedule (+3 days to Task 3.2), notify stakeholders, and absorb the 3-day delay into the existing schedule buffer.', scheduleImpact: 3, budgetImpact: 0, riskLevel: 'low', qualityImpact: 'positive', score: 90, explanation: 'Excellent decision. Transparent schedule management, accurate forecasting. The 3-day delay is within acceptable limits and the buffer absorbs it. Stakeholder communication is appropriate.' },
      { id: 'sim-001-b', label: 'Compress downstream tasks to recover', description: 'Ask the GIS and data teams to work evenings and weekends to recover the lost 3 days on downstream tasks.', scheduleImpact: 0, budgetImpact: 15000, riskLevel: 'high', qualityImpact: 'negative', score: 35, explanation: 'Poor decision. Forcing overtime to recover a 3-day delay creates fatigue, quality risk, and sets a poor team culture precedent. The delay is small enough to absorb.' },
      { id: 'sim-001-c', label: 'Reallocate resources and partially parallel the work', description: 'While the survey delay resolves itself, reassign Vikram to begin GIS enrichment on completed corridor data and start validation on available segments.', scheduleImpact: 1, budgetImpact: 0, riskLevel: 'low', qualityImpact: 'positive', score: 95, explanation: 'Excellent strategic decision. Using partial data to begin parallel work is proactive PM behaviour. Recovers most of the delay without quality risk.' },
      { id: 'sim-001-d', label: 'Escalate immediately to sponsor', description: 'Send an urgent escalation email to the project sponsor about the 3-day weather delay.', scheduleImpact: 3, budgetImpact: 0, riskLevel: 'medium', qualityImpact: 'neutral', score: 20, explanation: 'Poor judgement. A 3-day weather delay does not warrant sponsor escalation. Over-escalation reduces PM credibility and wastes executive attention. Handle at PM level.' },
    ]
  },
  {
    id: 'sim-002',
    title: 'BUDGET OVERRUN',
    description: 'GIS data collection costs have come in 20% over budget. Commercial high-resolution satellite orthophotos and building footprints require additional outlay.',
    context: 'The GIS & Data category forecast has reached ₹2,15,000 versus the planned ₹2,00,000 baseline. Contingency reserve of ₹1,50,000 is available for approved deviations.',
    affectedAreas: ['Budget', 'Contingency', 'Forecast', 'Sponsor Communication'],
    isActive: false,
    isCompleted: false,
    options: [
      { id: 'sim-002-a', label: 'Draw from contingency and update forecast', description: 'Draw ₹40,000 from the project contingency reserve to absorb the GIS cost variance. Update the forecast at completion (EAC) and disclose variance in the weekly status report.', scheduleImpact: 0, budgetImpact: -40000, riskLevel: 'medium', qualityImpact: 'neutral', score: 85, explanation: 'Good decision. Contingency reserve exists precisely for this purpose. Transparent reporting with updated EAC demonstrates sound cost management.' },
      { id: 'sim-002-b', label: 'Find cost savings in another category', description: 'Reduce the design budget by cutting usability testing session count from 10 to 5.', scheduleImpact: 0, budgetImpact: 0, riskLevel: 'high', qualityImpact: 'negative', score: 30, explanation: 'Poor decision. Cutting usability testing to cover a GIS cost overrun compromises quality and user experience goals. The root cause is not addressed transparently.' },
      { id: 'sim-002-c', label: 'Raise change request and use contingency', description: 'File a formal change request for ₹40,000 budget reallocation, draw from contingency pending CCB sign-off, and implement a GIS vendor cost audit.', scheduleImpact: 0, budgetImpact: -40000, riskLevel: 'low', qualityImpact: 'positive', score: 95, explanation: 'Outstanding governance. Formal change control ensures approval thresholds are respected while preserving baseline integrity.' },
      { id: 'sim-002-d', label: 'Absorb quietly within the category', description: 'Do not report the overrun. Shuffle budget allocations internally and hope end-of-project testing savings offset it.', scheduleImpact: 0, budgetImpact: 0, riskLevel: 'high', qualityImpact: 'negative', score: 5, explanation: 'Critical failure. Concealing a budget overrun is a governance violation. This would breach sponsor trust and may constitute a reporting failure. Always disclose variances.' },
    ]
  },
  {
    id: 'sim-003',
    title: 'RESOURCE UNAVAILABLE',
    description: 'Pooja Krishnan (Backend Developer) is unexpectedly unavailable for 5 working days due to a personal emergency.',
    context: 'The backend reports API (Task 4.3, task-020) is currently blocked. With Pooja unavailable, completion is delayed beyond Sprint 2 targets, threatening integration testing.',
    affectedAreas: ['Resources', 'Schedule', 'Development Tasks', 'Sprint 2 velocity'],
    isActive: false,
    isCompleted: false,
    options: [
      { id: 'sim-003-a', label: 'Reassign Tech Lead to unblock backend tasks', description: 'Temporarily reassign Technical Lead Anjali Mehra to cover Task 4.3 backend endpoints, unblocking frontend integration.', scheduleImpact: 0, budgetImpact: 0, riskLevel: 'medium', qualityImpact: 'neutral', score: 85, explanation: 'Good decision. Using the Technical Lead as a bridge is pragmatic and keeps Sprint 2 on track. Minor reduction in architecture oversight is acceptable for 5 days.' },
      { id: 'sim-003-b', label: 'Bring in a contract developer', description: 'Source a 1-week external contract backend developer to complete the API work during Pooja\'s absence.', scheduleImpact: -1, budgetImpact: 20000, riskLevel: 'medium', qualityImpact: 'positive', score: 70, explanation: 'Reasonable but potentially expensive for a 5-day gap. Onboarding cost is high relative to the gap duration. Use contingency funds if chosen.' },
      { id: 'sim-003-c', label: 'Pause backend tasks and document clearly', description: 'Formally pause the backend API task, document current state clearly, and have Anjali review technical context so work can resume efficiently when Pooja returns.', scheduleImpact: 5, budgetImpact: 0, riskLevel: 'low', qualityImpact: 'positive', score: 75, explanation: 'Acceptable decision for a 5-day gap, especially if the task is not on the critical path immediately. Clear documentation enables smooth handoff.' },
      { id: 'sim-003-d', label: 'Ask Pooja to work remotely despite emergency', description: 'Request that Pooja handle the most critical items remotely during her personal emergency.', scheduleImpact: 2, budgetImpact: 0, riskLevel: 'medium', qualityImpact: 'negative', score: 5, explanation: 'Ethically poor decision. Pressuring a team member during a personal emergency damages trust, wellbeing and team culture. Any short-term schedule gain is not worth it.' },
    ]
  },
  {
    id: 'sim-004',
    title: 'SCOPE CREEP REQUEST',
    description: 'A community stakeholder requests that the reporting module include Kannada language support. This was not in the original requirements.',
    context: 'The request was raised after the requirements freeze milestone. The community argues it is essential for accessibility. Adding it would require frontend translation work and content localisation.',
    affectedAreas: ['Scope', 'Schedule', 'Budget', 'Change Control'],
    isActive: false,
    isCompleted: false,
    options: [
      { id: 'sim-004-a', label: 'Log as change request and assess impact formally', description: 'Acknowledge the request, log it as a change request (CR-001), complete an impact assessment (time, cost, risk), and present to the sponsor for a decision.', scheduleImpact: 0, budgetImpact: 0, riskLevel: 'low', qualityImpact: 'positive', score: 95, explanation: 'Excellent. This is exactly how scope changes should be handled. The formal process protects the baseline, ensures transparency, and gives the sponsor an informed decision.' },
      { id: 'sim-004-b', label: 'Accept the request and add it to Sprint 3', description: 'Tell the stakeholder yes and immediately add Kannada support to the development sprint without formal review.', scheduleImpact: 5, budgetImpact: 25000, riskLevel: 'high', qualityImpact: 'negative', score: 15, explanation: 'Poor decision. Accepting scope changes without formal assessment bypasses governance, threatens the baseline, and sets a precedent for future informal requests.' },
      { id: 'sim-004-c', label: 'Defer to Phase 2 and document the deferral', description: 'Log the request in the product backlog as a Phase 2 consideration, explain the rationale to the stakeholder, and confirm the decision in writing.', scheduleImpact: 0, budgetImpact: 0, riskLevel: 'low', qualityImpact: 'neutral', score: 80, explanation: 'Acceptable decision if timeline is genuinely constrained. Deferring with clear communication and documentation is better than a rushed implementation.' },
      { id: 'sim-004-d', label: 'Reject the request outright', description: 'Tell the community stakeholder the requirements are frozen and the request cannot be considered.', scheduleImpact: 0, budgetImpact: 0, riskLevel: 'medium', qualityImpact: 'neutral', score: 25, explanation: 'Poor stakeholder management. An outright rejection without assessment or escalation path damages the relationship and misses a potentially valid accessibility improvement.' },
    ]
  },
  {
    id: 'sim-005',
    title: 'CRITICAL TECHNICAL FAILURE',
    description: 'During integration testing, the Leaflet mapping module fails to load GIS data for Bengaluru coordinates due to a coordinate system mismatch (EPSG:32643 vs EPSG:4326).',
    context: 'All GIS data was processed in UTM zone 43N (EPSG:32643) but the map library expects WGS84 (EPSG:4326). This affects every map visualization. Testing is blocked.',
    affectedAreas: ['Technical', 'Testing', 'Schedule', 'Quality'],
    isActive: false,
    isCompleted: false,
    options: [
      { id: 'sim-005-a', label: 'Raise issue, assign owner, define resolution plan', description: 'Formally raise an issue (ISS-004) in the RAID log, assign Vikram as owner, define a 2-day resolution plan to re-project all GIS data, and update the testing schedule.', scheduleImpact: 2, budgetImpact: 0, riskLevel: 'low', qualityImpact: 'positive', score: 95, explanation: 'Excellent structured response. Issue ownership, clear plan, and transparent schedule update demonstrates disciplined project management under pressure.' },
      { id: 'sim-005-b', label: 'Have the team work overnight to fix it immediately', description: 'Ask GIS and development team to work through the night to resolve the coordinate issue without updating documentation or the schedule.', scheduleImpact: 0, budgetImpact: 5000, riskLevel: 'high', qualityImpact: 'negative', score: 20, explanation: 'Poor approach. Undocumented emergency fixes create technical risk, team fatigue, and leave no audit trail. The 2-day fix is better than a rushed overnight patch.' },
      { id: 'sim-005-c', label: 'Log, resolve methodically, and conduct a root cause review', description: 'Log the issue, resolve systematically, conduct a brief root cause analysis to prevent similar issues, and add coordinate system validation to the QA checklist.', scheduleImpact: 3, budgetImpact: 0, riskLevel: 'low', qualityImpact: 'positive', score: 100, explanation: 'Outstanding PM response. Root cause analysis prevents recurrence. Systematic resolution over rushing demonstrates professional quality management.' },
      { id: 'sim-005-d', label: 'Remove the GIS layer feature and launch without it', description: 'Remove the GIS condition layer feature from scope to avoid the technical issue and launch on time.', scheduleImpact: 0, budgetImpact: 0, riskLevel: 'medium', qualityImpact: 'negative', score: 10, explanation: 'Very poor decision. The GIS condition layer is a core feature of the urban intelligence platform. Removing it to avoid a 2-day technical fix is disproportionate.' },
    ]
  },
  {
    id: 'sim-006',
    title: 'STAKEHOLDER APPROVAL DELAY',
    description: 'BBMP Infrastructure Division delays their sign-off on the pilot data-sharing agreement by 4 working days beyond the agreed deadline.',
    context: 'The pilot launch (Milestone 6) depends on BBMP formal approval. Without it, the deployment cannot proceed. The launch is currently scheduled for Day 80, with 4 days of schedule buffer remaining.',
    affectedAreas: ['Schedule', 'Stakeholders', 'Milestones', 'Pilot Launch'],
    isActive: false,
    isCompleted: false,
    options: [
      { id: 'sim-006-a', label: 'Send formal escalation letter and use the buffer', description: 'Send a formal letter to the BBMP approving officer highlighting schedule impact. Use the 4-day buffer in the schedule. Notify sponsor.', scheduleImpact: 4, budgetImpact: 0, riskLevel: 'medium', qualityImpact: 'neutral', score: 85, explanation: 'Good response. Using the buffer is correct. Formal written communication creates a paper trail. Sponsor notification is appropriate.' },
      { id: 'sim-006-b', label: 'Deploy without BBMP approval and seek approval retroactively', description: 'Proceed with the pilot launch and seek BBMP approval after deployment to avoid delay.', scheduleImpact: 0, budgetImpact: 0, riskLevel: 'high', qualityImpact: 'negative', score: 5, explanation: 'Critical error. Proceeding without required stakeholder approval may breach the data-sharing agreement and expose the project to legal and reputational risk.' },
      { id: 'sim-006-c', label: 'Schedule meeting with BBMP approving officer and offer to present', description: 'Request an urgent meeting with the BBMP decision-maker. Offer to present the final prototype directly to expedite the approval process.', scheduleImpact: 2, budgetImpact: 0, riskLevel: 'low', qualityImpact: 'positive', score: 95, explanation: 'Excellent stakeholder management. Proactive facilitation of the decision-maker\'s approval is the most effective approach. Recovers half the delay through engagement.' },
      { id: 'sim-006-d', label: 'Accept the delay and extend the project timeline by 4 days', description: 'Accept the full 4-day delay, extend the project end date, and inform all stakeholders of the revised plan.', scheduleImpact: 4, budgetImpact: 8000, riskLevel: 'medium', qualityImpact: 'neutral', score: 55, explanation: 'Acceptable but passive. Transparent communication is correct, but no active effort to expedite approval means you are accepting an avoidable delay.' },
    ]
  },
];

export const DEMO_ACTIVITY_LOG: ActivityLog[] = [
  { id: 'act-001', timestamp: d(0) + 'T09:00:00', actor: 'Rahul Sharma', entityType: 'Task', entityId: 'task-001', action: 'Created', details: 'Task created: Draft project charter document' },
  { id: 'act-002', timestamp: d(4) + 'T17:00:00', actor: 'Rahul Sharma', entityType: 'Task', entityId: 'task-001', action: 'Completed', details: 'Task marked as done. Actual hours: 18h' },
  { id: 'act-003', timestamp: d(11) + 'T10:00:00', actor: 'Priya Nair', entityType: 'Milestone', entityId: 'ms-01', action: 'Completed', details: 'Project Charter Approved milestone achieved' },
  { id: 'act-004', timestamp: d(44) + 'T10:00:00', actor: 'Community NGO', entityType: 'ChangeRequest', entityId: 'cr-001', action: 'Submitted', details: 'Change request: Add Kannada language support' },
  { id: 'act-005', timestamp: d(48) + 'T14:00:00', actor: 'Rahul Sharma', entityType: 'Issue', entityId: 'iss-001', action: 'Raised', details: 'Issue raised: Backend API blocked on schema approval' },
  { id: 'act-006', timestamp: d(50) + 'T09:00:00', actor: 'BBMP', entityType: 'ChangeRequest', entityId: 'cr-002', action: 'Submitted', details: 'Change request: Expand pilot to 5 corridors' },
];
