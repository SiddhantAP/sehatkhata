'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { FamilyMember, Relationship } from '@/types';
import { useAppState } from '@/context/AppStateContext';

const RELATIONSHIPS: Relationship[] = ['Self', 'Father', 'Mother', 'Spouse', 'Child', 'Other'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];

function calcAge(dob: string) {
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const month = today.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) age--;
  return Math.max(age, 0);
}

function initialsFrom(name: string) {
  return name.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join('').toUpperCase() || '?';
}

export default function FamilyMemberModal({ existingMember, onClose }: { existingMember?: FamilyMember; onClose: () => void }) {
  const { familyMembers, addFamilyMember, updateFamilyMember } = useAppState();
  const isEdit = Boolean(existingMember);
  const [name, setName] = useState(existingMember?.name ?? '');
  const [dob, setDob] = useState(existingMember?.dob ?? '');
  const [gender, setGender] = useState(existingMember?.gender ?? 'Female');
  const [relationship, setRelationship] = useState<Relationship>(existingMember?.relationship ?? 'Other');
  const [bloodGroup, setBloodGroup] = useState(existingMember?.bloodGroup ?? 'Unknown');
  const [error, setError] = useState<string | null>(null);
  const selfTaken = familyMembers.some((member) => member.relationship === 'Self' && member.id !== existingMember?.id);

  function handleSubmit() {
    if (!name.trim()) return setError('please enter a name.');
    if (!dob) return setError('please enter a date of birth.');
    if (relationship === 'Self' && selfTaken) return setError('only one family member can be marked as "self".');
    const payload = { name: name.trim(), dob, age: calcAge(dob), gender, relationship, bloodGroup, avatarInitials: initialsFrom(name) };
    if (isEdit && existingMember) updateFamilyMember(existingMember.id, payload); else addFamilyMember(payload);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center">
      <div className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-4 sm:rounded-2xl">
        <div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-900">{isEdit ? 'edit family member' : 'add family member'}</p><button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-slate-500"><X size={18} /></button></div>
        <div className="mt-4 space-y-3">
          <label className="block text-xs font-medium text-slate-500">full name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Sunita Sharma" className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label>
          <div className="grid grid-cols-2 gap-3"><label className="text-xs font-medium text-slate-500">date of birth<input type="date" value={dob} onChange={(event) => setDob(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" /></label><label className="text-xs font-medium text-slate-500">gender<select value={gender} onChange={(event) => setGender(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"><option>Female</option><option>Male</option><option>Other</option></select></label></div>
          <div className="grid grid-cols-2 gap-3"><label className="text-xs font-medium text-slate-500">relationship<select value={relationship} onChange={(event) => setRelationship(event.target.value as Relationship)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm">{RELATIONSHIPS.map((item) => <option key={item} value={item} disabled={item === 'Self' && selfTaken}>{item}{item === 'Self' && selfTaken ? ' (taken)' : ''}</option>)}</select></label><label className="text-xs font-medium text-slate-500">blood group<select value={bloodGroup} onChange={(event) => setBloodGroup(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm">{BLOOD_GROUPS.map((item) => <option key={item}>{item}</option>)}</select></label></div>
          {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs text-rose-700">{error}</div>}
          <div className="flex gap-2 pt-1"><button onClick={onClose} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700">cancel</button><button onClick={handleSubmit} className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">{isEdit ? 'save changes' : 'add member'}</button></div>
        </div>
      </div>
    </div>
  );
}
