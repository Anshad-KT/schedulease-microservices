import { Meeting, MeetingInstance } from "../../entities/meeting"
import { DepenteniciesData } from "../../entities/interfaces";

export const getMeetingHost_UseCase = (dependencies: DepenteniciesData) => {
  const {
    repository: { meetingRepository },
  } = dependencies;

  if (!meetingRepository)
    throw new Error("The user repository should be dependencie");

    const execute = (id: string,email: string) => {
   
   
    return meetingRepository.getMeetingHost(id,email);
  };
  return {
    execute,
  };
};
