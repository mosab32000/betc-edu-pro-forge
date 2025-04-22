
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import CastleButton from "@/components/castle/CastleButton";
import { BookMarked, Search, Tag, FileText, Book, Download, Star, BookOpen } from "lucide-react";
import { useState } from "react";

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || resource.category === category;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <CastleLayout>
      <CastleBanner
        title="مكتبة المخطوطات"
        subtitle="أرشيف رقمي للمصادر والكتب الأكاديمية"
        icon={<BookMarked />}
        variant="wisdom"
      />

      <div className="space-y-6">
        <CastleCard variant="stone">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="ابحث عن كتب، مقالات، مراجع..."
                  className="w-full pl-3 pr-10 py-2 border border-[hsl(var(--border))] rounded-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm whitespace-nowrap">تصفية حسب:</span>
              <select 
                className="border border-[hsl(var(--border))] rounded-md p-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="all">الكل</option>
                <option value="book">كتب</option>
                <option value="article">مقالات</option>
                <option value="research">أبحاث</option>
                <option value="case-study">دراسات حالة</option>
              </select>
            </div>
          </div>
        </CastleCard>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-10">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-lg text-gray-500">لم يتم العثور على نتائج مطابقة</p>
            <p className="text-sm text-gray-400">حاول استخدام كلمات بحث مختلفة أو تغيير التصنيف</p>
          </div>
        )}
      </div>
    </CastleLayout>
  );
};

interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  author: string;
  tags: string[];
  rating: number;
  downloadCount: number;
}

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const categoryIcons = {
    book: <Book className="text-[hsl(var(--castle-wisdom))]" />,
    article: <FileText className="text-[hsl(var(--castle-magic))]" />,
    research: <BookMarked className="text-[hsl(var(--primary))]" />,
    "case-study": <BookOpen className="text-[hsl(var(--castle-gold))]" />,
  };

  const categoryLabels = {
    book: "كتاب",
    article: "مقال",
    research: "بحث",
    "case-study": "دراسة حالة",
  };

  const categoryColors = {
    book: "bg-[hsla(var(--castle-wisdom)/0.1)] text-[hsl(var(--castle-wisdom))]",
    article: "bg-[hsla(var(--castle-magic)/0.1)] text-[hsl(var(--castle-magic))]",
    research: "bg-[hsla(var(--primary)/0.1)] text-[hsl(var(--primary))]",
    "case-study": "bg-[hsla(var(--castle-gold)/0.1)] text-[hsl(var(--castle-gold))]",
  };

  return (
    <CastleCard variant="stone" className="hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${categoryColors[resource.category as keyof typeof categoryColors]}`}>
            {categoryIcons[resource.category as keyof typeof categoryIcons]}
            <span>{categoryLabels[resource.category as keyof typeof categoryLabels]}</span>
          </div>
          <div className="flex items-center gap-1 text-[hsl(var(--castle-gold))]">
            <Star size={16} />
            <span className="text-sm">{resource.rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-lg">{resource.title}</h3>
        <p className="text-sm text-gray-600">{resource.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {resource.tags.map((tag, index) => (
            <div key={index} className="flex items-center gap-1 text-xs bg-[hsla(var(--castle-stone)/0.3)] text-gray-600 px-2 py-1 rounded-full">
              <Tag size={12} />
              <span>{tag}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-[hsla(var(--border)/0.3)]">
          <span className="text-sm text-gray-500">{resource.author}</span>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Download size={12} />
              {resource.downloadCount}
            </span>
            <CastleButton variant="outline" size="sm">
              تنزيل
            </CastleButton>
          </div>
        </div>
      </div>
    </CastleCard>
  );
};

const resources: Resource[] = [
  {
    id: 1,
    title: "دليل BTEC الشامل للتقييمات",
    description: "مرجع شامل لمعايير BTEC وكيفية تحقيقها في التقييمات والواجبات",
    category: "book",
    author: "Pearson Education",
    tags: ["BTEC", "تقييم", "معايير"],
    rating: 4.8,
    downloadCount: 1250,
  },
  {
    id: 2,
    title: "تحليل PESTEL: النظرية والتطبيق",
    description: "دليل عملي لإجراء تحليل PESTEL مع أمثلة واقعية من عالم الأعمال",
    category: "article",
    author: "د. أحمد محمود",
    tags: ["PESTEL", "تحليل", "استراتيجية"],
    rating: 4.5,
    downloadCount: 820,
  },
  {
    id: 3,
    title: "نظريات القيادة في بيئة الأعمال الحديثة",
    description: "مراجعة منهجية للنظريات الحديثة في القيادة وتطبيقاتها العملية",
    category: "research",
    author: "د. سمية الخطيب",
    tags: ["قيادة", "إدارة", "تنظيم"],
    rating: 4.7,
    downloadCount: 650,
  },
  {
    id: 4,
    title: "دراسة حالة: نجاح شركة أمازون",
    description: "تحليل لاستراتيجيات النمو والابتكار التي ساهمت في نجاح أمازون",
    category: "case-study",
    author: "Harvard Business Review",
    tags: ["أمازون", "تجارة إلكترونية", "ابتكار"],
    rating: 4.9,
    downloadCount: 1450,
  },
  {
    id: 5,
    title: "التسويق الرقمي في عصر البيانات",
    description: "كيفية الاستفادة من البيانات الضخمة في تحسين استراتيجيات التسويق",
    category: "book",
    author: "د. محمد عبدالله",
    tags: ["تسويق رقمي", "بيانات", "تحليلات"],
    rating: 4.6,
    downloadCount: 980,
  },
  {
    id: 6,
    title: "إدارة سلسلة التوريد المستدامة",
    description: "استراتيجيات تطوير سلاسل توريد صديقة للبيئة ومستدامة",
    category: "article",
    author: "م. خالد العمري",
    tags: ["سلسلة التوريد", "استدامة", "لوجستيات"],
    rating: 4.4,
    downloadCount: 560,
  },
  {
    id: 7,
    title: "تأثير الذكاء الاصطناعي على قطاع التجزئة",
    description: "بحث حول كيفية تغيير الذكاء الاصطناعي لتجارة التجزئة التقليدية",
    category: "research",
    author: "د. ليلى الحسن",
    tags: ["ذكاء اصطناعي", "تجزئة", "تكنولوجيا"],
    rating: 4.7,
    downloadCount: 720,
  },
  {
    id: 8,
    title: "دراسة حالة: تحول شركة مايكروسوفت",
    description: "تحليل استراتيجية التحول الرقمي لشركة مايكروسوفت تحت قيادة ساتيا ناديلا",
    category: "case-study",
    author: "MIT Technology Review",
    tags: ["مايكروسوفت", "تحول رقمي", "قيادة"],
    rating: 4.8,
    downloadCount: 890,
  },
  {
    id: 9,
    title: "مدخل إلى التمويل للأعمال",
    description: "مقدمة شاملة لأساسيات التمويل وتطبيقاتها في إدارة الأعمال",
    category: "book",
    author: "د. كريم الفياض",
    tags: ["تمويل", "استثمار", "محاسبة"],
    rating: 4.5,
    downloadCount: 1120,
  },
];

export default LibraryPage;
