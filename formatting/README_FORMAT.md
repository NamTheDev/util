# README specification

Derived from MeditorD's concise project README. Apply this structure to the root README.md of each active NamTheDev repository.

## Required order

1. H1: project title, using the project's established display name.
2. H2: AI Disclaimer.
3. H2: Introduction.
4. H2: Resources.
5. H2: License.

## Template

```markdown
# Project name

## AI Disclaimer

[Brief, truthful description of AI involvement in this project.]

See [AI_DISCLAIMER.md](AI_DISCLAIMER.md) for the full disclosure.

## Introduction

[One concise paragraph describing the project's purpose. Include an official website link when applicable.]

## Resources

[Links to existing project documentation, design references, or other useful resources.]

## License

Original project material is licensed under the [MIT License](LICENSE). [Link applicable third-party notices or attribution, when present.]
```

Replace placeholders with verified project-specific content. The template assumes an existing MIT license; use the actual license rather than claiming MIT for an unlicensed or differently licensed project.

## Content rules

- Keep the root README concise and focused on orientation, not exhaustive operational documentation.
- Use the same headings and order. Do not add badges, redundant text, or unrelated sections by default.
- Derive the AI disclaimer from the project's own disclosure; do not copy another project's provider or authorship claims. Always link the full disclosure.
- Preserve the actual project title and purpose. Do not claim unverified features, deployment status, test results, or security properties.
- Link detailed usage, architecture, development, deployment, and security guidance from Resources rather than placing long instructions in the root README. Preserve useful existing information in separate documentation.
- Preserve existing copyright notices and third-party attribution. The repository license does not override third-party terms.
- Use valid Markdown links, existing file paths, and verified project URLs. If a project has no separate resources, link relevant existing contribution standards or documentation.
- Retain root AI_DISCLAIMER.md, commit_message_format.txt, and LICENSE where applicable. The existing AI disclosure validator requires the README link.

## Reference

[MeditorD README](https://github.com/NamTheDev/MeditorD/blob/main/README.md) is the structural reference. This specification governs formatting, not identical prose across projects.
