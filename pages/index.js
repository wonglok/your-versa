// import Head from "next/head";

export default function Home({ settings }) {
  return (
    <>
      {settings.show === "" && (
        <div className="w-full h-full bg-red-300">Landing</div>
      )}
    </>
  );
}

//

export async function getStaticProps() {
  let settings = require("../versa.config");

  return {
    props: {
      settings,
    },
  }; //
}
