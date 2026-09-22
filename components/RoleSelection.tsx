import { HeartPulse, User, Stethoscope, ShieldCheck } from 'lucide-react';

interface RoleSelectionProps {
  onSelectRole: (role: 'patient' | 'doctor') => void;
}

export default function RoleSelection({ onSelectRole }: RoleSelectionProps) {
  return (
    <main className="flex min-h-[100dvh] flex-col justify-between bg-slate-50 px-5 pb-8 pt-[calc(env(safe-area-inset-top)+2.5rem)]">
      <div>
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <HeartPulse size={20} />
          </div>
          <span className="text-lg font-semibold text-slate-900">sehatkhata</span>
        </div>

        <h1 className="mt-8 text-3xl font-semibold leading-tight text-slate-900">
          one record.
          <br />
          two people who
          <br />
          actually understand it.
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
          sehatkhata shows doctors what changed in a patient&apos;s records, and shows
          patients what their doctor updated — with clear, shared timelines and
          consent the patient controls.
        </p>

        <div className="mt-6 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5">
          <ShieldCheck size={16} className="shrink-0 text-amber-700" />
          <p className="text-xs leading-snug text-amber-800">
            prototype with synthetic demo data. not a diagnostic or production
            healthcare system.
          </p>
        </div>
      </div>

      <div className="mt-10 space-y-3">
        <button
          onClick={() => onSelectRole('patient')}
          className="flex w-full items-center justify-between rounded-2xl bg-slate-900 px-5 py-4 text-left text-white active:scale-[0.98]"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <User size={18} />
            </span>
            <span>
              <span className="block text-sm font-semibold">patient demo</span>
              <span className="block text-xs text-slate-300">view your records &amp; timeline</span>
            </span>
          </span>
        </button>

        <button
          onClick={() => onSelectRole('doctor')}
          className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 text-left active:scale-[0.98]"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Stethoscope size={18} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-slate-900">doctor demo</span>
              <span className="block text-xs text-slate-500">review patients &amp; approve updates</span>
            </span>
          </span>
        </button>
      </div>
    </main>
  );
}
