'use client';

import { useRef, useState } from 'react';
import { useAppState } from '@/context/AppStateContext';
import { demoDoctor, otherPatients } from '@/data/mockData';
import { compareReports } from '@/lib/compareReports';
import { Patient } from '@/types';
import PatientList from './PatientList';
import ReportCard from './ReportCard';
import ReportComparison from './ReportComparison';
import ApprovalPanel from './ApprovalPanel';
import AccessRestrictedState from './AccessRestrictedState';
import MedicalTimeline from './MedicalTimeline';
import PatientBriefing from './PatientBriefing';
import DoctorNotificationCard from './DoctorNotificationCard';
import OriginalReportPreview from './OriginalReportPreview';
import DoctorNoteForm from './DoctorNoteForm';
import AppointmentDecision from './AppointmentDecision';

export default function DoctorDashboard() {
  const { familyMembers, selectedFamilyMemberId, selectFamilyMember, getMemberReports, getMemberTimeline, getMemberConsent, getMemberApproval, getMemberLatestAppointment, notifications, uploadedFiles, approveUpdate, markNotificationRead } = useAppState();
  const [showOriginal, setShowOriginal] = useState(false);
  const briefingRef = useRef<HTMLElement>(null);
  const member = familyMembers.find((item) => item.id === selectedFamilyMemberId) ?? familyMembers[0];
  const consent = getMemberConsent(member.id);
  const memberReports = getMemberReports(member.id);
  const current = memberReports[memberReports.length - 1];
  const previous = memberReports[memberReports.length - 2] ?? current;
  const changes = current && previous && previous.id !== current.id ? compareReports(previous, current) : [];
  const sourceFile = uploadedFiles.find((file) => file.id === current?.sourceFileId);
  const approval = getMemberApproval(member.id);
  const latestAppointment = getMemberLatestAppointment(member.id);
  const familyPatients: Patient[] = familyMembers.map((familyMember) => { const reports = getMemberReports(familyMember.id); const last = reports[reports.length - 1]; return { id: familyMember.id, name: familyMember.name, age: familyMember.age, gender: familyMember.gender, bloodGroup: familyMember.bloodGroup, lastVisit: last?.date ?? 'no reports yet', avatarInitials: familyMember.avatarInitials }; });
  const doctorNotifications = notifications.filter((notification) => notification.audience === 'doctor' && !notification.read);

  function handleReviewBriefing(id: string, familyMemberId: string) {
    markNotificationRead(id);
    selectFamilyMember(familyMemberId);
    briefingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return <div className="mx-auto max-w-3xl space-y-5 px-4 py-5">
    <div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">{demoDoctor.name.split(' ').map((word) => word[0]).slice(-2).join('')}</div><div><p className="text-base font-semibold text-slate-900">{demoDoctor.name}</p><p className="text-xs text-slate-500">{demoDoctor.specialty} · {demoDoctor.hospital}</p></div></div>
    {doctorNotifications.length > 0 && <div className="space-y-2">{doctorNotifications.map((notification) => <DoctorNotificationCard key={notification.id} notification={notification} onReviewBriefing={() => handleReviewBriefing(notification.id, notification.familyMemberId)} />)}</div>}
    <section><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">your patients</p><PatientList patients={[...familyPatients, ...otherPatients]} activePatientId={member.id} interactiveIds={familyMembers.map((item) => item.id)} onSelect={selectFamilyMember} /></section>
    {consent.status !== 'granted' ? <AccessRestrictedState patientName={member.name} /> : !current ? <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center"><p className="text-sm font-medium text-slate-700">no reports uploaded yet for {member.name}</p><p className="mt-1 text-xs text-slate-400">records will appear here once the patient uploads a report.</p></div> : <>
      <section ref={briefingRef} className="scroll-mt-20"><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">patient briefing</p><PatientBriefing previous={previous} current={current} changes={changes} reportCount={Math.max(memberReports.length - 2, 0)} hasOriginal={Boolean(sourceFile)} onViewOriginal={() => setShowOriginal(true)} /></section>
      <section><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">reports</p><div className="space-y-2">{previous.id !== current.id && <ReportCard report={previous} tag="previous" />}<ReportCard report={current} tag="current" /></div></section>
      {previous.id !== current.id && <section><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">compare reports</p><ReportComparison previous={previous} current={current} /></section>}
      {approval && <section><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">approval</p><ApprovalPanel approval={approval} onApprove={() => approveUpdate(member.id)} /></section>}
      <section><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">note for patient</p><DoctorNoteForm familyMemberId={member.id} reportId={current.id} /></section>
      <section><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">next visit</p><AppointmentDecision familyMemberId={member.id} latest={latestAppointment} /></section>
      <section><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">patient timeline</p><MedicalTimeline events={getMemberTimeline(member.id)} /></section>
    </>}
    {showOriginal && <OriginalReportPreview file={sourceFile} onClose={() => setShowOriginal(false)} />}
  </div>;
}
