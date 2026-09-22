import { ExtractionResult, ExtractedField, ConfidenceLevel, MedicalReport } from '@/types';

function jitterNumber(value: string, magnitude = 0.08): string {
  const match = value.match(/-?\d+(\.\d+)?/);
  if (!match) return value;
  const num = parseFloat(match[0]);
  const delta = num * magnitude * (Math.random() > 0.5 ? 1 : -1);
  const newNum = Math.round((num + delta) * 10) / 10;
  return value.replace(match[0], String(newNum));
}

const DEFAULT_FIELDS: { key: string; label: string; value: string; unit?: string }[] = [
  { key: 'bloodPressure', label: 'Blood Pressure', value: '122/80', unit: 'mmHg' },
  { key: 'weight', label: 'Weight', value: '60', unit: 'kg' },
  { key: 'temperature', label: 'Temperature', value: '98.6', unit: '°F' },
  { key: 'medication', label: 'Medication', value: 'None reported' },
  { key: 'followUp', label: 'Follow-up Status', value: 'Not required' },
];

export function generateExtraction(
  memberName: string,
  previousReport: MedicalReport | undefined,
  fileName: string
): ExtractionResult {
  const today = new Date().toISOString().split('T')[0];
  const baseFields = previousReport && previousReport.fields.length > 0 ? previousReport.fields : DEFAULT_FIELDS;

  const fields: ExtractedField[] = baseFields.map((f, i) => {
    const isNumeric = /\d/.test(f.value);
    const value = isNumeric ? jitterNumber(f.value) : f.value;
    const confidence: ConfidenceLevel = i % 3 === 1 ? 'verify' : 'high';
    return {
      key: f.key,
      label: f.label,
      unit: f.unit,
      value,
      confidence,
      verified: confidence === 'high',
    };
  });

  return {
    patientName: memberName,
    reportName: `Follow-up Report — ${fileName.replace(/\.[^/.]+$/, '')}`,
    reportDate: today,
    fields,
  };
}
