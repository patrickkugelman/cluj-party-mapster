
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MapComponent from "@/components/map/MapComponent";
import ClubList from "@/components/clubs/ClubList";
import RequireAuth from "@/components/auth/RequireAuth";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

const MapPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <RequireAuth>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-16 h-[calc(100vh-4rem)] relative">
          <div className="flex h-full">
            {/* Sidebar with club list */}
            <div
              className={`h-full bg-card border-r border-muted transition-all duration-300 ${
                isSidebarOpen ? "w-80" : "w-0 overflow-hidden"
              }`}
            >
              <ClubList />
            </div>
            
            {/* Map */}
            <div className="flex-1 relative">
              <MapComponent />
              
              {/* Sidebar toggle button */}
              <Button
                variant="outline"
                size="icon"
                className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </RequireAuth>
  );
};

export default MapPage;
