
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Brain, 
  Layers, 
  Database, 
  Lightbulb,
  Workflow
} from 'lucide-react';

const IntelligenceTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-500" />
            الفهم السياقي العميق
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Brain className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="font-bold">99.8%</div>
              <div className="text-xs text-gray-600">فهم النوايا الخفية</div>
            </div>
            
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Layers className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="font-bold">99.6%</div>
              <div className="text-xs text-gray-600">تحليل السياق الثقافي</div>
            </div>
            
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Database className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="font-bold">∞</div>
              <div className="text-xs text-gray-600">ذاكرة طويلة الأمد</div>
            </div>
            
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <Lightbulb className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <div className="font-bold">99.2%</div>
              <div className="text-xs text-gray-600">ذكاء استباقي</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="petra-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="w-5 h-5 text-indigo-500" />
            القدرات المتقدمة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-2 border rounded">
            <span className="text-sm">كشف التناقضات المخفية</span>
            <Badge className="bg-green-100 text-green-700">نشط</Badge>
          </div>
          
          <div className="flex items-center justify-between p-2 border rounded">
            <span className="text-sm">الإبداع المدعوم بالمنطق</span>
            <Badge className="bg-blue-100 text-blue-700">متقدم</Badge>
          </div>
          
          <div className="flex items-center justify-between p-2 border rounded">
            <span className="text-sm">التحليل غير التقليدي</span>
            <Badge className="bg-purple-100 text-purple-700">فائق</Badge>
          </div>
          
          <div className="flex items-center justify-between p-2 border rounded">
            <span className="text-sm">المحاكاة التنبؤية</span>
            <Badge className="bg-yellow-100 text-yellow-700">مطور</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntelligenceTab;
