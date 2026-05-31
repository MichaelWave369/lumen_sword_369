# Accessibility Notes

LumenSword369 should be calm, readable, and usable for people who may be emotionally activated or under stress.

## Current release-candidate improvements

- Text inputs and controls use explicit labels.
- Status messages use `aria-live` so screen readers can announce save/import/export updates.
- Scenario filters use button states.
- Main sections use clear headings.
- Content avoids flashing, aggressive motion, or fear-amplifying language.

## Design goals

- Keep language plain and readable.
- Preserve strong color contrast.
- Make every action keyboard reachable.
- Avoid relying on color alone to communicate state.
- Keep sections scannable with clear headings.

## Future checks

- Run Lighthouse accessibility audit.
- Test with keyboard-only navigation.
- Test with a screen reader.
- Add visible focus states in CSS.
- Review mobile tap target sizes.
