import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meeting } from './meetings.model';
import { User } from 'src/users/user.model';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectModel(Meeting.name) private meetingModel: Model<Meeting>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async addMeeting(meeting: any): Promise<Meeting | null> {
    const mongooseObject = new this.meetingModel(meeting);
    return mongooseObject.save();
  }

  async getMeetingGuest(
    id: string | any = {},
    email: string,
  ): Promise<Meeting | null> {
    const meetings = await this.meetingModel.find(id).exec();
    return (
      meetings.find((m) => m.guests.some((g) => g.email === email)) || null
    );
  }

  async getMeetingSingle(id: string): Promise<Meeting | null> {
    const meeting = await this.meetingModel.findOne({ id }).exec()
    return meeting
  }

  async getMeetingHost(id: string, email: string): Promise<Meeting | null> {
    const meetings = await this.meetingModel.find({ _id: id }).exec();
    return meetings.find((m) => m.host === email) || null;
  }

  async getAllMeetingGuest(email: string): Promise<Meeting[]> {
    const meetings = await this.meetingModel.find().exec();
    return meetings.filter((m) => m.guests.some((g) => g.email === email));
  }

  async getAllMeetingHost(email: string): Promise<Meeting[]> {
    const meetings = await this.meetingModel.find().exec();
    return meetings.filter((m) => m.host === email);
  }
  async deleteAll(): Promise<any> {
    const deletedDocs = await this.meetingModel.deleteMany({});
    const deletedDocs2 = await this.userModel.deleteMany({});
    return deletedDocs
  }
}
