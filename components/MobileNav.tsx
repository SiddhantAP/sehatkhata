'use client';

import { Stethoscope, User, Home, ArrowLeftRight } from 'lucide-react';

interface MobileNavProps {
  role: 'patient' | 'doctor';
  onSwitchRole: () => void;
  onGoHome: () => void;
}

export default function MobileNav({ role, onSwitchRole, onGoHome }: MobileNavProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 pt-[env(safe-area-inset-top)] backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
            {role === 'patient' ? <User size={18} /> : <Stethoscope size={18} />}
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight text-slate-900">sehatkhata</p>
            <p className="text-xs leading-tight text-slate-500">
              {role === 'patient' ? 'Patient view' : 'Doctor view'} · Demo
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onSwitchRole}
            className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 active:scale-95"
          >
            <ArrowLeftRight size={14} />
            Switch
          </button>
          <button
            onClick={onGoHome}
            aria-label="Home"
            className="flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 active:scale-95"
          >
            <Home size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
