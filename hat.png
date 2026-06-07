# HANDOFF — Restyling CHOPPER (look "Wanted")

Pacchetto di file pronti per il commit sul repo **chopper090.github.io**.
Restyling **solo grafico**: nessuna funzione è stata cambiata, solo l'aspetto e
le opzioni grafiche di personalizzazione dei tile. Copia i file nella root del
repo mantenendo la struttura delle cartelle.

## File da SOVRASCRIVERE (esistono già nel repo)
- `index.html`  → dashboard ridisegnata (look Wanted, doppio tema chiaro/scuro)
- `app.html`    → wrapper "torna a CHOPPER" allineato al nuovo stile
- `apps.json`   → nuovo schema layout v3 (vedi sotto). **Retro-compatibile** col vecchio formato.

## File NUOVI da AGGIUNGERE
- `jolly.png`            → emblema/Jolly Roger di Chopper (marchio in testata)
- `hat.png`             → cappello di paglia (accento nel footer)
- `covers/argo.png`
- `covers/umami.png`
- `covers/cambusa.png`
- `covers/dalentini.png`
- `covers/nemo.png`
- `covers/carta.png`
- `covers/lucille.png`
- `covers/DaLentini_WEB.png`

> Le copertine in `covers/<slug>.png` sono gli screenshot delle home delle app,
> usati come sfondo dei tile. Sono mappate per **slug**. Quando rigeneri gli
> screenshot reali con il tuo script, basta sovrascrivere questi PNG: stesso nome = stesso tile.
> Il file `covers/README.md` già presente nel repo resta valido.

## File da NON toccare (restano come sono nel repo)
- `manifest.webmanifest`, `sw.js`, `icon-192.png`, `apple-touch-icon.png`,
  `body.png`, `head.png`, le cartelle delle singole app (`argo/`, `umami/`, …),
  `.well-known/`, ecc.
  (Se nel pacchetto trovi anche body/head/icon, sono identici agli originali: puoi ignorarli.)

## Cosa è cambiato a livello grafico
- Palette avventura: rosso Chopper / blu mare / oro Rumble, base pergamena (chiaro)
  e sea-navy (scuro). Texture kraft di sfondo.
- Tipografia: Bricolage Grotesque (titoli), Hanken Grotesk (corpo), Space Mono (etichette) — via Google Fonts.
- Tile stile "manifesto": doppia cornice interna, sigillo d'angolo a colore app, timbri di categoria.
- Sfondi screenshot responsivi: tile grande = vista ampia, tile piccolo = dettaglio zoomato.
- Mascotte Chopper statica (niente ondeggio); reagisce solo al click con una battuta.
- **Sheet di personalizzazione per-tile potenziata**: forma (vivo/morbido/tondo),
  accento colore, 8 stili di sfondo, intensità, zoom + posizione screenshot,
  effetto al passaggio (solleva/zoom/inclina/bagliore/nessuno), vista contenuto.
- Drag & drop, resize, scelta colonne, toggle animazioni ed export `apps.json` invariati.

## Schema apps.json (v3)
`grid.cols` = numero colonne · `grid.fx` = animazioni on/off.
Per ogni app:
- `x,y` (cella, 0-based) + `w,h` (blocchi)
- `bg`: screenshot | synthetic | mesh | solid | gradient | vignette | pattern | none
- `view`: auto | icon | standard | detail | compact
- `shape`: vivo | morbido | tondo
- `accent`: auto | red | blue | gold | teal | purple
- `zoom`: auto | lontano | medio | vicino
- `pos`: alto | centro | basso
- `hover`: lift | zoom | tilt | glow | none
- `op`: 5–100 (intensità sfondo, opzionale)
- `name/tagline/color/cat` opzionali (auto-letti dal manifest live di ogni app)

Le personalizzazioni fatte dall'utente nel browser vivono in `localStorage`
(`hub.layout.v3`); il pulsante **Esporta** scarica un `apps.json` aggiornato da
committare per renderle il default per tutti.

## Nota
La dash legge i manifest live di ogni app a runtime per nome/icona/descrizione,
quindi i campi in `apps.json` sono solo fallback. Nessuna chiamata esterna,
nessun tracking, nessun cookie. Funziona offline (PWA + service worker invariato).
