import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Handshake } from 'lucide-react';

interface Partner {
  name: string;
  logo: string;
  link: string;
}

interface PartnersProps {
  data: Partner[];
}

const Partners = ({ data }: PartnersProps) => {
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
    <section id="partners" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`inline-flex items-center gap-2 mb-4 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <Handshake className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">
              Our Partners
            </h2>
          </div>
          
          <p className={`text-lg text-muted-foreground mb-16 transition-all duration-1000 delay-200 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            Collaborating with amazing organizations to amplify our impact
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.map((partner, index) => (
              <a
                key={index}
                href={partner.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-card p-8 hover-lift group transition-all duration-1000 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                <div className="flex items-center justify-center h-24 mb-6 bg-muted/20 rounded-lg group-hover:bg-primary/10 transition-all duration-300">
                  {/* Placeholder for logo */}
                  <div className="text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                    {partner.name.slice(0, 2)}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {partner.name}
                </h3>
                
                <div className="flex items-center justify-center gap-2 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                  <span className="text-sm">Visit Website</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>

          {/* Partnership CTA */}
          <div className={`mt-16 transition-all duration-1000 delay-500 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-gradient mb-4">
                Interested in Partnering?
              </h3>
              <p className="text-muted-foreground mb-6">
                Join forces with us to promote FOSS culture and make a bigger impact in the tech community.
              </p>
              <button className="btn-cyber">
                <Handshake className="w-4 h-4 mr-2" />
                Partner With Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;