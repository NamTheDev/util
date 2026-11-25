# Commit message specification

## Required structure

Every newly introduced non-merge commit checked by the validation workflow must follow this format:

```text
<Type>: <Capitalized message>

DD-MM-YYYY

- Detail.
- Additional detail.
```

## Syntax

| Position | Requirement |
| --- | --- |
| First line | Type, colon, one space, and a subject beginning with an uppercase ASCII letter. |
| Second line | Empty. |
| Third line | A real calendar date in DD-MM-YYYY format. |
| Fourth line | Empty. |
| Fifth line onward | One or more nonempty details beginning with a hyphen and space. |

The subject must fully match `[A-Z][A-Za-z0-9_-]*: [A-Z].*`. The type starts with an uppercase ASCII letter; subsequent type characters may be ASCII letters, digits, underscores or hyphens. The validator does not restrict types to an enumerated list.

Bullet continuations are permitted after the first bullet when indented by at least two spaces or a tab and containing non-whitespace text. Internal blank lines, unindented prose, and standalone trailers are not accepted by the current validator. Surrounding whitespace is stripped when the workflow reads the commit message.

## Writing conventions

Use a concise, descriptive subject and meaningful details. Prefer types such as Add, Fix, Refactor, Docs, Style, Test, Cleanup and Chore. Use the actual commit date; the validator verifies calendar validity, not correspondence to the Git timestamp. Explain material changes, especially behavior changes and compatibility implications. Do not claim tests passed unless they actually passed.

## Valid example

```text
Fix: Preserve rounded input corners

25-11-2026

- Use native Bootstrap rounding utilities.
- Add a browser regression check.
```

## Invalid examples

- Lowercase type or subject, such as `fix: preserve rounded input corners`.
- Missing date, blank separators or details.
- A date such as `2026-11-25` or `31-02-2026`.
- Unindented prose after the detail bullets.

## Automated validation

The [workflow](../.github/workflows/commit-message-format.yml) runs on pushes and pull requests. For an existing branch or PR, it checks non-merge commits in the base-to-head range. For a push without a prior commit reference, it checks the head commit. A violation exits nonzero. The check does not retroactively audit the entire history, assess the truthfulness of descriptions, or verify the actual date of authorship. Require the Validate Commit Messages status check in repository rules to block noncompliant merges.
