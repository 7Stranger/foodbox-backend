import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configs from './configs';
import { DatabaseModule } from './providers/db/db.module';
import { AdminModule } from './entities/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [() => configs],
      isGlobal: true,
    }),
    DatabaseModule,
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
