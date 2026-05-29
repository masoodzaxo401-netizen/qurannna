/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  createIcons,
  Activity,
  Award,
  Book,
  BookOpen,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Compass,
  FileText,
  Heart,
  HelpCircle,
  History,
  Info,
  Layers,
  List,
  MapPin,
  Mic,
  MicOff,
  Moon,
  Music,
  Pause,
  Play,
  RotateCcw,
  Search,
  Settings,
  Sun,
  Volume2,
  VolumeX,
  X,
  ZoomIn,
  ZoomOut,
  Eye,
  EyeOff,
  User,
  Trash,
  Sliders,
  Download,
  DownloadCloud
} from 'lucide';

const ALL_ICONS = {
  Activity,
  Award,
  Book,
  BookOpen,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Compass,
  FileText,
  Heart,
  HelpCircle,
  History,
  Info,
  Layers,
  List,
  MapPin,
  Mic,
  MicOff,
  Moon,
  Music,
  Pause,
  Play,
  RotateCcw,
  Search,
  Settings,
  Sun,
  Volume2,
  VolumeX,
  X,
  ZoomIn,
  ZoomOut,
  Eye,
  EyeOff,
  User,
  Trash,
  Sliders,
  Download,
  DownloadCloud
};

export function renderIcons(parent: HTMLElement = document.body): void {
  try {
    createIcons({
      icons: ALL_ICONS,
      nameAttr: 'data-lucide',
      attrs: {
        class: 'lucide-icon inline-block stroke-[1.5]'
      }
    });
  } catch (e) {
    console.warn('Error rendering icons:', e);
  }
}
