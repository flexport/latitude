/**
 * TEAM: frontend_infra
 *
 * @flow
 */

import {MAX_FILE_SIZE} from "../constants/DocumentConstants";

function dataURItoFile(dataURI: string, name: string): File | Blob {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(",")[0].includes("base64")) {
    byteString = atob(dataURI.split(",")[1]);
  } else {
    byteString = unescape(dataURI.split(",")[1]);
  }

  // separate out the mime component
  const mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ia], {type: mimeString});
  try {
    return new File([blob], name, {type: mimeString});
  } catch (e) {
    // Hack: IE 11/Edge don't support the File constructor
    // https://social.msdn.microsoft.com/Forums/ie/en-US/9daae67a-f3f6-4359-a42b-1e0c7e50ed44/how-to-create-a-file-instannce-using-html-5-file-api?forum=iewebdevelopment
    // $FlowFixMe(dmnd): Leaving existing code instead of fixing type error
    blob.name = name;
    // $FlowFixMe(dmnd): Leaving existing code instead of fixing type error
    blob.lastModifiedDate = Date.now();
    return blob;
  }
}

function getHalfScaleCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
  const halfCanvas = document.createElement("canvas");
  halfCanvas.width = canvas.width / 2;
  halfCanvas.height = canvas.height / 2;

  halfCanvas
    .getContext("2d")
    .drawImage(canvas, 0, 0, halfCanvas.width, halfCanvas.height);

  return halfCanvas;
}

function applyBilinearInterpolation(
  srcCanvasData: ImageData,
  destCanvasData: ImageData,
  scale: number
) {
  function inner(
    f00: number,
    f10: number,
    f01: number,
    f11: number,
    x: number,
    y: number
  ) {
    const unX = 1.0 - x;
    const unY = 1.0 - y;
    return f00 * unX * unY + f10 * x * unY + f01 * unX * y + f11 * x * y;
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < destCanvasData.height; ++i) {
    const iyv = i / scale;
    const iy0 = Math.floor(iyv);
    // Math.ceil can go over bounds
    const iy1 =
      Math.ceil(iyv) > srcCanvasData.height - 1
        ? srcCanvasData.height - 1
        : Math.ceil(iyv);
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < destCanvasData.width; ++j) {
      const ixv = j / scale;
      const ix0 = Math.floor(ixv);
      // Math.ceil can go over bounds
      const ix1 =
        Math.ceil(ixv) > srcCanvasData.width - 1
          ? srcCanvasData.width - 1
          : Math.ceil(ixv);
      const idxD = (j + destCanvasData.width * i) * 4;
      // matrix to vector indices
      const idxS00 = (ix0 + srcCanvasData.width * iy0) * 4;
      const idxS10 = (ix1 + srcCanvasData.width * iy0) * 4;
      const idxS01 = (ix0 + srcCanvasData.width * iy1) * 4;
      const idxS11 = (ix1 + srcCanvasData.width * iy1) * 4;
      // overall coordinates to unit square
      const dx = ixv - ix0;
      const dy = iyv - iy0;

      const r = inner(
        srcCanvasData.data[idxS00],
        srcCanvasData.data[idxS10],
        srcCanvasData.data[idxS01],
        srcCanvasData.data[idxS11],
        dx,
        dy
      );
      /* eslint-disable no-param-reassign */
      destCanvasData.data[idxD] = r;

      const g = inner(
        srcCanvasData.data[idxS00 + 1],
        srcCanvasData.data[idxS10 + 1],
        srcCanvasData.data[idxS01 + 1],
        srcCanvasData.data[idxS11 + 1],
        dx,
        dy
      );
      destCanvasData.data[idxD + 1] = g;

      const b = inner(
        srcCanvasData.data[idxS00 + 2],
        srcCanvasData.data[idxS10 + 2],
        srcCanvasData.data[idxS01 + 2],
        srcCanvasData.data[idxS11 + 2],
        dx,
        dy
      );
      destCanvasData.data[idxD + 2] = b;

      const a = inner(
        srcCanvasData.data[idxS00 + 3],
        srcCanvasData.data[idxS10 + 3],
        srcCanvasData.data[idxS01 + 3],
        srcCanvasData.data[idxS11 + 3],
        dx,
        dy
      );
      destCanvasData.data[idxD + 3] = a;
      /* eslint-enable no-param-reassign */
    }
  }
}

type Config = {
  // number from 0 to 1, default as 0.9,
  quality: number,

  // maximum width of the image in pixels, default at 1024
  maxWidth: number,
};

/**
 * ImageScaler helps you scale down huge images before uploading them to the server.
 * Example:
 * ```
 *   let imgScaler = new ImageScaler();
 *   imgScaler.process(img, function(resultImgData) {
 *     DocumentActions.create({
 *       attachment: resultImageData
 *       ...
 *     })
 *   });
 */
export default class ImageScaler {
  config: Config;

  constructor({quality = 0.9, maxWidth = 1024}: Config = {}) {
    this.config = {quality, maxWidth};
  }

  process(file: File, completionCallback: (File | Blob) => void): void {
    if (file.size <= MAX_FILE_SIZE || file.type === "image/gif") {
      completionCallback(file);
      return;
    }

    const img = document.createElement("img");
    const reader = new FileReader();

    reader.onload = (e: Event) => {
      // $FlowFixMe(dmnd): Leaving existing code instead of fixing type error
      img.src = e.target.result; // TODO(dmnd): Should be reader.result
      setTimeout(() => {
        const scaledFile = dataURItoFile(this.scaleImage(img), file.name);
        completionCallback(scaledFile);
      }, 0);
    };

    reader.readAsDataURL(file);
  }

  scaleImage(img: HTMLImageElement): string {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);

    while (canvas.width >= 2 * this.config.maxWidth) {
      canvas = getHalfScaleCanvas(canvas);
    }

    if (canvas.width > this.config.maxWidth) {
      canvas = this.scaleCanvasWithAlgorithm(canvas);
    }

    return canvas.toDataURL("image/jpeg", this.config.quality);
  }

  scaleCanvasWithAlgorithm(canvas: HTMLCanvasElement): HTMLCanvasElement {
    const scaledCanvas = document.createElement("canvas");

    const scale = this.config.maxWidth / canvas.width;

    scaledCanvas.width = canvas.width * scale;
    scaledCanvas.height = canvas.height * scale;

    const srcImgData = canvas
      .getContext("2d")
      .getImageData(0, 0, canvas.width, canvas.height);
    const destImgData = scaledCanvas
      .getContext("2d")
      .createImageData(scaledCanvas.width, scaledCanvas.height);

    applyBilinearInterpolation(srcImgData, destImgData, scale);

    scaledCanvas.getContext("2d").putImageData(destImgData, 0, 0);

    return scaledCanvas;
  }
}
