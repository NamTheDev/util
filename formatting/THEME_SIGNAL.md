# Native theme signaling specification

Applies to all active NamTheDev web apps with a fixed native dark theme, including static pages and server-rendered shared layouts.

## Required metadata

Place exactly one color-scheme meta element in the document head, before stylesheets, declaring the initial native theme.

For all active web apps:

```html
<meta name="color-scheme" content="dark">
```

Match the root CSS color-scheme property and `data-bs-theme="dark"` (Bootstrap apps). Do not offer theme switching or restore obsolete light-theme preferences.

## Dark Reader compatibility

Use color-scheme metadata as the standard native dark-theme detection signal. Do not add darkreader-lock by default: the lock requests extension disabling rather than declaring the actual theme. Do not inject extension-owned DOM attributes or bundle the extension. This preserves user choice, including user-controlled extension behavior.

Detection remains subject to the extension version, user settings and detection behavior. Correct metadata is not a guarantee that every extension mode will automatically stop applying its theme.

## Verification

- Check the rendered document head, including shared templates and all page types.
- Assert exactly one color-scheme meta element and a matching computed root colorScheme.
- For Bootstrap apps, assert data-bs-theme matches the actual theme.
- Verify obsolete saved light preferences cannot change the dark theme.
- Ensure no darkreader-lock is present unless explicitly required as a documented project exception.
- Distinguish browser metadata tests from manual verification with the actual extension.

## References

- [Dark Reader maintainer guidance](https://github.com/darkreader/darkreader/discussions/15128)
- [Dark Reader lock documentation](https://github.com/darkreader/darkreader/blob/main/CONTRIBUTING.md#disabling-dark-reader-on-your-site)
- [MDN: color-scheme meta element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/color-scheme)
