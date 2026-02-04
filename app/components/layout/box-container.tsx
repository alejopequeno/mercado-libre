import { cn } from "@/lib/utils";

export const BoxContainer = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("bg-card border rounded-xl p-4 shadow-md", className)}
      {...props}
    >
      {children}
    </div>
  );
};
