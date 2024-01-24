import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Listener } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { CustomStrategy } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const options: CustomStrategy = {
    strategy: new Listener(
      'scheduleease' /* clusterID */,
      'qawsw' /* clientID */,
      'user-notifications-group',
      {
        url: 'nats://nats1-srv:4222',
        waitOnFirstConnect: true,
      },
      /* TransportConnectOptions */
      {
        durableName: 'notifications-user-service',
        manualAckMode: true,
        deliverAllAvailable: true,
      } /* TransportSubscriptionOptions */,
    ),
  };
  const meetingsListenerOptions: CustomStrategy = {
    strategy: new Listener(
      'scheduleease',
      'qawsw',
      'meetings-notifications-group',
      {
        url: 'nats://nats1-srv:4222',
        waitOnFirstConnect: true,
      },
      {
        durableName: 'notifications-meetings-service',
        manualAckMode: true,
        deliverAllAvailable: true,
      },
    ),
  };

  const microService = app.connectMicroservice(options);
  await app.startAllMicroservices();
  await app.listen(3000); 
}
bootstrap();
 