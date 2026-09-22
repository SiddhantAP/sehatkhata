import { ChevronRight } from 'lucide-react';
import { Patient } from '@/types';

export default function PatientList({
  patients,
  activePatientId,
  interactiveIds,
  onSelect,
}: {
  patients: Patient[];
  activePatientId: string;
  interactiveIds: string[];
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      {patients.map((p) => {
        const active = p.id === activePatientId;
        const interactive = interactiveIds.includes(p.id);
        return (
          <button
            key={p.id}
            onClick={() => interactive && onSelect(p.id)}
            disabled={!interactive}
            className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition ${
              active
                ? 'border-slate-900 bg-slate-900 text-white'
                : interactive
                ? 'border-slate-200 bg-white active:scale-[0.98]'
                : 'border-slate-100 bg-slate-50 opacity-60'
            }`}
          >
            <span className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  active ? 'bg-white/15 text-white' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                {p.avatarInitials}
              </span>
              <span>
                <span className={`block text-sm font-semibold ${active ? 'text-white' : 'text-slate-900'}`}>{p.name}</span>
                <span className={`block text-xs ${active ? 'text-slate-300' : 'text-slate-500'}`}>
                  last visit {p.lastVisit} {!interactive && '· demo only'}
                </span>
              </span>
            </span>
            {interactive && <ChevronRight size={16} className={active ? 'text-white' : 'text-slate-400'} />}
          </button>
        );
      })}
    </div>
  );
}
