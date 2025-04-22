
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import CastleButton from "@/components/castle/CastleButton";
import { FileText, BookOpen, Users, Award, BookMarked, MessageSquare, Image, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <CastleLayout>
      <CastleBanner
        title="قلعة Betc الأسطورية"
        subtitle="نظام تقييم وتعليم ذكي مبني على معايير Pearson BTEC"
        variant="magic"
      />

      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">مرحباً بك في نظام Betc و EduAnalytica Pro</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            منصة تعليمية مبتكرة تهدف إلى تحسين جودة التعليم والتقييم من خلال استخدام 
            تقنيات الذكاء الاصطناعي والبلوكتشين.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CastleFeatureCard 
            title="قاعة المهام"
            description="تقديم وتقييم المهام الدراسية بناءً على معايير BTEC"
            icon={<FileText />}
            linkTo="/tasks"
            color="magic"
          />
          
          <CastleFeatureCard 
            title="برج الحكمة"
            description="عرض الدروس والمحتوى التعليمي بصيغ متنوعة"
            icon={<BookOpen />}
            linkTo="/wisdom"
            color="stone"
          />
          
          <CastleFeatureCard 
            title="قاعة الأثير"
            description="حضور المحاضرات الافتراضية وتسجيل الحضور"
            icon={<Users />}
            linkTo="/hall"
            color="gold"
          />
          
          <CastleFeatureCard 
            title="سجل الأبطال"
            description="تتبع تقدم الطلاب وعرض إنجازاتهم"
            icon={<Award />}
            linkTo="/heroes"
            color="primary"
          />
          
          <CastleFeatureCard 
            title="مكتبة المخطوطات"
            description="أرشيف رقمي للمصادر والكتب الأكاديمية"
            icon={<BookMarked />}
            linkTo="/library"
            color="wisdom"
          />
          
          <CastleFeatureCard 
            title="غرفة الدردشة"
            description="التواصل مع مساعد ذكي للإجابة على استفساراتك"
            icon={<MessageSquare />}
            linkTo="/chat"
            color="magic"
          />
          
          <CastleFeatureCard 
            title="معرض السحر"
            description="عرض الوسائط المتعددة والمشاريع الطلابية"
            icon={<Image />}
            linkTo="/gallery"
            color="gold"
          />
        </div>

        <div className="mt-8 bg-[hsla(var(--castle-stone)/0.1)] border border-[hsl(var(--castle-stone))] rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">EduAnalytica Pro - المساعد الذكي للتقييم</h3>
            <p className="mb-4">استكشف قوة الذكاء الاصطناعي في تقييم المهام وتحليل أداء الطلاب</p>
            <Link to="/tasks">
              <CastleButton variant="magic" icon={<ArrowRight className="rtl:rotate-180" />}>
                ابدأ بتقييم مهمة جديدة
              </CastleButton>
            </Link>
          </div>
        </div>
      </div>
    </CastleLayout>
  );
};

interface CastleFeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  linkTo: string;
  color: "primary" | "secondary" | "magic" | "gold" | "stone" | "wisdom";
}

const CastleFeatureCard = ({ title, description, icon, linkTo, color }: CastleFeatureCardProps) => {
  const colorVariants = {
    primary: "text-[hsl(var(--primary))]",
    secondary: "text-[hsl(var(--secondary))]",
    magic: "text-[hsl(var(--castle-magic))]",
    gold: "text-[hsl(var(--castle-gold))]",
    stone: "text-[hsl(var(--castle-stone))]",
    wisdom: "text-[hsl(var(--castle-wisdom))]"
  };

  return (
    <Link to={linkTo}>
      <CastleCard 
        className="hover:shadow-lg transition-shadow h-full" 
        variant="stone"
      >
        <div className="flex flex-col items-center text-center p-4">
          <div className={`text-4xl mb-4 ${colorVariants[color]}`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </CastleCard>
    </Link>
  );
};

export default Index;
