
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useToast } from "@/components/ui/use-toast";
import { getMapboxToken } from "@/utils/mapboxToken";
import { clubData } from "@/data/clubData";

// Import our new components
import MapMarkerManager from "./MapMarkerManager";
import MapLegend from "./MapLegend";
import MapTokenDialog from "./MapTokenDialog";
import MapInitializer from "./MapInitializer";

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [tokenDialogOpen, setTokenDialogOpen] = useState(false);
  const [mapInitialized, setMapInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Always attempt to initialize the map on first load
    const token = getMapboxToken();
    if (!token) {
      setTokenDialogOpen(true);
    }
  }, []);

  const handleMapInitialized = (initializedMap: mapboxgl.Map) => {
    setMap(initializedMap);
    setMapInitialized(true);
  };

  const handleMapError = () => {
    if (!mapInitialized) {
      setTokenDialogOpen(true);
    }
  };

  const handleTokenSubmit = () => {
    setTokenDialogOpen(false);
    
    // Clean up existing map if any
    if (map) {
      map.remove();
      setMap(null);
    }
    
    // Map will be reinitialized by the MapInitializer effect
    setMapInitialized(false);
  };

  return (
    <>
      <div className="w-full h-full relative bg-background">
        <div ref={mapContainer} className="absolute inset-0" />
        
        {/* Map Initializer */}
        <MapInitializer 
          mapContainer={mapContainer}
          onMapInitialized={handleMapInitialized}
          onMapError={handleMapError}
          mapboxToken={getMapboxToken()}
        />
        
        {/* Map Marker Manager */}
        {map && <MapMarkerManager map={map} clubs={clubData} />}
        
        {/* Map Legend */}
        <MapLegend />
        
        {/* Token Dialog */}
        <MapTokenDialog 
          isOpen={tokenDialogOpen}
          onOpenChange={setTokenDialogOpen}
          onTokenSubmit={handleTokenSubmit}
        />
      </div>
    </>
  );
};

export default MapComponent;
