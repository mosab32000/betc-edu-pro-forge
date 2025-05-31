
import React from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  FileText, 
  BookOpen, 
  Users, 
  Award, 
  BookMarked, 
  MessageSquare, 
  Image, 
  FlaskConical,
  Globe,
  History,
  BookCopy,
  Palette,
  Trophy,
  Camera
} from 'lucide-react';

const LocationIndicator = () => {
  const location = useLocation();
  
  const getLocationInfo = (pathname: string) => {
    const routes: Record<string, { title: string; icon: React.ReactNode; color: string }> = {
      '/': { title: 'البوابة الرئيسية', icon: <Home />, color: 'text-[hsl(var(--castle-magic))]' },
      '/tasks': { title: 'قاعة المهام', icon: <FileText />, color: 'text-[hsl(var(--castle-gold))]' },
      '/wisdom': { title: 'برج الحكمة', icon: <BookOpen />, color: 'text-[hsl(var(--castle-wisdom))]' },
      '/hall': { title: 'ميدان الأعمدة', icon: <Users />, color: 'text-[hsl(var(--castle-stone))]' },
      '/heroes': { title: 'سجل الأبطال', icon: <Award />, color: 'text-[hsl(var(--castle-gold))]' },
      '/library': { title: 'مكتبة المخطوطات', icon: <BookMarked />, color: 'text-[hsl(var(--castle-stone))]' },
      '/chat': { title: 'غرفة الدردشة', icon: <MessageSquare />, color: 'text-[hsl(var(--castle-magic))]' },
      '/gallery': { title: 'معرض البتراء', icon: <Image />, color: 'text-[hsl(var(--castle-gold))]' },
      '/btec-evaluator': { title: 'معبد الذكاء', icon: <FlaskConical />, color: 'text-[hsl(var(--castle-magic))]' },
      '/research': { title: 'وادي الأبحاث', icon: <Globe />, color: 'text-[hsl(var(--castle-wisdom))]' },
      '/secrets': { title: 'غرفة الأسرار', icon: <History />, color: 'text-[hsl(var(--castle-magic))]' },
      '/archive': { title: 'الدهليز الأزرق', icon: <BookCopy />, color: 'text-[hsl(var(--castle-gold))]' },
      '/creative': { title: 'ورشة الأنباط للإبداع', icon: <Palette />, color: 'text-[hsl(var(--castle-magic))]' },
      '/gamification': { title: 'مركز التحديات والألعاب', icon: <Trophy />, color: 'text-[hsl(var(--castle-gold))]' },
      '/ar-experience': { title: 'تجارب الواقع المعزز', icon: <Camera />, color: 'text-[hsl(var(--castle-wisdom))]' },
    };
    
    return routes[pathname] || { title: 'غير معروف', icon: <Home />, color: 'text-gray-500' };
  };

  const currentLocation = getLocationInfo(location.pathname);

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 mb-4">
      <div className="flex items-center gap-3">
        <div className={cn("text-sm", currentLocation.color)}>
          {currentLocation.icon}
        </div>
        <span className="text-sm font-medium">
          أنت الآن في: {currentLocation.title}
        </span>
      </div>
    </div>
  );
};

export default LocationIndicator;
