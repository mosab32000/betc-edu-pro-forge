
import React from 'react';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import { CastleLayout } from '@/components/layout/CastleLayout';

const StudentDashboardPage = () => {
  return (
    <CastleLayout>
      <StudentDashboard />
    </CastleLayout>
  );
};

export default StudentDashboardPage;
