
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Download, Upload, Sync, HardDrive, Cloud } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface OfflineContent {
  id: string;
  title: string;
  type: 'lesson' | 'assignment' | 'resource';
  size: number;
  downloaded: boolean;
  lastSync: Date;
}

interface SyncStatus {
  isOnline: boolean;
  syncInProgress: boolean;
  lastSyncTime: Date | null;
  pendingUploads: number;
  storageUsed: number;
  storageAvailable: number;
}

const OfflineManager = () => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    isOnline: navigator.onLine,
    syncInProgress: false,
    lastSyncTime: new Date(Date.now() - 3600000), // ساعة واحدة مضت
    pendingUploads: 3,
    storageUsed: 45.7, // MB
    storageAvailable: 200 // MB
  });

  const [offlineContent, setOfflineContent] = useState<OfflineContent[]>([
    {
      id: '1',
      title: 'درس الهندسة المعمارية النبطية',
      type: 'lesson',
      size: 15.2,
      downloaded: true,
      lastSync: new Date(Date.now() - 1800000)
    },
    {
      id: '2',
      title: 'مهمة تحليل النقوش',
      type: 'assignment',
      size: 8.5,
      downloaded: true,
      lastSync: new Date(Date.now() - 3600000)
    },
    {
      id: '3',
      title: 'موارد تاريخ البتراء',
      type: 'resource',
      size: 22.1,
      downloaded: false,
      lastSync: new Date(Date.now() - 7200000)
    },
    {
      id: '4',
      title: 'اختبار الحضارة النبطية',
      type: 'assignment',
      size: 5.8,
      downloaded: true,
      lastSync: new Date(Date.now() - 900000)
    }
  ]);

  // مراقبة حالة الاتصال
  useEffect(() => {
    const handleOnline = () => {
      setSyncStatus(prev => ({ ...prev, isOnline: true }));
      // بدء المزامنة التلقائية عند استعادة الاتصال
      if (syncStatus.pendingUploads > 0) {
        startSync();
      }
    };

    const handleOffline = () => {
      setSyncStatus(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [syncStatus.pendingUploads]);

  const startSync = async () => {
    setSyncStatus(prev => ({ ...prev, syncInProgress: true }));
    
    // محاكاة عملية المزامنة
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setSyncStatus(prev => ({
      ...prev,
      syncInProgress: false,
      lastSyncTime: new Date(),
      pendingUploads: 0
    }));
  };

  const downloadContent = async (contentId: string) => {
    const content = offlineContent.find(c => c.id === contentId);
    if (!content) return;

    // محاكاة تحميل المحتوى
    setOfflineContent(prev => prev.map(c => 
      c.id === contentId 
        ? { ...c, downloaded: true, lastSync: new Date() }
        : c
    ));

    setSyncStatus(prev => ({
      ...prev,
      storageUsed: prev.storageUsed + content.size
    }));
  };

  const removeContent = (contentId: string) => {
    const content = offlineContent.find(c => c.id === contentId);
    if (!content) return;

    setOfflineContent(prev => prev.map(c => 
      c.id === contentId 
        ? { ...c, downloaded: false }
        : c
    ));

    setSyncStatus(prev => ({
      ...prev,
      storageUsed: prev.storageUsed - content.size
    }));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson':
        return '📚';
      case 'assignment':
        return '📝';
      case 'resource':
        return '📄';
      default:
        return '📁';
    }
  };

  const storagePercentage = (syncStatus.storageUsed / syncStatus.storageAvailable) * 100;

  return (
    <div className="space-y-6 p-6 petra-content">
      {/* حالة الاتصال */}
      <div className="petra-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn("hero-badge", {
              'bg-green-500': syncStatus.isOnline,
              'bg-red-500': !syncStatus.isOnline
            })}>
              {syncStatus.isOnline ? 
                <Wifi className="w-6 h-6 text-white" /> : 
                <WifiOff className="w-6 h-6 text-white" />
              }
            </div>
            <div>
              <h1 className="text-2xl font-bold petra-title">مدير العمل دون اتصال</h1>
              <p className="text-sm petra-subtitle">
                {syncStatus.isOnline ? 'متصل بالإنترنت' : 'غير متصل - وضع دون اتصال'}
              </p>
            </div>
          </div>
          
          <Button 
            onClick={startSync}
            disabled={!syncStatus.isOnline || syncStatus.syncInProgress}
            className="bg-[hsl(var(--castle-wisdom))] hover:bg-[hsl(var(--castle-wisdom))/0.9]"
          >
            {syncStatus.syncInProgress ? (
              <>
                <Sync className="w-4 h-4 mr-2 animate-spin" />
                جاري المزامنة...
              </>
            ) : (
              <>
                <Sync className="w-4 h-4 mr-2" />
                مزامنة الآن
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Upload className="w-5 h-5 text-[hsl(var(--castle-fire))]" />
                <span className="text-sm font-medium">في انتظار الرفع</span>
              </div>
              <p className="text-2xl font-bold">{syncStatus.pendingUploads}</p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <HardDrive className="w-5 h-5 text-[hsl(var(--castle-magic))]" />
                <span className="text-sm font-medium">مساحة التخزين</span>
              </div>
              <p className="text-lg font-bold">
                {syncStatus.storageUsed.toFixed(1)} MB / {syncStatus.storageAvailable} MB
              </p>
              <Progress value={storagePercentage} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Cloud className="w-5 h-5 text-[hsl(var(--castle-gold))]" />
                <span className="text-sm font-medium">آخر مزامنة</span>
              </div>
              <p className="text-sm">
                {syncStatus.lastSyncTime ? 
                  syncStatus.lastSyncTime.toLocaleString('ar-SA') : 
                  'لم تتم المزامنة بعد'
                }
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* المحتوى المحفوظ دون اتصال */}
      <div className="petra-panel p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Download className="w-5 h-5 text-[hsl(var(--castle-magic))]" />
          المحتوى المتاح دون اتصال
        </h2>

        <div className="space-y-3">
          {offlineContent.map((content) => (
            <div key={content.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{getTypeIcon(content.type)}</span>
                <div>
                  <h3 className="font-medium">{content.title}</h3>
                  <p className="text-sm text-gray-500">
                    {content.size.toFixed(1)} MB • 
                    آخر تحديث: {content.lastSync.toLocaleString('ar-SA')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {content.downloaded ? (
                  <>
                    <Badge className="bg-green-100 text-green-700">محفوظ</Badge>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeContent(content.id)}
                    >
                      حذف
                    </Button>
                  </>
                ) : (
                  <Button 
                    size="sm"
                    onClick={() => downloadContent(content.id)}
                    disabled={!syncStatus.isOnline}
                    className="bg-[hsl(var(--castle-wisdom))] hover:bg-[hsl(var(--castle-wisdom))/0.9]"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    تحميل
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* نصائح للعمل دون اتصال */}
      <div className="petra-panel p-6">
        <h2 className="text-xl font-bold mb-4">نصائح للعمل دون اتصال</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium mb-2">💡 تحميل المحتوى مسبقاً</h3>
            <p>قم بتحميل الدروس والمواد قبل الانقطاع عن الإنترنت لضمان الوصول إليها.</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-medium mb-2">🔄 المزامنة التلقائية</h3>
            <p>عند استعادة الاتصال، ستتم مزامنة جميع التغييرات تلقائياً.</p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-medium mb-2">💾 إدارة المساحة</h3>
            <p>راقب استخدام مساحة التخزين وقم بحذف المحتوى غير المطلوب.</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <h3 className="font-medium mb-2">📱 وضع الطوارئ</h3>
            <p>الميزات الأساسية متاحة دائماً حتى دون اتصال بالإنترنت.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfflineManager;
