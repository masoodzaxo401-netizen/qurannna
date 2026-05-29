/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { store } from '../store';
import { AYAH_DATA, SURAH_LIST } from '../data/quran_data';
import { getTranslation } from '../utils/i18n';
import { renderIcons } from '../utils/icons';
import { AppState } from '../types';

export class SearchEngine {
  private element: HTMLElement;

  constructor(containerId: string) {
    const parent = document.getElementById(containerId);
    if (!parent) throw new Error(`Container #${containerId} not found`);

    this.element = document.createElement('div');
    this.element.className = 'bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border-color)] shadow-xs flex flex-col gap-4 animate-fade-in transition-all';
    parent.appendChild(this.element);

    store.subscribe((state) => this.render(state));
  }

  private render(state: AppState): void {
    const lang = state.language;
    const isRtl = lang !== 'en';

    this.element.innerHTML = `
      <div class="flex items-center justify-between border-b border-[var(--border-color)]/60 pb-3">
        <h3 class="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
          <i data-lucide="search" class="w-5 h-5 text-[var(--accent)]"></i>
          ${getTranslation(lang, 'search')}
        </h3>
        <span class="text-[10px] font-bold text-[var(--text-muted)] font-mono">Real-Time Search Engine</span>
      </div>

      <!-- Search Inputs -->
      <div class="flex gap-2">
        <input id="search-main-input" type="text" placeholder="${getTranslation(lang, 'searchPlaceholder')}" class="flex-grow text-xs bg-[var(--bg-app)] text-[var(--text-main)] placeholder-[var(--text-muted)] p-3 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]">
        <button id="search-action-btn" class="btn-primary text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer shadow-xs">
          ${getTranslation(lang, 'search')}
        </button>
      </div>

      <!-- Last Searches history -->
      ${state.searchHistory.length > 0 ? `
        <div class="flex items-center gap-2 flex-wrap">
          <span class="text-[10px] font-bold text-[var(--text-muted)] flex items-center gap-1">
            <i data-lucide="history" class="w-3.5 h-3.5"></i>
            ${getTranslation(lang, 'lastSearches')}:
          </span>
          ${state.searchHistory.map((query) => `
            <button data-history-query="${query}" class="text-[10px] font-semibold bg-[var(--bg-app)] hover:bg-[var(--border-color)] text-[var(--text-main)] px-2.5 py-1 rounded-lg border border-[var(--border-color)]/60 cursor-pointer">
              ${query}
            </button>
          `).join('')}
          <button id="clear-search-history" class="text-[9px] font-bold text-red-500 hover:underline cursor-pointer">
            ${getTranslation(lang, 'reset')}
          </button>
        </div>
      ` : ''}

      <!-- Results Container -->
      <div id="search-results-box" class="hidden flex flex-col gap-3 mt-2 overflow-y-auto max-h-[300px] border-t border-[var(--border-color)]/40 pt-3">
        <!-- Results inject dynamically here -->
      </div>
    `;

    renderIcons(this.element);
    this.addSearchListeners(state);
  }

  private addSearchListeners(state: AppState): void {
    const input = this.element.querySelector('#search-main-input') as HTMLInputElement;
    const btn = this.element.querySelector('#search-action-btn');
    const resultsBox = this.element.querySelector('#search-results-box') as HTMLDivElement;

    const performSearch = () => {
      const query = input.value.trim();
      if (!query) return;

      // Add to store history
      store.addSearchQuery(query);

      // Handle coordinate search, e.g., "1:5" or "67:3"
      const matchCoordinate = query.match(/^(\d+)[\:\s](\d+)$/);
      if (matchCoordinate) {
        const surahId = parseInt(matchCoordinate[1]);
        const ayahNum = parseInt(matchCoordinate[2]);
        const surahList = SURAH_LIST.find((s) => s.id === surahId);
        const dataList = AYAH_DATA[surahId] || [];

        if (surahList && ayahNum <= dataList.length) {
          store.setActiveSurah(surahId);
          setTimeout(() => {
            store.setPlayingAyah({ surahId, ayahNumber: ayahNum });
            store.setIsPlaying(true);
            const activeMatch = document.getElementById(`ayah-${ayahNum}`);
            if (activeMatch) activeMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 200);

          resultsBox.innerHTML = `
            <div class="p-3 bg-[var(--accent-light)] text-[var(--accent)] rounded-lg text-xs font-bold font-sans">
              جاري الانتقال التلقائي للآية ${surahId}:${ayahNum} في سورة ${surahList.nameArabic}...
            </div>
          `;
          resultsBox.classList.remove('hidden');
          return;
        }
      }

      // Perform local search across dataset
      const results: { surahId: number; surahName: string; ayah: any }[] = [];
      const queryLower = query.toLowerCase();

      Object.entries(AYAH_DATA).forEach(([sIdStr, ayahs]) => {
        const sId = parseInt(sIdStr);
        const surahMeta = SURAH_LIST.find((s) => s.id === sId);
        if (!surahMeta) return;

        ayahs.forEach((ayah) => {
          const matchArabicClean = ayah.textClean.includes(query);
          const matchArabicUthmani = ayah.textUthmani.includes(query);
          const matchEnglish = ayah.translations.en.toLowerCase().includes(queryLower);
          const matchSorani = ayah.translations['ku-ckb'].includes(query);
          const matchBadini = ayah.translations['ku-kmr'].includes(query);

          if (matchArabicClean || matchArabicUthmani || matchEnglish || matchSorani || matchBadini) {
            results.push({
              surahId: sId,
              surahName: surahMeta.nameArabic,
              ayah
            });
          }
        });
      });

      renderSearchResults(results, query);
    };

    const renderSearchResults = (results: any[], queryTerm: string) => {
      const lang = state.language;
      resultsBox.classList.remove('hidden');

      if (results.length === 0) {
        resultsBox.innerHTML = `
          <div class="p-5 text-center text-xs font-semibold text-[var(--text-muted)]">
            ${getTranslation(lang, 'noResults')}
          </div>
        `;
        return;
      }

      resultsBox.innerHTML = `
        <div class="text-[10px] font-bold text-[var(--accent)] uppercase select-none mb-1">
          ${getTranslation(lang, 'resultsFound', { count: results.length })}
        </div>
        <div class="flex flex-col gap-2">
          ${results.map((res) => {
            // highlight logic
            let text = res.ayah.textUthmani;
            let displayTranslation = res.ayah.translations['ku-ckb'];
            if (state.language === 'en') displayTranslation = res.ayah.translations.en;
            if (state.language === 'ku-kmr') displayTranslation = res.ayah.translations['ku-kmr'];

            // Bold highlight query term
            const regex = new RegExp(`(${queryTerm})`, 'gi');
            const highlightedTrans = displayTranslation.replace(regex, `<mark class="bg-amber-100 dark:bg-amber-900/45 text-[var(--text-main)] font-bold px-1 rounded">$1</mark>`);

            return `
              <button data-search-jump-surah="${res.surahId}" data-search-jump-ayah="${res.ayah.ayahNumber}" class="w-full text-right p-3 rounded-lg border border-[var(--border-color)]/60 hover:bg-[var(--bg-app)]/50 transition-colors flex flex-col gap-1.5 cursor-pointer">
                <div class="flex items-center justify-between w-full border-b border-[var(--border-color)]/20 pb-1 text-[10px] font-bold text-[var(--text-muted)]">
                  <span class="bg-[var(--accent-light)] text-[var(--accent)] px-2 py-0.5 rounded">سورة ${res.surahName}</span>
                  <span>الآية ${res.surahId}:${res.ayah.ayahNumber}</span>
                </div>
                <p class="quran-text text-sm font-bold text-stone-900 dark:text-stone-100 text-right w-full mt-1">${text}</p>
                <p class="text-xs text-[var(--text-muted)] text-right w-full" dir="${state.language === 'en' ? 'ltr' : 'rtl'}">${highlightedTrans}</p>
              </button>
            `;
          }).join('')}
        </div>
      `;

      // Jump click events
      const resultsButtons = resultsBox.querySelectorAll('[data-search-jump-surah]');
      resultsButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const sId = parseInt(btn.getAttribute('data-search-jump-surah') || '1');
          const aNum = parseInt(btn.getAttribute('data-search-jump-ayah') || '1');
          
          store.setActiveSurah(sId);
          setTimeout(() => {
            store.setPlayingAyah({ surahId: sId, ayahNumber: aNum });
            store.setIsPlaying(true);
            const element = document.getElementById(`ayah-${aNum}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 200);
        });
      });
    };

    // Trigger Search
    btn?.addEventListener('click', performSearch);
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') performSearch();
    });

    // History Buttons jump search
    const histBtn = this.element.querySelectorAll('[data-history-query]');
    histBtn.forEach((b) => {
      b.addEventListener('click', () => {
        const queryVal = b.getAttribute('data-history-query') || '';
        input.value = queryVal;
        performSearch();
      });
    });

    // Clear search history
    const clearHistoryBtn = this.element.querySelector('#clear-search-history');
    clearHistoryBtn?.addEventListener('click', () => {
      store.clearSearchHistory();
    });
  }
}
