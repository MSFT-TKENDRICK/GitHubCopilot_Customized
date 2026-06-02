# GrammarChecker eval

This eval covers grammar, spelling, punctuation, clarity review, scope discipline, and approval gating for the repo-local `GrammarChecker` custom agent.

## Required files

- `grammar-checker-agency-eval.yaml` - Agency config for the eval run
- `grammar-checker-agency-eval-data.csv` - CSV dataset consumed by Agency
- `fixtures\` - fixture files referenced by dataset rows
- `artifacts\agency-evals\grammar-checker\result-*.json` - per-row output written by Agency

## Run

From the repo root:

```powershell
agency eval --config C:\src\GitHubCopilot_Customized\evals\grammar-checker\grammar-checker-agency-eval.yaml
```

This wiring evaluates the `GrammarChecker` custom agent through Copilot CLI using `--agent=GrammarChecker`.

## Why the old version felt weak

The previous fixture set was too synthetic and the prompts mainly asked the agent to dump all issues it could find. That made the output noisy and not very helpful to review.

This version improves signal by:

- using more realistic documentation and comment examples
- including a mostly clean fixture to test restraint
- asking for prioritized feedback instead of every possible nit
- preserving approval gating instead of jumping straight to edits

## What to look for in the results

The current Agency config validates only that each run exits successfully, so the useful signal comes from inspecting the generated `result-*.json` files.

Each CSV row is meant to test a different behavior:

| Row ID | What a good response should do |
| --- | --- |
| `prioritize-runbook-feedback` | Give a short quality summary, identify the highest-impact wording issues, avoid touching commands, and ask for approval. |
| `comment-only-review` | Review only comments/docstrings, ignore code logic, and keep the feedback concise and file-specific. |
| `mixed-scope-request` | Refuse rename/logic changes explicitly, then continue with comment-language feedback only. |
| `restraint-on-mostly-clean-copy` | Report no meaningful issues or only one or two real issues; avoid invented nitpicks. |
| `cross-file-summary` | Summarize the most important issues across both fixtures without drifting into code changes. |
