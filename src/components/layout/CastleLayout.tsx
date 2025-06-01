
import React, { useState, useEffect } from 'react';
import CastleSidebar from './CastleSidebar';
import Nabata from '@/components/ai/Nabata';
import AdvancedNabata from '@/components/advanced/AdvancedNabata';
import LocationIndicator from '@/components/navigation/LocationIndicator';
import NotificationCenter from '@/components/system/NotificationCenter';
import WelcomeModal from '@/components/onboarding/WelcomeModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Wifi, 
  WifiOff, 
  Zap, 
  Shield, 
  Settings,
  Bell,
  User,
  ChevronUp
} from 'lucide-react';

interface CastleLayoutProps {
  children: React.ReactNode;
}

const CastleLayout = ({ children }: CastleLayoutProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [systemStatus, setSystemStatus] = useState<'optimal' | 'warning' | 'error'>('optimal');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [currentTime, setCurrentTime] = useState(new Date());

  // مراقبة حالة الاتصال
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // مراقبة التمرير
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // تحديث الوقت
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // كل دقيقة

    return () => clearInterval(timer);
  }, []);

  // محاكاة حالة النظام
  useEffect(() => {
    const checkSystemStatus = () => {
      const random = Math.random();
      if (random > 0.9) {
        setSystemStatus('warning');
      } else if (random > 0.95) {
        setSystemStatus('error');
      } else {
        setSystemStatus('optimal');
      }
    };

    const interval = setInterval(checkSystemStatus, 30000); // كل 30 ثانية
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSystemStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getSystemStatusText = (status: string) => {
    switch (status) {
      case 'optimal': return 'مثالي';
      case 'warning': return 'تحذير';
      case 'error': return 'خطأ';
      default: return 'غير معروف';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 relative">
      <CastleSidebar />
      
      {/* شريط الحالة العلوي المحسن */}
      <div className="lg:ml-64 px-4 pt-4 pb-0">
        <div className="bg-white/80 backdrop-blur-sm border border-white/30 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            {/* معلومات الجلسة */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <User className="w-4 h-4 text-gray-600" />
                <span className="font-medium">مرحباً، طالب</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>{currentTime.toLocaleDateString('ar-SA')}</span>
                <span>•</span>
                <span>{currentTime.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            {/* مؤشرات الحالة */}
            <div className="flex items-center gap-3">
              {/* حالة الاتصال */}
              <div className="flex items-center gap-1">
                {isOnline ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : (
                  <WifiOff className="w-4 h-4 text-red-500" />
                )}
                <span className="text-xs">
                  {isOnline ? 'متصل' : 'غير متصل'}
                </span>
              </div>

              {/* حالة النظام */}
              <div className="flex items-center gap-1">
                <Zap className={cn("w-4 h-4", getSystemStatusColor(systemStatus))} />
                <span className="text-xs">
                  {getSystemStatusText(systemStatus)}
                </span>
              </div>

              {/* الأمان */}
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-xs">آمن</span>
              </div>

              {/* الإشعارات */}
              <Button size="sm" variant="outline" className="relative">
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs bg-red-500">
                    {notifications}
                  </Badge>
                )}
              </Button>

              {/* الإعدادات */}
              <Button size="sm" variant="outline">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* مؤشر الموقع */}
        <LocationIndicator />
        
        {/* مركز الإشعارات */}
        <NotificationCenter />
      </div>
      
      {/* المحتوى الرئيسي */}
      <main className="lg:ml-64 p-6 pt-2 relative">
        {/* تأثير خلفية متحرك */}
        <div className="fixed inset-0 pointer-events-none opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[hsl(var(--castle-magic))] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 bg-[hsl(var(--castle-gold))] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-[hsl(var(--castle-wisdom))] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        {children}
      </main>
      
      {/* زر العودة للأعلى */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-24 left-6 z-40 rounded-full w-12 h-12 p-0 shadow-lg bg-[hsl(var(--castle-magic))] hover:bg-[hsl(var(--castle-magic))]/90"
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
      )}
      
      {/* نافذة الترحيب */}
      <WelcomeModal />
      
      {/* نباطا المتقدم - مساعد ذكي عائم */}
      <AdvancedNabata />
      
      {/* نباطا الأساسي كبديل احتياطي */}
      <div className="hidden">
        <Nabata className="bottom-6 right-6" />
      </div>

      {/* مؤشر التحميل العام للصفحة */}
      {!isOnline && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4" />
              <span className="text-sm">أنت تعمل في وضع عدم الاتصال</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CastleLayout;
