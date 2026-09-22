'use client';

import { useState } from 'react';
import { NotebookText, CalendarCheck, CalendarX, Check, X } from 'lucide-react';
import { DoctorNote, AppointmentRecommendation } from '@/types';

export default function PatientReminders({ latestNote, latestAppointment, onDismissAppointment }: { latestNote?: DoctorNote; latestAppointment?: AppointmentRecommendation; onDismissAppointment: (id: string) => void }) {
  const [keptIds, setKeptIds] = useState<string[]>([]);
  const appointmentKept = latestAppointment ? keptIds.includes(latestAppointment.id) : false;

  return <div className="space-y-2">
    {latestNote && <div className="rounded-2xl border border-sky-200 bg-sky-50 p-3.5"><div className="flex items-start gap-3"><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white"><NotebookText size={14} /></div><div className="min-w-0"><p className="text-sm font-semibold text-sky-900">note from {latestNote.doctorName}</p><p className="mt-0.5 text-xs leading-relaxed text-sky-800">{latestNote.message}</p><p className="mt-1 text-[11px] text-sky-600">{latestNote.date}</p></div></div></div>}
    {latestAppointment && <div className={`rounded-2xl border p-3.5 ${latestAppointment.needed ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-white'}`}><div className="flex items-start gap-3"><div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ${latestAppointment.needed ? 'bg-amber-600' : 'bg-slate-400'}`}>{latestAppointment.needed ? <CalendarCheck size={14} /> : <CalendarX size={14} />}</div><div className="min-w-0 flex-1"><p className={`text-sm font-semibold ${latestAppointment.needed ? 'text-amber-900' : 'text-slate-700'}`}>{latestAppointment.needed ? 'a visit is recommended' : 'no visit needed right now'}</p>{latestAppointment.note && <p className={`mt-0.5 text-xs leading-relaxed ${latestAppointment.needed ? 'text-amber-800' : 'text-slate-500'}`}>{latestAppointment.note}</p>}<p className={`mt-1 text-[11px] ${latestAppointment.needed ? 'text-amber-600' : 'text-slate-400'}`}>{latestAppointment.doctorName} · {latestAppointment.date}</p>{appointmentKept ? <p className="mt-2 text-[11px] font-medium text-emerald-600">reminder kept</p> : <div className="mt-2 flex gap-2"><button onClick={() => setKeptIds((prev) => [...prev, latestAppointment.id])} className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700"><Check size={12} /> keep reminder</button><button onClick={() => onDismissAppointment(latestAppointment.id)} className="flex items-center gap-1 rounded-lg border border-rose-200 bg-white px-2.5 py-1.5 text-xs font-medium text-rose-600"><X size={12} /> remove reminder</button></div>}</div></div></div>}
  </div>;
}
