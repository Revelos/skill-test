import { Mapper, createMap, forMember, mapFrom } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { EmailEvent, Receipt } from '../class/EmailReceipt';
import { EmailDto } from '../class/EmailDto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailProfile extends AutomapperProfile {
  
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  
  override get profile() {
    return (mapper)=>
      createMap(mapper, EmailEvent, EmailDto,
    
        forMember((desti)=> desti.spam,mapFrom((source)=>source.ses.receipt.spamVerdict.status==='PASS')),
        forMember((desti)=> desti.virus,mapFrom((source)=>source.ses.receipt.virusVerdict.status==='PASS')),
        forMember((desti)=> desti.dns,mapFrom((source)=>allVerdictsPass(source.ses.receipt))),
        forMember((desti)=> desti.mes,mapFrom((source)=>new Date(source.ses.mail.timestamp).toLocaleString("default", { month: "long" }))),
        forMember((desti)=> desti.retrasado,mapFrom((source)=>checkDelay(source.ses.receipt.processingTimeMillis))),
        forMember((desti)=> desti.emisor,mapFrom((source)=>source.ses.mail.source.split("@")[0])),
        forMember((desti)=> desti.receptor,mapFrom((source)=>getDestinationNames(source.ses.mail.destination)))
        
        );
    
  }
}
function allVerdictsPass(receipt:Receipt): boolean {
  return receipt.spfVerdict.status === 'PASS' && receipt.dkimVerdict.status === 'PASS' && receipt.dmarcVerdict.status === 'PASS';
}
function checkDelay(delay:number):boolean{
  return delay>1000;
}
function getDestinationNames(emails:String[]):string[]{
  return emails.map(email => email.split("@")[0])
}
