import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EmailEvent, EmailEventList } from './class/EmailReceipt';
import { EmailDto } from './class';
import { EmailListDto } from './class/EmailListDto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/json")
  getJsonEmail(): EmailEventList {
    return this.appService.getJson();
  }

  @Get("/formattedData")
  getFormattedData() : EmailDto[] {
    return this.appService.getFormattedData();
  }

  @Post("transform")
  getFormattedJson(@Body() inputJson: EmailEventList) : EmailDto[]{
    return this.appService.getFormattedJson(inputJson);

  }
}
