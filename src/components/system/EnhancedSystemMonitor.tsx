
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  Users, 
  Database,
  Server,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Zap,
  Globe,
  Clock
} from 'lucide-react';

interface SystemMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  temperature: number;
  load: number[];
}

interface NetworkStats {
  incoming: number;
  outgoing: number;
  latency: number;
  connections: number;
}

const EnhancedSystemMonitor = () => {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
    temperature: 0,
    load: [0, 0, 0]
  });

  const [networkStats, setNetworkStats] = useState<NetworkStats>({
    incoming: 0,
    outgoing: 0,
    latency: 0,
    connections: 0
  });

  const [isMonitoring, setIsMonitoring] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    if (!isMonitoring) return;

    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.max(0, Math.min(100, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(0, Math.min(100, prev.memory + (Math.random() - 0.5) * 5)),
        disk: Math.max(0, Math.min(100, prev.disk + (Math.random() - 0.5) * 2)),
        network: Math.max(0, Math.min(100, prev.network + (Math.random() - 0.5) * 15)),
        temperature: Math.max(30, Math.min(80, prev.temperature + (Math.random() - 0.5) * 3)),
        load: [
          Math.max(0, Math.min(4, prev.load[0] + (Math.random() - 0.5) * 0.5)),
          Math.max(0, Math.min(4, prev.load[1] + (Math.random() - 0.5) * 0.3)),
          Math.max(0, Math.min(4, prev.load[2] + (Math.random() - 0.5) * 0.2))
        ]
      }));

      setNetworkStats(prev => ({
        incoming: Math.max(0, prev.incoming + Math.random() * 1000 - 500),
        outgoing: Math.max(0, prev.outgoing + Math.random() * 800 - 400),
        latency: Math.max(1, Math.min(200, prev.latency + (Math.random() - 0.5) * 10)),
        connections: Math.max(0, prev.connections + Math.floor((Math.random() - 0.5) * 10))
      }));

      setLastUpdate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [isMonitoring]);

  const getHealthStatus = (value: number, thresholds = { warning: 70, critical: 90 }) => {
    if (value >= thresholds.critical) return { color: 'text-red-500', status: 'حرج' };
    if (value >= thresholds.warning) return { color: 'text-yellow-500', status: 'تحذير' };
    return { color: 'text-green-500', status: 'طبيعي' };
  };

  const formatBytes = (bytes: number) => {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">وحدة المعالجة</p>
                <p className="text-xl font-bold">{Math.round(metrics.cpu)}%</p>
              </div>
              <Cpu className={`w-6 h-6 ${getHealthStatus(metrics.cpu).color}`} />
            </div>
            <Progress value={metrics.cpu} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الذاكرة</p>
                <p className="text-xl font-bold">{Math.round(metrics.memory)}%</p>
              </div>
              <HardDrive className={`w-6 h-6 ${getHealthStatus(metrics.memory).color}`} />
            </div>
            <Progress value={metrics.memory} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">التخزين</p>
                <p className="text-xl font-bold">{Math.round(metrics.disk)}%</p>
              </div>
              <Database className={`w-6 h-6 ${getHealthStatus(metrics.disk, { warning: 80, critical: 95 }).color}`} />
            </div>
            <Progress value={metrics.disk} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الشبكة</p>
                <p className="text-xl font-bold">{Math.round(metrics.network)}%</p>
              </div>
              <Wifi className={`w-6 h-6 ${getHealthStatus(metrics.network).color}`} />
            </div>
            <Progress value={metrics.network} className="mt-2 h-1" />
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="petra-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              مراقبة الأداء المتقدمة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{metrics.load[0].toFixed(2)}</div>
                <div className="text-xs text-gray-600">حمولة دقيقة</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{metrics.load[1].toFixed(2)}</div>
                <div className="text-xs text-gray-600">حمولة 5 دقائق</div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{metrics.load[2].toFixed(2)}</div>
                <div className="text-xs text-gray-600">حمولة 15 دقيقة</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">درجة الحرارة</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{Math.round(metrics.temperature)}°C</span>
                  <Badge className={metrics.temperature > 70 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}>
                    {metrics.temperature > 70 ? 'مرتفعة' : 'طبيعية'}
                  </Badge>
                </div>
              </div>
              <Progress 
                value={(metrics.temperature / 100) * 100} 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="petra-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              إحصائيات الشبكة
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">البيانات الواردة</span>
                </div>
                <div className="text-lg font-bold">{formatBytes(networkStats.incoming)}/s</div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm">البيانات الصادرة</span>
                </div>
                <div className="text-lg font-bold">{formatBytes(networkStats.outgoing)}/s</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">زمن الاستجابة</span>
                <span className="font-medium">{Math.round(networkStats.latency)}ms</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">الاتصالات النشطة</span>
                <span className="font-medium">{networkStats.connections}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Control Panel */}
      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="w-5 h-5" />
            لوحة التحكم
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {isMonitoring ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                )}
                <span>المراقبة {isMonitoring ? 'نشطة' : 'متوقفة'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  آخر تحديث: {lastUpdate.toLocaleTimeString('ar-SA')}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => setIsMonitoring(!isMonitoring)}
                variant={isMonitoring ? "outline" : "default"}
                size="sm"
              >
                {isMonitoring ? 'إيقاف المراقبة' : 'بدء المراقبة'}
              </Button>
              
              <Button variant="outline" size="sm">
                تصدير التقرير
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedSystemMonitor;
