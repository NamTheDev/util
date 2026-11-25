# Shared Bootstrap 6 CSS

The canonical override is [bootstrap.css](bootstrap.css). Both applications load an unmodified Bootstrap 6.0.0-alpha.2 distribution before this file. Use Bootstrap v6 component variants, `theme-*` modifiers, `data-bs-theme`, form controls and utility classes. CSS variables customize the visual system; only app-specific layout and state hooks remain custom.

Reference: https://getbootstrap.com/llms-full.txt (Bootstrap 6). Browser floor: Chrome/Edge 138, Firefox 147, Safari 26. This is an alpha release and should be verified before production deployment.

Existing event handlers retain control of overlay visibility and persistence; avoid attaching duplicate plugin listeners. The previous Material Design stylesheet remains a historical asset, not the synchronization source for migrated apps.
