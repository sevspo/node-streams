import { pipeline } from "stream";
import { CloneReadable } from "./clone-readable-stream";
import { LoggerTransformStream } from "./logger-transform-stream";
import { RandomIntStream } from "./random-int-stream";
import { WriteMemoryStream } from "./write-memory-stream";

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

// stream.on("readable", () => {
//   count += 1;
//   if (count === 5) {
//     console.log("fifth", stream.read());
//   }
// });

// stream.on("resume", () => {
//   console.log("stream flowing");
// });

// clone.on("data", (data) => {
//   console.log("clone", data);
// });

// writeStream.on("finish", () => {
//   console.log("finished", writeStream.data);
// });

// writeStream.on("close", () => {
//   console.log("closed", writeStream.data);
// });

pipeline(stream, log1, wStream1, (err) => console.log(err));

// so this works, i can pipe the same steam into two pipelines
// but this does not seem to work in the multer storage example
pipeline(stream, log2, wStream2, (err) => console.log(err));
