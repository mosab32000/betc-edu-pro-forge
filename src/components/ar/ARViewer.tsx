
import React, { useState, useEffect } from 'react';
import { Camera, Scan, Eye, RotateCcw, ZoomIn, Download, Share2, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ARExperience {
  id: string;
  title: string;
  description: string;
  type: 'monument' | 'artifact' | 'scene';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  thumbnail: string;
  isAvailable: boolean;
}

const ARViewer = () => {
  const [isARActive, setIsARActive] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<string | null>(null);
  const [deviceSupported, setDeviceSupported] = useState(true);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  const experiences: ARExperience[] = [
    {
      id: '1',
      title: 'الخزنة ثلاثية الأبعاد',
      description: 'استكشف الخزنة النبطية في بيئة الواقع المعزز',
      type: 'monument',
      difficulty: 'beginner',
      duration: '5-10 دقائق',
      thumbnail: '🏛️',
      isAvailable: true
    },
    {
      id: '2',
      title: 'أدوات التجارة النبطية',
      description: 'تفاعل مع الأدوات والقطع الأثرية النبطية',
      type: 'artifact',
      difficulty: 'intermediate',
      duration: '10-15 دقيقة',
      thumbnail: '🏺',
      isAvailable: true
    },
    {
      id: '3',
      title: 'قافلة طريق البخور',
      description: 'عش تجربة القوافل التجارية عبر الصحراء',
      type: 'scene',
      difficulty: 'advanced',
      duration: '15-20 دقيقة',
      thumbnail: '🐪',
      isAvailable: false
    }
  ];

  useEffect(() => {
    // فحص دعم الجهاز للواقع المعزز
    const checkARSupport = async () => {
      if ('xr' in navigator) {
        try {
          const isSupported = await (navigator as any).xr.isSessionSupported('immersive-ar');
          setDeviceSupported(isSupported);
        } catch (error) {
          setDeviceSupported(false);
        }
      } else {
        setDeviceSupported(false);
      }
    };

    checkARSupport();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermission('granted');
      stream.getTracks().forEach(track => track.stop());
    } catch (error) {
      setCameraPermission('denied');
    }
  };

  const startARExperience = async (experienceId: string) => {
    if (cameraPermission !== 'granted') {
      await requestCameraPermission();
    }

    if (cameraPermission === 'granted') {
      setCurrentExperience(experienceId);
      setIsARActive(true);
    }
  };

  const stopARExperience = () => {
    setIsARActive(false);
    setCurrentExperience(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (!deviceSupported) {
    return (
      <div className="space-y-6 p-6 petra-content">
        <div className="petra-panel p-6 text-center">
          <div className="hero-badge bg-gradient-to-r from-[hsl(var(--castle-magic))] to-[hsl(var(--castle-wisdom))] mx-auto mb-4">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold petra-title mb-4">تجارب الواقع المعزز</h1>
          <div className="max-w-md mx-auto">
            <p className="text-gray-600 mb-4">
              عذراً، جهازك لا يدعم تقنية الواقع المعزز حالياً.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
              <h4 className="font-bold mb-2">متطلبات النظام:</h4>
              <ul className="text-right list-disc list-inside space-y-1">
                <li>متصفح حديث يدعم WebXR</li>
                <li>جهاز مزود بكاميرا</li>
                <li>نظام Android 7.0+ أو iOS 11.0+</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isARActive && currentExperience) {
    const experience = experiences.find(e => e.id === currentExperience);
    
    return (
      <div className="fixed inset-0 bg-black z-50">
        {/* واجهة الواقع المعزز */}
        <div className="relative w-full h-full">
          {/* محاكاة عرض الكاميرا */}
          <div className="w-full h-full bg-gradient-to-br from-amber-900/20 to-orange-800/20 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">{experience?.thumbnail}</div>
              <h2 className="text-2xl font-bold mb-2">{experience?.title}</h2>
              <p className="text-lg opacity-80">تجربة الواقع المعزز نشطة</p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-center gap-2 text-sm opacity-70">
                  <Scan className="w-4 h-4 animate-pulse" />
                  <span>يتم تتبع البيئة المحيطة...</span>
                </div>
              </div>
            </div>
          </div>

          {/* أدوات التحكم */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <Button
              onClick={stopARExperience}
              variant="destructive"
              size="sm"
            >
              إنهاء التجربة
            </Button>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-white/20 border-white/30">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="bg-white/20 border-white/30">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* معلومات التجربة */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
              <h3 className="font-bold mb-1">{experience?.title}</h3>
              <p className="text-sm opacity-80 mb-3">{experience?.description}</p>
              
              <div className="flex gap-2">
                <Button size="sm" className="bg-[hsl(var(--castle-magic))]">
                  <RotateCcw className="w-4 h-4 mr-1" />
                  إعادة تعيين
                </Button>
                <Button size="sm" variant="outline" className="bg-white/20 border-white/30">
                  <ZoomIn className="w-4 h-4 mr-1" />
                  تكبير
                </Button>
                <Button size="sm" variant="outline" className="bg-white/20 border-white/30">
                  <Share2 className="w-4 h-4 mr-1" />
                  مشاركة
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 petra-content">
      {/* رأس تجارب الواقع المعزز */}
      <div className="petra-panel p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="hero-badge bg-gradient-to-r from-[hsl(var(--castle-magic))] to-[hsl(var(--castle-wisdom))]">
            <Eye className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold petra-title">تجارب الواقع المعزز</h1>
            <p className="petra-subtitle">استكشف البتراء في بعد جديد</p>
          </div>
        </div>

        {/* معلومات الجهاز */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="petra-card">
            <CardContent className="p-4 text-center">
              <div className={cn(
                "w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center",
                deviceSupported ? "bg-green-100" : "bg-red-100"
              )}>
                <Camera className={cn(
                  "w-6 h-6",
                  deviceSupported ? "text-green-600" : "text-red-600"
                )} />
              </div>
              <div className="font-medium">دعم الجهاز</div>
              <div className={cn(
                "text-sm",
                deviceSupported ? "text-green-600" : "text-red-600"
              )}>
                {deviceSupported ? "مدعوم" : "غير مدعوم"}
              </div>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4 text-center">
              <div className={cn(
                "w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center",
                cameraPermission === 'granted' ? "bg-green-100" : "bg-yellow-100"
              )}>
                <Scan className={cn(
                  "w-6 h-6",
                  cameraPermission === 'granted' ? "text-green-600" : "text-yellow-600"
                )} />
              </div>
              <div className="font-medium">إذن الكاميرا</div>
              <div className={cn(
                "text-sm",
                cameraPermission === 'granted' ? "text-green-600" : "text-yellow-600"
              )}>
                {cameraPermission === 'granted' ? "ممنوح" : 
                 cameraPermission === 'denied' ? "مرفوض" : "مطلوب"}
              </div>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center bg-blue-100">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div className="font-medium">التجارب المتاحة</div>
              <div className="text-sm text-blue-600">
                {experiences.filter(e => e.isAvailable).length} من {experiences.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* قائمة التجارب */}
        <div>
          <h3 className="text-lg font-bold mb-4">التجارب المتاحة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {experiences.map((experience) => (
              <Card 
                key={experience.id} 
                className={cn(
                  "petra-card transition-all",
                  experience.isAvailable ? "hover:shadow-lg cursor-pointer" : "opacity-60"
                )}
              >
                <CardContent className="p-4">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{experience.thumbnail}</div>
                    <h4 className="font-bold text-lg mb-1">{experience.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{experience.description}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-center gap-2">
                      <Badge className={getDifficultyColor(experience.difficulty)}>
                        {experience.difficulty === 'beginner' ? 'مبتدئ' :
                         experience.difficulty === 'intermediate' ? 'متوسط' : 'متقدم'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {experience.duration}
                      </Badge>
                    </div>

                    <Button
                      onClick={() => experience.isAvailable && startARExperience(experience.id)}
                      disabled={!experience.isAvailable || cameraPermission === 'denied'}
                      className="w-full bg-[hsl(var(--castle-magic))] hover:bg-[hsl(var(--castle-magic))/0.9]"
                    >
                      {experience.isAvailable ? (
                        <>
                          <Camera className="w-4 h-4 mr-2" />
                          ابدأ التجربة
                        </>
                      ) : (
                        'قريباً'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <h4 className="font-bold mb-3">نصائح لتجربة أفضل</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">🔆 الإضاءة</h5>
              <p>تأكد من وجود إضاءة جيدة في المكان</p>
            </div>
            <div>
              <h5 className="font-medium mb-2">📱 ثبات الجهاز</h5>
              <p>امسك الجهاز بثبات لتجربة أفضل</p>
            </div>
            <div>
              <h5 className="font-medium mb-2">🌐 الاتصال</h5>
              <p>تأكد من اتصال إنترنت مستقر</p>
            </div>
            <div>
              <h5 className="font-medium mb-2">🔋 البطارية</h5>
              <p>شحن الجهاز بنسبة 50% على الأقل</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARViewer;
