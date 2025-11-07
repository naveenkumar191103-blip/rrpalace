import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hotel } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Hotel className="h-6 w-6 text-primary transition-transform group-hover:scale-110" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Hotel RR Palace
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/rooms" className="text-foreground hover:text-primary transition-colors">
              Rooms
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;