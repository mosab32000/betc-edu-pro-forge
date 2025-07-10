
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle, Edit, Megaphone, Users, BarChart3, CheckCircle, Sparkles } from 'lucide-react';

// البيانات الوهمية
const mockTeacherData = {
    summary: {
        classCount: 4,
        studentCount: 112,
        pendingSubmissions: 18
    },
    classes: [
        { id: 'C101', name: 'الفيزياء - الصف الثاني عشر (أ)', studentCount: 28, subject: 'فيزياء' },
        { id: 'C102', name: 'الفيزياء - الصف الثاني عشر (ب)', studentCount: 30, subject: 'فيزياء' },
        { id: 'C201', name: 'علوم الأرض - الصف الحادي عشر', studentCount: 25, subject: 'علوم الأرض' },
        { id: 'C301', name: 'الثقافة العلمية - الصف العاشر', studentCount: 29, subject: 'ثقافة علمية' },
    ],
    submissionStatus: [
        { name: 'تم تقييمها', value: 135 },
        { name: 'بانتظار التقييم', value: 18 },
        { name: 'لم يتم التسليم', value: 25 },
    ],
    recentActivity: [
        { id: 1, text: 'قام الطالب "أحمد علي" بتسليم واجب "قانون كولوم".' },
        { id: 2, text: 'تم نشر إعلان لفصل "الفيزياء - ثاني عشر (أ)".' },
        { id: 3, text: 'تم تقييم واجب "أساسيات المرايا" للطالبة "سارة محمد".' },
    ]
};

const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

const TeacherDashboard = () => {
    const [teacherData, setTeacherData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setTimeout(() => {
                setTeacherData(mockTeacherData);
                setLoading(false);
            }, 1500);
        };
        loadData();
    }, []);

    if (loading) {
        return <TeacherDashboardSkeleton />;
    }

    const { summary, classes, submissionStatus, recentActivity } = teacherData;

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto" dir="rtl">
            <header className="space-y-2">
                <h2 className="text-3xl font-bold text-gradient">أهلاً بك مجدداً، أستاذنا الفاضل</h2>
                <p className="text-muted-foreground">لوحة التحكم لإدارة فصولك وأنشطتك التعليمية بكل سهولة.</p>
            </header>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="flex items-center p-6">
                        <Users className="h-8 w-8 text-blue-600 ml-4" />
                        <div>
                            <h4 className="text-2xl font-bold">{summary.classCount}</h4>
                            <p className="text-sm text-muted-foreground">عدد الفصول</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6">
                        <Users className="h-8 w-8 text-green-600 ml-4" />
                        <div>
                            <h4 className="text-2xl font-bold">{summary.studentCount}</h4>
                            <p className="text-sm text-muted-foreground">إجمالي الطلاب</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="flex items-center p-6">
                        <CheckCircle className="h-8 w-8 text-orange-600 ml-4" />
                        <div>
                            <h4 className="text-2xl font-bold">{summary.pendingSubmissions}</h4>
                            <p className="text-sm text-muted-foreground">تسليمات بانتظار التقييم</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* فصولي الدراسية */}
                <Card className="col-span-full lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            فصولي الدراسية
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {classes.map(cls => (
                                <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="space-y-1">
                                        <h4 className="font-medium">{cls.name}</h4>
                                        <p className="text-sm text-muted-foreground">{cls.studentCount} طالب</p>
                                    </div>
                                    <Button size="sm" asChild>
                                        <Link to={`/class/${cls.id}/new-assignment`}>
                                            واجب جديد
                                        </Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* أدوات المعلم */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Edit className="h-5 w-5" />
                            أدوات المعلم
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button className="w-full justify-start" variant="outline" asChild>
                            <Link to="/create-assignment">
                                <PlusCircle className="h-4 w-4 ml-2" />
                                إنشاء واجب جديد
                            </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline" asChild>
                            <Link to="/announcements/new">
                                <Megaphone className="h-4 w-4 ml-2" />
                                إرسال إعلان عام
                            </Link>
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            <Sparkles className="h-4 w-4 ml-2" />
                            اقتراح أسئلة بالذكاء الاصطناعي
                            <Badge className="mr-2">AI</Badge>
                        </Button>
                    </CardContent>
                </Card>

                {/* حالة التسليمات */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            حالة التسليمات
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                                <Pie
                                    data={submissionStatus}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                >
                                    {submissionStatus.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value, name) => [value, name]}/>
                                <Legend iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* آخر الأنشطة */}
                <Card className="col-span-full lg:col-span-2">
                    <CardHeader>
                        <CardTitle>آخر الأنشطة</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recentActivity.map(activity => (
                                <div key={activity.id} className="p-3 bg-muted rounded-lg">
                                    <p className="text-sm">{activity.text}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const TeacherDashboardSkeleton = () => (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <header className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Skeleton className="h-80 col-span-2" />
            <Skeleton className="h-80" />
            <Skeleton className="h-60" />
            <Skeleton className="h-40 col-span-2" />
        </div>
    </div>
);

export default TeacherDashboard;
