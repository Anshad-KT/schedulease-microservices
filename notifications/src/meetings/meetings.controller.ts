import { NatsStreamingContext } from '@nestjs-plugins/nestjs-nats-streaming-transport';
import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { MeetingsService } from './meetings.service';
import { EmailService } from 'src/email/email.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.model';
import { Meeting } from './meetings.model';
export enum Patterns {
  UserCreated = 'user:created',
  MeetingsCreated = 'meeting:created',
  MeetingsUpdated = 'meeting:updated',
}
export interface MeetingsCreatedEvent {
  id: string;
  host: string;
  title: string;
  duration: string;
  dateOptions: string[];
  timeOptions: string[];
  guests: Array<{ email: string; isConfirmed: boolean }>;
  isCompleted: boolean;
}

@Controller()
export class MeetingsController {
  constructor(
    private readonly meetingService: MeetingsService,
    private readonly emailService: EmailService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Meeting.name) private meetingModel: Model<Meeting>
  ) {}

  @EventPattern(Patterns.MeetingsCreated)
  public async meetingsCreatedHandler(
    @Payload()
    data: {
      id: string;
      host: string;
      title: string;
      duration: string;
      dateOptions: string[];
      timeOptions: string[];
      guests: Array<{ email: string; isConfirmed: boolean }>;
      isCompleted: boolean;
    },
    @Ctx() context: NatsStreamingContext,
  ) {
    await this.meetingService.addMeeting(data);

    data.guests.map(async (item, index) => {
      console.log(item);
      if (index == 0) {
        await this.emailService.sendMail(
          item.email,
          'Confirm Meeting',
          data.id,
          data,
          data.dateOptions,
          data.timeOptions,
        );
      }
    });

    context.message.ack();
    console.log('meeting:created -acked');
  }

  @EventPattern(Patterns.MeetingsUpdated)
  public async meetingsUpdatedHandler(
    @Payload()
    data: {
      id: string;
      userId: string;
      dateOptions: [string];
      timeOptions: [string];
    },
    @Ctx() context: NatsStreamingContext,
  ) {
    const meetingDoc = await this.meetingService.getMeetingSingle(data.id);
    meetingDoc.guests.map(async (item) => {
      console.log(item);

      await this.emailService.sendMail(
        item.email,
        'New Meeting Scheduled',
        meetingDoc.id,
        meetingDoc,
        meetingDoc.dateOptions,
        meetingDoc.timeOptions,
      );
    });
    await this.emailService.sendMail(
      meetingDoc.host,
      'New Meeting Scheduled',
      meetingDoc.id,
      meetingDoc,
      meetingDoc.dateOptions,
      meetingDoc.timeOptions,
    );
    context.message.ack();
    console.log('meeting:created -acked');
  }
  @Get('/')
  public async getMeetingById(): Promise<any> {
    const meeting = await this.userModel.deleteMany({});
    const meetingDeleted = await this.meetingModel.deleteMany({});
    console.log('deleted');
    return meeting;
  }
}
