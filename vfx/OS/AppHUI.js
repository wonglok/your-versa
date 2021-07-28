import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function AppHUI({ app }) {
  app.makeKeyReactive("activeCam");
  let controlRef = useRef();

  useFrame(() => {
    //

    if (controlRef.current) {
      //
      controlRef.current.enabled = app.enableOrbit;
    }
  });
  //
  return (
    <group>
      <OrbitControls
        ref={controlRef}
        camera={app[app.activeCam]}
      ></OrbitControls>
    </group>
  );
}
