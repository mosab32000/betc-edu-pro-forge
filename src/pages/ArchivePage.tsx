
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import { BookCopy, Heart, MessageCircle, ThumbsUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const ArchivePage = () => {
  return (
    <CastleLayout>
      <CastleBanner
        title="الدهليز الأزرق"
        subtitle="تغذية راجعة عاطفية ذكية لتحسين تجربة التعلم"
        icon={<BookCopy />}
        variant="wisdom"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CastleCard 
          title="مرآة المشاعر" 
          icon={<Heart />}
          variant="magic"
        >
          <p className="mb-4">تحليل ذكي للمزاج والمشاعر أثناء عملية التعلم لتقديم دعم تعليمي مخصص.</p>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Checkbox id="emotion1" />
              <label htmlFor="emotion1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                تحليل مشاعر الإحباط أثناء حل المشكلات المعقدة
              </label>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Checkbox id="emotion2" defaultChecked />
              <label htmlFor="emotion2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                اقتراح فترات راحة عند اكتشاف علامات التعب والإرهاق
              </label>
            </div>
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <Checkbox id="emotion3" />
              <label htmlFor="emotion3" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                تقديم تشجيع مخصص عند اكتشاف الحماس والتركيز
              </label>
            </div>
          </div>
        </CastleCard>
        
        <CastleCard 
          title="المدرب العاطفي" 
          icon={<MessageCircle />}
          variant="gold"
        >
          <p className="mb-4">نباطا - مستشارك الشخصي الذي يفهم مشاعرك ويقدم الدعم المناسب في الوقت المناسب.</p>
          
          <div className="border border-[hsl(var(--border))] rounded-lg p-3 bg-background">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--castle-magic))] flex items-center justify-center text-white">ن</div>
              <div className="flex-1">
                <p className="text-sm bg-[hsla(var(--castle-magic)/0.1)] rounded-lg p-2">
                  مرحباً! أرى أنك تعمل على مهمة صعبة. كيف يمكنني مساعدتك اليوم؟
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--castle-stone))] flex items-center justify-center text-white">أ</div>
              <div className="flex-1">
                <p className="text-sm bg-[hsla(var(--castle-stone)/0.1)] rounded-lg p-2">
                  أحاول فهم كيفية تطبيق نموذج PESTEL على دراسة حالة شركة محلية...
                </p>
              </div>
            </div>
          </div>
        </CastleCard>
        
        <CastleCard 
          title="نظام التحفيز الذكي" 
          icon={<ThumbsUp />}
          variant="stone"
          className="md:col-span-2"
        >
          <p className="mb-4">آلية ذكية لتحفيز الطلاب بناءً على تحليل سلوكهم وتفضيلاتهم الشخصية.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 border border-[hsl(var(--border))] rounded-lg">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 flex items-center justify-center text-xs">1</span>
                نمط المنافس
              </h4>
              <p className="text-sm opacity-80">تحفيز من خلال لوحات المتصدرين والمقارنات مع الآخرين</p>
            </div>
            
            <div className="p-3 border border-[hsl(var(--border))] rounded-lg">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-200 text-blue-800 flex items-center justify-center text-xs">2</span>
                نمط المستكشف
              </h4>
              <p className="text-sm opacity-80">تحفيز من خلال الاكتشاف والتعلم المستقل والفضول</p>
            </div>
            
            <div className="p-3 border border-[hsl(var(--border))] rounded-lg">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-green-200 text-green-800 flex items-center justify-center text-xs">3</span>
                نمط المنجز
              </h4>
              <p className="text-sm opacity-80">تحفيز من خلال تتبع الإنجازات والتقدم المستمر</p>
            </div>
          </div>
        </CastleCard>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm opacity-70">قيد التطوير: تكامل مع نظام Sentiment Analysis API للتحليل العاطفي المتقدم</p>
      </div>
    </CastleLayout>
  );
};

export default ArchivePage;
