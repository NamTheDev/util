"""Verify local documentation links and required shared CSS notices."""
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit

root = Path(__file__).resolve().parents[1]
errors = []
for doc in root.rglob("*.md"):
    if ".git" in doc.parts:
        continue
    prose = re.sub(r"(?ms)^\s*```[^\n]*\n.*?^\s*```\s*$", "", doc.read_text(encoding="utf-8"))
    for target in re.findall(r"\[[^\]\n]+\]\(([^)\s]+)\)", prose):
        url = urlsplit(target)
        if url.scheme or url.netloc or not url.path:
            continue
        if not (doc.parent / unquote(url.path)).exists():
            errors.append(f"{doc.relative_to(root)}: missing link {target}")

css = (root / "design/config.css").read_text(encoding="utf-8")
for required in (
    "Copyright (c) 2026 NamTheDev",
    "Copyright (c) 2021 Catppuccin",
    "Permission is hereby granted",
    "THE SOFTWARE IS PROVIDED",
    "--accent:#b4befe",
    "--base:#1e1e2e",
):
    if required not in css:
        errors.append(f"design/config.css: missing {required}")

if errors:
    raise SystemExit("\n".join(errors))
print("Shared resource checks passed.")
