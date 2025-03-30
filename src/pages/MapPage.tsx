
import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import MapComponent from "@/components/map/MapComponent";
import HorizontalClubList from "@/components/clubs/HorizontalClubList";
import CarouselClubList from "@/components/clubs/CarouselClubList";
import RequireAuth from "@/components/auth/RequireAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Map } from "lucide-react";
import { getClubsByMusicGenre, getClubsByPartyType } from "@/data/clubData";
import Footer from "@/components/layout/Footer";

const MapPage = () => {
  const [activeTab, setActiveTab] = useState<string>("partyType");
  const [mapOpen, setMapOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const clubsByMusicGenre = getClubsByMusicGenre();
  const clubsByPartyType = getClubsByPartyType();
  
  // Detect scroll position and update active tab
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const scrollPosition = contentRef.current.scrollTop;
      const threshold = 300; // Adjust based on your layout
      
      if (scrollPosition < threshold && activeTab !== "partyType") {
        setActiveTab("partyType");
      } else if (scrollPosition >= threshold && activeTab !== "musicGenre") {
        setActiveTab("musicGenre");
      }
    };
    
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
    }
    
    return () => {
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [activeTab]);
  
  // Scroll to the appropriate section when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (!contentRef.current) return;
    
    if (value === "partyType") {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    } else if (value === "musicGenre") {
      contentRef.current.scrollTo({ top: 400, behavior: "smooth" }); // Adjust based on your layout
    }
  };
  
  return (
    <RequireAuth>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="pt-16 flex-1 flex flex-col overflow-hidden">
          {/* Map Button - Fixed position */}
          <div className="fixed bottom-6 right-6 z-10">
            <Button 
              size="lg" 
              className="rounded-full shadow-lg bg-party hover:bg-party/90 flex items-center gap-2"
              onClick={() => setMapOpen(true)}
            >
              <Map className="h-5 w-5" />
              <span>Map View</span>
            </Button>
          </div>
          
          {/* Content Selection Tabs */}
          <div className="w-full bg-muted/30 backdrop-blur-sm border-y border-muted p-2 sticky top-16 z-10">
            <Tabs defaultValue="partyType" value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="mx-auto">
                <TabsTrigger value="partyType">Party Types</TabsTrigger>
                <TabsTrigger value="musicGenre">Music Genres</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Scrollable Content Area */}
          <div 
            ref={contentRef}
            className="flex-1 overflow-y-auto bg-gradient-to-b from-background/90 to-background"
          >
            <div className="p-4 space-y-12">
              {/* Party Types Section */}
              <div id="partyType-section" className="space-y-12">
                {clubsByPartyType.map(({ partyType, clubs }, index) => 
                  index === 0 ? (
                    <CarouselClubList
                      key={partyType}
                      title={partyType}
                      clubs={clubs}
                    />
                  ) : (
                    <HorizontalClubList 
                      key={partyType} 
                      title={partyType} 
                      clubs={clubs} 
                    />
                  )
                )}
              </div>
              
              {/* Music Genres Section */}
              <div id="musicGenre-section" className="space-y-12 pt-8">
                {clubsByMusicGenre.map(({ genre, clubs }, index) => 
                  index === 0 ? (
                    <CarouselClubList
                      key={genre}
                      title={genre}
                      clubs={clubs}
                    />
                  ) : (
                    <HorizontalClubList 
                      key={genre} 
                      title={genre} 
                      clubs={clubs} 
                    />
                  )
                )}
              </div>
            </div>
          </div>
          
          <Footer />
        </main>
        
        {/* Map Dialog */}
        <Dialog open={mapOpen} onOpenChange={setMapOpen}>
          <DialogContent className="max-w-5xl h-[80vh] p-0 overflow-hidden">
            <MapComponent />
          </DialogContent>
        </Dialog>
      </div>
    </RequireAuth>
  );
};

export default MapPage;
