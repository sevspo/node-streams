import fs from "fs";
import ImageDimensionsStream from "image-dimensions-stream";
import { pipeline } from "stream";
import cloneable from "cloneable-readable";
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

  console.log(imgPath);

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
}
