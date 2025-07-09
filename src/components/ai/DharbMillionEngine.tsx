
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles } from 'lucide-react';

import DharbMillionHeader from './components/DharbMillionHeader';
import ProcessingStatus from './components/ProcessingStatus';
import PerformanceTab from './components/PerformanceTab';
import IntelligenceTab from './components/IntelligenceTab';
import LearningTab from './components/LearningTab';
import AnalysisTab from './components/AnalysisTab';
import { useDharbMillionEngine } from './hooks/useDharbMillionEngine';

const DharbMillionEngine = () => {
  const {
    metrics,
    learningState,
    analysisResults,
    isProcessing,
    processingProgress,
    currentAnalysis,
    engineStatus,
    runDharbMillionAnalysis
  } = useDharbMillionEngine();

  return (
    <div className="space-y-6 p-6">
      {/* Engine Header */}
      <DharbMillionHeader 
        engineStatus={engineStatus}
        isProcessing={isProcessing}
        onRunAnalysis={runDharbMillionAnalysis}
      />

      {/* Processing Status */}
      <ProcessingStatus 
        isProcessing={isProcessing}
        currentAnalysis={currentAnalysis}
        processingProgress={processingProgress}
      />

      {/* Core Metrics Dashboard */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">الأداء الفائق</TabsTrigger>
          <TabsTrigger value="intelligence">الذكاء السياقي</TabsTrigger>
          <TabsTrigger value="learning">التعلم المستمر</TabsTrigger>
          <TabsTrigger value="analysis">نتائج التحليل</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <PerformanceTab metrics={metrics} />
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-6">
          <IntelligenceTab />
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          <LearningTab learningState={learningState} />
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <AnalysisTab analysisResults={analysisResults} />
        </TabsContent>
      </Tabs>

      {/* System Status Alert */}
      <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <Sparkles className="h-4 w-4" />
        <AlertDescription>
          <strong>محرك ضرب مليون نشط:</strong> يعمل النظام بأقصى كفاءة مع تحسين مستمر للأداء. 
          السرعة الفائقة والدقة الخارقة تضمن تجربة تعليمية لا مثيل لها.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default DharbMillionEngine;
