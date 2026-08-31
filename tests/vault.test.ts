import { describe, expect, it } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';

function markdownFiles(root: string): string[] {
  return readdirSync(root, { withFileTypes: true }).flatMap((entry) => {
    const path = join(root, entry.name);
    if (entry.name === '.obsidian') return [];
    return entry.isDirectory() ? markdownFiles(path) : extname(path) === '.md' ? [path] : [];
  });
}

describe('Obsidian vault', () => {
  const vault = resolve(import.meta.dirname, '..', 'vault');
  const files = markdownFiles(vault);
  const noteNames = new Set(files.map((file) => basename(file, '.md')));

  it('содержит карты 18 глав и 80 коротких конспектов', () => {
    expect(files).toHaveLength(101);
    expect(files.filter((file) => basename(file).startsWith('Глава '))).toHaveLength(18);
    expect(files.filter((file) => basename(file).startsWith('§ '))).toHaveLength(80);
  });

  it('не содержит битых wiki-ссылок', () => {
    const broken: string[] = [];
    for (const file of files) {
      const content = readFileSync(file, 'utf8');
      for (const match of content.matchAll(/\[\[([^\]]+)\]\]/g)) {
        const target = match[1].split('|')[0].split('#')[0].trim();
        if (target && !noteNames.has(target)) broken.push(`${basename(file)} → ${target}`);
      }
    }
    expect(broken).toEqual([]);
  });

  it('упакован для скачивания из веб-книги', () => {
    const archive = resolve(import.meta.dirname, '..', 'public', 'continuum-obsidian-vault.zip');
    expect(statSync(archive).size).toBeGreaterThan(100_000);
  });
});
