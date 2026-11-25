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
