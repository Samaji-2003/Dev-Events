export type Events = {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: Events[] = [
  { title: "Tech Conference", image: "/images/event1.png", slug: "react-summit-us-2026", location: "San Francisco, CA", date: "2023-10-15", time: "09:00 AM" },
  { title: "Workshop", image: "/images/event2.png", slug: "typescript-workshop", location: "New York, NY", date: "2023-11-20", time: "02:00 PM" },
  { title: "Hackathon", image: "/images/event3.png", slug: "fullstack-hackathon", location: "Austin, TX", date: "2023-12-05", time: "08:00 AM" },
  { title: "Meetup", image: "/images/event4.png", slug: "frontend-meetup", location: "Seattle, WA", date: "2024-01-10", time: "06:00 PM" },
  { title: "Summit", image: "/images/event5.png", slug: "devops-summit", location: "Los Angeles, CA", date: "2024-02-15", time: "10:00 AM" }
];