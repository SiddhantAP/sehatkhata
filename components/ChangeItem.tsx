import type { ReactNode } from 'react';
import { ArrowUp, ArrowDown, Minus, Sparkles } from 'lucide-react';
import { ReportFieldChange } from '@/types';

const STATUS_STYLES: Record<ReportFieldChange['status'], { badge: string; label: string; icon: ReactNode }> = {
  improved: { badge: 'bg-emerald-100 text-emerald-700', label: 'Improved', icon: <ArrowDown size={12} /> },
  worsened: { badge: 'bg-rose-100 text-rose-700', label: 'Needs attention', icon: <ArrowUp size={12} /> },
  changed: { badge: 'bg-amber-100 text-amber-700', label: 'Changed', icon: <Minus size={12} /> },
  unchanged: { badge: 'bg-slate-100 text-slate-600', label: 'Unchanged', icon: <Minus size={12} /> },
  new: { badge: 'bg-sky-100 text-sky-700', label: 'New', icon: <Sparkles size={12} /> },
};

export default function ChangeItem({ change }: { change: ReportFieldChange }) {
  const style = STATUS_STYLES[change.status];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3.5">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-slate-900">{change.label}</p>
        <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${style.badge}`}>
          {style.icon}
          {style.label}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-sm">
        <span className="rounded-lg bg-slate-50 px-2 py-1 text-slate-500 line-through decoration-slate-300">
          {change.previousValue}{change.unit ? ` ${change.unit}` : ''}
        </span>
        <span className="text-slate-400">→</span>
        <span className="rounded-lg bg-slate-900 px-2 py-1 font-medium text-white">
          {change.currentValue}{change.unit ? ` ${change.unit}` : ''}
        </span>
      </div>
      {change.note && <p className="mt-1.5 text-xs text-slate-500">{change.note}</p>}
    </div>
  );
}
