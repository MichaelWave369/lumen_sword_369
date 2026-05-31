import { useMemo, useRef, useState } from 'react'
import swordSentences from '../data/sword_sentences.json'
import possibilityPatterns from '../data/possibility_patterns.json'
import scenarios from '../data/scenarios.json'
import builderTemplates from '../data/builder_templates.json'
import { printSwordDeck } from './printDeck.js'

const STORAGE_KEY = 'lumensword369.practice.v1'

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

const buttonPrimary = {
  padding: '10px 14px',
  borderRadius: 12,
  border: `1px solid ${colors.blue}`,
  background: colors.blue,
  color: colors.white,
  cursor: 'pointer'
}

const buttonSoft = {
  padding: '10px 14px',
  borderRadius: 12,
  border: `1px solid ${colors.border}`,
  background: colors.paper,
  color: colors.ink,
  cursor: 'pointer'
}

function Eyebrow({ children }) {
  return <p style={{ marginTop: 0, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 800, color: colors.gold }}>{children}</p>
}

function loadPracticeLog() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function savePracticeLog(items) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function cleanImportedLog(parsed) {
  if (!Array.isArray(parsed)) throw new Error('Import file must contain an array of practice entries.')
  return parsed.map(item => ({
    id: typeof item.id === 'string' ? item.id : crypto.randomUUID(),
    createdAt: typeof item.createdAt === 'string' ? item.createdAt : new Date().toISOString(),
    sentence: typeof item.sentence === 'string' ? item.sentence : '',
    pattern: typeof item.pattern === 'string' ? item.pattern : 'Imported practice',
    reflection: typeof item.reflection === 'string' ? item.reflection : ''
  })).filter(item => item.sentence || item.reflection)
}

function fingerprint(item) {
  return [item.sentence, item.pattern, item.reflection].join('|').toLowerCase().replace(/\s+/g, ' ').trim()
}

function mergeWithoutDuplicates(incoming, existing) {
  const ids = new Set(existing.map(item => item.id).filter(Boolean))
  const prints = new Set(existing.map(fingerprint))
  const unique = []
  let skipped = 0
  for (const item of incoming) {
    const fp = fingerprint(item)
    if ((item.id && ids.has(item.id)) || prints.has(fp)) {
      skipped += 1
      continue
    }
    unique.push(item)
    if (item.id) ids.add(item.id)
    prints.add(fp)
  }
  return { unique, skipped }
}

export default function App() {
  const importInputRef = useRef(null)
  const [selectedId, setSelectedId] = useState(swordSentences[0].id)
  const [scenarioId, setScenarioId] = useState(scenarios[0].id)
  const [templateId, setTemplateId] = useState(builderTemplates[0].id)
  const [search, setSearch] = useState('')
  const [scenarioFilter, setScenarioFilter] = useState('all')
  const [reflection, setReflection] = useState('I can speak truth with mercy and leave choice intact.')
  const [practiceLog, setPracticeLog] = useState(loadPracticeLog)
  const [status, setStatus] = useState('')

  const selected = swordSentences.find(item => item.id === selectedId) || swordSentences[0]
  const selectedScenario = scenarios.find(item => item.id === scenarioId) || scenarios[0]
  const selectedTemplate = builderTemplates.find(item => item.id === templateId) || builderTemplates[0]
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    if (!q) return swordSentences
    return swordSentences.filter(item => [item.sentence, item.pattern, item.purpose, item.prompt].join(' ').toLowerCase().includes(q))
  }, [search])
  const scenarioCategories = useMemo(() => ['all', ...new Set(scenarios.map(item => item.category))], [])
  const visibleScenarios = useMemo(() => {
    if (scenarioFilter === 'all') return scenarios
    return scenarios.filter(item => item.category === scenarioFilter)
  }, [scenarioFilter])

  function savePractice() {
    const entry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      sentence: selected.sentence,
      pattern: selected.pattern,
      reflection: reflection.trim()
    }
    const next = [entry, ...practiceLog]
    setPracticeLog(next)
    savePracticeLog(next)
    setStatus('Practice entry saved locally.')
  }

  function exportPractice() {
    const blob = new Blob([JSON.stringify(practiceLog, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'lumensword369-practice-log.json'
    link.click()
    URL.revokeObjectURL(url)
    setStatus('Practice log exported as JSON.')
  }

  function clearPractice() {
    setPracticeLog([])
    savePracticeLog([])
    setStatus('Local practice log cleared.')
  }

  function handleImport(event) {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || '[]'))
        const cleaned = cleanImportedLog(parsed)
        const { unique, skipped } = mergeWithoutDuplicates(cleaned, practiceLog)
        const next = [...unique, ...practiceLog]
        setPracticeLog(next)
        savePracticeLog(next)
        setStatus(`Imported ${unique.length} entr${unique.length === 1 ? 'y' : 'ies'}. Skipped ${skipped} duplicate${skipped === 1 ? '' : 's'}.`)
      } catch (error) {
        setStatus(error instanceof Error ? error.message : 'Could not import that file.')
      } finally {
        event.target.value = ''
      }
    }
    reader.readAsText(file)
  }

  function loadScenario(item) {
    setScenarioId(item.id)
    setReflection(item.empowering_response)
    const match = swordSentences.find(sentence => sentence.sentence === item.starting_sentence)
    if (match) setSelectedId(match.id)
    setStatus(`Loaded scenario: ${item.title}`)
  }

  function useTemplate() {
    setReflection(selectedTemplate.template)
    setStatus(`Loaded builder template: ${selectedTemplate.label}`)
  }

  return (
    <main style={{ minHeight: '100vh', padding: 24, background: `radial-gradient(circle at top left, #ffe8ad, transparent 360px), radial-gradient(circle at bottom right, #d8e2ff, transparent 420px), ${colors.cream}`, color: colors.ink }}>
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <section style={{ ...card, background: 'rgba(255,249,237,.94)' }}>
          <Eyebrow>LumenSword369 v0.3 · Sheathed sword</Eyebrow>
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

        <section style={{ ...card, marginTop: 18 }}>
          <Eyebrow>Practice scenarios</Eyebrow>
          <h2>Learn through real-life contexts</h2>
          <p style={{ color: colors.softInk }}>Load family, faith, workplace, grief, conflict, or apology scenarios into the sentence practice flow.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
            {scenarioCategories.map(category => (
              <button key={category} onClick={() => setScenarioFilter(category)} style={category === scenarioFilter ? buttonPrimary : buttonSoft} aria-pressed={category === scenarioFilter}>{category}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {visibleScenarios.map(item => (
              <article key={item.id} style={{ padding: 16, borderRadius: 18, background: colors.paper, border: `1px solid ${colors.border}` }}>
                <strong>{item.title}</strong>
                <p style={{ color: colors.softInk }}>{item.situation}</p>
                <p><em>{item.starting_sentence}</em></p>
                <button onClick={() => loadScenario(item)} style={buttonSoft}>Load scenario</button>
              </article>
            ))}
          </div>
        </section>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18, marginTop: 18 }}>
          <div style={card}>
            <Eyebrow>Scenario mirror</Eyebrow>
            <h2>{selectedScenario.title}</h2>
            <p style={{ color: colors.softInk }}>{selectedScenario.situation}</p>
            <p><strong>Starting sentence:</strong> {selectedScenario.starting_sentence}</p>
            <p><strong>Possible patterns:</strong> {selectedScenario.possible_patterns.join(', ')}</p>
            <h3>Reflection questions</h3>
            <ul style={{ lineHeight: 1.8, paddingLeft: 20 }}>
              {selectedScenario.reflection_questions.map(question => <li key={question}>{question}</li>)}
            </ul>
            <p><strong>Empowering response:</strong> {selectedScenario.empowering_response}</p>
          </div>

          <div style={card}>
            <Eyebrow>Guided sentence builder</Eyebrow>
            <h2>Build empowering language</h2>
            <label style={{ display: 'grid', gap: 8 }}>
              Builder tone
              <select value={templateId} onChange={event => setTemplateId(event.target.value)} style={{ width: '100%', padding: 12, borderRadius: 12, border: `1px solid ${colors.border}` }}>
                {builderTemplates.map(template => <option key={template.id} value={template.id}>{template.label}</option>)}
              </select>
            </label>
            <div style={{ padding: 14, borderRadius: 16, background: colors.paper, border: `1px solid ${colors.border}`, marginTop: 12 }}>
              <strong>{selectedTemplate.tone}</strong>
              <p>{selectedTemplate.template}</p>
            </div>
            <button onClick={useTemplate} style={{ ...buttonPrimary, marginTop: 12 }}>Use this sentence</button>
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
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
              <button onClick={savePractice} style={buttonPrimary}>Save practice</button>
              <button onClick={() => printSwordDeck(swordSentences)} style={buttonSoft}>Print / Save PDF deck</button>
            </div>
          </div>
        </section>

        <section style={{ ...card, marginTop: 18 }}>
          <Eyebrow>Local-only practice log</Eyebrow>
          <p style={{ color: colors.softInk }}>Saved only in this browser through local storage. Export, import, or clear it any time.</p>
          <input ref={importInputRef} type="file" accept="application/json,.json" onChange={handleImport} style={{ display: 'none' }} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={exportPractice} disabled={practiceLog.length === 0} style={buttonSoft}>Export JSON</button>
            <button onClick={() => importInputRef.current?.click()} style={buttonSoft}>Import JSON</button>
            <button onClick={clearPractice} disabled={practiceLog.length === 0} style={buttonSoft}>Clear log</button>
          </div>
          {status && <p role="status" aria-live="polite" style={{ color: colors.softInk }}>{status}</p>}
          <div style={{ display: 'grid', gap: 10, marginTop: 14 }}>
            {practiceLog.length === 0 ? <p>No saved practice entries yet.</p> : practiceLog.map(item => (
              <article key={item.id} style={{ padding: 14, borderRadius: 16, background: colors.paper, border: `1px solid ${colors.border}` }}>
                <strong>{item.pattern}</strong>
                <p><em>{item.sentence}</em></p>
                <p>{item.reflection}</p>
                <small>{new Date(item.createdAt).toLocaleString()}</small>
              </article>
            ))}
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
