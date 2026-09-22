export type ChangeStatus = 'improved' | 'worsened' | 'changed' | 'unchanged' | 'new';

export interface ReportField {
  key: string;
  label: string;
  value: string;
  unit?: string;
}

export interface ReportFieldChange {
  key: string;
  label: string;
  unit?: string;
  previousValue: string;
  currentValue: string;
  status: ChangeStatus;
  note?: string;
}

export interface MedicalReport {
  id: string;
  familyMemberId: string;
  patientId: string;
  title: string;
  date: string;
  doctorName: string;
  fields: ReportField[];
  sourceFileId?: string;
}

export interface TimelineEvent {
  id: string;
  familyMemberId: string;
  date: string;
  type: 'report' | 'prescription' | 'update' | 'review' | 'consent';
  title: string;
  description: string;
}

export interface ConsentRecord {
  familyMemberId: string;
  doctorId: string;
  doctorName: string;
  status: 'granted' | 'revoked';
  since: string;
}

export interface ApprovalRecord {
  id: string;
  familyMemberId: string;
  status: 'pending' | 'approved';
  reviewedBy?: string;
  reviewedDate?: string;
  summary: string;
}

export interface AppNotification {
  id: string;
  familyMemberId: string;
  familyMemberName: string;
  date: string;
  title: string;
  message: string;
  read: boolean;
  audience: 'patient' | 'doctor';
  reportId?: string;
  changesCount?: number;
  briefingAvailable?: boolean;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  lastVisit: string;
  avatarInitials: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
}

export type Relationship = 'Self' | 'Father' | 'Mother' | 'Spouse' | 'Child' | 'Other';

export interface FamilyMember {
  id: string;
  name: string;
  dob: string;
  age: number;
  gender: string;
  relationship: Relationship;
  bloodGroup: string;
  avatarInitials: string;
}

export type ConfidenceLevel = 'high' | 'verify';

export interface ExtractedField {
  key: string;
  label: string;
  value: string;
  unit?: string;
  confidence: ConfidenceLevel;
  verified: boolean;
}

export interface ExtractionResult {
  patientName: string;
  reportName: string;
  reportDate: string;
  fields: ExtractedField[];
}

export interface UploadedFile {
  id: string;
  familyMemberId: string;
  name: string;
  fileType: 'image' | 'pdf';
  url: string;
  uploadedAt: string;
}
