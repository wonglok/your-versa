import { MapControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Now } from "../state/Now";

export function AutoCam() {
  Now.makeKeyReactive("viewMode");

  return (
    <group>
      {Now.viewMode === "topView" && <TopView></TopView>}
      {Now.viewMode === "roomView" && <RoomView></RoomView>}
    </group>
  );
}

let useCamRig = ({ viewMode, controls, camera }) => {
  Now.makeKeyReactive(viewMode);

  let isReady = useRef(false);
  let { scene } = useThree();
  useEffect(() => {
    return () => {
      scene.visible = false;
    };
  }, []);

  useFrame(() => {
    if (controls.current && isReady.current) {
      Now[viewMode].position.copy(controls.current.object.position);
      Now[viewMode].target.copy(controls.current.target);
      scene.visible = true;
    } else if (controls.current && !isReady.current) {
      controls.current.object.position.copy(Now[viewMode].position);
      controls.current.target.copy(Now[viewMode].target);

      //
      isReady.current = true;
    }
  });
};

function TopView() {
  let controls = useRef();
  let camera = useRef();
  useCamRig({ controls, camera, viewMode: "topView" });

  return (
    <group>
      <PerspectiveCamera
        ref={camera}
        far={10000}
        near={0.1}
        fov={35}
        makeDefault
      ></PerspectiveCamera>
      <MapControls
        ref={controls}
        dampingFactor={0.05}
        enabled={true}
      ></MapControls>
    </group>
  );
}

function RoomView() {
  let controls = useRef();
  let camera = useRef();
  useCamRig({ controls, camera, viewMode: "roomView" });

  return (
    <group>
      <PerspectiveCamera
        ref={camera}
        far={10000}
        near={0.1}
        fov={45}
        makeDefault
      ></PerspectiveCamera>
      <MapControls
        ref={controls}
        dampingFactor={0.05}
        enabled={true}
      ></MapControls>
    </group>
  );
}
