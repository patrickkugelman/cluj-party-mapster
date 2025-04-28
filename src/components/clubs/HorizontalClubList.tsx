import { useState, useEffect } from "react";
import { Club, addToFavorites, removeFromFavorites, isFavorite } from "@/data/clubData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Music, MapPin, Star, Clock, Heart, Ticket } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
  const { toast } = useToast();
  const [favorited, setFavorited] = useState(false);
  const [ticketDialog, setTicketDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    setFavorited(isFavorite(club.id));
  }, [club.id]);
  
  const handleFavoriteToggle = () => {
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
  
  const handleBuyTicket = () => {
    setTicketDialog(true);
  };
  
  const handlePurchase = () => {
    toast({
      title: "Tickets purchased!",
      description: `${quantity} ticket${quantity > 1 ? 's' : ''} for ${club.name} have been purchased. Check your email for confirmation.`,
    });
    setTicketDialog(false);
  };

  return (
    <Card className="w-[280px] h-[320px] shrink-0 overflow-hidden border-muted hover:neon-border transition-all duration-300 relative group">
      <div className="absolute top-2 right-2 z-10">
        <Button 
          variant="outline" 
          size="icon" 
          className={`h-8 w-8 rounded-full ${favorited ? 'bg-red-500 text-white border-none' : 'bg-background/60 backdrop-blur-sm'}`}
          onClick={handleFavoriteToggle}
        >
          <Heart className={`h-4 w-4 ${favorited ? 'fill-current' : ''}`} />
        </Button>
      </div>
      
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
        
        <div className="flex flex-wrap gap-1 mb-2">
          {club.musicGenres.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="secondary" className="text-xs">
              {genre}
            </Badge>
          ))}
          {club.musicGenres.length > 2 && (
            <Badge variant="secondary" className="text-xs">+{club.musicGenres.length - 2}</Badge>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-2 text-xs"
          onClick={handleBuyTicket}
        >
          <Ticket className="h-3 w-3 mr-1" /> Buy Tickets
        </Button>
      </CardContent>
      
      <Dialog open={ticketDialog} onOpenChange={setTicketDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buy Tickets for {club.name}</DialogTitle>
            <DialogDescription>
              Purchase tickets for the upcoming event at {club.name}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Date</h3>
                <p>This Friday, 10:00 PM</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Price</h3>
                <p>50 RON per ticket</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Quantity</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >-</Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >+</Button>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium">Total</h3>
                <p className="text-xl font-bold">{quantity * 50} RON</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handlePurchase} className="party-button">
              Purchase Tickets
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default HorizontalClubList;
