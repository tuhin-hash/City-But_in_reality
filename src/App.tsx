import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { ToastProvider } from './components/ui/Toast';

// Pages
import { Overview } from './pages/Overview';
import { Charter } from './pages/Charter';
import { Roadmap } from './pages/Roadmap';
import { WBS } from './pages/WBS';
import { Tasks } from './pages/Tasks';
import { Timeline } from './pages/Timeline';
import { Sprints } from './pages/Sprints';
import { Team } from './pages/Team';
import { Stakeholders } from './pages/Stakeholders';
import { Risks } from './pages/Risks';
import { Budget } from './pages/Budget';
import { Issues } from './pages/Issues';
import { Changes } from './pages/Changes';
import { Communications } from './pages/Communications';
import { Reports } from './pages/Reports';
import { Simulation } from './pages/Simulation';
import { Closure } from './pages/Closure';
import { CaseStudy } from './pages/CaseStudy';

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="charter" element={<Charter />} />
            <Route path="roadmap" element={<Roadmap />} />
            <Route path="wbs" element={<WBS />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="sprints" element={<Sprints />} />
            <Route path="team" element={<Team />} />
            <Route path="stakeholders" element={<Stakeholders />} />
            <Route path="risks" element={<Risks />} />
            <Route path="budget" element={<Budget />} />
            <Route path="issues" element={<Issues />} />
            <Route path="changes" element={<Changes />} />
            <Route path="communications" element={<Communications />} />
            <Route path="reports" element={<Reports />} />
            <Route path="simulation" element={<Simulation />} />
            <Route path="closure" element={<Closure />} />
            <Route path="case-study" element={<CaseStudy />} />
            <Route path="*" element={<Navigate to="/overview" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
