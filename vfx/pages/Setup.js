import { Plane } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { Color } from "three";
import { ShaderCubeChrome } from "../shader/ShaderCubeChrome";

export function Setup() {
  //
  return (
    <>
      <div className={"absolute top-0 right-0 w-full h-full"}>
        <Canvas className="h-full w-full" dpr={0.25}>
          <Content></Content>
        </Canvas>
      </div>

      <div className={"absolute top-0 right-0 w-full h-full"}>
        <div className="h-full w-full flex flex-col items-center justify-center ">
          <div className=" bg-white rounded-3xl shadow-lg border border-green-600  mx-8">
            <h1 className="text-3xl mb-3 p-4 text-center text-white bg-green-600 rounded-t-3xl border-b">
              Setup Guide
            </h1>
            <pre className="p-4 font-sans whitespace-pre-wrap leading-8 text-lg">
              {`
1. Copy and Paste your firebase config to "versa.config.js"
2. Copy and Paste Security Rules to firebase realtime database.
3. Add your domain to firebase login authorisation section.
4. Enable google login and aynonmous login.
5. Deploy this to vercel / netlify.
            `.trim()}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
}

function Content() {
  let { viewport, gl } = useThree();
  let rainbow = useMemo(() => {
    let rainbow = new ShaderCubeChrome({
      renderer: gl,
      res: 1024,
      color: new Color("#ffffff"),
    });
    return rainbow;
  });

  useFrame((st, dt) => {
    rainbow.compute({ time: st.clock.getElapsedTime() });
  });

  return (
    <group>
      {rainbow && (
        <Plane args={[viewport.width, viewport.height * 2, 2, 2]}>
          <meshBasicMaterial envMap={rainbow.out.envMap}></meshBasicMaterial>
        </Plane>
      )}
    </group>
  );
}
