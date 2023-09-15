import { Injectable, OnModuleInit } from '@nestjs/common';
import { MailService } from './mail/mail.service';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class TestConsumer implements OnModuleInit {
  constructor(
    private readonly mailService: MailService,
    private readonly consumerService: ConsumerService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topics: ['token'] },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            value: message.value.toString(),
            topic: topic.toString(),
            partition: partition.toString(),
          });

          this.mailService.sendUserConfirmation(message.value.toString())
        },
      },
    );
  }
}
