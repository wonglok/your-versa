import router from "next/router";
import { useEffect } from "react";
import { IntroSection } from "../pages-html/IntroSection";
import { LandingSection } from "../pages-html/LandingSection";
export default function PageAbout() {
  useEffect(() => {
    router.prefetch(`/game`);
  }, []);
  return (
    <div>
      <LandingSection></LandingSection>
      <IntroSection></IntroSection>
    </div>
  );
}
