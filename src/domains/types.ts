export type UserRole = "customer" | "electrician" | "admin";

export type ElectricianVerificationStatus =
  | "APPLIED"
  | "UNDER_REVIEW"
  | "VERIFIED"
  | "REJECTED"
  | "SUSPENDED";

export type ElectricianAvailability = "OFFLINE" | "ONLINE" | "BUSY" | "PAUSED";

export type BookingTiming = "NOW" | "SCHEDULED";

export type BookingStatus =
  | "REQUESTED"
  | "SEARCHING"
  | "OFFERED"
  | "ASSIGNED"
  | "ELECTRICIAN_ON_THE_WAY"
  | "ARRIVED"
  | "INSPECTION"
  | "QUOTE_PENDING"
  | "QUOTE_APPROVED"
  | "WORK_IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_ELECTRICIAN_FOUND";

export type OfferStatus =
  | "PENDING"
  | "ACCEPTED"
  | "DECLINED"
  | "EXPIRED"
  | "CANCELLED";

export type AssignmentStatus = "ACTIVE" | "COMPLETED" | "CANCELLED" | "REASSIGNED";

export const SKILL_SLUGS = [
  "switch-socket",
  "fan",
  "light",
  "mcb-db",
  "wiring",
  "inverter",
  "inspection",
  "emergency",
  "ac",
] as const;

export type SkillSlug = (typeof SKILL_SLUGS)[number];
