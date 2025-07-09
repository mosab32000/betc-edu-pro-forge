
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, 
  Target, 
  Cpu, 
  Network,
  Gauge
} from 'lucide-react';
import { DharbMillionMetrics } from '../types/dharbMillionTypes';
import { metricLabels } from '../constants/dharbMillionConstants';

interface PerformanceTabProps {
  metrics: DharbMillionMetrics;
}

const PerformanceTab: React.FC<PerformanceTabProps> = ({ metrics }) => {
  const getMetricColor = (value: number) => {
    if (value >= 99) return 'text-green-600';
    if (value >= 95) return 'text-blue-600';
    if (value >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium">سرعة المعالجة</span>
            </div>
            <div className={`text-2xl font-bold ${getMetricColor(metrics.processingSpeed)}`}>
              {metrics.processingSpeed.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500">أقل من 0.5 ثانية</div>
          </CardContent>
        </Card>

        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium">دقة التنبؤ</span>
            </div>
            <div className={`text-2xl font-bold ${getMetricColor(metrics.predictionPrecision)}`}>
              {metrics.predictionPrecision.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500">دقة خارقة</div>
          </CardContent>
        </Card>

        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium">كفاءة عصبية</span>
            </div>
            <div className={`text-2xl font-bold ${getMetricColor(metrics.neuralEfficiency)}`}>
              {metrics.neuralEfficiency.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500">استهلاك ضئيل</div>
          </CardContent>
        </Card>

        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Network className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium">تكامل فوري</span>
            </div>
            <div className={`text-2xl font-bold ${getMetricColor(metrics.realTimeIntegration)}`}>
              {metrics.realTimeIntegration.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-500">ربط حي</div>
          </CardContent>
        </Card>
      </div>

      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            مقاييس الأداء المتقدمة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(metrics).map(([key, value]) => {
            return (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{metricLabels[key as keyof typeof metricLabels]}</span>
                  <span className={`font-bold ${getMetricColor(value)}`}>
                    {value.toFixed(1)}%
                  </span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceTab;
