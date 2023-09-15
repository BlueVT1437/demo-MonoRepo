import { NestFactory } from "@nestjs/core";
import { Transport } from "@nestjs/microservices";
import { AppModule } from "./app/app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: "127.0.0.1",
      port: 8888
    }
  });

	await app.startAllMicroservices()
  app.listen(4000);
}
bootstrap();