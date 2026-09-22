import { AlertTriangle } from 'lucide-react';
import { MedicalReport } from '@/types';
import { compareReports } from '@/lib/compareReports';
import ChangeItem from './ChangeItem';

export default function ReportComparison({
  previous,
  current,
}: {
  previous: MedicalReport;
  current: MedicalReport;
}) {
  const changes = compareReports(previous, current);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">what changed</p>
        <span className="text-xs text-slate-400">
          {previous.date} → {current.date}
        </span>
      </div>

      <div className="mt-3 space-y-2">
        {changes.map((change) => (
          <ChangeItem key={change.key} change={change} />
        ))}
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-xl bg-slate-50 p-3">
        <AlertTriangle size={14} className="mt-0.5 shrink-0 text-slate-400" />
        <p className="text-[11px] leading-relaxed text-slate-500">
          detected differences are informational and require review by a qualified
          healthcare professional. this prototype does not diagnose conditions or
          prescribe treatment.
        </p>
      </div>
    </div>
  );
}
