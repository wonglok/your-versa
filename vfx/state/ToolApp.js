import {
  DepthTexture,
  PerspectiveCamera,
  Scene,
  sRGBEncoding,
  Vector2,
  Vector3,
  WebGLRenderTarget,
} from "three";

import { makeShallowStore } from "../utils/make-shallow-store";

let state = {
  fbo: new WebGLRenderTarget(1280, 800, {
    encoding: sRGBEncoding,
    depthTexture: new DepthTexture(1280, 800),
  }),
  aspect: 1280 / 800,

  scene: new Scene(),

  //
  activeCam: "cam1",
  cam1: new PerspectiveCamera(35, 1280 / 800, 0.1, 10000),

  enableOrbit: true,

  uv: new Vector2(),
  isDown: false,

  baseSize: 5,
  border: 0.03,
  topBar: 0.05,
};

state.getWidth = () => {
  return 0.2 + 1 * state.baseSize - state.border;
};

state.getHeight = () => {
  return 0.2 + (1 * state.baseSize) / state.aspect - state.border;
};

state.topRight = ({ get }) => {
  let { viewport: vp } = get();

  return [vp.width / 2, vp.height / 2, 0];
};

const ToolApp = makeShallowStore(state);

export { ToolApp };
