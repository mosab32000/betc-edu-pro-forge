
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import { BookCopy, Clock, FileBadge, MessageSquare, FileSearch, BookOpen } from "lucide-react";
import { useState } from "react";

const ArchivePage = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  const filterProjects = (category: string) => {
    setActiveFilter(category);
  };

  return (
    <CastleLayout>
      <CastleBanner
        title="الدهليز الأزرق"
        subtitle="أرشيف الدراسات والمشاريع والتغذية الراجعة العاطفية"
        icon={<BookCopy />}
        variant="gold"
      />
      
      {/* Archive Filters */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <FilterButton 
          label="الكل" 
          active={activeFilter === "all"} 
          onClick={() => filterProjects("all")}
        />
        <FilterButton 
          label="المشاريع" 
          active={activeFilter === "projects"} 
          onClick={() => filterProjects("projects")}
        />
        <FilterButton 
          label="الدراسات" 
          active={activeFilter === "studies"} 
          onClick={() => filterProjects("studies")}
        />
        <FilterButton 
          label="التغذية الراجعة" 
          active={activeFilter === "feedback"} 
          onClick={() => filterProjects("feedback")}
        />
      </div>
      
      {/* Main Content */}
      <div className="space-y-8">
        {/* Sentiment Mirror AI Section */}
        <CastleCard 
          title="مرآة المشاعر الذكية" 
          icon={<MessageSquare />}
          variant="magic"
          className="mb-6"
        >
          <p className="mb-4">تحليل عاطفي متقدم يقيس مشاعرك ويقدم تغذية راجعة تساعدك على تحسين أدائك الأكاديمي.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="p-3 bg-[hsla(var(--castle-magic)/0.1)] rounded-lg">
              <h4 className="font-bold mb-2">تحليل نبرة الكتابة</h4>
              <p className="text-sm">تحديد المشاعر والحالة النفسية من خلال أسلوب الكتابة</p>
            </div>
            <div className="p-3 bg-[hsla(var(--castle-magic)/0.1)] rounded-lg">
              <h4 className="font-bold mb-2">مؤشر الثقة والحيوية</h4>
              <p className="text-sm">قياس مستوى الثقة والحماس في المشاريع المقدمة</p>
            </div>
            <div className="p-3 bg-[hsla(var(--castle-magic)/0.1)] rounded-lg">
              <h4 className="font-bold mb-2">توصيات التحفيز</h4>
              <p className="text-sm">نصائح مخصصة لتعزيز الدافعية والإنتاجية</p>
            </div>
          </div>
          
          <div className="h-24 mt-6 bg-[hsla(var(--castle-stone)/0.1)] rounded-lg flex items-center justify-center">
            <p className="text-sm text-center opacity-70">رسم بياني للحالة العاطفية (قريباً)</p>
          </div>
        </CastleCard>
        
        {/* Archive Projects Grid */}
        <div>
          <h3 className="text-xl font-bold mb-4">المشاريع والدراسات المؤرشفة</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {archiveItems
              .filter(item => activeFilter === "all" || item.type === activeFilter)
              .map((item, index) => (
                <ArchiveItem key={index} item={item} />
              ))
            }
          </div>
        </div>
      </div>
    </CastleLayout>
  );
};

interface FilterButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterButton = ({ label, active, onClick }: FilterButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm transition-colors ${
        active 
          ? "bg-[hsl(var(--castle-gold))] text-black" 
          : "bg-[hsla(var(--castle-stone)/0.2)] text-foreground hover:bg-[hsla(var(--castle-stone)/0.3)]"
      }`}
    >
      {label}
    </button>
  );
};

interface ArchiveItemProps {
  item: {
    title: string;
    description: string;
    date: string;
    type: string;
    category: string;
  };
}

const ArchiveItem = ({ item }: ArchiveItemProps) => {
  const getIcon = () => {
    switch(item.type) {
      case "projects": return <FileBadge className="text-[hsl(var(--castle-gold))]" />;
      case "studies": return <FileSearch className="text-[hsl(var(--castle-wisdom))]" />;
      case "feedback": return <MessageSquare className="text-[hsl(var(--castle-magic))]" />;
      default: return <BookOpen className="text-[hsl(var(--castle-stone))]" />;
    }
  };

  return (
    <div className="border border-[hsla(var(--border)/0.2)] rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1">
          <h4 className="font-bold mb-1">{item.title}</h4>
          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {item.date}
            </span>
            <span className="bg-[hsla(var(--castle-stone)/0.1)] px-2 py-1 rounded-full">
              {item.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const archiveItems = [
  {
    title: "تحليل SWOT لشركة أمازون",
    description: "دراسة تحليلية شاملة لنقاط القوة والضعف والفرص والتهديدات لشركة أمازون",
    date: "2023-04-15",
    type: "projects",
    category: "تحليل الأعمال"
  },
  {
    title: "تأثير التسويق الرقمي على المبيعات",
    description: "بحث يستكشف العلاقة بين استراتيجيات التسويق الرقمي وزيادة المبيعات",
    date: "2023-03-22",
    type: "studies",
    category: "التسويق"
  },
  {
    title: "تقرير تحليل عاطفي: مشروع P3",
    description: "تحليل نبرة الكتابة والثقة في مشروع تطوير استراتيجية التسويق",
    date: "2023-05-10",
    type: "feedback",
    category: "التغذية الراجعة"
  },
  {
    title: "خطة عمل لمشروع ريادي",
    description: "خطة عمل متكاملة لمشروع ريادي في مجال التكنولوجيا الخضراء",
    date: "2023-02-18",
    type: "projects",
    category: "ريادة الأعمال"
  },
  {
    title: "دراسة جدوى لمتجر إلكتروني",
    description: "تحليل اقتصادي وتسويقي لإنشاء متجر إلكتروني للمنتجات المحلية",
    date: "2023-06-05",
    type: "studies",
    category: "الاقتصاد"
  },
  {
    title: "تقرير تحليل عاطفي: مشروع P1",
    description: "تحليل الثقة والحيوية في مشروع تحليل السوق للوحدة الأولى",
    date: "2023-07-20",
    type: "feedback",
    category: "التغذية الراجعة"
  }
];

export default ArchivePage;
