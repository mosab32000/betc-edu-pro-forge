
import React, { useState, useEffect } from 'react';
import { Crown, Users, TrendingUp, AlertTriangle, Settings, Shield, BarChart3, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  totalAssignments: number;
  completionRate: number;
  averageScore: number;
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical';
  alerts: number;
}

interface ClassPerformance {
  id: string;
  name: string;
  studentCount: number;
  averageScore: number;
  completionRate: number;
  trend: 'up' | 'down' | 'stable';
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

const AdminControlCenter = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalUsers: 847,
    activeUsers: 234,
    totalAssignments: 1205,
    completionRate: 78.5,
    averageScore: 84.2,
    systemHealth: 'excellent',
    alerts: 3
  });

  const [classPerformance, setClassPerformance] = useState<ClassPerformance[]>([
    {
      id: '1',
      name: 'الصف العاشر - أ',
      studentCount: 28,
      averageScore: 87.3,
      completionRate: 92.5,
      trend: 'up'
    },
    {
      id: '2',
      name: 'الصف العاشر - ب',
      studentCount: 26,
      averageScore: 82.1,
      completionRate: 85.2,
      trend: 'stable'
    },
    {
      id: '3',
      name: 'الصف الحادي عشر - أ',
      studentCount: 30,
      averageScore: 79.8,
      completionRate: 76.3,
      trend: 'down'
    }
  ]);

  const [recentAlerts, setRecentAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'warning',
      message: 'انخفاض في معدل إكمال المهام للصف الحادي عشر',
      timestamp: new Date(Date.now() - 1800000),
      resolved: false
    },
    {
      id: '2',
      type: 'info',
      message: 'تم تحديث نظام التقييم الذكي بنجاح',
      timestamp: new Date(Date.now() - 3600000),
      resolved: true
    },
    {
      id: '3',
      type: 'error',
      message: 'فشل في تحميل مواد الدرس لمجموعة صغيرة من الطلاب',
      timestamp: new Date(Date.now() - 5400000),
      resolved: false
    }
  ]);

  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'week' | 'month'>('week');

  // محاكاة تحديث البيانات في الوقت الفعلي
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        completionRate: Math.max(0, Math.min(100, prev.completionRate + (Math.random() - 0.5) * 2))
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'good':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '📈';
      case 'down':
        return '📉';
      case 'stable':
        return '➡️';
      default:
        return '📊';
    }
  };

  const resolveAlert = (alertId: string) => {
    setRecentAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
    setMetrics(prev => ({ ...prev, alerts: Math.max(0, prev.alerts - 1) }));
  };

  return (
    <div className="space-y-6 p-6 petra-content">
      {/* رأس مركز القيادة */}
      <div className="petra-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="hero-badge bg-gradient-to-r from-yellow-500 to-orange-600">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold petra-title">مركز القيادة النبطية</h1>
              <p className="text-sm petra-subtitle">لوحة التحكم الرئيسية للمشرفين</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge className={cn("px-3 py-1", getHealthColor(metrics.systemHealth))}>
              حالة النظام: {metrics.systemHealth === 'excellent' ? 'ممتازة' : 
                            metrics.systemHealth === 'good' ? 'جيدة' : 
                            metrics.systemHealth === 'warning' ? 'تحذير' : 'حرجة'}
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-1" />
              إعدادات
            </Button>
          </div>
        </div>

        {/* المقاييس الرئيسية */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-[hsl(var(--castle-magic))]" />
                <span className="text-sm font-medium">إجمالي المستخدمين</span>
              </div>
              <p className="text-2xl font-bold">{metrics.totalUsers}</p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-[hsl(var(--castle-wisdom))]" />
                <span className="text-sm font-medium">نشطون الآن</span>
              </div>
              <p className="text-2xl font-bold text-green-600">{metrics.activeUsers}</p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-[hsl(var(--castle-gold))]" />
                <span className="text-sm font-medium">إجمالي المهام</span>
              </div>
              <p className="text-2xl font-bold">{metrics.totalAssignments}</p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[hsl(var(--castle-fire))]" />
                <span className="text-sm font-medium">معدل الإكمال</span>
              </div>
              <p className="text-2xl font-bold">{metrics.completionRate.toFixed(1)}%</p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[hsl(var(--castle-wisdom))]" />
                <span className="text-sm font-medium">متوسط الدرجات</span>
              </div>
              <p className="text-2xl font-bold">{metrics.averageScore.toFixed(1)}%</p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-[hsl(var(--castle-fire))]" />
                <span className="text-sm font-medium">التنبيهات</span>
              </div>
              <p className="text-2xl font-bold text-orange-600">{metrics.alerts}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* التبويبات الرئيسية */}
      <div className="petra-panel p-6">
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">أداء الصفوف</TabsTrigger>
            <TabsTrigger value="alerts">التنبيهات</TabsTrigger>
            <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            <TabsTrigger value="system">حالة النظام</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">أداء الصفوف الدراسية</h3>
              <div className="flex gap-2">
                <Button 
                  variant={selectedTimeframe === 'today' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe('today')}
                >
                  اليوم
                </Button>
                <Button 
                  variant={selectedTimeframe === 'week' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe('week')}
                >
                  هذا الأسبوع
                </Button>
                <Button 
                  variant={selectedTimeframe === 'month' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTimeframe('month')}
                >
                  هذا الشهر
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classPerformance.map((classItem) => (
                <Card key={classItem.id} className="petra-card">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{classItem.name}</CardTitle>
                        <p className="text-sm text-gray-600">{classItem.studentCount} طالب</p>
                      </div>
                      <span className="text-2xl">{getTrendIcon(classItem.trend)}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">متوسط الدرجات</span>
                        <span className="font-bold text-lg">{classItem.averageScore}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">معدل الإكمال</span>
                        <span className="font-bold text-lg">{classItem.completionRate}%</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        عرض التفاصيل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <h3 className="text-lg font-bold">التنبيهات والإشعارات</h3>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={cn("p-4 rounded-lg border-l-4 flex justify-between items-start", {
                    'bg-blue-50 border-l-blue-500': alert.type === 'info',
                    'bg-yellow-50 border-l-yellow-500': alert.type === 'warning',
                    'bg-red-50 border-l-red-500': alert.type === 'error',
                    'opacity-60': alert.resolved
                  })}
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{alert.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {alert.timestamp.toLocaleString('ar-SA')}
                    </p>
                    {alert.resolved && (
                      <Badge className="mt-2 bg-green-100 text-green-700">تم الحل</Badge>
                    )}
                  </div>
                  {!alert.resolved && (
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => resolveAlert(alert.id)}
                    >
                      وضع علامة كمحلول
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <h3 className="text-lg font-bold">التحليلات التفصيلية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="petra-card">
                <CardHeader>
                  <CardTitle>الاتجاهات الأسبوعية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">رسم بياني للاتجاهات</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="petra-card">
                <CardHeader>
                  <CardTitle>توزيع الدرجات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">رسم بياني للتوزيع</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="system" className="space-y-4">
            <h3 className="text-lg font-bold">حالة النظام والخدمات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="petra-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span className="font-medium">خدمة المصادقة</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">نشطة</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="petra-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-green-500" />
                      <span className="font-medium">قاعدة البيانات</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700">نشطة</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="petra-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">خدمة التقييم</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-700">صيانة</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminControlCenter;
