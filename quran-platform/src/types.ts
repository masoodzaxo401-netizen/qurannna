/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppLanguage = 'ar' | 'en' | 'ku-ckb' | 'ku-kmr'; // ku-ckb = Sorani, ku-kmr = Badini

export type DisplayMode = 'page' | 'verse';

export type ThemeMode = 'light' | 'dark' | 'sepia';

export type QuranFont = 'uthmani' | 'imlaei' | 'maghrebi';

export interface SurahMeta {
  id: number;
  nameArabic: string;
  nameEnglish: string;
  nameKurdish: string;
  revelationType: 'Meccan' | 'Medinan';
  versesCount: number;
  startPage: number;
  endPage: number;
}

export interface Ayah {
  id: number;
  surahId: number;
  ayahNumber: number;
  juz: number;
  hizb: number;
  page: number;
  textUthmani: string;
  textClean: string;
  textImlaei: string;
  translations: {
    en: string;
    'ku-ckb': string; // Sorani (Hajar Mukriyani)
    'ku-kmr': string; // Badini
  };
  tafsir: {
    ar: string; // Al-Muyassar / Ibn Kathir
    'ku-ckb': string; // Kurdish Sorani
  };
  sajdah?: boolean;
}

export interface Reciter {
  id: string;
  nameAr: string;
  nameEn: string;
  nameKu: string;
  style: string;
  audioBaseUrl: string;
}

export interface Bookmark {
  id: string;
  surahId: number;
  ayahNumber: number;
  category: 'general' | 'hifz' | 'reflection';
  note?: string;
  createdAt: string;
}

export interface Reflection {
  id: string;
  surahId: number;
  ayahNumber: number;
  text: string;
  createdAt: string;
}

export interface HifzPlan {
  id: string;
  title: string;
  surahId: number;
  targetDays: number;
  startDate: string;
  completed: boolean;
  memorizedAyahs: number[]; // ayah numbers
}

export interface AppState {
  language: AppLanguage;
  displayMode: DisplayMode;
  theme: ThemeMode;
  font: QuranFont;
  fontSize: number; // percentage, e.g., 100, 150, 200, 300
  activeSurahId: number;
  activeReciterId: string;
  playingAyah: { surahId: number; ayahNumber: number } | null;
  isPlaying: boolean;
  isAutoScroll: boolean;
  repeatTimes: number;
  intervalSilence: number; // in seconds
  bookmarks: Bookmark[];
  reflections: Reflection[];
  hifzPlans: HifzPlan[];
  searchHistory: string[];
}
