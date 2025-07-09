
import { useState } from "react";
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import { FileText, Award, Info } from "lucide-react";
import CastleCard from "@/components/castle/CastleCard";
import EvaluationForm from "@/components/evaluation/EvaluationForm";
import EvaluationResults from "@/components/evaluation/EvaluationResults";
import DharbMillionEngine from "@/components/ai/DharbMillionEngine";

const BtecEvaluatorPage = () => {
  const [activeTab, setActiveTab] = useState<"evaluator" | "results" | "eduanalytica" | "about">("evaluator");

  return (
    <CastleLayout>
      <CastleBanner
        title="BTEC Evaluator AI"
        subtitle="تقييم ذكي للواجبات الدراسية وفق معايير Pearson BTEC مع نظام ضرب مليون المتقدم"
        icon={<FileText />}
        variant="wisdom"
      />

      <div className="flex border-b mb-6 overflow-x-auto pb-1">
        <button
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "evaluator"
              ? "border-b-2 border-castle-wisdom text-castle-wisdom"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("evaluator")}
        >
          تقييم واجب
        </button>
        <button
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "results"
              ? "border-b-2 border-castle-wisdom text-castle-wisdom"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("results")}
        >
          نتائج التقييم
        </button>
        <button
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "eduanalytica"
              ? "border-b-2 border-castle-wisdom text-castle-wisdom"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("eduanalytica")}
        >
          نظام ضرب مليون
        </button>
        <button
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            activeTab === "about"
              ? "border-b-2 border-castle-wisdom text-castle-wisdom"
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

      {activeTab === "eduanalytica" && (
        <DharbMillionEngine />
      )}

      {activeTab === "about" && (
        <div className="space-y-6">
          <CastleCard title="حول BTEC Evaluator AI" icon={<Info />}>
            <div className="space-y-4">
              <p>
                BTEC Evaluator AI هو مساعد ذكاء اصطناعي متخصص في تقييم واجبات الطلاب وفق معايير Pearson BTEC.
                يستخدم النظام تقنيات معالجة اللغة الطبيعية (NLP) ونماذج الذكاء الاصطناعي المتقدمة لتحليل محتوى الواجبات
                وتقييمها بدقة وموضوعية مع تقنية "ضرب مليون" للأداء الفائق.
              </p>
              
              <h3 className="text-lg font-bold mt-4">المميزات الرئيسية لنظام ضرب مليون</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>سرعة فائقة:</strong> معالجة في أجزاء من الثانية (أقل من 0.5 ثانية لـ 100+ صفحة)</li>
                <li><strong>دقة خارقة:</strong> تنبؤات ودقة تفوق 99.9% مع تفسير منطقي</li>
                <li><strong>ذكاء سياقي متقدم:</strong> فهم عميق للنوايا والسياق الثقافي</li>
                <li><strong>تكيف ذاتي مستمر:</strong> تعلم فوري وتحسين مستمر للأداء</li>
                <li><strong>تكامل شمولي:</strong> ربط حي مع المصادر والمنصات الخارجية</li>
                <li><strong>كشف التناقضات:</strong> تحديد الأخطاء والتناقضات المخفية</li>
                <li><strong>الإبداع المدعوم بالمنطق:</strong> توليد حلول مبتكرة قابلة للتطبيق</li>
              </ul>
              
              <h3 className="text-lg font-bold mt-4">التقنيات المستخدمة</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>نماذج هجينة:</strong> دمج LLM مع التحليل الكمي للدقة القصوى</li>
                <li><strong>التعلم المستمر:</strong> تحديث المعرفة في الزمن الحقيقي</li>
                <li><strong>الذاكرة طويلة الأمد:</strong> تذكر السياق عبر جلسات ممتدة</li>
                <li><strong>نظام المناعة الاصطناعية:</strong> حماية ذاتية ضد التهديدات</li>
                <li><strong>التحليل متعدد الأبعاد:</strong> تقييم لغوي ومنطقي وإبداعي وتقني</li>
              </ul>
            </div>
          </CastleCard>
          
          <CastleCard title="فوائد النظام المتقدم" icon={<Award />} variant="gold">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">للمعلمين</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>تقليل وقت التقييم بنسبة 95% مع دقة فائقة</li>
                <li>ضمان الاتساق والدقة في معايير التقييم</li>
                <li>توفير تعليقات مفصلة وتوصيات ذكية بشكل فوري</li>
                <li>كشف التناقضات والأخطاء المخفية تلقائياً</li>
              </ul>
              
              <h3 className="text-lg font-bold mt-4">للطلاب</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>الحصول على تقييم فوري بدقة تفوق 99.9%</li>
                <li>تلقي تغذية راجعة مخصصة وذكية</li>
                <li>فهم أعمق لمتطلبات المعايير ونقاط التحسين</li>
                <li>توجيه استباقي قبل ظهور المشكلات</li>
              </ul>
              
              <h3 className="text-lg font-bold mt-4">للمؤسسات التعليمية</h3>
              <ul className="space-y-2 list-disc list-inside">
                <li>توحيد معايير التقييم بدقة خارقة</li>
                <li>تحسين جودة التعليم بشكل كبير</li>
                <li>تقليل التكاليف وزيادة الكفاءة جذرياً</li>
                <li>الحصول على تحليلات وتنبؤات متقدمة</li>
              </ul>
            </div>
          </CastleCard>
        </div>
      )}
    </CastleLayout>
  );
};

export default BtecEvaluatorPage;
