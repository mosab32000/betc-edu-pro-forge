
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import { BookOpen, Video, FileText, PenTool } from "lucide-react";

const WisdomPage = () => {
  return (
    <CastleLayout>
      <CastleBanner
        title="برج الحكمة"
        subtitle="عرض الدروس والمحتوى التعليمي بصيغ متنوعة"
        icon={<BookOpen />}
        variant="wisdom"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CastleCard 
            key={course.id}
            title={course.title}
            variant="stone"
            className="hover:shadow-lg transition-shadow"
          >
            <div className="space-y-4">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                {course.type === "video" ? (
                  <Video className="text-[hsl(var(--castle-wisdom))]" />
                ) : course.type === "document" ? (
                  <FileText className="text-[hsl(var(--castle-wisdom))]" />
                ) : (
                  <PenTool className="text-[hsl(var(--castle-wisdom))]" />
                )}
              </div>
              
              <div>
                <p className="text-sm text-gray-600">{course.description}</p>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">{course.duration}</span>
                <span className="text-[hsl(var(--castle-wisdom))]">{course.unit}</span>
              </div>
            </div>
          </CastleCard>
        ))}
      </div>
    </CastleLayout>
  );
};

const courses = [
  {
    id: 1,
    title: "مقدمة في معايير BTEC",
    description: "شرح مفصل لمعايير BTEC وكيفية تحقيقها في الواجبات الدراسية",
    type: "video",
    duration: "20 دقيقة",
    unit: "عام"
  },
  {
    id: 2,
    title: "تحليل PESTEL الشامل",
    description: "دليل مفصل حول إجراء تحليل PESTEL مع أمثلة واقعية",
    type: "document",
    duration: "15 صفحة",
    unit: "الوحدة 1"
  },
  {
    id: 3,
    title: "نماذج التمويل للأعمال",
    description: "شرح لنماذج التمويل المختلفة وتطبيقاتها العملية",
    type: "interactive",
    duration: "30 دقيقة",
    unit: "الوحدة 3"
  },
  {
    id: 4,
    title: "استراتيجيات العرض المرئي",
    description: "كيفية تصميم استراتيجيات عرض مرئي فعالة في متاجر التجزئة",
    type: "video",
    duration: "25 دقيقة",
    unit: "الوحدة 19"
  },
  {
    id: 5,
    title: "تحليل السوق الرقمي",
    description: "كيفية تحليل السوق الرقمي واستخدام البيانات لاتخاذ قرارات تجارية",
    type: "document",
    duration: "20 صفحة",
    unit: "الوحدة 2"
  },
  {
    id: 6,
    title: "قانون العمل والتجارة",
    description: "ملخص للقوانين الأساسية في مجال الأعمال والتجارة",
    type: "interactive",
    duration: "45 دقيقة",
    unit: "الوحدة 4"
  },
];

export default WisdomPage;
