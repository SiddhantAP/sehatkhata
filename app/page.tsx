'use client';

import { useState } from 'react';
import RoleSelection from '@/components/RoleSelection';
import MobileNav from '@/components/MobileNav';
import PatientDashboard from '@/components/PatientDashboard';
import DoctorDashboard from '@/components/DoctorDashboard';

type Role = 'none' | 'patient' | 'doctor';

export default function Home() {
  const [role, setRole] = useState<Role>('none');

  if (role === 'none') {
    return <RoleSelection onSelectRole={setRole} />;
  }

  return (
    <div className="min-h-[100dvh] bg-slate-50 pb-10">
      <MobileNav
        role={role}
        onSwitchRole={() => setRole(role === 'patient' ? 'doctor' : 'patient')}
        onGoHome={() => setRole('none')}
      />
      {role === 'patient' ? <PatientDashboard /> : <DoctorDashboard />}
    </div>
  );
}
