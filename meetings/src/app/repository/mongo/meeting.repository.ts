import mongoose from "mongoose";
import { Meeting } from "../../../entities/meeting";
import { Meeting as MeetingSchema } from "../../database/mongo/models/index";

const getMeetings = async (email?: string): Promise<Meeting[]> => {
  const mongooseObjects = await MeetingSchema.find(); // Assuming you have a companyId in your Meeting model
  return mongooseObjects;
}

export = { 
   
   addMeeting : async(meeting: Meeting): Promise<Meeting |null> => {
    const mongooseObject = MeetingSchema.build(meeting);
    return await mongooseObject.save();
   },
   getMeetingGuest : async (id: string | any = {}, email:string): Promise<Meeting | null> => {
    const meeting = await MeetingSchema.findOne({ _id:new mongoose.Types.ObjectId(id)});
    console.log("------getMeetingGuest--------",id,meeting);
    return meeting
  },
  
   getMeetingHost : async (id: string, email:string): Promise<Meeting | null> => {
    const meeting = await MeetingSchema.findOne({ _id:new mongoose.Types.ObjectId(id)});
    // console.log("------getAllMeetingHost--------",id,meeting);
    return meeting
  },
  
   getAllMeetingGuest : async (email: string): Promise<Meeting[]> => {
    const meetings = await getMeetings(email);
    console.log("------getAllMeetingGuest--------",email);
    return meetings.filter((m) => m.guests.some((g) => g.email === email));
  },
  getAllMeetingHost : async (email: string): Promise<Meeting[]> => {
    const meetings = await MeetingSchema.find({host:email})
    // console.log("------getAllMeetingHost--------",email);
    return meetings
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
  console.log(meeting,{ id, userId, dateOptions, timeOptions });
  
    return meeting || null;
  }
  
};