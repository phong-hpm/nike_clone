import { FC, useMemo } from "react";

// components
import { ImageCustom } from "@root/components/commons";
import LayoutCardDescriptionLayer from "./LayoutCardDescriptionLayer";

// custom hooks
import useMediaScreen from "@root/hooks/useMediaScreen";

export interface LayoutCardImageProps {
  layoutCardDetail: ILayoutCardDetail;
}

const LayoutCardImage: FC<LayoutCardImageProps> = ({ layoutCardDetail }) => {
  const { preferredOrientation, assetsIds, assetsAspectRatios, imageHeight } = layoutCardDetail;

  const isScreenMD = useMediaScreen("md");
  const isScreenSM = useMediaScreen("sm");

  const imageOrientation = useMemo(() => {
    if (isScreenMD) return preferredOrientation?.large;
    if (isScreenSM) return preferredOrientation?.medium;
    return preferredOrientation?.small;
  }, [isScreenSM, isScreenMD, preferredOrientation]);

  const ratio = useMemo(() => {
    if (imageHeight === "maintain" || imageHeight === "medium") return undefined;
    if (assetsAspectRatios[imageOrientation]) return assetsAspectRatios[imageOrientation];

    return (
      assetsAspectRatios.squarish || assetsAspectRatios.portrait || assetsAspectRatios.landscape
    );
  }, [imageHeight, assetsAspectRatios, imageOrientation]);

  return (
    <>
      <ImageCustom
        src={layoutCardDetail.landscapeURL}
        imageId={assetsIds[imageOrientation]}
        ratio={ratio}
        className={cls(
          imageHeight === "medium" && "object-cover min-h-[500px]",
          imageHeight === "maintain" && "object-cover min-h-[300px]"
        )}
      />

      <LayoutCardDescriptionLayer layoutCardDetail={layoutCardDetail} />
    </>
  );
};

export default LayoutCardImage;
