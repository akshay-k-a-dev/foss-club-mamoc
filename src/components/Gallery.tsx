import { useEffect, useRef, useState } from 'react';
import { Camera, ZoomIn } from 'lucide-react';

interface GalleryItem {
  src: string;
  caption: string;
}

interface GalleryProps {
  data: GalleryItem[];
}

const Gallery = ({ data }: GalleryProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center gap-2 mb-4 transition-all duration-1000 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <Camera className="w-8 h-8 text-primary" />
              <h2 className="text-4xl md:text-5xl font-bold text-gradient">
                Gallery
              </h2>
            </div>
            
            <p className={`text-lg text-muted-foreground transition-all duration-1000 delay-200 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              Moments from our journey in the FOSS world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                className={`glass-card overflow-hidden hover-lift cursor-pointer group transition-all duration-1000 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                onClick={() => setSelectedImage(item.src)}
              >
                <div className="relative aspect-video bg-muted/20 overflow-hidden">
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-primary/60" />
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.caption}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for image preview */}
          {selectedImage && (
            <div 
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <div className="max-w-4xl max-h-full bg-card rounded-lg overflow-hidden">
                <div className="aspect-video bg-muted/20 flex items-center justify-center">
                  <Camera className="w-16 h-16 text-primary/60" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;