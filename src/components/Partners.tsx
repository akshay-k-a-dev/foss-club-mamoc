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
                <div className="flex items-center justify-center h-24 mb-6 bg-muted/20 rounded-lg group-hover:bg-primary/10 transition-all duration-300 p-4">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'text-4xl font-bold text-primary group-hover:scale-110 transition-transform duration-300';
                      fallback.textContent = partner.name.slice(0, 2);
                      target.parentNode?.appendChild(fallback);
                    }}
                  />
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
        </div>
      </div>
    </section>
  );
};

export default Partners;