
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Bell, 
  BellRing, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Star,
  Trophy,
  Calendar,
  MessageSquare
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    link: string;
  };
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // محاكاة الإشعارات
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'achievement',
        title: 'إنجاز جديد!',
        message: 'حصلت على شارة "مستكشف البتراء" لإكمال 5 جولات AR',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
        action: { label: 'عرض الإنجازات', link: '/heroes' }
      },
      {
        id: '2',
        type: 'info',
        title: 'تحديث جديد',
        message: 'تم إضافة تجارب واقع معزز جديدة لاستكشاف الحضارة النبطية',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: false,
        action: { label: 'استكشف الآن', link: '/ar-experience' }
      },
      {
        id: '3',
        type: 'warning',
        title: 'تذكير مهم',
        message: 'لديك مهمة تحتاج إلى تسليم خلال 24 ساعة',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        read: true,
        action: { label: 'عرض المهام', link: '/tasks' }
      }
    ];
    
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'achievement':
        return <Trophy className="w-5 h-5 text-[hsl(var(--castle-gold))]" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  return (
    <div className="relative">
      {/* زر الإشعارات */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2"
      >
        {unreadCount > 0 ? (
          <BellRing className="w-5 h-5 text-[hsl(var(--castle-magic))]" />
        ) : (
          <Bell className="w-5 h-5" />
        )}
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* لوحة الإشعارات */}
      {isOpen && (
        <div className="absolute left-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
          <div className="border-b border-gray-200 p-4 flex items-center justify-between">
            <h3 className="font-bold">الإشعارات</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  قراءة الكل
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>لا توجد إشعارات جديدة</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "border-b border-gray-100 p-4 hover:bg-gray-50 cursor-pointer",
                    !notification.read && "bg-blue-50"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-400">
                          {notification.timestamp.toLocaleTimeString('ar-EG', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        {notification.action && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = notification.action!.link;
                            }}
                          >
                            {notification.action.label}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
