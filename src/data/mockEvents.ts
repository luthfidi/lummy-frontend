import { Event } from "../types/Event";

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Summer Music Festival",
    description:
      "The biggest music festival of the summer featuring top artists from around the world.",
    longDescription: `Get ready for the ultimate summer experience! The Summer Music Festival brings together the biggest names in music for an unforgettable weekend.

From pop to rock, hip-hop to electronic, this festival has something for everyone. Join thousands of music lovers from around the world for this celebration of sound.

Highlights include:
- 3 main stages with continuous performances
- Food and drink vendors offering local and international cuisine
- Artisan market with unique merchandise
- Chill-out zones for when you need a break
- Free water stations throughout the venue

Don't miss out on the biggest music event of the summer!`,
    date: "2025-06-15T12:00:00",
    time: "12:00 PM",
    endTime: "11:00 PM",
    location: "Jakarta Convention Center",
    venue: "Jakarta Convention Center Main Arena",
    address: "Jl. Gatot Subroto, Jakarta 10270, Indonesia",
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    price: 250,
    currency: "IDRX",
    category: "Music",
    status: "available",
    organizer: {
      id: "org1",
      name: "EventMaster Indonesia",
      verified: true,
      description:
        "Indonesia's premier event organizer, bringing world-class experiences to Jakarta since 2015.",
      website: "https://example.com",
      eventsHosted: 48,
    },
    ticketsAvailable: 500,
    ticketTiers: [
      {
        id: "tier1",
        name: "General Admission",
        price: 250,
        currency: "IDRX",
        description: "Standard festival access for one day",
        available: 300,
        maxPerPurchase: 4,
      },
      {
        id: "tier2",
        name: "VIP Pass",
        price: 500,
        currency: "IDRX",
        description:
          "Enhanced experience with premium viewing areas and complimentary refreshments",
        available: 100,
        maxPerPurchase: 2,
        benefits: [
          "Access to VIP viewing areas",
          "Complimentary food and drinks",
          "VIP restroom facilities",
          "Exclusive festival merchandise",
        ],
      },
      {
        id: "tier3",
        name: "Weekend Pass",
        price: 450,
        currency: "IDRX",
        description: "Full weekend access to all festival days",
        available: 150,
        maxPerPurchase: 4,
      },
      {
        id: "tier4",
        name: "Backstage Experience",
        price: 1000,
        currency: "IDRX",
        description: "The ultimate festival experience with backstage access",
        available: 0,
        maxPerPurchase: 2,
        benefits: [
          "All VIP benefits",
          "Backstage tour",
          "Artist meet & greet opportunity",
          "Exclusive backstage lounge access",
        ],
      },
    ],
    tags: ["music", "festival", "concert", "summer"],
  },
  {
    id: "2",
    title: "Tech Conference 2025",
    description:
      "Join the leading tech experts for a day of learning and networking.",
    longDescription: `Tech Conference 2025 brings together industry leaders, innovators, and tech enthusiasts for an immersive day of knowledge sharing and networking.

This year's conference focuses on emerging technologies including AI, blockchain, and the future of web development. Whether you're a seasoned professional or just starting your tech journey, you'll find valuable insights and connections.

Conference schedule includes:
- Keynote speeches from industry pioneers
- Technical workshops with hands-on experience
- Panel discussions on trending topics
- Networking sessions with like-minded professionals
- Exhibition area showcasing cutting-edge products

Don't miss this opportunity to stay ahead of the curve in the rapidly evolving tech landscape.`,
    date: "2025-07-25T09:00:00",
    time: "09:00 AM",
    endTime: "05:00 PM",
    location: "Digital Hub Bandung",
    venue: "Digital Hub Conference Center",
    address: "Jl. Dipati Ukur No. 112, Bandung 40132, Indonesia",
    imageUrl:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1712&q=80",
    price: 150,
    currency: "IDRX",
    category: "Technology",
    status: "limited",
    organizer: {
      id: "org2",
      name: "TechTalks ID",
      verified: true,
      description:
        "Dedicated to fostering tech innovation and knowledge sharing in Indonesia.",
      website: "https://example.com",
      eventsHosted: 24,
    },
    ticketsAvailable: 50,
    ticketTiers: [
      {
        id: "tier1",
        name: "Standard Access",
        price: 150,
        currency: "IDRX",
        description:
          "Full day access to all conference sessions and exhibition area",
        available: 30,
        maxPerPurchase: 5,
      },
      {
        id: "tier2",
        name: "Premium Access",
        price: 300,
        currency: "IDRX",
        description:
          "Enhanced experience with premium seating and exclusive workshops",
        available: 20,
        maxPerPurchase: 2,
        benefits: [
          "Priority seating in all sessions",
          "Access to exclusive workshops",
          "Lunch with speakers",
          "Digital copy of all presentations",
        ],
      },
      {
        id: "tier3",
        name: "Student Pass",
        price: 75,
        currency: "IDRX",
        description: "Discounted ticket for students with valid student ID",
        available: 0,
        maxPerPurchase: 1,
      },
    ],
    tags: ["technology", "conference", "networking", "education"],
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
      verified: true,
      description:
        "Leading the blockchain revolution in Indonesia through education and community building.",
      eventsHosted: 15,
    },
    ticketsAvailable: 100,
    ticketTiers: [
      {
        id: "tier1",
        name: "Workshop Ticket",
        price: 100,
        currency: "IDRX",
        description: "Full access to the workshop including materials",
        available: 80,
        maxPerPurchase: 3,
      },
      {
        id: "tier2",
        name: "Workshop + Certification",
        price: 200,
        currency: "IDRX",
        description:
          "Workshop access plus official certification upon completion",
        available: 50,
        maxPerPurchase: 1,
        benefits: [
          "Full workshop access",
          "Official certification",
          "Post-workshop support for 1 month",
          "Access to exclusive online resources",
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Art Exhibition: Future Visions",
    description:
      "A showcase of futuristic art and digital creations from emerging artists.",
    longDescription: `Step into the future of art with "Future Visions" - an immersive exhibition showcasing cutting-edge works from emerging and established digital artists.

This exhibition explores themes of technology, nature, humanity, and the intersection of physical and digital worlds. Through various mediums including digital paintings, interactive installations, and virtual reality experiences, artists present their visions of possible futures.

Exhibition highlights:
- 30+ artists from across Asia
- Interactive digital installations
- VR experience zone
- Artist talks and live demonstrations
- Limited edition digital collectibles available for purchase

This exhibition pushes the boundaries of traditional art and invites visitors to question, imagine, and engage with tomorrow's possibilities.`,
    date: "2025-09-05",
    time: "11:00 AM",
    endTime: "08:00 PM",
    location: "Modern Gallery Surabaya",
    venue: "Modern Gallery",
    address: "Jl. Pemuda No. 38, Surabaya 60271, Indonesia",
    imageUrl:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    price: 75,
    currency: "IDRX",
    category: "Art",
    status: "soldout",
    organizer: {
      id: "org4",
      name: "Creative Arts Network",
      verified: true,
      description:
        "Supporting and promoting digital artists throughout Indonesia and Southeast Asia.",
      website: "https://example.com",
      eventsHosted: 32,
    },
    ticketsAvailable: 0,
    ticketTiers: [
      {
        id: "tier1",
        name: "Standard Entry",
        price: 75,
        currency: "IDRX",
        description: "General admission to the exhibition",
        available: 0,
        maxPerPurchase: 5,
      },
      {
        id: "tier2",
        name: "Premium Experience",
        price: 150,
        currency: "IDRX",
        description: "Enhanced visit with guided tour and exclusive events",
        available: 0,
        maxPerPurchase: 2,
        benefits: [
          "Priority entry (skip the line)",
          "Guided tour with curator",
          "Invitation to exclusive artist talk",
          "Exhibition catalog",
        ],
      },
    ],
    tags: ["art", "exhibition", "digital", "futuristic"],
  },
];
