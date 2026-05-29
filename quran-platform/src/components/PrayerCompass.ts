/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { store } from '../store';
import { GET_PRAYER_TIMES, MOCK_DKIHR_LIST } from '../data/quran_data';
import { getTranslation } from '../utils/i18n';
import { renderIcons } from '../utils/icons';
import { AppState } from '../types';

export class PrayerCompass {
  private element: HTMLElement;
  private selectedCity: string = 'Erbil';
  private activeDhikrIndex: number = 0;
  private dhikrCountsLocal: number[] = [0, 0, 0, 0];

  constructor(containerId: string) {
    const parent = document.getElementById(containerId);
    if (!parent) throw new Error(`Container #${containerId} not found`);

    this.element = document.createElement('div');
    this.element.className = 'grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in transition-all';
    parent.appendChild(this.element);

    store.subscribe((state) => this.render(state));
  }

  private render(state: AppState): void {
    const lang = state.language;
    const isRtl = lang !== 'en';

    const pTimes = GET_PRAYER_TIMES(this.selectedCity);

    // Grid Column 1: Prayer times & compass
    // Grid Column 2: Digital counters (Tasbih)
    this.element.innerHTML = `
      <!-- Prayer Times panel -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border-color)] shadow-xs flex flex-col gap-4">
        <div class="flex items-center justify-between border-b border-[var(--border-color)]/60 pb-3" dir="${isRtl ? 'rtl' : 'ltr'}">
          <span class="font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
            <i data-lucide="compass" class="w-5 h-5 text-[var(--accent)]"></i>
            ${getTranslation(lang, 'prayerTimes')}
          </span>
          <span class="text-[10px] font-bold text-[var(--accent)] font-mono">Qibla: ${pTimes.qibla}</span>
        </div>

        <div class="flex flex-col gap-2" dir="${isRtl ? 'rtl' : 'ltr'}">
          <label class="text-[10px] font-bold text-[var(--text-muted)]">${getTranslation(lang, 'prayerCitySelect')}</label>
          <select id="prayer-city-select" class="text-xs bg-[var(--bg-app)] text-[var(--text-main)] p-2.5 rounded-lg border border-[var(--border-color)] focus:outline-none">
            <option value="Erbil" ${this.selectedCity === 'Erbil' ? 'selected' : ''}>${getTranslation(lang, 'prayerErbil')} (Hevlêr)</option>
            <option value="Sulaymaniyah" ${this.selectedCity === 'Sulaymaniyah' ? 'selected' : ''}>${getTranslation(lang, 'prayerSulaymaniyah')} (Slêmanî)</option>
            <option value="Duhok" ${this.selectedCity === 'Duhok' ? 'selected' : ''}>${getTranslation(lang, 'prayerDuhok')} (Duhok)</option>
            <option value="Kirkuk" ${this.selectedCity === 'Kirkuk' ? 'selected' : ''}>${getTranslation(lang, 'prayerKirkuk')} (Kerkûk)</option>
          </select>
        </div>

        <!-- Timetable grids -->
        <div class="grid grid-cols-3 gap-2 mt-1 font-sans text-xs">
          <!-- Fajr -->
          <div class="bg-[var(--bg-app)]/50 border border-[var(--border-color)] p-2.5 rounded-xl flex flex-col items-center gap-1">
            <span class="text-[10px] text-[var(--text-muted)] font-bold">${getTranslation(lang, 'fajr')}</span>
            <span class="font-bold text-[var(--text-main)]">${pTimes.fajr}</span>
          </div>
          <!-- Sunrise -->
          <div class="bg-[var(--bg-app)]/50 border border-[var(--border-color)] p-2.5 rounded-xl flex flex-col items-center gap-1">
            <span class="text-[10px] text-[var(--text-muted)] font-bold">${getTranslation(lang, 'sunrise')}</span>
            <span class="font-bold text-[var(--text-main)]">${pTimes.sunrise}</span>
          </div>
          <!-- Dhuhr -->
          <div class="bg-[var(--bg-app)]/50 border border-[var(--border-color)] p-2.5 rounded-xl flex flex-col items-center gap-1">
            <span class="text-[10px] text-[var(--text-muted)] font-bold">${getTranslation(lang, 'dhuhr')}</span>
            <span class="font-bold text-[var(--text-main)]">${pTimes.dhuhr}</span>
          </div>
          <!-- Asr -->
          <div class="bg-[var(--bg-app)]/50 border border-[var(--border-color)] p-2.5 rounded-xl flex flex-col items-center gap-1">
            <span class="text-[10px] text-[var(--text-muted)] font-bold">${getTranslation(lang, 'asr')}</span>
            <span class="font-bold text-[var(--text-main)]">${pTimes.asr}</span>
          </div>
          <!-- Maghrib -->
          <div class="bg-[var(--bg-app)]/50 border border-[var(--border-color)] p-2.5 rounded-xl flex flex-col items-center gap-1">
            <span class="text-[10px] text-[var(--text-muted)] font-bold">${getTranslation(lang, 'maghrib')}</span>
            <span class="font-bold text-red-500 font-extrabold">${pTimes.maghrib}</span>
          </div>
          <!-- Isha -->
          <div class="bg-[var(--bg-app)]/50 border border-[var(--border-color)] p-2.5 rounded-xl flex flex-col items-center gap-1">
            <span class="text-[10px] text-[var(--text-muted)] font-bold">${getTranslation(lang, 'isha')}</span>
            <span class="font-bold text-[var(--text-main)]">${pTimes.isha}</span>
          </div>
        </div>
      </div>

      <!-- Rosary / Tasbih Electronic panel -->
      <div class="bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border-color)] shadow-xs flex flex-col gap-4">
        <div class="flex items-center justify-between border-b border-[var(--border-color)]/60 pb-3" dir="${isRtl ? 'rtl' : 'ltr'}">
          <span class="font-bold text-sm text-[var(--text-main)] flex items-center gap-2">
            <i data-lucide="activity" class="w-5 h-5 text-[var(--accent)] animate-pulse"></i>
            المسبحة والعداد الرقمي
          </span>
          <button id="dhikr-reset-btn" class="text-[10px] font-bold text-red-500 hover:underline cursor-pointer">
            ${getTranslation(lang, 'reset')}
          </button>
        </div>

        <!-- Selector List -->
        <div class="flex flex-col gap-2" dir="${isRtl ? 'rtl' : 'ltr'}">
          <select id="dhikr-preset-select" class="text-xs bg-[var(--bg-app)] text-[var(--text-main)] p-2.5 rounded-lg border border-[var(--border-color)] focus:outline-none">
            ${MOCK_DKIHR_LIST.map((d, index) => `
              <option value="${index}" ${this.activeDhikrIndex === index ? 'selected' : ''}>
                ${d.text} — (${this.dhikrCountsLocal[index]})
              </option>
            `).join('')}
          </select>
          <p class="text-[10px] text-[var(--text-muted)] italic text-right">${MOCK_DKIHR_LIST[this.activeDhikrIndex].translation}</p>
        </div>

        <!-- Big Tap Counter Button -->
        <div class="flex items-center justify-center p-2 relative h-28">
          <button id="tasbih-tap-btn" class="z-10 w-24 h-24 rounded-full bg-[var(--accent)] shadow-md text-white flex flex-col items-center justify-center gap-1 active:scale-95 hover:scale-105 transition-all cursor-pointer font-sans border-2 border-[var(--bg-card)] ring-4 ring-[var(--accent-glow)] select-none">
            <span class="text-2xl font-bold font-mono tracking-tight text-white">${this.dhikrCountsLocal[this.activeDhikrIndex]}</span>
            <span class="text-[9px] uppercase font-bold tracking-widest opacity-80">سبّح</span>
          </button>
        </div>
      </div>
    `;

    renderIcons(this.element);
    this.addPrayerCompassListeners();
  }

  private addPrayerCompassListeners(): void {
    // City Selector
    const citySelect = this.element.querySelector('#prayer-city-select') as HTMLSelectElement;
    citySelect?.addEventListener('change', () => {
      this.selectedCity = citySelect.value;
      store.updateState({}); // force re-render components on choice changes
    });

    // Preset Dhikr Selector
    const presetSelect = this.element.querySelector('#dhikr-preset-select') as HTMLSelectElement;
    presetSelect?.addEventListener('change', () => {
      this.activeDhikrIndex = parseInt(presetSelect.value);
      store.updateState({}); // force local re-render
    });

    // Increment Counter
    const tapBtn = this.element.querySelector('#tasbih-tap-btn') as HTMLButtonElement;
    tapBtn?.addEventListener('click', () => {
      this.dhikrCountsLocal[this.activeDhikrIndex]++;
      
      // Perform a small haptic vibration if supported (PWA/Desktop standards)
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
      
      store.updateState({}); // force re-render count label
    });

    // Reset Counts
    const resetBtn = this.element.querySelector('#dhikr-reset-btn');
    resetBtn?.addEventListener('click', () => {
      this.dhikrCountsLocal[this.activeDhikrIndex] = 0;
      store.updateState({}); // force updates
    });
  }
}
