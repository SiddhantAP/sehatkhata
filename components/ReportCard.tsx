import { FileText } from 'lucide-react';
import { MedicalReport } from '@/types';

export default function ReportCard({ report, tag }: { report: MedicalReport; tag?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
            <FileText size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{report.title}</p>
            <p className="text-xs text-slate-500">{report.date} · {report.doctorName}</p>
          </div>
        </div>
        {tag && (
          <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">{tag}</span>
        )}
      </div>
      <div className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-100">
        {report.fields.map((f) => (
          <div key={f.key} className="flex items-center justify-between px-3 py-2 text-sm">
            <span className="text-slate-500">{f.label}</span>
            <span className="font-medium text-slate-900">{f.value}{f.unit ? ` ${f.unit}` : ''}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
