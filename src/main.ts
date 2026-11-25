import {
  studySections, questions, trueFalseItems, memoryPairs, matchPairs, relationPairs, columnsPairs, wordSearchWords,
  type Question
} from './content';
import './style.css';
import './mobile-android.css';

type Screen = 'home' | 'summary' | 'games' | 'difficulty' | 'quiz' | 'memory' | 'match' | 'relations' | 'columns' | 'truefalse' | 'wordsearch' | 'crossword' | 'progress' | 'settings' | 'results';
type Level = 'easy' | 'normal' | 'hard';
type Pair = [string, string];
type Progress = { best: number; completed: number; correct: number; games: number; lastScore: number };

const root = document.querySelector<HTMLDivElement>('#app')!;
const levels: Record<Level, { label: string; time: number; lives: number; tone: string; icon: string }> = {
  easy: { label: 'Fácil', time: 90, lives: 3, tone: 'sage', icon: '✦' },
  normal: { label: 'Normal', time: 60, lives: 4, tone: 'berry', icon: '✦✦' },
  hard: { label: 'Difícil', time: 30, lives: 5, tone: 'papaya', icon: '✦✦✦' }
};
const icons: Record<string, string> = {
  flask: '<path d="M9 3h6M10 3v6l-5.2 8.7A2.2 2.2 0 0 0 6.7 21h10.6a2.2 2.2 0 0 0 1.9-3.3L14 9V3"/><path d="M8 15h8"/>',
  book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 0 4 22z"/><path d="M4 5.5v14A2.5 2.5 0 0 1 6.5 17H20M8 7h8M8 11h7"/>',
  game: '<path d="M6 9h12a4 4 0 0 1 3.8 5.2l-.6 2A2.5 2.5 0 0 1 17 18l-2-2H9l-2 2a2.5 2.5 0 0 1-4.2-1.8l-.6-2A4 4 0 0 1 6 9z"/><path d="M7 12v4M5 14h4M16 13h.01M19 15h.01"/>',
  trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2z"/>',
  sound: '<path d="M4 10v4h4l5 4V6l-5 4zM17 9a5 5 0 0 1 0 6M19 6a9 9 0 0 1 0 12"/>',
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  back: '<path d="m15 18-6-6 6-6"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  bulb: '<path d="M9 18h6M10 22h4M8 14a6 6 0 1 1 8 0c-.8.6-1 1.2-1 2H9c0-.8-.2-1.4-1-2z"/>',
  heart: '<path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7z"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  leaf: '<path d="M20 4c-9 0-15 3-15 10a6 6 0 0 0 6 6c7 0 9-7 9-16z"/><path d="M4 21c3-6 7-9 13-13"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.1 0l3-3A5 5 0 0 0 13 2.9l-1.7 1.7M14 11a5 5 0 0 0-7.1 0l-3 3A5 5 0 0 0 11 21.1l1.7-1.7"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  star: '<path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'
};
const icon = (name: string, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || icons.info}</svg>`;
const escapeHtml = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
  return copy;
};
const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace(/[^A-Z]/g, '');
const getProgress = (): Progress => {
  try { return { best: 0, completed: 0, correct: 0, games: 0, lastScore: 0, ...JSON.parse(localStorage.getItem('cm-progress') || '{}') }; }
  catch { return { best: 0, completed: 0, correct: 0, games: 0, lastScore: 0 }; }
};
let progress = getProgress();
let screen: Screen = 'home';
let currentSection = studySections[0].id;
let selectedLevel: Level = 'normal';
let quiz: { pending: Question[]; total: number; lives: number; score: number; time: number; limit: number; hint: boolean; answered: boolean; right: number; wrong: number; skipped: number } | null = null;
let timer: number | undefined;
let selectedTF = 0;
let tfItems = shuffle(trueFalseItems);
let tfCorrect = 0;
let tfDone = 0;
let memoryDeck: { text: string; pair: number; face: boolean; found: boolean }[] = [];
let memoryFirst: number | null = null;
let memoryBusy = false;
let memoryFound = 0;
let memoryMoves = 0;
let matchMode: 'match' | 'relations' | 'columns' = 'match';
let activeMatches: Pair[] = [];
let matchLeft: string[] = [];
let matchRight: string[] = [];
let matchSelected: string | null = null;
let matchFound = new Set<string>();
let wordGrid: string[][] = [];
let wordPlaced: { word: string; row: number; col: number; dr: number; dc: number }[] = [];
let wordFound = new Set<string>();
let wordStart: { r: number; c: number } | null = null;
let crosswordValues: Record<string, string> = {};
let soundOn = localStorage.getItem('cm-sound') !== 'false';
let volume = Number(localStorage.getItem('cm-volume') ?? 0.25);
let audioContext: AudioContext | null = null;
let musicTimer: number | undefined;
let soundPanel = false;
let lastScene = 'home';

function tone(freq: number, duration = 0.35, shape: OscillatorType = 'sine', amp = 0.16) {
  if (!soundOn || volume <= 0) return;
  try {
    audioContext ||= new AudioContext();
    if (audioContext.state === 'suspended') void audioContext.resume();
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = shape; osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, amp * volume), audioContext.currentTime + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
