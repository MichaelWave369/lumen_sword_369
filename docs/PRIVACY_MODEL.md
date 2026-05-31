# Privacy Model

LumenSword369 is designed as a local-first reflection and practice tool.

## Current v0.2 behavior

The practice log uses browser local storage.

That means:

- Practice entries are saved on the user's device and browser.
- The app does not need an account.
- The app does not send practice entries to a server.
- The user can export practice entries as JSON.
- The user can import a prior JSON export.
- The user can clear the local log.
- Imported entries are checked for duplicates before being added.

## User reminder

Local storage is private from the app server, but it is not the same as encrypted storage. Anyone with access to the same browser profile may be able to view saved data.

## Principle

Private practice should stay under user control.
