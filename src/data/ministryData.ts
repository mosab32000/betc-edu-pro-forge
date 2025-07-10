
import { MinistryEntity, EntityType } from '@/types/ministry';

// البيانات الأساسية لوزارة التربية والتعليم الأردنية والمؤسسات التابعة
export const ministryHierarchy: MinistryEntity[] = [
  {
    id: 'moe-jordan',
    nameAr: 'وزارة التربية والتعليم',
    nameEn: 'Ministry of Education',
    type: 'ministry',
    level: 0,
    status: 'active',
    establishedDate: new Date('1921-04-11'),
    description: 'الجهة المسؤولة عن التعليم العام في المملكة الأردنية الهاشمية',
    location: {
      governorate: 'عمان',
      city: 'عمان',
      district: 'الشميساني',
      address: 'الشميساني، عمان، الأردن',
      coordinates: { lat: 31.9566, lng: 35.9457 }
    },
    contact: {
      phone: '+962-6-5607181',
      email: 'info@moe.gov.jo',
      website: 'https://moe.gov.jo',
      socialMedia: {
        facebook: 'MOE.Jo',
        twitter: 'MOE_Jo'
      }
    },
    metadata: {
      studentsCount: 1650000,
      teachersCount: 120000,
      staffCount: 15000,
      budget: 850000000, // بالدينار الأردني
      programs: [
        'التعليم الأساسي',
        'التعليم الثانوي',
        'التعليم المهني',
        'تعليم الكبار',
        'التعليم الخاص'
      ],
      achievements: [
        {
          id: 'ach-1',
          title: 'رؤية الأردن 2025 للتعليم',
          description: 'إطلاق الاستراتيجية الوطنية لتطوير التعليم',
          date: new Date('2018-01-01'),
          category: 'استراتيجية',
          impact: 'عالي'
        }
      ]
    }
  },
  {
    id: 'general-sec',
    nameAr: 'الأمانة العامة',
    nameEn: 'General Secretariat',
    type: 'department',
    parentId: 'moe-jordan',
    level: 1,
    status: 'active',
    establishedDate: new Date('1921-04-11'),
    description: 'الجهاز الإداري المركزي للوزارة',
    location: {
      governorate: 'عمان',
      city: 'عمان',
      address: 'مبنى الوزارة الرئيسي'
    },
    contact: {},
    metadata: {
      staffCount: 2500,
      departments: [
        'شؤون الموظفين',
        'الشؤون المالية',
        'الشؤون القانونية',
        'العلاقات العامة'
      ]
    }
  },
  // مديريات التربية والتعليم
  {
    id: 'amman-first-dir',
    nameAr: 'مديرية التربية والتعليم للواء قصبة عمان',
    nameEn: 'Amman First Education Directorate',
    type: 'directorate',
    parentId: 'moe-jordan',
    level: 1,
    status: 'active',
    establishedDate: new Date('1950-01-01'),
    description: 'مديرية التربية والتعليم للواء قصبة عمان',
    location: {
      governorate: 'عمان',
      city: 'عمان',
      district: 'وسط البلد',
      address: 'وسط البلد، عمان'
    },
    contact: {
      phone: '+962-6-4641234',
      email: 'amman1@moe.gov.jo'
    },
    metadata: {
      studentsCount: 85000,
      teachersCount: 6500,
      staffCount: 450,
      programs: ['التعليم الأساسي', 'التعليم الثانوي']
    }
  },
  {
    id: 'zarqa-dir',
    nameAr: 'مديرية التربية والتعليم للواء الزرقاء',
    nameEn: 'Zarqa Education Directorate',
    type: 'directorate',
    parentId: 'moe-jordan',
    level: 1,
    status: 'active',
    establishedDate: new Date('1952-01-01'),
    description: 'مديرية التربية والتعليم للواء الزرقاء',
    location: {
      governorate: 'الزرقاء',
      city: 'الزرقاء',
      address: 'وسط مدينة الزرقاء'
    },
    contact: {
      phone: '+962-5-3821234',
      email: 'zarqa@moe.gov.jo'
    },
    metadata: {
      studentsCount: 95000,
      teachersCount: 7200,
      staffCount: 480
    }
  },
  // المراكز والمعاهد المتخصصة
  {
    id: 'nceee',
    nameAr: 'المركز الوطني لتطوير المناهج',
    nameEn: 'National Center for Curriculum Development',
    type: 'center',
    parentId: 'moe-jordan',
    level: 1,
    status: 'active',
    establishedDate: new Date('1988-01-01'),
    description: 'مركز متخصص في تطوير وتحديث المناهج التعليمية',
    location: {
      governorate: 'عمان',
      city: 'عمان',
      address: 'مجمع الملكة رانيا التعليمي'
    },
    contact: {
      email: 'nceee@moe.gov.jo',
      website: 'https://nceee.edu.jo'
    },
    metadata: {
      staffCount: 180,
      specializations: [
        'اللغة العربية',
        'الرياضيات',
        'العلوم',
        'الدراسات الاجتماعية',
        'اللغة الإنجليزية'
      ]
    }
  },
  {
    id: 'qrce',
    nameAr: 'مركز الملكة رانيا العبدالله لتكنولوجيا التعليم والمعلومات',
    nameEn: 'Queen Rania Center for Educational Technology',
    type: 'center',
    parentId: 'moe-jordan',
    level: 1,
    status: 'active',
    establishedDate: new Date('2005-01-01'),
    description: 'مركز متخصص في دمج التكنولوجيا في التعليم',
    location: {
      governorate: 'عمان',
      city: 'عمان',
      address: 'الجامعة الأردنية'
    },
    contact: {
      email: 'info@qrce.org',
      website: 'https://qrce.org'
    },
    metadata: {
      staffCount: 120,
      programs: [
        'التعلم الإلكتروني',
        'الفصول الذكية',
        'المحتوى الرقمي',
        'تدريب المعلمين على التكنولوجيا'
      ]
    }
  },
  // الجامعات الرسمية
  {
    id: 'university-of-jordan',
    nameAr: 'الجامعة الأردنية',
    nameEn: 'University of Jordan',
    type: 'university',
    parentId: 'moe-jordan',
    level: 1,
    status: 'active',
    establishedDate: new Date('1962-01-01'),
    description: 'أول وأكبر جامعة في الأردن',
    location: {
      governorate: 'عمان',
      city: 'عمان',
      address: 'الجبيهة، عمان'
    },
    contact: {
      phone: '+962-6-5355000',
      email: 'info@ju.edu.jo',
      website: 'https://ju.edu.jo'
    },
    metadata: {
      studentsCount: 47000,
      teachersCount: 2100,
      staffCount: 3500,
      specializations: [
        'الطب',
        'الهندسة',
        'إدارة الأعمال',
        'الحقوق',
        'الآداب',
        'العلوم'
      ]
    }
  }
];

// تصنيفات المحافظات والألوية
export const jordanGovernorates = [
  { id: 'amman', nameAr: 'عمان', nameEn: 'Amman' },
  { id: 'zarqa', nameAr: 'الزرقاء', nameEn: 'Zarqa' },
  { id: 'irbid', nameAr: 'إربد', nameEn: 'Irbid' },
  { id: 'karak', nameAr: 'الكرك', nameEn: 'Karak' },
  { id: 'mafraq', nameAr: 'المفرق', nameEn: 'Mafraq' },
  { id: 'aqaba', nameAr: 'العقبة', nameEn: 'Aqaba' },
  { id: 'madaba', nameAr: 'مادبا', nameEn: 'Madaba' },
  { id: 'jerash', nameAr: 'جرش', nameEn: 'Jerash' },
  { id: 'ajloun', nameAr: 'عجلون', nameEn: 'Ajloun' },
  { id: 'balqa', nameAr: 'البلقاء', nameEn: 'Balqa' },
  { id: 'maan', nameAr: 'معان', nameEn: 'Maan' },
  { id: 'tafileh', nameAr: 'الطفيلة', nameEn: 'Tafileh' }
];
