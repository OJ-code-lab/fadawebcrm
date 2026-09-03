export interface RegistrationData {
  businessGoal: "new" | "existing" | "";
  entityType: "LLC" | "C-Corp" | "";

  residence: "yes" | "no" | "";
  state: string;

  businessName: string;
  compliancePlan: "compliance" | "self" | "";
  selectedPlan: "free" | "plus" | "pro" | "";
}
