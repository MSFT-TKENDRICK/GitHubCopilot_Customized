// GEPA trigger harness for web-design-reviewer.
// These prompt sets are consumed by sensei's GEPA evaluator.

export const shouldTriggerPrompts: string[] = [
  "Review website design for layout and visual issues on localhost.",
  "Check the UI for spacing inconsistencies and alignment bugs.",
  "Find responsive bugs between mobile and desktop breakpoints.",
  "Audit visual consistency across fonts, colors, and spacing.",
  "Inspect accessibility contrast and keyboard focus states in the frontend.",
  "Fix overlapping elements and text clipping in this page layout.",
  "Run a design QA pass and patch CSS issues at the source code level.",
  "Validate touch target sizes and mobile-friendly behavior in the app UI.",
  "Capture before/after screenshots while remediating frontend UI defects.",
  "Review this React app UI and fix responsive layout regressions.",
  "Check if the navbar and content grid overflow at 375px viewport.",
  "Do a browser-driven inspection for contrast, spacing, and overflow problems."
];

export const shouldNotTriggerPrompts: string[] = [
  "Build the Node API and fix backend routing errors.",
  "Write SQL indexes to improve database query performance.",
  "Set up Azure deployment infrastructure with Bicep templates.",
  "Implement OAuth login and refresh token rotation.",
  "Refactor TypeScript types and resolve compiler errors in the service layer.",
  "Create unit tests for order calculation logic.",
  "Debug memory leaks in the server process under load.",
  "Summarize this pull request and propose merge strategy.",
  "Fix grammar and spelling issues in documentation comments.",
  "Add CI pipeline steps for lint, test, and release automation.",
  "Optimize Cosmos DB partition keys and query patterns.",
  "Upgrade dependencies and remediate package vulnerabilities."
];
