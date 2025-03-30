
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

// Enhanced club data with music genres and party types
export const clubData: Club[] = [
  {
    id: "1",
    name: "NOA Club & Restaurant",
    description: "Upscale club with a great atmosphere and music.",
    address: "Str. Republicii 109, Cluj-Napoca",
    lat: 46.7688,
    lng: 23.5994,
    activeParty: true,
    rating: 4.5,
    openingHours: "22:00 - 05:00",
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=1000",
    musicGenres: ["House", "Pop", "Commercial"],
    partyType: "Regular"
  },
  {
    id: "2",
    name: "Form Space",
    description: "Popular venue for electronic music events.",
    address: "Str. Horea 4, Cluj-Napoca",
    lat: 46.7710,
    lng: 23.5794,
    activeParty: true,
    rating: 4.7,
    openingHours: "23:00 - 06:00",
    image: "https://images.unsplash.com/photo-1574391573318-e3bcd4fa44b9?auto=format&fit=crop&q=80&w=1000",
    musicGenres: ["Techno", "EDM", "Drum and Bass"],
    partyType: "EDM"
  },
  {
    id: "3",
    name: "Phi18",
    description: "Trendy rooftop club with amazing views of the city.",
    address: "Str. Piezisa 18, Cluj-Napoca",
    lat: 46.7639,
    lng: 23.5625,
    activeParty: false,
    rating: 4.3,
    openingHours: "21:00 - 04:00",
    image: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&q=80&w=1000",
    musicGenres: ["R&B", "Hip Hop", "Reggaeton"],
    partyType: "Themed"
  },
  {
    id: "4",
    name: "After Eight",
    description: "One of the oldest and most popular clubs in Cluj.",
    address: "Str. Brassai Sámuel 12, Cluj-Napoca",
    lat: 46.7702,
    lng: 23.5837,
    activeParty: true,
    rating: 4.2,
    openingHours: "22:00 - 05:00",
    image: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=1000",
    musicGenres: ["Retro", "80s", "90s", "2000s"],
    partyType: "Students"
  },
  {
    id: "5",
    name: "Flying Circus",
    description: "Pub and club with live music and great atmosphere.",
    address: "Str. Cardinals Iuliu Hossu 2, Cluj-Napoca",
    lat: 46.7699,
    lng: 23.5876,
    activeParty: false,
    rating: 4.4,
    openingHours: "20:00 - 03:00",
    image: "https://images.unsplash.com/photo-1583244532610-9ddb18af77b2?auto=format&fit=crop&q=80&w=1000",
    musicGenres: ["Rock", "Indie", "Alternative"],
    partyType: "Live Music"
  },
  {
    id: "6",
    name: "Gazette Cluj",
    description: "Contemporary club with a diverse music selection.",
    address: "Str. Iuliu Maniu 5, Cluj-Napoca",
    lat: 46.7692,
    lng: 23.5902,
    activeParty: true,
    rating: 4.1,
    openingHours: "22:00 - 05:00",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000",
    musicGenres: ["Disco", "Funk", "Dance"],
    partyType: "Regular"
  },
  {
    id: "7",
    name: "Club Midi",
    description: "Famous for electronic music and international DJs.",
    address: "Str. Bariţiu 26, Cluj-Napoca",
    lat: 46.7732,
    lng: 23.5863,
    activeParty: true,
    rating: 4.8,
    openingHours: "23:00 - 06:00",
    image: "https://images.unsplash.com/photo-1551818905-29c07d4802d0?auto=format&fit=crop&q=80&w=1000",
    musicGenres: ["Techno", "House", "Minimal"],
    partyType: "EDM"
  }
];

// Group clubs by music genre for horizontal scrolling sections
export const getClubsByMusicGenre = () => {
  const genresMap: Record<string, Club[]> = {};
  
  clubData.forEach(club => {
    club.musicGenres.forEach(genre => {
      if (!genresMap[genre]) {
        genresMap[genre] = [];
      }
      genresMap[genre].push(club);
    });
  });
  
  return Object.entries(genresMap)
    .map(([genre, clubs]) => ({
      genre,
      clubs
    }))
    .sort((a, b) => a.genre.localeCompare(b.genre));
};

// Group clubs by party type for horizontal scrolling sections
export const getClubsByPartyType = () => {
  const partyTypesMap: Record<string, Club[]> = {};
  
  clubData.forEach(club => {
    if (!partyTypesMap[club.partyType]) {
      partyTypesMap[club.partyType] = [];
    }
    partyTypesMap[club.partyType].push(club);
  });
  
  return Object.entries(partyTypesMap)
    .map(([partyType, clubs]) => ({
      partyType,
      clubs
    }))
    .sort((a, b) => a.partyType.localeCompare(b.partyType));
};
