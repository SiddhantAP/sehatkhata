import { AlertTriangle, X } from 'lucide-react';
import { FamilyMember } from '@/types';

export default function RemoveFamilyMemberDialog({ member, onCancel, onConfirm }: { member: FamilyMember; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center">
      <div className="w-full max-w-sm rounded-t-2xl bg-white p-4 sm:rounded-2xl">
        <div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-900">remove family member</p><button onClick={onCancel} aria-label="Close" className="rounded-full p-1.5 text-slate-500"><X size={18} /></button></div>
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-3"><AlertTriangle size={16} className="mt-0.5 shrink-0 text-rose-600" /><p className="text-xs leading-relaxed text-rose-700">removing <span className="font-semibold">{member.name}</span> will permanently delete their reports, timeline, notifications, and consent history. this cannot be undone.</p></div>
        <div className="mt-4 flex gap-2"><button onClick={onCancel} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700">cancel</button><button onClick={onConfirm} className="flex-1 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-medium text-white">remove member</button></div>
      </div>
    </div>
  );
}
