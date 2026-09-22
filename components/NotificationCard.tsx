import { Bell } from 'lucide-react';
import { AppNotification } from '@/types';

export default function NotificationCard({ notification }: { notification: AppNotification }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
        <Bell size={14} />
      </div>
      <div>
        <p className="text-sm font-semibold text-emerald-900">{notification.title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-emerald-800">{notification.message}</p>
        <p className="mt-1 text-[11px] text-emerald-600">{notification.date}</p>
      </div>
    </div>
  );
}
