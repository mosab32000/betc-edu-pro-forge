
import { useState } from "react";
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import { FileText, Award, Info } from "lucide-react";
import CastleCard from "@/components/castle/CastleCard";
import EvaluationForm from "@/components/evaluation/EvaluationForm";
import EvaluationResults from "@/components/evaluation/EvaluationResults";

const BtecEvaluatorPage = () => {
  const [activeTab, setActiveTab] = useState<"evaluator" | "results" | "about">("evaluator");

  return (
    <CastleLayout>
      <CastleBanner
        title="BTEC Evaluator AI"
        subtitle="تقييم ذكي للواجبات الدراسية وفق معايير Pearson BTEC"
        icon={<FileText />}
        variant="wisdom"
      />

      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "evaluator"
              ? "border-b-2 border-[hsl(var(--castle-wisdom))] text-[hsl(var(--castle-wisdom))]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("evaluator")}
        >
          تقييم واجب
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "results"
              ? "border-b-2 border-[hsl(var(--castle-wisdom))] text-[hsl(var(--castle-wisdom))]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("results")}
        >
          نتائج التقييم
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "about"
              ? "border-b-2 border-[hsl(var(--castle-wisdom))] text-[hsl(var(--castle-wisdom))]"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("about")}
        >
          حول النظام
        </button>
      </div>

      {activeTab === "evaluator" && (
        <EvaluationForm />
      )}

      {activeTab === "results" && (
        <EvaluationResults />
      )}

      {activeTab === "about" && (
        <div className="space-y-6">
          <CastleCard title="حول BTEC Evaluator AI" icon={<Info />}>
            <div className="space-y-4">
              <p>
                BTEC Evaluator AI هو مساعد ذكاء اصطناعي متخصص في تقييم واجبات الطلاب وفق معايير Pearson BTEC.
                يستخدم النظام تقنيات معالجة اللغة الطبيعية (NLP) ونماذج الذكاء الاصطناعي المتقدمة لتحليل محتوى الواجبات
                وتقييمها بدقة وموضوعية.
              </p>
              
              <h3 className="text-lg font-bold mt-4">المميزات الرئيسية</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>تحليل دقيق لمحتوى الواجبات مقابل معايير BTEC المستهدفة</li>
                <li>تقييم موضوعي يعتمد على معايير محددة مسبقًا</li>
                <li>تعليقات مفصلة وتوصيات للتحسين</li>
                <li>دعم كامل للغة العربية</li>
                <li>توليد تقارير تقييم شاملة قابلة للطباعة والمشاركة</li>
              </ul>
              
              <h3 className="text-lg font-bold mt-4">كيف يعمل النظام</h3>
              <ol className="space-y-2 list-decimal list-inside">
                <li>يحلل النظام وثيقة الواجب المرفوعة باستخدام تقنيات معالجة اللغة الطبيعية</li>
                <li>يقارن المحتوى بمتطلبات كل معيار من معايير BTEC المستهدفة</li>
                <li>يحدد ما إذا تم تحقيق كل معيار بناءً على معايير مبرمجة مسبقًا</li>
                <li>يولد تعليقات مفصلة وتوصيات للتحسين</li>
                <li>ينشئ تقرير تقييم شامل يوثق النتائج</li>
              </ol>
            </div>
          </CastleCard>
          
          <CastleCard title="فوائد النظام" icon={<Award />} variant="gold">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">للمعلمين</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>تقليل وقت التقييم بنسبة 80%</li>
                <li>ضمان الاتساق في معايير التقييم</li>
                <li>توفير تعليقات مفصلة بشكل أوتوماتيكي</li>
                <li>تخفيف العبء الإداري وزيادة الوقت المتاح للتدريس</li>
              </ul>
              
              <h3 className="text-lg font-bold mt-4">للطلاب</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>الحصول على تقييم موضوعي ودقيق</li>
                <li>تلقي تغذية راجعة فورية ومفصلة</li>
                <li>فهم أفضل لمتطلبات المعايير ونقاط التحسين</li>
                <li>تعزيز مهارات الكتابة الأكاديمية من خلال التوجيه المستمر</li>
              </ul>
              
              <h3 className="text-lg font-bold mt-4">للمؤسسات التعليمية</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>توحيد معايير التقييم عبر مختلف المقررات</li>
                <li>تحسين جودة التعليم والنتائج الأكاديمية</li>
                <li>تقليل التكاليف وزيادة الكفاءة</li>
                <li>الحصول على بيانات وتحليلات مفصلة حول أداء الطلاب</li>
              </ul>
            </div>
          </CastleCard>
        </div>
      )}
    </CastleLayout>
  );
};

export default BtecEvaluatorPage;
