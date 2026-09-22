import {
  FamilyMember,
  Doctor,
  Patient,
  MedicalReport,
  TimelineEvent,
  ApprovalRecord,
  ConsentRecord,
  AppNotification,
} from '@/types';

export const familyMembers: FamilyMember[] = [
  { id: 'fam-001', name: 'Aditi Sharma', dob: '1992-03-14', age: 34, gender: 'Female', relationship: 'Self', bloodGroup: 'B+', avatarInitials: 'AS' },
  { id: 'fam-002', name: 'Sunita Sharma', dob: '1965-07-22', age: 61, gender: 'Female', relationship: 'Mother', bloodGroup: 'O+', avatarInitials: 'SS' },
  { id: 'fam-003', name: 'Arjun Sharma', dob: '2015-11-02', age: 10, gender: 'Male', relationship: 'Child', bloodGroup: 'B+', avatarInitials: 'AR' },
];

export const otherPatients: Patient[] = [
  { id: 'pat-002', name: 'Rohan Mehta', age: 45, gender: 'Male', bloodGroup: 'O+', lastVisit: '2026-09-10', avatarInitials: 'RM' },
  { id: 'pat-003', name: 'Kavita Iyer', age: 29, gender: 'Female', bloodGroup: 'A+', lastVisit: '2026-09-05', avatarInitials: 'KI' },
];

export const demoDoctor: Doctor = {
  id: 'doc-001',
  name: 'Dr. Neha Kulkarni',
  specialty: 'General Physician & Diabetology',
  hospital: 'Sanjeevani Multispecialty Clinic',
};

export const initialReports: MedicalReport[] = [
  {
    id: 'rep-001', familyMemberId: 'fam-001', patientId: 'fam-001', title: 'Routine Blood Work & Check-up', date: '2026-08-10', doctorName: demoDoctor.name,
    fields: [
      { key: 'hemoglobin', label: 'Hemoglobin', value: '10.2', unit: 'g/dL' },
      { key: 'bloodPressure', label: 'Blood Pressure', value: '140/90', unit: 'mmHg' },
      { key: 'bloodSugar', label: 'Fasting Blood Sugar', value: '118', unit: 'mg/dL' },
      { key: 'medication', label: 'Medication', value: 'Metformin 500mg — once daily' },
      { key: 'followUp', label: 'Follow-up Status', value: 'Pending' },
    ],
  },
  {
    id: 'rep-002', familyMemberId: 'fam-001', patientId: 'fam-001', title: 'Follow-up Blood Work & Check-up', date: '2026-09-18', doctorName: demoDoctor.name,
    fields: [
      { key: 'hemoglobin', label: 'Hemoglobin', value: '11.4', unit: 'g/dL' },
      { key: 'bloodPressure', label: 'Blood Pressure', value: '130/85', unit: 'mmHg' },
      { key: 'bloodSugar', label: 'Fasting Blood Sugar', value: '118', unit: 'mg/dL' },
      { key: 'medication', label: 'Medication', value: 'Metformin 850mg — twice daily' },
      { key: 'followUp', label: 'Follow-up Status', value: 'Required' },
    ],
  },
  {
    id: 'rep-003', familyMemberId: 'fam-002', patientId: 'fam-002', title: 'Cardiac Check-up', date: '2026-07-05', doctorName: demoDoctor.name,
    fields: [
      { key: 'bloodPressure', label: 'Blood Pressure', value: '150/95', unit: 'mmHg' },
      { key: 'cholesterol', label: 'Cholesterol', value: '220', unit: 'mg/dL' },
      { key: 'heartRate', label: 'Resting Heart Rate', value: '88', unit: 'bpm' },
      { key: 'medication', label: 'Medication', value: 'Amlodipine 5mg — once daily' },
      { key: 'followUp', label: 'Follow-up Status', value: 'Pending' },
    ],
  },
  {
    id: 'rep-004', familyMemberId: 'fam-002', patientId: 'fam-002', title: 'Follow-up Cardiac Check-up', date: '2026-09-12', doctorName: demoDoctor.name,
    fields: [
      { key: 'bloodPressure', label: 'Blood Pressure', value: '132/84', unit: 'mmHg' },
      { key: 'cholesterol', label: 'Cholesterol', value: '190', unit: 'mg/dL' },
      { key: 'heartRate', label: 'Resting Heart Rate', value: '76', unit: 'bpm' },
      { key: 'medication', label: 'Medication', value: 'Amlodipine 5mg + Atorvastatin 10mg — once daily' },
      { key: 'followUp', label: 'Follow-up Status', value: 'Required' },
    ],
  },
  {
    id: 'rep-005', familyMemberId: 'fam-003', patientId: 'fam-003', title: 'Annual Pediatric Check-up', date: '2026-06-20', doctorName: demoDoctor.name,
    fields: [
      { key: 'height', label: 'Height', value: '132', unit: 'cm' },
      { key: 'weight', label: 'Weight', value: '28', unit: 'kg' },
      { key: 'temperature', label: 'Temperature', value: '99.5', unit: '°F' },
      { key: 'medication', label: 'Medication', value: 'Paracetamol syrup — as needed' },
      { key: 'followUp', label: 'Follow-up Status', value: 'Pending' },
    ],
  },
  {
    id: 'rep-006', familyMemberId: 'fam-003', patientId: 'fam-003', title: 'Follow-up Pediatric Check-up', date: '2026-09-15', doctorName: demoDoctor.name,
    fields: [
      { key: 'height', label: 'Height', value: '135', unit: 'cm' },
      { key: 'weight', label: 'Weight', value: '29.5', unit: 'kg' },
      { key: 'temperature', label: 'Temperature', value: '98.6', unit: '°F' },
      { key: 'medication', label: 'Medication', value: 'None' },
      { key: 'followUp', label: 'Follow-up Status', value: 'Not required' },
    ],
  },
];

export const initialTimeline: TimelineEvent[] = [
  { id: 'evt-001', familyMemberId: 'fam-001', date: '2026-08-10', type: 'report', title: 'Routine Blood Work uploaded', description: 'Initial report recorded by Dr. Neha Kulkarni.' },
  { id: 'evt-002', familyMemberId: 'fam-001', date: '2026-08-12', type: 'consent', title: 'Access granted to Dr. Neha Kulkarni', description: 'Aditi Sharma granted record access.' },
  { id: 'evt-003', familyMemberId: 'fam-001', date: '2026-09-18', type: 'report', title: 'Follow-up Blood Work uploaded', description: 'New report recorded after 6-week follow-up.' },
  { id: 'evt-004', familyMemberId: 'fam-002', date: '2026-07-05', type: 'report', title: 'Cardiac Check-up uploaded', description: 'Initial cardiac report recorded by Dr. Neha Kulkarni.' },
  { id: 'evt-005', familyMemberId: 'fam-002', date: '2026-07-06', type: 'consent', title: 'Access granted to Dr. Neha Kulkarni', description: 'Sunita Sharma granted record access.' },
  { id: 'evt-006', familyMemberId: 'fam-002', date: '2026-09-12', type: 'report', title: 'Follow-up Cardiac Check-up uploaded', description: 'New report recorded after cardiology follow-up.' },
  { id: 'evt-007', familyMemberId: 'fam-003', date: '2026-06-20', type: 'report', title: 'Annual Pediatric Check-up uploaded', description: 'Initial pediatric report recorded by Dr. Neha Kulkarni.' },
  { id: 'evt-008', familyMemberId: 'fam-003', date: '2026-06-21', type: 'consent', title: 'Access revoked for Dr. Neha Kulkarni', description: "Arjun Sharma's guardian revoked record access." },
  { id: 'evt-009', familyMemberId: 'fam-003', date: '2026-09-15', type: 'report', title: 'Follow-up Pediatric Check-up uploaded', description: 'New report recorded after annual follow-up.' },
];

export const initialApprovals: ApprovalRecord[] = [
  { id: 'appr-001', familyMemberId: 'fam-001', status: 'pending', summary: 'Updated dosage and follow-up status based on latest report changes.' },
  { id: 'appr-002', familyMemberId: 'fam-002', status: 'pending', summary: 'Added Atorvastatin and updated follow-up status based on latest cardiac report.' },
  { id: 'appr-003', familyMemberId: 'fam-003', status: 'approved', reviewedBy: demoDoctor.name, reviewedDate: '2026-06-22', summary: 'Growth and temperature within normal range — no medication changes needed.' },
];

export const initialConsentRecords: ConsentRecord[] = [
  { familyMemberId: 'fam-001', doctorId: demoDoctor.id, doctorName: demoDoctor.name, status: 'granted', since: '2026-08-12' },
  { familyMemberId: 'fam-002', doctorId: demoDoctor.id, doctorName: demoDoctor.name, status: 'granted', since: '2026-07-06' },
  { familyMemberId: 'fam-003', doctorId: demoDoctor.id, doctorName: demoDoctor.name, status: 'revoked', since: '2026-06-21' },
];

export const initialNotifications: AppNotification[] = [
  { id: 'notif-001', familyMemberId: 'fam-001', familyMemberName: 'Aditi Sharma', date: '2026-09-18', title: 'New report available', message: 'Your follow-up blood work has been added by Dr. Neha Kulkarni.', read: false, audience: 'patient' },
  { id: 'notif-002', familyMemberId: 'fam-002', familyMemberName: 'Sunita Sharma', date: '2026-09-12', title: 'New report uploaded', message: 'New medical report uploaded for Sunita Sharma. 3 changes detected against the previous record.', read: false, audience: 'doctor', briefingAvailable: true },
];
