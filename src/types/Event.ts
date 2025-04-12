export type EventStatus = "available" | "limited" | "soldout";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  price: number;
  currency: string;
  category: string;
  status: EventStatus;
  organizer: {
    id: string;
    name: string;
    imageUrl?: string;
  };
  ticketsAvailable: number;
}
