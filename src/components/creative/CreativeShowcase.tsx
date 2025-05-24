
import React, { useState } from 'react';
import { Star, Heart, Eye, Share2, Download, Filter, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CreativeWork {
  id: string;
  title: string;
  creator: string;
  type: 'inscription' | 'story' | 'design';
  description: string;
  preview: string;
  likes: number;
  views: number;
  createdAt: Date;
  featured: boolean;
  tags: string[];
}

const CreativeShowcase = () => {
  const [filter, setFilter] = useState<'all' | 'inscription' | 'story' | 'design'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const creativeWorks: CreativeWork[] = [
    {
      id: '1',
      title: 'نقش البتراء الذهبي',
      creator: 'أحمد النبطي',
      type: 'inscription',
      description: 'نقش مستوحى من النقوش الملكية في البتراء',
      preview: '𐢀𐢁𐢂 البتراء الأزلية 𐢃𐢄𐢅',
      likes: 42,
      views: 156,
      createdAt: new Date(Date.now() - 86400000),
      featured: true,
      tags: ['نبطي', 'ملكي', 'تراث']
    },
    {
      id: '2',
      title: 'قصة التاجر والقافلة',
      creator: 'فاطمة الكاتبة',
      type: 'story',
      description: 'قصة تفاعلية عن تاجر نبطي وقافلته عبر طريق البخور',
      preview: 'في زمنٍ غابر، عندما كانت القوافل تخترق الصحراء الذهبية...',
      likes: 67,
      views: 234,
      createdAt: new Date(Date.now() - 172800000),
      featured: true,
      tags: ['قصة', 'تجارة', 'مغامرة']
    },
    {
      id: '3',
      title: 'تصميم معبد الأسود المجنحة',
      creator: 'محمد المعماري',
      type: 'design',
      description: 'تصميم معاصر مستوحى من عمارة البتراء',
      preview: '🏛️ معبد بزخارف نبطية وأعمدة منحوتة',
      likes: 38,
      views: 189,
      createdAt: new Date(Date.now() - 259200000),
      featured: false,
      tags: ['عمارة', 'تصميم', 'معبد']
    },
    {
      id: '4',
      title: 'نقش الحب الأبدي',
      creator: 'سارة الشاعرة',
      type: 'inscription',
      description: 'نقش رومانسي بالخط النبطي',
      preview: '𐢆𐢇𐢈 حبٌ أزلي كالصخر الوردي 𐢉𐢊𐢋',
      likes: 89,
      views: 312,
      createdAt: new Date(Date.now() - 345600000),
      featured: false,
      tags: ['حب', 'شعر', 'رومانسي']
    }
  ];

  const filteredWorks = creativeWorks.filter(work => {
    const matchesFilter = filter === 'all' || work.type === filter;
    const matchesSearch = work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         work.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         work.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inscription': return '📜';
      case 'story': return '📚';
      case 'design': return '🎨';
      default: return '📁';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'inscription': return 'نقش';
      case 'story': return 'قصة';
      case 'design': return 'تصميم';
      default: return 'عمل';
    }
  };

  return (
    <div className="space-y-6">
      {/* أدوات البحث والتصفية */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="ابحث في الأعمال الإبداعية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'inscription', label: 'النقوش' },
            { id: 'story', label: 'القصص' },
            { id: 'design', label: 'التصاميم' }
          ].map((option) => (
            <Button
              key={option.id}
              variant={filter === option.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(option.id as any)}
              className={cn(
                filter === option.id && "bg-[hsl(var(--castle-magic))]"
              )}
            >
              <Filter className="w-4 h-4 mr-2" />
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* الأعمال المميزة */}
      {filter === 'all' && (
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-[hsl(var(--castle-gold))]" />
            الأعمال المميزة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creativeWorks.filter(work => work.featured).map((work) => (
              <Card key={work.id} className="petra-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-[hsl(var(--castle-gold))/0.1] to-[hsl(var(--castle-magic))/0.1] p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl">{getTypeIcon(work.type)}</div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{work.title}</h4>
                        <p className="text-sm text-gray-600">بواسطة {work.creator}</p>
                      </div>
                      <Badge className="bg-[hsl(var(--castle-gold))] text-white">
                        ⭐ مميز
                      </Badge>
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 mb-4 min-h-20 flex items-center justify-center text-center">
                      <div className="text-sm">
                        {work.preview.length > 100 
                          ? `${work.preview.substring(0, 100)}...` 
                          : work.preview
                        }
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4">{work.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{work.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{work.views}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          عرض
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4 mr-1" />
                          مشاركة
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* جميع الأعمال */}
      <div>
        <h3 className="text-xl font-bold mb-4">
          {filter === 'all' ? 'جميع الأعمال' : `${getTypeName(filter === 'inscription' ? 'inscription' : filter === 'story' ? 'story' : 'design')}س`}
          <span className="text-sm font-normal text-gray-500 mr-2">
            ({filteredWorks.length} عمل)
          </span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorks.map((work) => (
            <Card key={work.id} className="petra-card hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-2xl">{getTypeIcon(work.type)}</div>
                  <div className="flex-1">
                    <h4 className="font-bold">{work.title}</h4>
                    <p className="text-xs text-gray-600">بواسطة {work.creator}</p>
                  </div>
                  {work.featured && (
                    <Badge className="bg-[hsl(var(--castle-gold))] text-white text-xs">
                      ⭐
                    </Badge>
                  )}
                </div>
                
                <div className="bg-gray-50 rounded p-3 mb-3 text-sm min-h-16 flex items-center">
                  {work.preview.length > 60 
                    ? `${work.preview.substring(0, 60)}...` 
                    : work.preview
                  }
                </div>
                
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{work.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {work.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{work.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{work.views}</span>
                    </div>
                  </div>
                  <span>{work.createdAt.toLocaleDateString('ar-SA')}</span>
                </div>
                
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="w-3 h-3 mr-1" />
                    عرض
                  </Button>
                  <Button size="sm" variant="outline">
                    <Heart className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredWorks.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h4 className="text-lg font-bold mb-2">لا توجد أعمال</h4>
            <p className="text-gray-600">لم نجد أعمال تطابق معايير البحث والتصفية.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeShowcase;
