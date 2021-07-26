import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { MetaMap } from "../r3f/MetaMap";
import { CubeMap } from "../r3f/CubeMap";
import { CameraRigFirstPerson } from "../r3f/CameraRigFirstPerson";
export function LovingJesus() {
  return (
    <group>
      <Suspense fallback={null}>
        <Content></Content>
      </Suspense>
    </group>
  );
}

function Content() {
  let floor = useGLTF(`/vfx/metaverse/loving-jesus.glb`);

  useEffect(() => {
    //
    let root = floor.scene;
    root.traverse((it) => {
      if (it.material) {
        it.material = it.material.clone();
        it.material.roughness = 0.0;
        it.material.metalness = 1.0;
        it.userData.hoverable = true;
      }
    });
  }, [floor]);

  let startAt = {
    x: 0,
    y: 10 + 14.041194266718215,
    z: 178.39414497040949,
  };
  return (
    <group>
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

      <CubeMap></CubeMap>
    </group>
  );
}
