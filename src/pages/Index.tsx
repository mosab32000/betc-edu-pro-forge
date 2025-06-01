import React, { useState, useEffect } from 'react';
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import CastleButton from "@/components/castle/CastleButton";
import LearningPathMap from "@/components/castle/LearningPathMap";
import QuickStats from "@/components/dashboard/QuickStats";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  FileText, BookOpen, Users, Award, BookMarked, MessageSquare, Image, 
  ArrowRight, Globe, History, BookCopy, FlaskConical, Compass, Bot, 
  Palette, Trophy, Camera, Zap, Sparkles, Gamepad2, Play, Star,
  Rocket, Target, TrendingUp, Activity, Calendar, Clock
} from 'lucide-react';
import { Link } from "react-router-dom";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userProgress, setUserProgress] = useState(73);
  const [todayGoals, setTodayGoals] = useState([
    { id: 1, title: 'إكمال 3 مهام', completed: true },
    { id: 2, title: 'قراءة درس جديد', completed: true },
    { id: 3, title: 'مراجعة المشروع', completed: false },
    { id: 4, title: 'التفاعل في المنتدى', completed: false }
  ]);
  const [weeklyStreak, setWeeklyStreak] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 17) return 'مساء الخير';
    return 'مساء الخير';
  };

  const completedGoals = todayGoals.filter(goal => goal.completed).length;
  const goalProgress = (completedGoals / todayGoals.length) * 100;

  return (
    <CastleLayout>
      {/* Banner محسن مع معلومات شخصية */}
      <div className="relative mb-8">
        <CastleBanner
          title="قلعة Betc الأسطورية"
          subtitle="نظام تعليم وتقييم ذكي يجمع بين تراث البتراء وتقنيات المستقبل"
          variant="magic"
        />
        
        {/* بطاقة ترحيب شخصية */}
        <Card className="absolute top-4 right-4 petra-card max-w-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[hsl(var(--castle-magic))] to-[hsl(var(--castle-gold))] flex items-center justify-center">
                <span className="text-white font-bold text-lg">🏛️</span>
              </div>
              <div>
                <h3 className="font-bold">{getGreeting()}!</h3>
                <p className="text-sm text-gray-600">
                  {currentTime.toLocaleDateString('ar-SA', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        {/* إحصائيات سريعة محسنة */}
        <QuickStats />

        {/* لوحة تحكم شخصية */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* أهداف اليوم */}
          <Card className="petra-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">أهداف اليوم</h3>
                <Badge className={goalProgress === 100 ? 'bg-green-500' : 'bg-blue-500'}>
                  {completedGoals}/{todayGoals.length}
                </Badge>
              </div>
              
              <div className="space-y-3">
                {todayGoals.map(goal => (
                  <div key={goal.id} className="flex items-center gap-3">
                    <div className={cn(
                      "w-4 h-4 rounded-full border-2",
                      goal.completed 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-300'
                    )}>
                      {goal.completed && (
                        <span className="text-white text-xs flex justify-center">✓</span>
                      )}
                    </div>
                    <span className={cn(
                      "text-sm",
                      goal.completed ? 'line-through text-gray-500' : ''
                    )}>
                      {goal.title}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[hsl(var(--castle-magic))] to-[hsl(var(--castle-gold))] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${goalProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  تقدم اليوم: {Math.round(goalProgress)}%
                </p>
              </div>
            </CardContent>
          </Card>

          {/* التقدم العام */}
          <Card className="petra-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">مستوى التقدم</h3>
                <TrendingUp className="w-5 h-5 text-[hsl(var(--castle-wisdom))]" />
              </div>

              <div className="text-center mb-4">
                <div className="relative w-24 h-24 mx-auto">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${userProgress * 2.51} 251`}
                      className="text-[hsl(var(--castle-magic))]"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{userProgress}%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">من إجمالي المنهج</p>
              </div>

              <div className="flex justify-center">
                <Button size="sm" variant="outline">
                  <Target className="w-4 h-4" />
                  عرض التفاصيل
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* سلسلة النشاط */}
          <Card className="petra-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">سلسلة النشاط</h3>
                <Activity className="w-5 h-5 text-[hsl(var(--castle-gold))]" />
              </div>

              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <span className="text-3xl">🔥</span>
                  <span className="text-4xl font-bold text-[hsl(var(--castle-gold))]">
                    {weeklyStreak}
                  </span>
                </div>
                <p className="text-sm text-gray-600">أيام متتالية</p>
              </div>

              <div className="flex justify-center gap-1 mb-4">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "w-6 h-6 rounded-sm",
                      i < weeklyStreak 
                        ? 'bg-[hsl(var(--castle-gold))]' 
                        : 'bg-gray-200'
                    )}
                  />
                ))}
              </div>

              <div className="flex justify-center">
                <Button size="sm" variant="outline">
                  <Rocket className="w-4 h-4" />
                  استمر!
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vision Section محسن */}
        <div className="text-center mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--castle-magic))]/5 to-transparent"></div>
          <div className="relative py-8">
            <h2 className="text-3xl font-bold mb-4 petra-title">
              مرحباً بك في عالم البتراء الرقمي المتقدم
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              منصة تعليمية مبتكرة تجمع بين إرث حضارة الأنباط والتقنيات المتقدمة من الذكاء الاصطناعي والواقع المعزز 
              والبلوكتشين لتحسين جودة التعليم والتقييم وفق معايير Pearson BTEC.
            </p>
            
            <div className="flex justify-center mt-6 gap-4">
              <Button className="bg-[hsl(var(--castle-magic))]">
                <Play className="w-4 h-4 mr-1" />
                جولة تعريفية
              </Button>
              <Button variant="outline">
                <Star className="w-4 h-4 mr-1" />
                ابدأ رحلتك
              </Button>
            </div>
          </div>
        </div>

        {/* Learning Path Map محسن */}
        <CastleCard 
          title="خريطة رحلة التعلم التفاعلية" 
          icon={<Compass />}
          variant="magic"
        >
          <p className="mb-4">استكشف رحلتك التعليمية عبر معالم القلعة المختلفة واتبع مسارك نحو التميز.</p>
          <LearningPathMap className="mt-4" />
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {completedGoals}
              </div>
              <div className="text-xs text-gray-600">مهام مكتملة</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-xs text-gray-600">مستوى حالي</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">1247</div>
              <div className="text-xs text-gray-600">نقاط مكتسبة</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{weeklyStreak}</div>
              <div className="text-xs text-gray-600">أيام نشاط</div>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <Link to="/wisdom">
              <CastleButton variant="wisdom">
                <ArrowRight className="w-4 h-4 mr-1" />
                متابعة الرحلة
              </CastleButton>
            </Link>
          </div>
        </CastleCard>

        {/* Core Digital Landmarks */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-center petra-title flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-[hsl(var(--castle-magic))]" />
            المعالم الأساسية للقلعة
          </h3>
          
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
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

        {/* New Advanced Features Section */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4 text-center flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            الميزات المتقدمة الجديدة
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CastleFeatureCard 
              title="ورشة الأنباط للإبداع"
              description="أدوات ذكية لإنشاء النقوش والقصص والتصاميم النبطية"
              icon={<Palette />}
              linkTo="/creative"
              color="magic"
            />
            
            <CastleFeatureCard 
              title="مركز التحديات والألعاب"
              description="نظام شامل للتحفيز والمكافآت مع NFT للإنجازات"
              icon={<Trophy />}
              linkTo="/gamification"
              color="gold"
            />
            
            <CastleFeatureCard 
              title="تجارب الواقع المعزز"
              description="استكشاف البتراء بتقنيات AR التفاعلية المتقدمة"
              icon={<Camera />}
              linkTo="/ar-experience"
              color="wisdom"
            />
          </div>
        </div>

        {/* EduAnalytica Pro Section */}
        <div className="bg-[hsla(var(--castle-stone)/0.05)] border border-[hsl(var(--castle-stone))] rounded-xl p-6">
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

        {/* Advanced Nabata AI Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-center gap-6 flex-col md:flex-row">
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[hsl(var(--castle-magic))] to-[hsl(var(--castle-wisdom))] flex items-center justify-center">
              <Bot size={40} className="text-white" />
            </div>
            <div className="flex-1 text-center md:text-right">
              <h3 className="text-xl font-bold mb-2 flex items-center justify-center md:justify-start gap-2">
                شخصية "نباطا" التفاعلية المتقدمة
                <Zap className="w-5 h-5 text-yellow-500" />
              </h3>
              <p className="mb-2">مرشدك الشخصي الذكي مع قدرات عاطفية متقدمة وتفاعل صوتي.</p>
              <p className="text-sm text-gray-600">يمكنك التواصل مع "نباطا" في أي وقت من خلال زر المساعد في أسفل يمين الشاشة.</p>
            </div>
          </div>
        </div>

        {/* System Management */}
        <div className="text-center">
          <Link to="/system">
            <CastleButton variant="stone" icon={<ArrowRight className="rtl:rotate-180" />}>
              مركز إدارة النظام المتقدم
            </CastleButton>
          </Link>
        </div>

        {/* Future Features Section */}
        <div className="mt-8 bg-[hsla(var(--castle-stone)/0.1)] border border-[hsl(var(--castle-stone))] rounded-xl p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">التحديثات القادمة في PetraVerse</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-white/50 rounded-lg">
                <h4 className="font-bold mb-2 flex items-center justify-center gap-2">
                  <Gamepad2 className="w-4 h-4" />
                  الألعاب التعليمية VR
                </h4>
                <p className="text-sm">تجارب تعليمية غامرة بالواقع الافتراضي</p>
              </div>
              
              <div className="p-4 bg-white/50 rounded-lg">
                <h4 className="font-bold mb-2 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  الذكاء الاصطناعي التوليدي
                </h4>
                <p className="text-sm">إنشاء محتوى تعليمي مخصص لكل طالب</p>
              </div>
              
              <div className="p-4 bg-white/50 rounded-lg">
                <h4 className="font-bold mb-2 flex items-center justify-center gap-2">
                  <Globe className="w-4 h-4" />
                  التعاون العالمي
                </h4>
                <p className="text-sm">منصة للتعاون مع جامعات ومؤسسات عالمية</p>
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
        className="hover:shadow-xl hover:scale-105 transition-all duration-300 h-full group" 
        variant="stone"
      >
        <div className="flex flex-col items-center text-center p-6">
          <div className={`text-5xl mb-4 ${colorVariants[color]} group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-3 group-hover:text-[hsl(var(--castle-magic))] transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
          
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight className="w-5 h-5 text-[hsl(var(--castle-magic))]" />
          </div>
        </div>
      </CastleCard>
    </Link>
  );
};

export default Index;
