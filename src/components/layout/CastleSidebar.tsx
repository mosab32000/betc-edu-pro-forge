import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Users, Home, BookMarked, MessageSquare, Image, Award, Menu, X, FlaskConical, Globe, History, BookCopy } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const CastleSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close sidebar when switching from mobile to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Add overlay for mobile
  const Overlay = () => (
    <div 
      className={cn(
        "fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={toggleSidebar}
    />
  );

  const renderSidebar = () => (
    <aside 
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-72 bg-[hsl(var(--castle-stone))] text-[hsl(var(--foreground))] font-arabic shadow-xl border-l border-[hsl(var(--castle-gold))]",
        "transition-all duration-300 ease-in-out",
        "petra-sidebar",
        isMobile && (
          isOpen 
            ? "translate-x-0" 
            : "translate-x-full"
        ),
        !isMobile && "translate-x-0"
      )}
    >
      <div className="flex flex-col h-full relative">
        {/* Close button for mobile */}
        {isMobile && (
          <button 
            onClick={toggleSidebar}
            className="absolute left-2 top-2 p-2 rounded-full hover:bg-[hsla(var(--castle-magic)/0.1)] text-[hsl(var(--castle-magic))]"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Castle Header */}
        <div className="petra-banner p-4 text-white text-center rounded-bl-xl">
          <h1 className="text-3xl font-bold font-castle mb-1">قلعة Betc</h1>
          <p className="text-sm opacity-80">PetraVerse Edition</p>
        </div>

        {/* Castle Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          <CastleNavItem to="/" icon={<Home />} label="البوابة الرئيسية" />
          <CastleNavItem to="/tasks" icon={<FileText />} label="قاعة المهام" />
          <CastleNavItem to="/wisdom" icon={<BookOpen />} label="برج الحكمة" />
          <CastleNavItem to="/hall" icon={<Users />} label="ميدان الأعمدة" />
          <CastleNavItem to="/heroes" icon={<Award />} label="سجل الأبطال" />
          <CastleNavItem to="/library" icon={<BookMarked />} label="مكتبة المخطوطات" />
          <CastleNavItem to="/chat" icon={<MessageSquare />} label="غرفة الدردشة" />
          <CastleNavItem to="/gallery" icon={<Image />} label="معرض البتراء" />
          <CastleNavItem to="/btec-evaluator" icon={<FlaskConical />} label="معبد الذكاء" />
          
          {/* New navigation items based on PetraVerse theme */}
          <div className="pt-4 pb-2 px-2 text-sm opacity-70 border-t border-[hsla(var(--castle-gold)/0.3)] mt-4">
            <span>عالم البتراء الرقمي</span>
          </div>
          <CastleNavItem to="/research" icon={<Globe />} label="وادي الأبحاث" />
          <CastleNavItem to="/secrets" icon={<History />} label="غرفة الأسرار" />
          <CastleNavItem to="/archive" icon={<BookCopy />} label="الدهليز الأزرق" />
        </nav>

        {/* Castle Footer */}
        <div className="p-4 text-center border-t border-[hsl(var(--castle-gold))] text-xs opacity-70">
          <p>تطوير: مصعب جمال الحلاحلة</p>
          <p>مدرسة أم البساتين الثانوية</p>
          <p className="mt-1 text-[hsl(var(--castle-magic))]">PetraVerse Edition v1.0</p>
        </div>
      </div>
    </aside>
  );

  if (!isMobile) return renderSidebar();

  return (
    <>
      <button 
        onClick={toggleSidebar} 
        className="fixed top-4 right-4 z-50 bg-[hsl(var(--castle-magic))] text-white p-2 rounded-full shadow-lg hover:bg-[hsl(var(--castle-magic)/0.9)] transition-colors"
        aria-label="Toggle Sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>
      <Overlay />
      {renderSidebar()}
    </>
  );
};

interface CastleNavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const CastleNavItem = ({ to, icon, label }: CastleNavItemProps) => {
  return (
    <Link 
      to={to}
      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[hsla(var(--castle-magic)/0.1)] transition-colors"
    >
      <span className="text-[hsl(var(--castle-magic))]">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default CastleSidebar;
