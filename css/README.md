# Shared Material Design CSS

## Canonical file

[`material_design.css`](material_design.css) is the canonical shared design for `NamTheDev/keep` and `NamTheDev/clipboard`. The file contains design tokens and shared component styles; each app still owns its own HTML, data model and feature-specific layout rules.

## Design decisions (v1.3)

| Area | Decision |
| --- | --- |
| Language | Material Design 3-inspired |
| Density | Compact |
| Palette | Neutral monochrome |
| Theme | Dark-first, optional persisted light mode |
| Surfaces | Hybrid tonal surfaces and restrained outlines |
| Typography | Roboto, system sans-serif fallback |
| Iconography | Material Symbols Rounded |
| Standard corners | 16px |
| Small controls | 8–12px |
| Navigation | Compact shared sidebar structure; mobile drawer |
| Motion | None |

### Colors

| Semantic token | Dark | Light |
| --- | --- | --- |
| `--bg` | `#121212` | `#fafafa` |
| `--surface` | `#1e1e1e` | `#ffffff` |
| `--raised` | `#292929` | `#f1f1f1` |
| `--high` | `#333333` | `#e8e8e8` |
| `--outline` | `#505050` | `#858585` |
| `--outline-soft` | `#383838` | `#d4d4d4` |
| `--text` | `#f2f2f2` | `#202020` |
| `--muted` | `#bdbdbd` | `#595959` |

## Shared sidebar composition

Use one `.sidebar` per app with `.sidebar-heading`, `.sidebar-group` and `.nav-btn` for navigation and actions, with `.sidebar-divider` separating groups. Primary content should not duplicate secondary settings or backup controls. On narrow screens, the app owns an accessible `.mobile-nav-toggle` and `.mobile-scrim` to reveal the sidebar.

Use `aria-label` on controls whose text is not visible, preserve keyboard access and keep important actions discoverable in the sidebar.

## Edit and synchronization policy

- **Edit this canonical stylesheet first.**
- Vendor exact copies into both consumer apps and preserve app-specific `clipboard.css` as an override.
- Run consumer CI after synchronization.
- Do not rely on a runtime CSS URL to GitHub raw content.
- Avoid putting product text or product-specific layout decisions into this shared file.
