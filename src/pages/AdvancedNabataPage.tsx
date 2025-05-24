
import React from 'react';
import CastleLayout from '@/components/layout/CastleLayout';
import CastleBanner from '@/components/castle/CastleBanner';
import AdvancedNabata from '@/components/advanced/AdvancedNabata';
import { Bot } from 'lucide-react';

const AdvancedNabataPage = () => {
  return (
    <CastleLayout>
      <CastleBanner
        title="نباطا المتقدم - المساعد الذكي"
        subtitle="مساعد ذكي بقدرات عاطفية وتفاعل صوتي متقدم لدعم رحلتك التعليمية"
        icon={<Bot className="w-8 h-8" />}
        variant="magic"
      />
      
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">تجربة تفاعلية متقدمة مع نباطا</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            اختبر قدرات نباطا المتطورة في فهم المشاعر والتفاعل الصوتي والإجابة الذكية على استفساراتك التعليمية.
          </p>
        </div>
        
        {/* نباطا سيظهر في الزاوية اليمنى السفلى عبر المكون المدمج */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">
            انقر على أيقونة نباطا في أسفل يمين الشاشة لبدء المحادثة
          </p>
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-6">
            <h3 className="font-bold mb-3">ميزات نباطا المتقدمة:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>فهم المشاعر والحالة النفسية</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>تفاعل صوتي ثنائي الاتجاه</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>اقتراحات ذكية مخصصة</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>ذاكرة طويلة المدى للمحادثات</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CastleLayout>
  );
};

export default AdvancedNabataPage;
