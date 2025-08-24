const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  // Basic Authentication
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8,
    select: false
  },
  
  // Personal Information
  profile: {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: 50
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
      maxlength: 50
    },
    middleName: {
      type: String,
      trim: true,
      maxlength: 50
    },
    displayName: {
      type: String,
      trim: true,
      maxlength: 100
    },
    avatar: {
      url: String,
      publicId: String
    },
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other', 'prefer_not_to_say']
    },
    nationality: {
      type: String,
      default: 'Jordanian'
    },
    nationalId: {
      type: String,
      sparse: true,
      unique: true
    },
    phoneNumber: {
      type: String,
      validate: [validator.isMobilePhone, 'Please provide a valid phone number']
    },
    bio: {
      type: String,
      maxlength: 500
    }
  },

  // Role and Permissions
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin', 'parent', 'ministry_official', 'school_admin'],
    default: 'student'
  },
  permissions: [{
    type: String,
    enum: [
      'create_courses', 'edit_courses', 'delete_courses',
      'view_analytics', 'manage_users', 'system_admin',
      'grade_assignments', 'create_assignments', 'access_vr',
      'mint_certificates', 'view_blockchain_data'
    ]
  }],
  status: {
    type: String,
    enum: ['active', 'suspended', 'pending_verification', 'inactive'],
    default: 'pending_verification'
  },

  // Academic Information
  academic: {
    school: {
      name: String,
      id: mongoose.Schema.Types.ObjectId,
      grade: String,
      section: String
    },
    subjects: [String],
    specialization: String,
    graduationYear: Number,
    gpa: Number,
    achievements: [{
      title: String,
      description: String,
      date: Date,
      issuer: String,
      certificateUrl: String,
      blockchainHash: String
    }]
  },

  // Gamification & Progress
  gamification: {
    level: {
      type: Number,
      default: 1
    },
    experience: {
      type: Number,
      default: 0
    },
    totalPoints: {
      type: Number,
      default: 0
    },
    badges: [{
      id: String,
      name: String,
      description: String,
      iconUrl: String,
      earnedAt: Date,
      rarity: {
        type: String,
        enum: ['common', 'rare', 'epic', 'legendary']
      }
    }],
    streaks: {
      current: {
        type: Number,
        default: 0
      },
      longest: {
        type: Number,
        default: 0
      },
      lastActivity: Date
    },
    leaderboard: {
      rank: Number,
      points: Number,
      lastUpdated: Date
    }
  },

  // Learning Preferences & AI Personalization
  learningProfile: {
    learningStyle: {
      type: String,
      enum: ['visual', 'auditory', 'kinesthetic', 'reading_writing']
    },
    preferredLanguages: [{
      type: String,
      default: ['ar', 'en']
    }],
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    aiPersonalization: {
      enabled: {
        type: Boolean,
        default: true
      },
      recommendations: mongoose.Schema.Types.Mixed,
      adaptivePath: mongoose.Schema.Types.Mixed,
      performanceAnalysis: mongoose.Schema.Types.Mixed
    },
    accessibility: {
      screenReader: Boolean,
      highContrast: Boolean,
      fontSize: {
        type: String,
        enum: ['small', 'medium', 'large', 'extra-large'],
        default: 'medium'
      },
      colorBlindSupport: Boolean,
      reducedMotion: Boolean
    }
  },

  // VR/AR Preferences
  vrProfile: {
    enabled: {
      type: Boolean,
      default: false
    },
    avatar: {
      model: String,
      customizations: mongoose.Schema.Types.Mixed
    },
    preferences: {
      movementType: {
        type: String,
        enum: ['teleport', 'smooth', 'comfort'],
        default: 'teleport'
      },
      comfort: {
        snapTurn: Boolean,
        vignette: Boolean,
        stabilization: Boolean
      }
    },
    sessions: [{
      sessionId: String,
      startTime: Date,
      endTime: Date,
      duration: Number,
      classroomId: String,
      interactions: Number
    }]
  },

  // Blockchain & Certificates
  blockchain: {
    walletAddress: String,
    certificates: [{
      certificateId: String,
      courseId: String,
      courseName: String,
      completionDate: Date,
      blockchainHash: String,
      transactionHash: String,
      ipfsHash: String,
      verified: Boolean
    }],
    tokens: {
      earned: {
        type: Number,
        default: 0
      },
      spent: {
        type: Number,
        default: 0
      },
      balance: {
        type: Number,
        default: 0
      }
    }
  },

  // Security & Verification
  security: {
    emailVerified: {
      type: Boolean,
      default: false
    },
    phoneVerified: {
      type: Boolean,
      default: false
    },
    identityVerified: {
      type: Boolean,
      default: false
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false
    },
    twoFactorSecret: String,
    verificationTokens: {
      email: String,
      phone: String,
      emailExpiry: Date,
      phoneExpiry: Date
    },
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
    loginAttempts: {
      type: Number,
      default: 0
    },
    lockUntil: Date,
    lastLogin: Date,
    loginHistory: [{
      timestamp: Date,
      ipAddress: String,
      userAgent: String,
      location: String,
      success: Boolean
    }]
  },

  // Notifications & Communication
  notifications: {
    preferences: {
      email: {
        assignments: { type: Boolean, default: true },
        grades: { type: Boolean, default: true },
        announcements: { type: Boolean, default: true },
        reminders: { type: Boolean, default: true },
        achievements: { type: Boolean, default: true },
        marketing: { type: Boolean, default: false }
      },
      push: {
        assignments: { type: Boolean, default: true },
        grades: { type: Boolean, default: true },
        announcements: { type: Boolean, default: true },
        reminders: { type: Boolean, default: true },
        achievements: { type: Boolean, default: true }
      },
      sms: {
        enabled: { type: Boolean, default: false },
        emergencyOnly: { type: Boolean, default: true }
      }
    },
    unread: [{
      id: String,
      type: String,
      title: String,
      message: String,
      data: mongoose.Schema.Types.Mixed,
      createdAt: Date,
      read: Boolean,
      readAt: Date
    }]
  },

  // System Metadata
  metadata: {
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    lastActive: {
      type: Date,
      default: Date.now
    },
    timezone: {
      type: String,
      default: 'Asia/Amman'
    },
    locale: {
      type: String,
      default: 'ar-JO'
    },
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'system'
    },
    onboardingCompleted: {
      type: Boolean,
      default: false
    },
    onboardingStep: {
      type: Number,
      default: 0
    },
    tags: [String],
    notes: String
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.passwordHash;
      delete ret.security.twoFactorSecret;
      delete ret.security.verificationTokens;
      delete ret.security.resetPasswordToken;
      return ret;
    }
  }
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ 'profile.nationalId': 1 }, { sparse: true });
userSchema.index({ role: 1, status: 1 });
userSchema.index({ 'academic.school.id': 1 });
userSchema.index({ 'gamification.totalPoints': -1 });
userSchema.index({ 'metadata.lastActive': -1 });
userSchema.index({ createdAt: 1 });

// Virtual fields
userSchema.virtual('fullName').get(function() {
  const { firstName, middleName, lastName } = this.profile;
  return [firstName, middleName, lastName].filter(Boolean).join(' ');
});

userSchema.virtual('displayNameOrFullName').get(function() {
  return this.profile.displayName || this.fullName;
});

userSchema.virtual('age').get(function() {
  if (!this.profile.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.profile.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
});

// Instance methods
userSchema.methods.checkPassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

userSchema.methods.createPasswordResetToken = function() {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.security.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.security.resetPasswordExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
  return resetToken;
};

userSchema.methods.addExperience = function(points) {
  const oldLevel = this.gamification.level;
  this.gamification.experience += points;
  this.gamification.totalPoints += points;
  
  // Calculate new level (100 XP per level, increasing by 10% each level)
  let requiredXP = 100;
  let level = 1;
  let totalRequired = 0;
  
  while (totalRequired + requiredXP <= this.gamification.experience) {
    totalRequired += requiredXP;
    level++;
    requiredXP = Math.floor(requiredXP * 1.1);
  }
  
  this.gamification.level = level;
  
  // Return true if leveled up
  return level > oldLevel;
};

userSchema.methods.awardBadge = function(badge) {
  const exists = this.gamification.badges.some(b => b.id === badge.id);
  if (!exists) {
    this.gamification.badges.push({
      ...badge,
      earnedAt: new Date()
    });
    return true;
  }
  return false;
};

userSchema.methods.updateStreak = function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const lastActivity = this.gamification.streaks.lastActivity;
  if (!lastActivity) {
    this.gamification.streaks.current = 1;
    this.gamification.streaks.lastActivity = today;
    return;
  }
  
  const lastActivityDate = new Date(lastActivity);
  lastActivityDate.setHours(0, 0, 0, 0);
  
  const daysDiff = (today - lastActivityDate) / (1000 * 60 * 60 * 24);
  
  if (daysDiff === 1) {
    // Consecutive day
    this.gamification.streaks.current += 1;
    this.gamification.streaks.longest = Math.max(
      this.gamification.streaks.longest,
      this.gamification.streaks.current
    );
  } else if (daysDiff > 1) {
    // Streak broken
    this.gamification.streaks.current = 1;
  }
  
  this.gamification.streaks.lastActivity = today;
};

// Pre-save middleware
userSchema.pre('save', async function(next) {
  // Hash password if modified
  if (this.isModified('passwordHash')) {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  }
  
  // Update timestamps
  this.metadata.updatedAt = new Date();
  
  // Generate display name if not provided
  if (!this.profile.displayName) {
    this.profile.displayName = this.fullName;
  }
  
  next();
});

// Pre-save middleware for account locking
userSchema.pre('save', function(next) {
  // If we have a lockUntil field and it's not in the future, remove it
  if (this.security.lockUntil && this.security.lockUntil <= Date.now()) {
    this.security.lockUntil = undefined;
    this.security.loginAttempts = 0;
  }
  next();
});

// Static methods
userSchema.statics.findByEmailOrNationalId = function(identifier) {
  return this.findOne({
    $or: [
      { email: identifier.toLowerCase() },
      { 'profile.nationalId': identifier }
    ]
  });
};

userSchema.statics.getTopLearners = function(limit = 10) {
  return this.find({ status: 'active' })
    .sort({ 'gamification.totalPoints': -1 })
    .limit(limit)
    .select('profile gamification');
};

// Virtual for account locking
userSchema.virtual('isLocked').get(function() {
  return !!(this.security.lockUntil && this.security.lockUntil > Date.now());
});

module.exports = mongoose.model('User', userSchema);