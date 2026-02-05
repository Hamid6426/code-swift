// export interface Message {
//   id: string;
//   from: string;
//   subject: string;
//   date: string;
//   timestamp: number;
// }

export interface Message {
  id: string;
  from: string;
  senderId: number;
  subject: string;
  date: string;
  timestamp: number;
}