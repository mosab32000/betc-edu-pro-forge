
import React from 'react';
import CastleLayout from '@/components/layout/CastleLayout';
import CastleBanner from '@/components/castle/CastleBanner';
import DharbMillionEngine from '@/components/ai/DharbMillionEngine';
import HybridAnalysisEngine from '@/components/ai/HybridAnalysisEngine';
import AdaptiveLearningCore from '@/components/ai/AdaptiveLearningCore';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Sparkles } from 'lucide-react';

const DharbMillionPage = () => {
  return (
    <CastleLayout>
      <CastleBanner
        title="نظام ضرب مليون للذكاء الاصطناعي"
        subtitle="الجيل القادم من الذكاء الاصطناعي التعليمي - سرعة فائقة، دقة خارقة، تكيف مستمر"
        icon={<><Brain className="w-8 h-8" /><Sparkles className="w-4 h-4 absolute -top-1 -right-1 animate-pulse" /></>}
        variant="magic"
      />
      
      <div className="p-6">
        <Tabs defaultValue="engine" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="engine">محرك ضرب مليون</TabsTrigger>
            <TabsTrigger value="hybrid">التحليل الهجين</TabsTrigger>
            <TabsTrigger value="adaptive">التعلم التكيفي</TabsTrigger>
          </TabsList>
          
          <TabsContent value="engine">
            <DharbMillionEngine />
          </TabsContent>
          
          <TabsContent value="hybrid">
            <HybridAnalysisEngine />
          </TabsContent>
          
          <TabsContent value="adaptive">
            <AdaptiveLearningCore />
          </TabsContent>
        </Tabs>
      </div>
    </CastleLayout>
  );
};

export default DharbMillionPage;
