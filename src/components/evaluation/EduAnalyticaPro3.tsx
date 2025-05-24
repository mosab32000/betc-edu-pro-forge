
import React, { useState, useEffect } from 'react';
import { Brain, FileText, TrendingUp, Award, Target, Zap, BookOpen, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface AssessmentResult {
  id: string;
  studentName: string;
  assignment: string;
  overallScore: number;
  criteria: {
    semantic: number;
    stylistic: number;
    ethical: number;
    comparative: number;
    originality: number;
  };
  aiInsights: string[];
  recommendations: string[];
  nftEligible: boolean;
  timestamp: Date;
}

interface PerformanceMetrics {
  totalAssessments: number;
  averageScore: number;
  improvementRate: number;
  aiAccuracy: number;
  processingTime: number;
}

const EduAnalyticaPro3 = () => {
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResult[]>([
    {
      id: '1',
      studentName: 'أحمد محمد',
      assignment: 'تحليل العمارة النبطية في البتراء',
      overallScore: 87,
      criteria: {
        semantic: 90,
        stylistic: 85,
        ethical: 88,
        comparative: 82,
        originality: 91
      },
      aiInsights: [
        'إظهار فهم عميق للتقنيات المعمارية النبطية',
        'استخدام مصطلحات تقنية دقيقة ومناسبة',
        'ربط ممتاز بين التاريخ والجغرافيا'
      ],
      recommendations: [
        'التوسع في مقارنة الأساليب المعمارية مع حضارات أخرى',
        'إضافة المزيد من الأمثلة العملية',
        'تحسين التوثيق المرجعي'
      ],
      nftEligible: true,
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      studentName: 'فاطمة أحمد',
      assignment: 'دراسة الطرق التجارية النبطية',
      overallScore: 92,
      criteria: {
        semantic: 94,
        stylistic: 90,
        ethical: 95,
        comparative: 88,
        originality: 93
      },
      aiInsights: [
        'تحليل اقتصادي متميز للطرق التجارية',
        'استخدام مصادر متنوعة وموثقة بشكل ممتاز',
        'إبداع في ربط التجارة بالتطور الحضاري'
      ],
      recommendations: [
        'ممتاز! يمكن التوسع في الجانب الجغرافي',
        'إضافة خرائط تفاعلية للطرق التجارية'
      ],
      nftEligible: true,
      timestamp: new Date(Date.now() - 7200000)
    }
  ]);

  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    totalAssessments: 156,
    averageScore: 84.7,
    improvementRate: 12.5,
    aiAccuracy: 96.2,
    processingTime: 2.3
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startNewAnalysis = async () => {
    setIsAnalyzing(true);
    
    // محاكاة عملية التحليل الذكي
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const newResult: AssessmentResult = {
      id: Date.now().toString(),
      studentName: 'الطالب الجديد',
      assignment: 'تحليل النقوش النبطية',
      overallScore: Math.floor(Math.random() * 30) + 70,
      criteria: {
        semantic: Math.floor(Math.random() * 20) + 80,
        stylistic: Math.floor(Math.random() * 20) + 75,
        ethical: Math.floor(Math.random() * 15) + 85,
        comparative: Math.floor(Math.random() * 25) + 70,
        originality: Math.floor(Math.random() * 20) + 80
      },
      aiInsights: [
        'تحليل جيد للنقوش والرموز',
        'فهم واضح للسياق التاريخي',
        'استخدام منهجية علمية سليمة'
      ],
      recommendations: [
        'التوسع في التحليل اللغوي',
        'إضافة مقارنات مع نقوش أخرى',
        'تحسين التوثيق المرجعي'
      ],
      nftEligible: Math.random() > 0.3,
      timestamp: new Date()
    };

    setAssessmentResults(prev => [newResult, ...prev]);
    setIsAnalyzing(false);
  };

  const getCriteriaLabel = (key: string) => {
    const labels = {
      semantic: 'التحليل السيميائي',
      stylistic: 'الأسلوب البلاغي',
      ethical: 'البعد الأخلاقي',
      comparative: 'المقارنة',
      originality: 'الأصالة'
    };
    return labels[key as keyof typeof labels] || key;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 90) return 'ممتاز';
    if (score >= 80) return 'جيد جداً';
    if (score >= 70) return 'جيد';
    if (score >= 60) return 'مقبول';
    return 'ضعيف';
  };

  return (
    <div className="space-y-6 p-6 petra-content">
      {/* رأس النظام */}
      <div className="petra-panel p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="hero-badge bg-gradient-to-r from-purple-600 to-blue-600">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold petra-title">EduAnalytica Pro 3.0</h1>
              <p className="text-sm petra-subtitle">PetraVerse Core - محرك التقييم الذكي</p>
            </div>
          </div>
          
          <Button 
            onClick={startNewAnalysis}
            disabled={isAnalyzing}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isAnalyzing ? (
              <>
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                جاري التحليل...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                تحليل جديد
              </>
            )}
          </Button>
        </div>

        {/* مقاييس الأداء */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-[hsl(var(--castle-magic))]" />
                <span className="text-sm font-medium">إجمالي التقييمات</span>
              </div>
              <p className="text-2xl font-bold">{metrics.totalAssessments}</p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[hsl(var(--castle-wisdom))]" />
                <span className="text-sm font-medium">متوسط الدرجات</span>
              </div>
              <p className="text-2xl font-bold">{metrics.averageScore}%</p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-[hsl(var(--castle-gold))]" />
                <span className="text-sm font-medium">معدل التحسن</span>
              </div>
              <p className="text-2xl font-bold">+{metrics.improvementRate}%</p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-[hsl(var(--castle-fire))]" />
                <span className="text-sm font-medium">دقة الذكاء الاصطناعي</span>
              </div>
              <p className="text-2xl font-bold">{metrics.aiAccuracy}%</p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-[hsl(var(--castle-magic))]" />
                <span className="text-sm font-medium">زمن المعالجة</span>
              </div>
              <p className="text-2xl font-bold">{metrics.processingTime}s</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* نتائج التقييم */}
      <div className="petra-panel p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[hsl(var(--castle-magic))]" />
          نتائج التقييم الأخيرة
        </h2>

        <div className="space-y-4">
          {assessmentResults.map((result) => (
            <Card key={result.id} className="petra-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{result.studentName}</CardTitle>
                    <p className="text-sm text-gray-600">{result.assignment}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={cn("px-3 py-1", getScoreColor(result.overallScore))}>
                      {result.overallScore}% - {getScoreBadge(result.overallScore)}
                    </Badge>
                    {result.nftEligible && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        🏆 مؤهل للـ NFT
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="criteria" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="criteria">المعايير</TabsTrigger>
                    <TabsTrigger value="insights">الرؤى الذكية</TabsTrigger>
                    <TabsTrigger value="recommendations">التوصيات</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="criteria" className="space-y-3">
                    {Object.entries(result.criteria).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{getCriteriaLabel(key)}</span>
                        <div className="flex items-center gap-2">
                          <Progress value={value} className="w-20" />
                          <span className={cn("text-sm font-bold", getScoreColor(value))}>
                            {value}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="insights" className="space-y-2">
                    {result.aiInsights.map((insight, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-green-50 rounded">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-sm">{insight}</span>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="recommendations" className="space-y-2">
                    {result.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                        <span className="text-blue-600 mt-1">💡</span>
                        <span className="text-sm">{recommendation}</span>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-gray-500">
                    تم التحليل في: {result.timestamp.toLocaleString('ar-SA')}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ميزات النظام المتقدمة */}
      <div className="petra-panel p-6">
        <h2 className="text-xl font-bold mb-4">ميزات EduAnalytica Pro 3.0</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="petra-card">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4 text-purple-600" />
                التحليل السياقي العميق
              </h3>
              <p className="text-sm text-gray-600">
                فهم السياق والمعنى باستخدام نماذج GPT-4o و BERT-Academic
              </p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-600" />
                بلوكتشين الهوية الأكاديمية
              </h3>
              <p className="text-sm text-gray-600">
                إصدار شهادات NFT للإنجازات المتميزة على شبكة Ethereum
              </p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                التحليل التنبؤي
              </h3>
              <p className="text-sm text-gray-600">
                توقع أداء الطلاب والتدخل المبكر لتحسين النتائج
              </p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                محرك المراجع التلقائي
              </h3>
              <p className="text-sm text-gray-600">
                توثيق تلقائي للمراجع ورادار أصالة متقدم لكشف الانتحال
              </p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-indigo-600" />
                التقييم الجماعي الذكي
              </h3>
              <p className="text-sm text-gray-600">
                تحليل ديناميكيات المجموعة وتقييم المساهمات الفردية
              </p>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Target className="w-4 h-4 text-red-600" />
                التخصيص التكيفي
              </h3>
              <p className="text-sm text-gray-600">
                تكييف معايير التقييم حسب مستوى الطالب وأسلوب التعلم
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EduAnalyticaPro3;
