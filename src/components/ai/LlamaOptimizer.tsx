
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import { 
  Bot, 
  Zap, 
  Settings, 
  Brain, 
  Gauge, 
  Memory, 
  Cpu, 
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface ModelConfig {
  temperature: number;
  maxTokens: number;
  topP: number;
  contextWindow: number;
  memoryUsage: string;
  processingSpeed: string;
}

const LlamaOptimizer = () => {
  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.9,
    contextWindow: 4096,
    memoryUsage: '2.3 GB',
    processingSpeed: '1.2 tokens/sec'
  });

  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    responseTime: '1.8s',
    accuracy: 94,
    arabicSupport: 98,
    btecCompliance: 92
  });

  const [isModelRunning, setIsModelRunning] = useState(true);

  const optimizationSteps = [
    'تحليل الأداء الحالي',
    'ضبط معاملات النموذج',
    'تحسين استخدام الذاكرة',
    'معايرة سرعة المعالجة',
    'اختبار دقة الاستجابات',
    'تطبيق التحسينات'
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const startOptimization = async () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);
    setCurrentStep(0);

    for (let i = 0; i < optimizationSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setOptimizationProgress(((i + 1) / optimizationSteps.length) * 100);
    }

    // Simulate performance improvements
    setPerformanceMetrics(prev => ({
      responseTime: '1.2s',
      accuracy: 96,
      arabicSupport: 99,
      btecCompliance: 95
    }));

    setIsOptimizing(false);
  };

  const resetToDefaults = () => {
    setModelConfig({
      temperature: 0.7,
      maxTokens: 2048,
      topP: 0.9,
      contextWindow: 4096,
      memoryUsage: '2.3 GB',
      processingSpeed: '1.2 tokens/sec'
    });
  };

  const toggleModel = () => {
    setIsModelRunning(!isModelRunning);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Model Status */}
      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-[hsl(var(--castle-magic))]" />
            حالة نموذج Llama 3 المحلي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className={cn("w-6 h-6 mx-auto mb-2", isModelRunning ? 'text-green-600' : 'text-gray-400')}>
                {isModelRunning ? <CheckCircle /> : <Pause />}
              </div>
              <div className="font-bold">{isModelRunning ? 'نشط' : 'متوقف'}</div>
              <div className="text-xs text-gray-600">حالة النموذج</div>
            </div>
            
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Memory className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="font-bold">{modelConfig.memoryUsage}</div>
              <div className="text-xs text-gray-600">استخدام الذاكرة</div>
            </div>

            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Gauge className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="font-bold">{modelConfig.processingSpeed}</div>
              <div className="text-xs text-gray-600">سرعة المعالجة</div>
            </div>

            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <Brain className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <div className="font-bold">{performanceMetrics.accuracy}%</div>
              <div className="text-xs text-gray-600">دقة الاستجابات</div>
            </div>
          </div>

          <div className="mt-4 flex gap-2 justify-center">
            <Button onClick={toggleModel} variant={isModelRunning ? 'outline' : 'default'}>
              {isModelRunning ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
              {isModelRunning ? 'إيقاف النموذج' : 'تشغيل النموذج'}
            </Button>
            <Button onClick={startOptimization} disabled={isOptimizing} className="bg-[hsl(var(--castle-magic))]">
              <Zap className="w-4 h-4 mr-1" />
              {isOptimizing ? 'جاري التحسين...' : 'تحسين الأداء'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Progress */}
      {isOptimizing && (
        <Card className="petra-card border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              تحسين النموذج جاري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>التقدم العام</span>
                  <span>{Math.round(optimizationProgress)}%</span>
                </div>
                <Progress value={optimizationProgress} className="h-3" />
              </div>
              
              <div className="text-sm text-gray-600">
                الخطوة الحالية: {optimizationSteps[currentStep]}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {optimizationSteps.map((step, index) => (
                  <div
                    key={index}
                    className={cn(
                      "text-xs p-2 rounded border",
                      index < currentStep ? 'bg-green-100 text-green-700' :
                      index === currentStep ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-500'
                    )}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Performance Metrics */}
      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-5 h-5 text-[hsl(var(--castle-wisdom))]" />
            مقاييس الأداء
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>وقت الاستجابة</span>
                  <span>{performanceMetrics.responseTime}</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>دقة الاستجابات</span>
                  <span>{performanceMetrics.accuracy}%</span>
                </div>
                <Progress value={performanceMetrics.accuracy} className="h-2" />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>دعم اللغة العربية</span>
                  <span>{performanceMetrics.arabicSupport}%</span>
                </div>
                <Progress value={performanceMetrics.arabicSupport} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>توافق معايير BTEC</span>
                  <span>{performanceMetrics.btecCompliance}%</span>
                </div>
                <Progress value={performanceMetrics.btecCompliance} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Model Configuration */}
      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-[hsl(var(--castle-gold))]" />
            إعدادات النموذج المتقدمة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">درجة الحرارة (Temperature)</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={modelConfig.temperature}
                    onChange={(e) => setModelConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                    className="flex-1"
                  />
                  <span className="text-sm w-12">{modelConfig.temperature}</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">أقصى عدد tokens</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="range"
                    min="512"
                    max="4096"
                    step="512"
                    value={modelConfig.maxTokens}
                    onChange={(e) => setModelConfig(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                    className="flex-1"
                  />
                  <span className="text-sm w-16">{modelConfig.maxTokens}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Top-P</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.1"
                    value={modelConfig.topP}
                    onChange={(e) => setModelConfig(prev => ({ ...prev, topP: parseFloat(e.target.value) }))}
                    className="flex-1"
                  />
                  <span className="text-sm w-12">{modelConfig.topP}</span>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">نافذة السياق</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="range"
                    min="1024"
                    max="8192"
                    step="1024"
                    value={modelConfig.contextWindow}
                    onChange={(e) => setModelConfig(prev => ({ ...prev, contextWindow: parseInt(e.target.value) }))}
                    className="flex-1"
                  />
                  <span className="text-sm w-16">{modelConfig.contextWindow}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-2">
            <Button onClick={resetToDefaults} variant="outline">
              <RotateCcw className="w-4 h-4 mr-1" />
              استعادة الافتراضي
            </Button>
            <Button className="bg-[hsl(var(--castle-magic))]">
              حفظ الإعدادات
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* BTEC Integration */}
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          النموذج محسن خصيصاً لمعايير BTEC ويدعم التقييم التلقائي للمهام الأكاديمية بدقة عالية.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default LlamaOptimizer;
