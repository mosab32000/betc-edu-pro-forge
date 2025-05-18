
import { useState } from 'react';
import { Brain, FileText, Award, BarChart2, CheckCircle, Circle } from 'lucide-react';
import CastleCard from '../castle/CastleCard';
import CastleButton from '../castle/CastleButton';
import { cn } from '@/lib/utils';

interface EduAnalyticaProDemoProps {
  className?: string;
}

const EduAnalyticaProDemo = ({ className }: EduAnalyticaProDemoProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<any>(null);

  // Demo evaluation criteria
  const evaluationCriteria = [
    { name: 'الفهم النظري', progress: 85, color: 'castle-magic' },
    { name: 'التحليل التقني', progress: 72, color: 'castle-wisdom' },
    { name: 'التطبيق العملي', progress: 90, color: 'castle-gold' },
    { name: 'التقييم النقدي', progress: 65, color: 'castle-stone' }
  ];

  // Demo analysis steps
  const analysisSteps = [
    'تحليل المحتوى النصي',
    'استخراج المعايير الأكاديمية',
    'مقارنة بمتطلبات BTEC',
    'تقييم مستوى الإنجاز',
    'توليد التغذية الراجعة',
    'إنشاء التقرير النهائي'
  ];

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentStep(0);
    setAnalysisComplete(false);
    setResults(null);

    // Simulate analysis steps
    let step = 0;
    const interval = setInterval(() => {
      if (step < analysisSteps.length) {
        setCurrentStep(step);
        step++;
      } else {
        clearInterval(interval);
        setIsAnalyzing(false);
        setAnalysisComplete(true);
        // Generate demo results
        setResults({
          score: 'Distinction',
          percentage: 82,
          strengths: [
            'فهم ممتاز للمفاهيم النظرية',
            'تطبيق عملي متميز للمبادئ التقنية',
            'توثيق شامل واستخدام فعال للمراجع'
          ],
          improvements: [
            'تعميق التحليل النقدي للقضايا المطروحة',
            'تطوير المقارنات مع أفضل الممارسات في المجال',
            'تنظيم أفضل للمحتوى والأفكار'
          ]
        });
      }
    }, 1200);
  };

  const resetDemo = () => {
    setAnalysisComplete(false);
    setResults(null);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <CastleCard title="محاكاة EduAnalytica Pro 3.0" variant="wisdom" icon={<Brain />}>
        <div className="text-center mb-6">
          <p className="mb-4">
            جرب محاكاة تحليلية لنظام EduAnalytica Pro - منصة التقييم المدعومة بالذكاء الاصطناعي والمصممة خصيصًا لتقييم المهام وفق معايير BTEC.
          </p>
          
          {!isAnalyzing && !analysisComplete && (
            <CastleButton variant="wisdom" onClick={startAnalysis}>
              بدء المحاكاة التجريبية
            </CastleButton>
          )}
          
          {isAnalyzing && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg">جاري تحليل الواجب...</h3>
              <div className="w-full bg-gray-100 h-2 rounded-full">
                <div 
                  className="bg-[hsl(var(--castle-wisdom))] h-full rounded-full transition-all duration-300" 
                  style={{ width: `${(currentStep / analysisSteps.length) * 100}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">{analysisSteps[currentStep]}</p>
            </div>
          )}
          
          {analysisComplete && results && (
            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-[hsla(var(--castle-gold)/0.1)] p-4 mb-2">
                  <Award className="text-[hsl(var(--castle-gold))]" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[hsl(var(--castle-gold))]">{results.score}</h3>
                <p className="text-lg">{results.percentage}%</p>
              </div>
            </div>
          )}
        </div>
        
        {analysisComplete && results && (
          <div className="space-y-6">
            <div>
              <h4 className="font-bold mb-2 flex items-center">
                <BarChart2 className="mr-2 text-[hsl(var(--castle-wisdom))]" size={20} />
                تحليل المعايير
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {evaluationCriteria.map((criterion, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">{criterion.name}</span>
                      <span className="text-sm font-bold">{criterion.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full">
                      <div 
                        className={`bg-[hsl(var(--${criterion.color}))] h-full rounded-full`} 
                        style={{ width: `${criterion.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2 flex items-center">
                  <CheckCircle className="mr-2 text-[hsl(var(--castle-gold))]" size={18} />
                  نقاط القوة
                </h4>
                <ul className="space-y-2">
                  {results.strengths.map((item: string, index: number) => (
                    <li key={index} className="text-sm flex items-start">
                      <Circle className="mr-2 text-[hsl(var(--castle-gold))]" size={8} style={{ marginTop: '0.5rem' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-2 flex items-center">
                  <FileText className="mr-2 text-[hsl(var(--castle-magic))]" size={18} />
                  اقتراحات للتحسين
                </h4>
                <ul className="space-y-2">
                  {results.improvements.map((item: string, index: number) => (
                    <li key={index} className="text-sm flex items-start">
                      <Circle className="mr-2 text-[hsl(var(--castle-magic))]" size={8} style={{ marginTop: '0.5rem' }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-3">هذا تقييم توضيحي فقط. في النظام الكامل، سيتم توفير تحليل مفصل على مستوى الفقرات مع توثيق على البلوكتشين.</p>
              <CastleButton variant="stone" onClick={resetDemo}>
                إعادة المحاكاة
              </CastleButton>
            </div>
          </div>
        )}
      </CastleCard>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CastleCard title="تقييم متعدد الأبعاد" icon={<Brain />} variant="wisdom">
          <ul className="space-y-2">
            <li className="text-sm flex items-start">
              <Circle className="mr-2 text-[hsl(var(--castle-wisdom))]" size={8} style={{ marginTop: '0.5rem' }} />
              <span>تحليل سيميائي للمحتوى العربي والإنجليزي</span>
            </li>
            <li className="text-sm flex items-start">
              <Circle className="mr-2 text-[hsl(var(--castle-wisdom))]" size={8} style={{ marginTop: '0.5rem' }} />
              <span>تقييم أخلاقي للمحتوى والاستشهادات</span>
            </li>
            <li className="text-sm flex items-start">
              <Circle className="mr-2 text-[hsl(var(--castle-wisdom))]" size={8} style={{ marginTop: '0.5rem' }} />
              <span>تحليل مقارن مع أفضل الأعمال السابقة</span>
            </li>
            <li className="text-sm flex items-start">
              <Circle className="mr-2 text-[hsl(var(--castle-wisdom))]" size={8} style={{ marginTop: '0.5rem' }} />
              <span>كشف دقيق للانتحال العلمي والأفكار المكررة</span>
            </li>
          </ul>
        </CastleCard>
        
        <CastleCard title="توثيق على البلوكتشين" icon={<Award />} variant="magic">
          <ul className="space-y-2">
            <li className="text-sm flex items-start">
              <Circle className="mr-2 text-[hsl(var(--castle-magic))]" size={8} style={{ marginTop: '0.5rem' }} />
              <span>توثيق غير قابل للتزوير على شبكة Ethereum</span>
            </li>
            <li className="text-sm flex items-start">
              <Circle className="mr-2 text-[hsl(var(--castle-magic))]" size={8} style={{ marginTop: '0.5rem' }} />
              <span>شهادات NFT تمثل الإنجازات الأكاديمية</span>
            </li>
            <li className="text-sm flex items-start">
              <Circle className="mr-2 text-[hsl(var(--castle-magic))]" size={8} style={{ marginTop: '0.5rem' }} />
              <span>سجل دائم للتقييمات والتغذية الراجعة</span>
            </li>
            <li className="text-sm flex items-start">
              <Circle className="mr-2 text-[hsl(var(--castle-magic))]" size={8} style={{ marginTop: '0.5rem' }} />
              <span>مشاركة آمنة للشهادات مع أصحاب العمل</span>
            </li>
          </ul>
        </CastleCard>
      </div>
    </div>
  );
};

export default EduAnalyticaProDemo;
