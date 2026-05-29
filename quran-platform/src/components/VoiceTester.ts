/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { store } from '../store';
import { AYAH_DATA } from '../data/quran_data';
import { getTranslation } from '../utils/i18n';
import { renderIcons } from '../utils/icons';
import { AppState } from '../types';

export class VoiceTester {
  private element: HTMLElement;
  private recognition: any = null;
  private isListeningLocal: boolean = false;

  constructor(containerId: string) {
    const parent = document.getElementById(containerId);
    if (!parent) throw new Error(`Container #${containerId} not found`);

    this.element = document.createElement('div');
    this.element.className = 'bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border-color)] shadow-xs flex flex-col gap-4 animate-fade-in transition-all';
    parent.appendChild(this.element);

    this.setupSpeechRecognition();
    store.subscribe((state) => this.render(state));
  }

  private setupSpeechRecognition(): void {
    const SpeechClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechClass) {
      this.recognition = new SpeechClass();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'ar-SA'; // Quranic standard arabic speech model

      this.recognition.onstart = () => {
        this.isListeningLocal = true;
        this.updateUIPublishing();
      };

      this.recognition.onend = () => {
        this.isListeningLocal = false;
        this.updateUIPublishing();
      };

      this.recognition.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript;
        this.calculateDiagnostics(spoken);
      };

      this.recognition.onerror = (err: any) => {
        console.warn('Speech recognition status issue:', err);
        this.isListeningLocal = false;
        this.updateUIPublishing();
      };
    }
  }

  private calculateDiagnostics(spokenText: string): void {
    const state = store.getState();
    const active = state.playingAyah || { surahId: state.activeSurahId, ayahNumber: 1 };
    const list = AYAH_DATA[active.surahId] || [];
    const targetAyahObj = list.find((a) => a.ayahNumber === active.ayahNumber) || list[0];
    if (!targetAyahObj) return;

    // Normalize texts (Arabic speech preprocessing)
    const normalize = (txt: string) => {
      return txt
        .replace(/[\u064B-\u065F]/g, '') // Remove diacritics (harakat / tashkeel)
        .replace(/[إأآا]/g, 'ا')        // Normalize alef variants
        .replace(/ة/g, 'ه')            // Normalize taa marbuta
        .replace(/ى/g, 'ي')            // Normalize alef maksura
        .replace(/[^\u0621-\u064A\s]/g, '') // Keep letters and spaces only
        .replace(/\s+/g, ' ')
        .trim();
    };

    const cleanSpoken = normalize(spokenText);
    const cleanTarget = normalize(targetAyahObj.textClean);

    const spokenWords = cleanSpoken.split(' ').filter(Boolean);
    const targetWords = cleanTarget.split(' ').filter(Boolean);

    // Diagnostics Box mapping
    const reportBox = this.element.querySelector('#voice-diagnostic-report');
    if (reportBox) {
      reportBox.classList.remove('hidden');
      
      const wordsHighlight = targetWords.map((word, index) => {
        const matched = spokenWords.some((spkWord) => spkWord.includes(word) || word.includes(spkWord));
        if (matched) {
          return `<span class="bg-[var(--accent-light)] text-[var(--accent)] px-1 border-b-2 border-[var(--accent)] rounded-sm font-bold mx-0.5">${word}</span>`;
        } else {
          return `<span class="bg-red-500/10 text-red-600 dark:text-red-400 px-1 border-b-2 border-red-500 rounded-sm font-bold mx-0.5 animate-pulse">${word}</span>`;
        }
      }).join(' ');

      // Overall Score
      const correctCount = targetWords.filter((w) => spokenWords.some((s) => s.includes(w) || w.includes(s))).length;
      const score = Math.round((correctCount / targetWords.length) * 100);
      const isPerfect = score >= 80;

      reportBox.innerHTML = `
        <div class="p-4 rounded-xl border ${isPerfect ? 'bg-[var(--accent-light)] border-[var(--accent)]/30' : 'bg-amber-500/5 border-amber-500/20'} flex flex-col gap-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-[var(--text-main)] flex items-center gap-1">
              <i data-lucide="award" class="w-4 h-4 text-amber-500"></i>
              دقة تلاوتك وصحة الكلمات: <strong class="font-mono text-[var(--accent)] text-sm">${score}%</strong>
            </span>
            <span class="text-[10px] font-bold uppercase ${isPerfect ? 'text-[var(--accent)]' : 'text-amber-500'}">${isPerfect ? 'مقبول / ناجح' : 'يرجى الإعادة'}</span>
          </div>

          <!-- Highlight block -->
          <div class="text-right leading-loose text-md border-b border-[var(--border-color)]/30 pb-3 quran-text">
            ${wordsHighlight}
          </div>

          <div class="text-xs ${isPerfect ? 'text-[var(--accent)]' : 'text-amber-600 dark:text-amber-400'} font-bold">
            ${isPerfect ? getTranslation(state.language, 'correctRecitation') : getTranslation(state.language, 'errorRecitation')}
          </div>

          <div class="text-[10px] text-stone-500 text-right font-semibold">
            نطق مسموع: "${spokenText}"
          </div>
        </div>
      `;
      renderIcons(reportBox as HTMLElement);
    }
  }

  private updateUIPublishing(): void {
    const btn = this.element.querySelector('#voice-mic-main-btn');
    const pulseRing = this.element.querySelector('#mic-p-ring');
    const lang = store.getState().language;

    if (btn) {
      if (this.isListeningLocal) {
        btn.innerHTML = `<i data-lucide="mic-off" class="w-5 h-5 text-white"></i> ${getTranslation(lang, 'stopListening')}`;
        btn.classList.replace('bg-[var(--accent)]', 'bg-red-500');
        pulseRing?.classList.remove('hidden');
      } else {
        btn.innerHTML = `<i data-lucide="mic" class="w-5 h-5 text-white"></i> ${getTranslation(lang, 'startListening')}`;
        btn.classList.replace('bg-red-500', 'bg-[var(--accent)]');
        pulseRing?.classList.add('hidden');
      }
      renderIcons(btn as HTMLElement);
    }
  }

  private render(state: AppState): void {
    const lang = state.language;
    const isRtl = lang !== 'en';

    const activeAyah = state.playingAyah || { surahId: state.activeSurahId, ayahNumber: 1 };

    this.element.innerHTML = `
      <div class="flex items-center justify-between border-b border-[var(--border-color)]/60 pb-3 mb-2" dir="${isRtl ? 'rtl' : 'ltr'}">
        <h3 class="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
          <i data-lucide="mic" class="w-5 h-5 text-[var(--accent)]"></i>
          ${getTranslation(lang, 'voiceQuiz')}
        </h3>
        <span class="text-xs bg-[var(--accent-light)] text-[var(--accent)] px-2 py-0.5 rounded font-bold">الآية ${activeAyah.surahId}:${activeAyah.ayahNumber}</span>
      </div>

      <!-- Instructions or Not supported check -->
      ${this.recognition ? `
        <div class="flex flex-col gap-4 text-right" dir="${isRtl ? 'rtl' : 'ltr'}">
          <!-- Text hint info -->
          <div class="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-[var(--border-color)]/60 text-xs text-[var(--text-muted)] leading-relaxed">
            ${getTranslation(lang, 'voiceQuizInstructions')}
          </div>

          <!-- Pulsing mic visualization circle -->
          <div class="flex items-center justify-center p-3 relative h-20">
            <div id="mic-p-ring" class="hidden absolute w-14 h-14 bg-red-500/20 rounded-full mic-pulse"></div>
            <button id="voice-mic-main-btn" class="z-10 flex items-center gap-2 bg-[var(--accent)] text-white px-6 py-3 rounded-full font-bold text-xs shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all">
              <i data-lucide="mic" class="w-5 h-5"></i>
              ${getTranslation(lang, 'startListening')}
            </button>
          </div>

          <!-- Diagnostic Results report -->
          <div id="voice-diagnostic-report" class="hidden">
            <!-- Reports inject here -->
          </div>
        </div>
      ` : `
        <div class="p-8 text-center text-xs font-bold text-amber-600 bg-amber-500/5 border border-dashed border-amber-500/20 rounded-xl" dir="${isRtl ? 'rtl' : 'ltr'}">
          <i data-lucide="help-circle" class="w-6 h-6 text-amber-500 mx-auto mb-2 animate-bounce"></i>
          ${getTranslation(lang, 'notSupportedBrowser')}
        </div>
      `}
    `;

    renderIcons(this.element);
    this.addVoiceListeners();
  }

  private addVoiceListeners(): void {
    const btn = this.element.querySelector('#voice-mic-main-btn');
    btn?.addEventListener('click', () => {
      if (!this.recognition) return;

      if (this.isListeningLocal) {
        this.recognition.stop();
      } else {
        try {
          this.recognition.start();
        } catch (e) {
          console.warn('Speech engine already running, reset.');
        }
      }
    });
  }
}
