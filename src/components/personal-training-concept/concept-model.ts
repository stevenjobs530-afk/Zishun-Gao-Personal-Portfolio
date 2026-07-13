export type ConceptItemSource = "default" | "user-created";

export type TrainingLibraryItem = {
  id: string;
  trainingName: string;
  equipmentName?: string;
  category: string;
  description?: string;
  source: ConceptItemSource;
  image?: string;
  detail?: string;
};

export type ProgressSummaryMethod = "latest" | "maximum" | "average" | "total";
export type ProgressDirection = "increase" | "decrease" | "maintain";

export type CustomProgressDefinition = {
  id: string;
  progressName: string;
  trainingName: string;
  equipmentName?: string;
  metricName: string;
  unit: string;
  summaryMethod: ProgressSummaryMethod;
  direction?: ProgressDirection;
  source: ConceptItemSource;
};

export const summaryMethodLabels: Record<ProgressSummaryMethod, string> = {
  latest: "Latest value",
  maximum: "Maximum value",
  average: "Average value",
  total: "Total",
};

export const directionLabels: Record<ProgressDirection, string> = {
  increase: "Increase",
  decrease: "Decrease",
  maintain: "Maintain",
};

export function normalizeConceptText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function createConceptId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now().toString(36)}`;
}

function hashDefinition(definition: CustomProgressDefinition) {
  const value = [definition.id, definition.metricName, definition.unit, definition.direction ?? "maintain"].join("|");
  let hash = 2166136261;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function createIllustrativeSeries(definition: CustomProgressDefinition) {
  let state = hashDefinition(definition) || 1;
  const baseline = 28 + (state % 34);

  return Array.from({ length: 7 }, (_, index) => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;

    const variation = (state >>> 0) % 11 - 5;
    const directionChange =
      definition.direction === "increase"
        ? index * 2
        : definition.direction === "decrease"
          ? index * -2
          : (index % 3) - 1;

    return Math.max(1, Math.round(baseline + variation + directionChange));
  });
}

export function summariseIllustrativeSeries(values: number[], method: ProgressSummaryMethod) {
  if (values.length === 0) {
    return 0;
  }

  if (method === "latest") {
    return values.at(-1) ?? 0;
  }

  if (method === "maximum") {
    return Math.max(...values);
  }

  const total = values.reduce((sum, value) => sum + value, 0);
  return method === "average" ? Math.round((total / values.length) * 10) / 10 : total;
}
