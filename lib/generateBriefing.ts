import { MedicalReport, ReportFieldChange } from '@/types';

export function generateBriefingText({
  previous,
  current,
  changes,
  reportCount,
}: {
  previous: MedicalReport;
  current: MedicalReport;
  changes: ReportFieldChange[];
  reportCount: number;
}): string {
  if (changes.length === 0) {
    return `${current.title}, dated ${current.date}, shows no changes from the previous record on ${previous.date}. ${reportCount} previous record${reportCount === 1 ? '' : 's'} on file.`;
  }

  const medicationChange = changes.find((c) => c.key === 'medication');
  const clinicalChanges = changes.filter((c) => c.key !== 'medication');

  const parts: string[] = [
    `${current.title}, dated ${current.date}, compared against the previous report from ${previous.date}, with ${reportCount} previous record${reportCount === 1 ? '' : 's'} on file.`,
  ];

  if (clinicalChanges.length > 0) {
    const changeDescriptions = clinicalChanges
      .map(
        (c) =>
          `${c.label} moved from ${c.previousValue}${c.unit ? ` ${c.unit}` : ''} to ${c.currentValue}${c.unit ? ` ${c.unit}` : ''}`
      )
      .join('. ');
    parts.push(changeDescriptions + '.');
  }

  if (medicationChange) {
    parts.push(`Medication changed from ${medicationChange.previousValue} to ${medicationChange.currentValue}.`);
  }

  return parts.join(' ');
}
