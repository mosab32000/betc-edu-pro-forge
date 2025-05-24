
import React from 'react';
import CastleSidebar from './CastleSidebar';
import Nabata from '@/components/ai/Nabata';
import AdvancedNabata from '@/components/advanced/AdvancedNabata';

interface CastleLayoutProps {
  children: React.ReactNode;
}

const CastleLayout = ({ children }: CastleLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <CastleSidebar />
      <main className="lg:ml-64 p-6">
        {children}
      </main>
      
      {/* نباطا المتقدم - مساعد ذكي عائم */}
      <AdvancedNabata />
      
      {/* نباطا الأساسي كبديل احتياطي */}
      <div className="hidden">
        <Nabata className="bottom-6 right-6" />
      </div>
    </div>
  );
};

export default CastleLayout;
