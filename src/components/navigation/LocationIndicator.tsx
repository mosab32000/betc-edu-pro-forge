
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Camera,
  MapPin,
  Clock,
  Star
} from 'lucide-react';

const LocationIndicator = () => {
  const location = useLocation();
  const [visitTime, setVisitTime] = useState<Date>(new Date());
  const [activityLevel, setActivityLevel] = useState<'low' | 'medium' | 'high'>('medium');
  
  useEffect(() => {
    setVisitTime(new Date());
    // محاكاة مستوى النشاط بناءً على الوقت
    const hour = new Date().getHours();
    if (hour >= 8 && hour <= 17) {
      setActivityLevel('high');
    } else if (hour >= 18 && hour <= 22) {
      setActivityLevel('medium');
    } else {
      setActivityLevel('low');
    }
  }, [location.pathname]);
  
  const getLocationInfo = (pathname: string) => {
    const routes: Record<string, { 
      title: string; 
      icon: React.ReactNode; 
      color: string;
      description: string;
      category: 'core' | 'advanced' | 'system';
      difficulty: 'beginner' | 'intermediate' | 'advanced';
    }> = {
      '/': { 
        title: 'البوابة الرئيسية', 
        icon: <Home />, 
        color: 'text-[hsl(var(--castle-magic))]',
        description: 'نقطة انطلاق رحلتك في قلعة BTEC',
        category: 'core',
        difficulty: 'beginner'
      },
      '/tasks': { 
        title: 'قاعة المهام', 
        icon: <FileText />, 
        color: 'text-[hsl(var(--castle-gold))]',
        description: 'إدارة وتقييم المهام الأكاديمية',
        category: 'core',
        difficulty: 'intermediate'
      },
      '/wisdom': { 
        title: 'برج الحكمة', 
        icon: <BookOpen />, 
        color: 'text-[hsl(var(--castle-wisdom))]',
        description: 'مصادر التعلم والمحتوى التعليمي',
        category: 'core',
        difficulty: 'beginner'
      },
      '/hall': { 
        title: 'ميدان الأعمدة', 
        icon: <Users />, 
        color: 'text-[hsl(var(--castle-stone))]',
        description: 'التفاعل والنقاشات الجماعية',
        category: 'core',
        difficulty: 'intermediate'
      },
      '/heroes': { 
        title: 'سجل الأبطال', 
        icon: <Award />, 
        color: 'text-[hsl(var(--castle-gold))]',
        description: 'تتبع الإنجازات والتقدم',
        category: 'core',
        difficulty: 'beginner'
      },
      '/library': { 
        title: 'مكتبة المخطوطات', 
        icon: <BookMarked />, 
        color: 'text-[hsl(var(--castle-stone))]',
        description: 'الأرشيف الرقمي للمصادر',
        category: 'core',
        difficulty: 'intermediate'
      },
      '/chat': { 
        title: 'غرفة الدردشة', 
        icon: <MessageSquare />, 
        color: 'text-[hsl(var(--castle-magic))]',
        description: 'التواصل مع المساعد الذكي',
        category: 'advanced',
        difficulty: 'beginner'
      },
      '/gallery': { 
        title: 'معرض البتراء', 
        icon: <Image />, 
        color: 'text-[hsl(var(--castle-gold))]',
        description: 'عرض الأعمال والمشاريع',
        category: 'core',
        difficulty: 'beginner'
      },
      '/btec-evaluator': { 
        title: 'معبد الذكاء', 
        icon: <FlaskConical />, 
        color: 'text-[hsl(var(--castle-magic))]',
        description: 'نظام التقييم الذكي المتقدم',
        category: 'advanced',
        difficulty: 'advanced'
      },
      '/research': { 
        title: 'وادي الأبحاث', 
        icon: <Globe />, 
        color: 'text-[hsl(var(--castle-wisdom))]',
        description: 'قاعدة المعرفة البحثية',
        category: 'advanced',
        difficulty: 'intermediate'
      },
      '/secrets': { 
        title: 'غرفة الأسرار', 
        icon: <History />, 
        color: 'text-[hsl(var(--castle-magic))]',
        description: 'التحليلات والتنبؤات الذكية',
        category: 'system',
        difficulty: 'advanced'
      },
      '/archive': { 
        title: 'الدهليز الأزرق', 
        icon: <BookCopy />, 
        color: 'text-[hsl(var(--castle-gold))]',
        description: 'أرشيف المشاريع والدراسات',
        category: 'system',
        difficulty: 'intermediate'
      },
      '/creative': { 
        title: 'ورشة الأنباط للإبداع', 
        icon: <Palette />, 
        color: 'text-[hsl(var(--castle-magic))]',
        description: 'أدوات الإبداع والتصميم النبطي',
        category: 'advanced',
        difficulty: 'intermediate'
      },
      '/gamification': { 
        title: 'مركز التحديات والألعاب', 
        icon: <Trophy />, 
        color: 'text-[hsl(var(--castle-gold))]',
        description: 'نظام التحفيز والمكافآت',
        category: 'advanced',
        difficulty: 'intermediate'
      },
      '/ar-experience': { 
        title: 'تجارب الواقع المعزز', 
        icon: <Camera />, 
        color: 'text-[hsl(var(--castle-wisdom))]',
        description: 'استكشاف البتراء بتقنية AR',
        category: 'advanced',
        difficulty: 'advanced'
      },
    };
    
    return routes[pathname] || { 
      title: 'موقع غير معروف', 
      icon: <Home />, 
      color: 'text-gray-500',
      description: 'موقع غير محدد في الخريطة',
      category: 'core' as const,
      difficulty: 'beginner' as const
    };
  };

  const currentLocation = getLocationInfo(location.pathname);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'core': return 'bg-blue-100 text-blue-700';
      case 'advanced': return 'bg-purple-100 text-purple-700';
      case 'system': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getActivityLevelColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-green-400';
      case 'medium': return 'bg-yellow-400';
      case 'low': return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <Card className="petra-card mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={cn("text-lg", currentLocation.color)}>
                {currentLocation.icon}
              </div>
              <div className={cn(
                "absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse",
                getActivityLevelColor(activityLevel)
              )}></div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-lg">{currentLocation.title}</span>
                <MapPin className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-sm text-gray-600 mb-2">{currentLocation.description}</p>
              
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getCategoryColor(currentLocation.category)}>
                  {currentLocation.category === 'core' ? 'أساسي' : 
                   currentLocation.category === 'advanced' ? 'متقدم' : 'نظام'}
                </Badge>
                
                <Badge className={getDifficultyColor(currentLocation.difficulty)}>
                  {currentLocation.difficulty === 'beginner' ? 'مبتدئ' : 
                   currentLocation.difficulty === 'intermediate' ? 'متوسط' : 'متقدم'}
                </Badge>
                
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {visitTime.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                </div>
                
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Star className="w-3 h-3" />
                  نشاط {activityLevel === 'high' ? 'عالي' : activityLevel === 'medium' ? 'متوسط' : 'منخفض'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationIndicator;
