'use client';

import { useState } from 'react';
import { UploadCloud } from 'lucide-react';
import { useAppState } from '@/context/AppStateContext';
import HealthSummaryCards from './HealthSummaryCards';
import ReportCard from './ReportCard';
import ReportComparison from './ReportComparison';
import MedicalTimeline from './MedicalTimeline';
import ConsentControl from './ConsentControl';
import NotificationCard from './NotificationCard';
import UploadReportModal from './UploadReportModal';
import FamilySection from './FamilySection';

export default function PatientDashboard() {
  const { familyMembers, selectedFamilyMemberId, getMemberReports, getMemberTimeline, getMemberConsent, notifications, grantAccess, revokeAccess } = useAppState();
  const [showComparison, setShowComparison] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const member = familyMembers.find((item) => item.id === selectedFamilyMemberId) ?? familyMembers[0];
  const memberReports = getMemberReports(member.id);
  const current = memberReports[memberReports.length - 1];
  const previous = memberReports[memberReports.length - 2] ?? current;
  const timeline = getMemberTimeline(member.id);
  const consent = getMemberConsent(member.id);
  const memberNotifications = notifications.filter((notification) => notification.audience === 'patient' && notification.familyMemberId === member.id && !notification.read);

  return <div className="mx-auto max-w-3xl space-y-5 px-4 py-5">
    <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">{member.avatarInitials}</div><div><p className="text-base font-semibold text-slate-900">{member.name}</p><p className="text-xs text-slate-500">{member.relationship} · {member.age} yrs · {member.gender} · last report {current?.date ?? 'none yet'}</p></div></div>
    <FamilySection />
    {memberNotifications.length > 0 && <div className="space-y-2">{memberNotifications.map((notification) => <NotificationCard key={notification.id} notification={notification} />)}</div>}
    <section><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">health overview</p><HealthSummaryCards member={member} latestReport={current} /></section>
    <section><div className="mb-2 flex items-center justify-between"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">latest report</p><button onClick={() => setShowUpload(true)} className="flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white"><UploadCloud size={13} /> upload new report</button></div>{current ? <><ReportCard report={current} tag="current" />{previous && previous.id !== current.id && <button onClick={() => setShowComparison((value) => !value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700">{showComparison ? 'hide what changed' : 'see what changed since last report'}</button>}{showComparison && previous && previous.id !== current.id && <div className="mt-2"><ReportComparison previous={previous} current={current} /></div>}</> : <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center"><p className="text-sm font-medium text-slate-700">no reports yet for {member.name}</p><p className="mt-1 text-xs text-slate-400">upload a report to start their medical record.</p></div>}</section>
    <section><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">doctor access</p><ConsentControl consent={consent} onGrant={() => grantAccess(member.id)} onRevoke={() => revokeAccess(member.id)} /></section>
    <section><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">timeline</p>{timeline.length > 0 ? <MedicalTimeline events={timeline} /> : <p className="text-xs text-slate-400">no timeline events yet.</p>}</section>
    {showUpload && <UploadReportModal defaultMemberId={member.id} onClose={() => setShowUpload(false)} />}
  </div>;
}
