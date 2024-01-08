import { Injectable } from '@nestjs/common';
import { EmailEventList } from "./class/EmailReceipt";
import  jsonString  from './util/JsonInfo';
import { EmailDto, EmailEvent } from './class';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class AppService {

  constructor(@InjectMapper() private readonly classMapper: Mapper){}

  getHello(): string {
    return 'Hello World!';
  }

  getJson():EmailEventList{
    const emailEventList: EmailEventList = JSON.parse(jsonString);
    return emailEventList;
  }

  getFormattedData():EmailDto[]{
    const emailEventList: EmailEventList = JSON.parse(jsonString);
    const records:EmailEvent[] = [...emailEventList.Records];
    let emailDtoList:EmailDto[] = new Array();
    records.forEach((email)=>{
      const dto = this.classMapper.map(email, EmailEvent, EmailDto);
      emailDtoList.push(dto);
    })
    return emailDtoList;
  }

  getFormattedJson(inputJson:EmailEventList):EmailDto[]{
    const records:EmailEvent[] = [...inputJson.Records];
    let emailDtoList:EmailDto[] = new Array();
    records.forEach((email)=>{
      const dto = this.classMapper.map(email, EmailEvent, EmailDto);
      emailDtoList.push(dto);
    })
    return emailDtoList;
  }
}
