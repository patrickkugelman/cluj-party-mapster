
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { getMapboxToken, saveMapboxToken } from "@/utils/mapboxToken";
import { clubData } from "@/data/clubData";
import { Music, MapPin } from "lucide-react";

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [tokenDialogOpen, setTokenDialogOpen] = useState(false);
  const [mapboxToken, setMapboxToken] = useState("");
  const markers = useRef<mapboxgl.Marker[]>([]);
  const { toast } = useToast();
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    // Always attempt to initialize the map
    initializeMap();
    
    return () => {
      // Cleanup function
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const initializeMap = () => {
    const token = getMapboxToken();
    if (!mapContainer.current) return;

    try {
      mapboxgl.accessToken = token;
      
      // Cluj-Napoca coordinates
      const clujCoordinates = [23.6, 46.77];
      
      if (map.current) return; // Don't reinitialize if map exists
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: clujCoordinates,
        zoom: 13,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.current.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }));

      // Once map is loaded, add markers
      map.current.on("load", () => {
        addClubMarkers();
        setMapInitialized(true);
        
        toast({
          title: "Map loaded successfully",
          description: "You can now explore clubs around Cluj-Napoca",
        });
      });
      
      map.current.on("error", (e) => {
        console.error("Mapbox error:", e);
        
        if (!mapInitialized) {
          setTokenDialogOpen(true);
        }
        
        toast({
          variant: "destructive",
          title: "Map Error",
          description: "Could not initialize map properly. You might need to provide a valid Mapbox token.",
        });
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      setTokenDialogOpen(true);
      
      toast({
        variant: "destructive",
        title: "Map Error",
        description: "Could not initialize map. Please check your Mapbox token.",
      });
    }
  };

  const addClubMarkers = () => {
    if (!map.current) return;
    
    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];
    
    // Add club markers
    clubData.forEach(club => {
      // Create custom element for marker
      const el = document.createElement("div");
      el.className = `w-6 h-6 ${club.activeParty ? 'bg-party' : 'bg-club'} rounded-full flex items-center justify-center ${club.activeParty ? 'animate-pulse-glow' : ''} cursor-pointer`;
      
      // For clubs with active parties, add a special icon or additional visual cue
      if (club.activeParty) {
        const innerEl = document.createElement("div");
        innerEl.className = "w-4 h-4 bg-white/30 rounded-full flex items-center justify-center";
        innerEl.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>';
        el.appendChild(innerEl);
      }
      
      // Create marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([club.lng, club.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="text-lg font-bold">${club.name}</h3>
                <p class="text-sm">${club.address}</p>
                ${club.activeParty ? 
                  `<p class="text-sm font-bold text-party">🎉 Active party tonight!</p>` : 
                  ''}
                <p class="text-sm"><strong>Music:</strong> ${club.musicGenres.join(', ')}</p>
                <p class="text-sm"><strong>Party Type:</strong> ${club.partyType}</p>
                <p class="text-sm"><strong>Rating:</strong> ${club.rating}/5</p>
                <p class="text-sm"><strong>Hours:</strong> ${club.openingHours}</p>
              </div>
            `)
        )
        .addTo(map.current);
      
      markers.current.push(marker);
    });
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mapboxToken) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a Mapbox token",
      });
      return;
    }
    
    saveMapboxToken(mapboxToken);
    setTokenDialogOpen(false);
    
    // Clean up existing map if any
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
    
    // Reinitialize with new token
    initializeMap();
    
    toast({
      title: "Success",
      description: "Mapbox token saved successfully",
    });
  };

  return (
    <>
      <div className="w-full h-full relative bg-background">
        <div ref={mapContainer} className="absolute inset-0" />
        
        {/* Map legend overlay */}
        <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-muted z-10">
          <h3 className="text-sm font-medium mb-2">Map Legend</h3>
          <div className="flex items-center mb-1">
            <div className="w-4 h-4 rounded-full bg-party mr-2 animate-pulse-glow"></div>
            <span className="text-xs">Active party</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-club mr-2"></div>
            <span className="text-xs">Inactive club</span>
          </div>
        </div>
        
        {/* Token Dialog */}
        <Dialog open={tokenDialogOpen} onOpenChange={setTokenDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Mapbox Token Required</DialogTitle>
              <DialogDescription>
                Please enter your Mapbox token to enable the map functionality.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleTokenSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mapbox-token">Enter your Mapbox token</Label>
                <Input
                  id="mapbox-token"
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  placeholder="pk.eyJ1Ijoi..."
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  You can get a token from <a href="https://account.mapbox.com" target="_blank" rel="noopener noreferrer" className="underline">Mapbox</a>
                </p>
              </div>
              <Button type="submit" className="w-full">Save Token</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default MapComponent;
