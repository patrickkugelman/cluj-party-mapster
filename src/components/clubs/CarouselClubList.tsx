import { useState, useEffect } from "react";
import { Club, addToFavorites, removeFromFavorites, isFavorite } from "@/data/clubData";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, MapPin, Star, Clock, ArrowRight, Heart, Ticket } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { useToast } from "@/hooks/use-toast";
import ClubDetailsDialog from "./ClubDetailsDialog";

interface CarouselClubListProps {
  title: string;
  clubs: Club[];
}

const CarouselClubList = ({ title, clubs }: CarouselClubListProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  if (clubs.length === 0) {
    return null;
  }

  useEffect(() => {
    if (!api) return;
    
    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };
    
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-2">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <span className="text-sm text-muted-foreground">Featured</span>
      </div>
      
      <div className="w-full relative">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
          setApi={setApi}
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
  const { toast } = useToast();
  const [favorited, setFavorited] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  useEffect(() => {
    setFavorited(isFavorite(club.id));
  }, [club.id]);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorited) {
      removeFromFavorites(club.id);
      setFavorited(false);
      toast({
        title: "Removed from favorites",
        description: `${club.name} has been removed from your favorites`,
      });
    } else {
      addToFavorites(club.id);
      setFavorited(true);
      toast({
        title: "Added to favorites",
        description: `${club.name} has been added to your favorites`,
      });
    }
  };

  return (
    <>
      <Card 
        className="w-full border-0 overflow-hidden group transition-all duration-300 relative cursor-pointer" 
        onClick={() => setDetailsOpen(true)}
      >
        {club.image && (
          <div className="w-full h-[300px] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
            <img 
              src={club.image} 
              alt={club.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 z-20">
              <Button 
                variant="outline" 
                size="icon" 
                className={`rounded-full ${favorited ? 'bg-red-500 text-white border-none' : 'bg-background/30 backdrop-blur-sm'}`}
                onClick={handleFavoriteToggle}
              >
                <Heart className={`h-5 w-5 ${favorited ? 'fill-current' : ''}`} />
              </Button>
            </div>
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
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Button className="party-button">
                  Learn More <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
                <Button variant="outline" className="bg-background/30 backdrop-blur-sm" onClick={() => setDetailsOpen(true)}>
                  <Ticket className="h-4 w-4 mr-1" /> Buy Tickets
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      <ClubDetailsDialog
        club={club}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </>
  );
};

export default CarouselClubList;
