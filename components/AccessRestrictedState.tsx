import { ShieldOff } from 'lucide-react';

export default function AccessRestrictedState({ patientName }: { patientName: string }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-rose-200 bg-rose-50 px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
        <ShieldOff size={24} />
      </div>
      <p className="mt-3 text-sm font-semibold text-rose-800">Access Restricted</p>
      <p className="mt-1 max-w-xs text-xs leading-relaxed text-rose-700">
        {patientName} has revoked record access. You cannot view reports, timeline, or comparisons until access is granted again.
      </p>
    </div>
  );
}
