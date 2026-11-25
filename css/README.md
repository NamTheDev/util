# Shared Bootstrap CSS

`bootstrap.css` is the canonical **theme override** for keep and clipboard. Both apps load the unmodified, locally hosted Bootstrap 5.3.8 distribution first and mirror this file into their shared stylesheet. Bootstrap classes supply standard components and utilities; the theme retains a monochrome dark-first palette, Roboto, compact spacing and shared responsive sidebar behavior. Product-specific layout and behavior stay in each app.

The older `material_design.css` remains as a historical compatibility asset. Do not sync it into the migrated applications.

Use native Bootstrap 5.3 classes for buttons, navigation, forms, cards, badges, dialogs, dropdowns, spacing and flex utilities. Existing event handlers own the drawer, modal and menu lifecycle; do not add Bootstrap JS handlers on top of those controls.

See https://getbootstrap.com/docs/5.3/ for version-matched documentation. Bootstrap is MIT licensed.
