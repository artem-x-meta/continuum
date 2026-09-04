import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

const output = resolve(import.meta.dirname, '..', '.screenshots');
const fallbackHosts = ['http://127.0.0.1:4173/', 'http://localhost:4173/'];

// Порт может занять другое приложение (vite preview --strictPort из соседнего
// проекта), поэтому мало достучаться до адреса — надо убедиться, что там мы.
async function servesContinuum(url) {
  try {
    const response = await fetch(url);
    return response.ok && (await response.text()).includes('Continuum');
  } catch {
    return false;
  }
}

async function resolveBaseUrl() {
  if (process.env.VISUAL_BASE_URL) return process.env.VISUAL_BASE_URL;
  for (const candidate of fallbackHosts) {
    if (await servesContinuum(candidate)) return candidate;
  }
  throw new Error(
    `Continuum не отвечает ни на одном из адресов: ${fallbackHosts.join(', ')}. `
    + 'Запусти npm run preview или укажи VISUAL_BASE_URL.',
  );
}

const baseUrl = await resolveBaseUrl();
await mkdir(output, { recursive: true });

const browserCandidates = [
  process.env.BROWSER_EXECUTABLE,
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/microsoft-edge',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
].filter(Boolean);
const executablePath = browserCandidates.find((candidate) => existsSync(candidate));
if (!executablePath) {
  throw new Error('No supported browser found. Set BROWSER_EXECUTABLE to a Chrome, Chromium, or Edge executable.');
}

const browser = await chromium.launch({
  executablePath,
  headless: true,
});

const checks = [
  { name: 'home-desktop-ru', url: '#/ru/', viewport: { width: 1440, height: 1050 } },
  { name: 'home-mobile-ru', url: '#/ru/', viewport: { width: 390, height: 844 } },
  { name: 'home-mobile-320-ru', url: '#/ru/', viewport: { width: 320, height: 760 } },
  { name: 'home-dark-en', url: '#/en/', viewport: { width: 1280, height: 900 }, colorScheme: 'dark', action: 'dark-contrast' },
  { name: 'lesson-desktop-ru', url: '#/ru/section/1', viewport: { width: 1440, height: 1100 } },
  { name: 'lesson-generic-en', url: '#/en/section/48', viewport: { width: 1100, height: 900 }, action: 'generic' },
  { name: 'lesson-mobile-320-ru', url: '#/ru/section/48', viewport: { width: 320, height: 760 } },
  { name: 'catalog-tablet-en', url: '#/en/catalog', viewport: { width: 820, height: 1050 }, action: 'tablet-menu' },
  { name: 'labs-mobile-en', url: '#/en/labs', viewport: { width: 390, height: 844 }, action: 'labs' },
  { name: 'chapter-mobile-en', url: '#/en/chapter/4', viewport: { width: 390, height: 844 }, action: 'chapter-menu' },
];

for (const check of checks) {
  const page = await browser.newPage({ viewport: check.viewport, colorScheme: check.colorScheme ?? 'light' });
  await page.goto(`${baseUrl}${check.url}`, { waitUntil: 'networkidle' });
  if (check.action === 'generic') {
    await page.locator('.term-explorer__tabs button').nth(1).click();
    await page.locator('.step-example > button').click();
    await page.locator('.step-example').scrollIntoViewIfNeeded();
  }
  if (check.action === 'chapter-menu') {
    await page.locator('.chapter-mobile-toc').click();
    await page.waitForTimeout(300);
    if (!(await page.locator('.book-sidebar').getAttribute('class'))?.includes('book-sidebar--mobile-open')) {
      throw new Error('Chapter mobile contents did not open');
    }
    if (await page.locator('body').evaluate((body) => getComputedStyle(body).overflow) !== 'hidden') {
      throw new Error('Chapter mobile contents did not lock background scrolling');
    }
    await page.locator('.sidebar-close').click();
    await page.waitForTimeout(250);
    if ((await page.locator('.book-sidebar').getAttribute('class'))?.includes('book-sidebar--mobile-open')) {
      throw new Error('Chapter mobile contents did not close');
    }
  }
  if (check.action === 'tablet-menu') {
    const menu = page.locator('.mobile-menu-button');
    if (await menu.evaluate((element) => getComputedStyle(element).display) === 'none') throw new Error('Tablet navigation trigger is hidden');
    await menu.click();
    if (!await page.locator('.mobile-nav').count()) throw new Error('Tablet navigation did not open');
    await page.keyboard.press('Escape');
    if (await page.locator('.mobile-nav').count()) throw new Error('Tablet navigation did not close on Escape');
  }
  if (check.action === 'labs') {
    const matrixInput = page.locator('.lab--matrix input[type="number"]').first();
    await matrixInput.fill('99');
    if (await matrixInput.getAttribute('aria-invalid') !== 'true') throw new Error('Matrix validation did not reject an out-of-range value');
    await page.locator('.lab--matrix .icon-button').click();
    const derivativeRanges = page.locator('.lab--derivative input[type="range"]');
    await derivativeRanges.nth(0).fill('2.2');
    if (Number(await derivativeRanges.nth(1).getAttribute('max')) > 1.0001) throw new Error('Derivative h range lets point B leave the graph');
    await derivativeRanges.nth(1).fill('1');
    const pointB = await page.locator('.lab--derivative .graph-point--b').evaluate((element) => ({
      x: Number(element.getAttribute('cx')),
      y: Number(element.getAttribute('cy')),
    }));
    if (pointB.x < 0 || pointB.x > 640 || pointB.y < 0 || pointB.y > 330) throw new Error(`Derivative point B is outside the viewport: ${JSON.stringify(pointB)}`);
  }
  if (check.action === 'dark-contrast') {
    const contrasts = await page.evaluate(() => {
      const luminance = (color) => {
        const rgb = color.match(/[\d.]+/g).slice(0, 3).map(Number).map((channel) => {
          const value = channel / 255;
          return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
        });
        return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
      };
      const ratio = (foregroundElement, backgroundElement = foregroundElement) => {
        const foreground = luminance(getComputedStyle(foregroundElement).color);
        const background = luminance(getComputedStyle(backgroundElement).backgroundColor);
        return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
      };
      return {
        language: ratio(document.querySelector('.language-switch .is-active')),
        knowledge: ratio(document.querySelector('.knowledge-card__copy'), document.querySelector('.knowledge-card')),
      };
    });
    if (contrasts.language < 4.5 || contrasts.knowledge < 4.5) throw new Error(`Dark contrast regression: ${JSON.stringify(contrasts)}`);
  }
  await page.screenshot({ path: resolve(output, `${check.name}.png`), fullPage: false });
  const metrics = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  if (metrics.scrollWidth > metrics.width) {
    throw new Error(`${check.name}: горизонтальное переполнение ${metrics.scrollWidth - metrics.width}px`);
  }
  await page.close();
}

const firstVisitPage = await browser.newPage({ viewport: { width: 1000, height: 760 }, locale: 'en-US', colorScheme: 'light' });
await firstVisitPage.goto(baseUrl, { waitUntil: 'networkidle' });
const firstCatalogHref = await firstVisitPage.locator('.topbar__nav a').first().getAttribute('href');
if (!firstCatalogHref?.startsWith('#/en/')) throw new Error(`First English visit produced a wrong link: ${firstCatalogHref}`);
await firstVisitPage.close();

const interactionPage = await browser.newPage({ viewport: { width: 1100, height: 850 }, colorScheme: 'light' });
await interactionPage.goto(`${baseUrl}#/ru/`, { waitUntil: 'networkidle' });
await interactionPage.locator('.language-switch button', { hasText: 'EN' }).click();
await interactionPage.waitForURL(/#\/en\/$/);
if (await interactionPage.locator('html').getAttribute('lang') !== 'en') throw new Error('HTML lang did not switch to English');
const homeMatrixInput = interactionPage.locator('.showcase-lab .lab--matrix input[type="number"]').first();
await homeMatrixInput.fill('2');
await interactionPage.getByRole('tab', { name: /Derivative/ }).click();
await interactionPage.getByRole('tab', { name: /Matrices/ }).click();
if (await homeMatrixInput.inputValue() !== '2') throw new Error('Home laboratory state was lost when switching tabs');
await interactionPage.keyboard.press('Control+K');
if (await interactionPage.locator('.topbar').getAttribute('inert') === null) throw new Error('Search modal did not make background inert');
await interactionPage.locator('.search-panel__input input').fill('instantaneous velocity');
const fullTextHref = await interactionPage.locator('.search-results a').first().getAttribute('href');
if (!fullTextHref?.endsWith('/section/20')) throw new Error(`Full-text search did not find derivative content: ${fullTextHref}`);
await interactionPage.keyboard.press('Escape');
if (await interactionPage.locator('.topbar').getAttribute('inert') !== null) throw new Error('Search modal did not restore background interactivity');
await interactionPage.keyboard.press('Control+K');
await interactionPage.locator('.search-panel__input input').fill('Stokes');
await interactionPage.locator('.search-panel__input input').press('Enter');
await interactionPage.waitForURL(/#\/en\/section\/(58|71)/);
await interactionPage.goto(`${baseUrl}#/en/section/1`, { waitUntil: 'networkidle' });
await interactionPage.locator('.lesson-finish > button').click();
await interactionPage.locator('button[aria-label="Add bookmark"]').click();
const completed = await interactionPage.evaluate(() => JSON.parse(localStorage.getItem('continuum:completed') ?? '[]'));
if (!completed.includes(1)) throw new Error('Прогресс параграфа не сохранился');
await interactionPage.reload({ waitUntil: 'networkidle' });
if (!await interactionPage.locator('button[aria-label="Remove bookmark"][aria-pressed="true"]').count()) throw new Error('Bookmark did not persist after reload');
await interactionPage.locator('.language-switch button', { hasText: 'RU' }).click();
await interactionPage.waitForURL(/#\/ru\/section\/1$/);
const retained = await interactionPage.evaluate(() => JSON.parse(localStorage.getItem('continuum:completed') ?? '[]'));
if (!retained.includes(1)) throw new Error('Progress was lost when switching languages');
const quickCheck = interactionPage.locator('.quick-check');
await quickCheck.scrollIntoViewIfNeeded();
await quickCheck.locator('[role="radio"]').first().click();
if (!await quickCheck.locator('.quick-check__feedback.is-wrong').count()) throw new Error('Wrong quiz answer did not show feedback');
await quickCheck.locator('.quick-check__retry').click();
await quickCheck.locator('[role="radio"]').nth(1).click();
if (!await quickCheck.locator('.quick-check__feedback.is-correct').count()) throw new Error('Correct quiz answer did not show feedback');
await interactionPage.goto(`${baseUrl}#/en/catalog`, { waitUntil: 'networkidle' });
await interactionPage.locator('.catalog-search input').fill('Lagrange remainder');
if (await interactionPage.locator('.catalog-chapter__sections a').count() !== 1) throw new Error('Catalog search did not filter at section level');
await interactionPage.close();

await browser.close();
console.log(`Визуальные проверки готовы: ${checks.length} RU/EN viewport-сценариев; язык, поиск и прогресс работают.`);
