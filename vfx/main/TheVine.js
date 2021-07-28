import { AppDisplay } from "../OS/AppDisplay";
import { ContentService } from "../OS/ContentService";
import { BasicRenderingService } from "../OS/BasicRenderingService";
import { ToolApp } from "../state/ToolApp";
import { AppHUI } from "../OS/AppHUI";
import { AppCamera } from "../OS/AppCamera";
import { Box, PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export function TheVine() {
  let { get } = useThree();

  return (
    <>
      <PerspectiveCamera
        fov={45}
        position-z={15}
        makeDefault
      ></PerspectiveCamera>

      <AppDisplay
        app={ToolApp}
        location={ToolApp.topRight({ get })}
        uv={ToolApp.uv}
      ></AppDisplay>

      <AppCamera app={ToolApp}></AppCamera>
      <ContentService app={ToolApp}>
        <Box position={[0, 1, 0]}></Box>
        <Box position={[0, -1, 0]}></Box>
      </ContentService>
      <AppHUI app={ToolApp}></AppHUI>
      <BasicRenderingService app={ToolApp}></BasicRenderingService>
    </>
  );
}
