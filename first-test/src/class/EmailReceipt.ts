import { AutoMap } from "@automapper/classes";

export class Status {
  @AutoMap()
  status: string;
}

export class CommonHeaders{
  @AutoMap()
  returnPath: string;
  @AutoMap(()=>[String])
  from: string[];
  @AutoMap()
  date: string;
  @AutoMap(()=>[String])
  to: string[];
  @AutoMap()
  messageId: string;
  @AutoMap()
  subject: string;
}

export class ActionDetail {
  @AutoMap()
  type: string;
  @AutoMap()
  topicArn: string;
}

export class Headers{
  @AutoMap()
  name: string;
  @AutoMap()
  value: string;
}

export class MailDetail {
  @AutoMap()
  timestamp: string;
  @AutoMap()
  source: string;
  @AutoMap()
  messageId: string;
  @AutoMap(() => [String])
  destination: string[];
  @AutoMap()
  headersTruncated: boolean;
  @AutoMap(()=>[Headers])
  headers: Headers[];
  @AutoMap(()=>CommonHeaders)
  commonHeaders: CommonHeaders;
}
export class Receipt {
  @AutoMap()
  timestamp: string;
  @AutoMap()
  processingTimeMillis: number;
  @AutoMap(()=>[String])
  recipients: string[];
  @AutoMap(() => Status)
  spamVerdict: Status;
  @AutoMap(() => Status)
  virusVerdict: Status;
  @AutoMap(() => Status)
  spfVerdict: Status;
  @AutoMap(() => Status)
  dkimVerdict: Status;
  @AutoMap(() => Status)
  dmarcVerdict: Status;
  @AutoMap()
  dmarcPolicy: string;
  @AutoMap(() => ActionDetail)
  action: ActionDetail;
}

export class Ses {
  @AutoMap(() => Receipt)
  receipt: Receipt;
  @AutoMap(() => MailDetail)
  mail: MailDetail;
}

export class EmailEvent {
  @AutoMap()
  eventVersion: string;
  @AutoMap(() => Ses)
  ses: Ses;
  @AutoMap()
  eventSource: string;
}

export class EmailEventList {
  @AutoMap(()=>[EmailEvent])
  Records: EmailEvent[];
}
