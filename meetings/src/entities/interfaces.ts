export interface DepenteniciesData {
  useCases: useCaseData;
  repository: repositoryData;
}

export interface useCaseData {
  addMeeting_UseCase: any
  getAllMeetingGuest_UseCase: any
  getAllMeetingHost_UseCase: any
  getMeetingGuest_UseCase: any
  getMeetingHost_UseCase: any
  getUser_UseCase: any
  signUp_UseCase: any
  updateMeeting_UseCase:any
}

export interface repositoryData {
  userRepository: any;
  meetingRepository: any
}
