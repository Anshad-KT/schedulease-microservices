import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { UsersService } from './user.service';
export enum Patterns {
  UserCreated = 'user:created',
}
export interface UserCreatedEvent {
  id: number;
  email: string;
  username: string;
}

@Controller()
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @EventPattern(Patterns.UserCreated)
  public async stationCreatedHandler(
    @Payload() data: { email: number; username: string; id: string },
    @Ctx() context: NatsStreamingContext,
  ) {
    await this.userService.createUser(data);
    context.message.ack();
    console.log('user:created -acked');
  }
}
