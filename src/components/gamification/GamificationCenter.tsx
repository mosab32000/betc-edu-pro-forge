
import React, { useState } from 'react';
import { Trophy, Star, Target, Zap, Gift, Crown, Medal, Flame } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  reward: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  progress: number;
  maxProgress: number;
  timeLeft: string;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const GamificationCenter = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'challenges' | 'leaderboard'>('overview');
  const [playerLevel] = useState(15);
  const [currentXP] = useState(2350);
  const [nextLevelXP] = useState(3000);
  const [streakDays] = useState(7);

  const [achievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'باحث البتراء',
      description: 'أكمل 10 دروس في التاريخ النبطي',
      icon: '🏛️',
      rarity: 'common',
      progress: 10,
      maxProgress: 10,
      unlocked: true,
      reward: 'شارة البتراء البرونزية'
    },
    {
      id: '2',
      title: 'حكيم الأنباط',
      description: 'احصل على تقييم ممتاز في 5 مهام',
      icon: '🧠',
      rarity: 'rare',
      progress: 3,
      maxProgress: 5,
      unlocked: false,
      reward: 'صورة رمزية خاصة'
    },
    {
      id: '3',
      title: 'أسطورة البتراء',
      description: 'اجمع 1000 نقطة في شهر واحد',
      icon: '👑',
      rarity: 'legendary',
      progress: 750,
      maxProgress: 1000,
      unlocked: false,
      reward: 'NFT نادر - تمثال نبطي'
    }
  ]);

  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'تحدي النقوش اليومي',
      description: 'فك رموز 3 نقوش نبطية',
      type: 'daily',
      progress: 1,
      maxProgress: 3,
      timeLeft: '18 ساعة',
      reward: '50 نقطة',
      difficulty: 'easy'
    },
    {
      id: '2',
      title: 'أسبوع الإبداع',
      description: 'أنشئ 5 مشاريع في ورشة الأنباط',
      type: 'weekly',
      progress: 2,
      maxProgress: 5,
      timeLeft: '4 أيام',
      reward: '200 نقطة + شارة الإبداع',
      difficulty: 'medium'
    },
    {
      id: '3',
      title: 'مهمة إنقاذ طريق البخور',
      description: 'قصة تفاعلية خاصة محدودة الوقت',
      type: 'special',
      progress: 0,
      maxProgress: 1,
      timeLeft: '10 أيام',
      reward: 'NFT حصري + 500 نقطة',
      difficulty: 'hard'
    }
  ]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-600 bg-gray-100';
      case 'rare': return 'text-blue-600 bg-blue-100';
      case 'epic': return 'text-purple-600 bg-purple-100';
      case 'legendary': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const TabButton = ({ id, label, icon }: { id: string; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
        activeTab === id
          ? "bg-[hsl(var(--castle-magic))] text-white"
          : "bg-gray-100 hover:bg-gray-200"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="space-y-6 p-6 petra-content">
      {/* رأس مركز التلعيب */}
      <div className="petra-panel p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="hero-badge bg-gradient-to-r from-[hsl(var(--castle-fire))] to-[hsl(var(--castle-gold))]">
            <Trophy className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold petra-title">مركز التحديات والإنجازات</h1>
            <p className="petra-subtitle">رحلتك نحو أن تصبح أسطورة نبطية</p>
          </div>
        </div>

        {/* التبويبات */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <TabButton id="overview" label="نظرة عامة" icon={<Star className="w-4 h-4" />} />
          <TabButton id="achievements" label="الإنجازات" icon={<Medal className="w-4 h-4" />} />
          <TabButton id="challenges" label="التحديات" icon={<Target className="w-4 h-4" />} />
          <TabButton id="leaderboard" label="لوحة الصدارة" icon={<Crown className="w-4 h-4" />} />
        </div>

        {/* نظرة عامة */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* إحصائيات اللاعب */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="petra-card">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-[hsl(var(--castle-magic))]">{playerLevel}</div>
                  <div className="text-sm text-gray-600">مستوى الحكمة</div>
                </CardContent>
              </Card>

              <Card className="petra-card">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-[hsl(var(--castle-gold))]">{currentXP.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">نقاط الخبرة</div>
                </CardContent>
              </Card>

              <Card className="petra-card">
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-1 text-3xl font-bold text-[hsl(var(--castle-fire))]">
                    <Flame className="w-8 h-8" />
                    {streakDays}
                  </div>
                  <div className="text-sm text-gray-600">سلسلة الأيام</div>
                </CardContent>
              </Card>

              <Card className="petra-card">
                <CardContent className="p-4 text-center">
                  <div className="text-3xl font-bold text-[hsl(var(--castle-wisdom))]">
                    {achievements.filter(a => a.unlocked).length}
                  </div>
                  <div className="text-sm text-gray-600">إنجازات مفتوحة</div>
                </CardContent>
              </Card>
            </div>

            {/* تقدم المستوى */}
            <Card className="petra-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[hsl(var(--castle-magic))]" />
                  تقدم المستوى التالي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>المستوى {playerLevel}</span>
                    <span>المستوى {playerLevel + 1}</span>
                  </div>
                  <Progress 
                    value={(currentXP / nextLevelXP) * 100} 
                    className="h-3"
                  />
                  <div className="text-center text-sm text-gray-600">
                    {nextLevelXP - currentXP} نقطة متبقية للمستوى التالي
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* التحديات النشطة */}
            <Card className="petra-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-[hsl(var(--castle-fire))]" />
                  التحديات النشطة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {challenges.slice(0, 2).map((challenge) => (
                    <div key={challenge.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{challenge.title}</h4>
                          <Badge className={cn("text-xs", getDifficultyColor(challenge.difficulty))}>
                            {challenge.difficulty === 'easy' ? 'سهل' : 
                             challenge.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">{challenge.description}</div>
                        <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-2" />
                        <div className="text-xs text-gray-500 mt-1">
                          {challenge.progress}/{challenge.maxProgress} • {challenge.timeLeft} متبقية
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* الإنجازات */}
        {activeTab === 'achievements' && (
          <div>
            <h3 className="text-lg font-bold mb-4">مجموعة الإنجازات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={cn(
                    "petra-card transition-all",
                    achievement.unlocked ? "shadow-lg" : "opacity-75"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold">{achievement.title}</h4>
                          <Badge className={cn("text-xs", getRarityColor(achievement.rarity))}>
                            {achievement.rarity === 'common' ? 'عادي' :
                             achievement.rarity === 'rare' ? 'نادر' :
                             achievement.rarity === 'epic' ? 'ملحمي' : 'أسطوري'}
                          </Badge>
                        </div>
                        {achievement.unlocked && (
                          <Badge className="bg-green-100 text-green-700 text-xs">
                            ✓ مفتوح
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    
                    {!achievement.unlocked && (
                      <div className="space-y-2">
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                        <div className="text-xs text-gray-500">
                          {achievement.progress}/{achievement.maxProgress}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-3 p-2 bg-yellow-50 rounded text-xs">
                      <strong>المكافأة:</strong> {achievement.reward}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* التحديات */}
        {activeTab === 'challenges' && (
          <div>
            <h3 className="text-lg font-bold mb-4">التحديات المتاحة</h3>
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <Card key={challenge.id} className="petra-card">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-bold text-lg">{challenge.title}</h4>
                          <Badge className={cn("text-xs", getDifficultyColor(challenge.difficulty))}>
                            {challenge.difficulty === 'easy' ? 'سهل' : 
                             challenge.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {challenge.type === 'daily' ? 'يومي' :
                             challenge.type === 'weekly' ? 'أسبوعي' : 'خاص'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{challenge.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-[hsl(var(--castle-fire))] font-medium">
                          ⏰ {challenge.timeLeft}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>التقدم</span>
                          <span>{challenge.progress}/{challenge.maxProgress}</span>
                        </div>
                        <Progress 
                          value={(challenge.progress / challenge.maxProgress) * 100} 
                          className="h-3"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Gift className="w-4 h-4 text-[hsl(var(--castle-gold))]" />
                          <span><strong>المكافأة:</strong> {challenge.reward}</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-[hsl(var(--castle-magic))]"
                          disabled={challenge.progress >= challenge.maxProgress}
                        >
                          {challenge.progress >= challenge.maxProgress ? 'مكتمل' : 'ابدأ'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* لوحة الصدارة */}
        {activeTab === 'leaderboard' && (
          <div>
            <h3 className="text-lg font-bold mb-4">لوحة الصدارة - هذا الشهر</h3>
            <div className="space-y-3">
              {[
                { rank: 1, name: 'أحمد النبطي', level: 18, points: 3420, avatar: '👑' },
                { rank: 2, name: 'فاطمة البترائية', level: 17, points: 3180, avatar: '🥈' },
                { rank: 3, name: 'محمد التجاري', level: 16, points: 2950, avatar: '🥉' },
                { rank: 4, name: 'أنت', level: playerLevel, points: currentXP, avatar: '🎯' },
                { rank: 5, name: 'سارة الحكيمة', level: 14, points: 2100, avatar: '📚' }
              ].map((player) => (
                <Card 
                  key={player.rank} 
                  className={cn(
                    "petra-card",
                    player.name === 'أنت' ? "ring-2 ring-[hsl(var(--castle-magic))]" : ""
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold text-[hsl(var(--castle-gold))]">
                        #{player.rank}
                      </div>
                      <div className="text-2xl">{player.avatar}</div>
                      <div className="flex-1">
                        <h4 className="font-bold">{player.name}</h4>
                        <div className="text-sm text-gray-600">
                          مستوى {player.level} • {player.points.toLocaleString()} نقطة
                        </div>
                      </div>
                      {player.rank <= 3 && (
                        <div className="text-2xl">
                          {player.rank === 1 ? '🏆' : player.rank === 2 ? '🥈' : '🥉'}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamificationCenter;
