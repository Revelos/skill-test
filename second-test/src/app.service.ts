import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';

const readFile = util.promisify(fs.readFile);

@Injectable()
export class AppService {
  async getEmailAttachments(filePathOrUrl: string): Promise<any> {
    const emailContent = await this.readEmailContent(filePathOrUrl);
    const simpleParser = require('mailparser').simpleParser;

    return new Promise((resolve) => {
      simpleParser(emailContent)
        .then(parsed => {
          for (const attachment of parsed.attachments) {
            if (attachment.contentType === 'application/json') {
              const jsonData = JSON.parse(attachment.content.toString('utf-8'));
            
              resolve(jsonData)
            }
          }
        })
        .catch(err => {
          throw new NotFoundException('Email not found.' + err.getMessage());
        });

    });
  }

  private readEmailContent(filePathOrUrl: string): Promise<string> {
  
    return readFile(filePathOrUrl, 'utf-8').catch(err =>{
      throw new NotFoundException('No found any file in that path or url')
    });
  }
}
