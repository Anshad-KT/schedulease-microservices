import e, { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@geekfindr/common";
import generateToken from "../../app/externalservice/jsonwebtoken";
import { UserRegisteredPublisher } from "../../events/publishers/user-registered-publisher";
import { natsWrapper } from "../../nats-wrapper";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { signUp_UseCase, getUser_UseCase },
  } = dependencies;
  
  const signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email } = req.body;
   
   
      if (!username) return res.status(400).json({msg:"Please provide a username"})
      if (!email) return res.status(400).json({msg:"Please provide a email"})
   
   
      
      const userPresent = await getUser_UseCase(dependencies).execute(email);

    
     
      if (userPresent) {
       
        
        res.json({msg:"something went wrong"})
      }else{
        const addedUser = await signUp_UseCase(dependencies).execute({
          username,
          email,
         
          
        }); 
   
        const token: any = generateToken(addedUser);
  
        req.session = {
          jwt: token,
          userDetails: addedUser,
        };
  
        await new UserRegisteredPublisher(natsWrapper.client).publish({
          id: addedUser!.id,
          email: addedUser!.email,
          username:addedUser!.username,
          version:addedUser!.version
        });
  
        return res.json({addedUser,jwt:token});
  
      }

      
      
    } catch (error: any) {
      return res.json({msg:"something went wrong"})
     
    }
  };
  return signUp;
};
