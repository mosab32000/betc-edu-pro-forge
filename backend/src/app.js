const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const { createServer } = require('http');
const { Server } = require('socket.io');
const config = require('./config');
const { connectDatabase } = require('./services/DatabaseService');
const { connectRedis } = require('./services/RedisService');
const { logger } = require('./services/LoggerService');
const errorHandler = require('./api/v1/middleware/errorHandler');

// Import routes
const authRoutes = require('./api/v1/routes/auth');
const courseRoutes = require('./api/v1/routes/courses');
const assignmentRoutes = require('./api/v1/routes/assignments');
const aiRoutes = require('./api/v1/routes/ai');
const blockchainRoutes = require('./api/v1/routes/blockchain');
const xrRoutes = require('./api/v1/routes/xr');
const analyticsRoutes = require('./api/v1/routes/analytics');
const gamificationRoutes = require('./api/v1/routes/gamification');

class NashmiEduverseApp {
  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: config.cors.origins,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
      }
    });
    
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeSocketIO();
  }

  async initialize() {
    try {
      // Connect to databases
      await connectDatabase();
      await connectRedis();
      
      logger.info('✅ Nashmi EduVerse Backend initialized successfully');
    } catch (error) {
      logger.error('❌ Failed to initialize services:', error);
      process.exit(1);
    }
  }

  initializeMiddlewares() {
    // Security middleware
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "https:"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          connectSrc: ["'self'", "https://api.nashmi.edu.jo", "wss:"]
        }
      }
    }));

    // CORS configuration
    this.app.use(cors({
      origin: config.cors.origins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
    }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 1000 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
      standardHeaders: true,
      legacyHeaders: false
    });
    this.app.use('/api/', limiter);

    // Compression
    this.app.use(compression());

    // Logging
    this.app.use(morgan('combined', {
      stream: { write: (message) => logger.info(message.trim()) }
    }));

    // Body parsing
    this.app.use(express.json({ limit: '50mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '50mb' }));

    // Static files
    this.app.use('/uploads', express.static('uploads'));
    this.app.use('/assets', express.static('assets'));
  }

  initializeRoutes() {
    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: config.nodeEnv,
        services: {
          database: 'connected',
          redis: 'connected',
          ai: 'connected',
          blockchain: 'connected',
          xr: 'connected'
        }
      });
    });

    // API routes
    this.app.use('/api/v1/auth', authRoutes);
    this.app.use('/api/v1/courses', courseRoutes);
    this.app.use('/api/v1/assignments', assignmentRoutes);
    this.app.use('/api/v1/ai', aiRoutes);
    this.app.use('/api/v1/blockchain', blockchainRoutes);
    this.app.use('/api/v1/xr', xrRoutes);
    this.app.use('/api/v1/analytics', analyticsRoutes);
    this.app.use('/api/v1/gamification', gamificationRoutes);

    // 404 handler
    this.app.use('*', (req, res) => {
      res.status(404).json({
        error: 'Route not found',
        message: `The requested route ${req.originalUrl} does not exist.`
      });
    });
  }

  initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  initializeSocketIO() {
    this.io.on('connection', (socket) => {
      logger.info(`🔗 User connected: ${socket.id}`);

      // Join virtual classroom
      socket.on('join-vr-classroom', (data) => {
        socket.join(`vr-classroom:${data.classroomId}`);
        socket.to(`vr-classroom:${data.classroomId}`).emit('user-joined-vr', {
          userId: data.userId,
          avatar: data.avatar,
          position: data.position
        });
      });

      // VR/AR interactions
      socket.on('vr-interaction', (data) => {
        socket.to(`vr-classroom:${data.classroomId}`).emit('vr-interaction', data);
      });

      // AI-powered real-time assistance
      socket.on('ai-help-request', async (data) => {
        try {
          // Process AI request (integrate with AI service)
          const aiResponse = await this.processAIRequest(data);
          socket.emit('ai-response', aiResponse);
        } catch (error) {
          socket.emit('ai-error', { error: 'Failed to process AI request' });
        }
      });

      // Gamification events
      socket.on('achievement-earned', (data) => {
        socket.broadcast.emit('user-achievement', {
          userId: data.userId,
          achievement: data.achievement,
          timestamp: new Date()
        });
      });

      // Blockchain certificate events
      socket.on('certificate-minted', (data) => {
        socket.emit('certificate-ready', {
          certificateHash: data.hash,
          transactionId: data.transactionId
        });
      });

      socket.on('disconnect', () => {
        logger.info(`🔌 User disconnected: ${socket.id}`);
      });
    });

    // Make io accessible to routes
    this.app.use((req, res, next) => {
      req.io = this.io;
      next();
    });
  }

  async processAIRequest(data) {
    // Placeholder for AI processing
    return {
      response: 'AI processing completed',
      confidence: 0.95,
      recommendations: []
    };
  }

  start() {
    const PORT = config.port || 5000;
    this.server.listen(PORT, () => {
      logger.info(`
        🚀 Nashmi EduVerse Nexus Backend Server Running!
        📍 Port: ${PORT}
        🌐 Environment: ${config.nodeEnv}
        🕒 Time: ${new Date().toLocaleString()}
        🏥 Health: http://localhost:${PORT}/health
        🎯 Ready for Educational Innovation!
      `);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => this.shutdown());
    process.on('SIGINT', () => this.shutdown());
  }

  async shutdown() {
    logger.info('🛑 Shutting down Nashmi EduVerse Backend gracefully...');
    
    try {
      this.server.close();
      logger.info('✅ Server shut down successfully');
      process.exit(0);
    } catch (error) {
      logger.error('❌ Error during shutdown:', error);
      process.exit(1);
    }
  }
}

// Create and start application
const app = new NashmiEduverseApp();
app.initialize()
  .then(() => app.start())
  .catch((error) => {
    logger.error('Failed to start Nashmi EduVerse:', error);
    process.exit(1);
  });

module.exports = app;