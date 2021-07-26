import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh, MeshBasicMaterial, Raycaster, Vector2, Vector3 } from "three";
import { Now, Words } from "../state/Now";
import { applyAutoEvent, useAutoEvent } from "../utils/use-auto-event";
import { MetaPlayer } from "./MetaPlayer";
import { MeshBVH } from "three-mesh-bvh";

export function MetaMap({
  startAt,
  floor,
  showDebug = false,
  onCreated = () => {},
}) {
  let { get } = useThree();
  let colliderRef = useRef();
  let worksRef = useRef({});
  useEffect(() => {
    if (!floor) {
      throw new Error("no floor provided");
    }

    let BufferGeometryUtils =
      require("three/examples/jsm/utils/BufferGeometryUtils").BufferGeometryUtils;
    let SkeletonUtils =
      require("three/examples/jsm/utils/SkeletonUtils").SkeletonUtils;

    let environment = SkeletonUtils.clone(floor);

    const geometries = [];

    environment.updateMatrixWorld();
    environment.traverse((c) => {
      if (c.geometry && !c.userData.skipFloorGen) {
        const cloned = c.geometry.clone();
        cloned.applyMatrix4(c.matrixWorld);

        for (const key in cloned.attributes) {
          if (key === "position" || key === "index") {
          } else {
            cloned.deleteAttribute(key);
          }
        }

        geometries.push(cloned);
      }
    });

    get().scene.traverse((it) => {
      if (it && it.userData && it.userData.obstacle && it.geometry) {
        let cloned = it.geometry.clone();
        it.updateMatrixWorld();

        cloned.applyMatrix4(it.matrixWorld);
        for (const key in cloned.attributes) {
          if (key !== "position") {
            cloned.deleteAttribute(key);
          }
        }
        geometries.push(cloned);
      }
    });

    let mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
      geometries,
      false
    );

    mergedGeometry.boundsTree = new MeshBVH(mergedGeometry);

    const collider = new Mesh(
      mergedGeometry,
      new MeshBasicMaterial({ color: 0xffffff })
    );
    collider.material.wireframe = true;
    collider.material.opacity = 0.5;
    collider.material.transparent = true;
    collider.updateMatrixWorld();

    // invMat.copy(collider.matrixWorld).invert();

    // let visualizer = new MeshBVHVisualizer(collider, 10);
    colliderRef.current = collider;

    onCreated({ collider });
    //
  }, [floor]);

  useEffect(() => {
    ///
    let collider = colliderRef.current;
    if (collider) {
      let center = new Vector2(0, 0);
      let getHover = () => {
        let { camera, raycaster, scene } = get();

        raycaster.setFromCamera(center, camera);
        let res = [];
        let src = [];
        scene.traverse((it) => {
          if (it.geometry && it.userData.hoverable) {
            src.push(it);
          }
        });
        raycaster.intersectObjects(src, false, res);

        collider.geometry.boundsTree.raycastFirst(
          collider,
          raycaster,
          raycaster.ray
        );

        let first = res[0];

        if (first) {
          Now.cursorPos.copy(first.point);
          Now.cursorNormal.copy(first.face.normal);
        } else {
        }
      };

      const floorcaster = new Raycaster();
      let getHitFromMouse = () => {
        const mouse = get().mouse;
        const camera = get().camera;
        floorcaster.setFromCamera(mouse, camera);

        const hit = collider.geometry.boundsTree.raycastFirst(
          collider,
          floorcaster,
          floorcaster.ray
        );

        if (hit) {
          return hit;
        }
      };

      worksRef.current.hoverOrDrag = () => {
        if (Now.camMode === Words.firstPerson) {
          getHover();
        } else if (Now.camMode === Words.birdView) {
          if (Now.isDown) {
            let hit = getHitFromMouse();
            if (hit) {
              Now.goingTo.copy(hit.point);
            }
          }
        }
      };

      let h = {
        click: (e) => {
          let hit = getHitFromMouse();
          if (hit && Now.camMode === Words.birdView) {
            console.log(hit.point);
          }
        },
        goDown: (e) => {
          Now.isDown = true;
        },
        goUp: (e) => {
          Now.isDown = false;
          Now.needsSync = true;
        },
        goMove: (e) => {
          let mouse = get().mouse;
          if (Now.isDown && !(mouse.x === 0 && mouse.y === 0)) {
            getHitFromMouse();
          }
        },

        clicker: () => {
          if (Now.camMode === Words.firstPerson) {
            console.log(Now.cursorPos);
          }
        },
      };

      let cleans = [];

      cleans.push(applyAutoEvent(get().gl.domElement, "pointerdown", h.goDown));
      cleans.push(applyAutoEvent(get().gl.domElement, "pointerup", h.click));
      cleans.push(applyAutoEvent(get().gl.domElement, "pointerup", h.goUp));
      cleans.push(applyAutoEvent(get().gl.domElement, "pointermove", h.goMove));
      cleans.push(applyAutoEvent(get().gl.domElement, "click", h.clicker));
      cleans.push(applyAutoEvent(get().gl.domElement, "pointerdown", h.goDown));

      return () => {
        cleans.forEach((e) => e());
      };
    }

    return () => {};
  }, [startAt]);

  useFrame(({ get }, dt) => {
    //
    let arg = { get, dt };
    Object.values(worksRef.current).forEach((f) => {
      f(arg);
    });
  });

  //
  return (
    <group>
      <group visible={showDebug}>
        {colliderRef.current && (
          <primitive object={colliderRef.current}></primitive>
        )}
      </group>
      {colliderRef.current && (
        <MetaPlayer
          startAt={startAt}
          collider={colliderRef.current}
        ></MetaPlayer>
      )}
    </group>
  );
}
