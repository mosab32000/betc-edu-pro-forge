
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  TrendingUp, 
  Activity, 
  Zap, 
  Database, 
  Target
} from 'lucide-react';
import { ContinualLearningState } from '../types/dharbMillionTypes';

interface LearningTabProps {
  learningState: ContinualLearningState;
}

const LearningTab: React.FC<LearningTabProps> = ({ learningState }) => {
  return (
    <Card className="petra-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-500" />
          حالة التعلم المستمر
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
            <Activity className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <div className="font-bold text-xl">{learningState.totalInteractions.toLocaleString()}</div>
            <div className="text-sm text-gray-600">إجمالي التفاعلات</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
            <Zap className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <div className="font-bold text-xl">{learningState.learningAcceleration.toFixed(1)}x</div>
            <div className="text-sm text-gray-600">تسارع التعلم</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
            <Database className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <div className="font-bold text-xl">{learningState.memoryConsolidation.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">ترسيخ الذاكرة</div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
            <Target className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <div className="font-bold text-xl">{learningState.adaptationSpeed.toFixed(1)}%</div>
            <div className="text-sm text-gray-600">سرعة التكيف</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningTab;
