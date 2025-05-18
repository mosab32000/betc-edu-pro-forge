
import { ButtonHTMLAttributes, forwardRef, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

interface CastleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "magic" | "gold" | "stone" | "wisdom" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  hasRipple?: boolean;
  glowOnHover?: boolean;
}

const CastleButton = forwardRef<HTMLButtonElement, CastleButtonProps>(
  ({ 
    className, 
    children, 
    variant = "primary", 
    size = "md", 
    icon, 
    iconPosition = "left", 
    hasRipple = true,
    glowOnHover = true,
    ...props 
  }, ref) => {
    const [isPressed, setIsPressed] = useState(false);
    const [rippleStyle, setRippleStyle] = useState({});
    const [ripples, setRipples] = useState<Array<{id: number, style: React.CSSProperties}>>([]);
    const [rippleId, setRippleId] = useState(0);

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

    const handleRippleEffect = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (!hasRipple) return;
      
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(button.offsetWidth, button.offsetHeight);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      
      const id = rippleId;
      setRippleId(prev => prev + 1);
      
      const newRipple = {
        id,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${x}px`,
          top: `${y}px`
        }
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Cleanup ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 1000);
    };

    const shadows = {
      primary: "shadow-[0_4px_14px_0_rgba(var(--primary-rgb)/0.39)]",
      secondary: "shadow-[0_4px_14px_0_rgba(var(--secondary-rgb)/0.39)]",
      magic: "shadow-[0_4px_14px_0_rgba(var(--castle-magic-rgb)/0.39)]",
      gold: "shadow-[0_4px_14px_0_rgba(var(--castle-gold-rgb)/0.39)]",
      stone: "shadow-[0_4px_14px_0_rgba(var(--castle-stone-rgb)/0.39)]",
      wisdom: "shadow-[0_4px_14px_0_rgba(var(--castle-wisdom-rgb)/0.39)]",
      outline: "shadow-[0_4px_14px_0_rgba(var(--castle-stone-rgb)/0.2)]",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "rounded-lg font-medium transition-all transform active:scale-95 flex items-center justify-center gap-2",
          "relative overflow-hidden animate-pop-on-hover",
          isPressed ? "animate-button-press" : "",
          glowOnHover && shadows[variant],
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => isPressed && setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onClick={handleRippleEffect}
        {...props}
      >
        {/* Ripple effect containers */}
        {hasRipple && ripples.map(ripple => (
          <span 
            key={ripple.id} 
            className="absolute rounded-full bg-white/20 animate-ripple pointer-events-none" 
            style={ripple.style}
          />
        ))}
        
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {icon && iconPosition === "left" && (
            <span className="animate-subtle-bounce">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "right" && (
            <span dir="auto" className="animate-subtle-bounce">{icon}</span>
          )}
        </span>
        
        {/* Glow effect */}
        {glowOnHover && <span className="button-glow absolute inset-0 opacity-0"></span>}
        
        {/* Border decoration inspired by Petra */}
        <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
      </button>
    );
  }
);

CastleButton.displayName = "CastleButton";

export default CastleButton;
