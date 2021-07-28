import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { Color } from "three";

export function BasicRenderingService({ app }) {
  //
  let origColor = new Color();
  useFrame(({ gl }, dt) => {
    let myCamera = app[app.activeCam];
    let myScene = app.scene;
    let fbo = app.fbo;
    if (myCamera && myScene && fbo) {
      let origRTT = gl.getRenderTarget();
      gl.getClearColor(origColor);
      let origAlpha = gl.getClearAlpha();
      gl.setRenderTarget(fbo);
      gl.autoClear = false;
      gl.setClearColor(0xffffff, 0.0);
      gl.clear(true, true, true);
      gl.render(myScene, myCamera);

      gl.setRenderTarget(origRTT);
      gl.autoClear = true;
      gl.setClearColor(origColor);
      gl.setClearAlpha(origAlpha);
    }
  });

  return null;
}
