import fs from 'node:fs'

const files = ['data/sword_sentences.json', 'data/possibility_patterns.json']

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8')
  const parsed = JSON.parse(raw)
  if (!Array.isArray(parsed)) throw new Error(`${file} must contain an array`)
  if (parsed.length === 0) throw new Error(`${file} must not be empty`)
  console.log(`${file}: ${parsed.length} records`)
}
