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

export interface MockMail {
  id: number;
  from: string;
  subject: string;
  date: string;
  body: string;
}

// src/lib/dashboardData.ts

export const mockMails: MockMail[] = [
  {
    id: 1,
    from: "alice@codeswift.com",
    subject: "Meeting Reminder: Sprint Planning",
    date: "2026-02-05",
    body: `Hi Team,

Just a quick reminder that our Sprint Planning session is scheduled for today at 10:00 AM.

Agenda:
1. Review previous sprint velocity
2. Estimate new tickets in the backlog
3. Assign tasks for the upcoming cycle
4. Discuss potential blockers

Please ensure your Jira boards are up to date before the meeting starts.

Best regards,
Alice`,
  },
  {
    id: 2,
    from: "bob.dev@codeswift.com",
    subject: "Project Update: Sidebar Refactor",
    date: "2026-02-04",
    body: `Hello,

I've completed the refactor of the Sidebar component. 

Key changes:
- Removed Zustand persist middleware as requested.
- Set the default state to collapsed.
- Updated the theme colors to use the new Lavender-Amethyst variables.
- Cleaned up the TypeScript interfaces for SidebarItems.

The changes are now live in the 'feature/sidebar-cleanup' branch. 
Please review the PR when you have a moment.

Thanks,
Bob`,
  },
  {
    id: 3,
    from: "charlie.support@codeswift.com",
    subject: "Call Schedule: Client Demo",
    date: "2026-02-03",
    body: `Hi everyone,

The client demo is officially confirmed for this Friday at 3:00 PM.

We need to showcase:
- The new dashboard layout.
- Real-time notification updates.
- The infinite scroll implementation in the notification center.

I will set up a dry run tomorrow afternoon to ensure everything is working smoothly.

Cheers,
Charlie`,
  },
  {
    id: 4,
    from: "david.manager@codeswift.com",
    subject: "New Task Assigned: Infinite Scroll",
    date: "2026-02-02",
    body: `Team,

A new high-priority task has been assigned regarding the Notifications page.

Requirements:
- Implement Infinite Scrolling using the Intersection Observer API.
- Show skeleton loaders during data fetching.
- Add a 1.5s artificial delay to simulate real-world network latency and show off the animations.
- Ensure it integrates with the existing search functionality.

Check the technical documentation in the 'docs' folder for the specific API endpoints.

Regards,
David`,
  },
  {
    id: 5,
    from: "eve.hr@codeswift.com",
    subject: "Weekly Report: Team Performance",
    date: "2026-02-01",
    body: `Dear Team,

Please find the weekly performance metrics report attached.

Summary:
- Productivity increased by 15% compared to last week.
- Bug resolution time has dropped significantly.
- High engagement on the new CodeSwift platform.

Keep up the great work! If you have any questions regarding the stats, feel free to reach out.

Best,
Eve`,
  },
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
