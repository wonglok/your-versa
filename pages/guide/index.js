import router from "next/router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    router.push("/guide/setup-firebase");
  }, []);

  return <div></div>;
}
