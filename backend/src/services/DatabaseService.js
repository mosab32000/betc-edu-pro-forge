const mongoose = require('mongoose');
const config = require('../config');
const { logger } = require('./LoggerService');

class DatabaseService {
  constructor() {
    this.connection = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 5000; // 5 seconds
  }

  async connect() {
    try {
      // MongoDB connection options
      const options = {
        ...config.database.options,
        autoIndex: config.nodeEnv !== 'production', // Build indexes in development
        bufferCommands: false, // Disable mongoose buffering
        bufferMaxEntries: 0, // Disable mongoose buffering
      };

      logger.info('🔗 Connecting to MongoDB...');
      
      this.connection = await mongoose.connect(config.database.url, options);
      
      // Reset reconnect attempts on successful connection
      this.reconnectAttempts = 0;
      
      logger.info('✅ MongoDB connected successfully');
      
      // Set up event listeners
      this.setupEventListeners();
      
      return this.connection;
    } catch (error) {
      logger.error('❌ MongoDB connection failed:', error.message);
      await this.handleReconnection(error);
    }
  }

  setupEventListeners() {
    const db = mongoose.connection;

    db.on('connected', () => {
      logger.info('🟢 MongoDB connected');
    });

    db.on('disconnected', () => {
      logger.warn('🔴 MongoDB disconnected');
    });

    db.on('reconnected', () => {
      logger.info('🔄 MongoDB reconnected');
      this.reconnectAttempts = 0;
    });

    db.on('error', (error) => {
      logger.error('🚨 MongoDB error:', error);
    });

    // Handle application termination
    process.on('SIGINT', async () => {
      await this.gracefulShutdown();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await this.gracefulShutdown();
      process.exit(0);
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', async (error) => {
      logger.error('Uncaught Exception:', error);
      await this.gracefulShutdown();
      process.exit(1);
    });

    process.on('unhandledRejection', async (reason, promise) => {
      logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
      await this.gracefulShutdown();
      process.exit(1);
    });
  }

  async handleReconnection(error) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      logger.error(`❌ Max reconnection attempts (${this.maxReconnectAttempts}) reached. Exiting...`);
      process.exit(1);
    }

    this.reconnectAttempts++;
    logger.warn(`🔄 Attempting to reconnect to MongoDB (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
    
    await this.delay(this.reconnectDelay);
    return this.connect();
  }

  async gracefulShutdown() {
    try {
      logger.info('🛑 Closing MongoDB connection...');
      await mongoose.connection.close();
      logger.info('✅ MongoDB connection closed gracefully');
    } catch (error) {
      logger.error('❌ Error closing MongoDB connection:', error);
    }
  }

  async healthCheck() {
    try {
      if (!this.connection || mongoose.connection.readyState !== 1) {
        throw new Error('MongoDB not connected');
      }

      // Perform a simple database operation
      await mongoose.connection.db.admin().ping();
      
      return {
        status: 'healthy',
        readyState: mongoose.connection.readyState,
        host: mongoose.connection.host,
        port: mongoose.connection.port,
        name: mongoose.connection.name
      };
    } catch (error) {
      logger.error('Database health check failed:', error);
      return {
        status: 'unhealthy',
        error: error.message,
        readyState: mongoose.connection.readyState
      };
    }
  }

  async getStats() {
    try {
      const db = mongoose.connection.db;
      const stats = await db.stats();
      
      return {
        collections: stats.collections,
        dataSize: stats.dataSize,
        storageSize: stats.storageSize,
        indexes: stats.indexes,
        indexSize: stats.indexSize,
        objects: stats.objects,
        avgObjSize: stats.avgObjSize
      };
    } catch (error) {
      logger.error('Failed to get database stats:', error);
      throw error;
    }
  }

  async createIndexes() {
    try {
      logger.info('🔍 Creating database indexes...');
      
      // Get all models and ensure indexes
      const models = mongoose.models;
      const promises = Object.values(models).map(async (model) => {
        try {
          await model.createIndexes();
          logger.info(`✅ Indexes created for ${model.modelName}`);
        } catch (error) {
          logger.error(`❌ Failed to create indexes for ${model.modelName}:`, error);
        }
      });

      await Promise.all(promises);
      logger.info('✅ All database indexes created successfully');
    } catch (error) {
      logger.error('❌ Failed to create database indexes:', error);
      throw error;
    }
  }

  async backup(options = {}) {
    try {
      const { path = './backups', collections = [] } = options;
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupName = `backup-${timestamp}`;
      
      logger.info(`📦 Starting database backup: ${backupName}`);
      
      // Use mongodump command (requires MongoDB tools)
      const { spawn } = require('child_process');
      const backupProcess = spawn('mongodump', [
        '--uri', config.database.url,
        '--out', `${path}/${backupName}`,
        ...(collections.length ? ['--collection'].concat(collections) : [])
      ]);

      return new Promise((resolve, reject) => {
        backupProcess.on('close', (code) => {
          if (code === 0) {
            logger.info(`✅ Database backup completed: ${backupName}`);
            resolve({
              success: true,
              backupName,
              path: `${path}/${backupName}`,
              timestamp
            });
          } else {
            reject(new Error(`Backup process exited with code ${code}`));
          }
        });

        backupProcess.on('error', reject);
      });
    } catch (error) {
      logger.error('❌ Database backup failed:', error);
      throw error;
    }
  }

  async restore(backupPath) {
    try {
      logger.info(`🔄 Starting database restore from: ${backupPath}`);
      
      const { spawn } = require('child_process');
      const restoreProcess = spawn('mongorestore', [
        '--uri', config.database.url,
        '--drop', // Drop existing collections before restoring
        backupPath
      ]);

      return new Promise((resolve, reject) => {
        restoreProcess.on('close', (code) => {
          if (code === 0) {
            logger.info('✅ Database restore completed successfully');
            resolve({ success: true });
          } else {
            reject(new Error(`Restore process exited with code ${code}`));
          }
        });

        restoreProcess.on('error', reject);
      });
    } catch (error) {
      logger.error('❌ Database restore failed:', error);
      throw error;
    }
  }

  async seedData() {
    try {
      logger.info('🌱 Seeding initial data...');
      
      // Import seed data files
      const seedFiles = [
        './seeds/admin-user.js',
        './seeds/sample-courses.js',
        './seeds/categories.js'
      ];

      for (const seedFile of seedFiles) {
        try {
          const seeder = require(seedFile);
          await seeder();
          logger.info(`✅ Seeded: ${seedFile}`);
        } catch (error) {
          logger.warn(`⚠️ Failed to seed ${seedFile}:`, error.message);
        }
      }
      
      logger.info('✅ Database seeding completed');
    } catch (error) {
      logger.error('❌ Database seeding failed:', error);
      throw error;
    }
  }

  async cleanup() {
    try {
      logger.info('🧹 Starting database cleanup...');
      
      const db = mongoose.connection.db;
      const collections = await db.listCollections().toArray();
      
      for (const collection of collections) {
        const collectionName = collection.name;
        
        // Skip system collections
        if (collectionName.startsWith('system.')) continue;
        
        // Clean up expired tokens, old logs, etc.
        if (collectionName === 'sessions') {
          await db.collection(collectionName).deleteMany({
            expires: { $lt: new Date() }
          });
        }
        
        if (collectionName === 'logs') {
          // Keep logs for 30 days
          const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
          await db.collection(collectionName).deleteMany({
            createdAt: { $lt: thirtyDaysAgo }
          });
        }
      }
      
      logger.info('✅ Database cleanup completed');
    } catch (error) {
      logger.error('❌ Database cleanup failed:', error);
      throw error;
    }
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getConnection() {
    return this.connection;
  }

  isConnected() {
    return mongoose.connection.readyState === 1;
  }

  getReadyState() {
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    return states[mongoose.connection.readyState] || 'unknown';
  }
}

// Export singleton instance
const databaseService = new DatabaseService();

// Export connect function for backward compatibility
const connectDatabase = () => databaseService.connect();

module.exports = {
  DatabaseService,
  connectDatabase,
  databaseService
};
