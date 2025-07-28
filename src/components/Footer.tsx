import { Github, Instagram, MessageCircle, Mail, Heart, Code } from 'lucide-react';

interface Social {
  platform: string;
  url: string;
}

interface FooterProps {
  data: {
    socials: Social[];
    clubName: string;
  };
}

const Footer = ({ data }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'discord':
        return MessageCircle;
      case 'github':
        return Github;
      case 'instagram':
        return Instagram;
      default:
        return Mail;
    }
  };

  return (
    <footer className="bg-card/5 border-t border-border/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Club Info */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">
              {data.clubName.split('—')[0]}
            </h3>
            <p className="text-muted-foreground mb-4">
              Empowering students through Free and Open Source Software. 
              Join us in building a better, more collaborative future.
            </p>
            <div className="flex items-center gap-2 text-accent">
              <Code className="w-4 h-4" />
              <span className="text-sm">Built with React & Tailwind</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#objectives" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  Objectives
                </a>
              </li>
              <li>
                <a href="#events" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  Events
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#team" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  Team
                </a>
              </li>
              <li>
                <a href="#partners" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  Partners
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Connect With Us</h4>
            <div className="flex gap-4 mb-6">
              {data.socials.map((social, index) => {
                const Icon = getSocialIcon(social.platform);
                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-muted/20 rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110 glow-primary"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-muted-foreground">
              Join our community and be part of the FOSS movement!
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> by FOSS Club
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;