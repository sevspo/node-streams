import fs from "fs";
import ImageDimensionsStream from "image-dimensions-stream";
import { pipeline } from "stream";
import cloneable from "cloneable-readable";
import * as mem from "memory-streams";
import * as dotenv from "dotenv";
import path from "path";
dotenv.config();

export function runImageStreamsSetup() {
  console.log("testing setup");

  const imgPath = path.join(
    __dirname,
    "..",
    "images",
    process.env.TEST_IMG_NAME as string
  );

  async function testImageDimensionsStream() {
    const imgStream = fs.createReadStream(imgPath);
    const imgDimensionsStream = new ImageDimensionsStream();
    const memStream = new mem.WritableStream();

    let imgDimensions: { width: number; height: number };

    imgDimensionsStream.on("dimensions", (dimensions) => {
      // imgDimensions = dimensions;
      console.log("dimensions", dimensions);
      // console.log(memStream);
    });

    // memStream.on("finish", () => {
    //   console.log(memStream.toBuffer());
    // });

    memStream.on("data", (data) => {
      console.log(data);
    });

    imgStream.pipe(memStream);

    // pipeline(imgStream, imgDimensionsStream, (err) => {
    //   if (err) {
    //     console.error(err);
    //   }
    // });

    // const imgDimensions = imgDimensionsStream.getImageDimensions();
  }

  testImageDimensionsStream();

  // testImageDimensionsStream()
  //   .then(() => {
  //     console.log("done");
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });

  // const imgDimensions = await new Promise((resolve, reject) => {
  //   imgDimensionsStream.once("data", (data) => {
  //     resolve(data);
  //   });
  // });
}

// dim.on("dimensions", (dimensions) => {
//   console.log(dimensions);
//   // this approach does not work, because the stream has partially been read and the image will be corrupted.
//   // check this https://stackoverflow.com/questions/36980201/how-to-reset-nodejs-stream for a solution
//   pipeline(inCopy, outStream, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("done");
//     }
//   });
// });
