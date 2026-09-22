import { Droplet, Activity, Gauge, Ruler, Weight, Thermometer, HeartPulse } from 'lucide-react';
import { FamilyMember, MedicalReport } from '@/types';

const ICONS: Record<string, typeof Activity> = {
  bloodGroup: Droplet, hemoglobin: Activity, bloodPressure: Gauge, bloodSugar: Activity,
  cholesterol: HeartPulse, heartRate: HeartPulse, height: Ruler, weight: Weight, temperature: Thermometer,
};

export default function HealthSummaryCards({ member, latestReport }: { member: FamilyMember; latestReport?: MedicalReport }) {
  const cards = [
    { key: 'bloodGroup', label: 'Blood Group', value: member.bloodGroup },
    ...(latestReport?.fields.slice(0, 2).map((field) => ({ key: field.key, label: field.label, value: `${field.value}${field.unit ? ` ${field.unit}` : ''}` })) ?? []),
  ];

  return <div className="grid grid-cols-3 gap-2.5">{cards.map((card) => { const Icon = ICONS[card.key] ?? Activity; return <div key={card.key} className="rounded-2xl border border-slate-200 bg-white p-3"><Icon size={16} className="text-emerald-600" /><p className="mt-2 text-[11px] leading-tight text-slate-500">{card.label}</p><p className="mt-0.5 text-sm font-semibold leading-tight text-slate-900">{card.value}</p></div>; })}</div>;
}
