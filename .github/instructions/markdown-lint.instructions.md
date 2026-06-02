---
description: "Use when creating or editing Markdown documentation. Requires linting saved Markdown files after changes."
applyTo: "**/*.md"
---

# Markdown Linting

- After creating or editing a Markdown file, run the repository's configured
  Markdown lint command before finishing the task.
- If the repository has no Markdown-specific lint command, run
  `npx --yes markdownlint-cli2 <changed-markdown-file>` for each Markdown file
  you created or edited.
- Report whether Markdown linting passed. If it fails, fix the Markdown issues
  you introduced and rerun the lint command.
- Do not skip Markdown linting just because unrelated non-Markdown checks have
  passed.

Customer: Jane Doe