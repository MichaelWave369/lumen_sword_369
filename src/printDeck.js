function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export function printSwordDeck(cards) {
  const cardHtml = cards.map((card, index) => `
    <article class="card front">
      <p class="eyebrow">LumenSword369 · Card ${index + 1}</p>
      <h2>${escapeHtml(card.pattern)}</h2>
      <p class="label">Sheathed sword sentence</p>
      <p>${escapeHtml(card.sentence)}</p>
      <p class="label">Purpose</p>
      <p>${escapeHtml(card.purpose)}</p>
      <p class="label">Reflection prompt</p>
      <p>${escapeHtml(card.prompt)}</p>
    </article>
    <article class="card back">
      <div class="sigil">LS369</div>
      <h2>The sword cuts fog, not people.</h2>
      <p>Truth · Mercy · Consent · Possibility</p>
      <div class="steps">
        <span>Validate</span>
        <span>Empower</span>
        <span>Clarify</span>
        <span>Invite</span>
      </div>
      <p class="small">Use language to strengthen agency, never to override it.</p>
    </article>
  `).join('')

  const html = `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>LumenSword369 Printable Card Deck</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 24px; color: #1e1b16; background: #f6f0e6; }
    h1 { margin: 0 0 8px; }
    .intro { margin-bottom: 18px; color: #62584a; }
    .deck { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
    .card { border: 1px solid #ded2bd; border-radius: 18px; padding: 18px; min-height: 315px; page-break-inside: avoid; background: #fff9ed; position: relative; overflow: hidden; }
    .back { display: grid; place-items: center; text-align: center; background: radial-gradient(circle at top left, #ffe8ad, transparent 55%), radial-gradient(circle at bottom right, #d8e2ff, transparent 55%), #fff9ed; }
    .back:before { content: ''; position: absolute; inset: 14px; border: 1px dashed #b88a2e; border-radius: 14px; pointer-events: none; }
    .sigil { width: 88px; height: 88px; border: 2px solid #334f7a; border-radius: 999px; display: grid; place-items: center; font-weight: 800; letter-spacing: 1px; color: #334f7a; background: rgba(255,255,255,.6); }
    .steps { display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; }
    .steps span { border: 1px solid #ded2bd; border-radius: 999px; padding: 6px 9px; background: rgba(255,255,255,.7); font-size: 12px; font-weight: 700; }
    .small { font-size: 12px; color: #62584a; }
    .eyebrow, .label { text-transform: uppercase; letter-spacing: 1.5px; font-size: 11px; font-weight: 700; color: #b88a2e; }
    h2 { margin: 0 0 12px; font-size: 24px; }
    p { line-height: 1.45; }
    @media print {
      body { margin: 12mm; background: white; }
      .deck { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .card { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1>LumenSword369 Printable Card Deck</h1>
  <p class="intro">A sheathed-sword deck for validating, empowering, clarifying, and inviting possibility without coercion. Each front card is followed by a matching card back.</p>
  <section class="deck">${cardHtml}</section>
</body>
</html>`

  const printWindow = window.open('', '_blank')
  if (!printWindow) return
  printWindow.document.write(html)
  printWindow.document.close()
  printWindow.focus()
  printWindow.print()
}
