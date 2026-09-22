import { ClipboardCheck, CheckCircle2 } from 'lucide-react';
import { ApprovalRecord } from '@/types';

export default function ApprovalPanel({
  approval,
  onApprove,
}: {
  approval: ApprovalRecord;
  onApprove: () => void;
}) {
  const approved = approval.status === 'approved';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start gap-3">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${approved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
          {approved ? <CheckCircle2 size={18} /> : <ClipboardCheck size={18} />}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-900">
            {approved ? 'update approved' : 'review update'}
          </p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{approval.summary}</p>
          {approved && approval.reviewedDate && (
            <p className="mt-1 text-[11px] text-emerald-600">
              approved by {approval.reviewedBy} on {approval.reviewedDate}
            </p>
          )}
        </div>
      </div>

      {!approved && (
        <button
          onClick={onApprove}
          className="mt-3 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white active:scale-[0.98]"
        >
          approve update
        </button>
      )}
    </div>
  );
}
