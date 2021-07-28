import { Canvas } from "@react-three/fiber";
import { getGPUTier } from "detect-gpu";
import { useState } from "react";
import { sRGBEncoding } from "three";
import { TheVine } from "../main/TheVine";

export function Landing() {
  return (
    <div className="w-full h-full">
      <CanvasArea></CanvasArea>
    </div>
  );
}

function CanvasArea() {
  let [dpr, setDPR] = useState([1, 3]);

  return (
    <Canvas
      // dpr={
      //   (typeof window !== "undefined" && window.devicePixelRatio) || 1.0
      // }

      onCreated={({ gl }) => {
        gl.outputEncoding = sRGBEncoding;
        //
        getGPUTier({ glContext: gl.getContext() }).then((v) => {
          // ipad
          if (v.gpu === "apple a9x gpu") {
            setDPR([1, 1]);
            return;
          }

          if (v.fps < 30) {
            setDPR([1, 1]);
            return;
          }

          if (v.tier >= 3) {
            setDPR([1, 3]);
          } else if (v.tier >= 2) {
            setDPR([1, 2]);
          } else if (v.tier >= 1) {
            setDPR([1, 1]);
          } else if (v.tier < 1) {
            setDPR([1, 0.75]);
          }
        });
      }}
      dpr={dpr}
    >
      <TheVine></TheVine>
    </Canvas>
  );
}
