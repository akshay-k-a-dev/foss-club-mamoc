import { useData } from '../hooks/useData';
import Hero from '../components/Hero';
import About from '../components/About';
import Objectives from '../components/Objectives';
import Events from '../components/Events';
import JoinForm from '../components/JoinForm';
import Team from '../components/Team';
import Gallery from '../components/Gallery';

import Footer from '../components/Footer';

const Index = () => {
  const { data, loading, error } = useData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading FOSS Club data...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-destructive mb-4">Error</h1>
          <p className="text-muted-foreground">{error || 'Failed to load data'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Hero data={data} />
      <About data={data.about} />
      <Objectives data={data.objectives} />
      <Events data={data.events} />
      <Gallery data={data.gallery} />
      <JoinForm data={data.join} socials={data.socials} />
      <Team data={data.team} />
      
      <Footer data={data} />
    </div>
  );
};

export default Index;
