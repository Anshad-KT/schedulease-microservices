import { UserData, User } from "../../entities/user";
import { DepenteniciesData } from "../../entities/interfaces";

export const signIn_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { userRepository },
  } = dependencies;
  
  if (!userRepository)
    throw new Error("The user repository should be dependenciew i guess");

  const execute = ({ username, email }: UserData) => {
    console.log("klop");
    
    const userCredential = { username, email };
    return userRepository.signIn(userCredential);
  };
  return {
    execute,
  };
};
