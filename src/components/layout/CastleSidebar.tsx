import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Users, Home, BookMarked, MessageSquare, Image, Award, Menu, X } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const CastleSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const renderSidebar = () => (
    <aside 
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-72 bg-[hsl(var(--castle-stone))] text-[hsl(var(--foreground))] font-arabic shadow-xl border-l border-[hsl(var(--castle-gold))]",
        isMobile 
          ? `${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform ease-in-out duration-300 top-0 h-screen`
          : 'translate-x-0'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Castle Header */}
        <div className="castle-banner p-4 text-white text-center rounded-bl-xl">
          <h1 className="text-3xl font-bold font-castle mb-1">قلعة Betc</h1>
          <p className="text-sm opacity-80">الأسطورية</p>
        </div>

        {/* Castle Navigation */}
        <nav className="flex-1 py-4 px-2 space-y-1">
          <CastleNavItem to="/" icon={<Home />} label="البوابة الرئيسية" />
          <CastleNavItem to="/tasks" icon={<FileText />} label="قاعة المهام" />
          <CastleNavItem to="/wisdom" icon={<BookOpen />} label="برج الحكمة" />
          <CastleNavItem to="/hall" icon={<Users />} label="قاعة الأثير" />
          <CastleNavItem to="/heroes" icon={<Award />} label="سجل الأبطال" />
          <CastleNavItem to="/library" icon={<BookMarked />} label="مكتبة المخطوطات" />
          <CastleNavItem to="/chat" icon={<MessageSquare />} label="غرفة الدردشة" />
          <CastleNavItem to="/gallery" icon={<Image />} label="معرض السحر" />
        </nav>

        {/* Castle Footer */}
        <div className="p-4 text-center border-t border-[hsl(var(--castle-gold))] text-xs opacity-70">
          <p>تطوير: مصعب جمال الحلاحلة</p>
          <p>مدرسة أم البساتين الثانوية</p>
        </div>
      </div>
    </aside>
  );

  if (!isMobile) return renderSidebar();

  return (
    <>
      <button 
        onClick={toggleSidebar} 
        className="fixed top-4 right-4 z-50 bg-[hsl(var(--castle-magic))] text-white p-2 rounded-full shadow-lg"
      >
        {isOpen ? <X /> : <Menu />}
      </button>
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
