
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import { History, TrendingUp, BarChart2, Brain } from "lucide-react";

const SecretsPage = () => {
  return (
    <CastleLayout>
      <CastleBanner
        title="غرفة الأسرار"
        subtitle="مختبر تحليلات ذكية وتنبؤية لتتبع وتحسين الأداء الأكاديمي"
        icon={<History />}
        variant="magic"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CastleCard 
          title="تحليل الأداء الذكي" 
          icon={<TrendingUp />}
          variant="magic"
        >
          <p className="mb-4">رؤى متعمقة حول أنماط الأداء والتقدم الأكاديمي مدعومة بتحليلات الذكاء الاصطناعي.</p>
          <div className="h-40 bg-[hsla(var(--castle-magic)/0.1)] rounded-lg flex items-center justify-center">
            <p className="text-sm opacity-80">رسم بياني تفاعلي (سيتم تفعيله لاحقاً)</p>
          </div>
        </CastleCard>
        
        <CastleCard 
          title="مؤشرات التقدم" 
          icon={<BarChart2 />}
          variant="gold"
        >
          <p className="mb-4">قياس مستمر للتقدم نحو معايير BTEC المختلفة والأهداف التعليمية.</p>
          <div className="grid grid-cols-3 gap-3">
            {[0.75, 0.45, 0.9, 0.6, 0.3, 0.85].map((value, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-full bg-[hsla(var(--castle-stone)/0.3)] h-24 rounded-lg relative">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-[hsl(var(--castle-magic))] rounded-lg" 
                    style={{height: `${value * 100}%`}}
                  ></div>
                </div>
                <span className="mt-1 text-xs">{`P${index + 1}`}</span>
              </div>
            ))}
          </div>
        </CastleCard>
        
        <CastleCard 
          title="رادار الإنجاز" 
          icon={<Brain />}
          variant="wisdom"
          className="md:col-span-2"
        >
          <p className="mb-4">تقنية ذكية تتنبأ بالمسارات المستقبلية وتقترح خطط للتحسين المستمر.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-3 bg-[hsla(var(--castle-wisdom)/0.1)] rounded-lg">
              <h4 className="font-bold mb-2">التحليل التنبؤي</h4>
              <p className="text-sm">توقع الأداء المستقبلي بناءً على النمط الحالي</p>
            </div>
            <div className="p-3 bg-[hsla(var(--castle-wisdom)/0.1)] rounded-lg">
              <h4 className="font-bold mb-2">تحليل الثغرات</h4>
              <p className="text-sm">تحديد المجالات التي تحتاج إلى تركيز وتطوير</p>
            </div>
            <div className="p-3 bg-[hsla(var(--castle-wisdom)/0.1)] rounded-lg">
              <h4 className="font-bold mb-2">خطط التحسين</h4>
              <p className="text-sm">خارطة طريق مخصصة لتحقيق معايير التميز</p>
            </div>
          </div>
        </CastleCard>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm opacity-70">قريباً: لوحة تحكم متكاملة للمعلمين والمشرفين لتتبع أداء الفصل بالكامل</p>
      </div>
    </CastleLayout>
  );
};

export default SecretsPage;
