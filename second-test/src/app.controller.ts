import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getAttachedJson(@Query('filePathOrUrl') filePathOrUrl: string): any {
     return this.appService.getEmailAttachments(filePathOrUrl);
  }


}
