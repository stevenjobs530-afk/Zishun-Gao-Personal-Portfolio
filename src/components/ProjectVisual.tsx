import { AnimatedCardVisual } from "@/components/ui/animated-card";
import { type Project } from "@/data/portfolio";

export function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  return <AnimatedCardVisual visual={visual} />;
}
