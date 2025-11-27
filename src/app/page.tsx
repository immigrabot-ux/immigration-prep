import { Navigation } from '@/components/Navigation';
import { LandingClient } from './LandingClient';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <LandingClient />
    </div>
  );
}
