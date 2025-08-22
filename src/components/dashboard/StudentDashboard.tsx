
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { 
  BookOpen, Clock, Award, TrendingUp, Calendar, Bell, 
  Target, Users, BarChart3, Star, CheckCircle, PlayCircle,
  Brain, Zap, Trophy, GraduationCap, Rocket, TestTube
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorAlert } from '@/components/common/ErrorAlert';
import { useAuth } from '@/contexts/AuthContext';
import { coursesAPI, assignmentsAPI, analyticsAPI, notificationsAPI } from '@/services/api';

interface DashboardData {
  enrolledCourses: any[];
  recentAssignments: any[];
  notifications: any[];
  analytics: {
    completionRate: number;
    averageGrade: number;
    studyTime: number;
    weeklyProgress: any[];
  };
  achievements: any[];
  recommendations: any[];
}

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
    const { user } = useAuth();
    const [selectedPeriod, setSelectedPeriod] = useState('week');
    const [showXRModal, setShowXRModal] = useState(false);

    const { data: dashboardData, isLoading, error } = useQuery<DashboardData>({
        queryKey: ['student-dashboard', user?.id, selectedPeriod],
        queryFn: async () => {
            const [courses, assignments, notifications, analytics, achievements, recommendations] = await Promise.all([
                coursesAPI.getCourses({ enrolled: true }),
                assignmentsAPI.getAssignments({ upcoming: true }),
                notificationsAPI.getNotifications(),
                analyticsAPI.getUserAnalytics(user?.id || ''),
                analyticsAPI.getUserAchievements(user?.id || ''),
                analyticsAPI.getRecommendations()
            ]);

            return {
                enrolledCourses: courses.data.courses,
                recentAssignments: assignments.data.assignments,
                notifications: notifications.data.notifications,
                analytics: analytics.data,
                achievements: achievements.data,
                recommendations: recommendations.data
            };
        },
        enabled: !!user,
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading) return <LoadingSpinner fullScreen text="جاري تحميل لوحة التحكم..." />;
    if (error) return <ErrorAlert error={error} />;

    const stats = [
        {
            icon: BookOpen,
            title: 'الدورات المسجلة',
            value: dashboardData?.enrolledCourses.length || 0,
            color: 'text-blue-600',
            bg: 'bg-blue-50 dark:bg-blue-950',
            trend: '+12% هذا الشهر',
            change: '+2'
        },
        {
            icon: Target,
            title: 'الواجبات المعلقة',
            value: dashboardData?.recentAssignments.filter(a => !a.submitted).length || 0,
            color: 'text-orange-600',
            bg: 'bg-orange-50 dark:bg-orange-950',
            trend: 'قريبة الموعد',
            change: '-1'
        },
        {
            icon: TrendingUp,
            title: 'معدل الإكمال',
            value: `${dashboardData?.analytics.completionRate || 0}%`,
            color: 'text-green-600',
            bg: 'bg-green-50 dark:bg-green-950',
            trend: '+8% هذا الأسبوع',
            change: '+5%'
        },
        {
            icon: Clock,
            title: 'وقت الدراسة',
            value: `${dashboardData?.analytics.studyTime || 0} ساعة`,
            color: 'text-purple-600',
            bg: 'bg-purple-50 dark:bg-purple-950',
            trend: '+3 ساعات هذا الأسبوع',
            change: '+3h'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-castle-sky/5 to-castle-magic/5">
            {/* Hero Section */}
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-castle-magic via-castle-sky to-castle-wisdom text-white p-8 rounded-b-3xl shadow-2xl"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                                <GraduationCap className="h-10 w-10" />
                                مرحباً {user?.firstName}! 👋
                            </h1>
                            <p className="text-blue-100 text-lg">
                                لديك {dashboardData?.recentAssignments.filter(a => !a.submitted).length || 0} واجبات معلقة و
                                {dashboardData?.notifications.filter(n => !n.isRead).length || 0} إشعارات غير مقروءة
                            </p>
                        </div>
                        <div className="hidden lg:flex items-center gap-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold">{user?.tokens || 0}</div>
                                <div className="text-sm text-blue-200">رمز تعليمي</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold">{user?.reputation || 0}</div>
                                <div className="text-sm text-blue-200">نقطة سمعة</div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="group"
                        >
                            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                                            <p className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                                            <div className="flex items-center gap-2">
                                                <Badge variant="secondary" className="text-xs">
                                                    {stat.change}
                                                </Badge>
                                                <p className="text-xs text-muted-foreground">{stat.trend}</p>
                                            </div>
                                        </div>
                                        <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform`}>
                                            <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Learning Progress */}
                    <motion.div 
                        className="lg:col-span-2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <Rocket className="h-6 w-6 text-castle-magic" />
                                    مسيرتك التعليمية
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="text-center py-6">
                                    <div className="relative">
                                        <svg className="w-32 h-32 mx-auto" viewBox="0 0 36 36">
                                            <path
                                                d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"
                                                fill="none"
                                                stroke="hsl(var(--muted))"
                                                strokeWidth="2"
                                            />
                                            <path
                                                d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"
                                                fill="none"
                                                stroke="hsl(var(--castle-magic))"
                                                strokeWidth="2"
                                                strokeDasharray={`${dashboardData?.analytics.completionRate || 0}, 100`}
                                                className="animate-pulse"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                                            <span className="text-3xl font-bold text-castle-magic">
                                                {dashboardData?.analytics.completionRate || 0}%
                                            </span>
                                            <span className="text-sm text-muted-foreground">مكتمل</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    {dashboardData?.enrolledCourses.slice(0, 3).map((course, index) => (
                                        <div key={course.id} className="flex items-center gap-4 p-4 rounded-lg bg-white/80 backdrop-blur-sm">
                                            <div className={`p-2 rounded-lg ${
                                                course.category === 'رياضيات' ? 'bg-blue-100 text-blue-600' :
                                                course.category === 'فيزياء' ? 'bg-green-100 text-green-600' :
                                                'bg-purple-100 text-purple-600'
                                            }`}>
                                                <BookOpen className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium">{course.title}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Progress value={course.progress} className="flex-1" />
                                                    <span className="text-sm text-muted-foreground">{course.progress}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Quick Actions & XR Access */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Brain className="h-5 w-5 text-castle-wisdom" />
                                    الذكاء الاصطناعي
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button 
                                    className="w-full justify-start gap-3 bg-gradient-to-r from-castle-magic to-castle-wisdom hover:from-castle-magic/80 hover:to-castle-wisdom/80" 
                                    onClick={() => window.location.href = '/ai/assistant'}
                                >
                                    <Zap className="h-4 w-4" />
                                    مساعد الذكاء الاصطناعي
                                </Button>
                                <Button 
                                    className="w-full justify-start gap-3" 
                                    variant="outline"
                                    onClick={() => window.location.href = '/ai/recommendations'}
                                >
                                    <Target className="h-4 w-4" />
                                    توصيات شخصية
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-green-50/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PlayCircle className="h-5 w-5 text-castle-sky" />
                                    الواقع الممتد (XR)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Button 
                                    className="w-full justify-start gap-3" 
                                    onClick={() => setShowXRModal(true)}
                                    variant="outline"
                                >
                                    🥽 الفصل الافتراضي
                                </Button>
                                <Button 
                                    className="w-full justify-start gap-3" 
                                    onClick={() => window.location.href = '/xr/time-machine'}
                                    variant="outline"
                                >
                                    ⏰ آلة الزمن التاريخية
                                </Button>
                                <Button 
                                    className="w-full justify-start gap-3" 
                                    onClick={() => window.location.href = '/xr/virtual-lab'}
                                    variant="outline"
                                >
                                    <TestTube className="h-4 w-4" />
                                    المختبر الافتراضي
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-yellow-50/50">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Trophy className="h-5 w-5 text-castle-gold" />
                                    إنجازاتي
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {dashboardData?.achievements.map((achievement) => (
                                        <div key={achievement.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/80">
                                            <span className="text-2xl">{achievement.icon}</span>
                                            <div>
                                                <p className="font-medium text-sm">{achievement.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {new Date(achievement.earnedAt).toLocaleDateString('ar')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Recent Activities & Notifications */}
                <motion.div 
                    className="mt-8"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    المهام القادمة
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {dashboardData?.recentAssignments.slice(0, 4).map((assignment) => (
                                        <div key={assignment.id} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                                            <div className={`p-2 rounded-lg ${
                                                assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                                assignment.status === 'submitted' ? 'bg-blue-100 text-blue-600' :
                                                'bg-green-100 text-green-600'
                                            }`}>
                                                <CheckCircle className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium">{assignment.title}</h4>
                                                <p className="text-sm text-muted-foreground">{assignment.courseName}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant={
                                                        assignment.status === 'pending' ? 'destructive' :
                                                        assignment.status === 'submitted' ? 'default' : 'secondary'
                                                    }>
                                                        {assignment.status === 'pending' ? 'معلق' :
                                                         assignment.status === 'submitted' ? 'مسلم' : 'مقيم'}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(assignment.dueDate).toLocaleDateString('ar')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-5 w-5" />
                                    الإشعارات الحديثة
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {dashboardData?.notifications.slice(0, 5).map((notification) => (
                                        <div key={notification.id} className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50">
                                            <div className={`p-2 rounded-lg flex-shrink-0 ${
                                                notification.type === 'success' ? 'bg-green-100 text-green-600' :
                                                notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                                notification.type === 'error' ? 'bg-red-100 text-red-600' :
                                                'bg-blue-100 text-blue-600'
                                            }`}>
                                                <Bell className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">{notification.title}</p>
                                                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    {new Date(notification.created_at).toLocaleString('ar')}
                                                </p>
                                            </div>
                                            {!notification.isRead && (
                                                <Badge variant="destructive" className="ml-2">جديد</Badge>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
            </div>

            {/* XR Modal */}
            {showXRModal && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setShowXRModal(false)}
                >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-center text-castle-magic">
                            اختر تجربة الواقع الممتد
                        </h3>
                        <div className="space-y-4">
                            <Button 
                                className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                                onClick={() => window.location.href = '/xr/virtual-lab'}
                            >
                                🔬 المختبر الافتراضي
                            </Button>
                            <Button 
                                className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                                onClick={() => window.location.href = '/xr/time-machine'}
                            >
                                ⏰ آلة الزمن التاريخية
                            </Button>
                            <Button 
                                className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                                onClick={() => window.location.href = '/xr/collaborative-space'}
                            >
                                👥 الفصل التعاوني
                            </Button>
                            <Button 
                                className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                                onClick={() => window.location.href = '/ar/petra-experience'}
                            >
                                🏛️ تجربة البتراء
                            </Button>
                        </div>
                        <Button 
                            variant="outline" 
                            className="w-full mt-6"
                            onClick={() => setShowXRModal(false)}
                        >
                            إلغاء
                        </Button>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default StudentDashboard;
