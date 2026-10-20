/** Dispatch V1 knobs. UI must read these — do not hard-code timeouts in screens. */
export const DISPATCH_V1 = {
  policy: "simultaneous_batch" as const,
  dispatch_radius_km: 8,
  offer_batch_size: 4,
  offer_timeout_seconds: 45,
  max_dispatch_attempts: 3,
  search_timeout_seconds: 180,
} as const;

export type DispatchPolicy = typeof DISPATCH_V1.policy;
