import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // перенести дані до .env та розібратись як їх отримувати коректно
      type: 'postgres', 
      host: '************',   
      port: 5432,                 
      username: '********',  
      password: '********', 
      database: '********',     
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,          
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
