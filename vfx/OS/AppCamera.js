import { useEffect } from "react";

export function AppCamera({ app }) {
  useEffect(() => {
    let fbo = app.fbo;
    let myCamera = app[app.activeCam];
    myCamera.position.z = 10;
    myCamera.aspect = fbo.width / fbo.height;

    myCamera.updateProjectionMatrix();
  }, [app.activeCam]);

  return null;
}
