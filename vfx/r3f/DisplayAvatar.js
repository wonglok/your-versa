import { useFBX } from "@react-three/drei";
import { useMemo, useRef } from "react";

// export let setChibiURL = async ({ chibi, refURL }) => {
//   if (refURL !== null) {
//     AvaState.loading = true;
//     let link = await getURLByRefURL(refURL);

//     chibi.traverse((k) => {
//       if (k.material) {
//         new TextureLoader().load(
//           link,
//           (tex) => {
//             k.material.map = tex;
//             k.material.needsUpdate = true;
//             AvaState.loading = false;
//           },
//           () => {},
//           () => {
//             AvaState.loading = false;
//           }
//         );
//       }
//     });
//   } else if (refURL === "") {
//     chibi.traverse((k) => {
//       if (k.material) {
//         k.material.map = null;
//       }
//     });
//   }
// };

export function MainAvatarLogic({ profile, url }) {
  let ref = useRef();

  let raw = useFBX(profile.avatarURL);
  let avatar = useMemo(() => {
    let other = SkeletonUtils.clone(raw);

    // if useFBX

    if (profile.avatarURL.indexOf(".fbx") !== -1) {
      other.scene = other;
    }

    other.traverse((item) => {
      if (item.material) {
        item.material = item.material.clone();
      }
    });

    return other;
  }, [raw]);

  //

  useEffect(() => {
    //
    if (profile.avatarTextureRefURL) {
      // setChibiURL({ chibi: avatar.scene, refURL: profile.avatarTextureRefURL });
    }
  }, [profile.avatarTextureRefURL]);

  let model = useMemo(() => {
    let cloned = SkeletonUtils.clone(avatar.scene);

    cloned.scale.set(0.0075, 0.0075, 0.0075);
    cloned.traverse((item) => {
      if (item) {
        if (item.material) {
          item.castShadow = true;
          item.material.side = DoubleSide;
        }
      }
    });
    return cloned;
  }, []);

  let running = useFBX(
    `/chibi/actions-for-this/contorls/running-in-place-relax.fbx`
  );
  let standing = useFBX(`/chibi/actions-for-this/contorls/idle-breathing.fbx`);
  let mixer = useMemo(() => new AnimationMixer(), []);

  useEffect(() => {
    let lastAction = { current: false, mode: false };

    let runAction = () => {
      if (lastAction.mode === Now.avatarMode) {
        return;
      }
      lastAction.mode = Now.avatarMode;

      if (lastAction.current) {
        lastAction.current.fadeOut(0.3);
      }

      if (Now.avatarMode === "running") {
        //
        let clip = running.animations[0];
        let action = mixer.clipAction(clip, ref.current);
        action.reset();
        action.fadeIn(0.2);
        action.play();
        lastAction.current = action;
      }
      if (Now.avatarMode === "standing") {
        //300

        let clips = [standing.animations[0]];
        let clip = clips[Math.floor(clips.length * Math.random())];
        let action = mixer.clipAction(clip, ref.current);
        action.reset();
        action.fadeIn(0.2);
        action.play();
        lastAction.current = action;
      }
    };

    runAction();
    let clean = Now.onEventChangeKey("avatarMode", runAction);
    return () => {
      clean();
    };
  }, []);

  useFrame((st, dt) => {
    mixer.update(dt);
  });

  //
  //console.log(avatar);
  //

  useFrame(() => {
    if (ref.current) {
      Now.avatarAt.y += -2.0 - 0.25;
      ref.current.position.copy(Now.avatarAt);
    }
    if (ref.current) {
      ref.current.rotation.x = Now.avatarRot.x;
      ref.current.rotation.y = Now.avatarRot.y;
      ref.current.rotation.z = Now.avatarRot.z;
    }
  });

  return (
    <group ref={ref}>
      <group>
        <primitive castShadow={true} name="avatar" object={model}></primitive>
      </group>
    </group>
  );
}
