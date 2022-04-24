import fs from "fs";
import ImageDimensionsStream from "image-dimensions-stream";
import { pipeline } from "stream";
import cloneable from "cloneable-readable";

export function runImageStreamsSetup() {
  console.log("testing setup");

  const inStream = fs.createReadStream(
    "/home/sever/projects/node/node-streams/images/love-1438.jpg"
  );

  const outStream = fs.createWriteStream(
    "/home/sever/projects/node/node-streams/uploads/love-1438-copy.jpg"
  );

  const inCopy = cloneable(inStream);

  const dim = new ImageDimensionsStream();

  dim.on("dimensions", (dimensions) => {
    console.log(dimensions);
    // this approach does not work, because the stream has partially been read and the image will be corrupted.
    // check this https://stackoverflow.com/questions/36980201/how-to-reset-nodejs-stream for a solution
    pipeline(inCopy, outStream, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("done");
      }
    });
  });

  pipeline(inStream, dim, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("image dimensions:", dim.data);
    }
  });
}
