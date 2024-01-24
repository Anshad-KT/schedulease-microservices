import { Meeting, MeetingInstance } from "../../entities/meeting"
import { DepenteniciesData } from "../../entities/interfaces";

export const getAllMeetingHost_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { meetingRepository },
  } = dependencies;

  if (!meetingRepository)
    throw new Error("The user repository should be dependencie");

    const execute = (email:string) => {
   console.log(email,"undefiinnned");
   
    return meetingRepository.getAllMeetingHost(email);
  };
  return {
    execute,
  };
};
 