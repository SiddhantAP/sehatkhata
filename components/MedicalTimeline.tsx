import { FileText, Pill, ClipboardCheck, ShieldCheck, ShieldOff } from 'lucide-react';
import { TimelineEvent } from '@/types';

const ICONS: Record<TimelineEvent['type'], typeof FileText> = {
  report: FileText,
  prescription: Pill,
  update: Pill,
  review: ClipboardCheck,
  consent: ShieldCheck,
};

export default function MedicalTimeline({ events }: { events: TimelineEvent[] }) {
  const sorted = [...events].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="space-y-0">
      {sorted.map((event, i) => {
        const Icon = event.type === 'consent' && event.title.includes('revoked') ? ShieldOff : ICONS[event.type];
        const isLast = i === sorted.length - 1;
        return (
          <div key={event.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
                <Icon size={14} />
              </div>
              {!isLast && <div className="w-px flex-1 bg-slate-200" />}
            </div>
            <div className="pb-5">
              <p className="text-xs text-slate-400">{event.date}</p>
              <p className="text-sm font-semibold text-slate-900">{event.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{event.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
