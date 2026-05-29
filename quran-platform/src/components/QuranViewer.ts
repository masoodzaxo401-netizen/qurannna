/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { store } from '../store';
import { AYAH_DATA, SURAH_LIST } from '../data/quran_data';
import { getTranslation } from '../utils/i18n';
import { renderIcons } from '../utils/icons';
import { AppState, Ayah } from '../types';

export class QuranViewer {
  private element: HTMLElement;
  private currentSurahLocal: number = 1;

  constructor(containerId: string) {
    const parent = document.getElementById(containerId);
    if (!parent) throw new Error(`Container #${containerId} not found`);

    this.element = document.createElement('main');
    this.element.className = 'flex-grow min-h-[calc(100vh-80px)] p-4 lg:p-6 flex flex-col gap-6 max-w-4xl mx-auto';
    parent.appendChild(this.element);

    // Reset view offset if custom surah-changed event fires
    window.addEventListener('surah-changed', (e: any) => {
      this.currentSurahLocal = e.detail.surahId;
      this.scrollAndHighlightActive();
    });

    store.subscribe((state) => this.render(state));
  }

  private render(state: AppState): void {
    const surahId = state.activeSurahId;
    this.currentSurahLocal = surahId;
    const ayahs = AYAH_DATA[surahId] || [];
    const meta = SURAH_LIST.find((s) => s.id === surahId);
    const lang = state.language;
    const isRtl = lang !== 'en';

    if (!meta) {
      this.element.innerHTML = `<div class="p-8 text-center text-[var(--text-muted)]">Surah Metadata missing</div>`;
      return;
    }

    // Header of Current Surah
    const surahTitle = lang === 'en' ? meta.nameEnglish : meta.nameKurdish;
    const revelationText = getTranslation(lang, meta.revelationType === 'Meccan' ? 'revelationMeccan' : 'revelationMedinan');

    let template = `
      <!-- Surah Banner Header -->
      <div class="paper-page bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-color)] flex flex-col items-center gap-2 animate-fade-in transition-all relative overflow-hidden">
        <!-- Visual frame decoration -->
        <div class="absolute inset-2 border border-dotted border-[var(--border-color)]/50 pointer-events-none rounded-xl"></div>
        <div class="text-xs font-bold tracking-wider text-[var(--accent)] uppercase font-mono">${revelationText} • ${meta.versesCount} ${getTranslation(lang, 'versesCount', { count: meta.versesCount })}</div>
        <h2 class="text-2xl font-bold text-[var(--text-main)] font-sans tracking-tight">${surahTitle}</h2>
        <div class="font-quran text-4xl text-[var(--accent)] font-bold mt-1">${meta.nameArabic}</div>
        
        <!-- Bismillah (except for Surah At-Tawbah) -->
        ${surahId !== 9 ? `
          <div class="quran-text text-2xl text-[var(--text-main)] text-center tracking-normal mt-5 select-none font-semibold">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
        ` : ''}
      </div>

      <!-- Toggle View Mode Bar -->
      <div class="flex items-center justify-between bg-[var(--bg-card)] border border-[var(--border-color)] p-2 rounded-xl">
        <span class="text-xs font-bold text-[var(--text-muted)] uppercase pl-2 flex items-center gap-1.5 font-mono">
          <i data-lucide="layers" class="w-4 h-4"></i>
          ${getTranslation(lang, 'displayMode')}
        </span>
        <div class="flex items-center gap-1 bg-[var(--bg-app)] p-0.5 rounded-lg border border-[var(--border-color)]/40">
          <button id="view-mode-verse" class="px-3 py-1 rounded text-xs font-semibold cursor-pointer ${state.displayMode === 'verse' ? 'bg-[var(--accent)] text-white shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
            ${getTranslation(lang, 'displayModeVerse')}
          </button>
          <button id="view-mode-page" class="px-3 py-1 rounded text-xs font-semibold cursor-pointer ${state.displayMode === 'page' ? 'bg-[var(--accent)] text-white shadow-xs' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
            ${getTranslation(lang, 'displayModePage')}
          </button>
        </div>
      </div>
    `;

    if (state.displayMode === 'verse') {
      // Verse-by-Verse Layout
      template += `
        <div class="flex flex-col gap-4">
          ${ayahs.map((ayah) => {
            const isPlaying = state.playingAyah?.surahId === surahId && state.playingAyah?.ayahNumber === ayah.ayahNumber;
            const bookmarked = store.isBookmarked(surahId, ayah.ayahNumber);
            const savedReflection = store.getReflection(surahId, ayah.ayahNumber);

            return `
              <div id="ayah-${ayah.ayahNumber}" class="paper-page bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border-color)] transition-all duration-300 transform ${isPlaying ? 'active-ayah-highlight shadow-md ring-1 ring-[var(--accent)]/20' : 'hover:shadow-xs'} flex flex-col gap-4">
                <!-- Verse Header info -->
                <div class="flex items-center justify-between border-b border-[var(--border-color)]/40 pb-2.5">
                  <div class="flex items-center gap-2">
                    <button data-play="${ayah.ayahNumber}" class="w-8 h-8 rounded-lg ${isPlaying ? 'bg-amber-600/10 text-amber-600 hover:bg-amber-600/15' : 'bg-[var(--accent-light)] text-[var(--accent)] hover:bg-stone-100'} flex items-center justify-center cursor-pointer transition-colors" title="Play Tafsir/Audio">
                      <i data-lucide="${isPlaying && state.isPlaying ? 'pause' : 'play'}" class="w-4 h-4"></i>
                    </button>
                    <span class="font-mono text-xs font-bold text-[var(--text-muted)] bg-[var(--bg-app)] px-2.5 py-1 rounded-lg border border-[var(--border-color)]">
                      ${meta.id}:${ayah.ayahNumber}
                    </span>
                  </div>

                  <!-- Quick Action Buttons -->
                  <div class="flex items-center gap-1.5">
                    <button data-bookmark="${ayah.ayahNumber}" class="p-1.5 rounded-lg border ${bookmarked ? 'bg-amber-500/10 border-amber-500/40 text-amber-600' : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-main)]'} cursor-pointer" title="Bookmark">
                      <i data-lucide="bookmark" class="w-4.5 h-4.5"></i>
                    </button>
                    <button data-reflection-toggle="${ayah.ayahNumber}" class="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer" title="Reflections Notebook">
                      <i data-lucide="file-text" class="w-4.5 h-4.5"></i>
                    </button>
                    <button data-copy="${ayah.ayahNumber}" class="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer" title="Copy Text">
                      <i data-lucide="activity" class="w-4.5 h-4.5"></i>
                    </button>
                  </div>
                </div>

                <!-- Arabic Text (Traditional calligraphy) -->
                <div class="text-right leading-relaxed select-all" style="font-size: ${state.fontSize}%;">
                  <p class="quran-text text-right text-stone-900 dark:text-stone-100 font-bold leading-[2.2] tracking-normal">
                    ${ayah.textUthmani}
                    <span class="inline-flex items-center justify-center font-mono font-bold text-xs bg-[var(--accent-light)] text-[var(--accent)] w-6 h-6 rounded-full align-middle mr-2 mt-[-2px] border border-[var(--accent)]/20 select-none">
                      ${ayah.ayahNumber}
                    </span>
                  </p>
                </div>

                <!-- Compare Translations Grid -->
                <div class="grid grid-cols-1 gap-3.5 mt-2 bg-[var(--bg-app)]/40 p-4 rounded-xl border border-[var(--border-color)]/50">
                  <!-- Kurdi Sorani (Hajar) -->
                  <div>
                    <h5 class="text-[10px] font-bold text-[var(--accent)] tracking-wide uppercase mb-1 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                      ${getTranslation(lang, 'hajarSorani')}
                    </h5>
                    <p class="text-sm font-semibold text-[var(--text-main)] leading-relaxed text-right">${ayah.translations['ku-ckb']}</p>
                  </div>

                  <!-- Kurdi Badini -->
                  <div class="border-t border-[var(--border-color)]/20 pt-3">
                    <h5 class="text-[10px] font-bold text-orange-600 tracking-wide uppercase mb-1 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                      ${getTranslation(lang, 'badiniTrans')}
                    </h5>
                    <p class="text-sm font-semibold text-[var(--text-main)] leading-relaxed text-right">${ayah.translations['ku-kmr']}</p>
                  </div>

                  <!-- Sahih English -->
                  <div class="border-t border-[var(--border-color)]/20 pt-3">
                    <h5 class="text-[10px] font-bold text-blue-600 tracking-wide uppercase mb-1 flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      ${getTranslation(lang, 'englishTrans')}
                    </h5>
                    <p class="text-sm font-medium text-[var(--text-main)] leading-relaxed text-left" dir="ltr">${ayah.translations.en}</p>
                  </div>
                </div>

                <!-- Inline Tafsir Drawer -->
                <div class="border-t border-[var(--border-color)]/30 pt-3">
                  <button data-tafsir-toggle="${ayah.ayahNumber}" class="flex items-center gap-1 text-xs font-bold text-[var(--accent)] hover:underline cursor-pointer">
                    <i data-lucide="book-open" class="w-4 h-4"></i>
                    ${getTranslation(lang, 'tafsirLabel')}
                  </button>
                  
                  <div id="tafsir-box-${ayah.ayahNumber}" class="hidden mt-2 bg-stone-50 dark:bg-stone-900 p-4 rounded-xl border border-[var(--border-color)]/80 text-xs leading-relaxed text-[var(--text-muted)] text-right">
                    <p class="font-bold text-[var(--text-main)] mb-1">المفسر الميسر:</p>
                    <p class="mb-3 font-medium text-stone-700 dark:text-stone-300">${ayah.tafsir.ar}</p>
                    <p class="font-bold text-[var(--accent)] mt-2 mb-1">کوردی (سۆرانی):</p>
                    <p class="font-medium text-stone-700 dark:text-stone-300">${ayah.tafsir['ku-ckb']}</p>
                  </div>
                </div>

                <!-- Personal Reflection notebook drawer -->
                <div id="reflection-box-${ayah.ayahNumber}" class="${savedReflection ? '' : 'hidden'} border-t border-[var(--border-color)]/20 pt-3 flex flex-col gap-2">
                  <span class="text-xs font-bold text-[var(--text-main)] flex items-center gap-1">
                    <i data-lucide="file-text" class="w-4 h-4 text-amber-500"></i>
                    دفتر التدبر والملاحظات (Notebook)
                  </span>
                  <textarea data-reflection-input="${ayah.ayahNumber}" placeholder="${getTranslation(lang, 'addReflection')}" class="w-full text-xs font-sans p-3 border border-[var(--border-color)] rounded-xl bg-stone-50/50 dark:bg-stone-900/50 text-[var(--text-main)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)] h-16 resize-none">${savedReflection}</textarea>
                  <button data-reflection-save="${ayah.ayahNumber}" class="btn-primary self-end text-xs font-semibold px-4 py-1.5 rounded-lg shadow-xs cursor-pointer">
                    ${getTranslation(lang, 'saveReflection')}
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else {
      // Full Medina page mock visualization layout (15-line simulator)
      template += `
        <div class="paper-page bg-[#faf0da] border-4 border-amber-900/5 dark:bg-[#1f1e1b] rounded-2xl p-6 lg:p-8 flex flex-col items-center gap-6 relative shadow-lg">
          <!-- Page margin indicators -->
          <div class="absolute inset-[3px] border border-stone-800/10 pointer-events-none rounded-xl"></div>
          <div class="absolute top-2 text-[10px] font-mono font-bold text-stone-600 dark:text-stone-400">الجزء ${ayahs[0]?.juz || 1} • الحزب ${ayahs[0]?.hizb || 1}</div>
          
          <!-- Calligraphy block -->
          <div class="quran-text text-slate-900 dark:text-amber-50/80 leading-[2.5] tracking-wide text-right text-justify overflow-hidden font-bold select-all mt-4" style="font-size: ${state.fontSize + 20}%;">
            ${ayahs.map((ayah) => {
              const isPlaying = state.playingAyah?.surahId === surahId && state.playingAyah?.ayahNumber === ayah.ayahNumber;
              return `
                <span id="page-ayah-${ayah.ayahNumber}" class="quran-text transition-colors duration-200 py-1 rounded cursor-pointer ${isPlaying ? 'bg-amber-400/30 dark:bg-amber-400/25 border-b-2 border-amber-600' : 'hover:bg-amber-400/10'}" data-play-page="${ayah.ayahNumber}">
                  ${ayah.textUthmani}
                  <span class="inline-flex items-center justify-center font-mono font-bold text-xs bg-amber-900/10 text-amber-900 dark:text-amber-100 dark:bg-stone-800 w-5 h-5 rounded-full mx-1 align-middle border border-stone-800/10 select-none">
                    ${ayah.ayahNumber}
                  </span>
                </span>
              `;
            }).join(' ')}
          </div>

          <!-- Page Footer Indicator -->
          <div class="border-t border-stone-800/10 w-full pt-4 mt-4 flex items-center justify-center text-xs font-mono font-bold text-stone-600 dark:text-stone-400 gap-2">
            <span class="bg-amber-900/5 px-3 py-1 rounded-full text-[10px]">صفحة ${ayahs[0]?.page || 1}</span>
          </div>
        </div>

        <!-- Float Translation Panel beneath Book view -->
        <div class="paper-page bg-[var(--bg-card)] rounded-xl p-4 border border-[var(--border-color)]">
          <span class="text-xs font-bold text-[var(--accent)] tracking-wide uppercase mb-2 block flex items-center gap-1">
            <i data-lucide="info" class="w-4 h-4"></i>
            ترجمة الصفحة الحالية (التلاوة النشطة)
          </span>
          <div id="page-active-translation-box" class="text-xs font-semibold leading-relaxed text-[var(--text-main)] text-right">
            انقر على أي آية أعلاه لتشغيلها والاستماع للقارئ، وقراءة معاني الكلمات والتفاسير هنا فورياً.
          </div>
        </div>
      `;
    }

    this.element.innerHTML = template;
    renderIcons(this.element);
    this.addEventListeners(state);
    this.scrollAndHighlightActive();
  }

  private scrollAndHighlightActive(): void {
    const playStatus = store.getState().playingAyah;
    if (playStatus && playStatus.surahId === this.currentSurahLocal) {
      if (store.getState().displayMode === 'verse') {
        const id = `ayah-${playStatus.ayahNumber}`;
        const match = document.getElementById(id);
        if (match && store.getState().isAutoScroll) {
          match.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        const pageId = `page-ayah-${playStatus.ayahNumber}`;
        const matchPage = document.getElementById(pageId);
        if (matchPage) {
          this.updatePageTranslationPanel(playStatus.surahId, playStatus.ayahNumber);
        }
      }
    }
  }

  private updatePageTranslationPanel(surahId: number, ayahNumber: number): void {
    const box = document.getElementById('page-active-translation-box');
    if (!box) return;

    const list = AYAH_DATA[surahId] || [];
    const item = list.find((a) => a.ayahNumber === ayahNumber);
    if (!item) return;

    box.innerHTML = `
      <div class="flex flex-col gap-2 border-b border-[var(--border-color)] pb-3 mb-3">
        <span class="text-[10px] font-bold text-amber-600 font-mono">الآية ${surahId}:${ayahNumber} • ترجمة سورانية</span>
        <p class="text-sm font-bold text-stone-900 dark:text-stone-100">${item.translations['ku-ckb']}</p>
      </div>
      <div class="flex flex-col gap-2 border-b border-[var(--border-color)] pb-3 mb-3">
        <span class="text-[10px] font-bold text-orange-600 font-mono">ترجمة بادينية</span>
        <p class="text-sm font-bold text-stone-900 dark:text-stone-100">${item.translations['ku-kmr']}</p>
      </div>
      <div class="flex flex-col gap-2 pb-1">
        <span class="text-[10px] font-bold text-blue-600 font-mono">English Sahih</span>
        <p class="text-sm font-medium text-stone-900 dark:text-stone-100 text-left" dir="ltr">${item.translations.en}</p>
      </div>
    `;
  }

  private addEventListeners(state: AppState): void {
    const lang = state.language;

    // View Mode Verse
    const verseBtn = this.element.querySelector('#view-mode-verse');
    verseBtn?.addEventListener('click', () => {
      store.setDisplayMode('verse');
    });

    // View Mode Page
    const pageBtn = this.element.querySelector('#view-mode-page');
    pageBtn?.addEventListener('click', () => {
      store.setDisplayMode('page');
    });

    // In Page Mode: clicking a word/ayah
    const pageAyaElements = this.element.querySelectorAll('[data-play-page]');
    pageAyaElements.forEach((el) => {
      el.addEventListener('click', () => {
        const id = parseInt(el.getAttribute('data-play-page') || '1');
        store.setPlayingAyah({ surahId: state.activeSurahId, ayahNumber: id });
        store.setIsPlaying(true);
        this.updatePageTranslationPanel(state.activeSurahId, id);
      });
    });

    // Play/Pause individual verse button
    const playButtons = this.element.querySelectorAll('[data-play]');
    playButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-play') || '1');
        const isActive = state.playingAyah?.surahId === state.activeSurahId && state.playingAyah?.ayahNumber === id;
        
        if (isActive) {
          store.setIsPlaying(!state.isPlaying);
        } else {
          store.setPlayingAyah({ surahId: state.activeSurahId, ayahNumber: id });
          store.setIsPlaying(true);
        }
      });
    });

    // Bookmarks Event
    const bkmrkButtons = this.element.querySelectorAll('[data-bookmark]');
    bkmrkButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-bookmark') || '1');
        store.toggleBookmark(state.activeSurahId, id);
        
        // Show lightweight floating toast confirmation standard UI
        const isAdded = store.isBookmarked(state.activeSurahId, id);
        const msg = isAdded 
          ? getTranslation(lang, 'addBookmarkSuccess')
          : getTranslation(lang, 'removeBookmarkSuccess');
        
        this.showToast(msg);
      });
    });

    // Copy Event
    const copyButtons = this.element.querySelectorAll('[data-copy]');
    copyButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-copy') || '1');
        const list = AYAH_DATA[state.activeSurahId] || [];
        const item = list.find((a) => a.ayahNumber === id);
        if (item) {
          const rawText = `"${item.textUthmani}" [سورة ${SURAH_LIST.find(s=>s.id === state.activeSurahId)?.nameArabic} : آية ${id}] \nتەرجەمەی سورانی: ${item.translations['ku-ckb']} \nEnglish: ${item.translations.en}`;
          navigator.clipboard.writeText(rawText);
          this.showToast("تم نسخ الآية وتراجمها للحافظة!");
        }
      });
    });

    // Tafsir Drawer Slide interaction
    const tafsirs = this.element.querySelectorAll('[data-tafsir-toggle]');
    tafsirs.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-tafsir-toggle');
        const box = this.element.querySelector(`#tafsir-box-${id}`);
        if (box) {
          box.classList.toggle('hidden');
        }
      });
    });

    // Reflection Drawer Slide interaction
    const reflectToggles = this.element.querySelectorAll('[data-reflection-toggle]');
    reflectToggles.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-reflection-toggle');
        const box = this.element.querySelector(`#reflection-box-${id}`);
        if (box) {
          box.classList.toggle('hidden');
        }
      });
    });

    // Save Reflection Notes
    const saveRefBtns = this.element.querySelectorAll('[data-reflection-save]');
    saveRefBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-reflection-save');
        const numId = parseInt(id || '1');
        const input = this.element.querySelector(`[data-reflection-input="${id}"]`) as HTMLTextAreaElement;
        if (input) {
          store.addOrUpdateReflection(state.activeSurahId, numId, input.value);
          this.showToast("تم حفظ ملاحظتك وتدبرك السحابي!");
        }
      });
    });
  }

  private showToast(message: string): void {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs font-bold font-sans px-5 py-3 rounded-xl shadow-lg z-50 flex items-center justify-center border border-stone-800 animate-fade-in pointer-events-none';
    toast.innerHTML = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('opacity-0');
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }
}
