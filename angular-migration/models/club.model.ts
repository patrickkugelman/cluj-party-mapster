
export interface Club {
  id: string;
  name: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  activeParty: boolean;
  rating: number;
  openingHours: string;
  image?: string;
  musicGenres: string[];
  partyType: "Regular" | "Students" | "Themed" | "Live Music" | "EDM";
}
