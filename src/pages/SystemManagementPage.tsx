
import React, { useState } from 'react';
import CastleLayout from "@/components/layout/CastleLayout";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModelManagementSystem from '@/components/ai/ModelManagementSystem';
import SecurityDashboard from '@/components/security/SecurityDashboard';
import PWAManager from '@/components/pwa/PWAManager';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import LlamaOptimizer from '@/components/ai/LlamaOptimizer';
import { 
  Settings, 
  Bot, 
  Shield, 
  Smartphone, 
  BarChart3, 
  Zap,
  CheckCircle,
  Activity,
  Users,
  Database
} from 'lucide-react';

const SystemManagementPage = () => {
  const [systemStatus, setSystemStatus] = useState({
    aiModels: 'optimal',
    security: 'secure',
    pwa: 'active',
    analytics: 'running',
    llama: 'optimized'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
      case 'secure':
      case 'active':
      case 'running':
      case 'optimized':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <CastleLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold petra-title mb-4">
            مركز إدارة النظام المتقدم
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            لوحة تحكم شاملة لإدارة جميع أنظمة قلعة BTEC المتقدمة
          </p>
        </div>

        {/* System Overview */}
        <Card className="petra-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-6 h-6 text-[hsl(var(--castle-magic))]" />
              نظرة عامة على النظام
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <Bot className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <div className="font-bold">نماذج الذكاء الاصطناعي</div>
                <Badge className={getStatusColor(systemStatus.aiModels)}>
                  {systemStatus.aiModels === 'optimal' ? 'مثالي' : systemStatus.aiModels}
                </Badge>
              </div>
              
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <Shield className="w-6 h-6 mx-auto mb-2 text-green-600" />
                <div className="font-bold">الأمان</div>
                <Badge className={getStatusColor(systemStatus.security)}>
                  {systemStatus.security === 'secure' ? 'آمن' : systemStatus.security}
                </Badge>
              </div>
              
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <Smartphone className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                <div className="font-bold">PWA</div>
                <Badge className={getStatusColor(systemStatus.pwa)}>
                  {systemStatus.pwa === 'active' ? 'نشط' : systemStatus.pwa}
                </Badge>
              </div>
              
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <BarChart3 className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
                <div className="font-bold">التحليلات</div>
                <Badge className={getStatusColor(systemStatus.analytics)}>
                  {systemStatus.analytics === 'running' ? 'يعمل' : systemStatus.analytics}
                </Badge>
              </div>
              
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <Zap className="w-6 h-6 mx-auto mb-2 text-red-600" />
                <div className="font-bold">Llama 3</div>
                <Badge className={getStatusColor(systemStatus.llama)}>
                  {systemStatus.llama === 'optimized' ? 'محسن' : systemStatus.llama}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Management Tabs */}
        <Tabs defaultValue="models" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              نماذج الذكاء الاصطناعي
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              الأمان والخصوصية
            </TabsTrigger>
            <TabsTrigger value="pwa" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              PWA المحمول
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              التحليلات
            </TabsTrigger>
            <TabsTrigger value="llama" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              تحسين Llama 3
            </TabsTrigger>
          </TabsList>

          <TabsContent value="models">
            <ModelManagementSystem />
          </TabsContent>

          <TabsContent value="security">
            <SecurityDashboard />
          </TabsContent>

          <TabsContent value="pwa">
            <PWAManager />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="llama">
            <LlamaOptimizer />
          </TabsContent>
        </Tabs>
      </div>
    </CastleLayout>
  );
};

export default SystemManagementPage;
