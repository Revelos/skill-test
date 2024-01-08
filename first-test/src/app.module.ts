import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailProfile } from './profiles/EmailProfile';

@Module({
  imports: [
    AutomapperModule.forRoot({
        strategyInitializer: classes(),
    }),
],
  controllers: [AppController],
  providers: [AppService,EmailProfile],
})
export class AppModule {}
