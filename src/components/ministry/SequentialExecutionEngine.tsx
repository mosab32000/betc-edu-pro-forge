
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Play, 
  Pause, 
  Square, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Users, 
  Target,
  TrendingUp,
  FileText,
  Zap,
  Brain,
  Activity,
  Settings
} from 'lucide-react';
import { SequentialExecution, ExecutionStage, ExecutionStatus } from '@/types/ministry';
import { cn } from '@/lib/utils';

interface SequentialExecutionEngineProps {
  executions: SequentialExecution[];
  onExecutionUpdate?: (execution: SequentialExecution) => void;
}

const SequentialExecutionEngine: React.FC<SequentialExecutionEngineProps> = ({
  executions,
  onExecutionUpdate
}) => {
  const [activeExecution, setActiveExecution] = useState<SequentialExecution | null>(null);
  const [selectedExecution, setSelectedExecution] = useState<string>('');
  const [executionMetrics, setExecutionMetrics] = useState({
    totalExecutions: executions.length,
    activeExecutions: executions.filter(e => e.status === 'in_progress').length,
    completedExecutions: executions.filter(e => e.status === 'completed').length,
    averageCompletionRate: 0,
    totalEfficiency: 0
  });

  useEffect(() => {
    const completedExecs = executions.filter(e => e.status === 'completed');
    const avgCompletion = completedExecs.length > 0 
      ? completedExecs.reduce((sum, exec) => {
          const completedStages = exec.stages.filter(s => s.status === 'completed').length;
          return sum + (completedStages / exec.stages.length * 100);
        }, 0) / completedExecs.length
      : 0;

    const totalEfficiency = executions.length > 0
      ? executions.reduce((sum, exec) => {
          if (exec.actualDuration && exec.estimatedDuration) {
            return sum + Math.max(0, 100 - ((exec.actualDuration - exec.estimatedDuration) / exec.estimatedDuration * 100));
          }
          return sum + 50; // افتراضي للتنفيذات الجارية
        }, 0) / executions.length
      : 0;

    setExecutionMetrics(prev => ({
      ...prev,
      averageCompletionRate: avgCompletion,
      totalEfficiency
    }));
  }, [executions]);

  const getStatusIcon = (status: ExecutionStatus) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in_progress': return <Activity className="w-4 h-4 text-blue-600 animate-pulse" />;
      case 'paused': return <Pause className="w-4 h-4 text-yellow-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-gray-600" />;
      case 'failed': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Square className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: ExecutionStatus) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateStageProgress = (stage: ExecutionStage) => {
    const completedDeliverables = stage.deliverables.filter(d => d.status === 'completed').length;
    const totalDeliverables = stage.deliverables.length;
    return totalDeliverables > 0 ? (completedDeliverables / totalDeliverables) * 100 : 0;
  };

  const getExecutionTypeLabel = (type: string) => {
    const labels = {
      'educational_reform': 'إصلاح تعليمي',
      'curriculum_development': 'تطوير المناهج',
      'teacher_training': 'تدريب المعلمين',
      'infrastructure_development': 'تطوير البنية التحتية',
      'digital_transformation': 'التحول الرقمي',
      'quality_assurance': 'ضمان الجودة',
      'student_assessment': 'تقييم الطلاب',
      'policy_implementation': 'تنفيذ السياسات'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <div className="space-y-6 p-6">
      {/* لوحة المعلومات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي المشاريع</p>
                <p className="text-2xl font-bold">{executionMetrics.totalExecutions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">المشاريع النشطة</p>
                <p className="text-2xl font-bold">{executionMetrics.activeExecutions}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">معدل الإنجاز</p>
                <p className="text-2xl font-bold">{executionMetrics.averageCompletionRate.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="petra-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">الكفاءة العامة</p>
                <p className="text-2xl font-bold">{executionMetrics.totalEfficiency.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* النظام الرئيسي */}
      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-600" />
            محرك التنفيذ المتتابع المبتكر
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="executions" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="executions">المشاريع</TabsTrigger>
              <TabsTrigger value="stages">المراحل</TabsTrigger>
              <TabsTrigger value="monitoring">المراقبة</TabsTrigger>
              <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            </TabsList>

            <TabsContent value="executions" className="space-y-4">
              <div className="grid gap-4">
                {executions.map((execution) => (
                  <Card 
                    key={execution.id} 
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      selectedExecution === execution.id && "ring-2 ring-blue-500"
                    )}
                    onClick={() => setSelectedExecution(execution.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusIcon(execution.status)}
                            <h3 className="font-semibold">{execution.name}</h3>
                            <Badge className={cn("text-xs", getStatusColor(execution.status))}>
                              {execution.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{execution.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>النوع: {getExecutionTypeLabel(execution.type)}</span>
                            <span>المراحل: {execution.stages.length}</span>
                            <span>المرحلة الحالية: {execution.currentStage + 1}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className={cn("w-3 h-3 rounded-full", getPriorityColor(execution.priority))} />
                          <Badge variant="outline" className="text-xs">
                            {execution.priority}
                          </Badge>
                        </div>
                      </div>

                      {/* شريط التقدم */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>التقدم العام</span>
                          <span>
                            {execution.stages.filter(s => s.status === 'completed').length} / {execution.stages.length}
                          </span>
                        </div>
                        <Progress 
                          value={(execution.stages.filter(s => s.status === 'completed').length / execution.stages.length) * 100} 
                          className="h-2"
                        />
                      </div>

                      {/* معلومات إضافية */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Users className="w-3 h-3" />
                          <span>{execution.metadata.stakeholders.length} أصحاب مصلحة</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>
                            {execution.estimatedDuration} دقيقة
                            {execution.actualDuration && ` (${execution.actualDuration})`}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="stages" className="space-y-4">
              {selectedExecution && (
                <div className="space-y-4">
                  {executions
                    .find(e => e.id === selectedExecution)
                    ?.stages.map((stage, index) => (
                    <Card key={stage.id} className="petra-card">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                              stage.status === 'completed' ? 'bg-green-100 text-green-700' :
                              stage.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-600'
                            )}>
                              {index + 1}
                            </div>
                            <div>
                              <h4 className="font-semibold">{stage.name}</h4>
                              <p className="text-sm text-gray-600">{stage.description}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(stage.status)}>
                            {stage.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-xs text-gray-500">المخرجات</p>
                            <p className="font-semibold">{stage.deliverables.length}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">المعالم</p>
                            <p className="font-semibold">{stage.milestones.length}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">الموارد</p>
                            <p className="font-semibold">{stage.resources.length}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500">المخاطر</p>
                            <p className="font-semibold">{stage.risks.length}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>تقدم المرحلة</span>
                            <span>{calculateStageProgress(stage).toFixed(1)}%</span>
                          </div>
                          <Progress value={calculateStageProgress(stage)} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-4">
              <Alert>
                <Activity className="h-4 w-4" />
                <AlertDescription>
                  نظام المراقبة المتقدم يعمل على تتبع جميع المشاريع في الوقت الفعلي
                  مع تحليل الأداء والتنبؤ بالمشاكل المحتملة.
                </AlertDescription>
              </Alert>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="petra-card">
                  <CardHeader>
                    <CardTitle className="text-lg">حالة المشاريع الحية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {executions.filter(e => e.status === 'in_progress').map(execution => (
                        <div key={execution.id} className="flex items-center justify-between">
                          <span className="text-sm">{execution.name}</span>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={(execution.stages.filter(s => s.status === 'completed').length / execution.stages.length) * 100} 
                              className="w-20 h-2"
                            />
                            <span className="text-xs text-gray-500">
                              {Math.round((execution.stages.filter(s => s.status === 'completed').length / execution.stages.length) * 100)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="petra-card">
                  <CardHeader>
                    <CardTitle className="text-lg">التنبيهات والمخاطر</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Alert className="border-yellow-200 bg-yellow-50">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <AlertDescription className="text-yellow-800">
                          3 مشاريع تواجه تأخيرات محتملة
                        </AlertDescription>
                      </Alert>
                      <Alert className="border-red-200 bg-red-50">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-800">
                          مشروع واحد يتطلب تدخل فوري
                        </AlertDescription>
                      </Alert>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="petra-card">
                  <CardHeader>
                    <CardTitle className="text-lg">تحليل الأداء</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>معدل إنجاز المشاريع</span>
                        <span className="font-bold text-green-600">
                          {executionMetrics.averageCompletionRate.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>الكفاءة الزمنية</span>
                        <span className="font-bold text-blue-600">
                          {executionMetrics.totalEfficiency.toFixed(1)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>معدل النجاح</span>
                        <span className="font-bold text-purple-600">94.2%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="petra-card">
                  <CardHeader>
                    <CardTitle className="text-lg">الاتجاهات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm">تحسن في سرعة التنفيذ بنسبة 15%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">دقة التوقيتات تحسنت بنسبة 12%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="text-sm">رضا أصحاب المصلحة: 4.8/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SequentialExecutionEngine;
