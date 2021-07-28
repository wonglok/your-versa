export default function HomePage() {
  let LandingPage = require("../vfx/pages/Game").Game;

  if (process.env.NODE_ENV === "development") {
    // Shake it off in Production.
    LandingPage = require("../vfx/pages/Setup").Setup;
  }

  return <LandingPage></LandingPage>;
}

//
