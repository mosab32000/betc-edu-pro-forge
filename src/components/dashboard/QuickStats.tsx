
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Star,
  Trophy,
  BookOpen,
  CheckCircle,
  Zap
} from 'lucide-react';

interface StatItem {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

const QuickStats = () => {
  const stats: StatItem[] = [
    {
      label: 'النقاط الإجمالية',
      value: '1,247',
      change: '+125',
      trend: 'up',
      icon: <Star className="w-5 h-5" />,
      color: 'text-[hsl(var(--castle-gold))]'
    },
    {
      label: 'المهام المكتملة',
      value: '23',
      change: '+3',
      trend: 'up',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-500'
    },
    {
      label: 'المستوى الحالي',
      value: '5',
      icon: <Trophy className="w-5 h-5" />,
      color: 'text-[hsl(var(--castle-magic))]'
    },
    {
      label: 'ساعات التعلم',
      value: '42.5',
      change: '+2.5',
      trend: 'up',
      icon: <Clock className="w-5 h-5" />,
      color: 'text-[hsl(var(--castle-wisdom))]'
    },
    {
      label: 'معدل التقدم',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-blue-500'
    },
    {
      label: 'الإنجازات',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: <Target className="w-5 h-5" />,
      color: 'text-purple-500'
    }
  ];

  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="petra-card hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={cn("rounded-full p-2 bg-opacity-10", 
                stat.color.includes('gold') ? 'bg-[hsl(var(--castle-gold))]' :
                stat.color.includes('magic') ? 'bg-[hsl(var(--castle-magic))]' :
                stat.color.includes('wisdom') ? 'bg-[hsl(var(--castle-wisdom))]' :
                'bg-gray-100'
              )}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              {stat.change && (
                <Badge 
                  variant="outline" 
                  className={cn("text-xs", getTrendColor(stat.trend))}
                >
                  {stat.change}
                </Badge>
              )}
            </div>
            
            <div className="space-y-1">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStats;
