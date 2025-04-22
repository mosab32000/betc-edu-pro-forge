
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import { Award, TrendingUp, Medal, Star, Trophy, Crown, User, Users } from "lucide-react";

const HeroesPage = () => {
  return (
    <CastleLayout>
      <CastleBanner
        title="سجل الأبطال"
        subtitle="تتبع تقدم الطلاب وعرض إنجازاتهم"
        icon={<Award />}
        variant="default"
      />

      <div className="space-y-8">
        <div className="bg-[hsla(var(--primary)/0.05)] border border-[hsla(var(--primary)/0.2)] rounded-xl p-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-[hsla(var(--castle-stone)/0.3)] flex items-center justify-center">
                <User size={40} className="text-[hsl(var(--primary))]" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[hsl(var(--castle-gold))] flex items-center justify-center shadow-lg">
                <Crown size={16} className="text-black" />
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold">حمزة تيسير التلاحمة</h2>
              <p className="text-[hsl(var(--primary))] font-medium">الصف العاشر - إدارة أعمال</p>
            </div>
            
            <div className="flex gap-4 flex-wrap justify-center">
              <div className="badge bg-[hsla(var(--castle-gold)/0.2)] text-[hsl(var(--castle-gold))] px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Star size={14} /> 
                <span>150 نقطة</span>
              </div>
              <div className="badge bg-[hsla(var(--primary)/0.1)] text-[hsl(var(--primary))] px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Trophy size={14} /> 
                <span>12 إنجاز</span>
              </div>
              <div className="badge bg-[hsla(var(--castle-magic)/0.1)] text-[hsl(var(--castle-magic))] px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Award size={14} /> 
                <span>ذهبي المستوى</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">الإنجازات المحققة</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <CastleCard 
              key={achievement.id}
              variant="stone"
              className="hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${achievement.bgColor} flex items-center justify-center`}>
                  {achievement.icon}
                </div>
                
                <div>
                  <h3 className="font-bold">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                </div>
              </div>
            </CastleCard>
          ))}
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">مؤشرات التقدم</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {progress.map((item) => (
            <CastleCard key={item.id} variant="stone">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">{item.title}</h3>
                  <span className="text-sm font-medium">{item.percentage}%</span>
                </div>
                
                <div className="w-full h-2 bg-[hsla(var(--border)/0.5)] rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.barColor}`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            </CastleCard>
          ))}
        </div>
      </div>
    </CastleLayout>
  );
};

const achievements = [
  {
    id: 1,
    title: "محلل متميز",
    description: "حصل على تمييز Distinction في التحليل التجاري",
    icon: <Medal className="text-[hsl(var(--castle-gold))]" />,
    bgColor: "bg-[hsla(var(--castle-gold)/0.2)]",
  },
  {
    id: 2,
    title: "باحث مؤهل",
    description: "أكمل 10 مهام بحثية بنجاح",
    icon: <Award className="text-[hsl(var(--castle-magic))]" />,
    bgColor: "bg-[hsla(var(--castle-magic)/0.1)]",
  },
  {
    id: 3,
    title: "مفكر نقدي",
    description: "قدم تحليلًا نقديًا متميزًا في 5 مهام",
    icon: <Star className="text-[hsl(var(--primary))]" />,
    bgColor: "bg-[hsla(var(--primary)/0.1)]",
  },
  {
    id: 4,
    title: "منجز متفوق",
    description: "حقق أعلى درجة في تقييم الوحدة 19",
    icon: <Trophy className="text-[hsl(var(--castle-gold))]" />,
    bgColor: "bg-[hsla(var(--castle-gold)/0.2)]",
  },
  {
    id: 5,
    title: "طالب مثابر",
    description: "أكمل جميع المهام قبل الموعد النهائي",
    icon: <TrendingUp className="text-[hsl(var(--castle-wisdom))]" />,
    bgColor: "bg-[hsla(var(--castle-wisdom)/0.1)]",
  },
  {
    id: 6,
    title: "متعاون نشط",
    description: "شارك في 15 نقاشًا في المنتدى التعليمي",
    icon: <Users className="text-[hsl(var(--castle-magic))]" />,
    bgColor: "bg-[hsla(var(--castle-magic)/0.1)]",
  },
];

const progress = [
  {
    id: 1,
    title: "إتقان معايير BTEC",
    percentage: 85,
    description: "معدل نجاح متميز في معايير Distinction وMerit",
    barColor: "bg-[hsl(var(--castle-gold))]",
  },
  {
    id: 2,
    title: "مهارات التحليل",
    percentage: 92,
    description: "القدرة على تحليل البيانات وتطبيق النظريات",
    barColor: "bg-[hsl(var(--castle-magic))]",
  },
  {
    id: 3,
    title: "الكتابة الأكاديمية",
    percentage: 78,
    description: "جودة الكتابة والتنظيم والتوثيق",
    barColor: "bg-[hsl(var(--primary))]",
  },
  {
    id: 4,
    title: "تقدم الوحدات الدراسية",
    percentage: 65,
    description: "إكمال 13 من 20 وحدة في المنهج الدراسي",
    barColor: "bg-[hsl(var(--castle-wisdom))]",
  },
];

export default HeroesPage;
