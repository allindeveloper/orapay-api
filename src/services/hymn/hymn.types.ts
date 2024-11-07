export interface Verse {
  verseName: string;
  verseNumber?: string | null;
  text: string;
  isRefrain: boolean;
}

export interface HymnBook {
  hymnNumber: string;
  hymnTitle: string;
  verses: Verse[];
}

export enum Language {
  Igbo = 'ig',
  English = 'en'
}

export interface HymnData {
  _id: number;
  number: number;
  refrain: string | null;
  refrain2: string | null;
  section: number;
  subsection: number;
  title: string;
  verse1: string;
  verse2: string | null;
  verse3: string | null;
  verse4: string | null;
  verse5: string | null;
  verse6: string | null;
  verse7: string | null;
  [key: string]: string | null | number;
}
