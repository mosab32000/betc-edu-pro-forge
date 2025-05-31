
import React, { useState } from 'react';
import CastleLayout from '@/components/layout/CastleLayout';
import CastleBanner from '@/components/castle/CastleBanner';
import CastleCard from '@/components/castle/CastleCard';
import CastleButton from '@/components/castle/CastleButton';
import ARViewer from '@/components/ar/ARViewer';
import { Camera, Smartphone, Eye, Map, Clock, Star, ChevronRight } from 'lucide-react';

const ARExperiencePage = () => {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);

  const arExperiences = [
    {
      id: 'petra-tour',
      title: 'جولة البتراء الافتراضية',
      description: 'استكشف معالم البتراء التاريخية بتقنية الواقع المعزز',
      duration: '45 دقيقة',
      difficulty: 'مبتدئ',
      icon: <Map className="w-6 h-6" />,
      features: ['نماذج ثلاثية الأبعاد', 'معلومات تاريخية', 'تفاعل صوتي']
    },
    {
      id: 'nabataean-life',
      title: 'حياة الأنباط اليومية',
      description: 'اكتشف كيف عاش الأنباط في العصور القديمة',
      duration: '30 دقيقة',
      difficulty: 'متوسط',
      icon: <Eye className="w-6 h-6" />,
      features: ['محاكاة الحياة', 'شخصيات تفاعلية', 'مهام تعليمية']
    },
    {
      id: 'archaeological-dig',
      title: 'محاكاة الحفريات الأثرية',
      description: 'جرب تجربة عالم الآثار واكتشف القطع الأثرية',
      duration: '60 دقيقة',
      difficulty: 'متقدم',
      icon: <Star className="w-6 h-6" />,
      features: ['أدوات حقيقية', 'اكتشافات أثرية', 'تحليل القطع']
    }
  ];

  const handleStartExperience = (experienceId: string) => {
    setSelectedExperience(experienceId);
  };

  if (selectedExperience) {
    return (
      <CastleLayout>
        <CastleBanner
          title="تجربة الواقع المعزز النشطة"
          subtitle="أنت الآن في تجربة تفاعلية - استخدم جهازك لاستكشاف المحتوى"
          icon={<Camera className="w-8 h-8" />}
          variant="wisdom"
        />
        
        <div className="mb-4">
          <CastleButton 
            variant="outline" 
            onClick={() => setSelectedExperience(null)}
          >
            ← العودة للقائمة الرئيسية
          </CastleButton>
        </div>
        
        <ARViewer />
      </CastleLayout>
    );
  }

  return (
    <CastleLayout>
      <CastleBanner
        title="تجارب الواقع المعزز"
        subtitle="استكشف البتراء والحضارة النبطية من خلال تقنيات الواقع المعزز التفاعلية"
        icon={<Camera className="w-8 h-8" />}
        variant="wisdom"
      />

      {/* دليل الاستخدام */}
      <CastleCard title="كيفية الاستخدام" variant="magic" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <Smartphone className="w-8 h-8 mx-auto mb-2 text-[hsl(var(--castle-magic))]" />
            <h3 className="font-bold mb-1">1. تأكد من جهازك</h3>
            <p className="text-sm">استخدم جهاز يدعم الكاميرا والواقع المعزز</p>
          </div>
          <div className="text-center p-4">
            <Eye className="w-8 h-8 mx-auto mb-2 text-[hsl(var(--castle-wisdom))]" />
            <h3 className="font-bold mb-1">2. اختر التجربة</h3>
            <p className="text-sm">حدد التجربة المناسبة لمستواك واهتماماتك</p>
          </div>
          <div className="text-center p-4">
            <Camera className="w-8 h-8 mx-auto mb-2 text-[hsl(var(--castle-gold))]" />
            <h3 className="font-bold mb-1">3. ابدأ الاستكشاف</h3>
            <p className="text-sm">وجه الكاميرا واستمتع بالتجربة التفاعلية</p>
          </div>
        </div>
      </CastleCard>

      {/* قائمة التجارب */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold mb-4">التجارب المتاحة</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {arExperiences.map((experience) => (
            <CastleCard key={experience.id} variant="stone" className="h-full">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-[hsl(var(--castle-wisdom))]">
                    {experience.icon}
                  </div>
                  <h3 className="text-xl font-bold">{experience.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{experience.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>المدة: {experience.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4" />
                    <span>المستوى: {experience.difficulty}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-bold text-sm mb-2">الميزات:</h4>
                  <ul className="text-sm space-y-1">
                    {experience.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <ChevronRight className="w-3 h-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <CastleButton 
                  variant="wisdom" 
                  className="w-full"
                  onClick={() => handleStartExperience(experience.id)}
                >
                  بدء التجربة
                </CastleButton>
              </div>
            </CastleCard>
          ))}
        </div>
      </div>

      {/* معلومات تقنية */}
      <CastleCard title="المتطلبات التقنية" variant="stone" className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold mb-3">متطلبات النظام:</h3>
            <ul className="space-y-2 text-sm">
              <li>• متصفح حديث يدعم WebXR</li>
              <li>• كاميرا عالية الجودة</li>
              <li>• اتصال إنترنت مستقر</li>
              <li>• مساحة كافية للحركة (2×2 متر)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3">نصائح للحصول على أفضل تجربة:</h3>
            <ul className="space-y-2 text-sm">
              <li>• استخدم إضاءة جيدة ومتوازنة</li>
              <li>• تأكد من وضوح الخلفية</li>
              <li>• احتفظ بالجهاز ثابتاً أثناء التحميل</li>
              <li>• استخدم سماعات للحصول على تجربة صوتية أفضل</li>
            </ul>
          </div>
        </div>
      </CastleCard>
    </CastleLayout>
  );
};

export default ARExperiencePage;
