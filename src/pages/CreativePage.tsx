
import React from 'react';
import CastleLayout from '@/components/layout/CastleLayout';
import CastleBanner from '@/components/castle/CastleBanner';
import NabataeanWorkshop from '@/components/creative/NabataeanWorkshop';
import { Palette } from 'lucide-react';

const CreativePage = () => {
  return (
    <CastleLayout>
      <CastleBanner
        title="ورشة الأنباط للإبداع"
        subtitle="مساحة إبداعية لتصميم النقوش والقصص النبطية"
        icon={<Palette className="w-8 h-8" />}
        variant="magic"
      />
      <NabataeanWorkshop />
    </CastleLayout>
  );
};

export default CreativePage;
