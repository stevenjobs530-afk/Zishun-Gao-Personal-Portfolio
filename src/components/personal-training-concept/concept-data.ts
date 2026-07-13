import type { ComponentType, SVGProps } from "react";
import type { CustomProgressDefinition, TrainingLibraryItem } from "./concept-model";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const assetPath = (name: string) => `${import.meta.env.BASE_URL}personal-training-concept/${name}`;

export const defaultTrainingLibraryItems: TrainingLibraryItem[] = [
  {
    id: "cable-row",
    trainingName: "Seated Cable Row",
    equipmentName: "Cable Row Station",
    category: "Cable",
    image: assetPath("cable-row-station.png"),
    detail: "Seat 4 · Neutral grip · Bay 07",
    description: "A fictional custom entry shaped around one gym's cable setup.",
    source: "default",
  },
  {
    id: "chest-press",
    trainingName: "Plate Loaded Chest Press",
    equipmentName: "Independent-Arm Chest Press",
    category: "Plate Loaded",
    image: assetPath("plate-loaded-chest-press.png"),
    detail: "Independent arms · Upright seat · Bay 12",
    description: "A showcase item with a user-defined name and equipment category.",
    source: "default",
  },
  {
    id: "assisted-pull-up",
    trainingName: "Assisted Pull-Up",
    equipmentName: "Assisted Pull-Up Machine",
    category: "Assisted",
    image: assetPath("assisted-pull-up-machine.png"),
    detail: "Counterweight stack · Wide grip · Bay 03",
    description: "A fictional assisted-movement entry for the personal library.",
    source: "default",
  },
  {
    id: "leg-press",
    trainingName: "Custom Leg Press",
    equipmentName: "45° Sled",
    category: "Plate Loaded",
    detail: "45° sled · Plate loaded · Lower floor",
    description: "A custom label that reflects how the user understands their gym.",
    source: "default",
  },
  {
    id: "free-weight",
    trainingName: "Free Weight Exercise",
    category: "Free Weight",
    detail: "Adjustable load · Free-weight area",
    description: "A flexible exercise entry without a fixed public catalogue.",
    source: "default",
  },
];

export const defaultProgressDefinitions: CustomProgressDefinition[] = [
  {
    id: "cable-row-working-weight",
    progressName: "Cable Row Working Weight",
    trainingName: "Seated Cable Row",
    equipmentName: "Cable Row Station",
    metricName: "Working-set load",
    unit: "kg",
    summaryMethod: "maximum",
    direction: "increase",
    source: "default",
  },
  {
    id: "weekly-running-distance",
    progressName: "Weekly Running Distance",
    trainingName: "Outdoor Running",
    metricName: "Distance",
    unit: "km",
    summaryMethod: "total",
    direction: "maintain",
    source: "default",
  },
];

export type CardioType = "Walking" | "Running" | "Cycling" | "Elliptical";

export const cardioShowcase: Record<
  CardioType,
  { detail: string; duration: number; distance: string; calories: number }
> = {
  Walking: { detail: "Outdoor Walking", duration: 42, distance: "3.8", calories: 186 },
  Running: { detail: "Outdoor Running", duration: 36, distance: "5.2", calories: 318 },
  Cycling: { detail: "Indoor Cycling", duration: 48, distance: "16.4", calories: 402 },
  Elliptical: { detail: "Elliptical Session", duration: 32, distance: "4.7", calories: 276 },
};

export const architectureSteps = [
  {
    title: "Private user interface",
    body: "An intended interface for recording and reviewing personal training entries.",
  },
  {
    title: "Private application layer",
    body: "The intended product layer for authenticated application logic.",
  },
  {
    title: "Intended authentication",
    body: "A planned access boundary for the private product, separate from this showcase.",
  },
  {
    title: "Protected private data",
    body: "An intended data layer with records scoped to an authenticated account.",
  },
  {
    title: "Training history views",
    body: "A future direction for reviewing a person’s own records and progress definitions.",
  },
] as const;
