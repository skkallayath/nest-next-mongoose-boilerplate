import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { AppModule } from './server/app.module';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);
  app.select(CommandModule).get(CommandService).exec();
})();
