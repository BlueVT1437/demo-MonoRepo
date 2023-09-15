import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { MailService } from '../mail/mail.service';

@Module({
	imports: [],
  providers: [ConsumerService, MailService],
  exports: [ConsumerService],
})
export class KafkaModule {}
