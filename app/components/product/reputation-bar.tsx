/**
 * Reputation Bar Component
 * Visual indicator of seller reputation level (MercadoLibre style)
 */
import { cn } from "@/lib/utils";

type ReputationLevel = "red" | "orange" | "yellow" | "light_green" | "green";

interface ReputationBarProps {
  level: ReputationLevel;
  className?: string;
}

const REPUTATION_LEVELS = [
  { level: "red", color: "bg-red-500", rounded: "rounded-l-full" },
  { level: "orange", color: "bg-orange-500", rounded: "" },
  { level: "yellow", color: "bg-yellow-500", rounded: "" },
  { level: "light_green", color: "bg-green-200", rounded: "" },
  { level: "green", color: "bg-green-500", rounded: "rounded-r-full" },
] as const;

export function ReputationBar({ level, className }: ReputationBarProps) {
  return (
    <div className={cn("flex gap-1", className)}>
      {REPUTATION_LEVELS.map(({ level: barLevel, color, rounded }) => (
        <div
          key={barLevel}
          className={cn(
            "h-1.5 flex-1",
            color,
            rounded,
            level === barLevel ? "opacity-100" : "opacity-20",
          )}
        />
      ))}
    </div>
  );
}
