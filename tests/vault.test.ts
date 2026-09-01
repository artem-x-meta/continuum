import { describe, expect, it } from 'vitest';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';

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

  it('генерируется детерминированно', () => {
    const projectRoot = resolve(import.meta.dirname, '..');
    const generator = resolve(projectRoot, 'scripts', 'build-vault.mjs');
    const outputRoot = mkdtempSync(join(tmpdir(), 'continuum-vault-test-'));
    const archive = resolve(outputRoot, 'public', 'continuum-obsidian-vault.zip');
    const digest = () => createHash('sha256').update(readFileSync(archive)).digest('hex');

    try {
      const options = (timezone: string) => ({ cwd: projectRoot, stdio: 'pipe' as const, env: { ...process.env, TZ: timezone, VAULT_OUTPUT_ROOT: outputRoot } });
      execFileSync(process.execPath, [generator], options('UTC'));
      const first = digest();
      execFileSync(process.execPath, [generator], options('Asia/Yekaterinburg'));
      expect(digest()).toBe(first);
    } finally {
      rmSync(outputRoot, { recursive: true, force: true });
    }
  });

  it('удаляет устаревшие сгенерированные файлы', () => {
    const projectRoot = resolve(import.meta.dirname, '..');
    const generator = resolve(projectRoot, 'scripts', 'build-vault.mjs');
    const outputRoot = mkdtempSync(join(tmpdir(), 'continuum-vault-stale-test-'));
    const staleDirectory = resolve(outputRoot, 'vault');
    const staleFile = resolve(staleDirectory, 'stale-note.md');
    try {
      mkdirSync(staleDirectory, { recursive: true });
      writeFileSync(staleFile, 'stale', 'utf8');
      execFileSync(process.execPath, [generator], {
        cwd: projectRoot,
        stdio: 'pipe',
        env: { ...process.env, VAULT_OUTPUT_ROOT: outputRoot },
      });
      expect(existsSync(staleFile)).toBe(false);
    } finally {
      rmSync(outputRoot, { recursive: true, force: true });
    }
  });
});
