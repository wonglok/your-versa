// import { Vector3 } from "three";
import { Vector3 } from "three";
import { makeShallowStore } from "../utils/make-shallow-store";

export const Words = {
  // cursorType
  hideCursor: "hide",
  showCursor: "show",

  // camMode
  firstPerson: "firstPerson",
  birdView: "birdView",

  // avatarMode
  running: "running",
  standing: "standing",
};

export const Now = makeShallowStore({
  goingTo: new Vector3(),
  avatarAt: new Vector3(),
  avatarMode: Words.standing,
  avatarRot: new Vector3(),

  avatarSpeed: 1,

  keyW: false,
  keyA: false,
  keyS: false,
  keyD: false,
  cursorPos: new Vector3(),
  cursorNormal: new Vector3(),
  cursorType: Words.hideCursor,
  isDown: false,

  camMode: Words.firstPerson,

  //
  roomView: {
    target: new Vector3(),
    position: new Vector3(0, 100, 100),
  },

  //
  topView: {
    target: new Vector3(),
    position: new Vector3(0, 100, 0),
  },

  viewMode: "topView",

  //

  // //
  // isUnLocked: true,
  // enableFloorCursor: true,

  // speed: 1.0,
  // moved: 0,
  // camAt: new Vector3(),
  // avatarHead: new Vector3(),
  // avatarRot: new Vector3(),
  // avatarFaceLook: new Vector3(),
  // avatarLoading: true,
  // avatarMode: "standing",
  // // avatarAtPhy: new Vector3(),
  // hit: new Vector3(),
  // camMode: "auto",
  // // camMode: "first",
  // overlay: "",
  // profile: false,
  // user: false,
  // reload: [],
  // onlineUID: [],
  // restoreAt: new Vector3(),
});
