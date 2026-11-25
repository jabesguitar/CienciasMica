import { readFileSync, existsSync } from 'node:fs';
const main = readFileSync(new URL('../src/main.ts', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/style.css', import.meta.url), 'utf8');
const sw = readFileSync(new URL('../public/sw.js', import.meta.url), 'utf8');
const failures = [];
const mustContain = (source, token, label) => { if (!source.includes(token)) failures.push(`${label}: missing ${token}`); };

for (const screen of ['home', 'summary', 'games', 'difficulty', 'quiz', 'memory', 'match', 'relations', 'columns', 'truefalse', 'wordsearch', 'crossword', 'progress', 'settings', 'results']) {
  mustContain(main, `screen === '${screen}'`, `screen ${screen}`);
}
for (const action of ['hint', 'skip', 'next-question', 'memory-reset', 'match-reset', 'relations-reset', 'columns-reset', 'tf-reset', 'word-reset', 'cross-reset', 'check-crossword', 'toggle-sound']) {
  mustContain(main, `case '${action}'`, `action ${action}`);
}
mustContain(main, 'const current = quiz.pending.shift()!; quiz.pending.push(current)', 'skip queue');
mustContain(main, 'time: levels[level].time', 'question timer setup');
mustContain(main, 'lives: levels[level].lives', 'difficulty lives');
mustContain(main, 'window.setInterval', 'per-question timer');
mustContain(main, 'window.clearInterval', 'timer cleanup');
mustContain(main, "const palettes: Record<string, number[][]>", 'procedural music themes');
mustContain(main, "const sceneMap: Record<Screen, string>", 'unique music theme by app screen');
mustContain(main, "relations: [[", 'word relations soundtrack');
mustContain(main, "truefalse: [[", 'true/false soundtrack');
mustContain(main, "crossword: [[", 'crossword soundtrack');
mustContain(main, "data-volume", 'volume input');
mustContain(main, 'localStorage.setItem', 'local persistence');
mustContain(main, 'function isNavActive', 'selected navigation tab');
mustContain(main, 'credits.txt', 'image attribution access in app settings');
mustContain(main, 'navigator.serviceWorker.register', 'service worker registration');
mustContain(css, 'env(safe-area-inset-top)', 'safe area top');
mustContain(css, 'env(safe-area-inset-bottom)', 'safe area bottom');
mustContain(css, '@media (max-width:560px)', 'small-screen responsive rules');
mustContain(sw, 'isCommonsImage', 'offline caching for public-domain/CC image host');

if (failures.length) {
  console.error('UI checks failed:\n' + failures.map(x => `- ${x}`).join('\n'));
  process.exit(1);
}
console.log('OK: navigation screens, game actions, quiz timer/skip, audio controls, local progress, responsive/safe-area styles and image cache checks passed.');
