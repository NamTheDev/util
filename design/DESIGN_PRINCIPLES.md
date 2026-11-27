# Functional minimalism

Apply to active user-facing web interfaces. Archived repositories are not migrated. Non-UI services have no shell requirement.

## Fixed foundations
Catppuccin Mocha, Lavender accent, Bootstrap 6. Use the vendor framework unchanged, native semantic HTML and utilities first. Use Source Sans 3 with system fallback for UI and system monospace for code. Keep dark theme signaling. Use space, alignment, and typography for hierarchy, not decorative color, shadows or redundant chrome. Semantic red errors, green success and yellow warnings must have readable text. Lavender identifies primary actions and focus.

## Shared navigation and layout
Use the same header everywhere: stationary `namchill235 / project` brand, a flexible infinite scrolling link strip, and stationary essential controls. Links vary by project. Preserve the original Docs/Profile marquee exactly: automatic continuous movement at 45 pixels per second, hover and focus pause, native touch and horizontal wheel input, seamless infinite wrapping in both directions, and automatic resumption. Respect the system reduced-motion preference. Do not add Play/Pause buttons or alter the original marquee behavior as part of a visual redesign. No other gratuitous motion.

Reading sites use an aligned full-width reading grid with page navigation and optional contents rail; mobile uses a drawer and inline contents. Apps use a full-viewport workspace, no persistent Pages sidebar, compact stationary navigation and contextual controls. Preserve editor and item panes where needed. Use filled Lavender primary buttons, quiet secondary actions, red destructive/error states, meaningful labels, keyboard access and visible focus. Keep user data, sync, permissions, API contracts and canonical URLs intact.

## Source and verification
Load Bootstrap 6, [config.css](config.css), [shell.css](shell.css), then necessary local CSS; load [marquee.js](marquee.js) after the header exists. Vendor the three assets together from util. Do not recreate generic utilities or duplicate shell rules. Test desktop/mobile, focus and motion, manual ticker wrapping, every existing workflow and deployment. Keep GitHub Pages as the only public frontend for Keep and Clipboard; Railway is their API backend. Do not delete compatibility paths or tested modules solely because they are not yet active. See [integration](README.md).
