import { UserData, User } from "../../entities/user";
import { DepenteniciesData } from "../../entities/interfaces";

export const signUp_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { userRepository },
  } = dependencies;

  if (!userRepository)
    throw new Error("The user repository should be dependencie");

  const execute = ({ username, email }: UserData) => {
    const user = new User({ username,  email });
    return userRepository.signUp(user);
  };
  return {
    execute,
  };
};
