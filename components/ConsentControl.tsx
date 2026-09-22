'use client';

import { ShieldCheck, ShieldOff } from 'lucide-react';
import { ConsentRecord } from '@/types';

interface ConsentControlProps {
  consent: ConsentRecord;
  onGrant: () => void;
  onRevoke: () => void;
}

export default function ConsentControl({ consent, onGrant, onRevoke }: ConsentControlProps) {
  const granted = consent.status === 'granted';
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${granted ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
            {granted ? <ShieldCheck size={18} /> : <ShieldOff size={18} />}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">{consent.doctorName}</p>
            <p className="text-xs text-slate-500">
              {granted ? `Access granted since ${consent.since}` : 'Access currently revoked'}
            </p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${granted ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
          {granted ? 'Granted' : 'Revoked'}
        </span>
      </div>
      <div className="mt-3 flex gap-2">
        {granted ? (
          <button onClick={onRevoke} className="flex-1 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-medium text-rose-700 active:scale-[0.98]">
            Revoke Access
          </button>
        ) : (
          <button onClick={onGrant} className="flex-1 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 active:scale-[0.98]">
            Grant Access
          </button>
        )}
      </div>
      <p className="mt-2 text-[11px] leading-snug text-slate-400">
        Prototype consent simulation only — not a legal or regulatory consent record.
      </p>
    </div>
  );
}
