import * as stream from "stream";

// rewrite of the function above as a class
// it works, kind of but does not handle any errors and cannot be paused independently
export class CloneReadable extends stream.Readable {
  private _readableStream: stream.Readable;
  private _options: stream.ReadableOptions;

  constructor(
    readableStream: stream.Readable,
    options: stream.ReadableOptions
  ) {
    super(options);
    this._readableStream = readableStream;
    this._options = options;

    this._readableStream.on("data", (chunk) => {
      this.push(chunk);
    });

    this._readableStream.on("end", () => {
      this.push(null);
    });

    this._readableStream.on("error", (err) => {
      this.emit("error", err);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _read() {}
}
