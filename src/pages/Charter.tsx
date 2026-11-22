import React, { useState } from 'react';
import { useProjectStore } from '../store/projectStore';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useToast } from '../components/ui/Toast';
import {
  FileText,
  CheckCircle,
  Save,
  Shield,
  Layers,
  Calendar,
  IndianRupee,
  UserCheck,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

export function Charter() {
  const { addToast } = useToast();
  const { charterStatus, updateCharterStatus, charterData, updateCharterData } =
    useProjectStore();

  const [formData, setFormData] = useState({
    projectName: charterData.projectName || 'CITY, BUT IN REALITY — Urban Mobility Intelligence Pilot',
    location: charterData.location || 'Bengaluru, Karnataka, India (Yelahanka, Hebbal, Manyata Corridor)',
    duration: charterData.duration || '12 Weeks (Hybrid Agile Delivery Lifecycle)',
    budget: charterData.budget || '₹12,00,000 (INR Twelve Lakhs Baseline)',
    sponsor: charterData.sponsor || 'Priya Nair, VP Urban Product Initiatives',
    manager: charterData.manager || 'Rahul Sharma, Lead Project Manager',
    businessNeed:
      charterData.businessNeed ||
      'Conventional navigation systems prioritize Euclidean shortest paths and vehicle travel time, ignoring pedestrian physical friction. Pedestrians in urban centers face unmapped obstacles: broken footpaths, open drains, monsoon waterlogging, missing crossings, and zero-shade heat corridors. There is an acute lack of real-world walking quality intelligence for municipal urban planners and daily commuters.',
    projectObjectives:
      charterData.projectObjectives ||
      '1. Develop a working urban mobility intelligence web platform indexing pedestrian friction.\n2. Collect, validate, and enrich GIS sidewalk data across 3 pilot corridors in Bengaluru North.\n3. Implement a transparent 0-100 Reality Scoring model based on footpath quality, safety, heat, and obstruction.\n4. Deploy an end-to-end community reporting pipeline with geo-tagged verification.\n5. Conduct a 2-week public stakeholder pilot with BBMP and urban mobility NGOs.',
    inScope:
      charterData.inScope ||
      '- Pedestrian routing algorithm incorporating 5 friction indices\n- Interactive Leaflet-based map console with 6 condition layers\n- Bengaluru pilot corridors (Yelahanka, Hebbal, Manyata Tech Park)\n- Crowdsourced issue reporting module with offline storage\n- Municipal data export format for BBMP Infrastructure Division\n- Delivery of a 12-week PM governance framework and documentation',
    outOfScope:
      charterData.outOfScope ||
      '- City-wide automated vehicle routing or motorized transit tracking\n- Permanent hardware IoT sensor installation on physical street poles\n- Real-time automated CCTV computer-vision surveillance\n- Municipal enforcement or direct ticketing of sidewalk encroachments\n- Commercial monetisation or proprietary paid map SDK licenses',
    successCriteria:
      charterData.successCriteria ||
      '- Delivery of fully functional interactive web console on schedule (12 weeks)\n- Cost variance maintained within ±5% of ₹12,00,000 baseline\n- Minimum 85% ground-truth accuracy on audited pilot street segments\n- Formal sign-off on pilot demonstration from BBMP Infrastructure Division\n- Zero critical unmitigated risks upon release to community trial',
    assumptions:
      charterData.assumptions ||
      '- OpenStreetMap (OSM) data for Bengaluru North remains accessible without disruption\n- Field survey team obtains required BBMP pedestrian corridor access permits\n- Local community advocates participate in usability testing and sprint review sessions\n- Backend development dependencies resolve according to Sprint 2 schedule',
    constraints:
      charterData.constraints ||
      '- Fixed 12-week delivery window (zero calendar extension allowed)\n- Strict ₹12,00,000 total budget cap with ₹1,50,000 contingency reserve\n- Requirement to use only free/open-source GIS and map tile infrastructure\n- Small 10-person cross-functional core project team',
  });

  const handleInputChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSave = () => {
    updateCharterData(formData);
    addToast('Project charter updates saved successfully.', 'success');
  };

  const handleWorkflowAdvance = () => {
    if (charterStatus === 'draft') {
      updateCharterStatus('review');
      addToast('Charter transitioned to UNDER REVIEW status.', 'info');
    } else if (charterStatus === 'review') {
      updateCharterStatus('approved');
      addToast('Charter formally APPROVED by Project Sponsor.', 'success');
    } else if (charterStatus === 'approved') {
      updateCharterStatus('baselined');
      addToast('Project baseline established. Stage-gate formal sign-off locked.', 'success');
    }
  };

  const workflowSteps = [
    { key: 'draft', label: '1. DRAFT' },
    { key: 'review', label: '2. UNDER REVIEW' },
    { key: 'approved', label: '3. APPROVED' },
    { key: 'baselined', label: '4. BASELINE ESTABLISHED' },
  ];

  const currentStepIdx = workflowSteps.findIndex((s) => s.key === charterStatus);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title & Governance Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E2A] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] text-[#C6FF54] uppercase tracking-widest border border-[#C6FF54]/30 px-1.5 py-0.5 bg-[#C6FF54]/5">
              STAGE-GATE 01 GOVERNANCE
            </span>
            <span className="font-mono text-[10px] text-[#969B92]">
              FORMAL INITIATION DOCUMENT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#F1F0E8]">
            PROJECT CHARTER
          </h1>
          <p className="text-xs text-[#969B92] mt-1">
            The foundational contract authorizing project resources, defining scope boundaries,
            and establishing the baseline commitments between Sponsor and Project Manager.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleSave}>
            <Save size={13} />
            <span>SAVE DRAFT</span>
          </Button>

          {charterStatus !== 'baselined' && (
            <Button variant="lime" size="sm" onClick={handleWorkflowAdvance}>
              <span>ADVANCE WORKFLOW</span>
              <ArrowRight size={13} />
            </Button>
          )}
        </div>
      </div>

      {/* Approval Status Workflow Bar */}
      <div className="bg-[#181B18] border border-[#2A2E2A] p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#969B92]">
            CHARTER GOVERNANCE LIFECYCLE
          </span>
          <span className="font-mono text-[10px] text-[#C6FF54] font-bold">
            CURRENT STATUS: {charterStatus.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {workflowSteps.map((step, idx) => {
            const isCompleted = idx <= currentStepIdx;
            const isCurrent = idx === currentStepIdx;
            return (
              <div
                key={step.key}
                className={`p-2.5 border text-center transition-all ${
                  isCurrent
                    ? 'border-[#C6FF54] bg-[#C6FF54]/10 text-[#C6FF54]'
                    : isCompleted
                    ? 'border-[#C6FF54]/40 bg-[#C6FF54]/5 text-[#C6FF54]'
                    : 'border-[#2A2E2A] bg-[#141714] text-[#5F655B]'
                }`}
              >
                <div className="font-mono text-[10px] font-bold tracking-wider">
                  {step.label}
                </div>
                <div className="text-[9px] font-mono mt-0.5">
                  {isCompleted ? 'VERIFIED' : 'PENDING'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Primary Charter Document Sheet */}
      <div className="bg-[#181B18] border border-[#2A2E2A] p-6 space-y-6">
        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-[#141714] border border-[#2A2E2A] font-mono text-xs">
          <div>
            <div className="text-[9px] text-[#969B92] uppercase">SPONSOR</div>
            <div className="text-[#F1F0E8] font-bold mt-0.5">{formData.sponsor}</div>
          </div>
          <div>
            <div className="text-[9px] text-[#969B92] uppercase">PROJECT MANAGER</div>
            <div className="text-[#F1F0E8] font-bold mt-0.5">{formData.manager}</div>
          </div>
          <div>
            <div className="text-[9px] text-[#969B92] uppercase">PLANNED BUDGET</div>
            <div className="text-[#C6FF54] font-bold mt-0.5">{formData.budget}</div>
          </div>
          <div>
            <div className="text-[9px] text-[#969B92] uppercase">TIMELINE</div>
            <div className="text-[#79B8FF] font-bold mt-0.5">{formData.duration}</div>
          </div>
        </div>

        {/* Section 1: Business Need & Justification */}
        <div>
          <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#C6FF54] mb-2 flex items-center gap-1.5">
            <FileText size={14} />
            <span>01. BUSINESS NEED & STRATEGIC JUSTIFICATION</span>
          </label>
          <textarea
            rows={4}
            value={formData.businessNeed}
            onChange={(e) => handleInputChange('businessNeed', e.target.value)}
            className="w-full bg-[#101210] border border-[#2A2E2A] p-3 text-xs text-[#F1F0E8] leading-relaxed focus:outline-none focus:border-[#C6FF54] font-sans"
          />
        </div>

        {/* Section 2: Project Objectives */}
        <div>
          <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#C6FF54] mb-2 flex items-center gap-1.5">
            <CheckCircle size={14} />
            <span>02. MEASURABLE PROJECT OBJECTIVES</span>
          </label>
          <textarea
            rows={5}
            value={formData.projectObjectives}
            onChange={(e) => handleInputChange('projectObjectives', e.target.value)}
            className="w-full bg-[#101210] border border-[#2A2E2A] p-3 text-xs text-[#F1F0E8] leading-relaxed focus:outline-none focus:border-[#C6FF54] font-mono"
          />
        </div>

        {/* Section 3: Scope Breakdown (In vs Out) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#79B8FF] mb-2 flex items-center gap-1.5">
              <Layers size={14} />
              <span>03A. IN-SCOPE DELIVERABLES</span>
            </label>
            <textarea
              rows={6}
              value={formData.inScope}
              onChange={(e) => handleInputChange('inScope', e.target.value)}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-3 text-xs text-[#F1F0E8] leading-relaxed focus:outline-none focus:border-[#79B8FF] font-sans"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#FF5E5E] mb-2 flex items-center gap-1.5">
              <AlertCircle size={14} />
              <span>03B. EXPLICITLY OUT OF SCOPE</span>
            </label>
            <textarea
              rows={6}
              value={formData.outOfScope}
              onChange={(e) => handleInputChange('outOfScope', e.target.value)}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-3 text-xs text-[#F1F0E8] leading-relaxed focus:outline-none focus:border-[#FF5E5E] font-sans"
            />
          </div>
        </div>

        {/* Section 4: Success Criteria */}
        <div>
          <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#C6FF54] mb-2 flex items-center gap-1.5">
            <Shield size={14} />
            <span>04. QUANTIFIABLE SUCCESS CRITERIA</span>
          </label>
          <textarea
            rows={4}
            value={formData.successCriteria}
            onChange={(e) => handleInputChange('successCriteria', e.target.value)}
            className="w-full bg-[#101210] border border-[#2A2E2A] p-3 text-xs text-[#F1F0E8] leading-relaxed focus:outline-none focus:border-[#C6FF54] font-sans"
          />
        </div>

        {/* Section 5: Assumptions & Constraints */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#969B92] mb-2">
              05A. KEY PLANNING ASSUMPTIONS
            </label>
            <textarea
              rows={4}
              value={formData.assumptions}
              onChange={(e) => handleInputChange('assumptions', e.target.value)}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-3 text-xs text-[#F1F0E8] leading-relaxed focus:outline-none focus:border-[#969B92] font-sans"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold uppercase tracking-wider text-[#969B92] mb-2">
              05B. PROJECT CONSTRAINTS (TRIPLE CONSTRAINT)
            </label>
            <textarea
              rows={4}
              value={formData.constraints}
              onChange={(e) => handleInputChange('constraints', e.target.value)}
              className="w-full bg-[#101210] border border-[#2A2E2A] p-3 text-xs text-[#F1F0E8] leading-relaxed focus:outline-none focus:border-[#969B92] font-sans"
            />
          </div>
        </div>

        {/* Signatures & Formal Authority */}
        <div className="pt-6 border-t border-[#2A2E2A] grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
          <div className="p-4 bg-[#141714] border border-[#2A2E2A]">
            <div className="text-[10px] text-[#969B92] uppercase">SPONSOR SIGN-OFF</div>
            <div className="text-sm font-bold text-[#F1F0E8] mt-1">Priya Nair</div>
            <div className="text-[10px] text-[#C6FF54] mt-1">
              STATUS: {charterStatus === 'approved' || charterStatus === 'baselined' ? 'DIGITALLY SIGNED & AUTHORIZED' : 'AWAITING FINAL REVIEW'}
            </div>
          </div>

          <div className="p-4 bg-[#141714] border border-[#2A2E2A]">
            <div className="text-[10px] text-[#969B92] uppercase">PROJECT MANAGER ACCEPTANCE</div>
            <div className="text-sm font-bold text-[#F1F0E8] mt-1">Rahul Sharma</div>
            <div className="text-[10px] text-[#79B8FF] mt-1">
              AUTHORITY: FULL DELEGATION FOR TIMELINE & BUDGET EXECUTION
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
