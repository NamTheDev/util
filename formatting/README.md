# Formatting standards

Canonical contribution-format specifications for NamTheDev repositories.

- [Commit message specification](COMMIT_FORMAT.md)
- [AI disclosure specification](AI_DISCLOSURE.md)
- [Project README specification](README_FORMAT.md)
- [Native theme signaling specification](THEME_SIGNAL.md)

## Adoption

Each participating repository keeps its own AI_DISCLAIMER.md, commit_message_format.txt, and README.md in the repository root. The disclosure must describe that repository accurately. The format note and GitHub Actions validators may be copied from util.

Reference implementations:

- [Commit format note](../commit_message_format.txt)
- [Project disclosure example](../AI_DISCLAIMER.md)
- [Commit validator](../.github/workflows/commit-message-format.yml)
- [AI disclosure validator](../.github/workflows/ai-disclosure-format.yml)

Keep the specifications and validators consistent when changing these standards. Successful checks are not mandatory merge gates unless repository rules or branch protection require them.
