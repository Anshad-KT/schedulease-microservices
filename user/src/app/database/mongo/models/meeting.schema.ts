import mongoose, { Document } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface MeetingAttrs {
  id:string
  host: string;
  title: string;
  duration: string;
  dateOptions: [string];
  timeOptions: [string];
  guests: [{
    email: string;
    isConfirmed: boolean;
  }];
}

interface MeetingModal extends mongoose.Model<MeetingDoc> {
  build(attrs: MeetingAttrs): MeetingDoc;
}

interface MeetingDoc extends Document {
  id:string
  host: string;
  title: string;
  duration: string;
  dateOptions: [string];
  timeOptions: [string];
  guests: [{
    email: string;
    isConfirmed: boolean;
  }];
  isCompleted: boolean
}

const MeetingSchema = new mongoose.Schema(
  {id: {
    type: String,
    required: true,
  },
    host: {
      type: String,
      required: true,
    },
    title: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
    dateOptions: [{
      type: String,
      required: true,
    }],
    timeOptions: [{
      type: String,
      required: true,
    }],
    guests: [{
      email: {
        type: String,
        required: true,
      },
      isConfirmed: {
        type: Boolean,
        required: true,
      },
    }],
    isCompleted: {
      type: Boolean,
      default:false
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

MeetingSchema.set("versionKey", "version");
MeetingSchema.plugin(updateIfCurrentPlugin);

MeetingSchema.statics.build = (attrs: MeetingAttrs) => {
  return new Meeting(attrs);
};

const Meeting = mongoose.model<MeetingDoc, MeetingModal>("Meeting", MeetingSchema);

export { Meeting };
