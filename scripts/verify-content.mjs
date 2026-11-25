import { questions, studySections, trueFalseItems, memoryPairs, matchPairs, relationPairs, columnsPairs, wordSearchWords } from '../src/content.ts';

const fail = (message) => { console.error(`FAIL: ${message}`); process.exitCode = 1; };
const assert = (condition, message) => { if (!condition) fail(message); };

assert(questions.length === 60, `expected 60 quiz questions; got ${questions.length}`);
assert(new Set(questions.map(q => q.id)).size === questions.length, 'question IDs must be unique');
for (const q of questions) {
  assert(q.options.length === 4, `question ${q.id} must have four choices`);
  assert(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < q.options.length, `question ${q.id} has invalid correct answer index`);
  assert(q.question.trim().length > 12, `question ${q.id} has missing prompt`);
  assert(q.explanation.trim().length > 10, `question ${q.id} has missing explanation`);
}
assert(studySections.length === 14, `expected 14 study sections; got ${studySections.length}`);
assert(trueFalseItems.length === 16, `expected 16 true/false statements; got ${trueFalseItems.length}`);
assert(memoryPairs.length === 12, `expected 12 memory pairs; got ${memoryPairs.length}`);
assert(matchPairs.length === 8, `expected 8 question/answer pairs; got ${matchPairs.length}`);
assert(relationPairs.length === 10, `expected 10 word relation pairs; got ${relationPairs.length}`);
assert(columnsPairs.length === 10, `expected 10 column relations; got ${columnsPairs.length}`);
assert(wordSearchWords.length === 8, `expected 8 word-search terms; got ${wordSearchWords.length}`);
assert(studySections.some(s => s.id === 'psicoativas'), 'psychotropic substances topic missing');
assert(studySections.some(s => s.id === 'descarte'), 'medicine disposal topic missing');
assert(studySections.every(s => s.page), 'every study section should cite the printed page(s)');

if (!process.exitCode) console.log(`OK: ${questions.length} quiz questions, ${studySections.length} study topics, and all game datasets passed content checks.`);
