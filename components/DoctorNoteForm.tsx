'use client';

import { useState } from 'react';
import { NotebookPen, Send } from 'lucide-react';
import { useAppState } from '@/context/AppStateContext';

export default function DoctorNoteForm({ familyMemberId, reportId }: { familyMemberId: string; reportId?: string }) {
  const { addDoctorNote } = useAppState();
  const [message, setMessage] = useState('');
  const [justSent, setJustSent] = useState(false);

  function handleSubmit() {
    if (!message.trim()) return;
    addDoctorNote(familyMemberId, message.trim(), reportId);
    setMessage('');
    setJustSent(true);
    setTimeout(() => setJustSent(false), 2500);
  }

  return <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <div className="flex items-center gap-2"><NotebookPen size={16} className="text-emerald-600" /><p className="text-sm font-semibold text-slate-900">add a note for the patient</p></div>
    <p className="mt-1 text-xs text-slate-500">share suggestions, prescriptions, or what to change before the next visit.</p>
    <textarea value={message} onChange={(event) => setMessage(event.target.value)} rows={3} placeholder="e.g. continue the increased dosage, cut down on salt, recheck sugar levels in 2 weeks..." className="mt-3 w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm" />
    <div className="mt-2 flex items-center justify-between gap-2"><span className="text-[11px] text-emerald-600">{justSent ? 'saved — the patient will see this note' : ''}</span><button onClick={handleSubmit} disabled={!message.trim()} className="flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white disabled:opacity-40"><Send size={14} /> send note</button></div>
  </div>;
}
