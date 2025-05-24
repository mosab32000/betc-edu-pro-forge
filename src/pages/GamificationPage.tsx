
import React from 'react';
import CastleLayout from '@/components/layout/CastleLayout';
import CastleBanner from '@/components/castle/CastleBanner';
import GamificationCenter from '@/components/gamification/GamificationCenter';
import { Trophy } from 'lucide-react';

const GamificationPage = () => {
  return (
    <CastleLayout>
      <CastleBanner
        title="مركز التحديات والألعاب"
        subtitle="نظام شامل للتحفيز والمكافآت مع توثيق الإنجازات على البلوكتشين"
        icon={<Trophy className="w-8 h-8" />}
        variant="gold"
      />
      <GamificationCenter />
    </CastleLayout>
  );
};

export default GamificationPage;
