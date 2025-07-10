
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Book, CheckCircle, Megaphone, Coins, Shield, Rocket, Flask, Users } from 'lucide-react';

// البيانات الوهمية للعرض
const mockDashboardData = {
    performanceSummary: [
        { subject: 'الفيزياء', score: 88, fullMark: 100 },
        { subject: 'الرياضيات', score: 92, fullMark: 100 },
        { subject: 'الكيمياء', score: 75, fullMark: 100 },
        { subject: 'العربية', score: 95, fullMark: 100 },
        { subject: 'الإنجليزية', score: 85, fullMark: 100 },
    ],
    upcomingTasks: [
        { id: 1, title: 'امتحان الشهر الأول - فيزياء', dueDate: '2025-07-15' },
        { id: 2, title: 'تسليم واجب الرياضيات', dueDate: '2025-07-18' },
    ],
    learningJourney: {
        completed: 12,
        total: 20,
        currentModule: 'الوحدة الثالثة: الكهرومغناطيسية'
    },
    announcements: [
        { id: 1, text: 'بدء التسجيل لامتحان شهادة الدراسة الثانوية العامة (التوجيهي) للدورة الصيفية.' },
        { id: 2, text: 'عطلة رسمية يوم الخميس المقبل بمناسبة ذكرى المولد النبوي الشريف.' }
    ]
};

const mockPortfolio = {
    moeTokens: 450,
    reputationScore: 820,
    badges: ['Top Performer - Math Q1', 'Creative Problem Solver']
};

const StudentDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setTimeout(() => {
                setDashboardData(mockDashboardData);
                setPortfolio(mockPortfolio);
                setLoading(false);
            }, 1500);
        };
        fetchData();
    }, []);

    if (loading) {
        return <DashboardSkeleton />;
    }

    const journeyProgress = (dashboardData.learningJourney.completed / dashboardData.learningJourney.total) * 100;

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto" dir="rtl">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gradient">أهلاً بعودتك يا طالبنا العزيز!</h1>
                <p className="text-muted-foreground">ها هي لمحة سريعة عن رحلتك التعليمية اليوم.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* مسيرة التعلم */}
                <Card className="col-span-full md:col-span-2 lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Rocket className="h-5 w-5" />
                            مسيرتك التعليمية (التوجيهي - الفرع العلمي)
                        </CardTitle>
                        <CardDescription>
                            أنت الآن في: <strong>{dashboardData.learningJourney.currentModule}</strong>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <Progress value={journeyProgress} className="h-3" />
                            <p className="text-sm text-muted-foreground">
                                {dashboardData.learningJourney.completed} من أصل {dashboardData.learningJourney.total} وحدة مكتملة
                                ({Math.round(journeyProgress)}%)
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* المحفظة الرقمية */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            محفظتي الرقمية
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Coins className="h-5 w-5 text-yellow-500" />
                            <span><strong>{portfolio.moeTokens}</strong> رمز تعليمي</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Shield className="h-5 w-5 text-blue-500" />
                            <span><strong>{portfolio.reputationScore}</strong> نقطة سمعة</span>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium">أوسمتي:</h4>
                            <div className="flex flex-wrap gap-2">
                                {portfolio.badges.map((badge, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                        {badge}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* الأداء الأكاديمي */}
                <Card className="col-span-full lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Book className="h-5 w-5" />
                            ملخص الأداء الأكاديمي
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={dashboardData.performanceSummary} layout="vertical">
                                <XAxis type="number" hide />
                                <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} width={80} />
                                <Tooltip 
                                    formatter={(value, name, props) => [`${value} / ${props.payload.fullMark}`, 'الدرجة']}
                                />
                                <Bar dataKey="score" radius={[0, 10, 10, 0]}>
                                    {dashboardData.performanceSummary.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.score > 89 ? '#22c55e' : entry.score > 79 ? '#eab308' : '#ef4444'} 
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* المهام القادمة */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5" />
                            مهام قادمة
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {dashboardData.upcomingTasks.map(task => (
                                <div key={task.id} className="flex justify-between items-start text-sm">
                                    <span className="font-medium">{task.title}</span>
                                    <span className="text-muted-foreground text-xs">{task.dueDate}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* الإعلانات */}
                <Card className="col-span-full md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Megaphone className="h-5 w-5" />
                            إعلانات هامة
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {dashboardData.announcements.map(ann => (
                                <p key={ann.id} className="text-sm p-3 bg-muted rounded-lg">
                                    {ann.text}
                                </p>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* الوصول السريع */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Flask className="h-5 w-5" />
                            الوصول السريع
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <Link to="/ar-experience" className="block w-full">
                                <div className="p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
                                    <span className="text-sm font-medium">المختبر الافتراضي</span>
                                </div>
                            </Link>
                            <Link to="/gamification" className="block w-full">
                                <div className="p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
                                    <span className="text-sm font-medium">لوحة المكافآت</span>
                                </div>
                            </Link>
                            <Link to="/chat" className="block w-full">
                                <div className="p-3 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors">
                                    <span className="text-sm font-medium">اسأل "زينب"</span>
                                </div>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const DashboardSkeleton = () => (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-40 col-span-2" />
            <Skeleton className="h-40" />
            <Skeleton className="h-60 col-span-2" />
            <Skeleton className="h-60" />
            <Skeleton className="h-32 col-span-2" />
            <Skeleton className="h-32" />
        </div>
    </div>
);

export default StudentDashboard;
