'use client';

import { useState } from 'react';
import { CalendarCheck, CalendarX } from 'lucide-react';
import { useAppState } from '@/context/AppStateContext';
import { AppointmentRecommendation } from '@/types';

export default function AppointmentDecision({ familyMemberId, latest }: { familyMemberId: string; latest?: AppointmentRecommendation }) {
  const { addAppointmentRecommendation } = useAppState();
  const [note, setNote] = useState('');

  function decide(needed: boolean) {
    addAppointmentRecommendation(familyMemberId, needed, note.trim() || undefined);
    setNote('');
  }

  return <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <div className="flex items-center gap-2"><CalendarCheck size={16} className="text-emerald-600" /><p className="text-sm font-semibold text-slate-900">does this patient need to visit?</p></div>
    {latest && <p className="mt-1 text-xs text-slate-500">currently showing the patient: <span className="font-medium text-slate-700">{latest.needed ? 'a visit is recommended' : 'no visit needed'}</span> (set on {latest.date})</p>}
    <input value={note} onChange={(event) => setNote(event.target.value)} placeholder="optional note, e.g. recheck in 4 weeks" className="mt-3 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
    <div className="mt-2 flex gap-2"><button onClick={() => decide(true)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-medium text-white"><CalendarCheck size={14} /> visit needed</button><button onClick={() => decide(false)} className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700"><CalendarX size={14} /> no visit needed</button></div>
  </div>;
}
