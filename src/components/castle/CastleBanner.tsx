
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CastleBannerProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
  variant?: "default" | "magic" | "gold" | "wisdom";
}

const CastleBanner = ({ 
  title, 
  subtitle, 
  icon, 
  className,
  variant = "default" 
}: CastleBannerProps) => {
  const variantStyles = {
    default: "bg-gradient-to-l from-[hsl(var(--primary))] to-[hsl(var(--secondary))]",
    magic: "bg-gradient-to-l from-[hsl(var(--castle-magic))] to-[hsl(var(--castle-sky))]",
    gold: "bg-gradient-to-l from-[hsl(var(--castle-gold))] to-[hsl(var(--primary))]",
    wisdom: "bg-gradient-to-l from-[hsl(var(--castle-wisdom))] to-[hsl(var(--castle-magic))]",
  };

  return (
    <div className={cn(
      "castle-gate rounded-xl p-6 text-white shadow-lg mb-6",
      variantStyles[variant],
      className
    )}>
      <div className="flex items-center gap-4">
        {icon && <div className="text-4xl">{icon}</div>}
        <div>
          <h1 className="text-3xl font-bold font-castle mb-2">{title}</h1>
          {subtitle && <p className="text-white/80">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
};

export default CastleBanner;
