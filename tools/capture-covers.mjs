#!/usr/bin/env node
/*
  capture-covers.mjs — cattura uno screenshot di ogni app e lo salva in
  covers/<slug>.png. La dash di CHOPPER li usa come copertina "in trasparenza"
  di ogni tile (sfondo = "Anteprima").

  NB: va eseguito sul TUO computer (serve un browser e l'accesso a internet);
  nell'ambiente cloud di Claude non è possibile (niente browser / rete bloccata).

  Uso (Node 18+):
    npm i -D playwright
    npx playwright install chromium
    node tools/capture-covers.mjs
    git add covers && git commit -m "feat: copertine app" && git push

  Opzioni (variabili d'ambiente):
    BASE_URL   base degli URL delle app   (default: https://chopper090.github.io/)
    WIDTH      larghezza viewport          (default: 1280)
    HEIGHT     altezza viewport            (default: 832)
    WAIT       attesa ms dopo il load      (default: 2200)
    FULLPAGE   "1" per screenshot a pagina intera (default: viewport)
*/
import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root   = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BASE   = (process.env.BASE_URL || 'https://chopper090.github.io/').replace(/\/+$/, '');
const WIDTH  = +(process.env.WIDTH  || 1280);
const HEIGHT = +(process.env.HEIGHT || 832);
const WAIT   = +(process.env.WAIT   || 2200);
const FULL   = process.env.FULLPAGE === '1';

const data = JSON.parse(readFileSync(resolve(root, 'apps.json'), 'utf8'));
const apps = Array.isArray(data.apps)
  ? data.apps
  : (data.categories || []).flatMap(c => c.apps || []);

mkdirSync(resolve(root, 'covers'), { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: WIDTH, height: HEIGHT },
  deviceScaleFactor: 2,
  colorScheme: 'dark',
});
const page = await ctx.newPage();

let ok = 0, fail = 0;
for (const a of apps) {
  if (!a || !a.slug) continue;
  if (a.soon) { console.log('· skip (in arrivo):', a.slug); continue; }
  const url = `${BASE}/${a.slug}/`;
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(WAIT);
    const out = resolve(root, 'covers', `${a.slug}.png`);
    await page.screenshot({ path: out, fullPage: FULL });
    console.log('✓', a.slug, '→', `covers/${a.slug}.png`);
    ok++;
  } catch (e) {
    console.log('✗', a.slug, '—', e.message);
    fail++;
  }
}

await browser.close();
console.log(`\nFatto: ${ok} ok, ${fail} falliti.`);
console.log('Ora: git add covers && git commit -m "feat: copertine app" && git push');
