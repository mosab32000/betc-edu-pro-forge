require('dotenv').config();

const config = {
  // Server configuration
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5000'),
  host: process.env.HOST || '0.0.0.0',

  // Database configuration
  database: {
    url: process.env.DATABASE_URL || 'mongodb://localhost:27017/nashmi_eduverse',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    }
  },

  // Redis configuration
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0')
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'nashmi-eduverse-super-secret-key',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'nashmi-refresh-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  },

  // Security configuration
  security: {
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '12'),
    sessionSecret: process.env.SESSION_SECRET || 'nashmi-session-secret'
  },

  // Email configuration
  email: {
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM || 'noreply@nashmi.edu.jo'
  },

  // CORS configuration
  cors: {
    origins: process.env.CORS_ORIGINS?.split(',') || [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://nashmi.edu.jo',
      'https://app.nashmi.edu.jo'
    ]
  },

  // AI Service configuration
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    huggingFaceApiKey: process.env.HUGGINGFACE_API_KEY,
    anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    endpoint: process.env.AI_ENDPOINT || 'http://ai-service:5001',
    models: {
      textGeneration: 'gpt-4-turbo',
      imageGeneration: 'dall-e-3',
      speechToText: 'whisper-1',
      translation: 'gpt-4'
    }
  },

  // Blockchain configuration
  blockchain: {
    network: process.env.BLOCKCHAIN_NETWORK || 'polygon-mumbai',
    rpcUrl: process.env.BLOCKCHAIN_RPC_URL,
    contractAddress: process.env.CONTRACT_ADDRESS,
    privateKey: process.env.BLOCKCHAIN_PRIVATE_KEY,
    gasLimit: parseInt(process.env.GAS_LIMIT || '300000'),
    gasPrice: process.env.GAS_PRICE || '20000000000'
  },

  // XR configuration
  xr: {
    endpoint: process.env.XR_ENDPOINT || 'http://xr-service:5002',
    assetsPath: process.env.XR_ASSETS_PATH || './assets/xr',
    maxFileSize: parseInt(process.env.XR_MAX_FILE_SIZE || '104857600'), // 100MB
    supportedFormats: ['glb', 'gltf', 'obj', 'fbx', 'dae']
  },

  // File upload configuration
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '52428800'), // 50MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    allowedVideoTypes: ['video/mp4', 'video/webm', 'video/ogg'],
    allowedDocumentTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    uploadPath: process.env.UPLOAD_PATH || './uploads'
  },

  // Application URLs
  urls: {
    frontend: process.env.FRONTEND_URL || 'http://localhost:3000',
    backend: process.env.BACKEND_URL || 'http://localhost:5000',
    cdn: process.env.CDN_URL || 'https://cdn.nashmi.edu.jo'
  },

  // Gamification configuration
  gamification: {
    pointsPerQuiz: 100,
    pointsPerAssignment: 200,
    pointsPerCourseCompletion: 1000,
    dailyLoginBonus: 10,
    streakMultiplier: 1.5,
    leaderboardSize: 100
  },

  // Analytics configuration
  analytics: {
    trackingEnabled: process.env.ANALYTICS_ENABLED !== 'false',
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID,
    mixpanelToken: process.env.MIXPANEL_TOKEN,
    retentionDays: parseInt(process.env.ANALYTICS_RETENTION_DAYS || '365')
  },

  // Monitoring configuration
  monitoring: {
    prometheusEnabled: process.env.PROMETHEUS_ENABLED === 'true',
    sentryDsn: process.env.SENTRY_DSN,
    logLevel: process.env.LOG_LEVEL || 'info'
  },

  // Feature flags
  features: {
    aiTutoring: process.env.FEATURE_AI_TUTORING !== 'false',
    vrClassrooms: process.env.FEATURE_VR_CLASSROOMS !== 'false',
    blockchainCertificates: process.env.FEATURE_BLOCKCHAIN_CERTIFICATES !== 'false',
    adaptiveLearning: process.env.FEATURE_ADAPTIVE_LEARNING !== 'false',
    socialLearning: process.env.FEATURE_SOCIAL_LEARNING !== 'false'
  }
};

// Validate required environment variables in production
if (config.nodeEnv === 'production') {
  const requiredEnvVars = [
    'JWT_SECRET',
    'DATABASE_URL',
    'REDIS_URL',
    'EMAIL_USER',
    'EMAIL_PASS'
  ];

  requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      throw new Error(`Environment variable ${envVar} is required in production`);
    }
  });
}

module.exports = config;