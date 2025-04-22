
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import CastleButton from "@/components/castle/CastleButton";
import { FileText, Upload, Check, AlertTriangle, Info, Award } from "lucide-react";
import { useState } from "react";

const TasksPage = () => {
  const [activeTab, setActiveTab] = useState("submit");

  return (
    <CastleLayout>
      <CastleBanner
        title="قاعة المهام"
        subtitle="تقديم وتقييم المهام الدراسية بناءً على معايير BTEC"
        icon={<FileText />}
      />

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "submit"
              ? "border-b-2 border-[hsl(var(--castle-magic))] text-[hsl(var(--castle-magic))]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("submit")}
        >
          تقديم مهمة
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "evaluations"
              ? "border-b-2 border-[hsl(var(--castle-magic))] text-[hsl(var(--castle-magic))]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("evaluations")}
        >
          تقييمات سابقة
        </button>
      </div>

      {activeTab === "submit" ? (
        <SubmitTaskTab />
      ) : (
        <PreviousEvaluationsTab />
      )}
    </CastleLayout>
  );
};

const SubmitTaskTab = () => {
  return (
    <div className="space-y-6">
      <CastleCard title="تقديم مهمة جديدة" icon={<Upload />}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">عنوان المهمة</label>
            <input
              type="text"
              className="w-full p-2 border border-[hsl(var(--border))] rounded-md"
              placeholder="أدخل عنوان المهمة هنا"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">الوحدة الدراسية</label>
            <select className="w-full p-2 border border-[hsl(var(--border))] rounded-md">
              <option value="">اختر الوحدة الدراسية</option>
              <option value="1">الوحدة الأولى: مقدمة في الأعمال</option>
              <option value="2">الوحدة الثانية: العمل في فريق عمل</option>
              <option value="3">الوحدة الثالثة: التمويل للأعمال</option>
              <option value="19">الوحدة التاسعة عشر: تقنيات الترويج والعرض المرئية</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">نوع التقييم</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="assessmentType" value="btec" defaultChecked />
                <span>معايير BTEC</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="assessmentType" value="custom" />
                <span>معايير مخصصة</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">نص المهمة</label>
            <textarea
              className="w-full p-2 border border-[hsl(var(--border))] rounded-md min-h-[200px]"
              placeholder="أدخل نص المهمة هنا..."
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">رفع ملفات (اختياري)</label>
            <div className="border-2 border-dashed border-[hsl(var(--border))] rounded-md p-8 text-center">
              <p className="mb-2">اسحب الملفات هنا أو</p>
              <CastleButton variant="outline" size="sm">اختر ملفات</CastleButton>
              <p className="mt-2 text-xs text-gray-500">PDF, DOCX, PPTX, PNG, JPG (بحد أقصى 10MB)</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <CastleButton variant="outline">إلغاء</CastleButton>
            <CastleButton variant="magic" icon={<FileText />}>تقييم المهمة</CastleButton>
          </div>
        </div>
      </CastleCard>

      <CastleCard title="معلومات عن التقييم الذكي" icon={<Info />} variant="wisdom">
        <div className="space-y-4">
          <p>
            يستخدم نظام التقييم الذكي EduAnalytica Pro نماذج OpenAI GPT-4o المتقدمة لتحليل وتقييم المهام بدقة وفق معايير BTEC.
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li>تحليل شامل للمحتوى المعرفي والمنهجية</li>
            <li>اكتشاف الفجوات المعرفية وتقديم توصيات للتحسين</li>
            <li>تسجيل التقييمات في سجل مقاوم للتلاعب باستخدام Blockchain</li>
            <li>دعم اللغتين العربية والإنجليزية</li>
          </ul>
        </div>
      </CastleCard>
    </div>
  );
};

const PreviousEvaluationsTab = () => {
  return (
    <div className="space-y-6">
      {assessments.map((assessment) => (
        <CastleCard 
          key={assessment.id}
          title={assessment.title}
          variant={assessment.status === "completed" ? "stone" : "magic"}
        >
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <span className="text-sm text-gray-500">الوحدة: </span>
                <span>{assessment.unit}</span>
              </div>
              <div>
                <span className="text-sm text-gray-500">التاريخ: </span>
                <span>{assessment.date}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">الحالة: </span>
              <span className={`flex items-center gap-1 ${
                assessment.status === "completed" 
                  ? "text-green-600" 
                  : "text-amber-600"
              }`}>
                {assessment.status === "completed" ? (
                  <>
                    <Check size={16} /> مكتمل
                  </>
                ) : (
                  <>
                    <AlertTriangle size={16} /> قيد التقييم
                  </>
                )}
              </span>
            </div>
            
            {assessment.status === "completed" && (
              <div className="flex flex-wrap gap-2 mt-2">
                {assessment.criteria.map((criterion) => (
                  <div 
                    key={criterion.id}
                    className="flex items-center gap-1 px-2 py-1 text-sm rounded-full bg-[hsla(var(--castle-stone)/0.2)]"
                  >
                    <Award size={14} className="text-[hsl(var(--castle-gold))]" />
                    {criterion.name}: {criterion.result}
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-end">
              <CastleButton 
                variant={assessment.status === "completed" ? "gold" : "outline"}
                size="sm"
              >
                {assessment.status === "completed" ? "عرض التقييم" : "فحص الحالة"}
              </CastleButton>
            </div>
          </div>
        </CastleCard>
      ))}
    </div>
  );
};

const assessments = [
  {
    id: 1,
    title: "من العرض إلى الشراء: كيف يصنع التجار المرئيون الفارق؟",
    unit: "الوحدة التاسعة عشر: تقنيات الترويج والعرض المرئية لأعمال البيع بالتجزئة",
    date: "16-Feb-2025",
    status: "completed",
    criteria: [
      { id: 1, name: "A.P1", result: "Pass" },
      { id: 2, name: "A.P2", result: "Pass" },
      { id: 3, name: "A.M1", result: "Merit" },
      { id: 4, name: "B.P3", result: "Pass" },
      { id: 5, name: "B.P4", result: "Pass" },
      { id: 6, name: "B.M2", result: "Merit" },
      { id: 7, name: "D.AB1", result: "Distinction" },
    ]
  },
  {
    id: 2,
    title: "تحليل نموذج أعمال شركة آبل",
    unit: "الوحدة الثانية: العمل في فريق عمل",
    date: "10-Feb-2025",
    status: "completed",
    criteria: [
      { id: 1, name: "P1", result: "Pass" },
      { id: 2, name: "P2", result: "Pass" },
      { id: 3, name: "M1", result: "Merit" },
    ]
  },
  {
    id: 3,
    title: "دراسة جدوى لمشروع تجاري جديد",
    unit: "الوحدة الثالثة: التمويل للأعمال",
    date: "20-Feb-2025",
    status: "in-progress",
    criteria: []
  },
];

export default TasksPage;
