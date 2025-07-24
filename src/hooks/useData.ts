import { useState, useEffect } from 'react';

interface ClubData {
  clubName: string;
  tagline: string;
  ctaText: string;
  ctaLink: string;
  about: {
    description: string;
  };
  objectives: string[];
  events: Array<{
    title: string;
    date: string;
  }>;
  join: {
    ctaText: string;
    formLink: string;
  };
  team: Array<{
    name: string;
    role: string;
    image: string;
  }>;
  gallery: Array<{
    src: string;
    caption: string;
  }>;
  partners: Array<{
    name: string;
    logo: string;
    link: string;
  }>;
  socials: Array<{
    platform: string;
    url: string;
  }>;
}

export const useData = () => {
  const [data, setData] = useState<ClubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};