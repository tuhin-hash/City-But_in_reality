import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Milestone as MilestoneIcon,
  Layers,
  CheckSquare,
  GanttChart,
  Repeat,
  Users,
  Compass,
  ShieldAlert,
  Wallet,
  AlertTriangle,
  GitPullRequest,
  Radio,
  BarChart3,
  Sparkles,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tag?: string;
  badge?: string;
}

const navSections: { title: string; items: NavItem[] }[] = [
  {
    title: 'CORE & GOVERNANCE',
    items: [
      { to: '/overview', label: 'Overview', icon: LayoutDashboard },
      { to: '/charter', label: 'Project Charter', icon: FileText },
      { to: '/roadmap', label: 'Project Roadmap', icon: MilestoneIcon },
      { to: '/wbs', label: 'Work Breakdown', icon: Layers },
    ],
  },
  {
    title: 'EXECUTION & DELIVERY',
    items: [
      { to: '/tasks', label: 'Task Management', icon: CheckSquare },
      { to: '/timeline', label: 'Timeline & Gantt', icon: GanttChart },
      { to: '/sprints', label: 'Sprint Management', icon: Repeat },
      { to: '/simulation', label: 'Delivery Simulation', icon: Sparkles, badge: 'SIGNATURE' },
    ],
  },
  {
    title: 'PEOPLE & STAKEHOLDERS',
    items: [
      { to: '/team', label: 'Team & Resources', icon: Users },
      { to: '/stakeholders', label: 'Stakeholders', icon: Compass },
      { to: '/communications', label: 'Communications', icon: Radio },
    ],
  },
  {
    title: 'CONTROL & ASSURANCE',
    items: [
      { to: '/risks', label: 'Risk Register (RAID)', icon: ShieldAlert },
      { to: '/budget', label: 'Budget & Costs (EVM)', icon: Wallet },
      { to: '/issues', label: 'Issues & Deps', icon: AlertTriangle },
      { to: '/changes', label: 'Change Requests', icon: GitPullRequest },
      { to: '/reports', label: 'Reports & Analytics', icon: BarChart3 },
    ],
  },
  {
    title: 'CLOSURE & CASE STUDY',
    items: [
      { to: '/closure', label: 'Project Closure', icon: CheckCircle2 },
      { to: '/case-study', label: 'PM Case Study', icon: BookOpen, tag: 'PORTFOLIO' },
    ],
  },
];

interface SidebarProps {
  collapsed?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ onCloseMobile }: SidebarProps) {
  return (
    <aside className="w-64 bg-[#141714] border-r border-[#2A2E2A] flex flex-col h-full shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#2A2E2A] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-[#202420] border border-[#C6FF54]/40 flex items-center justify-center font-mono text-xs font-bold text-[#C6FF54]">
            CR
          </div>
          <div>
            <div className="font-mono text-xs font-bold tracking-wider text-[#F1F0E8] flex items-center gap-1.5">
              <span>CITY, BUT IN REALITY</span>
            </div>
            <div className="text-[10px] text-[#969B92] font-mono tracking-tight">
              Urban Mobility Pilot · PM Center
            </div>
          </div>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-5">
        {navSections.map((sec) => (
          <div key={sec.title}>
            <div className="px-2 mb-1.5 font-mono text-[9px] uppercase tracking-widest text-[#5F655B] font-semibold">
              {sec.title}
            </div>
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-none transition-all duration-150 border-l-2 ${
                        isActive
                          ? 'bg-[#1C201C] text-[#C6FF54] border-[#C6FF54]'
                          : 'text-[#969B92] hover:text-[#F1F0E8] hover:bg-[#181B18] border-transparent'
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon size={14} className="shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="font-mono text-[8px] bg-[#C6FF54]/10 text-[#C6FF54] border border-[#C6FF54]/30 px-1 py-0.2">
                        {item.badge}
                      </span>
                    )}
                    {item.tag && (
                      <span className="font-mono text-[8px] bg-[#79B8FF]/10 text-[#79B8FF] border border-[#79B8FF]/30 px-1 py-0.2">
                        {item.tag}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-[#2A2E2A] bg-[#101210] text-[10px] font-mono text-[#969B92]">
        <div className="flex items-center justify-between text-[#5F655B] mb-1">
          <span>PORTFOLIO DEMO</span>
          <span className="text-[#C6FF54]">v1.0</span>
        </div>
        <div className="truncate text-[9px] text-[#969B92]">
          Bengaluru Urban Pilot (12 Wks)
        </div>
      </div>
    </aside>
  );
}
