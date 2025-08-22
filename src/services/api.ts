// Mock API services for the integrated education platform

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  thumbnail: string;
  rating: number;
  enrolled: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  courseId: string;
  courseName: string;
  points: number;
  submitted: boolean;
  grade?: number;
  status: 'pending' | 'submitted' | 'graded' | 'late';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  created_at: string;
  isRead: boolean;
}

export interface Analytics {
  completionRate: number;
  averageGrade: number;
  studyTime: number;
  weeklyProgress: Array<{
    day: string;
    hours: number;
    progress: number;
  }>;
  topSubjects: Array<{
    subject: string;
    score: number;
  }>;
}

// Mock data
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'الرياضيات المتقدمة - الجبر',
    description: 'دورة شاملة في الجبر المتقدم للصف الثاني عشر',
    instructor: 'د. فاطمة أحمد',
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    difficulty: 'advanced',
    category: 'رياضيات',
    thumbnail: '/placeholder.svg',
    rating: 4.8,
    enrolled: true
  },
  {
    id: '2',
    title: 'الفيزياء - الكهرباء والمغناطيسية',
    description: 'استكشاف قوانين الكهرباء والمغناطيسية',
    instructor: 'أ. محمد خالد',
    progress: 45,
    totalLessons: 18,
    completedLessons: 8,
    difficulty: 'intermediate',
    category: 'فيزياء',
    thumbnail: '/placeholder.svg',
    rating: 4.6,
    enrolled: true
  }
];

const mockAssignments: Assignment[] = [
  {
    id: '1',
    title: 'حل معادلات الدرجة الثانية',
    description: 'واجب شامل على معادلات الدرجة الثانية وتطبيقاتها',
    dueDate: '2024-12-15',
    courseId: '1',
    courseName: 'الرياضيات المتقدمة',
    points: 100,
    submitted: false,
    status: 'pending'
  },
  {
    id: '2',
    title: 'تجربة قانون أوم',
    description: 'تقرير عن تجربة قانون أوم في المختبر',
    dueDate: '2024-12-18',
    courseId: '2',
    courseName: 'الفيزياء',
    points: 80,
    submitted: true,
    grade: 85,
    status: 'graded'
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'واجب جديد متاح',
    message: 'تم إضافة واجب جديد في مادة الرياضيات',
    type: 'info',
    created_at: '2024-12-10T10:30:00Z',
    isRead: false
  },
  {
    id: '2',
    title: 'تم تقييم الواجب',
    message: 'تم تقييم واجب الفيزياء وحصلت على 85/80',
    type: 'success',
    created_at: '2024-12-09T14:20:00Z',
    isRead: false
  }
];

const mockAnalytics: Analytics = {
  completionRate: 78,
  averageGrade: 85.5,
  studyTime: 24,
  weeklyProgress: [
    { day: 'الأحد', hours: 3, progress: 12 },
    { day: 'الإثنين', hours: 4, progress: 18 },
    { day: 'الثلاثاء', hours: 2, progress: 8 },
    { day: 'الأربعاء', hours: 5, progress: 22 },
    { day: 'الخميس', hours: 3, progress: 15 },
    { day: 'الجمعة', hours: 1, progress: 5 },
    { day: 'السبت', hours: 2, progress: 10 }
  ],
  topSubjects: [
    { subject: 'الرياضيات', score: 92 },
    { subject: 'الفيزياء', score: 85 },
    { subject: 'الكيمياء', score: 78 }
  ]
};

// API functions
export const coursesAPI = {
  getCourses: async (filters?: any) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      success: true,
      data: {
        courses: mockCourses,
        total: mockCourses.length
      }
    };
  },

  getCourse: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const course = mockCourses.find(c => c.id === id);
    return {
      success: true,
      data: course
    };
  }
};

export const assignmentsAPI = {
  getAssignments: async (filters?: any) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      data: {
        assignments: mockAssignments,
        total: mockAssignments.length
      }
    };
  },

  submitAssignment: async (id: string, submission: any) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'تم تسليم الواجب بنجاح'
    };
  }
};

export const notificationsAPI = {
  getNotifications: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return {
      success: true,
      data: {
        notifications: mockNotifications,
        unreadCount: mockNotifications.filter(n => !n.isRead).length
      }
    };
  },

  markAsRead: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return {
      success: true,
      message: 'تم تحديث حالة الإشعار'
    };
  }
};

export const analyticsAPI = {
  getUserAnalytics: async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return {
      success: true,
      data: mockAnalytics
    };
  },

  getUserAchievements: async (userId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      success: true,
      data: [
        { id: '1', title: 'متفوق في الرياضيات', icon: '🏆', earnedAt: '2024-11-15' },
        { id: '2', title: 'مشارك نشط', icon: '⭐', earnedAt: '2024-11-20' }
      ]
    };
  },

  getRecommendations: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      data: [
        {
          id: '1',
          type: 'course',
          title: 'ننصحك بدراسة الكيمياء العضوية',
          description: 'بناءً على أدائك في الكيمياء العامة'
        }
      ]
    };
  }
};