
import { useState } from "react";
import { Club } from "@/data/clubData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, MapPin, Star, Clock, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface CarouselClubListProps {
  title: string;
  clubs: Club[];
}

const CarouselClubList = ({ title, clubs }: CarouselClubListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (clubs.length === 0) {
    return null;
  }

  const handleSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-2">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <span className="text-sm text-muted-foreground">Featured</span>
      </div>
      
      <div className="w-full relative">
        <Carousel
          className="w-full"
          onSelect={handleSlideChange}
        >
          <CarouselContent>
            {clubs.map((club) => (
              <CarouselItem key={club.id}>
                <FeaturedClubCard club={club} />
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <CarouselNext className="h-12 w-12 rounded-full bg-party text-white border-none shadow-lg hover:bg-party-dark" />
          </div>
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <CarouselPrevious className="h-12 w-12 rounded-full bg-party text-white border-none shadow-lg hover:bg-party-dark" />
          </div>
        </Carousel>
        
        {/* Indicators */}
        <div className="flex justify-center gap-1 mt-4">
          {clubs.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === index ? "w-8 bg-party" : "w-3 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const FeaturedClubCard = ({ club }: { club: Club }) => {
  return (
    <Card className="w-full border-0 overflow-hidden group transition-all duration-300 relative">
      {club.image && (
        <div className="w-full h-[300px] overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
          <img 
            src={club.image} 
            alt={club.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <h2 className="text-2xl font-bold mb-2">{club.name}</h2>
            
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-background/30 backdrop-blur-sm">
                <Star className="h-3 w-3 text-yellow-500 mr-1" /> {club.rating}
              </Badge>
              <Badge variant="outline" className="bg-background/30 backdrop-blur-sm">
                <Clock className="h-3 w-3 mr-1" /> {club.openingHours}
              </Badge>
              {club.activeParty && (
                <Badge className="bg-party">
                  <Music className="h-3 w-3 mr-1" /> Active Party
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground mb-4 max-w-2xl line-clamp-2">
              {club.description}
            </p>
            
            <div className="space-y-2">
              <div>
                <h3 className="text-sm font-medium uppercase text-muted-foreground mb-1">
                  Featured Artist
                </h3>
                <p className="text-lg">
                  {/* This is where an artist name would go if available */}
                  Artist
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium uppercase text-muted-foreground mb-1">
                  Location
                </h3>
                <p className="text-sm flex items-center">
                  <MapPin className="h-4 w-4 mr-1" /> {club.address}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {club.musicGenres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="text-xs">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Button className="mt-4 party-button">
              Learn More <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CarouselClubList;
