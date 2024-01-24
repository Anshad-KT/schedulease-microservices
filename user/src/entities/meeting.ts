export interface Meeting {
  id:string
  host: string;
  title: string;
  duration: string;
  dateOptions: [string];
  timeOptions: [string];
  guests: [{
    email: string;
    isConfirmed: boolean;
  }];
  isCompleted:boolean
}

export class MeetingInstance {
  id:string
  host: string;
  title: string;
  duration: string;
  dateOptions: [string];
  timeOptions: [string];
  guests: [{
    email: string;
    isConfirmed: boolean;
  }];
  isCompleted:boolean

  constructor({
    title,
    timeOptions,
    dateOptions,
    duration,
    guests,
    host,
    id,
    isCompleted
  }: Meeting) {
    this.id = id
    this.host = host
    this.title = title
    this.duration = duration
    this.dateOptions = dateOptions
    this.timeOptions = timeOptions
    this.guests = guests
    this.isCompleted =isCompleted
  }
}
