
import React from 'react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Zap, 
  Timer,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { EngineStatus } from '../types/dharbMillionTypes';

interface DharbMillionHeaderProps {
  engineStatus: EngineStatus;
  isProcessing: boolean;
  onRunAnalysis: () => void;
}

const DharbMillionHeader: React.FC<DharbMillionHeaderProps> = ({
  engineStatus,
  isProcessing,
  onRunAnalysis
}) => {
  const getStatusIcon = () => {
    switch (engineStatus) {
      case 'optimal': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'enhancing': return <TrendingUp className="w-5 h-5 text-blue-500" />;
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <Card className="petra-card border-2 border-gradient-to-r from-purple-500 to-blue-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Brain className="w-8 h-8 text-[hsl(var(--castle-magic))]" />
              <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-500 animate-pulse" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                محرك ضرب مليون للذكاء الاصطناعي
              </CardTitle>
              <p className="text-sm text-gray-600">النظام الأكثر تقدماً في التعليم الذكي - الجيل القادم</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
              أداء مثالي
            </Badge>
            <Button 
              onClick={onRunAnalysis}
              disabled={isProcessing}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isProcessing ? (
                <>
                  <Timer className="w-4 h-4 mr-2 animate-pulse" />
                  معالجة فائقة...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  تشغيل التحليل العميق
                </>
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default DharbMillionHeader;
