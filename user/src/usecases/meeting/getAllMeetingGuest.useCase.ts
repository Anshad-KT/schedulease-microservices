import { Meeting, MeetingInstance } from "../../entities/meeting"
import { DepenteniciesData } from "../../entities/interfaces";

export const getAllMeetingGuest_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { meetingRepository },
  } = dependencies;

  if (!meetingRepository)
    throw new Error("The user repository should be dependencie");

    const execute = (email:string) => {
   
    return meetingRepository.signUp(email);
  };
  return {
    execute,
  };
};
