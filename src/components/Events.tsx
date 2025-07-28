import { useEffect, useRef, useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface Event {
  title: string;
  date: string;
  rsvpLink: string;
}

interface EventsProps {
  data: Event[];
}

const Events = ({ data }: EventsProps) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear()
    };
  };

  return (
    <section id="events" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-gradient transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Upcoming Events
            </h2>
            <p className={`text-lg text-muted-foreground transition-all duration-1000 delay-200 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Join us for exciting workshops, hackathons, and tech talks
            </p>
          </div>

          <div className="space-y-6">
            {data.map((event, index) => {
              const { day, month, year } = formatDate(event.date);
              return (
                <div
                  key={index}
                  className={`glass-card p-6 hover-lift transition-all duration-1000 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    {/* Date Box */}
                    <div className="flex-shrink-0 text-center p-4 bg-primary/20 rounded-lg border border-primary/30 glow-primary">
                      <div className="text-2xl font-bold text-primary">{day}</div>
                      <div className="text-sm text-primary uppercase">{month}</div>
                      <div className="text-xs text-muted-foreground">{year}</div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-grow min-w-0">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {event.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-muted-foreground text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>6:00 PM - 8:00 PM</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>MAMO College Campus</span>
                        </div>
                      </div>
                    </div>

                    {/* RSVP Button */}
                    <a 
                      href={event.rsvpLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-2 bg-secondary/20 text-secondary border border-secondary/30 rounded-lg hover:bg-secondary/30 transition-all duration-300 hover:scale-105 flex-shrink-0 text-center"
                    >
                      RSVP
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Events;