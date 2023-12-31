import {
  Kafka,
  Consumer,
  ConsumerSubscribeTopics,
  ConsumerRunConfig,
} from 'kafkajs';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost: 29092'],
  });
  private readonly consumers: Consumer[] = [];

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    const consumer = this.kafka.consumer({ groupId: 'nestjs-kafka' });

    await consumer.connect();
    await consumer.subscribe(topic);
    await consumer.run(config);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}