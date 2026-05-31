# Guided Sentence Builder

The guided sentence builder helps users choose a tone and load a starter sentence into the practice field.

## Current tones

- Validate experience
- Restore choice
- Clarify the fog
- Invite a next step
- Truth with mercy
- Boundary blessing

## Design principle

The builder should make empowering speech easier without turning language into a control tool.

## Template structure

Templates live in `data/builder_templates.json` and include:

- `id`
- `tone`
- `label`
- `template`

## Safety note

If a situation is unsafe, the strongest sentence may be no sentence at all. Prioritize safety and trusted support.
