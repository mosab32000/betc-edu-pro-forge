
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CastleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "magic" | "gold" | "stone" | "wisdom" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
}

const CastleButton = forwardRef<HTMLButtonElement, CastleButtonProps>(
  ({ className, children, variant = "primary", size = "md", icon, ...props }, ref) => {
    const variantStyles = {
      primary: "bg-[hsl(var(--primary))] text-white hover:bg-[hsl(var(--primary))] hover:opacity-90",
      secondary: "bg-[hsl(var(--secondary))] text-white hover:bg-[hsl(var(--secondary))] hover:opacity-90",
      magic: "bg-[hsl(var(--castle-magic))] text-white hover:bg-[hsl(var(--castle-magic))] hover:opacity-90",
      gold: "bg-[hsl(var(--castle-gold))] text-black hover:bg-[hsl(var(--castle-gold))] hover:opacity-90",
      stone: "bg-[hsl(var(--castle-stone))] text-black hover:bg-[hsl(var(--castle-stone))] hover:opacity-90",
      wisdom: "bg-[hsl(var(--castle-wisdom))] text-white hover:bg-[hsl(var(--castle-wisdom))] hover:opacity-90",
      outline: "bg-transparent border-2 border-[hsl(var(--castle-stone))] hover:bg-[hsla(var(--castle-stone)/0.1)]",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1",
      md: "text-sm px-4 py-2",
      lg: "text-base px-6 py-3",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "rounded-lg font-medium transition-all transform active:scale-95 flex items-center justify-center gap-2",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {icon && <span>{icon}</span>}
        {children}
      </button>
    );
  }
);

CastleButton.displayName = "CastleButton";

export default CastleButton;
