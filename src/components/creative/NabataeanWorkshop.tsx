
import React, { useState } from 'react';
import { Palette, Sparkles, Camera, Download, Share2, Wand2, FileImage, Type, Brush } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface CreativeProject {
  id: string;
  title: string;
  type: 'inscription' | 'story' | 'design';
  description: string;
  content: string;
  createdAt: Date;
  likes: number;
  isPublic: boolean;
}

const NabataeanWorkshop = () => {
  const [activeTab, setActiveTab] = useState<'create' | 'gallery' | 'templates'>('create');
  const [selectedTool, setSelectedTool] = useState<'inscription' | 'story' | 'design'>('inscription');
  const [currentProject, setCurrentProject] = useState<Partial<CreativeProject>>({
    title: '',
    description: '',
    content: '',
    type: 'inscription'
  });

  const [projects] = useState<CreativeProject[]>([
    {
      id: '1',
      title: 'النقش النبطي الأول',
      type: 'inscription',
      description: 'تصميم نقش مستوحى من البتراء',
      content: '𐢀𐢁𐢂𐢃𐢄𐢅',
      createdAt: new Date(Date.now() - 86400000),
      likes: 15,
      isPublic: true
    },
    {
      id: '2',
      title: 'قصة طريق البخور',
      type: 'story',
      description: 'قصة تفاعلية عن التجارة النبطية',
      content: 'في زمنٍ غابر، كانت قوافل البخور تمر عبر البتراء...',
      createdAt: new Date(Date.now() - 172800000),
      likes: 23,
      isPublic: true
    }
  ]);

  const tools = [
    {
      id: 'inscription',
      name: 'مولد النقوش النبطية',
      icon: <Type className="w-6 h-6" />,
      description: 'أنشئ نقوش نبطية أصيلة بمساعدة الذكاء الاصطناعي'
    },
    {
      id: 'story',
      name: 'حكواتي البتراء',
      icon: <Sparkles className="w-6 h-6" />,
      description: 'اكتب قصص تفاعلية مستوحاة من التاريخ النبطي'
    },
    {
      id: 'design',
      name: 'رسام المعابد',
      icon: <Brush className="w-6 h-6" />,
      description: 'صمم أشكال معمارية وزخارف نبطية'
    }
  ];

  const generateContent = () => {
    const templates = {
      inscription: ['𐢀𐢁𐢂𐢃𐢄', '𐢅𐢆𐢇𐢈𐢉', '𐢊𐢋𐢌𐢍𐢎'],
      story: [
        'في قلب الصحراء الأردنية، حيث تتراقص الرمال مع أشعة الشمس...',
        'كان التجار الأنباط يسلكون طرقاً خفية عبر الوديان الوردية...',
        'في زمن الملك الحارث الرابع، ازدهرت البتراء كما لم تزدهر من قبل...'
      ],
      design: ['تصميم واجهة معبد', 'زخرفة نبطية هندسية', 'عمود أيوني نبطي']
    };
    
    const content = templates[selectedTool][Math.floor(Math.random() * templates[selectedTool].length)];
    setCurrentProject(prev => ({ ...prev, content }));
  };

  const TabButton = ({ id, label, icon }: { id: string; label: string; icon: React.ReactNode }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
        activeTab === id
          ? "bg-[hsl(var(--castle-magic))] text-white"
          : "bg-gray-100 hover:bg-gray-200"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="space-y-6 p-6 petra-content">
      {/* رأس الورشة */}
      <div className="petra-panel p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="hero-badge bg-gradient-to-r from-[hsl(var(--castle-magic))] to-[hsl(var(--castle-gold))]">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold petra-title">ورشة الأنباط للإبداع</h1>
            <p className="petra-subtitle">مساحة إبداعية لتصميم النقوش والقصص النبطية</p>
          </div>
        </div>

        {/* التبويبات */}
        <div className="flex gap-2 mb-6">
          <TabButton id="create" label="إنشاء" icon={<Wand2 className="w-4 h-4" />} />
          <TabButton id="gallery" label="معرض الإبداعات" icon={<FileImage className="w-4 h-4" />} />
          <TabButton id="templates" label="القوالب" icon={<Sparkles className="w-4 h-4" />} />
        </div>

        {/* محتوى التبويبات */}
        {activeTab === 'create' && (
          <div className="space-y-6">
            {/* اختيار الأداة */}
            <div>
              <h3 className="text-lg font-bold mb-4">اختر أداة الإبداع</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tools.map((tool) => (
                  <Card 
                    key={tool.id}
                    className={cn(
                      "cursor-pointer transition-all petra-card",
                      selectedTool === tool.id ? "ring-2 ring-[hsl(var(--castle-magic))]" : ""
                    )}
                    onClick={() => setSelectedTool(tool.id as any)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-[hsl(var(--castle-magic))]">
                          {tool.icon}
                        </div>
                        <h4 className="font-bold">{tool.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* منطقة الإنشاء */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">عنوان المشروع</Label>
                  <Input
                    id="title"
                    value={currentProject.title}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="أدخل عنوان مشروعك الإبداعي"
                    className="petra-input"
                  />
                </div>

                <div>
                  <Label htmlFor="description">الوصف</Label>
                  <Input
                    id="description"
                    value={currentProject.description}
                    onChange={(e) => setCurrentProject(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="وصف مختصر للمشروع"
                    className="petra-input"
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={generateContent}
                    className="bg-[hsl(var(--castle-wisdom))] hover:bg-[hsl(var(--castle-wisdom))/0.9]"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    إنشاء بالذكاء الاصطناعي
                  </Button>
                  
                  <Button variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    رفع صورة
                  </Button>
                </div>
              </div>

              <div className="petra-panel p-4">
                <h4 className="font-bold mb-3">منطقة الإبداع</h4>
                <div className="bg-gray-50 rounded-lg p-4 min-h-40 border-2 border-dashed border-gray-300">
                  {currentProject.content ? (
                    <div className="text-center">
                      {selectedTool === 'inscription' && (
                        <div className="text-2xl font-bold text-[hsl(var(--castle-gold))]">
                          {currentProject.content}
                        </div>
                      )}
                      {selectedTool === 'story' && (
                        <div className="text-right leading-relaxed">
                          {currentProject.content}
                        </div>
                      )}
                      {selectedTool === 'design' && (
                        <div className="text-center text-[hsl(var(--castle-magic))]">
                          🏛️ {currentProject.content}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      ستظهر إبداعاتك هنا
                    </div>
                  )}
                </div>

                <div className="flex justify-between mt-4">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    تحميل
                  </Button>
                  <Button size="sm" className="bg-[hsl(var(--castle-magic))]">
                    <Share2 className="w-4 h-4 mr-1" />
                    مشاركة
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <h3 className="text-lg font-bold mb-4">معرض الإبداعات</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="petra-card">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="petra-badge">
                        {project.type === 'inscription' ? '📜' : project.type === 'story' ? '📚' : '🎨'}
                      </Badge>
                      <h4 className="font-bold">{project.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{project.description}</p>
                    <div className="bg-gray-50 rounded p-2 mb-3 text-sm">
                      {project.content.length > 50 
                        ? `${project.content.substring(0, 50)}...` 
                        : project.content
                      }
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>❤️ {project.likes}</span>
                      <span>{project.createdAt.toLocaleDateString('ar-SA')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'templates' && (
          <div>
            <h3 className="text-lg font-bold mb-4">القوالب الجاهزة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'نقش ترحيبي', type: 'inscription', preview: '𐢀𐢁𐢂 مرحباً' },
                { name: 'قصة قصيرة', type: 'story', preview: 'كان يا ما كان...' },
                { name: 'تصميم معبد', type: 'design', preview: '🏛️ معبد البتراء' }
              ].map((template, index) => (
                <Card key={index} className="petra-card cursor-pointer hover:shadow-lg">
                  <CardContent className="p-4">
                    <h4 className="font-bold mb-2">{template.name}</h4>
                    <div className="bg-gray-50 rounded p-2 text-sm mb-3">
                      {template.preview}
                    </div>
                    <Button size="sm" className="w-full bg-[hsl(var(--castle-wisdom))]">
                      استخدام القالب
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NabataeanWorkshop;
