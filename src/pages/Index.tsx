
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import CastleButton from "@/components/castle/CastleButton";
import LearningPathMap from "@/components/castle/LearningPathMap";
import { FileText, BookOpen, Users, Award, BookMarked, MessageSquare, Image, ArrowRight, Globe, History, BookCopy, FlaskConical, Compass, Bot } from 'lucide-react';
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <CastleLayout>
      <CastleBanner
        title="قلعة Betc الأسطورية"
        subtitle="نظام تعليم وتقييم ذكي يجمع بين تراث البتراء وتقنيات المستقبل"
        variant="magic"
      />

      <div className="space-y-8">
        {/* Vision Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">مرحباً بك في عالم البتراء الرقمي</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            منصة تعليمية مبتكرة تجمع بين إرث حضارة الأنباط والتقنيات المتقدمة من الذكاء الاصطناعي والواقع المعزز 
            والبلوكتشين لتحسين جودة التعليم والتقييم وفق معايير Pearson BTEC.
          </p>
        </div>

        {/* Learning Path Map */}
        <CastleCard 
          title="خريطة رحلة التعلم" 
          icon={<Compass />}
          variant="magic"
        >
          <p className="mb-4">استكشف رحلتك التعليمية عبر معالم القلعة المختلفة واتبع مسارك نحو التميز.</p>
          <LearningPathMap className="mt-4" />
          <div className="mt-4 flex justify-center">
            <Link to="/wisdom">
              <CastleButton variant="wisdom">
                متابعة الرحلة
              </CastleButton>
            </Link>
          </div>
        </CastleCard>

        {/* Digital Landmarks Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-center">المعالم الرقمية للقلعة</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              color="wisdom"
            />
            
            <CastleFeatureCard 
              title="ميدان الأعمدة"
              description="نقاشات ومشاريع تفاعلية"
              icon={<Users />}
              linkTo="/hall"
              color="gold"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              color="stone"
            />
            
            <CastleFeatureCard 
              title="غرفة الدردشة"
              description="التواصل مع مساعد ذكي للإجابة على استفساراتك"
              icon={<MessageSquare />}
              linkTo="/chat"
              color="magic"
            />
            
            <CastleFeatureCard 
              title="معرض البتراء"
              description="عرض الوسائط المتعددة والمشاريع الطلابية"
              icon={<Image />}
              linkTo="/gallery"
              color="gold"
            />
          </div>
        </div>

        {/* EduAnalytica Pro Section */}
        <div className="bg-[hsla(var(--castle-magic)/0.05)] border border-[hsl(var(--castle-magic))] rounded-xl p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold mb-2">معبد الذكاء - EduAnalytica Pro 3.0</h3>
            <p className="mb-4">نظام ذكاء اصطناعي متقدم لتقييم المهام وتحليل أداء الطلاب وفق معايير BTEC</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-[hsla(var(--castle-wisdom)/0.1)] rounded-lg">
              <div className="flex items-center mb-2">
                <FlaskConical className="text-[hsl(var(--castle-wisdom))] mr-2" />
                <h4 className="font-bold">تقييم متعدد الأبعاد</h4>
              </div>
              <p className="text-sm">تحليل سيميائي، أخلاقي، ومقارن للمحتوى مع دعم اللغة العربية</p>
            </div>
            
            <div className="p-4 bg-[hsla(var(--castle-magic)/0.1)] rounded-lg">
              <div className="flex items-center mb-2">
                <Award className="text-[hsl(var(--castle-magic))] mr-2" />
                <h4 className="font-bold">توثيق على البلوكتشين</h4>
              </div>
              <p className="text-sm">شهادات وتقييمات موثقة على Ethereum لا يمكن تزويرها</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/btec-evaluator">
              <CastleButton variant="magic" icon={<ArrowRight className="rtl:rotate-180" />}>
                اكتشف قوة الذكاء الاصطناعي في التقييم
              </CastleButton>
            </Link>
          </div>
        </div>

        {/* Research and Analysis Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <CastleFeatureCard 
            title="وادي الأبحاث"
            description="قاعدة معرفية بحثية متقدمة لدعم التعليم العميق"
            icon={<Globe />}
            linkTo="/research"
            color="wisdom"
          />
          
          <CastleFeatureCard 
            title="غرفة الأسرار"
            description="مختبر تحليلات ذكية وتنبؤية لتتبع وتحسين الأداء"
            icon={<History />}
            linkTo="/secrets"
            color="magic"
          />
          
          <CastleFeatureCard 
            title="الدهليز الأزرق"
            description="أرشيف الدراسات والمشاريع والتغذية الراجعة"
            icon={<BookCopy />}
            linkTo="/archive"
            color="gold"
          />
        </div>

        {/* Nabata AI Assistant Section */}
        <div className="bg-[hsla(var(--castle-stone)/0.05)] border border-[hsl(var(--castle-stone))] rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center gap-6 flex-col md:flex-row">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[hsl(var(--castle-magic))] to-[hsl(var(--castle-wisdom))] flex items-center justify-center">
              <Bot size={40} className="text-white" />
            </div>
            <div className="flex-1 text-center md:text-right">
              <h3 className="text-xl font-bold mb-2">شخصية "نباطا" التفاعلية</h3>
              <p className="mb-2">مرشدك الشخصي في رحلة التعلم بلغة عربية فصحى وذكاء اصطناعي متقدم.</p>
              <p className="text-sm text-gray-600">يمكنك التواصل مع "نباطا" في أي وقت من خلال زر المساعد في أسفل يمين الشاشة.</p>
            </div>
          </div>
        </div>

        {/* Future Features Section */}
        <div className="mt-8 bg-[hsla(var(--castle-stone)/0.1)] border border-[hsl(var(--castle-stone))] rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">قادم قريباً في PetraVerse</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-white/50 rounded-lg">
                <h4 className="font-bold mb-2">تجارب الواقع المعزز</h4>
                <p className="text-sm">استكشاف النماذج التعليمية بتقنية WebXR المتقدمة</p>
              </div>
              
              <div className="p-4 bg-white/50 rounded-lg">
                <h4 className="font-bold mb-2">توثيق البلوكتشين</h4>
                <p className="text-sm">شهادات رقمية موثقة لا يمكن تزويرها على Ethereum</p>
              </div>
              
              <div className="p-4 bg-white/50 rounded-lg">
                <h4 className="font-bold mb-2">التحليل العاطفي</h4>
                <p className="text-sm">تعرف على المزاج وتقديم دعم نفسي ذكي للطلاب</p>
              </div>
            </div>
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
