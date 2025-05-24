
import React, { useState } from 'react';
import CastleLayout from '@/components/layout/CastleLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NabataeanGuardian from '@/components/system/NabataeanGuardian';
import OfflineManager from '@/components/system/OfflineManager';
import AccessibilityManager from '@/components/system/AccessibilityManager';
import EduAnalyticaPro3 from '@/components/evaluation/EduAnalyticaPro3';
import AdminControlCenter from '@/components/admin/AdminControlCenter';

const SystemManagementPage = () => {
  return (
    <CastleLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold petra-title mb-2">إدارة النظام المتقدمة</h1>
          <p className="petra-subtitle">مركز التحكم الشامل لنظام قلعة Betc – PetraVerse Edition</p>
        </div>

        <Tabs defaultValue="guardian" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="guardian">حارس الصيانة</TabsTrigger>
            <TabsTrigger value="offline">العمل دون اتصال</TabsTrigger>
            <TabsTrigger value="accessibility">إمكانية الوصول</TabsTrigger>
            <TabsTrigger value="analytics">التقييم الذكي</TabsTrigger>
            <TabsTrigger value="admin">مركز القيادة</TabsTrigger>
          </TabsList>

          <TabsContent value="guardian">
            <NabataeanGuardian />
          </TabsContent>

          <TabsContent value="offline">
            <OfflineManager />
          </TabsContent>

          <TabsContent value="accessibility">
            <AccessibilityManager />
          </TabsContent>

          <TabsContent value="analytics">
            <EduAnalyticaPro3 />
          </TabsContent>

          <TabsContent value="admin">
            <AdminControlCenter />
          </TabsContent>
        </Tabs>
      </div>
    </CastleLayout>
  );
};

export default SystemManagementPage;
