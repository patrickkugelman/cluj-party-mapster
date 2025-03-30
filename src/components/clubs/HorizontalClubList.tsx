
import { Club } from "@/data/clubData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, MapPin, Star, Clock } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface HorizontalClubListProps {
  title: string;
  clubs: Club[];
}

const HorizontalClubList = ({ title, clubs }: HorizontalClubListProps) => {
  if (clubs.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-foreground px-2">{title}</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 p-2">
          {clubs.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

const ClubCard = ({ club }: { club: Club }) => {
  return (
    <Card className="w-[280px] h-[320px] shrink-0 overflow-hidden border-muted hover:neon-border transition-all duration-300 relative group">
      {club.image && (
        <div className="w-full h-40 overflow-hidden">
          <img 
            src={club.image} 
            alt={club.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-base truncate">{club.name}</h3>
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span>{club.rating}</span>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mb-2 flex items-center">
          <MapPin className="h-3 w-3 mr-1" /> 
          <span className="truncate">{club.address}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {club.activeParty && (
            <Badge className="bg-party hover:bg-party-dark text-xs">
              <Music className="h-3 w-3 mr-1" /> Active
            </Badge>
          )}
          <Badge variant="outline" className="flex items-center text-xs">
            <Clock className="h-3 w-3 mr-1" /> {club.openingHours}
          </Badge>
        </div>
        
        <p className="line-clamp-2 text-xs text-muted-foreground">{club.description}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {club.musicGenres.slice(0, 3).map((genre) => (
            <Badge key={genre} variant="secondary" className="text-xs">
              {genre}
            </Badge>
          ))}
          {club.musicGenres.length > 3 && (
            <Badge variant="secondary" className="text-xs">+{club.musicGenres.length - 3}</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HorizontalClubList;
