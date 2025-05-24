
import React from 'react';
import CastleLayout from '@/components/layout/CastleLayout';
import CastleBanner from '@/components/castle/CastleBanner';
import ARViewer from '@/components/ar/ARViewer';
import { Camera } from 'lucide-react';

const ARExperiencePage = () => {
  return (
    <CastleLayout>
      <CastleBanner
        title="تجارب الواقع المعزز"
        subtitle="استكشف البتراء والحضارة النبطية من خلال تقنيات الواقع المعزز التفاعلية"
        icon={<Camera className="w-8 h-8" />}
        variant="wisdom"
      />
      <ARViewer />
    </CastleLayout>
  );
};

export default ARExperiencePage;
