import type { ComponentType, SVGProps } from "react";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type LibraryCategory = "All" | "Cable" | "Plate Loaded" | "Assisted" | "Free Weight";

export type LibraryItem = {
  id: string;
  name: string;
  category: Exclude<LibraryCategory, "All">;
  image?: string;
  detail: string;
  description: string;
};

const assetPath = (name: string) => `${import.meta.env.BASE_URL}personal-training-concept/${name}`;

export const libraryCategories: LibraryCategory[] = ["All", "Cable", "Plate Loaded", "Assisted", "Free Weight"];

export const libraryItems: LibraryItem[] = [
  {
    id: "cable-row",
    name: "Cable Row Station",
    category: "Cable",
    image: assetPath("cable-row-station.png"),
    detail: "Seat 4 · Neutral grip · Bay 07",
    description: "A fictional custom entry shaped around one gym's cable setup.",
  },
  {
    id: "chest-press",
    name: "Plate Loaded Chest Press",
    category: "Plate Loaded",
    image: assetPath("plate-loaded-chest-press.png"),
    detail: "Independent arms · Upright seat · Bay 12",
    description: "A showcase item with a user-defined name and equipment category.",
  },
  {
    id: "assisted-pull-up",
    name: "Assisted Pull-Up Machine",
    category: "Assisted",
    image: assetPath("assisted-pull-up-machine.png"),
    detail: "Counterweight stack · Wide grip · Bay 03",
    description: "A fictional assisted-movement entry for the personal library.",
  },
  {
    id: "leg-press",
    name: "Custom Leg Press",
    category: "Plate Loaded",
    detail: "45° sled · Plate loaded · Lower floor",
    description: "A custom label that reflects how the user understands their gym.",
  },
  {
    id: "free-weight",
    name: "Free Weight Exercise",
    category: "Free Weight",
    detail: "Adjustable load · Free-weight area",
    description: "A flexible exercise entry without a fixed public catalogue.",
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

export type ProgressView = "Daily" | "Weekly" | "Exercise" | "Machine";

export const progressViews: ProgressView[] = ["Daily", "Weekly", "Exercise", "Machine"];

export const architectureSteps = [
  {
    title: "User Interface",
    body: "The client interface where the training experience comes to life.",
  },
  {
    title: "Next.js Application",
    body: "Server-side rendering and application logic for the intended product.",
  },
  {
    title: "Supabase Authentication",
    body: "Secure sign-in and session management protecting user access.",
  },
  {
    title: "Protected PostgreSQL Data",
    body: "User data stored securely with access scoped to each individual.",
  },
  {
    title: "Training History and Analysis",
    body: "Personalised insights and progress views based on each user's own data.",
  },
] as const;
