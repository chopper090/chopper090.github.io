# CLAUDE.md — CHOPPER (launcher hub)

**Scopo.** **Launcher PWA** del workspace: un'unica home (dashboard bento personalizzabile) verso
tutte le mini-app indipendenti (Nemo, Lucille, Umami, Cambusa, Carta, DaLentini, Argo, Glaido…).
Ogni sub-app resta autonoma (proprio manifest, SW, build, versioning).

**Stack.** HTML **vanilla single-file** + CSS (custom properties, grid, dual theme) + vanilla JS.
PWA completa (manifest, SW network-first, anti-FOUC, maskable icon). Zero dipendenze (solo Google Fonts).

**Mappa file.** `index.html` (dashboard), `app.html` (frame container sub-app), `apps.json`
(**sorgente dati**: slug + categoria + size; nome/icona/colore letti dai manifest live),
`sw.js`, `covers/` (screenshot fallback), `tools/capture-covers.mjs` (Playwright, dev-only),
icone + `apple-touch-icon`, `.well-known/assetlinks.json` (deep-link Android APK Argo).

**Categorie attuali** (`apps.json`): **Musica** (nemo, lucille) · **Cucina** (umami, cambusa,
carta, dalentini, DaLentini_WEB) · **Strumenti** (argo, glaido). *Gmail resta fuori: CLI privata.*

**Come si edita.** **Aggiungere un'app = una riga in `apps.json`** (slug + categoria + size). Il
resto (nome, icona, colore) è auto-letto dal `manifest.webmanifest` live dell'app → l'hub non si
tocca per modifiche interne alle app. `size`: hero (2x2) · wide (2x1) · tall (1x2) · sm (1x1).

**Gotcha.** Lo slug deve combaciare con lo slug di GitHub Pages. Dopo un rename repo, l'URL
Pages **non** redirige (vecchio slug → 404): aggiornare qui. `.ico` ridondanti con i `.png`.

**Deploy.** È `chopper090.github.io` (root del dominio Pages). Versionare con `_scripts\Publish-Project.ps1`.
