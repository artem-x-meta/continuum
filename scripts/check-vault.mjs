import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const projectRoot = resolve(import.meta.dirname, '..');
const temporaryRoot = mkdtempSync(join(tmpdir(), 'continuum-vault-check-'));

function filesBelow(root) {
  const files = [];
  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) visit(path);
      else files.push(relative(root, path).replaceAll('\\', '/'));
    }
  };
  visit(root);
  return files.sort();
}

try {
  execFileSync(process.execPath, [resolve(projectRoot, 'scripts', 'build-vault.mjs')], {
    cwd: projectRoot,
    env: { ...process.env, VAULT_OUTPUT_ROOT: temporaryRoot },
    stdio: 'pipe',
  });

  const expectedVault = resolve(temporaryRoot, 'vault');
  const committedVault = resolve(projectRoot, 'vault');
  const expectedFiles = filesBelow(expectedVault);
  const committedFiles = filesBelow(committedVault);
  if (JSON.stringify(expectedFiles) !== JSON.stringify(committedFiles)) {
    throw new Error('Generated vault file list differs from the committed vault. Run npm run vault.');
  }
  for (const file of expectedFiles) {
    if (!readFileSync(resolve(expectedVault, file)).equals(readFileSync(resolve(committedVault, file)))) {
      throw new Error(`Generated note differs from committed content: ${file}. Run npm run vault.`);
    }
  }

  const expectedArchive = readFileSync(resolve(temporaryRoot, 'public', 'continuum-obsidian-vault.zip'));
  const committedArchive = readFileSync(resolve(projectRoot, 'public', 'continuum-obsidian-vault.zip'));
  if (!expectedArchive.equals(committedArchive)) {
    throw new Error('Generated vault archive differs from the committed ZIP. Run npm run vault.');
  }

  console.log(`Vault is synchronized and reproducible: ${expectedFiles.length} files.`);
} finally {
  rmSync(temporaryRoot, { recursive: true, force: true });
}
