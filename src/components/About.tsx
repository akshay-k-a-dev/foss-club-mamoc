import { useEffect, useRef, useState } from 'react';
import { Heart, Code2, Users2, Rocket } from 'lucide-react';

interface AboutProps {
  data: {
    description: string;
  };
}

const About = ({ data }: AboutProps) => {
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

  const features = [
    {
      icon: Code2,
      title: "Open Source",
      description: "Building with transparency and collaboration at our core"
    },
    {
      icon: Users2,
      title: "Community",
      description: "Fostering connections between passionate developers"
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technology"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Driven by love for code and continuous learning"
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 text-gradient transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            About FOSS Club
          </h2>
          
          <p className={`text-lg md:text-xl text-muted-foreground mb-16 leading-relaxed transition-all duration-1000 delay-200 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {data.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`glass-card p-6 hover-lift transition-all duration-1000 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/20 rounded-full glow-primary">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;