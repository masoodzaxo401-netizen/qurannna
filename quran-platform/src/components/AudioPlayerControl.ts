/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { store } from '../store';
import { AYAH_DATA, RECITERS, SURAH_LIST } from '../data/quran_data';
import { getTranslation } from '../utils/i18n';
import { renderIcons } from '../utils/icons';
import { AppState } from '../types';

export class AudioPlayerControl {
  private element: HTMLElement;
  private audioEl: HTMLAudioElement;
  private currentDelayTimeout: any = null;

  constructor(containerId: string) {
    const parent = document.getElementById(containerId);
    if (!parent) throw new Error(`Container #${containerId} not found`);

    this.element = document.createElement('div');
    this.element.className = 'w-full fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-card)] border-t border-[var(--border-color)] py-3 px-4 shadow-2xl transition-colors duration-300';
    parent.appendChild(this.element);

    // Singleton audio setup
    this.audioEl = new Audio();
    this.setupAudioListeners();

    store.subscribe((state) => this.render(state));
  }

  private setupAudioListeners(): void {
    // When playback finishes, auto advance or loop
    this.audioEl.addEventListener('ended', () => {
      this.handlePlaybackFinished();
    });

    // Error handling
    this.audioEl.addEventListener('error', (e) => {
      console.warn('Audio streaming encountered interruption:', e);
      store.setIsPlaying(false);
    });
  }

  private handlePlaybackFinished(): void {
    const state = store.getState();
    if (!state.playingAyah) return;

    const surahId = state.playingAyah.surahId;
    const currentNum = state.playingAyah.ayahNumber;
    const ayahs = AYAH_DATA[surahId] || [];
    const maxVerses = ayahs.length;

    // Check repeats
    const currentRepeat = state.repeatTimes;
    // Local memory loop or simple trigger
    if (currentRepeat > 1) {
      store.setAudioControls(currentRepeat - 1, state.intervalSilence);
      this.playAyahUrl(surahId, currentNum);
      return;
    }

    // Reset loop count if they selected multiple
    store.setAudioControls(1, state.intervalSilence);

    // Next Ayah
    if (currentNum < maxVerses) {
      const nextNum = currentNum + 1;
      
      // Delay silence gap mechanism
      if (state.intervalSilence > 0) {
        store.setIsPlaying(false);
        if (this.currentDelayTimeout) clearTimeout(this.currentDelayTimeout);
        
        this.currentDelayTimeout = setTimeout(() => {
          store.setPlayingAyah({ surahId, ayahNumber: nextNum });
          store.setIsPlaying(true);
        }, state.intervalSilence * 1000);
      } else {
        store.setPlayingAyah({ surahId, ayahNumber: nextNum });
        this.playAyahUrl(surahId, nextNum);
      }
    } else {
      // Finished entire Surah
      store.setIsPlaying(false);
      store.setPlayingAyah(null);
    }
  }

  private playAyahUrl(surahId: number, ayahNumber: number): void {
    const state = store.getState();
    const reciter = RECITERS.find((r) => r.id === state.activeReciterId) || RECITERS[0];
    
    // Construct standard aligned mp3 file path
    // example: surah 1, ayah 1 -> 001001.mp3
    const paddedSurah = String(surahId).padStart(3, '0');
    const paddedAyah = String(ayahNumber).padStart(3, '0');
    const fullUrl = `${reciter.audioBaseUrl}${paddedSurah}${paddedAyah}.mp3`;

    if (this.audioEl.src !== fullUrl) {
      this.audioEl.src = fullUrl;
    }

    // Set play rates
    const speedSelect = this.element.querySelector('#audio-speed-range') as HTMLInputElement;
    if (speedSelect) {
      this.audioEl.defaultPlaybackRate = parseFloat(speedSelect.value);
      this.audioEl.playbackRate = parseFloat(speedSelect.value);
    }

    if (state.isPlaying) {
      this.audioEl.play().catch(() => {
        // Handle generic browser autoplay blocks gracefully
        store.setIsPlaying(false);
      });
      this.updateMediaSession(surahId, ayahNumber, reciter.nameAr);
    } else {
      this.audioEl.pause();
    }
  }

  private updateMediaSession(surahId: number, ayahNumber: number, reciterName: string): void {
    if ('mediaSession' in navigator) {
      const surahMeta = SURAH_LIST.find(s => s.id === surahId);
      navigator.mediaSession.metadata = new MediaMetadata({
        title: `الآية ${ayahNumber} - سورة ${surahMeta?.nameArabic || ''}`,
        artist: reciterName,
        album: 'المنصة القرآنية العالمية',
        artwork: [
          { src: 'https://everyayah.com/data/images/quran.jpg', sizes: '256x256', type: 'image/jpeg' }
        ]
      });

      navigator.mediaSession.setActionHandler('play', () => {
        store.setIsPlaying(true);
        this.audioEl.play();
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        store.setIsPlaying(false);
        this.audioEl.pause();
      });
    }
  }

  private render(state: AppState): void {
    const isRtl = state.language !== 'en';
    const lang = state.language;

    // Is there anything playing
    const hasActive = state.playingAyah !== null;
    const playStatus = state.isPlaying;

    if (!hasActive) {
      // Minimal empty player layout
      this.element.innerHTML = `
        <div class="max-w-7xl mx-auto flex items-center justify-between text-[var(--text-muted)] text-xs font-medium uppercase tracking-wider font-mono px-4 py-2">
          <span>${getTranslation(lang, 'audioControls')}</span>
          <span>اختر آية للبدء في الاستماع والتلاوة التفاعلية</span>
        </div>
      `;
      this.audioEl.pause();
      return;
    }

    // Synchronize active source if store was updated
    const activeAyah = state.playingAyah!;
    const surahMeta = SURAH_LIST.find((s) => s.id === activeAyah.surahId);
    
    // Play or pause source
    if (playStatus) {
      this.playAyahUrl(activeAyah.surahId, activeAyah.ayahNumber);
    } else {
      this.audioEl.pause();
    }

    this.element.innerHTML = `
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-4 ${isRtl ? 'text-right' : 'text-left'}" dir="${isRtl ? 'rtl' : 'ltr'}">
        <!-- 1. Metadata Info & Reciter select -->
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] animate-pulse">
            <i data-lucide="music" class="w-5 h-5"></i>
          </div>
          <div>
            <h4 class="text-xs font-bold text-[var(--text-main)]">
              ${getTranslation(lang, 'playing')}: سورة ${surahMeta?.nameArabic} (آية ${activeAyah.ayahNumber})
            </h4>
            <select id="player-reciter-select" class="bg-transparent text-[var(--text-muted)] hover:text-[var(--text-main)] border-none text-[11px] font-semibold cursor-pointer py-0.5 focus:outline-none">
              ${RECITERS.map((r) => `
                <option value="${r.id}" class="bg-[var(--bg-card)]" ${state.activeReciterId === r.id ? 'selected' : ''}>
                  ${lang === 'ar' ? r.nameAr : r.nameEn}
                </option>
              `).join('')}
            </select>
          </div>
        </div>

        <!-- 2. Central Player Controls -->
        <div class="flex flex-col items-center gap-1">
          <div class="flex items-center gap-4">
            <button id="player-prev-btn" class="text-[var(--text-muted)] hover:text-[var(--text-main)] w-7 h-7 flex items-center justify-center cursor-pointer">
              <i data-lucide="chevron-left" class="w-5 h-5"></i>
            </button>
            <button id="player-play-btn" class="w-11 h-11 rounded-full bg-[var(--accent)] text-white flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform">
              <i data-lucide="${playStatus ? 'pause' : 'play'}" class="w-5 h-5"></i>
            </button>
            <button id="player-next-btn" class="text-[var(--text-muted)] hover:text-[var(--text-main)] w-7 h-7 flex items-center justify-center cursor-pointer">
              <i data-lucide="chevron-right" class="w-5 h-5"></i>
            </button>
          </div>
        </div>

        <!-- 3. Advanced sliders (Speed, repeats, interval silence) -->
        <div class="flex items-center justify-end gap-4 flex-wrap text-xs font-semibold text-[var(--text-muted)]">
          <!-- Repeat count dropdown -->
          <div class="flex items-center gap-1.5">
            <span class="text-[10px] font-mono leading-none">${getTranslation(lang, 'repeatCount', { count: state.repeatTimes })}</span>
            <select id="player-repeats" class="bg-[var(--bg-app)] text-[var(--text-main)] rounded border border-[var(--border-color)] py-1 px-1.5 focus:outline-none text-[10px]">
              <option value="1" ${state.repeatTimes === 1 ? 'selected' : ''}>1x</option>
              <option value="3" ${state.repeatTimes === 3 ? 'selected' : ''}>3x</option>
              <option value="5" ${state.repeatTimes === 5 ? 'selected' : ''}>5x</option>
              <option value="10" ${state.repeatTimes === 10 ? 'selected' : ''}>10x</option>
            </select>
          </div>

          <!-- Interval Gap dropdown -->
          <div class="flex items-center gap-1.5">
            <span class="text-[10px] font-mono leading-none">${getTranslation(lang, 'silenceInterval', { count: state.intervalSilence })}</span>
            <select id="player-silence" class="bg-[var(--bg-app)] text-[var(--text-main)] rounded border border-[var(--border-color)] py-1 px-1.5 focus:outline-none text-[10px]">
              <option value="0" ${state.intervalSilence === 0 ? 'selected' : ''}>0s</option>
              <option value="2" ${state.intervalSilence === 2 ? 'selected' : ''}>2s</option>
              <option value="4" ${state.intervalSilence === 4 ? 'selected' : ''}>4s</option>
              <option value="8" ${state.intervalSilence === 8 ? 'selected' : ''}>8s</option>
            </select>
          </div>

          <!-- Speed Slider -->
          <div class="flex items-center gap-1">
            <i data-lucide="activity" class="w-4 h-4 text-[var(--text-muted)]"></i>
            <span class="text-[10px] font-mono leading-none">Speed</span>
            <input id="audio-speed-range" type="range" min="0.5" max="2.0" step="0.25" value="${this.audioEl.playbackRate || 1.0}" class="w-14 accent-[var(--accent)] cursor-pointer h-1 rounded bg-[var(--border-color)] appearance-none">
          </div>
        </div>
      </div>
    `;

    renderIcons(this.element);
    this.addControlListeners(state);
  }

  private addControlListeners(state: AppState): void {
    // Play/Pause Trigger
    const playBtn = this.element.querySelector('#player-play-btn');
    playBtn?.addEventListener('click', () => {
      store.setIsPlaying(!state.isPlaying);
    });

    // Advance Next
    const nextBtn = this.element.querySelector('#player-next-btn');
    nextBtn?.addEventListener('click', () => {
      const current = state.playingAyah!;
      const ayahs = AYAH_DATA[current.surahId] || [];
      if (current.ayahNumber < ayahs.length) {
        store.setPlayingAyah({ surahId: current.surahId, ayahNumber: current.ayahNumber + 1 });
      }
    });

    // Advance Prev
    const prevBtn = this.element.querySelector('#player-prev-btn');
    prevBtn?.addEventListener('click', () => {
      const current = state.playingAyah!;
      if (current.ayahNumber > 1) {
        store.setPlayingAyah({ surahId: current.surahId, ayahNumber: current.ayahNumber - 1 });
      }
    });

    // Reciter change
    const reciterSelect = this.element.querySelector('#player-reciter-select') as HTMLSelectElement;
    reciterSelect?.addEventListener('change', () => {
      store.setActiveReciter(reciterSelect.value);
      // reload audio
      if (state.playingAyah) {
        this.playAyahUrl(state.playingAyah.surahId, state.playingAyah.ayahNumber);
      }
    });

    // Repeats change
    const repeatsSelect = this.element.querySelector('#player-repeats') as HTMLSelectElement;
    repeatsSelect?.addEventListener('change', () => {
      store.setAudioControls(parseInt(repeatsSelect.value), state.intervalSilence);
    });

    // Silence Interval change
    const silenceSelect = this.element.querySelector('#player-silence') as HTMLSelectElement;
    silenceSelect?.addEventListener('change', () => {
      store.setAudioControls(state.repeatTimes, parseInt(silenceSelect.value));
    });

    // Speed Slider change
    const speedRange = this.element.querySelector('#audio-speed-range') as HTMLInputElement;
    speedRange?.addEventListener('input', () => {
      const speed = parseFloat(speedRange.value);
      this.audioEl.playbackRate = speed;
      this.audioEl.defaultPlaybackRate = speed;
    });
  }
}
