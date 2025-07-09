
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProcessingStatusProps {
  isProcessing: boolean;
  currentAnalysis: string;
  processingProgress: number;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  isProcessing,
  currentAnalysis,
  processingProgress
}) => {
  if (!isProcessing) return null;

  return (
    <Card className="petra-card">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">{currentAnalysis}</span>
            <span className="text-sm font-bold">{Math.round(processingProgress)}%</span>
          </div>
          <Progress value={processingProgress} className="h-3" />
          <div className="text-center text-sm text-gray-600">
            معالجة فائقة السرعة - دقة تفوق 99.9%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingStatus;
