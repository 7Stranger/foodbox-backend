import * as path from 'path';
import { CommonService } from './entities/common/common.service';
import { EnvironmentEnum } from './entities/common/enums/environment.enum';

CommonService.basicInit();

const {
  NODE_ENV = EnvironmentEnum.production,
  SHOW_CONFIGS = 'true',
  PORT = '3000',
  DB_HOST = '192.168.68.112',
  DB_PORT = '5432',
  DB_USERNAME = 'foodbox',
  DB_PASSWORD = '111',
  DB_DATABASE = 'foodbox',
  ADMIN_SECRET_TOKEN = 'admin',
  MOBILE_ACCESS_SECRET = 'mobile-secret',
  MOBILE_REFRESH_SECRET = 'mobile-refresh',
} = process.env;

const configs: Record<string, any> = {
  env: {
    isProduction: NODE_ENV === EnvironmentEnum.production,
    isStaging: NODE_ENV === EnvironmentEnum.staging,
    isDevelopment: NODE_ENV === EnvironmentEnum.development,
    isTesting: NODE_ENV === EnvironmentEnum.testing,
    isLocal: NODE_ENV === EnvironmentEnum.local,
  },
  paths: {
    rootFolder: path.resolve(__dirname, '..'),
    resourcesFolder: path.resolve(__dirname, '..', 'resources'),
    seedsFolder: path.resolve(__dirname, 'providers', 'db', 'seeds'),
  },
  port: PORT,
  providers: {
    // http://docs.sequelizejs.com/
    db: {
      dialect: 'postgres',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      logging: false,
      timeout: 29 * 1000, // ms
      timezone: '+00:00',
      migrationStorageTableName: 'migrations',
      dialectOptions: {
        collate: 'utf8mb4_general_ci',
        charset: 'utf8mb4',
        timezone: '+00:00',
      },
      define: {
        charset: 'utf8mb4', // this charset is required for storing any special chars in DB
        underscored: true,
        timestamps: false,
        paranoid: false,
        freezeTableName: true,
      },
      pool: {
        max: 50, // maximum opened active connections to DB
        min: 2, // minimum opened active connections to DB
        idle: 60000, // after this time an inactive connection will be closed, ms
      },
    },
  },
  middlewares: {
    // https://www.npmjs.com/package/rate-limiter-flexible
    rateLimit: [
      {
        points: 20,
        duration: 1, // seconds
        blockDuration: 24 * 60 * 60, // seconds
      },
      {
        points: 50,
        duration: 10,
        blockDuration: 24 * 60 * 60,
      },
    ],
    // https://www.npmjs.com/package/cors
    cors: {
      whiteList: ['*'],
    },
    // https://docs.nestjs.com/security/authentication#jwt-functionality   and   https://github.com/nestjs/jwt/blob/master/README.md
    auth: {
      admin: {
        accessToken: {
          secretToken: ADMIN_SECRET_TOKEN,
          expiresIn: '7d',
        },
      },
      mobile: {
        accessToken: {
          secretToken: MOBILE_ACCESS_SECRET,
          expiresIn: '1h',
        },
        refreshToken: {
          secretToken: MOBILE_REFRESH_SECRET,
          expiresIn: '30d',
        },
      },
    },
  },
  
};

if (NODE_ENV === EnvironmentEnum.production || SHOW_CONFIGS === 'true') {
  // TODO: hide unsecure data
  console.info('-- SERVER CONFIGS --------------------------------');
  console.info(JSON.stringify(configs, null, 2));
  console.info('--------------------------------------------------');
}

export default configs;