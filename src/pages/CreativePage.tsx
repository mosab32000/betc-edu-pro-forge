
import React from 'react';
import CastleLayout from '@/components/layout/CastleLayout';
import CastleBanner from '@/components/castle/CastleBanner';
import NabataeanWorkshop from '@/components/creative/NabataeanWorkshop';
import CreativeShowcase from '@/components/creative/CreativeShowcase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Image, Sparkles } from 'lucide-react';

const CreativePage = () => {
  return (
    <CastleLayout>
      <CastleBanner
        title="ورشة الأنباط للإبداع"
        subtitle="مساحة إبداعية لتصميم النقوش والقصص النبطية بمساعدة الذكاء الاصطناعي"
        icon={<Palette className="w-8 h-8" />}
        variant="magic"
      />
      
      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="workshop" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="workshop" className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              ورشة الإبداع
            </TabsTrigger>
            <TabsTrigger value="showcase" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              معرض الإبداعات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workshop">
            <NabataeanWorkshop />
          </TabsContent>

          <TabsContent value="showcase">
            <CreativeShowcase />
          </TabsContent>
        </Tabs>
      </div>
    </CastleLayout>
  );
};

export default CreativePage;
