import { User } from "../../database/mongo/models/index";



export = {
  signUp: async (user: any) => {
    const mongooseObject = User.build(user);
    return await mongooseObject.save();
  },

  getUser: async (email: string): Promise<any> => {
    const userList = await User.findOne({ email });
    return userList;
  },

  signIn: async (user: any) => {
    const existingUser: any = await User.findOne({ email: user.email });
    return existingUser;
  }

};
