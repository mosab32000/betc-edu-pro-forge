
import { ReactNode } from "react";
import CastleSidebar from "./CastleSidebar";
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
        "flex min-h-screen bg-background",
        isMobile 
          ? "flex-col overflow-auto" 
          : "flex-row overflow-hidden",
        "rtl"
      )}
    >
      {!isMobile && <CastleSidebar />}
      {isMobile && (
        <div className="fixed top-0 w-full z-50">
          <CastleSidebar />
        </div>
      )}
      
      <main 
        className={cn(
          "flex-1 p-4 md:p-6 lg:p-8 overflow-auto",
          isMobile 
            ? "mt-16 mb-4 mx-2 rounded-lg" 
            : "m-0",
          className
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default CastleLayout;
