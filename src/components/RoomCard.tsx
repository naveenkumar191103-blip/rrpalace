import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Wifi, Tv, Wind, Car, CheckCircle2, XCircle } from "lucide-react";

interface RoomCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  amenities: string[];
  imageUrl: string;
  available: boolean;
}

const amenityIcons: Record<string, any> = {
  "Wi-Fi": Wifi,
  "TV": Tv,
  "AC": Wind,
  "Parking": Car,
};

const RoomCard = ({ id, name, price, description, amenities, imageUrl, available }: RoomCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-[var(--shadow-elegant)] transition-shadow">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <Badge 
          className={`absolute top-4 right-4 ${
            available 
              ? "bg-primary text-primary-foreground" 
              : "bg-destructive text-destructive-foreground"
          }`}
        >
          {available ? (
            <><CheckCircle2 className="h-3 w-3 mr-1" /> Available</>
          ) : (
            <><XCircle className="h-3 w-3 mr-1" /> Unavailable</>
          )}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-2xl font-bold text-primary">₹{price}</p>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2">
          {amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity];
            return (
              <Badge key={amenity} variant="secondary" className="gap-1">
                {Icon && <Icon className="h-3 w-3" />}
                {amenity}
              </Badge>
            );
          })}
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Link to={`/room/${id}`} className="w-full">
          <Button className="w-full bg-primary hover:bg-accent">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;