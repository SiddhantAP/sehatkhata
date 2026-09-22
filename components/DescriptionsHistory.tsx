import { NotebookText } from 'lucide-react';
import { DoctorNote } from '@/types';

export default function DescriptionsHistory({ notes }: { notes: DoctorNote[] }) {
  if (notes.length === 0) return <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-6 text-center"><p className="text-xs text-slate-400">no descriptions from the doctor yet.</p></div>;
  const sorted = [...notes].sort((a, b) => a.date < b.date ? 1 : -1);
  return <div className="space-y-2">{sorted.map((note) => <div key={note.id} className="rounded-xl border border-slate-200 bg-white p-3.5"><div className="flex items-center gap-2"><NotebookText size={13} className="text-slate-400" /><p className="text-xs font-semibold text-slate-700">{note.doctorName}</p><span className="ml-auto text-[11px] text-slate-400">{note.date}</span></div><p className="mt-1.5 text-sm leading-relaxed text-slate-700">{note.message}</p></div>)}</div>;
}
