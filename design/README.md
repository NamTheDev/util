# Design configuration

`design/config.css` is the only shared CSS configuration. It defines framework-independent semantic colors, type, density, shape and motion tokens and maps them to Bootstrap 6 root variables. It does not contain a framework build or application component/layout rules.

The default palette is Catppuccin Mocha with Lavender; the existing light-mode switch uses Catppuccin Latte with Lavender. See https://catppuccin.com/palette/ and https://getbootstrap.com/llms-full.txt.

Consumers load their own Bootstrap 6 CSS, then a locally vendored copy of `config.css`, then an optional application stylesheet containing only the bare minimum of necessary custom CSS. Use Bootstrap components and utility classes first, and documented framework tokens for configuration. Do not duplicate utility behavior in custom selectors. Profile, keep and clipboard follow this rule; MeditorD is exempt. Keep and Clipboard synchronize only `config.css`. Do not edit consumer copies independently.

Follow the [design principles](DESIGN_PRINCIPLES.md) when authoring or reviewing any consumer UI.

## Licensing

Preserve the copyright and MIT permission notices embedded in `config.css` when copying or distributing the shared stylesheet. See [repository license](../LICENSE) and [third-party notices](../THIRD_PARTY_NOTICES.md).
