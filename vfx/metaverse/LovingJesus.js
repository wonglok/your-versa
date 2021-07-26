import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { MetaMap } from "../r3f/MetaMap";
import { CubeMap } from "../r3f/CubeMap";
import { CameraRigFirstPerson } from "../r3f/CameraRigFirstPerson";
import { Portal } from "../r3f/Portal";
import { Bloomer } from "../r3f/Bloomer";
import { loginGuest, onReady } from "../utils/get-fire";
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
        // it.material = it.material.clone();
        it.material.roughness = 0.2;
        it.material.metalness = 0.9;
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

  let startAt = {
    x: 0.6696873495643494,
    y: 4.393610750044425,
    z: 225.62193080491028,
  };

  //
  return (
    <group>
      <Portal
        bloom={true}
        text={{
          ready: "Play as Guest",
          loading: "Teleporting...",
        }}
        action={({ setLabel }) => {
          // let router = require("next/router").default;
          // router.push("/room/chill");
          // setUpFirebase();

          loginGuest().then(
            () => {
              onReady().then(({ user, db, app }) => {
                // db.ref(`profiles/${user.uid}`).once("value", (snap) => {
                //   if (snap.val()) {
                //     window.location.assign("/room/heavenly");
                //   } else {
                //     window.location.assign("/avatar");
                //   }
                // });
              });
            },
            () => {
              setLabel("login failed...");
            }
          );
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
          ready: "Login / Register",
          loading: "Going There...",
        }}
        action={({ setLabel }) => {
          let router = require("next/router").default;
          router.push("/login");

          // window.location.assign("/login");
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
        intensity={0.5}
        position={[10, 10, 0]}
      ></directionalLight>

      {/* lighting... */}
      <directionalLight
        intensity={0.5}
        position={[-10, 10, 0]}
      ></directionalLight>

      {/* <ambientLight intensity={0.3}></ambientLight> */}

      <Bloomer></Bloomer>
    </group>
  );
}
