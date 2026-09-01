import { readFileSync, readdirSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { zipSync } from 'fflate';

const sourceRoot = resolve(import.meta.dirname, '..');
const outputRoot = process.env.VAULT_OUTPUT_ROOT ? resolve(process.env.VAULT_OUTPUT_ROOT) : sourceRoot;
const vaultRoot = join(outputRoot, 'vault');
const tocSource = readFileSync(join(sourceRoot, 'oglavlenie-vysshaya-matematika.md'), 'utf8');

function loadGuides(fileName, variableName) {
  const source = readFileSync(join(sourceRoot, 'src', 'data', fileName), 'utf8');
  const marker = source.indexOf('= {');
  if (marker < 0) throw new Error(`Не найден объект в ${fileName}`);
  const literal = source.slice(marker + 2).replace(/;\s*$/, '').trim();
  return runInNewContext(`(${literal})`, Object.create(null), { timeout: 1000, filename: fileName });
}

const guides = {
  ...loadGuides('guides-1.ts', 'sectionGuides1'),
  ...loadGuides('guides-2.ts', 'sectionGuides2'),
  ...loadGuides('guides-3.ts', 'sectionGuides3'),
};

const romanValues = { I: 1, V: 5, X: 10, L: 50, C: 100 };
function romanToNumber(roman) {
  return [...roman].reduce((sum, letter, index, letters) => {
    const current = romanValues[letter] ?? 0;
    const next = romanValues[letters[index + 1]] ?? 0;
    return sum + (current < next ? -current : current);
  }, 0);
}

function splitPage(value) {
  const match = value.trim().match(/^(.*?)\s+—\s+(\d+)$/);
  return match ? [match[1].trim(), Number(match[2])] : [value.trim(), 0];
}

function plain(value) {
  return value
    .replaceAll('$', '')
    .replaceAll('\\to', '→')
    .replaceAll('\\infty', '∞')
    .replaceAll('\\int', '∫')
    .replaceAll('\\pi', 'π')
    .replaceAll('\\sin', 'sin')
    .replaceAll('\\cos', 'cos')
    .replaceAll('\\sqrt', '√')
    .replaceAll('\\cdot', '·')
    .replaceAll('\\,', ' ')
    .replace(/[{}]/g, '');
}

function safeName(value) {
  return plain(value).replace(/[<>:"/\\|?*]/g, '—').replace(/\s+/g, ' ').trim();
}

function parseToc(source) {
  const chapters = [];
  let chapter;
  let section;
  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    const chapterMatch = line.match(/^## Глава ([IVXLC]+)\.\s+(.+)$/);
    if (chapterMatch) {
      chapter = { roman: chapterMatch[1], number: romanToNumber(chapterMatch[1]), title: plain(chapterMatch[2]), sections: [] };
      chapters.push(chapter);
      section = undefined;
      continue;
    }
    const sectionMatch = line.match(/^### §\s+(\d+)\.\s+(.+)$/);
    if (sectionMatch && chapter) {
      const [title, page] = splitPage(sectionMatch[2]);
      section = { number: Number(sectionMatch[1]), title: plain(title), page, topics: [] };
      chapter.sections.push(section);
      continue;
    }
    const topicMatch = line.match(/^-\s+(\d+\.\d+)\.\s+(.+)$/);
    if (topicMatch && section) {
      const [title, page] = splitPage(topicMatch[2]);
      section.topics.push({ number: topicMatch[1], title: plain(title), page });
    }
  }
  return chapters;
}

const chapters = parseToc(tocSource);
const allSections = chapters.flatMap((chapter) => chapter.sections.map((section) => ({ chapter, section })));
const relationGroups = [
  [1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 74, 75, 76, 77],
  [29, 30, 31, 32, 33, 34],
  [35, 36, 37, 38, 39, 40, 41, 42],
  [43, 44, 45, 46, 53, 54],
  [47, 48, 49, 50, 51, 52, 80],
  [55, 56, 57, 58, 69, 70, 71, 72, 73],
  [59, 60, 61, 62, 63, 64, 65],
  [62, 63, 64, 65, 66, 67, 68],
  [78, 79, 80, 47, 49, 50, 51],
];

function relatedNumbers(sectionNumber) {
  const values = new Set();
  for (const group of relationGroups) {
    if (group.includes(sectionNumber)) {
      group
        .filter((number) => number !== sectionNumber)
        .sort((a, b) => Math.abs(a - sectionNumber) - Math.abs(b - sectionNumber))
        .forEach((number) => values.add(number));
    }
  }
  return [...values].slice(0, 4);
}

function write(relativePath, content) {
  const path = join(vaultRoot, relativePath);
  mkdirSync(resolve(path, '..'), { recursive: true });
  writeFileSync(path, `${content.trim()}\n`, 'utf8');
}

function resetGeneratedVault() {
  const expectedVaultRoot = resolve(outputRoot, 'vault');
  const resolvedVaultRoot = resolve(vaultRoot);
  if (resolvedVaultRoot !== expectedVaultRoot || resolvedVaultRoot === resolve(outputRoot)) {
    throw new Error(`Refusing to clear unexpected vault path: ${resolvedVaultRoot}`);
  }
  rmSync(resolvedVaultRoot, { recursive: true, force: true });
  mkdirSync(resolvedVaultRoot, { recursive: true });
}

function sectionFileName(section) {
  return `§ ${String(section.number).padStart(2, '0')} · ${safeName(section.title)}`;
}

function chapterFileName(chapter) {
  return `Глава ${chapter.roman} · ${safeName(chapter.title)}`;
}

const mapLines = chapters.map((chapter) => {
  const first = chapter.sections.at(0)?.number;
  const last = chapter.sections.at(-1)?.number;
  return `- [[${chapterFileName(chapter)}]] — §§ ${first}–${last}`;
}).join('\n');

resetGeneratedVault();

write('00 · Карта высшей математики.md', `
---
aliases:
  - Карта курса
tags:
  - higher-math
  - map
cssclasses:
  - math-map
---

# Карта высшей математики

> [!abstract] Как пользоваться
> Это компактная база для повторения. Глубокие объяснения и интерактивные эксперименты находятся в онлайн-книге, а здесь у каждого параграфа есть главная идея, формула, вопрос и связи.

## Маршрут

${mapLines}

## Быстрый вход

- Алгебра и геометрия: [[${sectionFileName(allSections[0].section)}]]
- Математический анализ: [[${sectionFileName(allSections.find(({ section }) => section.number === 16).section)}]]
- Интегральное исчисление: [[${sectionFileName(allSections.find(({ section }) => section.number === 29).section)}]]
- Дифференциальные уравнения: [[${sectionFileName(allSections.find(({ section }) => section.number === 47).section)}]]
- Ряды и гармоники: [[${sectionFileName(allSections.find(({ section }) => section.number === 59).section)}]]
- Поля и преобразования: [[${sectionFileName(allSections.find(({ section }) => section.number === 69).section)}]]

## Служебные заметки

- [[Как работать с базой]]
- [[Указатель формул]]
`);

write('Как работать с базой.md', `
---
tags: [higher-math, meta]
---

# Как работать с базой

1. Открой [[00 · Карта высшей математики]].
2. Перед занятием прочитай **главную идею** и попробуй ответить на вопрос, не раскрывая ориентир.
3. После занятия допиши собственный пример и свяжи заметку с задачами.
4. В графе Obsidian используй теги \`#chapter/NN\`, чтобы видеть одну главу отдельно.

> [!tip]
> Формулу полезно восстанавливать по смыслу, а не переписывать по памяти. Всегда проговаривай, что означает каждый символ и при каких условиях запись верна.
`);

const formulaIndex = allSections.map(({ section }) => `- [[${sectionFileName(section)}#Опорная формула|§ ${section.number} · ${section.title}]]`).join('\n');
write('Указатель формул.md', `
---
tags: [higher-math, formulas]
---

# Указатель формул

${formulaIndex}
`);

for (const chapter of chapters) {
  const folder = `${String(chapter.number).padStart(2, '0')} · ${safeName(chapter.title)}`;
  const chapterNote = chapterFileName(chapter);
  const sectionLinks = chapter.sections.map((section) => `- [[${sectionFileName(section)}]]${guides[section.number] ? ` — ${guides[section.number].keyIdea}` : ''}`).join('\n');
  const previousChapter = chapters[chapter.number - 2];
  const nextChapter = chapters[chapter.number];
  write(join(folder, `${chapterNote}.md`), `
---
aliases:
  - Глава ${chapter.roman}
tags:
  - higher-math
  - chapter/${String(chapter.number).padStart(2, '0')}
chapter: ${chapter.number}
---

# Глава ${chapter.roman}. ${chapter.title}

> [!summary]
> ${chapter.sections.length} параграфов · §§ ${chapter.sections.at(0)?.number}–${chapter.sections.at(-1)?.number}

## Параграфы

${sectionLinks}

## Навигация

${previousChapter ? `← [[${chapterFileName(previousChapter)}]]` : '← [[00 · Карта высшей математики]]'} · ${nextChapter ? `[[${chapterFileName(nextChapter)}]] →` : '[[00 · Карта высшей математики]] →'}
`);

  for (const section of chapter.sections) {
    const guide = guides[section.number];
    if (!guide) throw new Error(`Нет карточки для § ${section.number}`);
    const index = allSections.findIndex((item) => item.section.number === section.number);
    const previous = allSections[index - 1]?.section;
    const next = allSections[index + 1]?.section;
    const related = relatedNumbers(section.number).map((number) => allSections.find((item) => item.section.number === number)?.section).filter(Boolean);
    const topics = section.topics.length
      ? section.topics.map((topic) => `- **${topic.number}.** ${topic.title}`).join('\n')
      : '- Цельный параграф без внутренних подпунктов.';
    write(join(folder, `${sectionFileName(section)}.md`), `
---
aliases:
  - § ${section.number} ${section.title}
tags:
  - higher-math
  - chapter/${String(chapter.number).padStart(2, '0')}
  - summary
chapter: ${chapter.number}
section: ${section.number}
source_page: ${section.page}
status: ready
---

# § ${section.number}. ${section.title}

> [!abstract] В двух словах
> ${guide.summary}

## Ключевая идея

${guide.keyIdea}

## Опорная формула

$$
${guide.formula}
$$

## Внутри параграфа

${topics}

## Проверь себя

${guide.question}

> [!tip]- Ориентир
> ${guide.keyIdea}

## Связи

- Глава: [[${chapterNote}]]
- Предыдущий параграф: ${previous ? `[[${sectionFileName(previous)}]]` : '—'}
- Следующий параграф: ${next ? `[[${sectionFileName(next)}]]` : '—'}
- По смыслу: ${related.map((item) => `[[${sectionFileName(item)}]]`).join(' · ')}

---

← ${previous ? `[[${sectionFileName(previous)}]]` : '[[00 · Карта высшей математики]]'} · [[00 · Карта высшей математики|Карта]] · ${next ? `[[${sectionFileName(next)}]]` : '[[00 · Карта высшей математики]]'} →
`);
  }
}

write(join('.obsidian', 'app.json'), JSON.stringify({ showLineNumber: false, readableLineLength: true, alwaysUpdateLinks: true, newLinkFormat: 'shortest' }, null, 2));
write(join('.obsidian', 'appearance.json'), JSON.stringify({ baseFontSize: 16, nativeMenus: false, cssTheme: '', enabledCssSnippets: ['continuum'] }, null, 2));
write(join('.obsidian', 'graph.json'), JSON.stringify({ 'collapse-filter': false, search: '-path:".obsidian"', showTags: true, showAttachments: false, showOrphans: false, colorGroups: [{ query: 'tag:#summary', color: { a: 1, rgb: 3894770 } }, { query: 'tag:#map', color: { a: 1, rgb: 15897051 } }] }, null, 2));
write(join('.obsidian', 'snippets', 'continuum.css'), `
body {
  --font-text-theme: Inter, ui-sans-serif, system-ui, sans-serif;
  --font-interface-theme: Inter, ui-sans-serif, system-ui, sans-serif;
  --h1-font: Iowan Old Style, Georgia, serif;
  --h2-font: Iowan Old Style, Georgia, serif;
  --link-color: #3b6df2;
  --link-color-hover: #7856d8;
  --callout-radius: 14px;
}

.markdown-preview-view,
.markdown-source-view.mod-cm6 .cm-scroller {
  --file-line-width: 780px;
}

.markdown-preview-view h1,
.markdown-preview-view h2 {
  letter-spacing: -0.025em;
}

.markdown-preview-view .callout {
  border-width: 1px;
  box-shadow: 0 8px 24px rgb(23 37 54 / 7%);
}

.markdown-preview-view mjx-container[display='true'] {
  padding: 16px;
  overflow-x: auto;
  border: 1px solid var(--background-modifier-border);
  border-radius: 14px;
  background: var(--background-secondary);
}
`);

function collectForZip(directory, prefix = 'Континуум') {
  const entries = {};
  const directoryEntries = readdirSync(directory, { withFileTypes: true })
    .sort((left, right) => left.name < right.name ? -1 : left.name > right.name ? 1 : 0);
  for (const entry of directoryEntries) {
    const absolute = join(directory, entry.name);
    const archivePath = `${prefix}/${entry.name}`.replaceAll('\\', '/');
    if (entry.isDirectory()) Object.assign(entries, collectForZip(absolute, archivePath));
    else entries[archivePath] = new Uint8Array(readFileSync(absolute));
  }
  return entries;
}

const publicRoot = join(outputRoot, 'public');
mkdirSync(publicRoot, { recursive: true });
writeFileSync(
  join(publicRoot, 'continuum-obsidian-vault.zip'),
  zipSync(collectForZip(vaultRoot), { level: 6, mtime: new Date(1980, 0, 1, 0, 0, 0) }),
);

console.log(`Obsidian vault готов: ${chapters.length} глав, ${allSections.length} параграфов, ${allSections.length + chapters.length + 3} заметок и ZIP для скачивания.`);
