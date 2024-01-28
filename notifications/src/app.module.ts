import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { MeetingsModule } from './meetings/meetings.module';
import { NatsStreamingTransport } from '@nestjs-plugins/nestjs-nats-streaming-transport';

import { MongooseModule } from '@nestjs/mongoose';

@Module({  
  imports: [
    MongooseModule.forRoot('mongodb://notifications-mongo-srv/schedulease'),
    UserModule,
    MeetingsModule,
    NatsStreamingTransport.register({
      clusterId: 'scheduleease', // Specify the cluster ID
      clientId: 'qawsw',
      connectOptions: { 
        servers: ['nats://nats1-srv:4222'],
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
