
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MapComponent from "@/components/map/MapComponent";
import HorizontalClubList from "@/components/clubs/HorizontalClubList";
import RequireAuth from "@/components/auth/RequireAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getClubsByMusicGenre, getClubsByPartyType } from "@/data/clubData";

const MapPage = () => {
  const [activeTab, setActiveTab] = useState<string>("partyType");
  
  const clubsByMusicGenre = getClubsByMusicGenre();
  const clubsByPartyType = getClubsByPartyType();
  
  return (
    <RequireAuth>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="pt-16 flex-1 flex flex-col overflow-hidden">
          {/* Map Section - Take up the top portion */}
          <div className="w-full h-[60vh] relative">
            <MapComponent />
          </div>
          
          {/* Content Selection Tabs */}
          <div className="w-full bg-muted/30 backdrop-blur-sm border-y border-muted p-2">
            <Tabs defaultValue="partyType" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mx-auto">
                <TabsTrigger value="partyType">Party Types</TabsTrigger>
                <TabsTrigger value="musicGenre">Music Genres</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-background/90 to-background">
            <Tabs value={activeTab} className="mt-2">
              <TabsContent value="partyType" className="m-0 p-4 space-y-8">
                {clubsByPartyType.map(({ partyType, clubs }) => (
                  <HorizontalClubList 
                    key={partyType} 
                    title={partyType} 
                    clubs={clubs} 
                  />
                ))}
              </TabsContent>
              
              <TabsContent value="musicGenre" className="m-0 p-4 space-y-8">
                {clubsByMusicGenre.map(({ genre, clubs }) => (
                  <HorizontalClubList 
                    key={genre} 
                    title={genre} 
                    clubs={clubs} 
                  />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </RequireAuth>
  );
};

export default MapPage;
