# LumenSword369 v1.0 Release Notes

**Status:** v1.0.0 release candidate draft  
**Project type:** Humane empowering-speech and possibility-language tool

## Release summary

LumenSword369 v1.0 is a local-first practice tool for strengthening dignity, consent, courage, truth, mercy, and possibility in conversation.

It is designed as a sheathed sword: disciplined clarity under ethical restraint. It does not teach people how to pressure others. It helps users practice language that validates, empowers, clarifies, and invites without overriding consent.

## Core features

- 17 Sheathed Sword Sentences
- Possibility pattern taxonomy
- Real-world practice scenarios
- Guided sentence builder
- Local-only practice log
- Practice log export and import
- Duplicate-aware import handling
- Printable sheathed-sword card deck
- Safety and claim boundaries
- Privacy model documentation
- Accessibility notes
- v1.0 release checklist
- Verification workflow
- GitHub Pages deploy workflow

## Current data files

- `data/sword_sentences.json`
- `data/possibility_patterns.json`
- `data/scenarios.json`
- `data/builder_templates.json`

## User flow

1. Browse or search empowering sentences.
2. Review the selected sentence, purpose, and reflection prompt.
3. Load a real-world scenario.
4. Use the guided sentence builder.
5. Edit the practice reflection.
6. Save the practice entry locally.
7. Export, import, or clear practice entries.
8. Print or save the card deck as PDF.

## Safety boundaries

LumenSword369 does not guarantee emotional outcomes, make people agree, diagnose relationships, replace therapy, replace legal advice, or guarantee safety.

Empowering language must not become disguised pressure.

If there is immediate danger, threats, stalking, coercive control, self-harm risk, or fear for physical safety, users should prioritize trusted support, local emergency services, or qualified professional help.

## Privacy boundaries

The practice log uses browser local storage. Practice entries are not sent to a server by the app. Local storage is not encrypted, so anyone with access to the same browser profile may be able to view saved entries.

## Release verification

Before public sharing, run:

```bash
npm run release:check
```

And complete the checklist in `docs/V1_RELEASE_CHECKLIST.md`.
