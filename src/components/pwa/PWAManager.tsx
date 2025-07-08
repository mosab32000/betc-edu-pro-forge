import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { 
  Smartphone, 
  Download, 
  Wifi, 
  WifiOff, 
  Battery, 
  Home, 
  Bell,
  RefreshCw,
  HardDrive,
  Monitor,
  Tablet,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const PWAManager = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [offlineStorage, setOfflineStorage] = useState('2.3 GB');
  const [lastSync, setLastSync] = useState(new Date());

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      setDeviceType('tablet');
    } else if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      setDeviceType('mobile');
    }

    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    // Listen for online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const installPWA = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const result = await installPrompt.userChoice;
      if (result.outcome === 'accepted') {
        setIsInstalled(true);
        setInstallPrompt(null);
      }
    }
  };

  const getDeviceIcon = () => {
    switch (deviceType) {
      case 'mobile': return <Smartphone className="w-5 h-5" />;
      case 'tablet': return <Tablet className="w-5 h-5" />;
      default: return <Monitor className="w-5 h-5" />;
    }
  };

  const features = [
    {
      name: 'تثبيت التطبيق',
      description: 'تثبيت القلعة على جهازك للوصول السريع',
      available: !!installPrompt,
      enabled: isInstalled,
      icon: <Download className="w-4 h-4" />
    },
    {
      name: 'العمل بدون اتصال',
      description: 'استخدام التطبيق حتى بدون اتصال بالإنترنت',
      available: true,
      enabled: true,
      icon: <WifiOff className="w-4 h-4" />
    },
    {
      name: 'المزامنة التلقائية',
      description: 'مزامنة البيانات تلقائياً عند توفر الاتصال',
      available: true,
      enabled: isOnline,
      icon: <RefreshCw className="w-4 h-4" />
    },
    {
      name: 'الإشعارات المحلية',
      description: 'تلقي تنبيهات حول المهام والأنشطة',
      available: true,
      enabled: true,
      icon: <Bell className="w-4 h-4" />
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* PWA Status */}
      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getDeviceIcon()}
            حالة التطبيق المحمول
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className={cn("w-6 h-6 mx-auto mb-2", isInstalled ? 'text-green-600' : 'text-gray-400')}>
                <Home />
              </div>
              <div className="font-bold">{isInstalled ? 'مثبت' : 'غير مثبت'}</div>
              <div className="text-xs text-gray-600">حالة التثبيت</div>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className={cn("w-6 h-6 mx-auto mb-2", isOnline ? 'text-green-600' : 'text-red-600')}>
                {isOnline ? <Wifi /> : <WifiOff />}
              </div>
              <div className="font-bold">{isOnline ? 'متصل' : 'غير متصل'}</div>
              <div className="text-xs text-gray-600">حالة الاتصال</div>
            </div>

            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <HardDrive className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="font-bold">{offlineStorage}</div>
              <div className="text-xs text-gray-600">التخزين المحلي</div>
            </div>

            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <RefreshCw className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <div className="font-bold">{lastSync.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="text-xs text-gray-600">آخر مزامنة</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installation Card */}
      {installPrompt && !isInstalled && (
        <Alert className="border-blue-200 bg-blue-50">
          <Download className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>يمكنك تثبيت قلعة BTEC على جهازك للوصول السريع والعمل بدون اتصال</span>
            <Button onClick={installPWA} className="bg-[hsl(var(--castle-magic))]">
              تثبيت التطبيق
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* PWA Features */}
      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-[hsl(var(--castle-magic))]" />
            ميزات التطبيق المحمول
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-full", 
                      feature.enabled ? 'bg-green-100' : 'bg-gray-100'
                    )}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        {feature.name}
                        {feature.enabled ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-gray-400" />
                        )}
                      </h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                  <Badge className={feature.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                    {feature.enabled ? 'نشط' : 'غير نشط'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Device Optimization */}
      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Battery className="w-5 h-5 text-[hsl(var(--castle-gold))]" />
            تحسين الجهاز
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">نوع الجهاز</h4>
              <div className="flex items-center gap-2">
                {getDeviceIcon()}
                <span className="capitalize">{deviceType === 'mobile' ? 'هاتف محمول' : deviceType === 'tablet' ? 'جهاز لوحي' : 'حاسوب مكتبي'}</span>
              </div>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">وضع توفير البطارية</h4>
              <p className="text-sm text-gray-600">يتم تفعيله تلقائياً عند انخفاض البطارية</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-16 bg-[hsl(var(--castle-magic))]" onClick={() => window.location.reload()}>
          <div className="text-center">
            <RefreshCw className="w-5 h-5 mx-auto mb-1" />
            <div>مزامنة البيانات</div>
          </div>
        </Button>
        
        <Button variant="outline" className="h-16">
          <div className="text-center">
            <HardDrive className="w-5 h-5 mx-auto mb-1" />
            <div>إدارة التخزين</div>
          </div>
        </Button>
        
        <Button variant="outline" className="h-16">
          <div className="text-center">
            <Bell className="w-5 h-5 mx-auto mb-1" />
            <div>إعدادات الإشعارات</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default PWAManager;
