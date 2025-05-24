
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Volume2, VolumeX, Type, MousePointer, Keyboard, Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface AccessibilitySettings {
  screenReader: boolean;
  highContrast: boolean;
  fontSize: number;
  audioDescriptions: boolean;
  voiceControl: boolean;
  keyboardNavigation: boolean;
  reducedMotion: boolean;
  subtitles: boolean;
  signLanguage: boolean;
}

const AccessibilityManager = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>({
    screenReader: false,
    highContrast: false,
    fontSize: 16,
    audioDescriptions: false,
    voiceControl: false,
    keyboardNavigation: true,
    reducedMotion: false,
    subtitles: false,
    signLanguage: false
  });

  const [isListening, setIsListening] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<'default' | 'visual' | 'hearing' | 'motor' | 'cognitive'>('default');

  // تطبيق الإعدادات على الصفحة
  useEffect(() => {
    const root = document.documentElement;
    
    // تطبيق حجم الخط
    root.style.fontSize = `${settings.fontSize}px`;
    
    // تطبيق وضع التباين العالي
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    // تطبيق تقليل الحركة
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }, [settings]);

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const applyProfile = (profile: typeof currentProfile) => {
    setCurrentProfile(profile);
    
    switch (profile) {
      case 'visual':
        setSettings({
          ...settings,
          screenReader: true,
          highContrast: true,
          fontSize: 20,
          audioDescriptions: true,
          voiceControl: true
        });
        break;
      case 'hearing':
        setSettings({
          ...settings,
          subtitles: true,
          signLanguage: true,
          reducedMotion: true
        });
        break;
      case 'motor':
        setSettings({
          ...settings,
          voiceControl: true,
          keyboardNavigation: true,
          fontSize: 18
        });
        break;
      case 'cognitive':
        setSettings({
          ...settings,
          reducedMotion: true,
          fontSize: 18,
          highContrast: true
        });
        break;
      default:
        // الإعدادات الافتراضية
        break;
    }
  };

  const startVoiceControl = () => {
    setIsListening(true);
    // محاكاة التحكم الصوتي
    setTimeout(() => {
      setIsListening(false);
    }, 5000);
  };

  const profiles = [
    { id: 'default', name: 'الافتراضي', icon: '👤', description: 'الإعدادات العادية' },
    { id: 'visual', name: 'ضعف البصر', icon: '👁️', description: 'قارئ شاشة وتباين عالي' },
    { id: 'hearing', name: 'ضعف السمع', icon: '👂', description: 'ترجمة نصية ولغة إشارة' },
    { id: 'motor', name: 'صعوبات حركية', icon: '🤚', description: 'تحكم صوتي ولوحة مفاتيح' },
    { id: 'cognitive', name: 'صعوبات تعلم', icon: '🧠', description: 'واجهة مبسطة وحركة مقللة' }
  ];

  return (
    <div className="space-y-6 p-6 petra-content">
      {/* رأس مدير إمكانية الوصول */}
      <div className="petra-panel p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="hero-badge bg-gradient-to-r from-purple-500 to-pink-500">
            <Eye className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold petra-title">مدير إمكانية الوصول</h1>
            <p className="text-sm petra-subtitle">تخصيص التجربة لجميع المستخدمين</p>
          </div>
        </div>

        {/* ملفات الوصول السريع */}
        <h2 className="text-lg font-bold mb-4">ملفات التعريف السريعة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
          {profiles.map((profile) => (
            <Card 
              key={profile.id}
              className={cn("petra-card cursor-pointer transition-all hover:scale-105", {
                'ring-2 ring-[hsl(var(--castle-magic))]': currentProfile === profile.id
              })}
              onClick={() => applyProfile(profile.id as any)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{profile.icon}</div>
                <h3 className="font-medium text-sm">{profile.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{profile.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* إعدادات مرئية */}
      <div className="petra-panel p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5 text-[hsl(var(--castle-magic))]" />
          الإعدادات المرئية
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">قارئ الشاشة</label>
                <p className="text-sm text-gray-500">تفعيل الوصف الصوتي للعناصر</p>
              </div>
              <Switch 
                checked={settings.screenReader}
                onCheckedChange={(checked) => updateSetting('screenReader', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">وضع التباين العالي</label>
                <p className="text-sm text-gray-500">ألوان أكثر وضوحاً للنص والخلفية</p>
              </div>
              <Switch 
                checked={settings.highContrast}
                onCheckedChange={(checked) => updateSetting('highContrast', checked)}
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium flex items-center gap-2">
                <Type className="w-4 h-4" />
                حجم الخط: {settings.fontSize}px
              </label>
              <Slider
                value={[settings.fontSize]}
                onValueChange={([value]) => updateSetting('fontSize', value)}
                min={12}
                max={24}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">تقليل الحركة</label>
                <p className="text-sm text-gray-500">تقليل الرسوم المتحركة والتأثيرات</p>
              </div>
              <Switch 
                checked={settings.reducedMotion}
                onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">الأوصاف الصوتية</label>
                <p className="text-sm text-gray-500">وصف صوتي للمحتوى المرئي</p>
              </div>
              <Switch 
                checked={settings.audioDescriptions}
                onCheckedChange={(checked) => updateSetting('audioDescriptions', checked)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* إعدادات صوتية */}
      <div className="petra-panel p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-[hsl(var(--castle-fire))]" />
          الإعدادات الصوتية
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">الترجمة النصية</label>
                <p className="text-sm text-gray-500">عرض نص للمحتوى الصوتي</p>
              </div>
              <Switch 
                checked={settings.subtitles}
                onCheckedChange={(checked) => updateSetting('subtitles', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">لغة الإشارة الأردنية</label>
                <p className="text-sm text-gray-500">مترجم لغة إشارة للمحتوى</p>
              </div>
              <Switch 
                checked={settings.signLanguage}
                onCheckedChange={(checked) => updateSetting('signLanguage', checked)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">التحكم الصوتي</label>
                <p className="text-sm text-gray-500">التنقل باستخدام الأوامر الصوتية</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={settings.voiceControl}
                  onCheckedChange={(checked) => updateSetting('voiceControl', checked)}
                />
                {settings.voiceControl && (
                  <Button 
                    size="sm"
                    onClick={startVoiceControl}
                    disabled={isListening}
                    className="bg-[hsl(var(--castle-fire))]"
                  >
                    {isListening ? (
                      <>
                        <Mic className="w-4 h-4 mr-1 animate-pulse" />
                        استمع...
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-1" />
                        ابدأ
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* إعدادات التنقل */}
      <div className="petra-panel p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-[hsl(var(--castle-wisdom))]" />
          إعدادات التنقل
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium">التنقل بلوحة المفاتيح</label>
              <p className="text-sm text-gray-500">تفعيل التنقل الكامل باستخدام لوحة المفاتيح</p>
            </div>
            <Switch 
              checked={settings.keyboardNavigation}
              onCheckedChange={(checked) => updateSetting('keyboardNavigation', checked)}
            />
          </div>

          {settings.keyboardNavigation && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium mb-2">اختصارات لوحة المفاتيح</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div><kbd className="bg-gray-200 px-2 py-1 rounded">Tab</kbd> التنقل للأمام</div>
                <div><kbd className="bg-gray-200 px-2 py-1 rounded">Shift+Tab</kbd> التنقل للخلف</div>
                <div><kbd className="bg-gray-200 px-2 py-1 rounded">Enter</kbd> تفعيل العنصر</div>
                <div><kbd className="bg-gray-200 px-2 py-1 rounded">Esc</kbd> إغلاق النوافذ</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* معلومات إضافية */}
      <div className="petra-panel p-6">
        <h2 className="text-xl font-bold mb-4">موارد ومساعدة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="petra-card">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">🎯 دليل إمكانية الوصول</h3>
              <p className="text-sm text-gray-600">تعلم كيفية استخدام ميزات إمكانية الوصول</p>
              <Button variant="outline" size="sm" className="mt-2">عرض الدليل</Button>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">📞 الدعم الفني</h3>
              <p className="text-sm text-gray-600">احصل على مساعدة متخصصة</p>
              <Button variant="outline" size="sm" className="mt-2">تواصل معنا</Button>
            </CardContent>
          </Card>

          <Card className="petra-card">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">⚙️ تصدير الإعدادات</h3>
              <p className="text-sm text-gray-600">احفظ إعداداتك واستوردها على أجهزة أخرى</p>
              <Button variant="outline" size="sm" className="mt-2">تصدير</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityManager;
