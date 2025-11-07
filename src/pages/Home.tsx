import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wifi, Tv, Wind, Car, Utensils, Dumbbell, Droplet, Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import RoomCard from "@/components/RoomCard";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-hotel.jpg";
import Rooms from "./Rooms";

const Home = () => {
  const amenities = [
    { icon: Wifi, title: "Free Wi-Fi", description: "High-speed internet access" },
    { icon: Tv, title: "Smart TV", description: "Entertainment in every room" },
    { icon: Wind, title: "Air Conditioning", description: "Climate control comfort" },
    { icon: Car, title: "Free Parking", description: "Secure parking facility" },
    { icon: Droplet, title: "Drinking Water", description: "Clean and safe drinking water available" },
    { icon: Bell, title: "24 Hours Room Service", description: "Round-the-clock room service" },
  ];


  const { data: rooms, isLoading } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("rooms")
        .select("*")
        .order("price", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-[var(--gradient-overlay)]" />
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Welcome to Hotel RR Palace
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Experience luxury and comfort in the heart of Chennai
          </p>
          <Link to="/rooms">
            <Button size="lg" className="bg-primary hover:bg-accent text-primary-foreground text-lg px-8 py-6 shadow-[var(--shadow-elegant)]">
              View Our Rooms
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">About Hotel RR Palace</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Hotel RR Palace is a cozy and comfortable stay in the peaceful neighborhood of Chennai. We offer neat rooms, good service, and a pleasant place to relax. Our friendly staff make sure every guest feels at home from the moment they arrive.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We take pride in keeping our place clean and providing all basic facilities for a comfortable stay from free Wi-Fi to 24-hour room service. Whether you’re here for work or a short break, we’ll do our best to make your stay smooth and pleasant.
            </p>
          </div>
        </div>
      </section>
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Our Rooms</h1>
          
          {isLoading ? (
            <div className="text-center py-12">Loading rooms...</div>
          ) : !rooms || rooms.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No rooms available at the moment. Please check back later.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  id={room.id}
                  name={room.name}
                  price={room.price}
                  description={room.description}
                  amenities={room.amenities}
                  imageUrl={room.image_url}
                  available={room.available}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Amenities Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-foreground">Our Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity) => (
              <Card key={amenity.title} className="p-6 hover:shadow-[var(--shadow-elegant)] transition-shadow">
                <amenity.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{amenity.title}</h3>
                <p className="text-muted-foreground">{amenity.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;