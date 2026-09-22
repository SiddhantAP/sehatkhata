import { FileUp } from 'lucide-react';
import { AppNotification } from '@/types';

export default function DoctorNotificationCard({
  notification,
  onReviewBriefing,
}: {
  notification: AppNotification;
  onReviewBriefing: () => void;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-3.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white">
        <FileUp size={14} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-sky-900">{notification.title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-sky-800">{notification.message}</p>
        {notification.briefingAvailable && (
          <button
            onClick={onReviewBriefing}
            className="mt-2 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white active:scale-[0.98]"
          >
            review briefing
          </button>
        )}
      </div>
    </div>
  );
}
