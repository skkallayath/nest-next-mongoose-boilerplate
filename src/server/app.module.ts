import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { CommandModule } from 'nestjs-command';
import { strategies } from './auth';
import { commands } from './commands';
import { loadConfig, validateConfig } from './config';
import { entities } from './entities';
import { controllers, services } from './module';
import { ViewModule } from './view/view.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadConfig],
      cache: true,
      validate: validateConfig,
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({ store: 'memory' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URL'),
        keepAlive: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        family: 4, // Use IPv4, skip trying IPv6
        useUnifiedTopology: true, // use the MongoDB driver's new connection management engine
        poolSize: 10,
      }),
      inject: [ConfigService],
    }),
    ViewModule,
    MongooseModule.forFeature(entities),
    CommandModule,
  ],
  controllers,
  providers: [...services, ...commands, ...strategies],
})
export class AppModule {}
