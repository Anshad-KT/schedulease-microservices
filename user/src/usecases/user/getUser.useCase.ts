import { UserData, User } from "../../entities/user";
import { DepenteniciesData } from "../../entities/interfaces";

export const getUser_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { userRepository },
  } = dependencies;

  if (!userRepository)
    throw new Error("The user repository should be dependencie");

  const execute = ( email:  string) => {
   
    return userRepository.getUser(email);
  };
  return {
    execute,
  };
};
