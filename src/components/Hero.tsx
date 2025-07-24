import { useState, useEffect } from 'react';
import { ChevronDown, Code, Users, Zap } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import heroImage from '../assets/hero-bg.jpg';

interface HeroProps {
  data: {
    clubName: string;
    tagline: string;
    ctaText: string;
    ctaLink: string;
  };
}

const Hero = ({ data }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Navigation Header */}
      <nav className="relative z-20 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-gradient">
            FOSS Club
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-colors duration-300">About</a>
            <a href="#objectives" className="text-muted-foreground hover:text-primary transition-colors duration-300">Objectives</a>
            <a href="#events" className="text-muted-foreground hover:text-primary transition-colors duration-300">Events</a>
            <a href="#gallery" className="text-muted-foreground hover:text-primary transition-colors duration-300">Gallery</a>
            <a href="#team" className="text-muted-foreground hover:text-primary transition-colors duration-300">Team</a>
            <a href="#partners" className="text-muted-foreground hover:text-primary transition-colors duration-300">Partners</a>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative flex-1 flex items-center justify-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        {/* Particle Background */}
        <ParticleBackground />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/90 to-background/70" />
        
        {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Floating Icons */}
        <div className="absolute -top-20 left-1/4 animate-bounce">
          <Code className="w-8 h-8 text-primary/60" />
        </div>
        <div className="absolute -top-16 right-1/4 animate-bounce" style={{ animationDelay: '1s' }}>
          <Users className="w-6 h-6 text-secondary/60" />
        </div>
        <div className="absolute -top-12 left-1/2 animate-bounce" style={{ animationDelay: '2s' }}>
          <Zap className="w-7 h-7 text-accent/60" />
        </div>

        {/* Main Content */}
        <div className={`transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient">{data.clubName.split('—')[0]}</span>
            <br />
            <span className="text-2xl md:text-4xl text-muted-foreground font-normal">
              {data.clubName.split('—')[1]}
            </span>
          </h1>

          <p className={`text-xl md:text-2xl text-muted-foreground mb-8 transition-all duration-1000 delay-300 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {data.tagline}
          </p>

          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <a
              href={data.ctaLink}
              className="btn-cyber animate-pulse-glow"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.ctaText}
            </a>
            
            <button
              onClick={scrollToAbout}
              className="px-8 py-4 border border-muted-foreground/30 text-muted-foreground rounded-lg hover:border-primary hover:text-primary transition-all duration-300 hover:bg-primary/10"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Tech Stats */}
        <div className={`grid grid-cols-3 gap-8 mt-16 transition-all duration-1000 delay-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary mb-2">25+</div>
            <div className="text-sm text-muted-foreground">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent mb-2">100+</div>
            <div className="text-sm text-muted-foreground">Contributions</div>
          </div>
        </div>
      </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToAbout}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-muted-foreground hover:text-primary transition-colors duration-300"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;