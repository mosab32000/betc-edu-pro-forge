
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import CastleButton from "@/components/castle/CastleButton";
import { Users, Calendar, Video, Clock, Check } from "lucide-react";

const HallPage = () => {
  return (
    <CastleLayout>
      <CastleBanner
        title="قاعة الأثير"
        subtitle="حضور المحاضرات الافتراضية وتسجيل الحضور"
        icon={<Users />}
        variant="gold"
      />

      <div className="space-y-6">
        <h2 className="text-xl font-bold mb-4">المحاضرات القادمة</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingLectures.map((lecture) => (
            <CastleCard 
              key={lecture.id}
              variant="stone"
              className="hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[hsla(var(--castle-gold)/0.2)] rounded-lg flex items-center justify-center">
                  <Calendar className="text-[hsl(var(--castle-gold))]" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{lecture.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{lecture.description}</p>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={16} />
                      <span>{lecture.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Video size={16} />
                      <span>{lecture.platform}</span>
                    </div>
                  </div>
                  
                  <CastleButton variant="outline" size="sm">
                    الانضمام إلى المحاضرة
                  </CastleButton>
                </div>
              </div>
            </CastleCard>
          ))}
        </div>
        
        <h2 className="text-xl font-bold my-6">المحاضرات السابقة</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pastLectures.map((lecture) => (
            <CastleCard 
              key={lecture.id}
              variant="stone"
              className="hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[hsla(var(--castle-stone)/0.3)] rounded-lg flex items-center justify-center">
                  <Video className="text-[hsl(var(--castle-stone))]" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{lecture.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{lecture.description}</p>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={16} />
                      <span>{lecture.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <Check size={16} />
                      <span>تم الحضور</span>
                    </div>
                  </div>
                  
                  <CastleButton variant="outline" size="sm">
                    مشاهدة التسجيل
                  </CastleButton>
                </div>
              </div>
            </CastleCard>
          ))}
        </div>
      </div>
    </CastleLayout>
  );
};

const upcomingLectures = [
  {
    id: 1,
    title: "استراتيجيات التسويق الرقمي",
    description: "محاضرة تفاعلية حول أحدث استراتيجيات التسويق الرقمي وتطبيقاتها",
    time: "غدًا - 10:00 صباحًا",
    platform: "Microsoft Teams",
  },
  {
    id: 2,
    title: "تحليل البيانات للأعمال",
    description: "كيفية استخدام تحليل البيانات لاتخاذ قرارات تجارية مدروسة",
    time: "الأربعاء - 12:30 ظهرًا",
    platform: "Zoom",
  },
];

const pastLectures = [
  {
    id: 1,
    title: "مقدمة في إدارة المشاريع",
    description: "أساسيات إدارة المشاريع وتطبيقاتها في بيئة الأعمال",
    date: "15 فبراير 2025",
  },
  {
    id: 2,
    title: "دراسة حالة: نجاح شركة تسلا",
    description: "تحليل شامل لنموذج أعمال شركة تسلا وعوامل نجاحها",
    date: "10 فبراير 2025",
  },
];

export default HallPage;
