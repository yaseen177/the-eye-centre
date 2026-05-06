import type { LensType, LensPackage, LensTint } from '@/types';

export interface PrescriptionFormData {
  // Step 1
  lensType: LensType;
  // Step 2
  sendLater: boolean;
  rightSph: string;
  rightCyl: string;
  rightAxis: string;
  rightAdd: string;
  leftSph: string;
  leftCyl: string;
  leftAxis: string;
  leftAdd: string;
  // Step 3
  pdMode: 'single' | 'dual';
  pdSingle: string;
  pdRight: string;
  pdLeft: string;
  // Step 4
  lensPackage: LensPackage;
  // Step 5
  lensTint: LensTint;
}

export const defaultFormData: PrescriptionFormData = {
  lensType: 'SINGLE_VISION',
  sendLater: false,
  rightSph: '0.00', rightCyl: '0.00', rightAxis: '0', rightAdd: '0.00',
  leftSph: '0.00',  leftCyl: '0.00',  leftAxis: '0', leftAdd: '0.00',
  pdMode: 'single', pdSingle: '63', pdRight: '31.5', pdLeft: '31.5',
  lensPackage: 'BRONZE',
  lensTint: 'CLEAR',
};
