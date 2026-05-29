/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Header } from './components/Header';
import { IndexSidebar } from './components/IndexSidebar';
import { QuranViewer } from './components/QuranViewer';
import { AudioPlayerControl } from './components/AudioPlayerControl';
import { SearchEngine } from './components/SearchEngine';
import { HifzTracker } from './components/HifzTracker';
import { VoiceTester } from './components/VoiceTester';
import { PrayerCompass } from './components/PrayerCompass';
import './index.css';

// Initialize the entire Vanilla JS / TypeScript Application on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (!root) return;

  // Clear root and inject clean layout grids natively
  root.className = 'min-h-screen bg-[var(--bg-app)] text-[var(--text-main)] transition-colors duration-300 pb-32';
  root.innerHTML = `
    <!-- Top Header Navigation mountpoint -->
    <div id="app-header"></div>

    <!-- Main Container -->
    <div class="max-w-7xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 relative">
      
      <!-- Left side catalog menu mountpoint -->
      <div id="app-sidebar" class="w-full lg:w-auto"></div>

      <!-- Main workspace -->
      <div class="flex-grow flex flex-col gap-6 w-full lg:max-w-5xl">
        
        <!-- Search Engine widget mountpoint -->
        <div id="app-search"></div>

        <!-- AI Vocal test analyzer mountpoint -->
        <div id="app-voice"></div>

        <!-- Quran Reading View mountpoint -->
        <div id="app-viewer" class="w-full"></div>

        <!-- Hifz plans and self-test checkers mountpoint -->
        <div id="app-hifz"></div>

        <!-- Prayers & tasbih widgets mountpoint -->
        <div id="app-prayer"></div>

      </div>
    </div>

    <!-- Floating bottom audio manager mountpoint -->
    <div id="app-player"></div>
  `;

  // Instantiate Vanilla components
  try {
    new Header('app-header');
    new IndexSidebar('app-sidebar');
    new SearchEngine('app-search');
    new VoiceTester('app-voice');
    new QuranViewer('app-viewer');
    new HifzTracker('app-hifz');
    new PrayerCompass('app-prayer');
    new AudioPlayerControl('app-player');

    // Register service worker for PWA capabilities
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((reg) => console.log('PWA Service Worker registered:', reg.scope))
          .catch((err) => console.warn('PWA Service Worker failed:', err));
      });
    }

    console.log('🕌 Quran Platform fully initialized with modular Vanilla JS & TS architecture!');
  } catch (error) {
    console.error('Failed to initialize Quran Platform:', error);
  }
});

// Trigger setup on DOMContentLoaded fallback if already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  const checkEvent = new Event('DOMContentLoaded');
  document.dispatchEvent(checkEvent);
}
