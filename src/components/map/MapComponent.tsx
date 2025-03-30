
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { getMapboxToken, saveMapboxToken, hasMapboxToken } from "@/utils/mapboxToken";
import { clubData } from "@/data/clubData";

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [tokenDialogOpen, setTokenDialogOpen] = useState(false);
  const [mapboxToken, setMapboxToken] = useState("");
  const markers = useRef<mapboxgl.Marker[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Check if we have a Mapbox token, if not show dialog
    if (!hasMapboxToken()) {
      setTokenDialogOpen(true);
      return;
    }

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
    if (!token || !mapContainer.current) return;

    try {
      mapboxgl.accessToken = token;
      
      // Cluj-Napoca coordinates
      const clujCoordinates = [23.6, 46.77];
      
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
      });
    } catch (error) {
      console.error("Error initializing map:", error);
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
      el.className = "w-6 h-6 bg-club rounded-full flex items-center justify-center animate-pulse-glow cursor-pointer";
      
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
    initializeMap();
    
    toast({
      title: "Success",
      description: "Mapbox token saved successfully",
    });
  };

  return (
    <>
      <div className="w-full h-[calc(100vh-4rem)] relative bg-background">
        <div ref={mapContainer} className="absolute inset-0" />
        
        {/* Token Dialog */}
        <Dialog open={tokenDialogOpen} onOpenChange={setTokenDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Mapbox Token Required</DialogTitle>
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
