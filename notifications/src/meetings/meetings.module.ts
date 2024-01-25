import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Meeting, MeetingSchema } from './meetings.model';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import { EmailService } from 'src/email/email.service';
import { User, UserSchema } from 'src/users/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [MeetingsController],
  providers: [MeetingsService, EmailService],
})
export class MeetingsModule {}
  