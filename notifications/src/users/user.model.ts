import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class User extends Document {
  @Prop()
  id: string;
  
  @Prop()
  email: string;

  @Prop()
  username: string;

}

export const UserSchema = SchemaFactory.createForClass(User);
