import { Hero } from '../components/Hero';
import { TrustedBy } from '../components/TrustedBy';
import { VideoReveal } from '../components/VideoReveal';
import { SocialProof } from '../components/SocialProof';
import { ProductSolution } from '../components/ProductSolution';
import { FeatureBreakdown } from '../components/FeatureBreakdown';
import { TheDifference } from '../components/TheDifference';
import { HowItWorks } from '../components/HowItWorks';
import { DashboardPreview } from '../components/DashboardPreview';
import { RenderGallery } from '../components/RenderGallery';
import { PricingPreview } from '../components/PricingPreview';
import { FAQ } from '../components/FAQ';
import { FinalCTA } from '../components/FinalCTA';

export const Home = ({
  onDemoClick,
  onWaitlistClick,
  showVideoReveal,
}: {
  onDemoClick: () => void;
  onWaitlistClick: () => void;
  showVideoReveal: boolean;
}) => (
  <>
    <Hero onDemoClick={onDemoClick} />
    {showVideoReveal && <VideoReveal />}
    <TrustedBy />
    <SocialProof />
    <ProductSolution onDemoClick={onDemoClick} />
    <FeatureBreakdown />
    <TheDifference onDemoClick={onDemoClick} />
    <HowItWorks />
    <DashboardPreview />
    <RenderGallery />
    <PricingPreview onDemoClick={onDemoClick} />
    <FAQ />
    <FinalCTA onDemoClick={onDemoClick} onWaitlistClick={onWaitlistClick} />
  </>
);
