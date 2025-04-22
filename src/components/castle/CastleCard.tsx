
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CastleCardProps {
  className?: string;
  children: ReactNode;
  title?: string;
  icon?: ReactNode;
  variant?: "default" | "stone" | "magic" | "gold" | "wisdom";
}

const CastleCard = ({ 
  className, 
  children, 
  title, 
  icon,
  variant = "default" 
}: CastleCardProps) => {
  const variantStyles = {
    default: "bg-white border-[hsl(var(--castle-stone))]",
    stone: "bg-[hsla(var(--castle-stone)/0.2)] border-[hsl(var(--castle-stone))]",
    magic: "bg-[hsla(var(--castle-magic)/0.1)] border-[hsl(var(--castle-magic))]",
    gold: "bg-[hsla(var(--castle-gold)/0.1)] border-[hsl(var(--castle-gold))]",
    wisdom: "bg-[hsla(var(--castle-wisdom)/0.1)] border-[hsl(var(--castle-wisdom))]",
  };

  return (
    <div className={cn(
      "castle-wall p-4 rounded-xl border-2",
      variantStyles[variant],
      className
    )}>
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-4 border-b pb-2 border-[hsla(var(--border)/0.3)]">
          {icon && <div className="text-[hsl(var(--castle-magic))]">{icon}</div>}
          {title && <h3 className="text-lg font-bold">{title}</h3>}
        </div>
      )}
      {children}
    </div>
  );
};

export default CastleCard;
