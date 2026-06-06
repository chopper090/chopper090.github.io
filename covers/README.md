# covers/

Copertine delle app per la dash di **CHOPPER**.

Quando lo sfondo di un tile è impostato su **Anteprima**, la dash usa la prima
immagine disponibile, in quest'ordine:

1. il campo `cover` dell'app in `apps.json` (se presente) — qualsiasi percorso/URL
2. `covers/<slug>.png` — **questa cartella** (rilevata in automatico)
3. il campo `screenshots` del `manifest.webmanifest` live dell'app
4. anteprima **sintetica** (icona grande + gradiente del colore dell'app)

Quindi basta mettere qui `covers/nemo.png`, `covers/umami.png`, … e quei tile
mostreranno lo screenshot reale in trasparenza.

## Generarle in automatico (consigliato)

Dal **tuo** computer (Node 18+), nella cartella del repo:

```bash
npm i -D playwright
npx playwright install chromium
node tools/capture-covers.mjs
git add covers && git commit -m "feat: copertine app" && git push
```

Lo script apre ogni app elencata in `apps.json` e salva lo screenshot qui.
Per usare URL diversi: `BASE_URL=https://mio-dominio/ node tools/capture-covers.mjs`.

> Nota: la cattura non può girare nell'ambiente cloud di Claude (niente browser
> e rete verso le app bloccata): va lanciata in locale.

## A mano

Trascina un'immagine **`covers/<slug>.png`** (es. `covers/argo.png`) e committala:
comparirà in automatico come copertina di quel tile. Per altri formati o un
percorso diverso, aggiungi il campo `"cover": "covers/argo.jpg"` a quell'app in
`apps.json`.
