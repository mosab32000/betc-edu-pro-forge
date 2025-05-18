
import { ReactNode, useEffect } from "react";
import CastleSidebar from "./CastleSidebar";
import Nabata from "../ai/Nabata";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";

interface CastleLayoutProps {
  children: ReactNode;
  className?: string;
}

const CastleLayout = ({ children, className }: CastleLayoutProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div 
      className={cn(
        "flex min-h-screen bg-background transition-all duration-300 ease-in-out",
        isMobile 
          ? "flex-col overflow-auto" 
          : "flex-row overflow-hidden",
        "rtl petra-background"
      )}
    >
      {!isMobile && <CastleSidebar />}
      {isMobile && (
        <div className="fixed top-0 w-full z-50 transition-transform duration-300">
          <CastleSidebar />
        </div>
      )}
      
      <div className="petra-overlay absolute inset-0 pointer-events-none"></div>
      
      <main 
        className={cn(
          "flex-1 overflow-auto transition-all duration-300 relative z-10",
          isMobile 
            ? "px-3 py-20 sm:px-4 mx-auto w-full max-w-3xl" 
            : "p-4 md:p-6 lg:p-8 m-0",
          "petra-content",
          className
        )}
      >
        {/* Page transition animation wrapper */}
        <div className="animate-fade-in">
          {children}
        </div>
        
        {/* Page scroll indicator for mobile */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--castle-magic))] to-[hsl(var(--castle-wisdom))] z-50 opacity-80" />
        )}
      </main>
      
      {/* Nabata AI Assistant */}
      <Nabata className="bottom-4 right-4" />
    </div>
  );
};

export default CastleLayout;
