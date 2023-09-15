import { Module } from '@nestjs/common';
import { GoogleModule } from '../google/google.module';
import { MailModule } from '../mail/mail.module';
import { KafkaModule } from '../kafka/kafka.module';
import { TestConsumer } from '../test.consumer';

@Module({
  imports: [
    GoogleModule,
    MailModule,
    KafkaModule,
  ],
  controllers: [],
  providers: [TestConsumer],
})
export class AppModule {}
