
import React from 'react';
import CastleSidebar from './CastleSidebar';
import Nabata from '@/components/ai/Nabata';
import AdvancedNabata from '@/components/advanced/AdvancedNabata';
import LocationIndicator from '@/components/navigation/LocationIndicator';
import NotificationCenter from '@/components/system/NotificationCenter';
import WelcomeModal from '@/components/onboarding/WelcomeModal';

interface CastleLayoutProps {
  children: React.ReactNode;
}

const CastleLayout = ({ children }: CastleLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <CastleSidebar />
      
      {/* شريط الإشعارات العلوي */}
      <div className="lg:ml-64 p-4 pb-0">
        <div className="flex justify-between items-center mb-2">
          <LocationIndicator />
          <NotificationCenter />
        </div>
      </div>
      
      <main className="lg:ml-64 p-6 pt-2">
        {children}
      </main>
      
      {/* نافذة الترحيب */}
      <WelcomeModal />
      
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
