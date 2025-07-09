
import React from 'react';
import CastleLayout from '@/components/layout/CastleLayout';
import CastleBanner from '@/components/castle/CastleBanner';
import SystemManagementDashboard from '@/components/system/SystemManagementDashboard';
import { Settings } from 'lucide-react';

const SystemManagementPage = () => {
  return (
    <CastleLayout>
      <CastleBanner
        title="مركز إدارة النظام المتقدم"
        subtitle="لوحة تحكم شاملة لإدارة ومراقبة جميع أنظمة قلعة BTEC مع الذكاء الاصطناعي المتقدم"
        icon={<Settings className="w-8 h-8" />}
        variant="wisdom"
      />
      <SystemManagementDashboard />
    </CastleLayout>
  );
};

export default SystemManagementPage;
