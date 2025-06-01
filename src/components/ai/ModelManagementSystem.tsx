
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { 
  Bot, 
  Download, 
  Trash2, 
  Play, 
  Pause, 
  Settings, 
  Activity,
  HardDrive,
  Cpu,
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  type: 'llama3' | 'gpt-mini' | 'custom';
  size: string;
  status: 'active' | 'inactive' | 'downloading' | 'error';
  performance: number;
  memoryUsage: string;
  lastUsed: Date;
  downloadProgress?: number;
}

const ModelManagementSystem = () => {
  const [models, setModels] = useState<AIModel[]>([
    {
      id: 'llama3-local',
      name: 'Llama 3 المحلي - التقييم التعليمي',
      type: 'llama3',
      size: '4.1 GB',
      status: 'active',
      performance: 87,
      memoryUsage: '2.3 GB',
      lastUsed: new Date(Date.now() - 10 * 60 * 1000)
    },
    {
      id: 'gpt-mini-backup',
      name: 'GPT-4o Mini - احتياطي سحابي',
      type: 'gpt-mini',
      size: 'سحابي',
      status: 'inactive',
      performance: 92,
      memoryUsage: '0 MB',
      lastUsed: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 'nabata-custom',
      name: 'نباطا المخصص - الشخصية التفاعلية',
      type: 'custom',
      size: '1.8 GB',
      status: 'downloading',
      performance: 85,
      memoryUsage: '0 MB',
      lastUsed: new Date(),
      downloadProgress: 67
    }
  ]);

  const [systemResources, setSystemResources] = useState({
    totalMemory: '8 GB',
    usedMemory: '2.3 GB',
    cpuUsage: 23,
    diskSpace: '156 GB متاح'
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'downloading':
        return <Download className="w-4 h-4 text-blue-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'downloading': return 'bg-blue-100 text-blue-700';
      case 'error': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const toggleModel = (modelId: string) => {
    setModels(prev => prev.map(model => 
      model.id === modelId 
        ? { ...model, status: model.status === 'active' ? 'inactive' : 'active' }
        : model
    ));
  };

  return (
    <div className="space-y-6 p-6">
      {/* System Resources Overview */}
      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[hsl(var(--castle-magic))]" />
            موارد النظام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <HardDrive className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="font-bold">{systemResources.usedMemory}</div>
              <div className="text-sm text-gray-600">الذاكرة المستخدمة</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Cpu className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="font-bold">{systemResources.cpuUsage}%</div>
              <div className="text-sm text-gray-600">استخدام المعالج</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Zap className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="font-bold">متوسط</div>
              <div className="text-sm text-gray-600">الأداء</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <HardDrive className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <div className="font-bold">{systemResources.diskSpace}</div>
              <div className="text-sm text-gray-600">مساحة القرص</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Models List */}
      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-[hsl(var(--castle-wisdom))]" />
            النماذج المثبتة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {models.map((model) => (
              <div key={model.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(model.status)}
                    <div>
                      <h4 className="font-medium">{model.name}</h4>
                      <p className="text-sm text-gray-600">
                        الحجم: {model.size} | آخر استخدام: {model.lastUsed.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(model.status)}>
                      {model.status === 'active' ? 'نشط' : 
                       model.status === 'downloading' ? 'يتم التحميل' : 
                       model.status === 'error' ? 'خطأ' : 'غير نشط'}
                    </Badge>
                    <Button size="sm" variant="outline" onClick={() => toggleModel(model.id)}>
                      {model.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Performance & Memory */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>الأداء</span>
                      <span>{model.performance}%</span>
                    </div>
                    <Progress value={model.performance} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>استخدام الذاكرة</span>
                      <span>{model.memoryUsage}</span>
                    </div>
                    <Progress value={model.memoryUsage === '0 MB' ? 0 : 60} className="h-2" />
                  </div>
                </div>

                {/* Download Progress */}
                {model.status === 'downloading' && model.downloadProgress && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>تقدم التحميل</span>
                      <span>{model.downloadProgress}%</span>
                    </div>
                    <Progress value={model.downloadProgress} className="h-2" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button className="h-20 bg-[hsl(var(--castle-magic))]">
          <div className="text-center">
            <Download className="w-6 h-6 mx-auto mb-1" />
            <div>تحميل نموذج جديد</div>
          </div>
        </Button>
        <Button variant="outline" className="h-20">
          <div className="text-center">
            <Settings className="w-6 h-6 mx-auto mb-1" />
            <div>إعدادات النماذج</div>
          </div>
        </Button>
        <Button variant="outline" className="h-20">
          <div className="text-center">
            <Activity className="w-6 h-6 mx-auto mb-1" />
            <div>مراقبة الأداء</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ModelManagementSystem;
