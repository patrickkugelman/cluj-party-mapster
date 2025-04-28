
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Club } from "@/data/clubData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Music, Star, Clock, Ticket } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ClubDetailsDialogProps {
  club: Club;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ClubDetailsDialog = ({ club, open, onOpenChange }: ClubDetailsDialogProps) => {
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const { toast } = useToast();

  const handlePurchase = () => {
    toast({
      title: "Tickets purchased!",
      description: `${ticketQuantity} ticket${ticketQuantity > 1 ? 's' : ''} for ${club.name} have been purchased. Check your email for confirmation.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{club.name}</DialogTitle>
        </DialogHeader>
        
        {club.image && (
          <div className="w-full h-64 overflow-hidden rounded-lg">
            <img 
              src={club.image} 
              alt={club.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              <Star className="h-3 w-3 text-yellow-500 mr-1" /> {club.rating}
            </Badge>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" /> {club.openingHours}
            </Badge>
            {club.activeParty && (
              <Badge className="bg-party">
                <Music className="h-3 w-3 mr-1" /> Active Party
              </Badge>
            )}
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Location</h3>
            <p className="text-sm flex items-center text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" /> {club.address}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Description</h3>
            <p className="text-sm text-muted-foreground">{club.description}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Music Genres</h3>
            <div className="flex flex-wrap gap-1">
              {club.musicGenres.map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4">Buy Tickets</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">Date</h4>
                <p className="text-sm text-muted-foreground">This Friday, 10:00 PM</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Price</h4>
                <p className="text-sm text-muted-foreground">50 RON per ticket</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Quantity</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                  >-</Button>
                  <span className="w-8 text-center">{ticketQuantity}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setTicketQuantity(ticketQuantity + 1)}
                  >+</Button>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium">Total</h4>
                <p className="text-xl font-bold">{ticketQuantity * 50} RON</p>
              </div>
            </div>
            
            <Button onClick={handlePurchase} className="w-full mt-6 party-button">
              <Ticket className="h-4 w-4 mr-1" /> Purchase Tickets
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClubDetailsDialog;
