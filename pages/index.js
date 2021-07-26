export default function HomePage() {
  let ShowPage = <div></div>;

  if (process.env.NODE_ENV === "development") {
    // Shake it off in Production.
    ShowPage = require("../vfx/pages/Setup").Setup;
  } else {
    //
    ShowPage = require("../vfx/pages/Landing").Landing;
  }

  return <ShowPage></ShowPage>;
}
