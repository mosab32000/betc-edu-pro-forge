
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BarChart3, 
  Bot, 
  CheckCircle, 
  Lightbulb, 
  Target
} from 'lucide-react';
import { AIAnalysisResult } from '../types/dharbMillionTypes';
import { dimensionLabels } from '../constants/dharbMillionConstants';

interface AnalysisTabProps {
  analysisResults: AIAnalysisResult[];
}

const AnalysisTab: React.FC<AnalysisTabProps> = ({ analysisResults }) => {
  return (
    <Card className="petra-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          نتائج التحليل العميق الأخيرة
        </CardTitle>
      </CardHeader>
      <CardContent>
        {analysisResults.length === 0 ? (
          <Alert>
            <Bot className="h-4 w-4" />
            <AlertDescription>
              لا توجد نتائج تحليل حتى الآن. اضغط على "تشغيل التحليل العميق" لبدء المعالجة.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            {analysisResults.map((result) => (
              <Card key={result.id} className="border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-medium">تحليل مكتمل</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-100 text-green-700">
                        ثقة {result.confidence}%
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700">
                        {result.processingTime.toFixed(2)}s
                      </Badge>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="dimensions" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="dimensions">الأبعاد</TabsTrigger>
                      <TabsTrigger value="insights">الرؤى</TabsTrigger>
                      <TabsTrigger value="predictions">التنبؤات</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="dimensions" className="space-y-2">
                      {Object.entries(result.dimensions).map(([key, value]) => {
                        return (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-sm">{dimensionLabels[key as keyof typeof dimensionLabels]}</span>
                            <div className="flex items-center gap-2">
                              <Progress value={value} className="w-20" />
                              <span className="text-sm font-medium w-12">{value}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </TabsContent>
                    
                    <TabsContent value="insights" className="space-y-2">
                      {result.insights.map((insight, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-blue-50 rounded">
                          <Lightbulb className="w-4 h-4 text-blue-600 mt-1" />
                          <span className="text-sm">{insight}</span>
                        </div>
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="predictions" className="space-y-2">
                      {result.predictions.map((prediction, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-green-50 rounded">
                          <Target className="w-4 h-4 text-green-600 mt-1" />
                          <span className="text-sm">{prediction}</span>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalysisTab;
