import { useEffect } from "react";

export const useAutoEvent = function (ev, fnc, settings = { passive: false }) {
  useEffect(() => {
    window.addEventListener(ev, fnc, settings);
    return () => {
      window.removeEventListener(ev, fnc);
    };
  }, []);
};

export const applyAutoEvent = function (
  ev,
  fnc,
  settings = { passive: false }
) {
  window.addEventListener(ev, fnc, settings);
  return () => {
    window.removeEventListener(ev, fnc);
  };
};
