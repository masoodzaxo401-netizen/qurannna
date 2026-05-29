/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { store } from '../store';
import { SURAH_LIST } from '../data/quran_data';
import { getTranslation } from '../utils/i18n';
import { renderIcons } from '../utils/icons';
import { AppState } from '../types';

export class IndexSidebar {
  private element: HTMLElement;

  constructor(containerId: string) {
    const parent = document.getElementById(containerId);
    if (!parent) throw new Error(`Container #${containerId} not found`);

    this.element = document.createElement('div');
    this.element.className = 'w-full lg:w-80 h-auto lg:h-[calc(100vh-80px)] overflow-y-auto bg-[var(--bg-card)] border-r border-[var(--border-color)] p-4 flex flex-col gap-4 sticky top-16 shadow-xs';
    parent.appendChild(this.element);

    store.subscribe((state) => this.render(state));
  }

  private render(state: AppState): void {
    const isRtl = state.language !== 'en';
    const lang = state.language;

    this.element.innerHTML = `
      <div class="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
        <span class="font-bold text-md text-[var(--text-main)] flex items-center gap-2">
          <i data-lucide="list" class="w-5 h-5 text-[var(--accent)]"></i>
          ${getTranslation(lang, 'surahIndex')}
        </span>
        <span class="text-xs font-semibold px-2 py-0.5 rounded bg-[var(--accent-light)] text-[var(--accent)]">
          114 Surahs
        </span>
      </div>

      <!-- Quick Search inside catalog -->
      <div class="relative">
        <input id="catalog-search" type="text" placeholder="ابحث عن سورة..." class="w-full text-xs bg-[var(--bg-app)] text-[var(--text-main)] placeholder-[var(--text-muted)] p-2.5 rounded-lg border border-[var(--border-color)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] pr-8 pl-3">
        <div class="absolute inset-y-0 right-2 w-5 flex items-center text-[var(--text-muted)]">
          <i data-lucide="search" class="w-4 h-4"></i>
        </div>
      </div>

      <!-- Surah List Container -->
      <div id="catalog-list" class="flex flex-col gap-2 mt-2 flex-grow overflow-y-auto max-h-[400px] lg:max-h-full">
        ${SURAH_LIST.map((surah) => {
          const isActive = state.activeSurahId === surah.id;
          const translatedName = lang === 'en' ? surah.nameEnglish : surah.nameKurdish;
          const originalName = surah.nameArabic;
          const revelationText = getTranslation(lang, surah.revelationType === 'Meccan' ? 'revelationMeccan' : 'revelationMedinan');

          return `
            <button data-surah-id="${surah.id}" class="w-full text-right flex items-center justify-between p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
              isActive
                ? 'bg-[var(--accent-light)] border-[var(--accent)] shadow-xs'
                : 'border-[var(--border-color)] hover:bg-[var(--bg-app)]/50'
            }">
              <div class="flex items-center gap-3">
                <!-- Circular Number -->
                <div class="w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                  isActive ? 'bg-[var(--accent)] text-white' : 'bg-stone-100 dark:bg-stone-800 text-[var(--text-muted)]'
                }">
                  ${surah.id}
                </div>
                <!-- Surah localized metadata -->
                <div class="text-right">
                  <h3 class="text-sm font-bold text-[var(--text-main)] ${isRtl ? 'text-right' : 'text-left'}">${translatedName}</h3>
                  <p class="text-[10px] text-[var(--text-muted)] ${isRtl ? 'text-right' : 'text-left'}">
                    ${revelationText} • ${surah.versesCount} آية
                  </p>
                </div>
              </div>

              <!-- High Contrast Arabic Calligraphy style -->
              <span class="font-quran text-lg font-bold text-[var(--accent)]">
                ${originalName}
              </span>
            </button>
          `;
        }).join('')}
      </div>
    `;

    renderIcons(this.element);
    this.addEventListeners();
  }

  private addEventListeners(): void {
    // Select Surah Buttons
    const buttons = this.element.querySelectorAll('button[data-surah-id]');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const surahId = parseInt(btn.getAttribute('data-surah-id') || '1');
        store.setActiveSurah(surahId);
        // Dispatch custom global event to reset page offsets
        window.dispatchEvent(new CustomEvent('surah-changed', { detail: { surahId } }));
      });
    });

    // Realtime Catalog Filter
    const catalogSearch = this.element.querySelector('#catalog-search') as HTMLInputElement;
    if (catalogSearch) {
      catalogSearch.addEventListener('input', () => {
        const val = catalogSearch.value.trim().toLowerCase();
        const items = this.element.querySelectorAll('button[data-surah-id]');
        items.forEach((item) => {
          const text = item.textContent?.toLowerCase() || '';
          if (text.includes(val)) {
            (item as HTMLElement).classList.remove('hidden');
          } else {
            (item as HTMLElement).classList.add('hidden');
          }
        });
      });
    }
  }
}
