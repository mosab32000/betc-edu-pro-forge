
import React, { useState, useEffect } from 'react';
import { Shield, Activity, AlertTriangle, CheckCircle, Clock, Server, Database, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  threshold: number;
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: Date;
  resolved: boolean;
}

const NabataeanGuardian = () => {
  const [systemHealth, setSystemHealth] = useState<'healthy' | 'warning' | 'critical'>('healthy');
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { id: '1', name: 'استخدام المعالج', value: 45, unit: '%', status: 'good', threshold: 80 },
    { id: '2', name: 'استخدام الذاكرة', value: 67, unit: '%', status: 'good', threshold: 85 },
    { id: '3', name: 'مساحة القرص', value: 34, unit: '%', status: 'good', threshold: 90 },
    { id: '4', name: 'زمن الاستجابة', value: 120, unit: 'ms', status: 'good', threshold: 500 },
    { id: '5', name: 'المستخدمون النشطون', value: 156, unit: 'مستخدم', status: 'good', threshold: 1000 }
  ]);
  
  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'info',
      message: 'تم تحديث قاعدة البيانات بنجاح',
      timestamp: new Date(Date.now() - 300000),
      resolved: true
    },
    {
      id: '2',
      type: 'warning',
      message: 'زيادة في زمن الاستجابة لخدمة المصادقة',
      timestamp: new Date(Date.now() - 600000),
      resolved: false
    }
  ]);

  const [uptime, setUptime] = useState({ days: 45, hours: 12, minutes: 30 });

  // محاكاة تحديث المقاييس في الوقت الفعلي
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, metric.value + (Math.random() - 0.5) * 10),
        status: metric.value > metric.threshold * 0.9 ? 'critical' : 
                metric.value > metric.threshold * 0.7 ? 'warning' : 'good'
      })));

      // تحديث وقت التشغيل
      setUptime(prev => {
        const newMinutes = prev.minutes + 1;
        if (newMinutes >= 60) {
          const newHours = prev.hours + 1;
          if (newHours >= 24) {
            return { days: prev.days + 1, hours: 0, minutes: 0 };
          }
          return { ...prev, hours: newHours, minutes: 0 };
        }
        return { ...prev, minutes: newMinutes };
      });
    }, 30000); // تحديث كل 30 ثانية

    return () => clearInterval(interval);
  }, []);

  // تحديد حالة النظام العامة
  useEffect(() => {
    const criticalCount = metrics.filter(m => m.status === 'critical').length;
    const warningCount = metrics.filter(m => m.status === 'warning').length;
    
    if (criticalCount > 0) {
      setSystemHealth('critical');
    } else if (warningCount > 0) {
      setSystemHealth('warning');
    } else {
      setSystemHealth('healthy');
    }
  }, [metrics]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const runSystemCheck = () => {
    // محاكاة فحص النظام
    const newAlert: SystemAlert = {
      id: Date.now().toString(),
      type: 'info',
      message: 'تم إجراء فحص شامل للنظام - جميع الخدمات تعمل بشكل طبيعي',
      timestamp: new Date(),
      resolved: true
    };
    
    setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
  };

  return (
    <div className="space-y-6 p-6 petra-content">
      {/* رأس الحارس */}
      <div className="petra-panel p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="hero-badge">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold petra-title">حارس الصيانة النبطي</h1>
              <p className="text-sm petra-subtitle">مراقب النظام الذكي على مدار الساعة</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(systemHealth)}
            <Badge className={cn("px-3 py-1", getStatusColor(systemHealth))}>
              {systemHealth === 'healthy' ? 'النظام سليم' : 
               systemHealth === 'warning' ? 'تحذير' : 'حالة حرجة'}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[hsl(var(--castle-wisdom))]" />
                <span className="text-sm font-medium">وقت التشغيل</span>
              </div>
              <p className="text-lg font-bold mt-2">
                {uptime.days}د {uptime.hours}س {uptime.minutes}ق
              </p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-[hsl(var(--castle-magic))]" />
                <span className="text-sm font-medium">الخدمات النشطة</span>
              </div>
              <p className="text-lg font-bold mt-2">12/12</p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Wifi className="w-5 h-5 text-[hsl(var(--castle-gold))]" />
                <span className="text-sm font-medium">زمن الاستجابة</span>
              </div>
              <p className="text-lg font-bold mt-2">
                {metrics.find(m => m.name === 'زمن الاستجابة')?.value.toFixed(0)}ms
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* مقاييس النظام */}
      <div className="petra-panel p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[hsl(var(--castle-magic))]" />
          مقاييس الأداء المباشرة
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <Card key={metric.id} className={cn("petra-card border-l-4", {
              'border-l-green-500': metric.status === 'good',
              'border-l-yellow-500': metric.status === 'warning',
              'border-l-red-500': metric.status === 'critical'
            })}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm">{metric.name}</h3>
                  <Badge className={cn("text-xs", getStatusColor(metric.status))}>
                    {metric.status === 'good' ? 'طبيعي' : 
                     metric.status === 'warning' ? 'تحذير' : 'حرج'}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">
                    {metric.value.toFixed(metric.unit === 'ms' ? 0 : 1)} {metric.unit}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={cn("h-2 rounded-full transition-all duration-300", {
                        'bg-green-500': metric.status === 'good',
                        'bg-yellow-500': metric.status === 'warning',
                        'bg-red-500': metric.status === 'critical'
                      })}
                      style={{ 
                        width: `${Math.min(100, (metric.value / metric.threshold) * 100)}%` 
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* التنبيهات والأحداث */}
      <div className="petra-panel p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Database className="w-5 h-5 text-[hsl(var(--castle-fire))]" />
            التنبيهات والأحداث الأخيرة
          </h2>
          <Button onClick={runSystemCheck} className="bg-[hsl(var(--castle-wisdom))] hover:bg-[hsl(var(--castle-wisdom))/0.9]">
            فحص شامل للنظام
          </Button>
        </div>

        <div className="space-y-3">
          {alerts.slice(0, 5).map((alert) => (
            <div 
              key={alert.id}
              className={cn("p-4 rounded-lg border-l-4 flex justify-between items-start", {
                'bg-blue-50 border-l-blue-500': alert.type === 'info',
                'bg-yellow-50 border-l-yellow-500': alert.type === 'warning',
                'bg-red-50 border-l-red-500': alert.type === 'error'
              })}
            >
              <div className="flex-1">
                <p className="font-medium text-sm">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {alert.timestamp.toLocaleString('ar-SA')}
                </p>
              </div>
              {alert.resolved && (
                <CheckCircle className="w-4 h-4 text-green-500 mt-1" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NabataeanGuardian;
