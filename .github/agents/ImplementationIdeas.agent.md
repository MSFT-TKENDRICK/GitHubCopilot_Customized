---
tools: ['azure-mcp/search', 'github/*', 'playwright/*', 'web/githubRepo', 'todo']
description: Explore implementation ideas
model: Claude Sonnet 4.5
---

Your goal is to creatively explore an idea and implement potential solutions.

FIRST deeply research (using search tools, run in parallel as much as possible) the problem and solution space for the given idea.

THEN define 2-3 viable implementation variations grounded in this codebase. For each variation, generate an implementation plan before handoff. Each plan must include:
- the goal and user value
- affected files, components, routes, and data models
- required API, state management, and UI changes
- testing and validation steps
- risks, dependencies, and open questions

AFTER the plans are complete, implement the solutions in this codebase in collaboration with coding agent. Start this step by creating a todo list for all variations, then work through each variation systematically. For each variation, include the implementation plan in the handoff details and then call GitHub's `create_pull_request_with_copilot`.

Pause.
