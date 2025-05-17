
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import { Globe, Search, Database, Link } from "lucide-react";

const ResearchPage = () => {
  return (
    <CastleLayout>
      <CastleBanner
        title="وادي الأبحاث"
        subtitle="قاعدة معرفية بحثية متقدمة لدعم التعليم العميق"
        icon={<Globe />}
        variant="wisdom"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CastleCard 
          title="المكتبة البحثية" 
          icon={<Search />}
          variant="stone"
        >
          <p className="mb-4">مساحة مخصصة للبحث في أحدث المراجع والدراسات بمجالات BTEC المختلفة.</p>
          <div className="p-4 bg-[hsla(var(--castle-wisdom)/0.1)] rounded-lg">
            <p className="text-sm opacity-80">تم جمع أكثر من 1,500 مرجع أكاديمي حديث تدعم الوحدات الدراسية المختلفة.</p>
          </div>
        </CastleCard>
        
        <CastleCard 
          title="قاعدة البيانات الحية" 
          icon={<Database />}
          variant="magic"
        >
          <p className="mb-4">مصادر معرفية متجددة تلقائياً باستخدام تقنيات التعلم الآلي.</p>
          <div className="p-4 bg-[hsla(var(--castle-magic)/0.1)] rounded-lg">
            <p className="text-sm opacity-80">يتم تحديث قاعدة البيانات أسبوعياً بأحدث الدراسات والمقالات ذات الصلة بمعايير BTEC.</p>
          </div>
        </CastleCard>
        
        <CastleCard 
          title="الاستشهادات الذكية" 
          icon={<Link />}
          variant="gold"
          className="md:col-span-2"
        >
          <p className="mb-4">نظام آلي لإنشاء وتنسيق المراجع وفق المعايير الأكاديمية العالمية.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-3 bg-[hsla(var(--castle-gold)/0.1)] rounded-lg">
              <h4 className="font-bold mb-2">APA</h4>
              <p className="text-sm">توثيق وفق معايير جمعية علم النفس الأمريكية</p>
            </div>
            <div className="p-3 bg-[hsla(var(--castle-gold)/0.1)] rounded-lg">
              <h4 className="font-bold mb-2">MLA</h4>
              <p className="text-sm">توثيق وفق معايير رابطة اللغات الحديثة</p>
            </div>
            <div className="p-3 bg-[hsla(var(--castle-gold)/0.1)] rounded-lg">
              <h4 className="font-bold mb-2">Harvard</h4>
              <p className="text-sm">توثيق وفق نظام هارفارد المرجعي</p>
            </div>
          </div>
        </CastleCard>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm opacity-70">قريباً: تكامل مع قواعد البيانات العالمية ومحركات البحث المتخصصة</p>
      </div>
    </CastleLayout>
  );
};

export default ResearchPage;
