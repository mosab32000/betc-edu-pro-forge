
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Star,
  Trophy,
  BookOpen,
  CheckCircle,
  Zap,
  RefreshCw,
  Eye,
  Activity,
  Flame
} from 'lucide-react';

interface StatItem {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
  animateValue?: boolean;
  description?: string;
  target?: number;
  unit?: string;
}

const QuickStats = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [animationEnabled, setAnimationEnabled] = useState(true);

  const generateStats = (): StatItem[] => {
    const baseStats: StatItem[] = [
      {
        id: 'points',
        label: 'النقاط الإجمالية',
        value: Math.floor(Math.random() * 1000) + 1200,
        change: `+${Math.floor(Math.random() * 50) + 100}`,
        trend: 'up',
        icon: <Star className="w-5 h-5" />,
        color: 'text-[hsl(var(--castle-gold))]',
        animateValue: true,
        description: 'نقاط مكتسبة من جميع الأنشطة',
        target: 2000,
        unit: 'نقطة'
      },
      {
        id: 'tasks',
        label: 'المهام المكتملة',
        value: Math.floor(Math.random() * 10) + 20,
        change: `+${Math.floor(Math.random() * 5) + 1}`,
        trend: 'up',
        icon: <CheckCircle className="w-5 h-5" />,
        color: 'text-green-500',
        animateValue: true,
        description: 'مهام أكملتها هذا الأسبوع',
        target: 50,
        unit: 'مهمة'
      },
      {
        id: 'level',
        label: 'المستوى الحالي',
        value: Math.floor(Math.random() * 3) + 5,
        icon: <Trophy className="w-5 h-5" />,
        color: 'text-[hsl(var(--castle-magic))]',
        description: 'مستواك الأكاديمي الحالي',
        target: 10,
        unit: 'مستوى'
      },
      {
        id: 'hours',
        label: 'ساعات التعلم',
        value: (Math.random() * 10 + 40).toFixed(1),
        change: `+${(Math.random() * 5 + 1).toFixed(1)}`,
        trend: 'up',
        icon: <Clock className="w-5 h-5" />,
        color: 'text-[hsl(var(--castle-wisdom))]',
        animateValue: true,
        description: 'إجمالي ساعات التعلم هذا الشهر',
        target: 100,
        unit: 'ساعة'
      },
      {
        id: 'progress',
        label: 'معدل التقدم',
        value: `${Math.floor(Math.random() * 20) + 80}%`,
        change: `+${Math.floor(Math.random() * 10) + 1}%`,
        trend: Math.random() > 0.3 ? 'up' : 'neutral',
        icon: <TrendingUp className="w-5 h-5" />,
        color: 'text-blue-500',
        description: 'معدل إنجاز الأهداف المحددة',
        target: 100,
        unit: '%'
      },
      {
        id: 'achievements',
        label: 'الإنجازات',
        value: Math.floor(Math.random() * 5) + 10,
        change: `+${Math.floor(Math.random() * 3) + 1}`,
        trend: 'up',
        icon: <Target className="w-5 h-5" />,
        color: 'text-purple-500',
        description: 'شارات وإنجازات حققتها',
        target: 25,
        unit: 'إنجاز'
      }
    ];

    // إضافة إحصائيات متقدمة بناءً على الوقت
    const hour = new Date().getHours();
    if (hour >= 8 && hour <= 17) {
      baseStats.push({
        id: 'streak',
        label: 'سلسلة النشاط',
        value: Math.floor(Math.random() * 5) + 7,
        change: '+1',
        trend: 'up',
        icon: <Flame className="w-5 h-5" />,
        color: 'text-orange-500',
        description: 'أيام متتالية من النشاط',
        target: 30,
        unit: 'يوم'
      });
    }

    return baseStats;
  };

  useEffect(() => {
    setStats(generateStats());
  }, []);

  const refreshStats = async () => {
    setIsLoading(true);
    
    // محاكاة تحديث البيانات
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStats(generateStats());
    setLastUpdate(new Date());
    setIsLoading(false);
  };

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '➡️';
    }
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="mb-6">
      {/* Header with refresh */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold petra-title">لوحة الإحصائيات المباشرة</h2>
          <p className="text-sm text-gray-600">
            آخر تحديث: {lastUpdate.toLocaleTimeString('ar-SA')}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAnimationEnabled(!animationEnabled)}
            className="text-xs"
          >
            <Activity className="w-4 h-4 mr-1" />
            {animationEnabled ? 'إيقاف' : 'تفعيل'} الحركة
          </Button>
          
          <Button
            size="sm"
            onClick={refreshStats}
            disabled={isLoading}
            className="bg-[hsl(var(--castle-magic))]"
          >
            <RefreshCw className={cn("w-4 h-4 mr-1", isLoading && "animate-spin")} />
            تحديث
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={stat.id} 
            className={cn(
              "petra-card hover:shadow-md transition-all duration-300 group",
              animationEnabled && "hover:scale-105"
            )}
            style={{
              animationDelay: animationEnabled ? `${index * 100}ms` : '0ms'
            }}
          >
            <CardContent className="p-4">
              {/* Icon and Change Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className={cn(
                  "rounded-full p-2 transition-all duration-300",
                  stat.color.includes('gold') ? 'bg-[hsl(var(--castle-gold))]/10' :
                  stat.color.includes('magic') ? 'bg-[hsl(var(--castle-magic))]/10' :
                  stat.color.includes('wisdom') ? 'bg-[hsl(var(--castle-wisdom))]/10' :
                  'bg-gray-100',
                  animationEnabled && "group-hover:scale-110"
                )}>
                  <div className={stat.color}>
                    {stat.icon}
                  </div>
                </div>
                
                {stat.change && (
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "text-xs transition-all duration-300",
                      getTrendColor(stat.trend),
                      animationEnabled && "group-hover:scale-105"
                    )}
                  >
                    {getTrendIcon(stat.trend)} {stat.change}
                  </Badge>
                )}
              </div>
              
              {/* Value and Label */}
              <div className="space-y-2">
                <p className={cn(
                  "text-2xl font-bold transition-all duration-300",
                  animationEnabled && stat.animateValue && "group-hover:text-3xl"
                )}>
                  {stat.value}
                </p>
                
                <p className="text-xs text-gray-600 leading-tight">
                  {stat.label}
                </p>

                {/* Progress Bar for targets */}
                {stat.target && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-500",
                          stat.color.includes('gold') ? 'bg-[hsl(var(--castle-gold))]' :
                          stat.color.includes('magic') ? 'bg-[hsl(var(--castle-magic))]' :
                          stat.color.includes('wisdom') ? 'bg-[hsl(var(--castle-wisdom))]' :
                          'bg-blue-500'
                        )}
                        style={{
                          width: `${getProgressPercentage(
                            typeof stat.value === 'string' ? 
                            parseFloat(stat.value.replace('%', '')) : 
                            stat.value, 
                            stat.target
                          )}%`
                        }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>{stat.value}</span>
                      <span>الهدف: {stat.target}</span>
                    </div>
                  </div>
                )}

                {/* Description on hover */}
                {stat.description && (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs text-gray-500 mt-1">
                      {stat.description}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex justify-center">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Eye className="w-3 h-3" />
          <span>انقر على أي بطاقة لعرض تفاصيل أكثر</span>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
