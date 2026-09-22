'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Upload, FileText, Image as ImageIcon, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { ExtractionResult, UploadedFile, MedicalReport } from '@/types';
import { generateExtraction } from '@/lib/generateExtraction';
import { useAppState } from '@/context/AppStateContext';
import { demoDoctor } from '@/data/mockData';

const PROCESSING_STEPS = ['reading document', 'extracting medical information', 'identifying report fields', 'comparing with previous records', 'preparing patient update'];

export default function UploadReportModal({ defaultMemberId, onClose }: { defaultMemberId: string; onClose: () => void }) {
  const { familyMembers, getMemberReports, addReport, selectFamilyMember } = useAppState();
  const [memberId, setMemberId] = useState(defaultMemberId);
  const [step, setStep] = useState<'select' | 'processing' | 'review'>('select');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingIndex, setProcessingIndex] = useState(0);
  const [extraction, setExtraction] = useState<ExtractionResult | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const member = familyMembers.find((item) => item.id === memberId) ?? familyMembers[0];

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    setError(null);
    if (!selected) return;
    const isImage = selected.type.startsWith('image/');
    const isPdf = selected.type === 'application/pdf';
    if (!isImage && !isPdf) return setError('unsupported file type — please choose an image or PDF.');
    if (selected.size > 10 * 1024 * 1024) return setError('file is too large — please choose a file under 10MB.');
    setFile(selected);
  }

  function startProcessing() {
    if (!file) return setError('please select a file first.');
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setUploadedFile({ id: `file-${crypto.randomUUID()}`, familyMemberId: memberId, name: file.name, fileType: file.type === 'application/pdf' ? 'pdf' : 'image', url, uploadedAt: new Date().toISOString().split('T')[0] });
    setStep('processing');
    setProcessingIndex(0);
  }

  useEffect(() => {
    if (step !== 'processing') return;
    if (processingIndex >= PROCESSING_STEPS.length) {
      const timer = setTimeout(() => {
        const memberReports = getMemberReports(memberId);
        setExtraction(generateExtraction(member?.name ?? 'Family member', memberReports[memberReports.length - 1], uploadedFile?.name ?? 'report'));
        setStep('review');
      }, 0);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setProcessingIndex((index) => index + 1), 550);
    return () => clearTimeout(timer);
  }, [step, processingIndex, getMemberReports, member, memberId, uploadedFile]);

  useEffect(() => () => { if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current); }, []);

  function toggleVerified(key: string) {
    setExtraction((prev) => prev ? { ...prev, fields: prev.fields.map((field) => field.key === key ? { ...field, verified: !field.verified } : field) } : prev);
  }

  function handleConfirm() {
    if (!extraction || !uploadedFile) return;
    const report: MedicalReport = { id: `rep-${crypto.randomUUID()}`, familyMemberId: memberId, patientId: memberId, title: extraction.reportName, date: extraction.reportDate, doctorName: demoDoctor.name, fields: extraction.fields.map(({ key, label, value, unit }) => ({ key, label, value, unit })), sourceFileId: uploadedFile.id };
    addReport(report, uploadedFile);
    selectFamilyMember(memberId);
    onClose();
  }

  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center"><div className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white p-4 sm:rounded-2xl">
    <div className="flex items-center justify-between"><p className="text-sm font-semibold text-slate-900">upload new report</p><button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-slate-500"><X size={18} /></button></div>
    {step !== 'review' && <div className="mt-3"><label className="text-xs font-medium text-slate-500">uploading for</label><select value={memberId} disabled={step === 'processing'} onChange={(event) => setMemberId(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm">{familyMembers.map((item) => <option key={item.id} value={item.id}>{item.name} ({item.relationship})</option>)}</select><p className="mt-1.5 rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-medium text-emerald-700">uploading report for {member?.name}</p></div>}
    {step === 'select' && <div className="mt-4 space-y-3"><label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 px-6 py-10 text-center"><Upload size={22} className="text-slate-400" /><span className="mt-2 text-sm font-medium text-slate-700">choose an image or PDF</span><span className="mt-1 text-xs text-slate-400">tap to browse files</span><input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFileChange} /></label>{file && <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">{file.type === 'application/pdf' ? <FileText size={16} className="text-slate-500" /> : <ImageIcon size={16} className="text-slate-500" />}<p className="truncate text-xs font-medium text-slate-700">{file.name}</p></div>}{error && <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5"><AlertCircle size={14} className="text-rose-600" /><p className="text-xs text-rose-700">{error}</p></div>}<div className="flex gap-2"><button onClick={onClose} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700">cancel</button><button onClick={startProcessing} className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white">upload</button></div></div>}
    {step === 'processing' && <div className="mt-6 flex flex-col items-center py-6 text-center"><Loader2 size={26} className="animate-spin text-emerald-600" /><p className="mt-4 text-sm font-medium text-slate-900">{PROCESSING_STEPS[Math.min(processingIndex, PROCESSING_STEPS.length - 1)]}</p><div className="mt-4 w-full space-y-1.5">{PROCESSING_STEPS.map((label, index) => <div key={label} className="flex items-center gap-2 text-xs">{index < processingIndex ? <CheckCircle2 size={14} className="text-emerald-600" /> : index === processingIndex ? <Loader2 size={14} className="animate-spin text-slate-400" /> : <div className="h-3.5 w-3.5 rounded-full border border-slate-200" />}<span className={index <= processingIndex ? 'text-slate-700' : 'text-slate-300'}>{label}</span></div>)}</div><p className="mt-4 text-[11px] text-slate-400">simulated extraction — no data leaves your browser.</p></div>}
    {step === 'review' && extraction && <div className="mt-4 space-y-3"><div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-xs text-slate-500"><p><span className="text-slate-400">family member:</span> {extraction.patientName}</p><p><span className="text-slate-400">report:</span> {extraction.reportName}</p><p><span className="text-slate-400">date:</span> {extraction.reportDate}</p></div><div className="space-y-2">{extraction.fields.map((field) => <div key={field.key} className="rounded-xl border border-slate-200 p-3"><div className="flex items-center justify-between gap-2"><p className="text-sm font-medium text-slate-900">{field.label}</p><span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${field.confidence === 'high' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{field.confidence === 'high' ? 'high confidence' : 'needs verification'}</span></div><p className="mt-1 text-sm text-slate-600">{field.value}{field.unit ? ` ${field.unit}` : ''}</p>{field.confidence === 'verify' && <button onClick={() => toggleVerified(field.key)} className={`mt-2 rounded-lg px-3 py-1.5 text-xs font-medium ${field.verified ? 'bg-emerald-100 text-emerald-700' : 'border border-slate-200 text-slate-600'}`}>{field.verified ? 'verified' : 'mark as verified'}</button>}</div>)}</div><p className="text-[11px] leading-relaxed text-slate-400">confidence values are simulated for this prototype and are not clinically validated.</p><div className="flex gap-2"><button onClick={onClose} className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700">cancel</button><button onClick={handleConfirm} className="flex-1 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white">confirm report</button></div></div>}
  </div></div>;
}
