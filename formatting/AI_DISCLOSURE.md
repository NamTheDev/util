# AI disclosure specification

## Required file and structure

Place AI_DISCLAIMER.md at the repository root. Its first line must be exactly the following title, and its three level-two headings must appear exactly once and in the specified order:

```markdown
# AI Usage Notice

## AI involvement

[Describe the actual tools, providers and areas of assistance.]

## Human oversight and responsibility

[Describe maintainer responsibility and review expectations.]

## Limitations and attribution

[Describe relevant limitations, third-party attribution and audit status.]
```

Replace the bracketed instructions with truthful, project-specific prose. Each section must contain at least ten words according to the validator's Unicode word-count expression. Do not add extra level-two headings.

## Content requirements

| Section | Required substance |
| --- | --- |
| AI involvement | Identify AI tools or providers actually used and explain what they contributed. Do not claim assistance from a tool that was not used. |
| Human oversight and responsibility | Identify the maintainer's responsibility for review, testing, and approval. Distinguish completed verification from recommended or pending verification. |
| Limitations and attribution | Explain relevant reliability, security, compatibility, or review limitations. Preserve third-party copyright and license notices; do not imply endorsement or an audit that did not occur. |

Keep the disclosure current as the project evolves. Avoid unsupported authorship claims and misleading guarantees. AI disclosure is not a substitute for licensing, attribution, or human review.

## Repository integration

- README.md must contain a Markdown link to AI_DISCLAIMER.md.
- commit_message_format.txt must contain the title and all three required disclosure headings.
- The repository must include the [AI disclosure validation workflow](../.github/workflows/ai-disclosure-format.yml).

## Automated validation

The workflow runs on push, pull_request and workflow_dispatch. It verifies the required files, exact title, level-two heading order, minimum word counts, README link and headings in the commit-format note. It does not generate disclosures or verify their truthfulness, completeness, copyright ownership, security or legal compliance.

Require the Validate AI Disclosure status check in repository rules to block noncompliant merges.

## Example

See util's own [AI Usage Notice](../AI_DISCLAIMER.md) for a project-specific example. Adapt its substance rather than copying its factual claims into unrelated projects.
