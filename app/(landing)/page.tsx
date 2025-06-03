import { LandingContent } from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";

const Page = () => {
      return (
            <div className="h-screen">
                  <LandingNavbar />
                  <LandingHero/>
                  <LandingContent/>
            </div>
      );
};

export default Page;
