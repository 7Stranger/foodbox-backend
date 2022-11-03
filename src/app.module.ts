import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configs from './configs';
import { DatabaseModule } from './providers/db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [() => configs],
      isGlobal: true,
    }),
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
