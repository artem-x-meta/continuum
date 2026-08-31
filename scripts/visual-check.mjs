import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';

const output = resolve(import.meta.dirname, '..', '.screenshots');
const baseUrl = process.env.VISUAL_BASE_URL ?? 'http://127.0.0.1:4173/';
await mkdir(output, { recursive: true });

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  headless: true,
});

const checks = [
  { name: 'home-desktop-ru', url: '#/ru/', viewport: { width: 1440, height: 1050 } },
  { name: 'home-mobile-ru', url: '#/ru/', viewport: { width: 390, height: 844 } },
  { name: 'home-dark-en', url: '#/en/', viewport: { width: 1280, height: 900 }, colorScheme: 'dark' },
  { name: 'lesson-desktop-ru', url: '#/ru/section/1', viewport: { width: 1440, height: 1100 } },
  { name: 'lesson-generic-en', url: '#/en/section/48', viewport: { width: 1100, height: 900 }, action: 'generic' },
  { name: 'catalog-tablet-en', url: '#/en/catalog', viewport: { width: 820, height: 1050 } },
  { name: 'labs-mobile-en', url: '#/en/labs', viewport: { width: 390, height: 844 } },
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
await interactionPage.keyboard.press('Control+K');
await interactionPage.locator('.search-panel__input input').fill('Stokes');
await interactionPage.locator('.search-panel__input input').press('Enter');
await interactionPage.waitForURL(/#\/en\/section\/(58|71)/);
await interactionPage.goto(`${baseUrl}#/en/section/1`, { waitUntil: 'networkidle' });
await interactionPage.locator('.lesson-finish > button').click();
const completed = await interactionPage.evaluate(() => JSON.parse(localStorage.getItem('continuum:completed') ?? '[]'));
if (!completed.includes(1)) throw new Error('Прогресс параграфа не сохранился');
await interactionPage.locator('.language-switch button', { hasText: 'RU' }).click();
await interactionPage.waitForURL(/#\/ru\/section\/1$/);
const retained = await interactionPage.evaluate(() => JSON.parse(localStorage.getItem('continuum:completed') ?? '[]'));
if (!retained.includes(1)) throw new Error('Progress was lost when switching languages');
await interactionPage.close();

await browser.close();
console.log(`Визуальные проверки готовы: ${checks.length} RU/EN viewport-сценариев; язык, поиск и прогресс работают.`);
