# Design configuration

`css/config.css` is the only shared CSS configuration. It defines framework-independent semantic colors, type, density, shape and motion tokens and maps them to Bootstrap 6 root variables. It does not contain a framework build or application component/layout rules.

The default palette is Catppuccin Mocha with Lavender; the existing light-mode switch uses Catppuccin Latte with Lavender. See https://catppuccin.com/palette/ and https://getbootstrap.com/llms-full.txt.

Consumers load their own Bootstrap 6 CSS, then a locally vendored copy of `config.css`, then their own application stylesheet. Keep and Clipboard synchronize only `config.css`. Do not edit consumer copies independently. Use the shared tokens when additional local styles are needed.
