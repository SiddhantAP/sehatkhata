'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import {
  ConsentRecord,
  ApprovalRecord,
  TimelineEvent,
  AppNotification,
  MedicalReport,
  UploadedFile,
  FamilyMember,
} from '@/types';
import {
  familyMembers as initialFamilyMembers,
  initialConsentRecords,
  initialApprovals,
  initialTimeline,
  initialNotifications,
  initialReports,
  demoDoctor,
} from '@/data/mockData';
import { compareReports } from '@/lib/compareReports';

interface AppState {
  familyMembers: FamilyMember[];
  selectedFamilyMemberId: string;
  selectFamilyMember: (id: string) => void;
  addFamilyMember: (data: Omit<FamilyMember, 'id'>) => string;
  updateFamilyMember: (id: string, data: Partial<Omit<FamilyMember, 'id'>>) => void;
  removeFamilyMember: (id: string) => void;
  reports: MedicalReport[];
  uploadedFiles: UploadedFile[];
  consentRecords: ConsentRecord[];
  approvals: ApprovalRecord[];
  timeline: TimelineEvent[];
  notifications: AppNotification[];
  getMemberReports: (id: string) => MedicalReport[];
  getMemberTimeline: (id: string) => TimelineEvent[];
  getMemberConsent: (id: string) => ConsentRecord;
  getMemberApproval: (id: string) => ApprovalRecord | undefined;
  grantAccess: (familyMemberId: string) => void;
  revokeAccess: (familyMemberId: string) => void;
  approveUpdate: (familyMemberId: string) => void;
  addReport: (report: MedicalReport, file?: UploadedFile) => void;
  markNotificationRead: (id: string) => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

function createId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(initialFamilyMembers);
  const [selectedFamilyMemberId, setSelectedFamilyMemberId] = useState(initialFamilyMembers[0]?.id ?? '');
  const [reports, setReports] = useState<MedicalReport[]>(initialReports);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [consentRecords, setConsentRecords] = useState<ConsentRecord[]>(initialConsentRecords);
  const [approvals, setApprovals] = useState<ApprovalRecord[]>(initialApprovals);
  const [timeline, setTimeline] = useState<TimelineEvent[]>(initialTimeline);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);
  const today = new Date().toISOString().split('T')[0];

  function selectFamilyMember(id: string) {
    if (familyMembers.some((member) => member.id === id)) setSelectedFamilyMemberId(id);
  }

  function addFamilyMember(data: Omit<FamilyMember, 'id'>) {
    const id = createId('fam');
    setFamilyMembers((prev) => [...prev, { id, ...data }]);
    setSelectedFamilyMemberId(id);
    return id;
  }

  function updateFamilyMember(id: string, data: Partial<Omit<FamilyMember, 'id'>>) {
    setFamilyMembers((prev) => prev.map((member) => (member.id === id ? { ...member, ...data } : member)));
  }

  function removeFamilyMember(id: string) {
    setFamilyMembers((prev) => {
      const remaining = prev.filter((member) => member.id !== id);
      setSelectedFamilyMemberId((current) => (current === id ? remaining[0]?.id ?? '' : current));
      return remaining;
    });
    setReports((prev) => prev.filter((report) => report.familyMemberId !== id));
    setTimeline((prev) => prev.filter((event) => event.familyMemberId !== id));
    setNotifications((prev) => prev.filter((notification) => notification.familyMemberId !== id));
    setConsentRecords((prev) => prev.filter((consent) => consent.familyMemberId !== id));
    setApprovals((prev) => prev.filter((approval) => approval.familyMemberId !== id));
    setUploadedFiles((prev) => prev.filter((file) => file.familyMemberId !== id));
  }

  function getMemberReports(id: string) {
    return reports.filter((report) => report.familyMemberId === id).sort((a, b) => (a.date < b.date ? -1 : 1));
  }

  function getMemberTimeline(id: string) {
    return timeline.filter((event) => event.familyMemberId === id);
  }

  function getMemberConsent(id: string): ConsentRecord {
    return consentRecords.find((consent) => consent.familyMemberId === id) ?? {
      familyMemberId: id,
      doctorId: demoDoctor.id,
      doctorName: demoDoctor.name,
      status: 'revoked',
      since: '—',
    };
  }

  function getMemberApproval(id: string) {
    return approvals.find((approval) => approval.familyMemberId === id);
  }

  function grantAccess(familyMemberId: string) {
    const member = familyMembers.find((candidate) => candidate.id === familyMemberId);
    setConsentRecords((prev) => {
      if (prev.some((consent) => consent.familyMemberId === familyMemberId)) {
        return prev.map((consent) => consent.familyMemberId === familyMemberId ? { ...consent, status: 'granted', since: today } : consent);
      }
      return [...prev, { familyMemberId, doctorId: demoDoctor.id, doctorName: demoDoctor.name, status: 'granted', since: today }];
    });
    setTimeline((prev) => [{ id: createId('evt'), familyMemberId, date: today, type: 'consent', title: `Access granted to ${demoDoctor.name}`, description: `${member?.name ?? 'Patient'} granted record access.` }, ...prev]);
  }

  function revokeAccess(familyMemberId: string) {
    const member = familyMembers.find((candidate) => candidate.id === familyMemberId);
    setConsentRecords((prev) => prev.map((consent) => consent.familyMemberId === familyMemberId ? { ...consent, status: 'revoked' } : consent));
    setTimeline((prev) => [{ id: createId('evt'), familyMemberId, date: today, type: 'consent', title: `Access revoked for ${demoDoctor.name}`, description: `${member?.name ?? 'Patient'} revoked record access.` }, ...prev]);
  }

  function approveUpdate(familyMemberId: string) {
    const member = familyMembers.find((candidate) => candidate.id === familyMemberId);
    setApprovals((prev) => prev.map((approval) => approval.familyMemberId === familyMemberId ? { ...approval, status: 'approved', reviewedBy: demoDoctor.name, reviewedDate: today } : approval));
    setTimeline((prev) => [{ id: createId('evt'), familyMemberId, date: today, type: 'review', title: 'Doctor approved record update', description: `${demoDoctor.name} reviewed and approved ${member?.name ?? 'the patient'}'s latest changes.` }, ...prev]);
    setNotifications((prev) => [{ id: createId('notif'), familyMemberId, familyMemberName: member?.name ?? '', date: today, title: 'Doctor approved your update', message: `${demoDoctor.name} reviewed ${member?.name ?? 'the'} report and approved the treatment update.`, read: false, audience: 'patient' }, ...prev]);
  }

  function addReport(report: MedicalReport, file?: UploadedFile) {
    const memberId = report.familyMemberId;
    const member = familyMembers.find((candidate) => candidate.id === memberId);
    const memberReports = getMemberReports(memberId);
    const previousReport = memberReports[memberReports.length - 1];
    const changes = previousReport ? compareReports(previousReport, report).filter((change) => change.status !== 'unchanged') : [];

    setReports((prev) => [...prev, report]);
    setTimeline((prev) => [{ id: createId('evt'), familyMemberId: memberId, date: report.date, type: 'report', title: `${report.title} uploaded`, description: `New report added for ${member?.name ?? 'patient'} — ${changes.length} field${changes.length === 1 ? '' : 's'} changed since the last record.` }, ...prev]);
    setNotifications((prev) => [{ id: createId('notif'), familyMemberId: memberId, familyMemberName: member?.name ?? '', date: report.date, title: 'New report uploaded', message: `New medical report uploaded for ${member?.name ?? 'a patient'}. ${changes.length} change${changes.length === 1 ? '' : 's'} detected against the previous record.`, read: false, audience: 'doctor', reportId: report.id, changesCount: changes.length, briefingAvailable: true }, ...prev]);
    setApprovals((prev) => [...prev.filter((approval) => approval.familyMemberId !== memberId), { id: createId('appr'), familyMemberId: memberId, status: 'pending', summary: `Review ${report.title} for ${member?.name ?? 'this patient'} — ${changes.length} field${changes.length === 1 ? '' : 's'} changed and awaiting approval.` }]);
    if (file) setUploadedFiles((prev) => [...prev, file]);
  }

  function markNotificationRead(id: string) {
    setNotifications((prev) => prev.map((notification) => notification.id === id ? { ...notification, read: true } : notification));
  }

  return (
    <AppStateContext.Provider value={{ familyMembers, selectedFamilyMemberId, selectFamilyMember, addFamilyMember, updateFamilyMember, removeFamilyMember, reports, uploadedFiles, consentRecords, approvals, timeline, notifications, getMemberReports, getMemberTimeline, getMemberConsent, getMemberApproval, grantAccess, revokeAccess, approveUpdate, addReport, markNotificationRead }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
