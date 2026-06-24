export type ReasonOptionId = 'option_a' | 'option_b' | 'option_c';

export interface ReasonOption {
  id: ReasonOptionId;
  labelCode: string;
  englishText: string;
  chineseHint: string;
}

export const REASON_OPTIONS: ReasonOption[] = [
  {
    id: 'option_a',
    labelCode: 'A',
    englishText: 'Not in current batch — Return to inventory storage location',
    chineseHint: '不在批次，重回库位'
  },
  {
    id: 'option_b',
    labelCode: 'B',
    englishText: 'Physical appearance damaged — Requires rework / repair',
    chineseHint: '外观损坏，需要返工'
  },
  {
    id: 'option_c',
    labelCode: 'C',
    englishText: 'Power specification mismatch — Does not meet shipment standards',
    chineseHint: '功率不符合出货要求'
  }
];

export type TagPaperSize = 'a4' | 'half' | 'tag';

export interface PalletNotice {
  id: string;
  subject: string;
  palletId?: string;
  selectedReason: ReasonOptionId;
  timestamp: string;
  isoDate: string;
  inspector: string;
  station: string;
  notes: string;
  createdAt: number;
}
