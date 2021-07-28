import { createPortal } from "@react-three/fiber";

export function ContentService({ app, children }) {
  return createPortal(<group>{children}</group>, app.scene);
}
