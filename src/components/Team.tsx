import { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Twitter, Users } from 'lucide-react';
import teamPlaceholder from '../assets/team-placeholder.jpg';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

interface TeamProps {
  data: TeamMember[];
}

const Team = ({ data }: TeamProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="team" ref={sectionRef} className="py-20 bg-card/5">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 mb-4 transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold text-gradient">
                Meet Our Team
              </h2>
            </div>
            <p className={`text-lg text-muted-foreground transition-all duration-1000 delay-200 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              The passionate minds driving FOSS culture at MAMO College
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((member, index) => (
              <div
                key={index}
                className={`glass-card p-6 text-center hover-lift group transition-all duration-1000 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                {/* Profile Image */}
                <div className="relative mb-6 mx-auto w-32 h-32">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full p-1 glow-primary group-hover:animate-pulse">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover bg-card"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = teamPlaceholder;
                      }}
                    />
                  </div>
                </div>

                {/* Member Info */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-4">
                  {member.role}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <a 
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted/20 rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted/20 rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a 
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-muted/20 rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Team;