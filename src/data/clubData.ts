
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
    activeParty: true,
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
  },
  // New clubs on strada Piezisa
  {
    id: "8",
    name: "Euphoria Lounge",
    description: "Modern club with stunning panoramic views of Cluj.",
    address: "Str. Piezisa 2, Cluj-Napoca",
    lat: 46.7642,
    lng: 23.5618,
    activeParty: true,
    rating: 4.6,
    openingHours: "22:00 - 06:00",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1000",
    musicGenres: ["House", "Electronic", "Pop"],
    partyType: "Regular"
  },
  {
    id: "9",
    name: "Piezisa Social Club",
    description: "Trendy bar and club with open terrace and great cocktails.",
    address: "Str. Piezisa 10, Cluj-Napoca",
    lat: 46.7637,
    lng: 23.5621,
    activeParty: true,
    rating: 4.4,
    openingHours: "20:00 - 04:00",
    image: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=1000",
    musicGenres: ["Funk", "Soul", "Disco"],
    partyType: "Regular"
  },
  {
    id: "10",
    name: "Skyline Club",
    description: "Exclusive rooftop club with premium service and amazing views.",
    address: "Str. Piezisa 14, Cluj-Napoca",
    lat: 46.7635,
    lng: 23.5628,
    activeParty: false,
    rating: 4.9,
    openingHours: "21:00 - 05:00",
    image: "https://images.unsplash.com/photo-1578736641330-3155e606cd40?auto=format&fit=crop&q=80&w=1000",
    musicGenres: ["Deep House", "Lounge", "Ambient"],
    partyType: "Themed"
  },
  {
    id: "11",
    name: "Vertigo Bar",
    description: "High-energy club popular with students and young professionals.",
    address: "Str. Piezisa 20, Cluj-Napoca",
    lat: 46.7631,
    lng: 23.5632,
    activeParty: true,
    rating: 4.2,
    openingHours: "22:30 - 05:30",
    image: "https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?auto=format&fit=crop&q=80&w=1000",
    musicGenres: ["Hip Hop", "Trap", "R&B"],
    partyType: "Students"
  },
  {
    id: "12",
    name: "Piezisa Live",
    description: "Intimate venue featuring live music performances every night.",
    address: "Str. Piezisa 23, Cluj-Napoca",
    lat: 46.7628,
    lng: 23.5635,
    activeParty: false,
    rating: 4.7,
    openingHours: "19:00 - 02:00",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5463ebf?auto=format&fit=crop&q=80&w=1000",
    musicGenres: ["Jazz", "Blues", "Acoustic"],
    partyType: "Live Music"
  },
  {
    id: "13",
    name: "Techno Bunker",
    description: "Underground club dedicated to electronic music enthusiasts.",
    address: "Str. Piezisa 27, Cluj-Napoca",
    lat: 46.7626,
    lng: 23.5638,
    activeParty: true,
    rating: 4.5,
    openingHours: "23:00 - 07:00",
    image: "https://images.unsplash.com/photo-1581325649603-7367f6280d5e?auto=format&fit=crop&q=80&w=1000",
    musicGenres: ["Techno", "Minimal", "Industrial"],
    partyType: "EDM"
  },
  {
    id: "14",
    name: "Sunset Lounge",
    description: "Relaxed atmosphere with sunset views and quality music.",
    address: "Str. Piezisa 31, Cluj-Napoca",
    lat: 46.7622,
    lng: 23.5642,
    activeParty: false,
    rating: 4.3,
    openingHours: "18:00 - 02:00",
    image: "https://images.unsplash.com/photo-1603766806347-25e4b5e3d7f3?auto=format&fit=crop&q=80&w=1000",
    musicGenres: ["Chill", "Lounge", "Acoustic"],
    partyType: "Regular"
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

// Search function to filter clubs by name, description, etc.
export const searchClubs = (searchTerm: string): Club[] => {
  if (!searchTerm.trim()) {
    return clubData;
  }
  
  const lowerCaseSearch = searchTerm.toLowerCase();
  
  return clubData.filter(club => 
    club.name.toLowerCase().includes(lowerCaseSearch) ||
    club.description.toLowerCase().includes(lowerCaseSearch) ||
    club.address.toLowerCase().includes(lowerCaseSearch) ||
    club.musicGenres.some(genre => genre.toLowerCase().includes(lowerCaseSearch)) ||
    club.partyType.toLowerCase().includes(lowerCaseSearch)
  );
};

// Get clubs with active parties
export const getActivePartyClubs = (): Club[] => {
  return clubData.filter(club => club.activeParty);
};

