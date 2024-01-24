import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Meeting extends Document {
  @Prop({ required: true })
  host: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  duration: string;

  @Prop({ required: true })
  dateOptions: string[];

  @Prop({ required: true })
  timeOptions: string[];

  @Prop({ required: true })
  guests: Array<{ email: string; isConfirmed: boolean }>;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ required: true })
  id: string;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
