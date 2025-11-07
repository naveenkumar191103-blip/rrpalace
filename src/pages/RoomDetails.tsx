import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Wifi, Tv, Wind, Car, CheckCircle2, XCircle } from "lucide-react";

const amenityIcons: Record<string, any> = {
  "Wi-Fi": Wifi,
  "TV": Tv,
  "AC": Wind,
  "Parking": Car,
};

const RoomDetails = () => {
  const { id } = useParams();

  const { data: room, isLoading } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 text-center">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-16 text-center">Room not found</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative h-96 rounded-lg overflow-hidden mb-8">
              <img 
                src={room.image_url} 
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <Badge 
                className={`absolute top-4 right-4 ${
                  room.available 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-destructive text-destructive-foreground"
                }`}
              >
                {room.available ? (
                  <><CheckCircle2 className="h-4 w-4 mr-1" /> Available</>
                ) : (
                  <><XCircle className="h-4 w-4 mr-1" /> Unavailable</>
                )}
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-4xl font-bold mb-4">{room.name}</h1>
                <p className="text-lg text-muted-foreground mb-6">{room.description}</p>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
                    <div className="grid grid-cols-2 gap-4">
                      {room.amenities.map((amenity: string) => {
                        const Icon = amenityIcons[amenity];
                        return (
                          <div key={amenity} className="flex items-center gap-2">
                            {Icon && <Icon className="h-5 w-5 text-primary" />}
                            <span>{amenity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <p className="text-sm text-muted-foreground mb-2">Price per night</p>
                      <p className="text-4xl font-bold text-primary">₹{room.price}</p>
                    </div>
                    
                    {room.available ? (
                      <Link to={`/book/${room.id}`}>
                        <Button size="lg" className="w-full bg-primary hover:bg-accent">
                          Book This Room
                        </Button>
                      </Link>
                    ) : (
                      <Button size="lg" className="w-full" disabled>
                        Currently Unavailable
                      </Button>
                    )}
                    
                    <div className="mt-6 pt-6 border-t">
                      <p className="text-sm text-muted-foreground">
                        Payment Method: Pay at Hotel
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RoomDetails;