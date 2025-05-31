import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import CastleButton from "@/components/castle/CastleButton";
import { Award, Star, Trophy, Medal, Crown, Shield, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Hero {
  id: number;
  name: string;
  rank: string;
  points: number;
  achievements: number;
  badge: string;
  level: number;
}

const HEROES_DATA: Hero[] = [
  { 
    id: 1, 
    name: "أحمد خالد", 
    rank: "بطل البتراء الذهبي", 
    points: 1250, 
    achievements: 15, 
    badge: "gold", 
    level: 5 
  },
  { 
    id: 2, 
    name: "سارة محمود", 
    rank: "فارسة المعرفة", 
    points: 1120, 
    achievements: 12, 
    badge: "magic", 
    level: 4 
  },
  { 
    id: 3, 
    name: "محمد علي", 
    rank: "حكيم الصحراء", 
    points: 980, 
    achievements: 10, 
    badge: "wisdom", 
    level: 4 
  },
  { 
    id: 4, 
    name: "لينا عبدالله", 
    rank: "حارسة القلعة", 
    points: 870, 
    achievements: 9, 
    badge: "stone", 
    level: 3 
  },
  { 
    id: 5, 
    name: "عمر سليمان", 
    rank: "مستكشف النقوش", 
    points: 750, 
    achievements: 8, 
    badge: "gold", 
    level: 3 
  },
  { 
    id: 6, 
    name: "ريم جمال", 
    rank: "عالمة الآثار", 
    points: 690, 
    achievements: 7, 
    badge: "magic", 
    level: 3 
  },
  { 
    id: 7, 
    name: "يوسف أحمد", 
    rank: "حامي التراث", 
    points: 560, 
    achievements: 6, 
    badge: "stone", 
    level: 2 
  },
  { 
    id: 8, 
    name: "نور الدين", 
    rank: "راوي القصص", 
    points: 510, 
    achievements: 5, 
    badge: "wisdom", 
    level: 2 
  }
];

const HeroesPage = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    // محاكاة تحميل البيانات من الخادم
    setTimeout(() => {
      setHeroes(HEROES_DATA);
    }, 300);
  }, []);

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case "gold":
        return <Trophy className="text-[hsl(var(--castle-gold))]" />;
      case "magic":
        return <Star className="text-[hsl(var(--castle-magic))]" />;
      case "wisdom":
        return <Crown className="text-[hsl(var(--castle-wisdom))]" />;
      case "stone":
        return <Shield className="text-[hsl(var(--castle-stone))]" />;
      default:
        return <Medal />;
    }
  };

  const filteredHeroes = filter === "all" ? heroes : heroes.filter(hero => hero.badge === filter);

  return (
    <CastleLayout>
      <div className="petra-sandfall rtl petra-scrollbar">
        <CastleBanner
          title="سجل الأبطال"
          subtitle="أعلى الطلاب أداءً وإنجازًا في رحلة التميز"
          icon={<Award className="animate-subtle-bounce" />}
          variant="gold"
          className="shadow-lg"
        />
      </div>
      
      {/* فلاتر للأبطال */}
      <div className="mb-6 flex flex-wrap gap-2">
        <CastleButton 
          variant={filter === "all" ? "gold" : "outline"}
          onClick={() => setFilter("all")}
          size="sm"
        >
          جميع الأبطال
        </CastleButton>
        <CastleButton 
          variant={filter === "gold" ? "gold" : "outline"}
          onClick={() => setFilter("gold")}
          size="sm"
          icon={<Trophy />}
        >
          أبطال ذهبيون
        </CastleButton>
        <CastleButton 
          variant={filter === "magic" ? "magic" : "outline"}
          onClick={() => setFilter("magic")}
          size="sm"
          icon={<Star />}
        >
          فرسان المعرفة
        </CastleButton>
        <CastleButton 
          variant={filter === "wisdom" ? "wisdom" : "outline"}
          onClick={() => setFilter("wisdom")}
          size="sm"
          icon={<Crown />}
        >
          حكماء الصحراء
        </CastleButton>
        <CastleButton 
          variant={filter === "stone" ? "stone" : "outline"}
          onClick={() => setFilter("stone")}
          size="sm"
          icon={<Shield />}
        >
          حراس القلعة
        </CastleButton>
      </div>
      
      {/* لمحة سريعة عن الثلاثة الأوائل */}
      {filter === "all" && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 petra-title">أبطال البتراء المتميزون</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {heroes.slice(0, 3).map((hero, index) => (
              <div 
                key={hero.id} 
                className={cn(
                  "relative petra-panel p-6 text-center transform transition-all",
                  "hover:-translate-y-1 hover:shadow-lg",
                  index === 0 && "border-[hsl(var(--castle-gold))]",
                  index === 1 && "border-[hsl(var(--castle-magic))]",
                  index === 2 && "border-[hsl(var(--castle-wisdom))]",
                )}
              >
                {index === 0 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 py-1 px-3 bg-[hsl(var(--castle-gold))] text-white text-xs rounded-full">
                    🏆 المركز الأول
                  </div>
                )}
                
                {/* شارة البطل */}
                <div className="mb-4 flex justify-center">
                  <div className={cn(
                    "hero-badge hero-badge-large",
                    index === 0 ? "bg-[hsl(var(--castle-gold))]" : 
                    index === 1 ? "bg-[hsl(var(--castle-magic))]" : 
                    "bg-[hsl(var(--castle-wisdom))]"
                  )}>
                    {getBadgeIcon(hero.badge)}
                  </div>
                </div>
                
                <h3 className="text-lg font-bold rock-shimmer mb-1">{hero.name}</h3>
                <p className="text-sm opacity-80 mb-3">{hero.rank}</p>
                
                <div className="petra-divider mb-3"></div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="opacity-70">النقاط</p>
                    <p className="font-bold text-[hsl(var(--castle-gold))]">{hero.points}</p>
                  </div>
                  <div>
                    <p className="opacity-70">الإنجازات</p>
                    <p className="font-bold text-[hsl(var(--castle-magic))]">{hero.achievements}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <span className="petra-badge">المستوى {hero.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* قائمة الأبطال */}
      <CastleCard title="قائمة الأبطال" variant="stone" className="mt-4">
        <div className="space-y-4">
          {filteredHeroes.length === 0 ? (
            <div className="text-center py-10 opacity-60">
              <div className="text-4xl mb-4">🔍</div>
              <p>لا يوجد أبطال في هذه الفئة حاليًا</p>
            </div>
          ) : (
            filteredHeroes.map((hero, index) => (
              <div 
                key={hero.id}
                className="hero-entry petra-card bg-white bg-opacity-5 p-4 rounded-lg flex items-center justify-between"
                style={{ "--animation-order": index } as React.CSSProperties}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "hero-badge",
                    hero.badge === "gold" ? "bg-[hsl(var(--castle-gold))]" : 
                    hero.badge === "magic" ? "bg-[hsl(var(--castle-magic))]" : 
                    hero.badge === "wisdom" ? "bg-[hsl(var(--castle-wisdom))]" : 
                    "bg-[hsl(var(--castle-stone))]"
                  )}>
                    {getBadgeIcon(hero.badge)}
                  </div>
                  
                  <div>
                    <h3 className="font-bold">{hero.name}</h3>
                    <p className="text-sm opacity-80">{hero.rank}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-xs opacity-70">النقاط</p>
                    <p className="font-bold text-[hsl(var(--castle-gold))]">{hero.points}</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs opacity-70">الإنجازات</p>
                    <p className="font-bold text-[hsl(var(--castle-magic))]">{hero.achievements}</p>
                  </div>
                  
                  <div className="text-center hidden md:block">
                    <p className="text-xs opacity-70">المستوى</p>
                    <p className="font-bold">{hero.level}</p>
                  </div>
                  
                  <CastleButton 
                    variant="outline" 
                    size="sm"
                    icon={<ArrowRight />}
                    iconPosition="right"
                  >
                    عرض الملف
                  </CastleButton>
                </div>
              </div>
            ))
          )}
        </div>
      </CastleCard>
      
      <div className="mt-8 py-4 border-t border-[hsla(var(--border)/0.2)] text-center">
        <p className="text-sm opacity-70">يتم تحديث سجل الأبطال أسبوعيًا بناءً على الأداء والإنجازات</p>
      </div>
    </CastleLayout>
  );
};

export default HeroesPage;
