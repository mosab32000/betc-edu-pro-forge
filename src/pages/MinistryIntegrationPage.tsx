
import React, { useState } from 'react';
import CastleLayout from '@/components/layout/CastleLayout';
import CastleBanner from '@/components/castle/CastleBanner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Zap, Activity, BarChart3, Users, Settings } from 'lucide-react';
import MinistryHierarchy from '@/components/ministry/MinistryHierarchy';
import SequentialExecutionEngine from '@/components/ministry/SequentialExecutionEngine';
import { SequentialExecution, ExecutionStage } from '@/types/ministry';

// بيانات تجريبية للمشاريع
const sampleExecutions: SequentialExecution[] = [
  {
    id: 'exec-1',
    name: 'مشروع التحول الرقمي الشامل',
    description: 'رقمنة العمليات التعليمية والإدارية في جميع مدارس المملكة',
    type: 'digital_transformation',
    currentStage: 2,
    status: 'in_progress',
    priority: 'critical',
    createdBy: 'admin-1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    estimatedDuration: 18000, // 300 ساعة
    actualDuration: 12500,
    dependencies: [],
    stages: [
      {
        id: 'stage-1',
        name: 'التخطيط والتحليل',
        description: 'تحليل الوضع الحالي ووضع خطة التحول الرقمي',
        order: 1,
        status: 'completed',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-02-01'),
        estimatedDuration: 2400,
        actualDuration: 2200,
        deliverables: [
          {
            id: 'del-1',
            name: 'تقرير تحليل الوضع الحالي',
            description: 'تحليل شامل للبنية التحتية التكنولوجية الحالية',
            type: 'تقرير',
            status: 'completed',
            deadline: new Date('2024-01-25'),
            assignedTo: 'analyst-1',
            quality: {
              accuracy: 95,
              completeness: 98,
              timeliness: 90,
              relevance: 96,
              overall: 95
            }
          }
        ],
        milestones: [
          {
            id: 'mile-1',
            name: 'اكتمال التحليل الأولي',
            description: 'الانتهاء من تحليل جميع المدارس المستهدفة',
            targetDate: new Date('2024-01-20'),
            actualDate: new Date('2024-01-18'),
            status: 'achieved',
            impact: 'high'
          }
        ],
        resources: [
          {
            id: 'res-1',
            name: 'محللو النظم',
            type: 'human',
            quantity: 5,
            unit: 'شخص',
            cost: 15000,
            availability: {
              status: 'allocated',
              startDate: new Date('2024-01-15'),
              endDate: new Date('2024-02-01'),
              utilization: 100
            }
          }
        ],
        risks: [
          {
            id: 'risk-1',
            description: 'تأخير في الحصول على البيانات من بعض المدارس',
            category: 'إجرائي',
            probability: 'medium',
            impact: 'medium',
            mitigation: 'التواصل المباشر مع مديري المدارس',
            owner: 'project-manager-1',
            status: 'resolved'
          }
        ]
      },
      {
        id: 'stage-2',
        name: 'التطوير والتنفيذ',
        description: 'تطوير الأنظمة الرقمية وبدء التنفيذ التدريجي',
        order: 2,
        status: 'in_progress',
        startDate: new Date('2024-02-01'),
        estimatedDuration: 7200,
        deliverables: [
          {
            id: 'del-2',
            name: 'نظام إدارة الطلاب',
            description: 'تطوير نظام شامل لإدارة بيانات الطلاب',
            type: 'نظام',
            status: 'in_progress',
            deadline: new Date('2024-03-15'),
            assignedTo: 'dev-team-1',
            quality: {
              accuracy: 0,
              completeness: 60,
              timeliness: 70,
              relevance: 95,
              overall: 56
            }
          }
        ],
        milestones: [],
        resources: [],
        risks: []
      },
      {
        id: 'stage-3',
        name: 'التدريب والتسليم',
        description: 'تدريب المستخدمين وتسليم الأنظمة',
        order: 3,
        status: 'pending',
        estimatedDuration: 4800,
        deliverables: [],
        milestones: [],
        resources: [],
        risks: []
      }
    ],
    metadata: {
      tags: ['رقمنة', 'تعليم', 'تكنولوجيا'],
      category: 'تحول رقمي',
      scope: 'national',
      affectedEntities: ['moe-jordan', 'amman-first-dir', 'zarqa-dir'],
      stakeholders: [
        {
          id: 'stake-1',
          name: 'وزير التربية والتعليم',
          role: 'راعي المشروع',
          type: 'internal',
          influence: 'high',
          interest: 'high',
          contactInfo: {
            email: 'minister@moe.gov.jo'
          }
        }
      ],
      successCriteria: {
        kpis: [
          {
            id: 'kpi-1',
            name: 'نسبة المدارس المرقمنة',
            description: 'النسبة المئوية للمدارس التي تم رقمنتها بالكامل',
            unit: '%',
            target: 100,
            current: 35,
            trend: 'improving',
            frequency: 'شهري'
          }
        ],
        targets: [
          {
            id: 'target-1',
            description: 'رقمنة 100% من المدارس الحكومية',
            value: 100,
            unit: '%',
            deadline: new Date('2024-12-31'),
            status: 'in_progress'
          }
        ],
        benchmarks: [
          {
            id: 'bench-1',
            name: 'المعيار الدولي للرقمنة التعليمية',
            description: 'معيار منظمة التعاون الاقتصادي والتنمية',
            value: 85,
            unit: '%',
            source: 'OECD',
            date: new Date('2023-01-01')
          }
        ]
      },
      reportingFrequency: 'monthly'
    }
  },
  {
    id: 'exec-2',
    name: 'برنامج تطوير المناهج الحديثة',
    description: 'تحديث وتطوير المناهج التعليمية لتواكب متطلبات القرن الواحد والعشرين',
    type: 'curriculum_development',
    currentStage: 1,
    status: 'in_progress',
    priority: 'high',
    createdBy: 'admin-2',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-25'),
    estimatedDuration: 14400, // 240 ساعة
    stages: [
      {
        id: 'stage-4',
        name: 'البحث والتطوير',
        description: 'بحث أفضل الممارسات العالمية وتطوير إطار المناهج الجديدة',
        order: 1,
        status: 'in_progress',
        startDate: new Date('2024-01-20'),
        estimatedDuration: 5760,
        deliverables: [
          {
            id: 'del-3',
            name: 'دراسة الممارسات العالمية',
            description: 'تحليل المناهج المتقدمة في دول مختارة',
            type: 'دراسة',
            status: 'in_progress',
            deadline: new Date('2024-02-20'),
            assignedTo: 'research-team-1',
            quality: {
              accuracy: 0,
              completeness: 40,
              timeliness: 85,
              relevance: 90,
              overall: 54
            }
          }
        ],
        milestones: [],
        resources: [],
        risks: []
      }
    ],
    dependencies: [],
    metadata: {
      tags: ['مناهج', 'تطوير', 'تعليم'],
      category: 'تطوير أكاديمي',
      scope: 'national',
      affectedEntities: ['nceee'],
      stakeholders: [],
      successCriteria: {
        kpis: [],
        targets: [],
        benchmarks: []
      },
      reportingFrequency: 'weekly'
    }
  }
];

const MinistryIntegrationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <CastleLayout>
      <CastleBanner
        title="منصة التكامل الوزاري المتقدمة"
        subtitle="نظام شامل لإدارة وتنسيق العمليات التعليمية في وزارة التربية والتعليم الأردنية مع التنفيذ المتتابع المبتكر"
        icon={<Building className="w-6 h-6" />}
        variant="magic"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="hierarchy" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            الهيكل التنظيمي
          </TabsTrigger>
          <TabsTrigger value="execution" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            التنفيذ المتتابع
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            المراقبة والتحكم
          </TabsTrigger>
          <TabsTrigger value="management" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            الإدارة المتقدمة
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="petra-panel p-6 text-center">
              <Building className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg">12 محافظة</h3>
              <p className="text-gray-600">مشمولة بالنظام</p>
            </div>
            <div className="petra-panel p-6 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg">1.65M طالب</h3>
              <p className="text-gray-600">في النظام التعليمي</p>
            </div>
            <div className="petra-panel p-6 text-center">
              <Activity className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg">120K معلم</h3>
              <p className="text-gray-600">يخدمون النظام</p>
            </div>
            <div className="petra-panel p-6 text-center">
              <Zap className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h3 className="font-bold text-lg">85% كفاءة</h3>
              <p className="text-gray-600">في التنفيذ المتتابع</p>
            </div>
          </div>

          <div className="petra-panel p-6">
            <h2 className="text-xl font-bold mb-4">ميزات النظام المتقدمة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">التنفيذ المتتابع الذكي</h3>
                <p className="text-sm text-gray-600">
                  نظام متقدم لإدارة المشاريع بتسلسل ذكي يضمن الكفاءة والجودة
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">التكامل الشامل</h3>
                <p className="text-sm text-gray-600">
                  ربط جميع مؤسسات الوزارة في نظام موحد للتنسيق والتعاون
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold mb-2">المراقبة المتقدمة</h3>
                <p className="text-sm text-gray-600">
                  نظام مراقبة ذكي يتتبع الأداء ويتنبأ بالمشاكل قبل حدوثها
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold mb-2">التحليلات التنبؤية</h3>
                <p className="text-sm text-gray-600">
                  استخدام الذكاء الاصطناعي للتنبؤ بالاتجاهات وتحسين القرارات
                </p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <h3 className="font-semibold mb-2">إدارة الموارد الذكية</h3>
                <p className="text-sm text-gray-600">
                  تحسين استخدام الموارد البشرية والمالية والتقنية
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="font-semibold mb-2">التقارير التفاعلية</h3>
                <p className="text-sm text-gray-600">
                  تقارير ديناميكية وتفاعلية لجميع مستويات الإدارة
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="hierarchy">
          <MinistryHierarchy />
        </TabsContent>

        <TabsContent value="execution">
          <SequentialExecutionEngine 
            executions={sampleExecutions}
            onExecutionUpdate={(execution) => {
              console.log('تحديث المشروع:', execution);
            }}
          />
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="petra-panel p-6">
            <h2 className="text-xl font-bold mb-4">مركز المراقبة والتحكم المتقدم</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">المؤشرات الحية</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>حالة الأنظمة</span>
                    <span className="text-green-600 font-bold">متاح 99.9%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span>المشاريع النشطة</span>
                    <span className="text-blue-600 font-bold">12 مشروع</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span>معدل الإنجاز</span>
                    <span className="text-purple-600 font-bold">87.3%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">التنبيهات والتحديثات</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <p className="text-sm">مشروع التحول الرقمي: تأخير محتمل في المرحلة الثانية</p>
                    <p className="text-xs text-gray-500">قبل 15 دقيقة</p>
                  </div>
                  <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                    <p className="text-sm">تم إكمال تدريب 150 معلم على النظام الجديد</p>
                    <p className="text-xs text-gray-500">قبل ساعة واحدة</p>
                  </div>
                  <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <p className="text-sm">بدء المرحلة الثالثة من مشروع تطوير المناهج</p>
                    <p className="text-xs text-gray-500">قبل 3 ساعات</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="management" className="space-y-6">
          <div className="petra-panel p-6">
            <h2 className="text-xl font-bold mb-4">الإدارة المتقدمة للنظام</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-3">إعدادات النظام</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                    إعدادات المستخدمين
                  </button>
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                    إعدادات الأمان
                  </button>
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                    إعدادات التكامل
                  </button>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-3">إدارة البيانات</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                    نسخ احتياطي
                  </button>
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                    استيراد البيانات
                  </button>
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                    تصدير التقارير
                  </button>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-3">المراقبة المتقدمة</h3>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                    سجلات النظام
                  </button>
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                    تحليل الأداء
                  </button>
                  <button className="w-full text-left p-2 hover:bg-gray-50 rounded">
                    التقارير المخصصة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </CastleLayout>
  );
};

export default MinistryIntegrationPage;
