# Native theme signaling specification

Applies to all active NamTheDev web apps with native dark or light themes, including static pages and server-rendered shared layouts.

## Required metadata

Place exactly one color-scheme meta element in the document head, before stylesheets, declaring the initial native theme.

For a dark-only or dark-default app:

```html
<meta name="color-scheme" content="dark">
```

For a light-only or light-default app:

```html
<meta name="color-scheme" content="light">
```

Match the root CSS color-scheme property to the actual native theme. For Bootstrap apps also match data-bs-theme on the root element.

## Theme switching

If the app supports a theme preference, restore it before first paint where practical and keep the metadata and root theme synchronized whenever it changes. For example:

```js
function signalTheme(dark) {
  const scheme = dark ? 'dark' : 'light';
  const root = document.documentElement;
  root.style.colorScheme = scheme;
  root.dataset.bsTheme = scheme; // Bootstrap consumers only
  document.querySelector('meta[name="color-scheme"]').content = scheme;
}
```

The existing app preference remains the source of truth. Do not signal the OS preference if the app renders a different theme. If theme-color metadata exists, update it to the active theme background. Do not add theme storage or a switch to a fixed-theme app merely to implement this standard.

## Dark Reader compatibility

Use color-scheme metadata as the standard native dark-theme detection signal. Do not add darkreader-lock by default: the lock requests extension disabling rather than declaring the actual theme. Do not inject extension-owned DOM attributes or bundle the extension. This preserves user choice, including use of Dark Reader on a native light theme.

Detection remains subject to the extension version, user settings and detection behavior. Correct metadata is not a guarantee that every extension mode will automatically stop applying its theme.

## Verification

- Check the rendered document head, including shared templates and all page types.
- Assert exactly one color-scheme meta element and a matching computed root colorScheme.
- For Bootstrap apps, assert data-bs-theme matches the actual theme.
- For switchable apps, test both states and persisted preference after reload.
- Ensure no darkreader-lock is present unless explicitly required as a documented project exception.
- Distinguish browser metadata tests from manual verification with the actual extension.

## References

- [Dark Reader maintainer guidance](https://github.com/darkreader/darkreader/discussions/15128)
- [Dark Reader lock documentation](https://github.com/darkreader/darkreader/blob/main/CONTRIBUTING.md#disabling-dark-reader-on-your-site)
- [MDN: color-scheme meta element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/color-scheme)
