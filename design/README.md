# Shared design system

See [design principles](DESIGN_PRINCIPLES.md). Vendor [config.css](config.css), [shell.css](shell.css) and [marquee.js](marquee.js) as a set. Load Bootstrap 6 first, then config and shell, then application-only styles. Use a header with .site-header, .header-inner, .brand-name and a .header-links nav; insert stationary controls after the nav. The script adds the accessible pause control. In applications whose header is rendered dynamically, load the marquee after rendering it.

Use .reading-layout for content with page and contents rails; use .app-navigation for functional controls above a fullscreen app. Link content is consumer-owned. Keep source licenses, compare asset hashes, and run consumer regression tests before deployment.
