import { useEffect, useRef, useState } from 'react';
import { UserPlus, ExternalLink, MessageCircle, Github } from 'lucide-react';

interface JoinProps {
  data: {
    ctaText: string;
    formLink: string;
  };
  socials: Array<{
    platform: string;
    url: string;
  }>;
}

const JoinForm = ({ data, socials }: JoinProps) => {
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

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'discord':
        return MessageCircle;
      case 'github':
        return Github;
      default:
        return ExternalLink;
    }
  };

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            <div className="glass-card p-12 cyber-border">
              <div className="mb-8">
                <UserPlus className="w-16 h-16 text-primary mx-auto mb-6 glow-primary" />
                <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
                  Join the Movement
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Ready to be part of something bigger? Join our community of passionate developers, 
                  contributors, and FOSS enthusiasts. Together, we're building the future of open source.
                </p>
              </div>

              <div className="space-y-6 mb-12">
                <a
                  href={data.formLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cyber inline-flex items-center gap-2 text-lg px-8 py-4"
                >
                  <UserPlus className="w-5 h-5" />
                  {data.ctaText}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="border-t border-border/30 pt-8">
                <p className="text-muted-foreground mb-6">
                  Or connect with us on social platforms:
                </p>
                <div className="flex justify-center gap-4">
                  {socials.map((social, index) => {
                    const Icon = getSocialIcon(social.platform);
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 bg-muted/20 rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110 glow-primary"
                      >
                        <Icon className="w-6 h-6" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 text-sm text-muted-foreground">
                <p>🚀 Join 50+ active members • 🛠️ Contribute to real projects • 🎓 Learn & grow together</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinForm;