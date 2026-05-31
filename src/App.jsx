import { useMemo, useState } from 'react'
import swordSentences from '../data/sword_sentences.json'
import possibilityPatterns from '../data/possibility_patterns.json'

const colors = {
  ink: '#1e1b16',
  softInk: '#62584a',
  gold: '#b88a2e',
  blue: '#334f7a',
  cream: '#f6f0e6',
  paper: '#fff9ed',
  white: '#ffffff',
  border: '#ded2bd'
}

const card = {
  padding: 22,
  border: `1px solid ${colors.border}`,
  borderRadius: 24,
  background: colors.white,
  boxShadow: '0 12px 42px rgba(42, 32, 18, 0.08)'
}

function Eyebrow({ children }) {
  return <p style={{ marginTop: 0, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 800, color: colors.gold }}>{children}</p>
}

export default function App() {
  const [selectedId, setSelectedId] = useState(swordSentences[0].id)
  const [search, setSearch] = useState('')
  const [reflection, setReflection] = useState('I can speak truth with mercy and leave choice intact.')

  const selected = swordSentences.find(item => item.id === selectedId) || swordSentences[0]
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return swordSentences
    return swordSentences.filter(item => [item.sentence, item.pattern, item.purpose, item.prompt].join(' ').toLowerCase().includes(q))
  }, [search])

  return (
    <main style={{ minHeight: '100vh', padding: 24, background: `radial-gradient(circle at top left, #ffe8ad, transparent 360px), radial-gradient(circle at bottom right, #d8e2ff, transparent 420px), ${colors.cream}`, color: colors.ink }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <section style={{ ...card, background: 'rgba(255,249,237,.94)' }}>
          <Eyebrow>LumenSword369 v0.1 · Sheathed sword</Eyebrow>
          <h1 style={{ fontSize: 'clamp(42px, 7vw, 78px)', lineHeight: .95, letterSpacing: '-0.06em', margin: 0 }}>Empowering speech for clearer possibility.</h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, maxWidth: 820, color: colors.softInk }}>
            A humane companion to ConsentMirror369. Where the mirror protects choice, the sword speaks disciplined truth with mercy: it cuts fog, not people.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['Validate', 'Empower', 'Clarify', 'Invite'].map(step => (
              <span key={step} style={{ padding: '8px 12px', borderRadius: 999, border: `1px solid ${colors.border}`, background: colors.white, color: colors.blue, fontWeight: 800 }}>{step}</span>
            ))}
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18, marginTop: 18 }}>
          <div style={card}>
            <Eyebrow>Browse</Eyebrow>
            <h2>The 17 Sheathed Sword Sentences</h2>
            <label style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
              Search empowering sentences
              <input value={search} onChange={event => setSearch(event.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, border: `1px solid ${colors.border}` }} />
            </label>
            <div style={{ display: 'grid', gap: 10 }}>
              {filtered.map(item => (
                <button key={item.id} onClick={() => setSelectedId(item.id)} style={{ textAlign: 'left', padding: 14, borderRadius: 16, border: `1px solid ${colors.border}`, background: item.id === selected.id ? '#f4dfab' : colors.paper, cursor: 'pointer' }}>
                  {item.sentence}
                </button>
              ))}
            </div>
          </div>

          <div style={card}>
            <Eyebrow>Selected sentence</Eyebrow>
            <h2>{selected.sentence}</h2>
            <p><strong>Possibility pattern:</strong> {selected.pattern}</p>
            <p><strong>Purpose:</strong> {selected.purpose}</p>
            <p><strong>Reflection prompt:</strong> {selected.prompt}</p>
            <hr />
            <label style={{ display: 'grid', gap: 8 }}>
              My sheathed-sword reflection
              <textarea value={reflection} onChange={event => setReflection(event.target.value)} rows={4} style={{ width: '100%', padding: 12, borderRadius: 12, border: `1px solid ${colors.border}` }} />
            </label>
          </div>
        </section>

        <section style={{ ...card, marginTop: 18 }}>
          <Eyebrow>Possibility patterns</Eyebrow>
          <h2>Positive influence without coercion</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {possibilityPatterns.map(pattern => (
              <article key={pattern.id} style={{ padding: 16, borderRadius: 18, background: colors.paper, border: `1px solid ${colors.border}` }}>
                <strong>{pattern.name}</strong>
                <p style={{ color: colors.softInk }}>{pattern.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
