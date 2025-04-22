
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import { Image, User, Heart, MessageSquare, Eye, Tag } from "lucide-react";
import { useState } from "react";

const GalleryPage = () => {
  const [filter, setFilter] = useState("all");

  const filteredProjects = galleryItems.filter(
    item => filter === "all" || item.category === filter
  );

  return (
    <CastleLayout>
      <CastleBanner
        title="معرض السحر"
        subtitle="عرض الوسائط المتعددة والمشاريع الطلابية"
        icon={<Image />}
        variant="gold"
      />

      <div className="space-y-6">
        <div className="flex overflow-x-auto pb-2 gap-2">
          <FilterButton 
            active={filter === "all"} 
            onClick={() => setFilter("all")}
          >
            الكل
          </FilterButton>
          <FilterButton 
            active={filter === "presentations"} 
            onClick={() => setFilter("presentations")}
          >
            عروض تقديمية
          </FilterButton>
          <FilterButton 
            active={filter === "infographics"} 
            onClick={() => setFilter("infographics")}
          >
            إنفوجرافيك
          </FilterButton>
          <FilterButton 
            active={filter === "projects"} 
            onClick={() => setFilter("projects")}
          >
            مشاريع
          </FilterButton>
          <FilterButton 
            active={filter === "diagrams"} 
            onClick={() => setFilter("diagrams")}
          >
            رسوم بيانية
          </FilterButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((item) => (
            <GalleryItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </CastleLayout>
  );
};

interface FilterButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const FilterButton = ({ children, active, onClick }: FilterButtonProps) => {
  return (
    <button
      className={`px-4 py-2 rounded-full whitespace-nowrap ${
        active
          ? "bg-[hsl(var(--castle-gold))] text-black"
          : "bg-[hsla(var(--castle-stone)/0.2)] text-gray-600 hover:bg-[hsla(var(--castle-stone)/0.3)]"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface GalleryItemProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  author: string;
  category: string;
  likes: number;
  comments: number;
  views: number;
  tags: string[];
}

const GalleryItem = ({ item }: { item: GalleryItemProps }) => {
  return (
    <CastleCard variant="stone" className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
          {/* Placeholder for image - in a real app, use actual image URLs */}
          <div className={`w-full h-full flex items-center justify-center ${getCategoryColor(item.category)}`}>
            <span className="text-white font-medium">
              {getCategoryIcon(item.category)}
              {getCategoryLabel(item.category)}
            </span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.description}</p>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[hsla(var(--castle-stone)/0.3)] flex items-center justify-center">
            <User size={16} className="text-gray-600" />
          </div>
          <span className="text-sm">{item.author}</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <div key={index} className="flex items-center gap-1 text-xs bg-[hsla(var(--castle-stone)/0.3)] text-gray-600 px-2 py-1 rounded-full">
              <Tag size={12} />
              <span>{tag}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-3 border-t border-[hsla(var(--border)/0.3)]">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Heart size={16} />
              {item.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare size={16} />
              {item.comments}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={16} />
              {item.views}
            </span>
          </div>
        </div>
      </div>
    </CastleCard>
  );
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "presentations":
      return "bg-[hsl(var(--castle-gold))]";
    case "infographics":
      return "bg-[hsl(var(--castle-magic))]";
    case "projects":
      return "bg-[hsl(var(--primary))]";
    case "diagrams":
      return "bg-[hsl(var(--castle-wisdom))]";
    default:
      return "bg-gray-500";
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "presentations":
      return "🎯 ";
    case "infographics":
      return "📊 ";
    case "projects":
      return "🚀 ";
    case "diagrams":
      return "📈 ";
    default:
      return "📁 ";
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case "presentations":
      return "عرض تقديمي";
    case "infographics":
      return "إنفوجرافيك";
    case "projects":
      return "مشروع";
    case "diagrams":
      return "رسم بياني";
    default:
      return "محتوى";
  }
};

const galleryItems: GalleryItemProps[] = [
  {
    id: 1,
    title: "تحليل استراتيجي لشركة آبل",
    description: "عرض تقديمي يحلل نموذج أعمال واستراتيجية شركة آبل",
    imageUrl: "/apple-analysis.jpg",
    author: "أحمد محمود",
    category: "presentations",
    likes: 45,
    comments: 12,
    views: 230,
    tags: ["استراتيجية", "آبل", "SWOT"]
  },
  {
    id: 2,
    title: "رحلة العميل في متاجر التجزئة",
    description: "إنفوجرافيك يوضح مراحل رحلة العميل في متاجر التجزئة",
    imageUrl: "/customer-journey.jpg",
    author: "سارة خالد",
    category: "infographics",
    likes: 38,
    comments: 8,
    views: 185,
    tags: ["تجزئة", "تجربة العميل", "تسويق"]
  },
  {
    id: 3,
    title: "مشروع متجر إلكتروني متكامل",
    description: "عرض لمشروع متجر إلكتروني متكامل باستخدام أحدث التقنيات",
    imageUrl: "/ecommerce-project.jpg",
    author: "محمد جمال",
    category: "projects",
    likes: 62,
    comments: 17,
    views: 310,
    tags: ["تجارة إلكترونية", "برمجة", "تصميم"]
  },
  {
    id: 4,
    title: "تحليل PESTEL لقطاع التعليم",
    description: "رسم بياني يوضح العوامل المؤثرة على قطاع التعليم وفق نموذج PESTEL",
    imageUrl: "/pestel-education.jpg",
    author: "ليلى عبدالله",
    category: "diagrams",
    likes: 29,
    comments: 6,
    views: 145,
    tags: ["PESTEL", "تعليم", "تحليل"]
  },
  {
    id: 5,
    title: "استراتيجيات التسويق الرقمي",
    description: "عرض تقديمي حول أحدث استراتيجيات التسويق الرقمي وتطبيقاتها",
    imageUrl: "/digital-marketing.jpg",
    author: "عمر فراس",
    category: "presentations",
    likes: 41,
    comments: 14,
    views: 275,
    tags: ["تسويق رقمي", "وسائل تواصل", "SEO"]
  },
  {
    id: 6,
    title: "دورة حياة المنتج",
    description: "إنفوجرافيك يشرح مراحل دورة حياة المنتج مع أمثلة واقعية",
    imageUrl: "/product-lifecycle.jpg",
    author: "هدى سعيد",
    category: "infographics",
    likes: 34,
    comments: 9,
    views: 195,
    tags: ["تطوير منتجات", "تسويق", "استراتيجية"]
  },
  {
    id: 7,
    title: "تصميم نظام محاسبي متكامل",
    description: "مشروع لتصميم نظام محاسبي متكامل لشركات الأعمال الصغيرة",
    imageUrl: "/accounting-system.jpg",
    author: "يوسف أمين",
    category: "projects",
    likes: 53,
    comments: 21,
    views: 290,
    tags: ["محاسبة", "برمجة", "أعمال صغيرة"]
  },
  {
    id: 8,
    title: "هيكل تنظيمي لشركة متوسطة",
    description: "رسم بياني يوضح الهيكل التنظيمي المثالي للشركات متوسطة الحجم",
    imageUrl: "/org-structure.jpg",
    author: "دانا كريم",
    category: "diagrams",
    likes: 32,
    comments: 7,
    views: 165,
    tags: ["هيكل تنظيمي", "إدارة", "موارد بشرية"]
  },
  {
    id: 9,
    title: "تأثير التكنولوجيا على تجارة التجزئة",
    description: "تحليل شامل لتأثير التكنولوجيا الحديثة على قطاع تجارة التجزئة",
    imageUrl: "/retail-tech.jpg",
    author: "حمزة تيسير",
    category: "presentations",
    likes: 48,
    comments: 15,
    views: 255,
    tags: ["تكنولوجيا", "تجزئة", "ابتكار"]
  }
];

export default GalleryPage;
