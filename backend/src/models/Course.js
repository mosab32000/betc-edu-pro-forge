const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: 2000
  },
  shortDescription: {
    type: String,
    maxlength: 300
  },
  
  // Visual Elements
  thumbnail: {
    url: String,
    publicId: String,
    alt: String
  },
  banner: {
    url: String,
    publicId: String,
    alt: String
  },
  
  // Course Structure
  curriculum: [{
    sectionId: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: String,
    order: {
      type: Number,
      required: true
    },
    lessons: [{
      lessonId: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      description: String,
      type: {
        type: String,
        enum: ['video', 'text', 'quiz', 'assignment', 'interactive', 'vr_experience', 'ar_experience', 'live_session'],
        required: true
      },
      order: {
        type: Number,
        required: true
      },
      duration: Number, // in minutes
      content: {
        // Video content
        videoUrl: String,
        videoPublicId: String,
        subtitles: [{
          language: String,
          url: String,
          default: Boolean
        }],
        
        // Text content
        textContent: String,
        htmlContent: String,
        
        // Interactive content
        interactiveUrl: String,
        embedCode: String,
        
        // VR/AR content
        vrSceneUrl: String,
        arModelUrl: String,
        vrInstructions: String,
        arInstructions: String,
        
        // Quiz content
        questions: [{
          questionId: String,
          type: {
            type: String,
            enum: ['multiple_choice', 'true_false', 'short_answer', 'essay', 'drag_drop', 'matching']
          },
          question: String,
          options: [String],
          correctAnswer: mongoose.Schema.Types.Mixed,
          explanation: String,
          points: Number,
          difficulty: {
            type: String,
            enum: ['easy', 'medium', 'hard']
          }
        }],
        
        // Assignment content
        assignment: {
          instructions: String,
          requirements: [String],
          submissionTypes: [{
            type: String,
            enum: ['file', 'text', 'url', 'video', 'audio']
          }],
          maxFileSize: Number,
          allowedFormats: [String],
          dueDate: Date,
          gradingRubric: [{
            criteria: String,
            points: Number,
            description: String
          }]
        }
      },
      
      // Lesson Metadata
      prerequisites: [String], // lesson IDs
      isPublished: {
        type: Boolean,
        default: false
      },
      publishedAt: Date,
      
      // AI & Analytics
      aiAnalysis: {
        difficulty: Number, // 1-10
        engagementScore: Number,
        completionRate: Number,
        averageTime: Number,
        commonMistakes: [String],
        recommendations: [String]
      }
    }]
  }],

  // Course Metadata
  metadata: {
    category: {
      type: String,
      required: true
    },
    subcategory: String,
    tags: [String],
    language: {
      type: String,
      default: 'ar'
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true
    },
    estimatedDuration: Number, // in hours
    
    // Academic Information
    subject: String,
    grade: String,
    curriculum: String, // e.g., 'Jordanian National Curriculum'
    learningObjectives: [String],
    prerequisites: [String],
    
    // Certification
    certificateEnabled: {
      type: Boolean,
      default: false
    },
    certificateTemplate: String,
    completionCriteria: {
      passScore: {
        type: Number,
        default: 70
      },
      requiredLessons: [String],
      requiredAssignments: [String],
      timeRequirement: Number // minimum time spent
    }
  },

  // Instructor Information
  instructors: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['primary', 'assistant', 'guest'],
      default: 'primary'
    },
    permissions: [{
      type: String,
      enum: ['edit_content', 'grade_assignments', 'manage_students', 'view_analytics']
    }]
  }],

  // Enrollment & Access
  enrollment: {
    type: {
      type: String,
      enum: ['open', 'invite_only', 'paid', 'restricted'],
      default: 'open'
    },
    capacity: Number,
    enrolled: {
      type: Number,
      default: 0
    },
    waitlist: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      requestedAt: Date,
      priority: Number
    }],
    
    // Pricing
    pricing: {
      isFree: {
        type: Boolean,
        default: true
      },
      price: Number,
      currency: {
        type: String,
        default: 'JOD'
      },
      discounts: [{
        type: String, // 'student', 'bulk', 'early_bird'
        percentage: Number,
        validUntil: Date,
        conditions: String
      }]
    }
  },

  // Gamification & Engagement
  gamification: {
    pointsPerLesson: {
      type: Number,
      default: 50
    },
    pointsPerQuiz: {
      type: Number,
      default: 100
    },
    pointsPerAssignment: {
      type: Number,
      default: 200
    },
    badges: [{
      id: String,
      name: String,
      description: String,
      iconUrl: String,
      criteria: String,
      points: Number,
      rarity: String
    }],
    leaderboardEnabled: {
      type: Boolean,
      default: true
    }
  },

  // AI & Personalization
  aiFeatures: {
    adaptiveLearning: {
      enabled: {
        type: Boolean,
        default: true
      },
      difficultyAdjustment: Boolean,
      personalizedPath: Boolean,
      intelligentTutoring: Boolean
    },
    recommendations: {
      enabled: {
        type: Boolean,
        default: true
      },
      similarCourses: [String],
      nextCourses: [String],
      supplementaryMaterials: [String]
    },
    analytics: {
      studentBehavior: mongoose.Schema.Types.Mixed,
      engagementPatterns: mongoose.Schema.Types.Mixed,
      performanceMetrics: mongoose.Schema.Types.Mixed,
      predictiveInsights: mongoose.Schema.Types.Mixed
    }
  },

  // VR/AR Features
  immersiveFeatures: {
    vrClassroom: {
      enabled: {
        type: Boolean,
        default: false
      },
      environmentId: String,
      sceneUrl: String,
      maxParticipants: Number,
      requirements: [String]
    },
    arExperiences: [{
      lessonId: String,
      modelUrl: String,
      instructions: String,
      markerType: String,
      trackingData: String
    }],
    virtualLab: {
      enabled: {
        type: Boolean,
        default: false
      },
      labType: String, // 'physics', 'chemistry', 'biology'
      experiments: [{
        id: String,
        name: String,
        description: String,
        equipmentRequired: [String],
        safetyNotes: [String],
        procedures: [String],
        expectedResults: String
      }]
    }
  },

  // Assessment & Grading
  assessment: {
    gradingScale: {
      type: String,
      enum: ['percentage', 'gpa', 'letter', 'pass_fail'],
      default: 'percentage'
    },
    weightings: {
      quizzes: {
        type: Number,
        default: 30
      },
      assignments: {
        type: Number,
        default: 50
      },
      participation: {
        type: Number,
        default: 10
      },
      finalExam: {
        type: Number,
        default: 10
      }
    },
    autoGrading: {
      enabled: {
        type: Boolean,
        default: true
      },
      types: [String] // 'multiple_choice', 'true_false'
    }
  },

  // Collaboration Features
  collaboration: {
    discussions: {
      enabled: {
        type: Boolean,
        default: true
      },
      moderated: {
        type: Boolean,
        default: false
      }
    },
    peerReview: {
      enabled: {
        type: Boolean,
        default: false
      },
      reviewsPerSubmission: {
        type: Number,
        default: 3
      }
    },
    groupProjects: {
      enabled: {
        type: Boolean,
        default: false
      },
      maxGroupSize: {
        type: Number,
        default: 5
      }
    }
  },

  // Status & Publishing
  status: {
    type: String,
    enum: ['draft', 'published', 'archived', 'under_review'],
    default: 'draft'
  },
  publishedAt: Date,
  lastUpdated: {
    type: Date,
    default: Date.now
  },

  // Analytics & Metrics
  analytics: {
    totalViews: {
      type: Number,
      default: 0
    },
    totalEnrollments: {
      type: Number,
      default: 0
    },
    completionRate: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    totalRatings: {
      type: Number,
      default: 0
    },
    totalTimeSpent: {
      type: Number,
      default: 0
    },
    popularLessons: [String],
    challengingLessons: [String],
    dropoffPoints: [String]
  },

  // Reviews & Ratings
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    helpful: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],

  // System Metadata
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  version: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

// Indexes for performance
courseSchema.index({ slug: 1 });
courseSchema.index({ status: 1, publishedAt: -1 });
courseSchema.index({ 'metadata.category': 1, 'metadata.level': 1 });
courseSchema.index({ 'instructors.userId': 1 });
courseSchema.index({ 'analytics.averageRating': -1 });
courseSchema.index({ 'analytics.totalEnrollments': -1 });
courseSchema.index({ createdAt: -1 });

// Virtual fields
courseSchema.virtual('totalLessons').get(function() {
  return this.curriculum.reduce((total, section) => total + section.lessons.length, 0);
});

courseSchema.virtual('totalDuration').get(function() {
  return this.curriculum.reduce((total, section) => {
    return total + section.lessons.reduce((sectionTotal, lesson) => {
      return sectionTotal + (lesson.duration || 0);
    }, 0);
  }, 0);
});

// Instance methods
courseSchema.methods.calculateProgress = function(userId, completedLessons = []) {
  const totalLessons = this.totalLessons;
  if (totalLessons === 0) return 0;
  
  const completedCount = completedLessons.length;
  return Math.round((completedCount / totalLessons) * 100);
};

courseSchema.methods.getNextLesson = function(currentLessonId) {
  for (let section of this.curriculum) {
    const currentIndex = section.lessons.findIndex(lesson => lesson.lessonId === currentLessonId);
    if (currentIndex !== -1) {
      // Check if there's a next lesson in the same section
      if (currentIndex < section.lessons.length - 1) {
        return section.lessons[currentIndex + 1];
      }
      
      // Look for the first lesson in the next section
      const currentSectionIndex = this.curriculum.findIndex(s => s.sectionId === section.sectionId);
      if (currentSectionIndex < this.curriculum.length - 1) {
        const nextSection = this.curriculum[currentSectionIndex + 1];
        if (nextSection.lessons.length > 0) {
          return nextSection.lessons[0];
        }
      }
    }
  }
  return null;
};

courseSchema.methods.checkPrerequisites = function(lessonId, completedLessons = []) {
  for (let section of this.curriculum) {
    const lesson = section.lessons.find(l => l.lessonId === lessonId);
    if (lesson && lesson.prerequisites && lesson.prerequisites.length > 0) {
      return lesson.prerequisites.every(prereq => completedLessons.includes(prereq));
    }
  }
  return true;
};

courseSchema.methods.generateCertificate = function(userId, userProfile) {
  if (!this.metadata.certificateEnabled) {
    throw new Error('Certificates are not enabled for this course');
  }
  
  return {
    courseId: this._id,
    courseTitle: this.title,
    studentName: userProfile.displayName || userProfile.fullName,
    completionDate: new Date(),
    certificateTemplate: this.metadata.certificateTemplate,
    instructors: this.instructors.map(inst => inst.userId),
    metadata: {
      totalLessons: this.totalLessons,
      duration: this.totalDuration,
      level: this.metadata.level
    }
  };
};

// Static methods
courseSchema.statics.findByCategory = function(category, options = {}) {
  const query = { 
    'metadata.category': category,
    status: 'published'
  };
  
  return this.find(query)
    .sort({ 'analytics.averageRating': -1, 'analytics.totalEnrollments': -1 })
    .limit(options.limit || 20)
    .populate('instructors.userId', 'profile.firstName profile.lastName profile.avatar');
};

courseSchema.statics.searchCourses = function(searchTerm, filters = {}) {
  const query = {
    status: 'published',
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { 'metadata.tags': { $in: [new RegExp(searchTerm, 'i')] } }
    ]
  };
  
  if (filters.category) query['metadata.category'] = filters.category;
  if (filters.level) query['metadata.level'] = filters.level;
  if (filters.instructor) query['instructors.userId'] = filters.instructor;
  
  return this.find(query)
    .sort({ 'analytics.averageRating': -1 })
    .populate('instructors.userId', 'profile.firstName profile.lastName profile.avatar');
};

// Pre-save middleware
courseSchema.pre('save', function(next) {
  // Generate slug from title if not provided
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  // Update timestamp
  this.updatedAt = new Date();
  
  // Update version on content changes
  if (this.isModified('curriculum')) {
    this.version += 1;
  }
  
  next();
});

module.exports = mongoose.model('Course', courseSchema);