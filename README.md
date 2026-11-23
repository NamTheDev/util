# util

Reusable utilities and design assets for [NamTheDev](https://github.com/NamTheDev).

## Material Design system

The canonical shared stylesheet for **keep** and **clipboard** is:

**[css/material_design.css](css/material_design.css)**

Both applications use a compact, monochrome, dark-first Material Design 3-inspired foundation with Roboto typography, Material Symbols Rounded icons, subtle outlines, tonal surfaces, 16px standard corners and no UI animation. Their sidebars share the same visual classes and component rules; app-specific workflows and responsive layouts remain in their own repositories.

This stylesheet is the **source of truth**. The applications vendor identical copies under `keep/src/style.css` and `clipboard/public/style.css` for offline-safe, first-party hosting. Changes should be made here first, then mirrored into both applications. Scheduled/manual GitHub Actions in each consumer can synchronize from this repository; do not edit the vendored copies independently.

The apps are not styled at runtime from a third-party CDN. Use the local vendored stylesheet to avoid introducing a runtime dependency on GitHub raw-file availability.

See [CSS usage and tokens](css/README.md) for supported design rules.

## Consumption

1. Copy `css/material_design.css` into the application's common CSS path.
2. Add separate layout overrides only where behavior differs.
3. Use the shared classes such as `.sidebar`, `.sidebar-heading`, `.sidebar-group`, `.nav-btn`, `.content-heading`, `.note-window`, `.chrome-btn` and `.dialog-window`.
4. Verify both themes, desktop/mobile navigation, keyboard focus and functional regressions.
5. Keep the local copies byte-for-byte equivalent to the canonical version.

## License

Check the repository's applicable license before reuse in unrelated projects.
