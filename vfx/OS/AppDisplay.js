// import { useFBO } from "@react-three/drei";
// import { createPortal, useFrame, useThree } from "@react-three/fiber";
// import { useEffect, useMemo } from "react";
// import { Color, Scene } from "three";
// import { ToolWin } from "../state/ToolWin";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  BoxBufferGeometry,
  PlaneBufferGeometry,
  Vector2,
  Vector3,
} from "three";
import { useAutoEvent } from "../utils/use-auto-event";
import { DragControls } from "three-stdlib";

export function AppDisplay({ location, uv, app }) {
  let { get } = useThree();

  if (!app) {
    throw new Error("no app given");
  }

  // let resizeHandle = useMemo(() => {
  //   return {
  //     isDrag: false,
  //     isDown: true,
  //     move: new Vector3(),
  //     ts: new Vector3(),
  //     td: new Vector3(),
  //     ta: new Vector3(),
  //   };
  // }, []);

  // // useAutoEvent(
  // //   "pointermove",
  // //   (ev) => {
  // //     if (resizeHandle.isDown) {
  // //       console.log(ev);
  // //       resizeHandle.move.fromArray([ev.movementX, ev.movementY, 0]);
  // //       let size = resizeHandle.move.length();
  // //       allRef.current.scale.x += size;
  // //     }
  // //   },
  // //   { passive: false },
  // //   get().gl.domElement
  // // );

  // useAutoEvent(
  //   "pointerup",
  //   (ev) => {
  //     resizeHandle.isDown = false;
  //     resizeHandle.isDrag = false;
  //   },
  //   { passive: false },
  //   get().gl.domElement
  // );

  let allRef = useRef();

  let screenRef = useRef();
  let handleRef = useRef();
  let borderRef = useRef();

  let { baseSize, border, topBar } = app;

  let fbo = app.fbo;
  let aspect = fbo.height / fbo.width;

  useEffect(() => {
    const controls = new DragControls(
      [handleRef.current],
      get().camera,
      get().gl.domElement
    );
    controls.transformGroup = true;

    controls.addEventListener("dragstart", function (event) {
      // event.object.material.color.set(0xaaaaaa);
    });

    controls.addEventListener("dragend", function (event) {
      // event.object.material.color.set(0x000000);
    });

    return () => {
      controls.dispose();
    };
  }, []);

  useFrame(() => {
    // handlebar
    if (handleRef.current && screenRef.current) {
      screenRef.current.position.copy(handleRef.current.position);
    }
    // border
    if (borderRef.current && handleRef.current) {
      borderRef.current.position.copy(handleRef.current.position);
    }
  });

  let geo = useMemo(() => {
    return new PlaneBufferGeometry(
      //
      app.getWidth(),
      app.getHeight(),
      2,
      2
    );
  }, []);

  return (
    <>
      <group ref={allRef}>
        {/*  */}
        <group position={location} ref={handleRef}>
          <mesh position-z={0.01} position-y={app.getHeight() / -2}>
            <planeBufferGeometry
              args={[1 * baseSize * 0.5, topBar * 3, 2, 2]}
            ></planeBufferGeometry>
            <meshBasicMaterial color="lightgreen"></meshBasicMaterial>
          </mesh>
        </group>

        <mesh
          ref={screenRef}
          onPointerMove={(ev) => {
            uv.copy(ev.uv);
          }}
        >
          <planeBufferGeometry
            args={[app.getWidth(), app.getHeight(), 2, 2]}
          ></planeBufferGeometry>
          <meshBasicMaterial map={fbo.texture}></meshBasicMaterial>
        </mesh>

        {screenRef.current && (
          <lineSegments ref={borderRef} position-z={-0.01} position-y={0.0}>
            <edgesGeometry args={[geo, 10]}></edgesGeometry>
            <lineBasicMaterial color="grey"></lineBasicMaterial>
          </lineSegments>
        )}
      </group>
    </>
  );
}

// let { get } = useThree();
// let fbo = useFBO(1280, 720);
// let myScene = useMemo(() => {
//   return new Scene();
// }, []);

// return (
//   <group>
//     {
//       //
//       createPortal(children, myScene)
//     }

//     <group position-x={0}>
//       <mesh
//         onClick={() => {}}
//         position={[1 * scale * 0.5, 0.9 * scale * 0.5, 0.02]}
//       >
//         <circleBufferGeometry args={[0.05 * 1.3, 24]}></circleBufferGeometry>
//         <meshBasicMaterial color="lightgreen"></meshBasicMaterial>
//       </mesh>
//     </group>

//     <mesh>
//       <planeBufferGeometry
//         args={[1.6 * scale, 0.9 * scale, 2, 2]}
//       ></planeBufferGeometry>
//       <meshBasicMaterial color="grey"></meshBasicMaterial>

//       <mesh position-z={0.01}>
//         <planeBufferGeometry
//           args={[1.6 * scale - border, 0.9 * scale - border, 2, 2]}
//         ></planeBufferGeometry>
//         <meshBasicMaterial map={fbo.texture}></meshBasicMaterial>
//       </mesh>
//     </mesh>
//   </group>
// );
