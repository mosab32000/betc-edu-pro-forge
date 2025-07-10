// نماذج البيانات الخاصة بوزارة التربية والتعليم الأردنية

export interface MinistryEntity {
  id: string;
  nameAr: string;
  nameEn: string;
  type: EntityType;
  parentId?: string;
  level: number;
  status: EntityStatus;
  establishedDate: Date;
  description: string;
  location: LocationInfo;
  contact: ContactInfo;
  metadata: EntityMetadata;
}

export type EntityType = 
  | 'ministry' 
  | 'directorate' 
  | 'school' 
  | 'department' 
  | 'unit' 
  | 'center' 
  | 'institute'
  | 'university'
  | 'college';

export type EntityStatus = 'active' | 'inactive' | 'under_development' | 'planning';

export interface LocationInfo {
  governorate: string;
  city: string;
  district?: string;
  address: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ContactInfo {
  phone?: string;
  email?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface EntityMetadata {
  studentsCount?: number;
  teachersCount?: number;
  staffCount?: number;
  budget?: number;
  programs?: string[];
  departments?: string[];
  specializations?: string[];
  achievements?: Achievement[];
  partnerships?: Partnership[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: string;
  impact: string;
}

export interface Partnership {
  id: string;
  partnerName: string;
  partnerType: 'local' | 'international' | 'private' | 'public';
  description: string;
  startDate: Date;
  endDate?: Date;
  status: 'active' | 'completed' | 'suspended';
}

// نموذج التنفيذ المتتابع
export interface SequentialExecution {
  id: string;
  name: string;
  description: string;
  type: ExecutionType;
  stages: ExecutionStage[];
  currentStage: number;
  status: ExecutionStatus;
  priority: ExecutionPriority;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  estimatedDuration: number; // بالدقائق
  actualDuration?: number;
  dependencies?: string[];
  metadata: ExecutionMetadata;
}

export type ExecutionType = 
  | 'educational_reform'
  | 'curriculum_development'
  | 'teacher_training'
  | 'infrastructure_development'
  | 'digital_transformation'
  | 'quality_assurance'
  | 'student_assessment'
  | 'policy_implementation';

export type ExecutionStatus = 
  | 'pending'
  | 'in_progress'
  | 'paused'
  | 'completed'
  | 'cancelled'
  | 'failed';

export type ExecutionPriority = 'low' | 'medium' | 'high' | 'critical';

export interface ExecutionStage {
  id: string;
  name: string;
  description: string;
  order: number;
  status: ExecutionStatus;
  startDate?: Date;
  endDate?: Date;
  estimatedDuration: number;
  actualDuration?: number;
  assignedTo?: string[];
  dependencies?: string[];
  deliverables: Deliverable[];
  milestones: Milestone[];
  resources: Resource[];
  risks: Risk[];
}

export interface Deliverable {
  id: string;
  name: string;
  description: string;
  type: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  deadline: Date;
  assignedTo: string;
  reviewedBy?: string;
  quality: QualityMetrics;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  targetDate: Date;
  actualDate?: Date;
  status: 'pending' | 'achieved' | 'delayed' | 'missed';
  impact: 'low' | 'medium' | 'high' | 'critical';
}

export interface Resource {
  id: string;
  name: string;
  type: 'human' | 'financial' | 'technical' | 'material';
  quantity: number;
  unit: string;
  cost?: number;
  availability: ResourceAvailability;
}

export interface ResourceAvailability {
  status: 'available' | 'allocated' | 'unavailable';
  startDate: Date;
  endDate: Date;
  utilization: number; // نسبة مئوية
}

export interface Risk {
  id: string;
  description: string;
  category: string;
  probability: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string;
  owner: string;
  status: 'identified' | 'analyzing' | 'mitigating' | 'resolved' | 'occurred';
}

export interface QualityMetrics {
  accuracy: number;
  completeness: number;
  timeliness: number;
  relevance: number;
  overall: number;
}

export interface ExecutionMetadata {
  tags: string[];
  category: string;
  scope: 'national' | 'regional' | 'local';
  affectedEntities: string[];
  stakeholders: Stakeholder[];
  successCriteria: SuccessCriteria;
  reportingFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
}

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  type: 'internal' | 'external';
  influence: 'low' | 'medium' | 'high';
  interest: 'low' | 'medium' | 'high';
  contactInfo: ContactInfo;
}

export interface SuccessCriteria {
  kpis: KPI[];
  targets: Target[];
  benchmarks: Benchmark[];
}

export interface KPI {
  id: string;
  name: string;
  description: string;
  unit: string;
  target: number;
  current: number;
  trend: 'improving' | 'stable' | 'declining';
  frequency: string;
}

export interface Target {
  id: string;
  description: string;
  value: number;
  unit: string;
  deadline: Date;
  status: 'not_started' | 'in_progress' | 'achieved' | 'missed';
}

export interface Benchmark {
  id: string;
  name: string;
  description: string;
  value: number;
  unit: string;
  source: string;
  date: Date;
}
