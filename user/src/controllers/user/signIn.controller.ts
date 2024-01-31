import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@geekfindr/common";
import generateToken from "../../app/externalservice/jsonwebtoken";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { signIn_UseCase },
  } = dependencies;

  const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username } = req.body;

      if (!email) return res.status(500).json({msg:"No email present"})


      const addedUser = await signIn_UseCase(dependencies).execute({
        email,
        username,
      });

      if (!addedUser){
        return  res.json({msg:"error"})
         
       
      }else{
        const token: any = generateToken(addedUser);

        req.session = {
          jwt: token,
          userDetails: addedUser,
        };
  
        return  res.json({addedUser,jwt:token});
      } 

      
    } catch (error: any) {
      console.log(error);
      
      return  res.json({msg:"something went wrong"})
    }
  };
  return signIn;
};
