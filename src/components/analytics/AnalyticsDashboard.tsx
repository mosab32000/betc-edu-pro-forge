
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Target,
  BookOpen,
  Award,
  Activity,
  Brain,
  Zap,
  Eye,
  Download,
  Filter
} from 'lucide-react';

interface AnalyticsData {
  period: string;
  sessions: number;
  avgTime: string;
  completionRate: number;
  aiInteractions: number;
}

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([
    { period: 'اليوم', sessions: 8, avgTime: '45 دقيقة', completionRate: 87, aiInteractions: 23 },
    { period: 'هذا الأسبوع', sessions: 34, avgTime: '38 دقيقة', completionRate: 82, aiInteractions: 156 },
    { period: 'هذا الشهر', sessions: 142, avgTime: '42 دقيقة', completionRate: 79, aiInteractions: 634 }
  ]);

  const [learningInsights, setLearningInsights] = useState([
    {
      title: 'المواضيع الأكثر تفاعلاً',
      data: [
        { name: 'برمجة الويب', value: 85, change: '+12%' },
        { name: 'قواعد البيانات', value: 78, change: '+8%' },
        { name: 'الشبكات', value: 72, change: '+5%' },
        { name: 'الأمان السيبراني', value: 69, change: '+15%' }
      ]
    },
    {
      title: 'أوقات النشاط المفضلة',
      data: [
        { name: '09:00 - 12:00', value: 92, change: 'ذروة' },
        { name: '14:00 - 17:00', value: 78, change: 'جيد' },
        { name: '19:00 - 22:00', value: 65, change: 'متوسط' },
        { name: '22:00 - 24:00', value: 34, change: 'منخفض' }
      ]
    }
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState('اليوم');
  const currentData = analyticsData.find(d => d.period === selectedPeriod) || analyticsData[0];

  const performanceMetrics = [
    {
      title: 'معدل إكمال المهام',
      value: currentData.completionRate,
      unit: '%',
      trend: '+5%',
      icon: <Target className="w-5 h-5" />,
      color: 'text-green-600'
    },
    {
      title: 'متوسط وقت الجلسة',
      value: currentData.avgTime,
      unit: '',
      trend: '+8 دقائق',
      icon: <Clock className="w-5 h-5" />,
      color: 'text-blue-600'
    },
    {
      title: 'التفاعلات مع الذكاء الاصطناعي',
      value: currentData.aiInteractions,
      unit: '',
      trend: '+23%',
      icon: <Brain className="w-5 h-5" />,
      color: 'text-purple-600'
    },
    {
      title: 'عدد الجلسات',
      value: currentData.sessions,
      unit: '',
      trend: '+12%',
      icon: <Activity className="w-5 h-5" />,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Period Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold petra-title">لوحة التحليلات المتقدمة</h2>
        <div className="flex gap-2">
          {analyticsData.map((data) => (
            <Button
              key={data.period}
              variant={selectedPeriod === data.period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(data.period)}
              className={selectedPeriod === data.period ? 'bg-[hsl(var(--castle-magic))]' : ''}
            >
              {data.period}
            </Button>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="petra-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-2 rounded-full bg-gray-100", metric.color)}>
                  {metric.icon}
                </div>
                <Badge variant="outline" className="text-green-600">
                  {metric.trend}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                <div className="text-2xl font-bold">
                  {metric.value} {metric.unit}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Insights */}
      {learningInsights.map((insight, index) => (
        <Card key={index} className="petra-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[hsl(var(--castle-wisdom))]" />
              {insight.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {insight.data.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">{typeof item.value === 'number' ? `${item.value}%` : item.value}</span>
                        <Badge variant="outline" className="text-xs">
                          {item.change}
                        </Badge>
                      </div>
                    </div>
                    {typeof item.value === 'number' && (
                      <Progress value={item.value} className="h-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* AI Interaction Analysis */}
      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-[hsl(var(--castle-magic))]" />
            تحليل التفاعل مع الذكاء الاصطناعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Zap className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">{currentData.aiInteractions}</div>
              <div className="text-sm text-gray-600">استفسارات الذكاء الاصطناعي</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Eye className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">94%</div>
              <div className="text-sm text-gray-600">معدل الرضا</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">32 ثانية</div>
              <div className="text-sm text-gray-600">متوسط وقت الاستجابة</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export and Filters */}
      <div className="flex items-center justify-between">
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          تصفية البيانات
        </Button>
        
        <Button className="flex items-center gap-2 bg-[hsl(var(--castle-magic))]">
          <Download className="w-4 h-4" />
          تصدير التقرير
        </Button>
      </div>

      {/* Privacy Notice */}
      <Card className="petra-card border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            <span className="text-sm text-blue-700">
              جميع البيانات التحليلية محفوظة محلياً ولا يتم مشاركتها مع أطراف خارجية
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
