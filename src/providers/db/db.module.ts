import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Model } from 'sequelize-typescript';
import { DatabaseService } from './db.service';
import configs from '../../configs';

// models
// import { UserAdminModel } from './models/UserAdmin.model';


const modelsArray: typeof Model[] = [
  
];

@Module({
  imports: [
    SequelizeModule.forRoot({
      ...configs.providers.db,
      models: modelsArray,
      autoLoadModels: true,
      synchronize: true,
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
