import { Request, Response, NextFunction } from "express";
import { BadRequestError, NotAuthorizedError } from "@intellectx/build";
import generateToken from "../../app/externalservice/jsonwebtoken";
import { DepenteniciesData } from "../../entities/interfaces";

export = (dependencies: DepenteniciesData): any => {
  const {
    useCases: { signIn_UseCase },
  } = dependencies;

  const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username } = req.body;

      if (!email) throw new BadRequestError("Please provide a email");


      const addedUser = await signIn_UseCase(dependencies).execute({
        email,
        username,
      });

      if (!addedUser){
        res.json({msg:"error"})
            throw new BadRequestError("Invalid Credentials");
       
      }else{
        const token: any = generateToken(addedUser);

        req.session = {
          jwt: token,
          userDetails: addedUser,
        };
  
        res.json({addedUser,jwt:token});
      } 

      
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return signIn;
};
