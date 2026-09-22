'use client';

import { FileSearch } from 'lucide-react';
import { MedicalReport, ReportFieldChange } from '@/types';
import { generateBriefingText } from '@/lib/generateBriefing';
import AudioBriefing from './AudioBriefing';
import ChangeItem from './ChangeItem';

export default function PatientBriefing({
  previous,
  current,
  changes,
  reportCount,
  hasOriginal,
  onViewOriginal,
}: {
  previous: MedicalReport;
  current: MedicalReport;
  changes: ReportFieldChange[];
  reportCount: number;
  hasOriginal: boolean;
  onViewOriginal: () => void;
}) {
  const relevantChanges = changes.filter((c) => c.status !== 'unchanged');
  const briefingText = generateBriefingText({ previous, current, changes: relevantChanges, reportCount });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-2">
        <FileSearch size={16} className="text-emerald-600" />
        <p className="text-sm font-semibold text-slate-900">patient briefing</p>
      </div>

      <p className="mt-1 text-xs text-slate-400">
        {previous.date} → {current.date} · {reportCount} previous record{reportCount === 1 ? '' : 's'} on file
      </p>

      <p className="mt-3 text-sm leading-relaxed text-slate-700">{briefingText}</p>

      {relevantChanges.length > 0 && (
        <div className="mt-3 space-y-2">
          {relevantChanges.map((c) => (
            <ChangeItem key={c.key} change={c} />
          ))}
        </div>
      )}

      <div className="mt-3">
        <AudioBriefing text={briefingText} />
      </div>

      <button
        onClick={onViewOriginal}
        disabled={!hasOriginal}
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 disabled:opacity-40 active:scale-[0.98]"
      >
        {hasOriginal ? 'view original report' : 'original file not available for this record'}
      </button>

      <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
        prototype-generated summary. verify all information against the original report before making
        clinical decisions.
      </p>
    </div>
  );
}
