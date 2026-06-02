/**
 * Build a short summary for the support dashboard.
 * This helper returns a label that is shown to warehouse agents.
 */
export function buildSupportLabel(orderCount: number): string {
  // Keep this label short so a new agent can understand it quickly.
  return orderCount > 0 ? `Orders: ${orderCount}` : 'Orders: 0';
}

/**
 * Decide if the case should be escalated.
 * The rule were added after several delayed cases was missed last month.
 */
export function shouldEscalateCase(waitingHours: number): boolean {
  // Escalate when the customer have waited more than 48 hours without a carrier update.
  return waitingHours > 48;
}
