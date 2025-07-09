import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Monitor, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Shield, 
  Users, 
  Activity,
  Settings,
  Database,
  Cloud,
  Lock,
  Bell,
  BarChart3,
  Server,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Zap,
  Eye,
  FileText,
  Globe,
  Brain,
  Sparkles
} from 'lucide-react';
import PWAManager from '@/components/pwa/PWAManager';
import LlamaOptimizer from '@/components/ai/LlamaOptimizer';
import DharbMillionEngine from '@/components/ai/DharbMillionEngine';

interface SystemMetrics {
  cpu: number;
  memory: number;
  storage: number;
  bandwidth: number;
  users: number;
  uptime: string;
  errors: number;
  requests: number;
  dharbMillionPerformance: number;
  aiAccuracy: number;
}

interface SecurityStatus {
  firewall: boolean;
  ssl: boolean;
  backup: boolean;
  monitoring: boolean;
  threats: number;
  lastScan: Date;
}

const SystemManagementDashboard = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 45,
    memory: 68,
    storage: 32,
    bandwidth: 78,
    users: 1247,
    uptime: '99.9%',
    errors: 3,
    requests: 15420,
    dharbMillionPerformance: 99.8,
    aiAccuracy: 99.9
  });

  const [security, setSecurity] = useState<SecurityStatus>({
    firewall: true,
    ssl: true,
    backup: true,
    monitoring: true,
    threats: 0,
    lastScan: new Date()
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [systemStatus, setSystemStatus] = useState<'optimal' | 'warning' | 'critical'>('optimal');

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(85, prev.memory + (Math.random() - 0.5) * 5)),
        bandwidth: Math.max(40, Math.min(95, prev.bandwidth + (Math.random() - 0.5) * 15)),
        users: prev.users + Math.floor((Math.random() - 0.5) * 10),
        requests: prev.requests + Math.floor(Math.random() * 100),
        dharbMillionPerformance: Math.min(100, Math.max(95, prev.dharbMillionPerformance + (Math.random() - 0.5) * 0.2)),
        aiAccuracy: Math.min(100, Math.max(95, prev.aiAccuracy + (Math.random() - 0.5) * 0.1))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, thresholds = { warning: 70, critical: 85 }) => {
    if (value >= thresholds.critical) return 'text-red-500';
    if (value >= thresholds.warning) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getSystemStatusIcon = () => {
    switch (systemStatus) {
      case 'optimal': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      {/* System Overview Header */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">حالة النظام</p>
                <div className="flex items-center gap-2">
                  {getSystemStatusIcon()}
                  <span className="font-bold">مثالي</span>
                </div>
              </div>
              <Monitor className="w-8 h-8 text-[hsl(var(--castle-magic))]" />
            </div>
          </CardContent>
        </Card>

        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المستخدمون النشطون</p>
                <p className="text-2xl font-bold">{metrics.users.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-[hsl(var(--castle-wisdom))]" />
            </div>
          </CardContent>
        </Card>

        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">وقت التشغيل</p>
                <p className="text-2xl font-bold">{metrics.uptime}</p>
              </div>
              <Clock className="w-8 h-8 text-[hsl(var(--castle-gold))]" />
            </div>
          </CardContent>
        </Card>

        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">أداء ضرب مليون</p>
                <p className="text-2xl font-bold text-purple-600">{metrics.dharbMillionPerformance.toFixed(1)}%</p>
              </div>
              <div className="relative">
                <Brain className="w-8 h-8 text-[hsl(var(--castle-magic))]" />
                <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-500 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">دقة الذكاء الاصطناعي</p>
                <p className="text-2xl font-bold text-green-600">{metrics.aiAccuracy.toFixed(1)}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-[hsl(var(--castle-fire))]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main System Tabs */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="performance">الأداء</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="ai">ضرب مليون</TabsTrigger>
          <TabsTrigger value="pwa">PWA</TabsTrigger>
          <TabsTrigger value="users">المستخدمون</TabsTrigger>
          <TabsTrigger value="logs">السجلات</TabsTrigger>
          <TabsTrigger value="advanced">متقدم</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="petra-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="w-5 h-5" />
                  استخدام الموارد
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>وحدة المعالجة المركزية</span>
                    <span className={getStatusColor(metrics.cpu)}>{metrics.cpu}%</span>
                  </div>
                  <Progress value={metrics.cpu} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>الذاكرة</span>
                    <span className={getStatusColor(metrics.memory)}>{metrics.memory}%</span>
                  </div>
                  <Progress value={metrics.memory} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>التخزين</span>
                    <span className={getStatusColor(metrics.storage, { warning: 80, critical: 90 })}>{metrics.storage}%</span>
                  </div>
                  <Progress value={metrics.storage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>عرض النطاق الترددي</span>
                    <span className={getStatusColor(metrics.bandwidth)}>{metrics.bandwidth}%</span>
                  </div>
                  <Progress value={metrics.bandwidth} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="petra-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  إحصائيات الشبكة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Globe className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                    <div className="font-bold">127 GB</div>
                    <div className="text-xs text-gray-600">البيانات المرسلة</div>
                  </div>
                  
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <Server className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <div className="font-bold">98.7%</div>
                    <div className="text-xs text-gray-600">معدل النجاح</div>
                  </div>
                  
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <Activity className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                    <div className="font-bold">0.12s</div>
                    <div className="text-xs text-gray-600">متوسط الاستجابة</div>
                  </div>
                  
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-red-600" />
                    <div className="font-bold">{metrics.errors}</div>
                    <div className="text-xs text-gray-600">الأخطاء النشطة</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="petra-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[hsl(var(--castle-magic))]" />
                حالة الأمان
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    <span>جدار الحماية</span>
                  </div>
                  <Badge className={security.firewall ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                    {security.firewall ? 'نشط' : 'غير نشط'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Lock className="w-5 h-5 text-green-500" />
                    <span>شهادة SSL</span>
                  </div>
                  <Badge className={security.ssl ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                    {security.ssl ? 'صالحة' : 'منتهية'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-green-500" />
                    <span>النسخ الاحتياطي</span>
                  </div>
                  <Badge className={security.backup ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                    {security.backup ? 'محدث' : 'متأخر'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-green-500" />
                    <span>المراقبة</span>
                  </div>
                  <Badge className={security.monitoring ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                    {security.monitoring ? 'فعّالة' : 'معطلة'}
                  </Badge>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="font-bold">0</div>
                  <div className="text-sm text-gray-600">تهديدات نشطة</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="font-bold">{security.lastScan.toLocaleDateString('ar-SA')}</div>
                  <div className="text-sm text-gray-600">آخر فحص</div>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Zap className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                  <div className="font-bold">عالي</div>
                  <div className="text-sm text-gray-600">مستوى الحماية</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Tab - New Dharb Million */}
        <TabsContent value="ai">
          <DharbMillionEngine />
        </TabsContent>

        {/* PWA Tab */}
        <TabsContent value="pwa">
          <PWAManager />
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card className="petra-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                إدارة المستخدمين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="font-bold">{metrics.users}</div>
                  <div className="text-sm text-gray-600">إجمالي المستخدمين</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="font-bold">847</div>
                  <div className="text-sm text-gray-600">نشط الآن</div>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Bell className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                  <div className="font-bold">15</div>
                  <div className="text-sm text-gray-600">مستخدمون جدد اليوم</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Settings className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="font-bold">23</div>
                  <div className="text-sm text-gray-600">مدراء النظام</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          <Card className="petra-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                سجلات النظام
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: '14:32', type: 'info', message: 'تم تسجيل دخول مستخدم جديد', icon: CheckCircle, color: 'text-green-500' },
                  { time: '14:28', type: 'warning', message: 'استخدام الذاكرة يقترب من الحد الأقصى', icon: AlertTriangle, color: 'text-yellow-500' },
                  { time: '14:25', type: 'info', message: 'تم تشغيل عملية النسخ الاحتياطي', icon: HardDrive, color: 'text-blue-500' },
                  { time: '14:20', type: 'error', message: 'فشل في الاتصال بخدمة خارجية', icon: AlertTriangle, color: 'text-red-500' },
                  { time: '14:15', type: 'info', message: 'تم تحديث نموذج الذكاء الاصطناعي', icon: Zap, color: 'text-purple-500' }
                ].map((log, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
                    <div className="text-sm text-gray-500 w-12">{log.time}</div>
                    <log.icon className={`w-4 h-4 ${log.color}`} />
                    <div className="flex-1 text-sm">{log.message}</div>
                    <Badge variant="outline" className="text-xs">
                      {log.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Tab */}
        <TabsContent value="advanced">
          <LlamaOptimizer />
        </TabsContent>
      </Tabs>

      {/* Status Alerts */}
      {!isOnline && (
        <Alert className="border-yellow-200 bg-yellow-50">
          <Wifi className="h-4 w-4" />
          <AlertDescription>
            النظام يعمل في وضع عدم الاتصال. بعض الميزات قد تكون محدودة.
          </AlertDescription>
        </Alert>
      )}

      {/* Dharb Million Status Alert */}
      <Alert className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4" />
          <Sparkles className="h-3 w-3 animate-pulse" />
        </div>
        <AlertDescription>
          <strong>نظام ضرب مليون نشط:</strong> يعمل بكفاءة {metrics.dharbMillionPerformance.toFixed(1)}% مع دقة {metrics.aiAccuracy.toFixed(1)}%. 
          السرعة الفائقة والذكاء المتقدم يضمنان أفضل تجربة تعليمية.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SystemManagementDashboard;
