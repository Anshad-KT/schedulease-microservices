import mongoose from "mongoose";
import { Meeting } from "../../../entities/meeting";
import { Meeting as MeetingSchema } from "../../database/mongo/models/index";

const getMeetings = async (id?: string): Promise<Meeting[]> => {
  const mongooseObjects = await MeetingSchema.find({ _id:id }); // Assuming you have a companyId in your Meeting model
  return mongooseObjects;
}

export = { 
   
   addMeeting : async(meeting: Meeting): Promise<Meeting |null> => {
    const mongooseObject = MeetingSchema.build(meeting);
    return await mongooseObject.save();
   },
   getMeetingGuest : async (id: string | any = {}, email:string): Promise<Meeting | null> => {
    const meeting = await getMeetings(id);
    return meeting.find((m) => m.guests.some((g) => g.email === email)) || null;
  },
  
   getMeetingHost : async (id: string, email:string): Promise<Meeting | null> => {
    const meeting = await getMeetings(id);
    return meeting.find((m) => m.host === email) || null;
  },
  
   getAllMeetingGuest : async (email: string): Promise<Meeting[]> => {
    const meetings = await getMeetings();
    return meetings.filter((m) => m.guests.some((g) => g.email === email));
  },
  
   getAllMeetingHost : async (email: string): Promise<Meeting[]> => {
    const meetings = await getMeetings();
    return meetings.filter((m) => m.host === email);
   },
   confirmMeeting: async ({ id, userId, dateOptions, timeOptions }: { id: string, userId: string, dateOptions: string, timeOptions: string }): Promise<Meeting | null> => {
    const meeting = await MeetingSchema.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: {
          dateOptions: [dateOptions],
          timeOptions: [timeOptions],
        },
      },
      { new: true }
    );
  
    return meeting || null;
  }
  
};