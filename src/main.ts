import {
  studySections, questions, trueFalseItems, memoryPairs, matchPairs, relationPairs, columnsPairs, wordSearchWords,
  type Question
} from './content';
import './style.css';

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
    osc.connect(gain); gain.connect(audioContext.destination);
    osc.start(); osc.stop(audioContext.currentTime + duration + 0.02);
  } catch { /* áudio é complementar; o jogo continua sem ele */ }
}
function sfx(kind: 'correct' | 'wrong' | 'tap' | 'complete') {
  if (kind === 'correct') { tone(660, .16, 'sine', .2); window.setTimeout(() => tone(880, .22, 'sine', .17), 90); }
  if (kind === 'wrong') { tone(180, .24, 'triangle', .16); window.setTimeout(() => tone(140, .28, 'triangle', .12), 100); }
  if (kind === 'tap') tone(520, .07, 'sine', .09);
  if (kind === 'complete') [523, 659, 784, 1046].forEach((n, i) => window.setTimeout(() => tone(n, .27, 'sine', .16), i * 110));
}
function stopMusic() { if (musicTimer) window.clearTimeout(musicTimer); musicTimer = undefined; }
function startMusic(scene: string) {
  stopMusic(); lastScene = scene;
  if (!soundOn || volume <= 0) return;
  const palettes: Record<string, number[][]> = {
    home: [[392, 494, 587, 494], [440, 554, 659, 554], [349, 440, 523, 440]],
    games: [[440, 523, 659, 784], [392, 523, 659, 587], [494, 587, 698, 880]],
    level: [[392, 494, 659, 784], [440, 554, 698, 880], [349, 440, 587, 698]],
    study: [[330, 392, 494, 392], [349, 440, 523, 440], [294, 370, 440, 370]],
    quiz: [[440, 554, 659, 554], [392, 494, 587, 494], [523, 659, 784, 659]],
    memory: [[392, 494, 587, 659], [349, 440, 523, 587], [440, 554, 659, 784]],
    words: [[330, 392, 523, 440], [392, 494, 587, 494], [349, 440, 587, 523]],
    match: [[440, 523, 659, 523], [392, 494, 587, 494], [494, 587, 698, 587]],
    relations: [[523, 659, 784, 659], [494, 622, 740, 622], [440, 554, 659, 554]],
    columns: [[330, 415, 494, 622], [349, 440, 523, 659], [392, 494, 587, 698]],
    truefalse: [[294, 440, 587, 440], [330, 494, 659, 494], [349, 523, 698, 523]],
    crossword: [[262, 392, 523, 659], [294, 440, 587, 698], [330, 494, 622, 740]],
    progress: [[349, 440, 523, 587], [392, 494, 587, 659], [330, 415, 494, 587]],
    settings: [[294, 392, 494, 392], [262, 349, 440, 349], [330, 392, 494, 440]],
    results: [[523, 659, 784, 988], [494, 622, 740, 932], [440, 554, 659, 880]]
  };
  const pool = palettes[scene] || palettes.home;
  const melody = pool[Math.floor(Math.random() * pool.length)];
  let n = 0;
  const tick = () => {
    if (!soundOn || volume <= 0) return;
    const root = melody[n % melody.length];
    // Soft three-note pad + plucked top note: distinct instrumental texture per tab/game.
    tone(root, .82, 'triangle', .047);
    tone(root * 1.25, 1.05, 'sine', .018);
    tone(root * 1.5, .92, 'sine', .014);
    if (n % 2 === 0) tone(root / 2, 1.35, 'triangle', .025);
    if (n % 4 === 2) tone(root * 2, .38, 'sine', .009);
    n++;
    musicTimer = window.setTimeout(tick, 780 + Math.random() * 140);
  };
  tick();
}
function setScreen(next: Screen) {
  if (timer) window.clearInterval(timer);
  timer = undefined;
  screen = next;
  const sceneMap: Record<Screen, string> = { home: 'home', summary: 'study', games: 'games', difficulty: 'level', quiz: 'quiz', memory: 'memory', match: 'match', relations: 'relations', columns: 'columns', truefalse: 'truefalse', wordsearch: 'words', crossword: 'crossword', progress: 'progress', settings: 'settings', results: 'results' };
  startMusic(sceneMap[next]);
  render();
}
function navHome() {
  if (timer) window.clearInterval(timer);
  quiz = null;
  setScreen('home');
}
function appShell(content: string, title: string, subtitle = '') {
  return `<div class="app-shell">
    <aside class="sidebar">
      <button class="brand-lockup" data-action="home"><img src="/brand/pwa-icon-192.png" alt=""/><span><b>CiênciasMica</b><small>laboratório de descobertas</small></span></button>
      <div class="side-label">EXPLORAR</div>
      ${navItem('home', 'Início', 'home')}${navItem('summary', 'Resumo', 'book')}${navItem('games', 'Jogos', 'game')}${navItem('progress', 'Meu progresso', 'chart')}
      <div class="sidebar-bottom"><div class="side-label">APLICATIVO</div>${navItem('settings', 'Configurações', 'settings')}<div class="mini-note">CAPÍTULO 12 <span>·</span> CIÊNCIAS 6º ANO</div></div>
    </aside>
    <main class="main-area">
      <header class="topbar"><div class="topbar-copy"><span class="eyebrow">CIÊNCIAS · 6º ANO</span><h1>${title}</h1>${subtitle ? `<p>${subtitle}</p>` : ''}</div>
        <div class="top-actions"><div class="streak-pill"><span>✦</span> Aprender é descobrir</div><button class="icon-button sound-trigger" aria-label="Som" data-action="sound-panel">${icon(soundOn ? 'sound' : 'sound')}<i class="sound-dot ${soundOn ? 'on' : ''}"></i></button></div>
      </header>
      ${soundPanel ? `<div class="sound-popover"><div class="popover-heading">Som e trilha</div><div class="volume-row"><span>Volume</span><b>${Math.round(volume * 100)}%</b></div><input type="range" min="0" max="1" step="0.05" value="${volume}" data-volume/><button class="text-button" data-action="toggle-sound">${soundOn ? 'Silenciar tudo' : 'Ativar som'}</button></div>` : ''}
      <section class="content-area">${content}</section>
      <footer class="mobile-nav">${mobileNav('home', 'home')}${mobileNav('summary', 'book')}${mobileNav('games', 'game')}${mobileNav('progress', 'chart')}${mobileNav('settings', 'settings')}</footer>
    </main>
  </div>`;
}
function isNavActive(id: string) {
  if (screen === id) return true;
  return id === 'games' && ['difficulty', 'quiz', 'memory', 'match', 'relations', 'columns', 'truefalse', 'wordsearch', 'crossword', 'results'].includes(screen);
}
function navItem(id: string, text: string, glyph: string) { return `<button class="nav-item ${isNavActive(id) ? 'active' : ''}" data-action="${id}">${icon(glyph)}<span>${text}</span>${isNavActive(id) ? '<i></i>' : ''}</button>`; }
function mobileNav(id: string, glyph: string) { return `<button class="mobile-nav-item ${isNavActive(id) ? 'active' : ''}" data-action="${id}">${icon(glyph)}</button>`; }
function render() {
  if (!root) return;
  let view = '';
  let title = 'Início'; let subtitle = 'Explore a ciência que existe no seu dia a dia.';
  if (screen === 'home') { view = homeView(); title = 'Seu laboratório começa aqui'; }
  if (screen === 'summary') { view = summaryView(); title = 'Caderno de descobertas'; subtitle = 'Um resumo para entender, lembrar e chegar confiante à prova.'; }
  if (screen === 'games') { view = gamesView(); title = 'Escolha seu desafio'; subtitle = 'Treine de jeitos diferentes — sempre aprendendo alguma coisa nova.'; }
  if (screen === 'difficulty') { view = difficultyView(); title = 'Escolha o nível'; subtitle = 'Cada pergunta tem seu próprio tempo e sua quantidade de vidas.'; }
  if (screen === 'quiz') { view = quizView(); title = 'Quiz principal'; subtitle = 'Uma pergunta de cada vez. Use a dica, pule ou responda.'; }
  if (screen === 'memory') { view = memoryView(); title = 'Memória científica'; subtitle = 'Encontre os pares e conecte o nome à ideia certa.'; }
  if (screen === 'match') { view = matchView('match'); title = 'Associe pergunta e resposta'; subtitle = 'Escolha uma pergunta e encontre a resposta correspondente.'; }
  if (screen === 'relations') { view = matchView('relations'); title = 'Relacione as palavras'; subtitle = 'Ligue cada palavra ou conceito à ideia que explica seu significado.'; }
  if (screen === 'columns') { view = matchView('columns'); title = 'Ligue as colunas'; subtitle = 'Relacione cada conceito à sua explicação.'; }
  if (screen === 'truefalse') { view = trueFalseView(); title = 'Verdadeiro ou falso'; subtitle = 'Leia com atenção e decida. Cada resposta traz uma explicação.'; }
  if (screen === 'wordsearch') { view = wordSearchView(); title = 'Caça-palavras'; subtitle = 'Encontre os conceitos escondidos no quadro.'; }
  if (screen === 'crossword') { view = crosswordView(); title = 'Palavras cruzadas'; subtitle = 'Preencha as palavras com base nas pistas.'; }
  if (screen === 'progress') { view = progressView(); title = 'Seu progresso'; subtitle = 'Acompanhe o que já aprendeu neste aparelho.'; }
  if (screen === 'settings') { view = settingsView(); title = 'Configurações'; subtitle = 'Ajuste o som e a experiência do aplicativo.'; }
  if (screen === 'results') { view = resultsView(); title = 'Desafio concluído'; subtitle = 'Veja como você foi e tente superar sua marca.'; }
  root.innerHTML = appShell(view, title, subtitle);
  if (screen === 'quiz' && quiz && !quiz.answered && !timer) startTimer();
}
function homeView() {
  const completed = Math.min(progress.completed, questions.length);
  const pct = Math.round(completed / questions.length * 100);
  return `<div class="home-grid">
    <section class="hero-card">
      <div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div>
      <div class="hero-copy"><span class="hero-kicker"><span class="kicker-dot"></span> CAPÍTULO 12 · MISSÃO DE CIÊNCIAS</span>
        <h2>Descubra o que<br/><em>transforma o mundo.</em></h2>
        <p>Materiais, medicamentos e tecnologia — com experiências de estudo que cabem na sua rotina.</p>
        <div class="hero-actions"><button class="primary-button" data-action="difficulty">Começar quiz ${icon('arrow')}</button><button class="ghost-button" data-action="summary">Abrir resumo ${icon('book')}</button></div>
      </div>
      <div class="hero-art"><img src="/brand/pwa-icon-192.png" alt="Frasco de laboratório com folha, engrenagem e moléculas"/><span class="orbit-tag tag-top">IDEIAS EM MOVIMENTO</span><span class="orbit-tag tag-bottom">CURIOSIDADE · CIÊNCIA · FUTURO</span></div>
      <div class="hero-foot"><span>✨ <b>60 perguntas</b> para explorar</span><span>⌁ 7 modos de jogo</span><span>◌ funciona offline</span></div>
    </section>
    <section class="welcome-row"><div><span class="eyebrow">SEU RITMO, SUA DESCOBERTA</span><h3>Por onde vamos começar?</h3></div><span class="chapter-chip">6º ANO <b>·</b> ENSINO FUNDAMENTAL</span></section>
    <div class="feature-grid">
      <button class="feature-card feature-summary" data-action="summary"><div class="feature-symbol">${icon('book')}</div><span class="feature-top">01 / ESTUDAR</span><h3>Resumo de<br/>Ciências</h3><p>Conceitos claros, exemplos e imagens para revisar.</p><span class="feature-link">Abrir caderno ${icon('arrow')}</span></button>
      <button class="feature-card feature-quiz" data-action="difficulty"><div class="feature-symbol">${icon('game')}</div><span class="feature-top">02 / DESAFIAR</span><h3>Quiz<br/>principal</h3><p>46 questões embaralhadas, tempo e vidas por nível.</p><span class="feature-link">Escolher dificuldade ${icon('arrow')}</span></button>
      <button class="feature-card feature-games" data-action="games"><div class="feature-symbol">${icon('grid')}</div><span class="feature-top">03 / PRATICAR</span><h3>Jogos<br/>alternativos</h3><p>Memória, associações, caça-palavras e mais.</p><span class="feature-link">Ver os jogos ${icon('arrow')}</span></button>
    </div>
    <section class="progress-strip"><div class="progress-emblem">${icon('trophy')}</div><div class="progress-info"><span class="eyebrow">SUA JORNADA</span><b>${completed ? `${completed} questões registradas` : 'Sua primeira descoberta espera por você'}</b><div class="progress-track"><i style="width:${pct}%"></i></div></div><div class="progress-value">${pct}<small>%</small></div><button class="outline-button" data-action="progress">Ver progresso ${icon('arrow')}</button></section>
    <section class="quick-topics"><div class="section-heading"><div><span class="eyebrow">MAPA DO CAPÍTULO</span><h3>O que você vai descobrir</h3></div><button class="text-button" data-action="summary">Ver resumo completo ${icon('arrow')}</button></div><div class="topic-pills"><span>🌿 Materiais naturais</span><span>🧪 Materiais sintéticos</span><span>♻️ Plásticos e reciclagem</span><span>💊 Medicamentos</span><span>🧠 Sistema nervoso</span></div></section>
  </div>`;
}
function summaryView() {
  const section = studySections.find(s => s.id === currentSection) || studySections[0];
  return `<div class="summary-layout"><aside class="summary-index"><div class="index-title">NO CADERNO <span>14 TÓPICOS</span></div>${studySections.map((s, i) => `<button class="index-item ${s.id === currentSection ? 'selected' : ''}" data-section="${s.id}"><span class="index-n">${String(i + 1).padStart(2, '0')}</span><span>${s.title}</span>${s.id === currentSection ? '<b>•</b>' : ''}</button>`).join('')}<div class="index-note">Baseado nas páginas enviadas do capítulo 12.</div></aside>
    <article class="study-card"><div class="study-topline"><span class="topic-tag">${section.icon} TÓPICO DE ESTUDO</span><span class="page-ref">LIVRO · PÁG. ${section.page}</span></div><h2>${section.title}</h2><p class="study-intro">${section.intro}</p>${section.image ? `<figure class="study-photo"><img src="${section.image}" alt="${escapeHtml(section.imageAlt || section.title)}" loading="lazy" onerror="this.remove()"/><figcaption>${escapeHtml(section.imageAlt || section.title)} · ${escapeHtml(section.imageCredit || 'Wikimedia Commons')} <a href="${section.imageSource || 'https://commons.wikimedia.org'}" target="_blank" rel="noreferrer">Ver original</a></figcaption></figure>` : ''}<div class="study-points">${section.bullets.map((b, i) => `<div class="study-point"><span>${String(i + 1).padStart(2, '0')}</span><p>${b}</p></div>`).join('')}</div><div class="remember-box"><div class="remember-icon">${icon('bulb')}</div><div><b>GUARDE ESTA IDEIA</b><p>${section.remember}</p></div></div><div class="study-footer"><button class="outline-button" data-action="${section.id === studySections[0].id ? 'home' : 'summary-prev'}">${icon('back')} ${section.id === studySections[0].id ? 'Início' : 'Tópico anterior'}</button><span>${studySections.findIndex(s => s.id === section.id) + 1} de ${studySections.length}</span><button class="primary-button compact" data-action="summary-next">Próximo tópico ${icon('arrow')}</button></div></article></div>`;
}
function gamesView() {
  const items = [
    ['match', '⛓️', 'Associe pergunta à resposta', 'Combine cada conceito com a explicação certa.', '8 pares'],
    ['relations', '🔤', 'Relacione as palavras', 'Conecte termos e significados do capítulo.', '10 relações'],
    ['columns', '↔️', 'Ligue as colunas', 'Faça correspondências rápidas entre os dois lados.', '10 relações'],
    ['memory', '🃏', 'Jogo da memória', 'Vire cartas e descubra os pares de Ciências.', '12 pares'],
    ['truefalse', '✓✕', 'Verdadeiro ou falso', 'Teste sua atenção com afirmações do capítulo.', '16 afirmações'],
    ['wordsearch', '⌕', 'Caça-palavras', 'Procure os principais termos escondidos.', '8 palavras'],
    ['crossword', '▦', 'Palavras cruzadas', 'Complete uma pequena cruzadinha com pistas.', '5 conceitos']
  ];
  return `<div class="games-intro"><div class="games-callout"><div class="callout-icon">${icon('game')}</div><div><b>O quiz é o desafio principal.</b><p>Os outros jogos ajudam a fixar os conceitos de um jeito diferente.</p></div><button class="primary-button compact" data-action="difficulty">Jogar quiz ${icon('arrow')}</button></div><div class="games-grid">${items.map((it, i) => `<button class="game-tile game-tile-${i + 1}" data-action="${it[0]}"><span class="game-number">JOGO 0${i + 1}</span><div class="game-emoji">${it[1]}</div><h3>${it[2]}</h3><p>${it[3]}</p><span class="game-meta">${it[4]} <i>›</i></span></button>`).join('')}</div></div>`;
}
function difficultyView() {
  return `<div class="difficulty-stage"><div class="difficulty-heading"><span class="eyebrow">AJUSTE O DESAFIO</span><h2>Até onde vai sua curiosidade?</h2><p>O cronômetro reinicia a cada pergunta. As perguntas e as alternativas mudam de ordem a cada partida.</p></div><div class="difficulty-cards">${(['easy', 'normal', 'hard'] as Level[]).map(l => { const d = levels[l]; return `<button class="difficulty-card ${d.tone}" data-level="${l}"><div class="difficulty-glyph">${d.icon}</div><span class="difficulty-label">${d.label.toUpperCase()}</span><h3>${Math.floor(d.time / 60)}:${String(d.time % 60).padStart(2, '0')}<small> / pergunta</small></h3><div class="difficulty-hearts">${Array.from({ length: d.lives }).map(() => '♥').join(' ')}</div><span class="difficulty-bottom">${d.lives} vidas <i>→</i></span></button>`; }).join('')}</div><div class="difficulty-foot"><span>${icon('info')} Se perder todas as vidas, a partida termina e você volta ao início.</span><span>46 PERGUNTAS EMBARALHADAS</span></div></div>`;
}
function prepareQuestion(q: Question): Question {
  const pairs = shuffle(q.options.map((text, idx) => ({ text, correct: idx === q.answer })));
  return { ...q, options: pairs.map(p => p.text), answer: pairs.findIndex(p => p.correct) };
}
function startQuiz(level: Level) {
  selectedLevel = level;
  const data = shuffle(questions).map(prepareQuestion);
  quiz = { pending: data, total: data.length, lives: levels[level].lives, score: 0, time: levels[level].time, limit: levels[level].time, hint: false, answered: false, right: 0, wrong: 0, skipped: 0 };
  progress.games++; saveProgress();
  setScreen('quiz');
}
function startTimer() {
  if (!quiz || quiz.answered || quiz.pending.length === 0) return;
  timer = window.setInterval(() => {
    if (!quiz || quiz.answered) return;
    quiz.time--;
    const timerEl = root.querySelector<HTMLElement>('[data-timer-value]');
    const bar = root.querySelector<HTMLElement>('[data-timer-bar]');
    if (timerEl) timerEl.textContent = `${Math.floor(quiz.time / 60)}:${String(quiz.time % 60).padStart(2, '0')}`;
    if (bar) bar.style.width = `${Math.max(0, quiz.time / quiz.limit * 100)}%`;
    if (quiz.time <= 10) timerEl?.classList.add('urgent');
    if (quiz.time <= 0) answerQuiz(-1);
  }, 1000);
}
function quizView() {
  if (!quiz) return '<div class="empty-state">Nenhuma partida aberta.</div>';
  const q = quiz.pending[0];
  if (!q) { finishQuiz(); return resultsView(); }
  const answered = quiz.answered;
  const correct = answered && lastAnswerCorrect;
  const options = q.options.map((op, i) => {
    const hidden = quiz!.hint && i !== q.answer && i === q.options.findIndex((_, n) => n !== q.answer);
    let cls = '';
    if (answered && i === q.answer) cls = 'answer-correct';
    else if (answered && i === lastAnswerIndex) cls = 'answer-wrong';
    return `<button class="answer-option ${cls}" ${hidden ? 'disabled' : ''} data-answer="${i}" ${answered ? 'disabled' : ''}><span class="answer-letter">${String.fromCharCode(65 + i)}</span><span>${escapeHtml(op)}</span>${answered && i === q.answer ? icon('check') : '<i></i>'}</button>`;
  }).join('');
  return `<div class="quiz-layout"><div class="quiz-main"><div class="quiz-status-row"><span class="topic-tag">${escapeHtml(q.topic)}</span><span class="question-counter">${quiz.total - quiz.pending.length + 1} <i>/</i> ${quiz.total}</span></div><div class="quiz-progress-track"><i style="width:${((quiz.total - quiz.pending.length) / quiz.total) * 100}%"></i></div><div class="quiz-question-card"><div class="question-deco">${icon('flask')}</div><span class="eyebrow">PERGUNTA ${String(quiz.total - quiz.pending.length + 1).padStart(2, '0')}</span><h2>${escapeHtml(q.question)}</h2><div class="answer-list">${options}</div>${quiz.hint && !answered ? `<div class="hint-inline">${icon('bulb')} ${escapeHtml(q.hint)}</div>` : ''}${answered ? `<div class="feedback-box ${correct ? 'good' : 'bad'}"><b>${correct ? 'Muito bem! Você acertou.' : 'Vamos aprender com esta.'}</b><p>${escapeHtml(q.explanation)}</p></div>` : ''}<div class="quiz-actions">${!answered ? `<button class="text-button" data-action="hint">${icon('bulb')} Dica</button><button class="outline-button" data-action="skip">Pular pergunta ${icon('arrow')}</button>` : `<span class="source-ref">Baseado na pág. ${q.page}</span><button class="primary-button compact" data-action="next-question">Próxima pergunta ${icon('arrow')}</button>`}</div></div></div>
    <aside class="quiz-rail"><div class="rail-card timer-card"><span class="eyebrow">TEMPO</span><div class="timer-face"><div>${icon('clock')}</div><b data-timer-value>${Math.floor(quiz.time / 60)}:${String(quiz.time % 60).padStart(2, '0')}</b></div><div class="timer-track"><i data-timer-bar style="width:${quiz.time / quiz.limit * 100}%"></i></div><small>por pergunta</small></div><div class="rail-card lives-card"><span class="eyebrow">SUAS VIDAS</span><div class="life-row">${Array.from({ length: levels[selectedLevel].lives }).map((_, i) => `<span class="life ${i < quiz!.lives ? '' : 'lost'}">♥</span>`).join('')}</div><p>${quiz.lives} restantes</p></div><div class="rail-card score-card"><span class="eyebrow">PONTOS</span><b>${quiz.score}</b><small>+10 por acerto</small><div class="score-mini"><span>✓ ${quiz.right} acertos</span><span>↷ ${quiz.skipped} puladas</span></div></div><button class="exit-quiz" data-action="home">${icon('home')} Voltar ao início</button></aside></div>`;
}
let lastAnswerIndex = -1;
let lastAnswerCorrect = false;
function answerQuiz(choice: number) {
  if (!quiz || quiz.answered) return;
  if (timer) window.clearInterval(timer); timer = undefined;
  const q = quiz.pending[0];
  lastAnswerIndex = choice;
  lastAnswerCorrect = choice === q.answer;
  quiz.answered = true;
  if (lastAnswerCorrect) { quiz.score += 10; quiz.right++; sfx('correct'); }
  else { quiz.lives--; quiz.wrong++; sfx('wrong'); }
  render();
  if (quiz.lives <= 0) {
    window.setTimeout(() => { if (quiz && quiz.lives <= 0) { progress.lastScore = quiz.score; saveProgress(); navHome(); toast('Suas vidas terminaram. Vamos tentar de novo!'); } }, 1350);
  }
}
function nextQuestion() {
  if (!quiz || !quiz.answered || quiz.lives <= 0) return;
  quiz.pending.shift();
  quiz.answered = false; quiz.hint = false;
  if (!quiz.pending.length) { finishQuiz(); setScreen('results'); return; }
  quiz.time = quiz.limit; render();
}
function skipQuestion() {
  if (!quiz || quiz.answered || quiz.pending.length < 2) { toast('Esta é a última questão da fila. Responda ou use a dica.'); return; }
  const current = quiz.pending.shift()!; quiz.pending.push(current); quiz.skipped++; quiz.hint = false; quiz.time = quiz.limit; sfx('tap'); render();
}
function finishQuiz() {
  if (!quiz) return;
  if (timer) window.clearInterval(timer); timer = undefined;
  const done = quiz.total;
  progress.completed += done; progress.correct += quiz.right; progress.lastScore = quiz.score; progress.best = Math.max(progress.best, quiz.score); saveProgress();
  sfx('complete');
}
function resultsView() {
  if (!quiz) return '<div class="empty-state">Nenhum resultado disponível.</div>';
  const pct = Math.round(quiz.right / quiz.total * 100);
  return `<div class="results-stage"><div class="results-medal">${icon('trophy')}</div><span class="eyebrow">MISSÃO FINALIZADA</span><h2>${pct >= 80 ? 'Que descoberta incrível!' : pct >= 55 ? 'Você está evoluindo!' : 'Cada tentativa ensina.'}</h2><p>Você concluiu o percurso do quiz principal.</p><div class="result-stats"><div><b>${quiz.score}</b><span>pontos</span></div><div><b>${quiz.right}</b><span>acertos</span></div><div><b>${quiz.wrong}</b><span>erros</span></div><div><b>${pct}%</b><span>aproveitamento</span></div></div><div class="result-message">${pct >= 80 ? 'Seu raciocínio está afiado. Continue explorando!' : 'Volte ao resumo e tente novamente. Você vai ficar cada vez mais preparado.'}</div><div class="result-actions"><button class="primary-button" data-action="difficulty">Jogar novamente ${icon('arrow')}</button><button class="outline-button" data-action="summary">Revisar o resumo ${icon('book')}</button><button class="text-button" data-action="home">Voltar ao início</button></div></div>`;
}
function memoryStart() {
  const pairs = shuffle(memoryPairs);
  memoryDeck = shuffle(pairs.flatMap((p, i) => [{ text: p[0], pair: i, face: false, found: false }, { text: p[1], pair: i, face: false, found: false }]));
  memoryFirst = null; memoryBusy = false; memoryFound = 0; memoryMoves = 0;
}
function memoryView() {
  if (!memoryDeck.length) memoryStart();
  return `<div class="game-board-wrap"><div class="game-board-head"><div><span class="eyebrow">JOGO DE ASSOCIAÇÃO</span><h2>Descubra os pares escondidos</h2><p>Vire duas cartas por vez. Combine o termo com a explicação.</p></div><div class="game-score-chip">${memoryFound}/${memoryDeck.length / 2} <small>pares</small></div></div><div class="memory-grid">${memoryDeck.map((c, i) => `<button class="memory-card ${c.face || c.found ? 'turned' : ''} ${c.found ? 'matched' : ''}" data-memory="${i}" ${c.found || c.face ? 'disabled' : ''}><span class="memory-back">${icon('flask')}<small>CiênciasMica</small></span><span class="memory-front">${escapeHtml(c.text)}</span></button>`).join('')}</div><div class="board-foot"><span>Jogadas: ${memoryMoves}</span><button class="outline-button" data-action="memory-reset">Recomeçar ${icon('arrow')}</button><button class="text-button" data-action="home">Voltar ao início</button></div>${memoryFound === memoryDeck.length / 2 ? `<div class="feedback-box good">Todos os pares encontrados. Excelente memória científica!</div>` : ''}</div>`;
}
function chooseMemory(index: number) {
  if (memoryBusy || memoryDeck[index]?.found || memoryDeck[index]?.face) return;
  memoryDeck[index].face = true;
  if (memoryFirst === null) memoryFirst = index;
  else {
    memoryMoves++;
    const first = memoryFirst; memoryFirst = null;
    if (memoryDeck[first].pair === memoryDeck[index].pair) {
      memoryDeck[first].found = memoryDeck[index].found = true; memoryFound++; sfx('correct');
    } else {
      memoryBusy = true; sfx('tap');
      window.setTimeout(() => { memoryDeck[first].face = false; memoryDeck[index].face = false; memoryBusy = false; render(); }, 850);
    }
  }
  render();
}
function setupMatch(kind: 'match' | 'relations' | 'columns') {
  matchMode = kind; const source = (kind === 'match' ? matchPairs : kind === 'relations' ? relationPairs : columnsPairs) as Pair[]; activeMatches = shuffle(source).slice(0, kind === 'match' ? 8 : 10);
  matchLeft = shuffle(activeMatches.map(p => p[0])); matchRight = shuffle(activeMatches.map(p => p[1])); matchSelected = null; matchFound = new Set();
}
function matchView(kind: 'match' | 'relations' | 'columns') {
  if (matchMode !== kind || !activeMatches.length) setupMatch(kind);
  return `<div class="match-stage"><div class="match-scoreline"><div><span class="eyebrow">${kind === 'match' ? 'ASSOCIAÇÃO' : kind === 'relations' ? 'VOCABULÁRIO' : 'DUAS COLUNAS'}</span><h2>${kind === 'match' ? 'Encontre cada resposta' : kind === 'relations' ? 'Relacione as palavras' : 'Ligue conceito e explicação'}</h2><p>Toque em um item à esquerda e depois na resposta correspondente.</p></div><span class="game-score-chip">${matchFound.size}/${activeMatches.length}</span></div><div class="columns-wrap"><div class="match-column"><div class="column-title">CONCEITOS</div>${matchLeft.map((text, i) => `<button class="match-choice left-choice ${matchSelected === text ? 'selected' : ''} ${matchFound.has(text) ? 'paired' : ''}" data-left="${escapeHtml(text)}" ${matchFound.has(text) ? 'disabled' : ''}><span>${String(i + 1).padStart(2, '0')}</span>${escapeHtml(text)}</button>`).join('')}</div><div class="match-bridge">${icon('link')}</div><div class="match-column"><div class="column-title">DEFINIÇÕES</div>${matchRight.map((text, i) => `<button class="match-choice right-choice ${matchFound.has(activeMatches.find(p => p[1] === text)?.[0] || '') ? 'paired' : ''}" data-right="${escapeHtml(text)}" ${matchFound.has(activeMatches.find(p => p[1] === text)?.[0] || '') ? 'disabled' : ''}><span>${String(i + 1).padStart(2, '0')}</span>${escapeHtml(text)}</button>`).join('')}</div></div>${matchFound.size === activeMatches.length ? `<div class="feedback-box good">Todas as relações estão corretas. Muito bem!</div>` : ''}<div class="board-foot"><span>${matchFound.size} relações concluídas</span><button class="outline-button" data-action="${kind}-reset">Embaralhar de novo ${icon('arrow')}</button><button class="text-button" data-action="home">Voltar ao início</button></div></div>`;
}
function chooseMatch(side: 'left' | 'right', value: string) {
  if (side === 'left') { matchSelected = value; sfx('tap'); render(); return; }
  if (!matchSelected) { toast('Escolha primeiro um conceito na coluna da esquerda.'); return; }
  const match = activeMatches.find(p => p[0] === matchSelected && p[1] === value);
  if (match) { matchFound.add(match[0]); sfx('correct'); }
  else { sfx('wrong'); toast('Ainda não combinam. Tente outra definição.'); }
  matchSelected = null; render();
}
function trueFalseView() {
  const item = tfItems[selectedTF];
  const done = tfDone;
  if (!item) return `<div class="results-stage"><div class="results-medal">${icon('trophy')}</div><h2>Rodada concluída!</h2><p>Você acertou ${tfCorrect} de ${tfItems.length} afirmações.</p><button class="primary-button" data-action="tf-reset">Jogar novamente ${icon('arrow')}</button><button class="outline-button" data-action="home">Voltar ao início</button></div>`;
  return `<div class="tf-stage"><div class="tf-top"><span class="topic-tag">AFIRMAÇÃO ${String(done + 1).padStart(2, '0')} / ${tfItems.length}</span><span class="game-score-chip">✓ ${tfCorrect} acertos</span></div><div class="tf-card"><div class="tf-symbol">“ ”</div><p>${escapeHtml(item.text)}</p><span class="eyebrow">QUAL É A SUA LEITURA?</span><div class="tf-options"><button class="tf-choice true-choice" data-tf="true">✓ É VERDADEIRO</button><button class="tf-choice false-choice" data-tf="false">✕ É FALSO</button></div></div><div class="board-foot"><span>Uma explicação aparece depois de cada escolha.</span><button class="text-button" data-action="home">Voltar ao início</button></div></div>`;
}
function answerTF(value: boolean) {
  const item = tfItems[selectedTF]; if (!item) return;
  const right = value === item.answer;
  if (right) { tfCorrect++; sfx('correct'); } else sfx('wrong');
  tfDone++; selectedTF++;
  render();
  toast(`${right ? 'Acertou!' : 'Atenção!'} ${item.why}`);
}
function resetTF() { tfItems = shuffle(trueFalseItems); selectedTF = 0; tfCorrect = 0; tfDone = 0; render(); }
function wordStartGame() {
  const size = Math.max(13, ...wordSearchWords.map(word => word.length)); wordGrid = Array.from({ length: size }, () => Array(size).fill(''));
  wordPlaced = []; wordFound = new Set(); wordStart = null;
  for (const word of shuffle(wordSearchWords)) {
    let placed = false;
    for (let tries = 0; tries < 100 && !placed; tries++) {
      const vertical = Math.random() > .5; const dr = vertical ? 1 : 0; const dc = vertical ? 0 : 1;
      const row = Math.floor(Math.random() * (size - (vertical ? word.length : 0)));
      const col = Math.floor(Math.random() * (size - (vertical ? 0 : word.length)));
      let fits = true;
      for (let k = 0; k < word.length; k++) { const old = wordGrid[row + dr * k][col + dc * k]; if (old && old !== word[k]) { fits = false; break; } }
      if (fits) { for (let k = 0; k < word.length; k++) wordGrid[row + dr * k][col + dc * k] = word[k]; wordPlaced.push({ word, row, col, dr, dc }); placed = true; }
    }
  }
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  wordGrid = wordGrid.map(row => row.map(c => c || letters[Math.floor(Math.random() * letters.length)]));
}
function isFoundWordCell(r: number, c: number) {
  return wordPlaced.some(w => wordFound.has(w.word) && Array.from({ length: w.word.length }, (_, k) => ({ r: w.row + w.dr * k, c: w.col + w.dc * k })).some(p => p.r === r && p.c === c));
}
function wordSearchView() {
  if (!wordGrid.length) wordStartGame();
  return `<div class="word-stage"><div class="word-head"><div><span class="eyebrow">OBSERVE · PROCURE · DESCUBRA</span><h2>Palavras escondidas</h2><p>Toque na primeira letra e depois na última. As palavras podem aparecer na horizontal ou vertical.</p></div><span class="game-score-chip">${wordFound.size}/${wordPlaced.length} palavras</span></div><div class="word-play"><div class="word-grid" style="--letters:${wordGrid.length}">${wordGrid.map((row, r) => row.map((c, col) => `<button class="letter-cell ${isFoundWordCell(r, col) ? 'found' : ''} ${wordStart?.r === r && wordStart?.c === col ? 'cell-start' : ''}" data-cell="${r}-${col}">${c}</button>`).join('')).join('')}</div><div class="word-list"><div class="column-title">LISTA DE TERMOS</div>${wordPlaced.map(w => `<div class="word-term ${wordFound.has(w.word) ? 'done' : ''}"><span>${wordFound.has(w.word) ? '✓' : '○'}</span>${w.word}</div>`).join('')}<button class="outline-button" data-action="word-reset">Novo quadro ${icon('arrow')}</button></div></div><div class="board-foot"><span>${wordStart ? 'Agora escolha a última letra.' : 'Comece tocando na primeira letra.'}</span><button class="text-button" data-action="home">Voltar ao início</button></div>${wordFound.size === wordPlaced.length ? '<div class="feedback-box good">Você encontrou todos os termos!</div>' : ''}</div>`;
}
function selectWordCell(r: number, c: number) {
  if (!wordStart) { wordStart = { r, c }; render(); return; }
  const a = wordStart; const dr = Math.sign(r - a.r); const dc = Math.sign(c - a.c);
  const straight = (r === a.r || c === a.c);
  if (!straight || (r === a.r && c === a.c)) { wordStart = { r, c }; render(); return; }
  const steps = Math.max(Math.abs(r - a.r), Math.abs(c - a.c));
  const selected = Array.from({ length: steps + 1 }, (_, k) => wordGrid[a.r + dr * k][a.c + dc * k]).join('');
  const reverse = selected.split('').reverse().join('');
  const found = wordPlaced.find(w => !wordFound.has(w.word) && (w.word === selected || w.word === reverse));
  if (found) { wordFound.add(found.word); sfx('correct'); }
  else { sfx('wrong'); toast('Ainda não formou uma palavra da lista.'); }
  wordStart = null; render();
}
const crosswordWords = [
  { word: 'PLASTICO', direction: 'across', row: 7, col: 2, number: 1, clue: 'Material moldado pela indústria, muitas vezes produzido a partir da nafta.' },
  { word: 'BULA', direction: 'down', row: 5, col: 3, number: 2, clue: 'Texto que reúne informações sobre um medicamento.' },
  { word: 'TARJA', direction: 'down', row: 6, col: 4, number: 3, clue: 'Faixa colorida presente na embalagem de alguns medicamentos.' },
  { word: 'PETROLEO', direction: 'down', row: 5, col: 6, number: 4, clue: 'Recurso natural não renovável importante para a indústria petroquímica.' },
  { word: 'SINTETICO', direction: 'down', row: 6, col: 7, number: 5, clue: 'Material criado em laboratório ou indústria por transformações químicas e físicas.' }
];
function crosswordMap() {
  const map = new Map<string, string>();
  crosswordWords.forEach(w => w.word.split('').forEach((letter, i) => {
    const r = w.row + (w.direction === 'down' ? i : 0); const c = w.col + (w.direction === 'across' ? i : 0); map.set(`${r}-${c}`, letter);
  }));
  return map;
}
function crosswordView() {
  const map = crosswordMap(); const cells = [...map.keys()].map(k => { const [r, c] = k.split('-').map(Number); return { r, c, letter: map.get(k)! }; });
  const maxR = Math.max(...cells.map(c => c.r)); const maxC = Math.max(...cells.map(c => c.c));
  const numbers = new Map<string, number>(); crosswordWords.forEach(w => numbers.set(`${w.row}-${w.col}`, w.number));
  const grid = Array.from({ length: maxR + 1 }, (_, r) => Array.from({ length: maxC + 1 }, (_, c) => {
    const key = `${r}-${c}`;
    if (!map.has(key)) return '<span class="cross-black"></span>';
    return `<label class="cross-cell"><small>${numbers.get(key) || ''}</small><input maxlength="1" autocomplete="off" data-cross="${key}" aria-label="letra linha ${r + 1} coluna ${c + 1}" value="${escapeHtml(crosswordValues[key] || '')}"/></label>`;
  }).join('')).join('');
  const complete = cells.every(c => normalize(crosswordValues[`${c.r}-${c.c}`] || '') === c.letter);
  return `<div class="crossword-stage"><div class="word-head"><div><span class="eyebrow">DESAFIO DE VOCABULÁRIO</span><h2>Preencha as casas</h2><p>As palavras se cruzam. Use as pistas para descobrir cada termo.</p></div><span class="game-score-chip">${cells.filter(c => crosswordValues[`${c.r}-${c.c}`]).length}/${cells.length} letras</span></div><div class="crosswork-layout"><div class="cross-grid" style="--cols:${maxC + 1};--rows:${maxR + 1}">${grid}</div><div class="cross-clues"><div class="column-title">PISTAS</div>${crosswordWords.map(w => `<div class="cross-clue"><b>${w.number} · ${w.direction === 'across' ? 'Horizontal' : 'Vertical'}</b><p>${w.clue}</p></div>`).join('')}<button class="primary-button compact" data-action="check-crossword">Conferir palavras ${icon('check')}</button></div></div>${complete ? '<div class="feedback-box good">Cruzadinha completa! Você dominou os conceitos.</div>' : ''}<div class="board-foot"><button class="outline-button" data-action="cross-reset">Limpar quadro</button><button class="text-button" data-action="home">Voltar ao início</button></div></div>`;
}
function progressView() {
  const percent = Math.min(100, Math.round(progress.completed / questions.length * 100));
  return `<div class="progress-page"><div class="progress-hero"><div class="progress-hero-mark">${icon('trophy')}</div><div><span class="eyebrow">SUA TRILHA DE APRENDIZAGEM</span><h2>Conhecimento que cresce a cada tentativa.</h2><p>Os dados ficam salvos neste aparelho.</p></div></div><div class="progress-metrics"><div><span>QUESTÕES REGISTRADAS</span><b>${progress.completed}</b></div><div><span>RESPOSTAS CORRETAS</span><b>${progress.correct}</b></div><div><span>PARTIDAS DE QUIZ</span><b>${progress.games}</b></div><div><span>MELHOR PONTUAÇÃO</span><b>${progress.best}</b></div></div><div class="progress-chapter"><div class="progress-chapter-head"><div><span class="eyebrow">CAPÍTULO 12</span><h3>Materiais, medicamentos e tecnologia</h3></div><b>${percent}%</b></div><div class="progress-track"><i style="width:${percent}%"></i></div><p>${progress.completed ? `${progress.completed} questões já registradas no seu histórico.` : 'Complete seu primeiro quiz para começar a preencher sua trilha.'}</p></div><button class="outline-button" data-action="progress-reset">Zerar progresso local</button></div>`;
}
function settingsView() {
  return `<div class="settings-page"><div class="settings-card"><div class="settings-icon">${icon('sound')}</div><div><span class="eyebrow">TRILHA SONORA E EFEITOS</span><h3>Som do laboratório</h3><p>Pequenas melodias instrumentais são geradas no aparelho. Cada modo escolhe uma sequência diferente ao iniciar.</p></div></div><div class="setting-row"><div><b>Áudio</b><small>Músicas e efeitos de acerto/erro</small></div><button class="toggle-switch ${soundOn ? 'enabled' : ''}" data-action="toggle-sound"><span></span></button></div><div class="setting-row volume-setting"><div><b>Volume</b><small>Volume geral: ${Math.round(volume * 100)}%</small></div><input type="range" min="0" max="1" step="0.05" value="${volume}" data-volume/></div><div class="settings-card secondary"><div class="settings-icon">${icon('info')}</div><div><span class="eyebrow">SOBRE O CONTEÚDO</span><h3>Baseado no livro enviado</h3><p>Capítulo 12 do livro do aluno, páginas fotografadas 43–57 e 59. A página 58 não estava no arquivo recebido.</p></div></div><div class="settings-card secondary"><div class="settings-icon">${icon('leaf')}</div><div><span class="eyebrow">PRIVACIDADE</span><h3>Sem conta e sem coleta de dados</h3><p>Seu progresso e o controle de volume são guardados apenas no armazenamento local do dispositivo.</p></div></div><div class="settings-card secondary"><div class="settings-icon">${icon('info')}</div><div><span class="eyebrow">IMAGENS DO RESUMO</span><h3>Fontes e licenças</h3><p>As fotografias externas são atribuídas aos autores e às licenças Creative Commons na legenda e no arquivo de créditos.</p><a class="credits-link" href="/credits.txt" target="_blank" rel="noreferrer">Consultar créditos e originais →</a></div></div><div class="setting-bottom"><span>CiênciasMica · versão 1.0.0</span><button class="text-button" data-action="home">Voltar ao início</button></div></div>`;
}
function toast(message: string) {
  const existing = document.querySelector('.toast-message'); existing?.remove();
  const el = document.createElement('div'); el.className = 'toast-message'; el.textContent = message; document.body.append(el);
  window.setTimeout(() => el.remove(), 2700);
}
function saveProgress() { localStorage.setItem('cm-progress', JSON.stringify(progress)); }

// Interações centralizadas por delegação: os botões continuam consistentes após cada renderização.
root.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const actionEl = target.closest<HTMLElement>('[data-action]');
  if (actionEl) {
    const action = actionEl.dataset.action!;
    switch (action) {
      case 'home': navHome(); break;
      case 'summary': currentSection = studySections[0].id; setScreen('summary'); break;
      case 'games': setScreen('games'); break;
      case 'difficulty': setScreen('difficulty'); break;
      case 'progress': setScreen('progress'); break;
      case 'settings': setScreen('settings'); break;
      case 'memory': memoryStart(); setScreen('memory'); break;
      case 'match': setupMatch('match'); setScreen('match'); break;
      case 'relations': setupMatch('relations'); setScreen('relations'); break;
      case 'columns': setupMatch('columns'); setScreen('columns'); break;
      case 'truefalse': resetTF(); setScreen('truefalse'); break;
      case 'wordsearch': wordStartGame(); setScreen('wordsearch'); break;
      case 'crossword': crosswordValues = {}; setScreen('crossword'); break;
      case 'summary-next': { const idx = studySections.findIndex(s => s.id === currentSection); currentSection = studySections[(idx + 1) % studySections.length].id; render(); break; }
      case 'summary-prev': { const idx = studySections.findIndex(s => s.id === currentSection); currentSection = studySections[Math.max(0, idx - 1)].id; render(); break; }
      case 'hint': if (quiz && !quiz.answered) { quiz.hint = true; sfx('tap'); render(); } break;
      case 'skip': skipQuestion(); break;
      case 'next-question': nextQuestion(); break;
      case 'sound-panel': soundPanel = !soundPanel; render(); break;
      case 'toggle-sound': soundOn = !soundOn; localStorage.setItem('cm-sound', String(soundOn)); if (!soundOn) stopMusic(); else startMusic(lastScene); render(); break;
      case 'memory-reset': memoryStart(); render(); break;
      case 'match-reset': setupMatch('match'); render(); break;
      case 'relations-reset': setupMatch('relations'); render(); break;
      case 'columns-reset': setupMatch('columns'); render(); break;
      case 'tf-reset': resetTF(); break;
      case 'word-reset': wordStartGame(); render(); break;
      case 'cross-reset': crosswordValues = {}; render(); break;
      case 'check-crossword': { const map = crosswordMap(); const all = [...map].every(([k, v]) => normalize(crosswordValues[k] || '') === v); if (all) { sfx('complete'); toast('Perfeito! Todas as palavras estão corretas.'); } else { sfx('wrong'); toast('Ainda há letras para corrigir. Confira as pistas.'); } break; }
      case 'progress-reset': progress = { best: 0, completed: 0, correct: 0, games: 0, lastScore: 0 }; saveProgress(); render(); break;
    }
    return;
  }
  const section = target.closest<HTMLElement>('[data-section]');
  if (section) { currentSection = section.dataset.section!; sfx('tap'); render(); return; }
  const lvl = target.closest<HTMLElement>('[data-level]');
  if (lvl) { startQuiz(lvl.dataset.level as Level); return; }
  const answer = target.closest<HTMLElement>('[data-answer]');
  if (answer && !answer.hasAttribute('disabled')) { answerQuiz(Number(answer.dataset.answer)); return; }
  const mem = target.closest<HTMLElement>('[data-memory]');
  if (mem) { chooseMemory(Number(mem.dataset.memory)); return; }
  const left = target.closest<HTMLElement>('[data-left]');
  if (left) { chooseMatch('left', left.dataset.left!); return; }
  const right = target.closest<HTMLElement>('[data-right]');
  if (right) { chooseMatch('right', right.dataset.right!); return; }
  const tf = target.closest<HTMLElement>('[data-tf]');
  if (tf) { answerTF(tf.dataset.tf === 'true'); return; }
  const cell = target.closest<HTMLElement>('[data-cell]');
  if (cell) { const [r, c] = cell.dataset.cell!.split('-').map(Number); selectWordCell(r, c); return; }
});
root.addEventListener('input', event => {
  const target = event.target as HTMLInputElement;
  if (target.matches('[data-volume]')) {
    volume = Number(target.value); localStorage.setItem('cm-volume', String(volume));
    document.querySelectorAll('.volume-row b').forEach(el => el.textContent = `${Math.round(volume * 100)}%`);
    document.querySelectorAll('.volume-setting small').forEach(el => el.textContent = `Volume geral: ${Math.round(volume * 100)}%`);
    if (volume === 0) stopMusic(); else if (soundOn && !musicTimer) startMusic(lastScene);
  }
  if (target.matches('[data-cross]')) {
    const key = target.dataset.cross!; const val = normalize(target.value).slice(0, 1); target.value = val;
    if (val) crosswordValues[key] = val; else delete crosswordValues[key];
    target.classList.toggle('filled', !!val);
  }
});
root.addEventListener('change', event => {
  const target = event.target as HTMLInputElement;
  if (target.matches('[data-volume]')) { if (volume > 0 && soundOn) startMusic(lastScene); }
});
root.addEventListener('keydown', event => {
  const target = event.target as HTMLInputElement;
  if (target.matches('[data-cross]') && event.key.length === 1 && /[a-zA-Z]/.test(event.key)) {
    const cells = [...root.querySelectorAll<HTMLInputElement>('[data-cross]')]; const index = cells.indexOf(target);
    window.setTimeout(() => { if (target.value && cells[index + 1]) cells[index + 1].focus(); }, 0);
  }
});

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => undefined));
}
render();

const bootSplash = document.querySelector<HTMLElement>('#boot-splash');
if (bootSplash) { window.setTimeout(() => bootSplash.classList.add('leaving'), 780); window.setTimeout(() => bootSplash.remove(), 1320); }
