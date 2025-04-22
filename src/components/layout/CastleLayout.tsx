
import { ReactNode } from "react";
import CastleSidebar from "./CastleSidebar";
import { cn } from "@/lib/utils";

interface CastleLayoutProps {
  children: ReactNode;
  className?: string;
}

const CastleLayout = ({ children, className }: CastleLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-background" dir="rtl">
      <CastleSidebar />
      <main className={cn("flex-1 p-6 overflow-auto", className)}>
        {children}
      </main>
    </div>
  );
};

export default CastleLayout;
