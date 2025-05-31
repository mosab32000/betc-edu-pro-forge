
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Crown,
  Camera,
  Palette,
  Trophy,
  Bot
} from 'lucide-react';

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // التحقق من زيارة سابقة
    const hasVisited = localStorage.getItem('betc-welcome-shown');
    if (!hasVisited) {
      setIsOpen(true);
    }
  }, []);

  const steps = [
    {
      title: 'مرحباً بك في قلعة Betc الأسطورية!',
      description: 'منصة تعليمية مبتكرة تجمع بين إرث الأنباط وتقنيات المستقبل',
      icon: <Crown className="w-16 h-16 text-[hsl(var(--castle-gold))]" />,
      features: [
        'تقييم ذكي بمعايير BTEC',
        'تجارب واقع معزز تفاعلية',
        'نظام مكافآت وإنجازات',
        'مساعد ذكي شخصي'
      ]
    },
    {
      title: 'اكتشف الميزات المتقدمة',
      description: 'تقنيات حديثة لتجربة تعليمية لا مثيل لها',
      icon: <Sparkles className="w-16 h-16 text-[hsl(var(--castle-magic))]" />,
      features: [
        { icon: <Camera />, text: 'تجارب الواقع المعزز' },
        { icon: <Palette />, text: 'ورشة الإبداع النبطية' },
        { icon: <Trophy />, text: 'مركز التحديات والألعاب' },
        { icon: <Bot />, text: 'مساعد "نباطا" الذكي' }
      ]
    },
    {
      title: 'ابدأ رحلتك التعليمية',
      description: 'كل ما تحتاجه للبدء في استكشاف عالم البتراء الرقمي',
      icon: <Star className="w-16 h-16 text-[hsl(var(--castle-wisdom))]" />,
      features: [
        'انقر على "نباطا" للحصول على المساعدة',
        'تصفح المعالم المختلفة للقلعة',
        'اكمل المهام لكسب النقاط',
        'استكشف تجارب الواقع المعزز'
      ]
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    localStorage.setItem('betc-welcome-shown', 'true');
    setIsOpen(false);
  };

  const currentStepData = steps[currentStep];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            قلعة Betc - PetraVerse Edition
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-6">
          {/* أيقونة المرحلة */}
          <div className="flex justify-center">
            {currentStepData.icon}
          </div>
          
          {/* عنوان المرحلة */}
          <div>
            <h2 className="text-xl font-bold mb-2">{currentStepData.title}</h2>
            <p className="text-gray-600">{currentStepData.description}</p>
          </div>
          
          {/* الميزات */}
          <div className="space-y-3">
            {Array.isArray(currentStepData.features) && 
             typeof currentStepData.features[0] === 'string' ? (
              <div className="grid grid-cols-2 gap-3">
                {(currentStepData.features as string[]).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {(currentStepData.features as any[]).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-[hsl(var(--castle-magic))]">
                      {feature.icon}
                    </div>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* مؤشر التقدم */}
          <div className="flex justify-center gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  index === currentStep 
                    ? "bg-[hsl(var(--castle-magic))]" 
                    : "bg-gray-300"
                )}
              />
            ))}
          </div>
          
          {/* أزرار التحكم */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleClose}>
              تخطي الجولة
            </Button>
            
            <Button onClick={handleNext} className="flex items-center gap-2">
              {currentStep < steps.length - 1 ? (
                <>
                  التالي
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  ابدأ الاستكشاف
                  <Star className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
