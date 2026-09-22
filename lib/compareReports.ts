import { MedicalReport, ReportFieldChange, ChangeStatus } from '@/types';

const FIELD_CONFIG: Record<string, { betterWhen: 'higher' | 'lower' | 'na' }> = {
  hemoglobin: { betterWhen: 'higher' },
  bloodPressure: { betterWhen: 'lower' },
  bloodSugar: { betterWhen: 'lower' },
  medication: { betterWhen: 'na' },
  heartRate: { betterWhen: 'lower' },
  temperature: { betterWhen: 'lower' },
  height: { betterWhen: 'higher' },
  weight: { betterWhen: 'na' },
  followUp: { betterWhen: 'na' },
};

function extractNumber(value: string): number | null {
  const match = value.match(/-?\d+(\.\d+)?/);
  return match ? parseFloat(match[0]) : null;
}

export function compareReports(previous: MedicalReport, current: MedicalReport): ReportFieldChange[] {
  const prevMap = new Map(previous.fields.map((f) => [f.key, f]));

  return current.fields.map((currField) => {
    const prevField = prevMap.get(currField.key);
    const config = FIELD_CONFIG[currField.key] ?? { betterWhen: 'na' as const };

    if (!prevField) {
      return {
        key: currField.key,
        label: currField.label,
        unit: currField.unit,
        previousValue: '—',
        currentValue: currField.value,
        status: 'new' as ChangeStatus,
        note: 'New field recorded in latest report',
      };
    }

    if (prevField.value === currField.value) {
      return {
        key: currField.key,
        label: currField.label,
        unit: currField.unit,
        previousValue: prevField.value,
        currentValue: currField.value,
        status: 'unchanged' as ChangeStatus,
      };
    }

    let status: ChangeStatus = 'changed';
    const prevNum = extractNumber(prevField.value);
    const currNum = extractNumber(currField.value);

    if (config.betterWhen !== 'na' && prevNum !== null && currNum !== null) {
      const improved = config.betterWhen === 'higher' ? currNum > prevNum : currNum < prevNum;
      status = improved ? 'improved' : 'worsened';
    }

    return {
      key: currField.key,
      label: currField.label,
      unit: currField.unit,
      previousValue: prevField.value,
      currentValue: currField.value,
      status,
    };
  });
}
