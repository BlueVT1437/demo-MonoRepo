import { UserModule } from '../users/user.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodosModule } from '../todos/todos.module';
import { Todo } from '../todos/todos.entity';
import { User } from '../auth/auth.entity';
import middeware1 from '../middlewares/middeware1';
import { Role } from '../roles/role.entity';
import { RoleModule } from '../roles/role.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from '../auth/auth.module';
import { PermissionModule } from '../permissions/permission.module';
import { Permission } from '../permissions/permission.entity';
import { KafkaModule } from '../kafka/kafka.module';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './roles/roles.guard';

config();

@Module({
  imports: [
    TodosModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '1234',
        database: 'student',
        entities: [Todo, User, Role, Permission],
        synchronize: true, // should use false
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    RoleModule,
    UserModule,
    KafkaModule,
    PermissionModule,
    ClientsModule.register([
      {
        name: 'AUTH_MICROSERVICE',
        transport: Transport.TCP,
        options: {
          host: "127.0.0.1",
          port: 8888
        }
      },
    ]),
  ],
  controllers: [],
  // providers: [AppService, { provide: APP_GUARD, useClass: RolesGuard }], apply Role for all module
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(middeware1)
      .forRoutes('*');
  }
}
