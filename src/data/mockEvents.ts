import { Event } from "../types/Event";

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival",
    description:
      "The biggest music festival of the summer featuring top artists from around the world.",
    date: "2025-06-15",
    time: "12:00",
    location: "Jakarta Convention Center",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    price: 250,
    currency: "IDRX",
    category: "Music",
    status: "available",
    organizer: {
      id: "org1",
      name: "EventMaster Indonesia",
    },
    ticketsAvailable: 500,
  },
  {
    id: "2",
    title: "Tech Conference 2025",
    description:
      "Join the leading tech experts for a day of learning and networking.",
    date: "2025-07-25",
    time: "09:00",
    location: "Digital Hub Bandung",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    price: 150,
    currency: "IDRX",
    category: "Technology",
    status: "limited",
    organizer: {
      id: "org2",
      name: "TechTalks ID",
    },
    ticketsAvailable: 50,
  },
  {
    id: "3",
    title: "Blockchain Workshop",
    description:
      "Hands-on workshop to learn about blockchain technology and development.",
    date: "2025-08-10",
    time: "10:00",
    location: "Blockchain Center Jakarta",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    price: 100,
    currency: "IDRX",
    category: "Workshop",
    status: "available",
    organizer: {
      id: "org3",
      name: "Blockchain Indonesia",
    },
    ticketsAvailable: 100,
  },
  {
    id: "4",
    title: "Art Exhibition: Future Visions",
    description:
      "A showcase of futuristic art and digital creations from emerging artists.",
    date: "2025-09-05",
    time: "11:00",
    location: "Modern Gallery Surabaya",
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    price: 75,
    currency: "IDRX",
    category: "Art",
    status: "soldout",
    organizer: {
      id: "org4",
      name: "Creative Arts Network",
    },
    ticketsAvailable: 0,
  },
];
