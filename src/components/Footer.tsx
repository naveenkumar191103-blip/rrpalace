import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Hotel RR Palace</h3>
            <p className="text-sm opacity-90">
              Experience luxury and comfort at Hotel RR Palace
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-90">
                  126 Periya, Kolathuvancheri Main Road, Balaji Nagar, Papanthangal, Chennai, Tamil Nadu 600122
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="opacity-90">rrpalace@gmail.com</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2 text-sm">
              <a href="/rooms" className="opacity-90 hover:opacity-100 transition-opacity">
                View Rooms
              </a>
              <a href="/" className="opacity-90 hover:opacity-100 transition-opacity">
                About Us
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-accent-foreground/20 text-center text-sm opacity-75">
          © 2025 Hotel RR Palace. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;