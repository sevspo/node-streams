import { pipeline } from "stream";
import { CloneReadable } from "./streams/clone-readable-stream";
import { LoggerTransformStream } from "./streams/logger-transform-stream";
import { RandomIntStream } from "./streams/random-int-stream";
import { WriteMemoryStream } from "./streams/write-memory-stream";

export function runStreamsPlayground() {
  const stream = new RandomIntStream(1, 50, 20);

  const clone = new CloneReadable(stream, { objectMode: true });

  const log1 = new LoggerTransformStream("log1", { objectMode: true });

  const log2 = new LoggerTransformStream("log2", { objectMode: true });

  const wStream1 = new WriteMemoryStream();

  const wStream2 = new WriteMemoryStream();

  let count = 0;

  // stream.on("data", (chunk) => {
  //   console.log("second", chunk);
  // });

  // The readable.pause() method has no effect if there is a 'readable'event listener
  // Because the stream is in a diferent reading mode.
  // only the fifth value will be read now because readable event has precedence over data
  // form the clone, so no data will be read in the first place.
  // clone.on("readable", () => {
  //   count += 1;
  //   if (count === 5) {
  //     console.log("fifth", clone.read());
  //     clone.pause();
  //   }
  // });

  // this does work though
  clone.on("data", () => {
    count += 1;
    if (count === 5) {
      console.log("fifth");
      clone.pause();
      setTimeout(() => {
        console.log("resume");
        clone.resume();
      }, 1200);
    }
  });

  // stream.on("resume", () => {
  //   console.log("stream flowing");
  // });

  // clone.on("data", (data) => {
  //   console.log("clone", data);
  // });

  // writeStream.on("finish", () => {
  //   console.log("finished", writeStream.data);
  // });

  // wStream2.on("close", () => {
  //   console.log("closed", wStream1.data);
  // });

  pipeline(stream, log1, wStream1, (err) => console.log(err));

  // so this works, i can pipe the same steam into two pipelines
  // but this does not seem to work in the multer storage example
  // pipeline(stream, log2, wStream2, (err) => console.log(err));

  pipeline(clone, log2, wStream2, (err) => console.log(err));

  // it also seems to work if there is no writable stream in the pipe, the transformStram seems to be enuogh
  // to get data flowing? => no, not without a listener!

  // pause means a stream stops emitting, but will coninue to process the data pushed into it
  // and build up the buffer.
}
