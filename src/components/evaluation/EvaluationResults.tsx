
import { useState } from "react";
import CastleButton from "../castle/CastleButton";
import CastleCard from "../castle/CastleCard";
import { Award, Check, FileText, Download, Printer } from "lucide-react";

export default function EvaluationResults() {
  const [showDetails, setShowDetails] = useState(false);

  // هذه البيانات ستأتي من نموذج الذكاء الاصطناعي في التطبيق الفعلي
  const evaluationResults = {
    studentName: "حمزة تيسير التلاحمة",
    grade: "العاشر",
    school: "أم البساتين الثانوية",
    specialization: "إدارة أعمال",
    evaluator: "BTEC Evaluator AI",
    unitNumber: "الوحدة التاسعة عشر",
    unitTitle: "تقنيات الترويج والعرض المرئية لأعمال البيع بالتجزئة",
    taskTitle: "من العرض إلى الشراء: كيف يصنع التجار المرئيون الفارق؟",
    date: "16-Feb-2025",
    criteria: [
      { id: "A.P1", achieved: true, comments: "شرح الطالب أنشطة ومسؤوليات التجار المرئيين في شركتين (أديداس، كريم هايبر ماركت) بشكل جيد مع أمثلة واضحة لكل شركة." },
      { id: "A.P2", achieved: true, comments: "أوضح الطالب كيف يؤثر الحجم والقطاع الفرعي على عمل التجار المرئيين في كل شركة، وقدم تفسيرات مناسبة مع الأمثلة." },
      { id: "A.M1", achieved: true, comments: "استخدم الطالب أمثلة واقعية لشرح التقنيات المستخدمة من قبل التجار المرئيين في الشركتين، مع توضيح تأثير الحجم والقطاع." },
      { id: "B.P3", achieved: true, comments: "وصف الأدوات التي يستخدمها التجار المرئيون في الشركتين بشكل جيد، مثل الشاشات الإلكترونية والرفوف الباردة، مدعماً بأمثلة ذات صلة." },
      { id: "B.P4", achieved: true, comments: "حلل تأثير الحجم والقطاع الفرعي على أنشطة ومسؤوليات التجار المرئيين في كل شركة، مع شرح الفروق بين القطاعات بوضوح." },
      { id: "B.M2", achieved: true, comments: "تحليل جيد لفوائد استخدام التقنيات والأدوات المختلفة، وربطها بتجربة العملاء والموردين في كل قطاع." },
      { id: "D.AB1", achieved: true, comments: "تقييم فعالية نجاح الأعمال للأنشطة والمسؤوليات والتقنيات والأدوات المستخدمة في الشركتين، مع تقديم وجهة نظر نقدية حول الأثر على العمل." },
    ],
    generalComments: "الطالب قدم بحثاً جيداً ومنظماً، وتمكن من الربط بين المفاهيم النظرية والتطبيق العملي في شركات حقيقية بقطاعات مختلفة. استخدم أمثلة واضحة من الواقع المحلي، وشرح الفروق الجوهرية بين قطاعي الموضة/الرياضة والمواد الغذائية. الإجابات شملت جميع محاور المهام المطلوبة، وجاءت بلغة واضحة وسليمة. تم توثيق المصادر في نهاية البحث.",
    strengths: [
      "تغطية جميع جوانب المعايير المطلوبة.",
      "وضوح الأمثلة وربطها بالسوق الأردني.",
      "استخدام لغة مناسبة ومصطلحات صحيحة.",
    ],
    improvements: [
      "محاولة التوسع أكثر في شرح التقنيات الرقمية الحديثة وتأثيرها على تجربة التسوق (يمكن الاستفادة من أمثلة دولية إضافية).",
      "دعم التحليل ببيانات رقمية أو رسومات توضيحية إن أمكن.",
    ],
    decision: "تم تحقيق جميع معايير التقييم بنجاح.",
    summary: "الطالب استوفى جميع متطلبات المهمة، والإجابات المقدمة متوافقة تماماً مع معايير Pearson BTEC. لا توجد ملاحظات جوهرية تستدعي إعادة التقديم. تمت الموافقة على قرار التقييم من المدقق الداخلي."
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">نتائج التقييم</h2>
        <div className="flex gap-2">
          <CastleButton variant="outline" size="sm" icon={<Printer />}>
            طباعة التقرير
          </CastleButton>
          <CastleButton variant="outline" size="sm" icon={<Download />}>
            تحميل PDF
          </CastleButton>
        </div>
      </div>

      <CastleCard title="معلومات الطالب والمهمة" variant="stone" className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">اسم الطالب</p>
            <p className="font-medium">{evaluationResults.studentName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">الصف</p>
            <p className="font-medium">{evaluationResults.grade}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">المدرسة</p>
            <p className="font-medium">{evaluationResults.school}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">التخصص</p>
            <p className="font-medium">{evaluationResults.specialization}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">اسم المقيّم</p>
            <p className="font-medium">{evaluationResults.evaluator}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">تاريخ التقييم</p>
            <p className="font-medium">{evaluationResults.date}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500 mb-1">الوحدة</p>
            <p className="font-medium">{evaluationResults.unitNumber}: {evaluationResults.unitTitle}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500 mb-1">عنوان الواجب</p>
            <p className="font-medium">{evaluationResults.taskTitle}</p>
          </div>
        </div>
      </CastleCard>

      <CastleCard title="تقييم المعايير المستهدفة" variant="magic" className="mb-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[hsla(var(--castle-magic)/0.1)] text-right">
                <th className="p-3 border border-[hsl(var(--border))]">المعيار</th>
                <th className="p-3 border border-[hsl(var(--border))]">هل تم تحقيق المعيار؟</th>
                <th className="p-3 border border-[hsl(var(--border))]">تعليقات التقييم</th>
              </tr>
            </thead>
            <tbody>
              {evaluationResults.criteria.map((criterion, index) => (
                <tr key={criterion.id} className={index % 2 === 0 ? "bg-background" : "bg-[hsla(var(--muted)/0.3)]"}>
                  <td className="p-3 border border-[hsl(var(--border))] font-medium">{criterion.id}</td>
                  <td className="p-3 border border-[hsl(var(--border))]">
                    <span className={`inline-flex items-center ${criterion.achieved ? "text-green-600" : "text-amber-600"}`}>
                      {criterion.achieved ? <Check size={16} className="ml-1" /> : "لا"}
                      {criterion.achieved ? "نعم" : ""}
                    </span>
                  </td>
                  <td className="p-3 border border-[hsl(var(--border))]">{criterion.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CastleCard>

      <CastleCard title="تعليقات عامة" icon={<FileText />} className="mb-6">
        <p className="mb-4">{evaluationResults.generalComments}</p>

        <div className="mt-4">
          <h4 className="font-bold mb-2">نقاط القوة:</h4>
          <ul className="space-y-1 list-disc list-inside">
            {evaluationResults.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="font-bold mb-2">نقاط للتحسين:</h4>
          <ul className="space-y-1 list-disc list-inside">
            {evaluationResults.improvements.map((improvement, index) => (
              <li key={index}>{improvement}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6 p-4 bg-[hsla(var(--castle-gold)/0.1)] border border-[hsl(var(--castle-gold))] rounded-md">
          <h4 className="font-bold flex items-center text-[hsl(var(--castle-gold))]">
            <Award size={18} className="ml-2" />
            قرار التقييم
          </h4>
          <p className="mt-2">{evaluationResults.decision}</p>
        </div>
      </CastleCard>

      <CastleButton variant="outline" onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "إخفاء التفاصيل التقنية" : "عرض التفاصيل التقنية"}
      </CastleButton>

      {showDetails && (
        <CastleCard title="تفاصيل التقييم التقني" variant="wisdom">
          <p className="mb-4">تم تحليل واجب الطالب باستخدام نموذج BTEC Evaluator AI، المستند إلى GPT-4o. يقوم النموذج بالخطوات التالية:</p>
          
          <ol className="space-y-2 list-decimal list-inside mb-4">
            <li>تقسيم الواجب إلى أقسام تعكس المعايير المطلوبة</li>
            <li>تحليل المحتوى المعرفي ومطابقته مع متطلبات كل معيار</li>
            <li>تقييم الأمثلة، التحليل، والتوثيق</li>
            <li>إنشاء تعليقات مخصصة لكل معيار</li>
            <li>تقديم توصيات عامة للتحسين</li>
          </ol>
          
          <p className="text-sm text-gray-500">
            تمت مراجعة هذا التقييم وتأكيده بواسطة نموذج الذكاء الاصطناعي. للحصول على مراجعة بشرية، يرجى التواصل مع المشرف الأكاديمي.
          </p>
          
          <div className="mt-4 text-sm">
            <p className="font-medium">ملخص التقييم:</p>
            <p>{evaluationResults.summary}</p>
          </div>
        </CastleCard>
      )}
    </div>
  );
}
