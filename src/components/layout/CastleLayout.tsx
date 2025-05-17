
import { ReactNode } from "react";
import CastleSidebar from "./CastleSidebar";
import Nabata from "../ai/Nabata";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface CastleLayoutProps {
  children: ReactNode;
  className?: string;
}

const CastleLayout = ({ children, className }: CastleLayoutProps) => {
  const isMobile = useIsMobile();

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
        {children}
      </main>
      
      {/* Nabata AI Assistant */}
      <Nabata className="bottom-4 right-4" />
    </div>
  );
};

export default CastleLayout;
