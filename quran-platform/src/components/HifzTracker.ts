/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { store } from '../store';
import { AYAH_DATA, SURAH_LIST } from '../data/quran_data';
import { getTranslation } from '../utils/i18n';
import { renderIcons } from '../utils/icons';
import { AppState } from '../types';

export class HifzTracker {
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
    const activePlans = state.hifzPlans;

    this.element.innerHTML = `
      <div class="flex items-center justify-between border-b border-[var(--border-color)]/60 pb-3">
        <h3 class="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
          <i data-lucide="award" class="w-5 h-5 text-[var(--accent)] animate-bounce"></i>
          ${getTranslation(lang, 'hifzTracker')}
        </h3>
        <span class="text-[10px] font-bold text-[var(--text-muted)] bg-[var(--accent-light)] text-[var(--accent)] px-2.5 py-0.5 rounded-full uppercase">Hifz Companion</span>
      </div>

      <!-- Part 1: Plan Creators -->
      <div class="bg-[var(--bg-app)]/50 p-4 rounded-xl border border-[var(--border-color)]/60 flex flex-col gap-3">
        <h4 class="text-xs font-bold text-[var(--text-main)] flex items-center gap-1.5">
          <i data-lucide="settings" class="w-4 h-4 text-[var(--accent)]"></i>
          ${getTranslation(lang, 'createPlan')}
        </h4>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <!-- Title input -->
          <div class="flex flex-col gap-1">
            <label class="text-[10px] font-bold text-[var(--text-muted)]">${getTranslation(lang, 'planTitleLabel')}</label>
            <input id="hifz-plan-title" type="text" placeholder="مثال: حفظ الفاتحة في أسبوع" class="text-xs bg-[var(--bg-card)] text-[var(--text-main)] p-2.5 rounded-lg border border-[var(--border-color)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]">
          </div>

          <!-- Surah Target option -->
          <div class="flex flex-col gap-1">
            <label class="text-[10px] font-bold text-[var(--text-muted)]">${getTranslation(lang, 'planSurahLabel')}</label>
            <select id="hifz-plan-surah" class="text-xs bg-[var(--bg-card)] text-[var(--text-main)] p-2.5 rounded-lg border border-[var(--border-color)] focus:outline-none">
              ${SURAH_LIST.map((s) => `
                <option value="${s.id}">${lang === 'en' ? s.nameEnglish : s.nameKurdish} (${s.nameArabic})</option>
              `).join('')}
            </select>
          </div>

          <!-- Days target -->
          <div class="flex flex-col gap-1 justify-end">
            <button id="hifz-submit-btn" class="btn-primary text-xs font-semibold py-2.5 rounded-lg shadow-xs cursor-pointer">
              ${getTranslation(lang, 'submitCreatePlan')}
            </button>
          </div>
        </div>
      </div>

      <!-- Part 2: Active Plans Progress Cards -->
      <div class="flex flex-col gap-3 mt-1">
        ${activePlans.length === 0 ? `
          <div class="p-6 text-center text-xs font-semibold text-[var(--text-muted)] border border-dashed border-[var(--border-color)] rounded-xl">
            لا توجد خطط حفظ نشطة حالياً. أنشئ خطتك الأولى للبدء في تدوين تقدمك المبارك.
          </div>
        ` : activePlans.map((plan) => {
          const sMeta = SURAH_LIST.find((s) => s.id === plan.surahId)!;
          const ayahs = AYAH_DATA[plan.surahId] || [];
          const totalVerses = sMeta.versesCount;
          const memorizedCount = plan.memorizedAyahs.length;
          const pct = totalVerses > 0 ? Math.round((memorizedCount / totalVerses) * 100) : 0;

          return `
            <div class="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-xs flex flex-col gap-3 transition-colors duration-300">
              <div class="flex items-center justify-between border-b border-[var(--border-color)]/20 pb-2">
                <div>
                  <h4 class="text-sm font-bold text-[var(--text-main)]">${plan.title}</h4>
                  <p class="text-[10px] text-[var(--text-muted)]">بدأت في: ${plan.startDate} • السورة: ${lang === 'en' ? sMeta.nameEnglish : sMeta.nameKurdish}</p>
                </div>
                <div class="flex items-center gap-1">
                  <button data-hifz-pdf="${plan.id}" class="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-[var(--text-main)] transition-colors cursor-pointer" title="${getTranslation(lang, 'exportPlanPdf')}">
                    <i data-lucide="file-text" class="w-4 h-4 text-emerald-600"></i>
                  </button>
                  <button data-hifz-delete="${plan.id}" class="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/15 text-red-500 transition-colors cursor-pointer" title="حذف الخطة">
                    <i data-lucide="trash" class="w-4 h-4"></i>
                  </button>
                </div>
              </div>

              <!-- Progress bar indicator -->
              <div class="flex items-center justify-between text-xs font-bold text-[var(--text-main)]">
                <span>${getTranslation(lang, 'progressLabel', { percent: pct })}</span>
                <span class="font-mono text-[var(--accent)]">${memorizedCount} / ${totalVerses} آية</span>
              </div>
              <div class="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden border border-[var(--border-color)]/45">
                <div class="h-full bg-[var(--accent)] transition-all duration-500" style="width: ${pct}%;"></div>
              </div>

              <!-- Verses Checklist (Tasmiah Tester blind tool) -->
              <div class="flex flex-col gap-2 mt-2">
                <span class="text-[10px] font-bold text-[var(--text-muted)] flex items-center gap-0.5">
                  <i data-lucide="info" class="w-4 h-4"></i>
                  ${getTranslation(lang, 'hifzProgressHeader')}
                </span>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[160px] overflow-y-auto p-1 bg-[var(--bg-app)]/30 rounded-lg">
                  ${ayahs.map((ayah) => {
                    const isMemorized = plan.memorizedAyahs.includes(ayah.ayahNumber);
                    return `
                      <div class="flex items-center justify-between p-2 rounded-lg border border-[var(--border-color)]/60 bg-[var(--bg-card)] transition-colors duration-200">
                        <div class="flex items-center gap-2">
                          <!-- Checkbox -->
                          <input type="checkbox" data-hifz-check-plan="${plan.id}" data-hifz-check-ayah="${ayah.ayahNumber}" class="w-4 h-4 accent-[var(--accent)] cursor-pointer rounded" ${isMemorized ? 'checked' : ''}>
                          
                          <!-- Verse Reference -->
                          <span class="font-mono text-[10px] font-bold text-[var(--text-muted)] bg-[var(--bg-app)] py-0.5 px-2 rounded">
                            ${ayah.ayahNumber}
                          </span>
                        </div>

                        <!-- Arabic Text displaying or hiding for memory test -->
                        <div class="flex-grow text-right px-3 select-none">
                          <p id="hifz-blind-text-${plan.id}-${ayah.ayahNumber}" class="quran-text text-sm font-bold text-stone-900 dark:text-stone-100 transition-all duration-300">
                            ${ayah.textUthmani}
                          </p>
                        </div>

                        <!-- Blind Tasmiah Toggle Eye Button -->
                        <button data-hifz-eye-plan="${plan.id}" data-hifz-eye-ayah="${ayah.ayahNumber}" class="p-1 text-[var(--text-muted)] hover:text-[var(--accent)] cursor-pointer" title="تسميع ذاتي (إخفاء/إظهار)">
                          <i id="hifz-eye-icon-${plan.id}-${ayah.ayahNumber}" data-lucide="eye" class="w-4 h-4"></i>
                        </button>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    renderIcons(this.element);
    this.addHifzListeners(state);
  }

  private addHifzListeners(state: AppState): void {
    const titleInput = this.element.querySelector('#hifz-plan-title') as HTMLInputElement;
    const surahSelect = this.element.querySelector('#hifz-plan-surah') as HTMLSelectElement;
    const submitBtn = this.element.querySelector('#hifz-submit-btn');

    // Create Hifz plan
    submitBtn?.addEventListener('click', () => {
      const title = titleInput.value.trim();
      const surahId = parseInt(surahSelect.value || '1');
      if (!title) {
        alert("برجاء إدخال اسم خطة الحفظ لتنظيم وإفراز تقدمك الفني.");
        return;
      }
      store.createHifzPlan(title, surahId, 30); // 30 days default target
      titleInput.value = '';
    });

    // Toggle checklists
    const checkBoxes = this.element.querySelectorAll('[data-hifz-check-plan]');
    checkBoxes.forEach((box) => {
      box.addEventListener('change', () => {
        const planId = box.getAttribute('data-hifz-check-plan') || '';
        const ayahNum = parseInt(box.getAttribute('data-hifz-check-ayah') || '1');
        store.toggleAyahMemorized(planId, ayahNum);
      });
    });

    // Delete Hifz plans
    const deleteBtns = this.element.querySelectorAll('[data-hifz-delete]');
    deleteBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        if (confirm("هل تريد حذف خطة الحفظ هذه بالكامل؟")) {
          const planId = btn.getAttribute('data-hifz-delete') || '';
          store.deleteHifzPlan(planId);
        }
      });
    });

    // Interactive Blind Eye helper toggles
    const eyeBtns = this.element.querySelectorAll('[data-hifz-eye-plan]');
    eyeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const planId = btn.getAttribute('data-hifz-eye-plan');
        const ayahNumber = btn.getAttribute('data-hifz-eye-ayah');
        
        const textBox = this.element.querySelector(`#hifz-blind-text-${planId}-${ayahNumber}`) as HTMLParagraphElement;
        const icon = this.element.querySelector(`#hifz-eye-icon-${planId}-${ayahNumber}`) as HTMLElement;
        
        if (textBox) {
          const isHidden = textBox.classList.contains('blur-sm') || textBox.classList.contains('opacity-0');
          if (isHidden) {
            textBox.classList.remove('blur-sm', 'opacity-0', 'select-none');
            icon.setAttribute('data-lucide', 'eye');
          } else {
            textBox.classList.add('blur-sm', 'opacity-0', 'select-none');
            icon.setAttribute('data-lucide', 'eye-off');
          }
          renderIcons(btn as HTMLElement);
        }
      });
    });

    // Printable report simulator trigger
    const pdfButtons = this.element.querySelectorAll('[data-hifz-pdf]');
    pdfButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const planId = btn.getAttribute('data-hifz-pdf') || '';
        const plan = state.hifzPlans.find((p) => p.id === planId);
        if (plan) {
          const sMeta = SURAH_LIST.find((s) => s.id === plan.surahId)!;
          const percent = sMeta.versesCount ? Math.round((plan.memorizedAyahs.length / sMeta.versesCount) * 100) : 0;
          
          const printWindow = window.open('', '_blank');
          if (printWindow) {
            printWindow.document.write(`
              <html>
                <head>
                  <title>تقرير خطة حفظ القرآن الكريم</title>
                  <style>
                    body { font-family: 'Arial', sans-serif; direction: rtl; padding: 40px; color: #2d3748; }
                    .header { text-align: center; border-bottom: 2px solid #2e624c; padding-bottom: 20px; }
                    .title { font-size: 24px; font-weight: bold; color: #2e624c; }
                    .meta { margin-top: 15px; font-size: 14px; }
                    .progress-bar { width: 100%; bg: #edf2f7; height: 20px; border-radius: 10px; overflow: hidden; margin: 20px 0; background: #e2e8f0; }
                    .progress-fill { height: 100%; background: #2e624c; width: ${percent}%; }
                    .stats { font-size: 16px; font-bold; }
                  </style>
                </head>
                <body onload="window.print()">
                  <div class="header">
                    <div class="title">${plan.title}</div>
                    <div class="meta">سورة المستهدفة: ${sMeta.nameArabic} (${sMeta.nameKurdish}) • تاريخ البدء: ${plan.startDate}</div>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill"></div>
                  </div>
                  <div class="stats">
                    الإنجاز الفعلي بنسبة: ${percent}% • مجموع الآيات المحفوظة: ${plan.memorizedAyahs.length} آية من أصل ${sMeta.versesCount} آية.
                  </div>
                </body>
              </html>
            `);
            printWindow.document.close();
          }
        }
      });
    });
  }
}
