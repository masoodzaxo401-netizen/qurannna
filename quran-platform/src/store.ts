/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppState, Bookmark, Reflection, HifzPlan, AppLanguage, ThemeMode, DisplayMode, QuranFont } from './types';

const STORAGE_KEY = 'quran_platform_state_v1';

const DEFAULT_STATE: AppState = {
  language: 'ar',
  displayMode: 'verse',
  theme: 'sepia', // Warm eye-friendly sepia as default
  font: 'uthmani',
  fontSize: 120, // 120% default size
  activeSurahId: 1,
  activeReciterId: 'alafasy',
  playingAyah: null,
  isPlaying: false,
  isAutoScroll: true,
  repeatTimes: 1,
  intervalSilence: 0,
  bookmarks: [],
  reflections: [],
  hifzPlans: [],
  searchHistory: []
};

type Listener = (state: AppState) => void;

class AppStore {
  private state: AppState;
  private listeners: Set<Listener> = new Set();

  constructor() {
    this.state = this.loadState();
  }

  private loadState(): AppState {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure bookmarks and other array types are populated
        return {
          ...DEFAULT_STATE,
          ...parsed,
          bookmarks: parsed.bookmarks || [],
          reflections: parsed.reflections || [],
          hifzPlans: parsed.hifzPlans || [],
          searchHistory: parsed.searchHistory || []
        };
      }
    } catch (e) {
      console.error('Error loading stored state:', e);
    }
    return { ...DEFAULT_STATE };
  }

  private saveState(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Error saving state:', e);
    }
  }

  public getState(): AppState {
    return this.state;
  }

  public updateState(updater: Partial<AppState> | ((state: AppState) => Partial<AppState>)): void {
    const changes = typeof updater === 'function' ? updater(this.state) : updater;
    this.state = { ...this.state, ...changes };
    this.saveState();
    this.notify();
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    // Initial call with current state
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => {
      try {
        listener(this.state);
      } catch (e) {
        console.error('Error in state listener:', e);
      }
    });
  }

  // --- Actions ---

  public setLanguage(lang: AppLanguage): void {
    this.updateState({ language: lang });
  }

  public setDisplayMode(mode: DisplayMode): void {
    this.updateState({ displayMode: mode });
  }

  public setTheme(theme: ThemeMode): void {
    this.updateState({ theme });
  }

  public setFont(font: QuranFont): void {
    this.updateState({ font });
  }

  public setFontSize(fontSize: number): void {
    this.updateState({ fontSize });
  }

  public setActiveSurah(surahId: number): void {
    this.updateState({ activeSurahId: surahId });
  }

  public setActiveReciter(reciterId: string): void {
    this.updateState({ activeReciterId: reciterId });
  }

  public setPlayingAyah(playingAyah: { surahId: number; ayahNumber: number } | null): void {
    this.updateState({ playingAyah });
  }

  public setIsPlaying(isPlaying: boolean): void {
    this.updateState({ isPlaying });
  }

  public setIsAutoScroll(isAutoScroll: boolean): void {
    this.updateState({ isAutoScroll });
  }

  public setAudioControls(repeatTimes: number, intervalSilence: number): void {
    this.updateState({ repeatTimes, intervalSilence });
  }

  // Bookmarks
  public toggleBookmark(surahId: number, ayahNumber: number, category: Bookmark['category'] = 'general', note?: string): void {
    const existingIndex = this.state.bookmarks.findIndex(
      (b) => b.surahId === surahId && b.ayahNumber === ayahNumber
    );

    let newBookmarks = [...this.state.bookmarks];
    if (existingIndex > -1) {
      newBookmarks.splice(existingIndex, 1);
    } else {
      const newBookmark: Bookmark = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        surahId,
        ayahNumber,
        category,
        note,
        createdAt: new Date().toISOString()
      };
      newBookmarks.push(newBookmark);
    }
    this.updateState({ bookmarks: newBookmarks });
  }

  public isBookmarked(surahId: number, ayahNumber: number): boolean {
    return this.state.bookmarks.some((b) => b.surahId === surahId && b.ayahNumber === ayahNumber);
  }

  // Reflections
  public addOrUpdateReflection(surahId: number, ayahNumber: number, text: string): void {
    const existingIndex = this.state.reflections.findIndex(
      (r) => r.surahId === surahId && r.ayahNumber === ayahNumber
    );

    let newReflections = [...this.state.reflections];
    if (existingIndex > -1) {
      if (text.trim() === '') {
        newReflections.splice(existingIndex, 1);
      } else {
        newReflections[existingIndex] = {
          ...newReflections[existingIndex],
          text,
          createdAt: new Date().toISOString()
        };
      }
    } else if (text.trim() !== '') {
      const newReflection: Reflection = {
        id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
        surahId,
        ayahNumber,
        text,
        createdAt: new Date().toISOString()
      };
      newReflections.push(newReflection);
    }
    this.updateState({ reflections: newReflections });
  }

  public getReflection(surahId: number, ayahNumber: number): string {
    const ref = this.state.reflections.find((r) => r.surahId === surahId && r.ayahNumber === ayahNumber);
    return ref ? ref.text : '';
  }

  // Hifz Plans
  public createHifzPlan(title: string, surahId: number, targetDays: number): void {
    const newPlan: HifzPlan = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      title,
      surahId,
      targetDays,
      startDate: new Date().toISOString().split('T')[0],
      completed: false,
      memorizedAyahs: []
    };
    this.updateState({ hifzPlans: [...this.state.hifzPlans, newPlan] });
  }

  public toggleAyahMemorized(planId: string, ayahNumber: number): void {
    const newPlans = this.state.hifzPlans.map((p) => {
      if (p.id === planId) {
        let memorized = [...p.memorizedAyahs];
        const idx = memorized.indexOf(ayahNumber);
        if (idx > -1) {
          memorized.splice(idx, 1);
        } else {
          memorized.push(ayahNumber);
        }
        return {
          ...p,
          memorizedAyahs: memorized
        };
      }
      return p;
    });
    this.updateState({ hifzPlans: newPlans });
  }

  public deleteHifzPlan(planId: string): void {
    this.updateState({
      hifzPlans: this.state.hifzPlans.filter((p) => p.id !== planId)
    });
  }

  // Search History
  public addSearchQuery(query: string): void {
    if (!query.trim()) return;
    const history = this.state.searchHistory.filter((q) => q !== query);
    history.unshift(query);
    this.updateState({ searchHistory: history.slice(0, 10) });
  }

  public clearSearchHistory(): void {
    this.updateState({ searchHistory: [] });
  }
}

export const store = new AppStore();
