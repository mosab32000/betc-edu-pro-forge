
import { useState } from "react";
import CastleLayout from "@/components/layout/CastleLayout";
import CastleBanner from "@/components/castle/CastleBanner";
import CastleCard from "@/components/castle/CastleCard";
import { BookCopy, Search, FileText, CalendarDays, Filter, Download, Eye } from "lucide-react";

const ArchivePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Sample archive data
  const archiveItems = [
    {
      id: 1,
      title: "تحليل الملصق التقني للوحدة الرابعة",
      type: "تقرير",
      category: "تقييمات",
      date: "2024-04-15",
      description: "تحليل شامل للملصق التقني المقدم في وحدة تصميم الشبكات مع توصيات للتحسين"
    },
    {
      id: 2,
      title: "تقرير أداء الفصل الدراسي الأول",
      type: "تحليل",
      category: "تقييمات",
      date: "2024-03-22",
      description: "نتائج وتحليلات أداء الطلاب خلال الفصل الدراسي الأول وفق معايير BTEC"
    },
    {
      id: 3,
      title: "دراسة حالة: مشروع الشبكة اللاسلكية",
      type: "دراسة",
      category: "مشاريع",
      date: "2024-02-10",
      description: "دراسة تفصيلية للمشروع النموذجي في تصميم الشبكات اللاسلكية وتنفيذها"
    },
    {
      id: 4,
      title: "ملخص التغذية الراجعة للفصل الثاني",
      type: "تغذية راجعة",
      category: "تقييمات",
      date: "2024-05-05",
      description: "ملخص للملاحظات والتوصيات التي قدمها الطلاب حول محتوى المادة وطرق التدريس"
    },
    {
      id: 5,
      title: "دليل معايير BTEC للوحدات التقنية",
      type: "دليل",
      category: "مراجع",
      date: "2024-01-15",
      description: "دليل تفصيلي يشرح معايير التقييم الخاصة بوحدات BTEC التقنية"
    },
    {
      id: 6,
      title: "مشروع تطوير تطبيقات الويب - نماذج الطلاب",
      type: "نماذج",
      category: "مشاريع",
      date: "2024-04-28",
      description: "مجموعة مختارة من مشاريع الطلاب في تطوير تطبيقات الويب مع التعليقات التقييمية"
    }
  ];

  // Filter archive items
  const filteredItems = archiveItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = [...new Set(archiveItems.map(item => item.category))];

  return (
    <CastleLayout>
      <CastleBanner
        title="الدهليز الأزرق"
        subtitle="أرشيف الدراسات والمشاريع والتغذية الراجعة"
        icon={<BookCopy />}
        variant="gold"
      />
      
      <div className="mb-8">
        {/* Search and Filter Bar */}
        <div className="bg-[hsla(var(--castle-stone)/0.1)] rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="البحث في الأرشيف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-2 pr-3 pl-10 border border-[hsl(var(--border))] rounded-md focus:outline-none focus:border-[hsl(var(--castle-gold))]"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="w-full py-2 pr-3 pl-10 border border-[hsl(var(--border))] rounded-md focus:outline-none focus:border-[hsl(var(--castle-gold))] appearance-none bg-white"
              >
                <option value="">جميع التصنيفات</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Result Count */}
            <div className="flex items-center justify-end">
              <span className="text-sm text-gray-500">
                تم العثور على {filteredItems.length} عنصر
                {selectedCategory && ` في تصنيف "${selectedCategory}"`}
              </span>
            </div>
          </div>
        </div>

        {/* Archive Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <CastleCard 
                key={item.id} 
                variant="stone" 
                className="hover:shadow-md transition-shadow"
              >
                <div className="p-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <span className="inline-block px-2 py-1 bg-[hsla(var(--castle-gold)/0.1)] text-[hsl(var(--castle-gold))] text-xs rounded-md">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="flex items-center text-gray-500">
                      <FileText size={14} className="mr-1" />
                      {item.type}
                    </span>
                    <span className="flex items-center text-gray-500">
                      <CalendarDays size={14} className="mr-1" />
                      {item.date}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <button className="text-xs px-3 py-1 bg-[hsla(var(--castle-wisdom)/0.1)] text-[hsl(var(--castle-wisdom))] rounded flex items-center">
                      <Eye size={14} className="mr-1" />
                      عرض
                    </button>
                    <button className="text-xs px-3 py-1 bg-[hsla(var(--castle-magic)/0.1)] text-[hsl(var(--castle-magic))] rounded flex items-center">
                      <Download size={14} className="mr-1" />
                      تنزيل
                    </button>
                  </div>
                </div>
              </CastleCard>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">لا توجد عناصر تطابق معايير البحث</p>
            </div>
          )}
        </div>
      </div>
    </CastleLayout>
  );
};

export default ArchivePage;
