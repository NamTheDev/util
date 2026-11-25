# Design principles

These rules apply to Keep, Clipboard, and future projects that adopt the shared design configuration.

## 1. Bootstrap first

- Use Bootstrap 6 components and utilities before writing custom CSS. Follow the documentation for the installed version; do not mix Bootstrap 5 and 6 conventions.
- Prefer semantic HTML, responsive utilities, standard form controls, native component variants, and `theme-*` modifiers.
- Use Bootstrap utilities for spacing, alignment, typography, borders, sizing, and rounding wherever they meet the requirement.
- Customize appearance through documented `--bs-*` tokens. Do not modify the framework distribution.
- Write custom CSS only for requirements that the framework cannot express cleanly, such as application-specific layouts, dynamic note colors, or interaction states. Keep those rules small and local.

## 2. One source of truth

[`css/config.css`](css/config.css) is the canonical design configuration: typography, color roles, spacing, density, radius, motion, and Bootstrap token mappings.

Each consumer owns its Bootstrap distribution and application stylesheet. Load them in this order:

1. Bootstrap CSS.
2. A locally vendored, identical copy of `config.css`.
3. Application-specific CSS.

Change shared design tokens in util first, then synchronize the consumers. Do not put application selectors, layouts, or framework distributions into the shared configuration. Avoid hard-coded copies of shared design values in consumer stylesheets.

## 3. Visual identity

| Property | Standard |
| --- | --- |
| Default theme | Catppuccin Mocha |
| Light theme | Catppuccin Latte |
| Accent | Lavender |
| UI font | Roboto, with system fallback |
| Monospace font | System monospace |
| Base type size | 14px |
| Icons | Material Symbols Rounded, consistent sizing |
| Density | Compact |
| Surfaces | Flat, subtle borders, no decorative shadows |
| Motion | None by default |

Use semantic color roles rather than arbitrary hex values. Lavender highlights primary actions, active navigation, selection and keyboard focus; keep secondary actions visually quiet. Preserve meaningful error, warning, success and informational colors. Use the shared theme switch and `data-bs-theme`; retain browser color-scheme signaling.

## 4. Native rounding

| Element | Bootstrap 6 utility | Default radius |
| --- | --- | --- |
| Inputs, buttons, navigation | `rounded-5` | 8px |
| Cards and grouped surfaces | `rounded-6` | 10px |
| Dialogs | `rounded-7` | 12px |
| Circular swatches and intentional pills | `rounded-circle` or `rounded-pill` | Shape dependent |
| Intentionally flat separators or adjoining panels | `rounded-0` | 0px |

Prefer utility classes over local radius declarations. Use `input-group` only when adjacent controls are intended to join; standalone search and form fields should retain all four rounded corners.

## 5. Minimalism and consistency

- Prioritize content and functionality over decorative elements. Avoid redundant headings, explanatory text, fake window chrome, and unnecessary toolbars.
- Keep shared navigation, forms, buttons, dialogs and cards visually consistent across applications.
- Preserve established application layouts and workflows unless a layout change is explicitly requested. Different applications may have different content arrangements.
- Use compact spacing without sacrificing readability, keyboard focus, or usable touch targets.
- Use established icon libraries rather than inventing icons; icon-only controls need accessible names.

## 6. Responsive and accessible by default

Use mobile-first responsive layouts and Bootstrap's documented breakpoints where practical. Preserve the established shared sidebar breakpoint where needed for compatibility. Check desktop and mobile views, avoid horizontal overflow, and retain keyboard navigation, visible focus, semantic labels, and sufficient color contrast. Do not rely solely on color to communicate state.

Prefer HTML and CSS over extra JavaScript; use Bootstrap plugins where appropriate without duplicating existing event handlers. Preserve application state, storage, and API behavior during visual refactors.

## 7. Verification

Before considering a change complete, check:

- Native Bootstrap classes and documented token names.
- Shared configuration copies match util.
- Dark and light modes, desktop and mobile layouts, and keyboard interactions.
- Functional regressions, browser tests, and deployment results.

Use stable DOM and computed-style assertions rather than brittle decorative text assertions. Report unverified or failed checks explicitly.

## References

- [Bootstrap 6 documentation for AI tools](https://getbootstrap.com/llms-full.txt)
- [Bootstrap documentation](https://getbootstrap.com/docs/6.0/)
- [Catppuccin palette](https://catppuccin.com/palette/)
- [Shared configuration](css/config.css)
