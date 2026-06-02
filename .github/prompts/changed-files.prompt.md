---
description: "List the currently changed files in this workspace with a concise Git status summary."
agent: "agent"
argument-hint: "Optional filters, such as staged only, unstaged only, or include diff summaries"
---

List the files currently changed in this workspace.

Use the available source control or changes tool to inspect the current worktree. Report the result in a concise, scannable format:

- Group files by status when possible: modified, added or untracked, deleted, renamed, staged, and unstaged.
- Include workspace-relative file paths.
- Do not include full diffs unless the user explicitly asks for them.
- If the user provides arguments, honor them as filters or formatting preferences.
- If staged versus unstaged state is unavailable, say that and still list the changed files.

End with a one-sentence summary of the total number of changed files.