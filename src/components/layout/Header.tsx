import React, { useState } from 'react';
import { useProjectStore } from '../../store/projectStore';
import {
  Search,
  Bell,
  RotateCcw,
  Menu,
  CheckCircle,
  HelpCircle,
  UserCheck,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';
import { Modal } from '../ui/Modal';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onToggleMobile: () => void;
}

export function Header({ onToggleMobile }: HeaderProps) {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const {
    tasks,
    risks,
    resetToDemo,
    charterStatus,
  } = useProjectStore();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [infoOpen, setInfoOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const blockedTasks = tasks.filter((t) => t.status === 'blocked');
  const highRisks = risks.filter((r) => r.exposure >= 12);

  const filteredTasks = searchQuery.trim()
    ? tasks.filter(
        (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.wbsCode.includes(searchQuery)
      )
    : [];

  const handleReset = () => {
    if (window.confirm('Reset all project data to initial demonstration baseline?')) {
      resetToDemo();
      addToast('Project data restored to baseline demo state.', 'success');
    }
  };

  return (
    <header className="h-14 bg-[#141714] border-b border-[#2A2E2A] flex items-center justify-between px-4 sticky top-0 z-40 select-none">
      {/* Left: Mobile Toggle & Project Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="lg:hidden text-[#969B92] hover:text-[#F1F0E8] p-1.5 border border-[#2A2E2A]"
          aria-label="Toggle Navigation"
        >
          <Menu size={16} />
        </button>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 border border-[#2A2E2A] bg-[#181B18] font-mono text-[10px]">
            <span className="text-[#969B92]">PROJECT:</span>
            <span className="text-[#F1F0E8] font-medium">CITY/REALITY</span>
          </div>

          <div className="flex items-center gap-1.5 px-2 py-0.5 border border-[#2A2E2A] bg-[#181B18] font-mono text-[10px]">
            <span className="text-[#969B92]">PHASE:</span>
            <span className="text-[#79B8FF] font-semibold">04 DESIGN & DEV</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 border border-[#C6FF54]/30 bg-[#C6FF54]/10 font-mono text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF54] animate-pulse" />
            <span className="text-[#C6FF54] font-medium">PILOT WK 8/12</span>
          </div>
        </div>
      </div>

      {/* Center: Quick Search Trigger */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <button
          onClick={() => setSearchOpen(true)}
          className="w-full flex items-center justify-between px-3 py-1.5 bg-[#181B18] border border-[#2A2E2A] hover:border-[#969B92] text-[#969B92] text-xs font-mono transition-colors"
        >
          <div className="flex items-center gap-2">
            <Search size={13} className="text-[#5F655B]" />
            <span>Search tasks, deliverables, WBS codes...</span>
          </div>
          <span className="text-[10px] bg-[#202420] border border-[#2A2E2A] px-1.5 py-0.2 text-[#5F655B]">
            CTRL+K
          </span>
        </button>
      </div>

      {/* Right: Actions, Notifications, Demo Badge */}
      <div className="flex items-center gap-2 font-mono">
        {/* Reset Demo Button */}
        <Button
          variant="secondary"
          size="xs"
          onClick={handleReset}
          className="text-[#969B92] hover:text-[#FF8B45] hover:border-[#FF8B45]/40"
          title="Reset project data to initial baseline"
        >
          <RotateCcw size={11} />
          <span className="hidden sm:inline">RESET DEMO</span>
        </Button>

        {/* Info Modal Trigger */}
        <button
          onClick={() => setInfoOpen(true)}
          className="p-1.5 text-[#969B92] hover:text-[#C6FF54] border border-[#2A2E2A] hover:border-[#C6FF54]/30 transition-colors"
          title="About this Project Manager portfolio app"
        >
          <HelpCircle size={15} />
        </button>

        {/* Notifications / Alerts Popover */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-1.5 text-[#969B92] hover:text-[#F1F0E8] border border-[#2A2E2A] hover:border-[#969B92] relative transition-colors"
            title="Notifications & PM Alerts"
          >
            <Bell size={15} />
            {(blockedTasks.length > 0 || highRisks.length > 0) && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#FF5E5E] rounded-full border-2 border-[#141714]" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#181B18] border border-[#2A2E2A] shadow-2xl p-3 z-50 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-[#2A2E2A] mb-2 font-mono text-[10px] text-[#969B92]">
                <span>CRITICAL PM ATTENTION ITEMS</span>
                <span className="text-[#FF5E5E]">
                  {blockedTasks.length + highRisks.length} ALERTS
                </span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {blockedTasks.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setNotificationsOpen(false);
                      navigate('/tasks');
                    }}
                    className="p-2 border border-[#FF5E5E]/20 bg-[#FF5E5E]/5 cursor-pointer hover:border-[#FF5E5E]/40"
                  >
                    <div className="text-[10px] text-[#FF5E5E] font-mono font-bold flex items-center justify-between">
                      <span>BLOCKED TASK: {t.wbsCode}</span>
                      <span>HIGH PRIORITY</span>
                    </div>
                    <div className="text-xs text-[#F1F0E8] truncate mt-0.5">
                      {t.title}
                    </div>
                  </div>
                ))}

                {highRisks.map((r) => (
                  <div
                    key={r.id}
                    onClick={() => {
                      setNotificationsOpen(false);
                      navigate('/risks');
                    }}
                    className="p-2 border border-[#FF8B45]/20 bg-[#FF8B45]/5 cursor-pointer hover:border-[#FF8B45]/40"
                  >
                    <div className="text-[10px] text-[#FF8B45] font-mono font-bold flex items-center justify-between">
                      <span>HIGH RISK: {r.id}</span>
                      <span>SCORE: {r.exposure}</span>
                    </div>
                    <div className="text-xs text-[#F1F0E8] truncate mt-0.5">
                      {r.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* PM Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#2A2E2A]">
          <div className="w-7 h-7 rounded-none bg-[#202420] border border-[#2A2E2A] flex items-center justify-center font-mono text-xs text-[#C6FF54] font-bold">
            RS
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs text-[#F1F0E8] font-medium leading-none">
              Rahul Sharma
            </div>
            <div className="text-[9px] text-[#969B92] leading-none mt-1">
              Project Manager (Lead)
            </div>
          </div>
        </div>
      </div>

      {/* Quick Search Modal */}
      <Modal
        open={searchOpen}
        onClose={() => {
          setSearchOpen(false);
          setSearchQuery('');
        }}
        title="GLOBAL PROJECT SEARCH"
        size="md"
      >
        <div className="space-y-3">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#969B92]"
            />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks, WBS, deliverables, risks..."
              className="w-full bg-[#101210] border border-[#2A2E2A] text-xs text-[#F1F0E8] pl-9 pr-3 py-2.5 font-mono focus:outline-none focus:border-[#C6FF54]"
            />
          </div>

          <div className="max-h-72 overflow-y-auto space-y-1">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    setSearchOpen(false);
                    navigate('/tasks');
                  }}
                  className="p-2 border border-[#2A2E2A] hover:border-[#C6FF54]/40 bg-[#141714] cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <span className="font-mono text-[10px] text-[#C6FF54] mr-2">
                      {t.wbsCode}
                    </span>
                    <span className="text-xs text-[#F1F0E8]">{t.title}</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 border border-[#2A2E2A] text-[#969B92]">
                    {t.status}
                  </span>
                </div>
              ))
            ) : searchQuery ? (
              <div className="text-center py-6 text-xs text-[#969B92] font-mono">
                No matching project records found.
              </div>
            ) : (
              <div className="text-[11px] text-[#5F655B] font-mono py-2">
                Type keywords like "GIS", "mapping", "charter", "testing", or WBS
                codes like "4.2"
              </div>
            )}
          </div>
        </div>
      </Modal>

      {/* Info / Portfolio Context Modal */}
      <Modal
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="ABOUT THIS COMMAND CENTER"
        subtitle="Google Project Manager Entry-Level Portfolio Demonstration"
        size="lg"
      >
        <div className="space-y-4 text-xs text-[#969B92] leading-relaxed">
          <div className="p-3 border border-[#C6FF54]/20 bg-[#C6FF54]/5 text-[#F1F0E8]">
            <div className="font-mono text-xs font-bold text-[#C6FF54] mb-1">
              SIMULATED PORTFOLIO ENVIRONMENT
            </div>
            All data, budgets, risks, sprints, metrics, and scenarios in this
            application represent an illustrative 12-week urban mobility
            intelligence pilot in Bengaluru. Built to showcase core PM
            competencies for technology delivery.
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase text-[#F1F0E8] font-bold mb-1">
              DEMONSTRATED COMPETENCIES:
            </h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                <strong className="text-[#F1F0E8]">Hybrid Agile Governance:</strong> Combined
                Waterfall stage-gates with 2-week execution sprints.
              </li>
              <li>
                <strong className="text-[#F1F0E8]">Earned Value Management (EVM):</strong> Real-time
                CPI, SPI, EAC, and budget tracking.
              </li>
              <li>
                <strong className="text-[#F1F0E8]">RAID & Risk Control:</strong> 5×5 probability/impact
                matrix with quantifiable mitigation workflows.
              </li>
              <li>
                <strong className="text-[#F1F0E8]">Delivery Simulation:</strong> Signature scenario
                simulator testing trade-off decision quality.
              </li>
              <li>
                <strong className="text-[#F1F0E8]">Stakeholder Management:</strong> Power-Interest
                matrix and engagement action planning.
              </li>
            </ul>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="lime" size="sm" onClick={() => setInfoOpen(false)}>
              EXPLORE COMMAND CENTER
            </Button>
          </div>
        </div>
      </Modal>
    </header>
  );
}
