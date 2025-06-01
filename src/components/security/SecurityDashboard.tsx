
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff, 
  Key, 
  FileCheck, 
  AlertTriangle,
  CheckCircle,
  Fingerprint,
  Database,
  Wifi,
  UserCheck,
  Globe,
  Activity
} from 'lucide-react';

interface SecurityFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  status: 'secure' | 'warning' | 'critical';
  icon: React.ReactNode;
}

const SecurityDashboard = () => {
  const [securityFeatures, setSecurityFeatures] = useState<SecurityFeature[]>([
    {
      id: 'e2e-encryption',
      name: 'التشفير من النهاية للنهاية',
      description: 'تشفير جميع البيانات الحساسة محلياً',
      enabled: true,
      status: 'secure',
      icon: <Lock className="w-4 h-4" />
    },
    {
      id: 'data-privacy',
      name: 'حماية الخصوصية',
      description: 'منع تسرب البيانات للخوادم الخارجية',
      enabled: true,
      status: 'secure',
      icon: <Eye className="w-4 h-4" />
    },
    {
      id: 'local-processing',
      name: 'المعالجة المحلية',
      description: 'تشغيل النماذج محلياً دون اتصال بالإنترنت',
      enabled: true,
      status: 'secure',
      icon: <Database className="w-4 h-4" />
    },
    {
      id: 'secure-storage',
      name: 'التخزين الآمن',
      description: 'تشفير بيانات التخزين المحلي',
      enabled: true,
      status: 'secure',
      icon: <FileCheck className="w-4 h-4" />
    },
    {
      id: 'biometric-auth',
      name: 'المصادقة البيومترية',
      description: 'استخدام بصمة الإصبع أو التعرف على الوجه',
      enabled: false,
      status: 'warning',
      icon: <Fingerprint className="w-4 h-4" />
    },
    {
      id: 'audit-logs',
      name: 'سجلات التدقيق',
      description: 'تتبع جميع العمليات الحساسة',
      enabled: true,
      status: 'secure',
      icon: <Activity className="w-4 h-4" />
    }
  ]);

  const [privacyMode, setPrivacyMode] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [securityScore, setSecurityScore] = useState(87);

  const toggleFeature = (featureId: string) => {
    setSecurityFeatures(prev => 
      prev.map(feature => 
        feature.id === featureId 
          ? { ...feature, enabled: !feature.enabled }
          : feature
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'critical': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'secure': return 'bg-green-100 text-green-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      case 'critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const enabledFeatures = securityFeatures.filter(f => f.enabled).length;
  const totalFeatures = securityFeatures.length;

  return (
    <div className="space-y-6 p-6">
      {/* Security Score */}
      <Card className="petra-card border-2 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-600" />
            مؤشر الأمان العام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-green-600 mb-2">{securityScore}%</div>
            <p className="text-gray-600">مستوى الحماية ممتاز</p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 mx-auto mb-1 text-green-600" />
              <div className="font-bold">{enabledFeatures}/{totalFeatures}</div>
              <div className="text-xs text-gray-600">ميزات نشطة</div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Lock className="w-6 h-6 mx-auto mb-1 text-blue-600" />
              <div className="font-bold">AES-256</div>
              <div className="text-xs text-gray-600">مستوى التشفير</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Database className="w-6 h-6 mx-auto mb-1 text-purple-600" />
              <div className="font-bold">100%</div>
              <div className="text-xs text-gray-600">محلي</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Controls */}
      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-[hsl(var(--castle-magic))]" />
            ضوابط الخصوصية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <EyeOff className="w-5 h-5 text-blue-600" />
                <div>
                  <h4 className="font-medium">وضع الخصوصية الكاملة</h4>
                  <p className="text-sm text-gray-600">منع جمع أي بيانات تحليلية</p>
                </div>
              </div>
              <Switch checked={privacyMode} onCheckedChange={setPrivacyMode} />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Wifi className="w-5 h-5 text-orange-600" />
                <div>
                  <h4 className="font-medium">الوضع غير المتصل</h4>
                  <p className="text-sm text-gray-600">تشغيل النظام بدون اتصال بالإنترنت</p>
                </div>
              </div>
              <Switch checked={offlineMode} onCheckedChange={setOfflineMode} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[hsl(var(--castle-wisdom))]" />
            ميزات الأمان
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityFeatures.map((feature) => (
              <div key={feature.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
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
                        <Badge className={getStatusBadge(feature.status)}>
                          {feature.status === 'secure' ? 'آمن' : 
                           feature.status === 'warning' ? 'تحذير' : 'حرج'}
                        </Badge>
                      </h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                  <Switch 
                    checked={feature.enabled} 
                    onCheckedChange={() => toggleFeature(feature.id)} 
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Alerts */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          لضمان أقصى مستوى من الأمان، يُنصح بتفعيل المصادقة البيومترية وتحديث كلمات المرور بانتظام.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default SecurityDashboard;
