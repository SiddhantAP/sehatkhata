'use client';

import { useState, useRef } from 'react';
import { Volume2, Square, AlertTriangle } from 'lucide-react';

export default function AudioBriefing({ text }: { text: string }) {
  const [status, setStatus] = useState<'idle' | 'speaking'>('idle');
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  function play() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.onend = () => setStatus('idle');
    utterance.onerror = () => setStatus('idle');
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setStatus('speaking');
  }

  function stop() {
    if (supported) window.speechSynthesis.cancel();
    setStatus('idle');
  }

  if (!supported) {
    return (
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-500">
        <AlertTriangle size={14} className="shrink-0" />
        audio briefing isn&apos;t supported in this browser — read the summary above instead.
      </div>
    );
  }

  return status === 'speaking' ? (
    <button
      onClick={stop}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-3 text-sm font-medium text-white active:scale-[0.98]"
    >
      <Square size={16} /> stop briefing
    </button>
  ) : (
    <button
      onClick={play}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium text-white active:scale-[0.98]"
    >
      <Volume2 size={16} /> listen to patient briefing
    </button>
  );
}
