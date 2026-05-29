/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { store } from '../store';
import { getTranslation } from '../utils/i18n';
import { renderIcons } from '../utils/icons';
import { AppState } from '../types';

export class Header {
  private element: HTMLElement;

  constructor(containerId: string) {
    const parent = document.getElementById(containerId);
    if (!parent) throw new Error(`Container #${containerId} not found`);

    this.element = document.createElement('header');
    this.element.className = 'w-full sticky top-0 z-40 bg-[var(--bg-card)] border-b border-[var(--border-color)] transition-colors duration-300 shadow-sm';
    parent.appendChild(this.element);

    // Subscribe to state changes to update the UI elegantly
    store.subscribe((state) => this.render(state));
  }

  private render(state: AppState): void {
    const isRtl = state.language !== 'en';
    const dirAttr = isRtl ? 'rtl' : 'ltr';

    this.element.dir = dirAttr;
    this.element.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <!-- Logo & Title -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-[var(--accent-light)] flex items-center justify-center text-[var(--accent)] border border-[var(--border-color)]">
            <i data-lucide="book-open" class="w-6 h-6"></i>
          </div>
          <div>
            <h1 class="text-xl font-bold tracking-tight text-[var(--text-main)] transition-colors duration-300">
              ${getTranslation(state.language, 'appName')}
            </h1>
            <p class="text-xs text-[var(--text-muted)] transition-colors duration-300">
              ${getTranslation(state.language, 'appSubName')}
            </p>
          </div>
        </div>

        <!-- Controls (Languages, Themes, Settings) -->
        <div class="flex items-center gap-3 flex-wrap">
          <!-- Language Dropdown -->
          <div class="relative group">
            <select id="lang-selector" class="appearance-none bg-[var(--bg-app)] text-[var(--text-main)] py-1.5 pl-3 pr-8 rounded-lg border border-[var(--border-color)] text-sm font-medium cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--accent)] transition-colors">
              <option value="ar" ${state.language === 'ar' ? 'selected' : ''}>العربية</option>
              <option value="en" ${state.language === 'en' ? 'selected' : ''}>English</option>
              <option value="ku-ckb" ${state.language === 'ku-ckb' ? 'selected' : ''}>Kurdî (Sorani)</option>
              <option value="ku-kmr" ${state.language === 'ku-kmr' ? 'selected' : ''}>Kurdî (Badîni)</option>
            </select>
            <div class="absolute inset-y-0 ${isRtl ? 'left-2' : 'right-2'} pointer-events-none flex items-center justify-center text-[var(--text-muted)]">
              <i data-lucide="settings" class="w-4 h-4"></i>
            </div>
          </div>

          <!-- Theme Toggles -->
          <button id="theme-btn-light" title="${getTranslation(state.language, 'themeLight')}" class="p-2 rounded-lg border text-sm transition-all duration-200 ${state.theme === 'light' ? 'bg-[var(--accent-light)] border-[var(--accent)] text-[var(--accent)]' : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
            <i data-lucide="sun" class="w-4.5 h-4.5"></i>
          </button>
          <button id="theme-btn-sepia" title="${getTranslation(state.language, 'themeSepia')}" class="p-2 rounded-lg border text-sm transition-all duration-200 ${state.theme === 'sepia' ? 'bg-[var(--accent-light)] border-[var(--accent)] text-[var(--accent)]' : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
            <span class="font-bold text-xs">Sepia</span>
          </button>
          <button id="theme-btn-dark" title="${getTranslation(state.language, 'themeDark')}" class="p-2 rounded-lg border text-sm transition-all duration-200 ${state.theme === 'dark' ? 'bg-[var(--accent-light)] border-[var(--accent)] text-[var(--accent)]' : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)]'}">
            <i data-lucide="moon" class="w-4.5 h-4.5"></i>
          </button>

          <!-- Accessibility Control Dropdown or Toggle Button -->
          <button id="access-modal-trigger" class="flex items-center gap-1.5 p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all">
            <i data-lucide="sliders" class="w-4.5 h-4.5"></i>
          </button>
        </div>
      </div>

      <!-- Live Accessibility Modal/Block Inline -->
      <div id="access-panel" class="hidden border-t border-[var(--border-color)] bg-[var(--bg-app)]/50 py-3 transition-all duration-300">
        <div class="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <!-- Heading -->
          <div>
            <span class="text-sm font-semibold text-[var(--text-main)] flex items-center gap-1.5">
              <i data-lucide="settings" class="w-4 h-4 text-[var(--accent)]"></i>
              ${getTranslation(state.language, 'accessibilityTitle')}
            </span>
          </div>

          <!-- Font Scaling -->
          <div class="flex items-center gap-3">
            <span class="text-xs text-[var(--text-muted)] font-medium">${getTranslation(state.language, 'fontSize')}</span>
            <button id="font-dec-btn" class="w-8 h-8 rounded-lg border border-[var(--border-color)] text-[var(--text-main)] font-semibold hover:bg-[var(--border-color)] transition-colors">-</button>
            <span class="text-xs font-bold font-mono text-[var(--text-main)]">${state.fontSize}%</span>
            <button id="font-inc-btn" class="w-8 h-8 rounded-lg border border-[var(--border-color)] text-[var(--text-main)] font-semibold hover:bg-[var(--border-color)] transition-colors">+</button>
          </div>

          <!-- Dyslexia Toggle -->
          <div class="flex items-center gap-2">
            <input type="checkbox" id="dyslexia-check" class="w-4.5 h-4.5 accent-[var(--accent)] rounded cursor-pointer" ${state.fontSize > 160 ? 'checked' : ''}>
            <label for="dyslexia-check" class="text-xs text-[var(--text-main)] font-medium select-none cursor-pointer">
              ${getTranslation(state.language, 'dyslexiaMode')}
            </label>
          </div>

          <!-- Reduce Motion / Static Toggle -->
          <div class="flex items-center gap-2">
            <input type="checkbox" id="reduce-motion-check" class="w-4.5 h-4.5 accent-[var(--accent)] rounded cursor-pointer">
            <label for="reduce-motion-check" class="text-xs text-[var(--text-main)] font-medium select-none cursor-pointer">
              ${getTranslation(state.language, 'reduceMotion')}
            </label>
          </div>
        </div>
      </div>
    `;

    renderIcons(this.element);
    this.addEventListeners();
  }

  private addEventListeners(): void {
    // Language Event
    const langSelect = this.element.querySelector('#lang-selector') as HTMLSelectElement;
    if (langSelect) {
      langSelect.addEventListener('change', () => {
        store.setLanguage(langSelect.value as any);
      });
    }

    // Themes
    const lightBtn = this.element.querySelector('#theme-btn-light');
    lightBtn?.addEventListener('click', () => {
      store.setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    });

    const sepiaBtn = this.element.querySelector('#theme-btn-sepia');
    sepiaBtn?.addEventListener('click', () => {
      store.setTheme('sepia');
      document.documentElement.setAttribute('data-theme', 'sepia');
    });

    const darkBtn = this.element.querySelector('#theme-btn-dark');
    darkBtn?.addEventListener('click', () => {
      store.setTheme('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    });

    // Accessibility Panel Toggle
    const accessTrigger = this.element.querySelector('#access-modal-trigger');
    const accessPanel = this.element.querySelector('#access-panel');
    accessTrigger?.addEventListener('click', () => {
      if (accessPanel) {
        accessPanel.classList.toggle('hidden');
      }
    });

    // Font Scaling
    const decBtn = this.element.querySelector('#font-dec-btn');
    decBtn?.addEventListener('click', () => {
      const current = store.getState().fontSize;
      if (current > 80) store.setFontSize(current - 10);
    });

    const incBtn = this.element.querySelector('#font-inc-btn');
    incBtn?.addEventListener('click', () => {
      const current = store.getState().fontSize;
      if (current < 300) store.setFontSize(current + 10);
    });

    // Dyslexia & Reduce Motion Simulation
    const dyslexiaCheck = this.element.querySelector('#dyslexia-check') as HTMLInputElement;
    dyslexiaCheck?.addEventListener('change', () => {
      if (dyslexiaCheck.checked) {
        document.body.classList.add('font-dyslexia');
      } else {
        document.body.classList.remove('font-dyslexia');
      }
    });

    const reduceMotionCheck = this.element.querySelector('#reduce-motion-check') as HTMLInputElement;
    reduceMotionCheck?.addEventListener('change', () => {
      if (reduceMotionCheck.checked) {
        document.documentElement.style.scrollBehavior = 'auto';
      } else {
        document.documentElement.style.scrollBehavior = 'smooth';
      }
    });
  }
}
