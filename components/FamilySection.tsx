'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, Check } from 'lucide-react';
import { FamilyMember } from '@/types';
import { useAppState } from '@/context/AppStateContext';
import FamilyMemberModal from './FamilyMemberModal';
import RemoveFamilyMemberDialog from './RemoveFamilyMemberDialog';

const RELATIONSHIP_COLORS: Record<string, string> = {
  Self: 'bg-slate-900 text-white', Father: 'bg-sky-100 text-sky-700', Mother: 'bg-rose-100 text-rose-700',
  Spouse: 'bg-purple-100 text-purple-700', Child: 'bg-amber-100 text-amber-700', Other: 'bg-slate-100 text-slate-600',
};

export default function FamilySection() {
  const { familyMembers, selectedFamilyMemberId, selectFamilyMember, removeFamilyMember } = useAppState();
  const [modalMode, setModalMode] = useState<'closed' | 'add' | { mode: 'edit'; member: FamilyMember }>('closed');
  const [pendingRemove, setPendingRemove] = useState<FamilyMember | null>(null);

  function handleRemove() {
    if (!pendingRemove) return;
    removeFamilyMember(pendingRemove.id);
    setPendingRemove(null);
  }

  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">my family</p>
        <button onClick={() => setModalMode('add')} className="flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white active:scale-[0.98]"><Plus size={13} /> add member</button>
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {familyMembers.map((member) => {
          const active = member.id === selectedFamilyMemberId;
          return (
            <div key={member.id} className={`rounded-2xl border p-3.5 transition ${active ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white'}`}>
              <button onClick={() => selectFamilyMember(member.id)} className="flex w-full items-center gap-3 text-left">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${active ? 'bg-white/15 text-white' : 'bg-emerald-100 text-emerald-700'}`}>{member.avatarInitials}</span>
                <span className="min-w-0 flex-1">
                  <span className={`flex items-center gap-1.5 text-sm font-semibold ${active ? 'text-white' : 'text-slate-900'}`}>{member.name}{active && <Check size={13} />}</span>
                  <span className={`mt-0.5 flex items-center gap-1.5 text-xs ${active ? 'text-slate-300' : 'text-slate-500'}`}>
                    <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${active ? 'bg-white/15 text-white' : RELATIONSHIP_COLORS[member.relationship]}`}>{member.relationship}</span>
                    {member.age} yrs · {member.gender}
                  </span>
                </span>
              </button>
              <div className="mt-2.5 flex gap-2">
                <button onClick={() => setModalMode({ mode: 'edit', member })} className={`flex flex-1 items-center justify-center gap-1 rounded-lg border px-2 py-1.5 text-xs font-medium active:scale-[0.98] ${active ? 'border-white/20 text-white' : 'border-slate-200 text-slate-600'}`}><Pencil size={12} /> edit</button>
                <button onClick={() => setPendingRemove(member)} disabled={member.relationship === 'Self' || familyMembers.length <= 1} className={`flex flex-1 items-center justify-center gap-1 rounded-lg border px-2 py-1.5 text-xs font-medium disabled:opacity-40 active:scale-[0.98] ${active ? 'border-white/20 text-white' : 'border-rose-200 text-rose-600'}`}><Trash2 size={12} /> remove</button>
              </div>
            </div>
          );
        })}
      </div>
      {modalMode !== 'closed' && <FamilyMemberModal existingMember={typeof modalMode === 'object' ? modalMode.member : undefined} onClose={() => setModalMode('closed')} />}
      {pendingRemove && <RemoveFamilyMemberDialog member={pendingRemove} onCancel={() => setPendingRemove(null)} onConfirm={handleRemove} />}
    </section>
  );
}
