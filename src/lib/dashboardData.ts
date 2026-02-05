// src/lib/dashboard-data.ts
export type UserStat = {
  id: number;
  name: string;
  email: string;
  status: "active" | "inactive";
};

export type CallLog = {
  id: number;
  user: string;
  type: "incoming" | "outgoing" | "missed";
  duration: string;
  date: string;
};

export type MockMessage = {
  id: number;
  from: string;
  subject: string;
  date: string;
};

export type Message = {
  id: string;
  from: string;
  subject: string;
  date: string;
};

export const userStats: UserStat[] = [
  { id: 1, name: "Alice", email: "alice@test.com", status: "active" },
  { id: 2, name: "Bob", email: "bob@test.com", status: "inactive" },
  { id: 3, name: "Charlie", email: "charlie@test.com", status: "active" },
  { id: 4, name: "David", email: "david@test.com", status: "inactive" },
  { id: 5, name: "Eve", email: "eve@test.com", status: "active" },
  { id: 6, name: "Frank", email: "frank@example.com", status: "inactive" },
  { id: 7, name: "Grace", email: "grace@example.com", status: "inactive" },
  { id: 8, name: "Hannah", email: "hannah@example.com", status: "inactive" },
  { id: 9, name: "Ian", email: "ian@example.com", status: "active" },
  { id: 10, name: "Jane", email: "jane@example.com", status: "inactive" },
  { id: 11, name: "Kevin", email: "kevin@example.com", status: "inactive" },
  { id: 12, name: "Laura", email: "laura@example.com", status: "active" },
];

export const callLogs: CallLog[] = [
  {
    id: 1,
    user: "Alice",
    type: "incoming",
    duration: "00:03:12",
    date: "2026-02-05",
  },
  {
    id: 2,
    user: "Bob",
    type: "missed",
    duration: "00:00:00",
    date: "2026-02-04",
  },
  {
    id: 3,
    user: "Charlie",
    type: "outgoing",
    duration: "00:10:05",
    date: "2026-02-03",
  },
  {
    id: 4,
    user: "David",
    type: "incoming",
    duration: "00:05:33",
    date: "2026-02-02",
  },
  {
    id: 5,
    user: "Eve",
    type: "outgoing",
    duration: "00:08:20",
    date: "2026-02-01",
  },
];

export const messages: MockMessage[] = [
  { id: 1, from: "Alice", subject: "Meeting Reminder", date: "2026-02-05" },
  { id: 2, from: "Bob", subject: "Project Update", date: "2026-02-04" },
  { id: 3, from: "Charlie", subject: "Call Schedule", date: "2026-02-03" },
  { id: 4, from: "David", subject: "New Task Assigned", date: "2026-02-02" },
  { id: 5, from: "Eve", subject: "Weekly Report", date: "2026-02-01" },
];

export const chat = [
  { id: 1, from: "Alice", subject: "Hey, how are you?", date: "10:00 AM" },
  { id: 2, from: "Me", subject: "I'm good, thanks!", date: "10:02 AM" },
  { id: 3, from: "Alice", subject: "Wanna grab lunch?", date: "10:05 AM" },
  { id: 4, from: "Me", subject: "Sure, sounds good.", date: "10:07 AM" },
  { id: 5, from: "Alice", subject: "Cool, see you at 12.", date: "10:08 AM" },
  { id: 6, from: "Me", subject: "See you!", date: "10:09 AM" },
  {
    id: 7,
    from: "Alice",
    subject: "By the way, did you check the report?",
    date: "10:10 AM",
  },
  { id: 8, from: "Me", subject: "Yes, looks fine.", date: "10:12 AM" },
  { id: 9, from: "Alice", subject: "Great!", date: "10:13 AM" },
  { id: 10, from: "Me", subject: "Thanks for checking in.", date: "10:15 AM" },
];
