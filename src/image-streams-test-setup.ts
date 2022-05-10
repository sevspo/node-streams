import fs from "fs";
import ImageDimensionsStream from "image-dimensions-stream";
import { pipeline, Readable } from "stream";
import * as rs from "readable-stream";
import cloneable from "cloneable-readable";
import * as mem from "memory-streams";
import * as dotenv from "dotenv";
import path from "path";
import { WriteMemoryStream } from "./streams/write-memory-stream";
import util from "util";
import * as re from "rereadable-stream";

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
    // const asyncPipeline = util.promisify(pipeline);

    const imgStream = fs.createReadStream(imgPath);
    const imgDimensionsStream = new ImageDimensionsStream();
    // const memStream = new WriteMemoryStream();
    // const memStream = new mem.WritableStream();
    const rereadable = new re.ReReadable();
    const write = fs.createWriteStream(
      path.join(__dirname, "..", "uploads", "test-img-dimensions.jpg")
    );

    let imgDimensions: { width?: number; height?: number } = {};

    pipeline(imgStream, imgDimensionsStream, rereadable, (err) => {
      if (err) {
        console.error(err);
      }
    });

    imgDimensionsStream.on("dimensions", (dimensions) => {
      imgDimensions = dimensions;
      console.log("dimensions", imgDimensions);
      const re = rereadable.rewind();
      re.pipe(write);
    });
  }

  testImageDimensionsStream();

  // testImageDimensionsStream()
  //   .then((buffer) => {
  //     console.log("done", buffer);
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
