'use client';

import { X, FileWarning } from 'lucide-react';
import { UploadedFile } from '@/types';

export default function OriginalReportPreview({
  file,
  onClose,
}: {
  file: UploadedFile | undefined;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center">
      <div className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-4 sm:rounded-2xl">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">original report</p>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-slate-500 active:scale-95">
            <X size={18} />
          </button>
        </div>

        {!file ? (
          <div className="mt-4 flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 px-6 py-10 text-center">
            <FileWarning size={22} className="text-slate-400" />
            <p className="mt-2 text-xs text-slate-500">
              no source file is available for this record — it was part of the seeded demo data.
            </p>
          </div>
        ) : (
          <div className="mt-3">
            <p className="text-xs text-slate-500">
              {file.name} · uploaded {file.uploadedAt}
            </p>
            <div className="mt-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              {file.fileType === 'image' ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={file.url} alt={file.name} className="max-h-[60dvh] w-full object-contain" />
              ) : (
                <iframe src={file.url} title={file.name} className="h-[60dvh] w-full" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
