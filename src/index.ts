import { RandomIntStream } from "./random-int-stream";

const stream = new RandomIntStream(1, 100, 200);

stream.on("data", (data) => {
  console.log(data);
});

stream.on("end", () => {
  console.log("end");
});
