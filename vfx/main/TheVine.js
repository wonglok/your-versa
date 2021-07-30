import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { MetaMap } from "../r3f/MetaMap";
import { CubeMap } from "../r3f/CubeMap";
import { CameraRigFirstPerson } from "../r3f/CameraRigFirstPerson";
import { Portal } from "../r3f/Portal";
import { loginGuest, onReady } from "../utils/get-fire";
import { Color } from "three";
import { Bloomer } from "../r3f/Bloomer";
// import { Now } from "../state/Now";
// import { MyWindow } from "../r3f/MyWindow";
// import { useThree } from "@react-three/fiber";
// import { Bloomer } from "../r3f/Bloomer";

export function TheVine({ children }) {
  return (
    <group>
      <Suspense fallback={null}>
        <Content>{children}</Content>
      </Suspense>
    </group>
  );
}

function Content({ children }) {
  let startAt = {
    x: 0.6696873495643494,
    y: 10 + 4.393610750044425,
    z: 225.62193080491028,
  };

  let floor = useGLTF(`/vfx/metaverse/loving-jesus.glb`);

  useEffect(() => {
    //
    let root = floor.scene;
    root.traverse((it) => {
      if (it.material) {
        // it.material = it.material.clone();
        it.material.roughness = 0.05;
        it.material.metalness = 0.9;
        it.material.emissive = new Color("#020202");
        it.userData.hoverable = true;

        if (it.material.name === "trunk") {
          it.userData.hoverable = false;
        }
        if (it.material.name === "leaves") {
          it.userData.hoverable = false;
        }
      }
    });
  }, [floor]);

  useEffect(() => {
    let { listen } = require("quicklink");
    listen();
  }, []);

  //
  return (
    <group>
      {typeof children === "function" ? children({ startAt }) : children}

      <Portal
        bloom={true}
        text={{
          ready: "Learn more...",
          loading: "Loading...",
        }}
        //
        preload={() => {
          let router = require("next/router").default;
          router.prefetch("/about");
          console.log("prefetching about");
        }}
        action={({ setLabel }) => {
          let router = require("next/router").default;
          router.push("/about");
          console.log("going to about");
        }}
        zone={{
          x: -20.464775449380631,
          y: 20.28173719202523,
          z: 27.868870445113462,
        }}
      ></Portal>
      <Portal
        bloom={true}
        text={{
          ready: "Download Code",
          loading: "Visiting Github...",
        }}
        preload={() => {}}
        action={({ setLabel }) => {
          window.location.assign(`https://github.com/wonglok/your-versa`);
          console.log("going to github");
        }}
        zone={{
          x: -6.464775449380631,
          y: 20.28173719202523,
          z: 27.868870445113462,
        }}
      ></Portal>
      <MetaMap
        startAt={startAt}
        floor={floor.scene}
        showDebug={false}
        onCreated={(v) => {
          console.log(v);
        }}
      ></MetaMap>
      <CameraRigFirstPerson></CameraRigFirstPerson>
      <primitive object={floor.scene}></primitive>
      {/* lighting... */}
      <CubeMap></CubeMap>
      <pointLight
        intensity={0.5}
        distance={500}
        position={[0, 35, 0]}
      ></pointLight>
      {/* lighting... */}
      <directionalLight
        intensity={1}
        position={[10, 10, -10]}
      ></directionalLight>
      {/* lighting... */}
      <directionalLight
        intensity={1}
        position={[-10, 10, 0]}
      ></directionalLight>

      <ambientLight intensity={0.5}></ambientLight>
      <Bloomer></Bloomer>
    </group>
  );
}
