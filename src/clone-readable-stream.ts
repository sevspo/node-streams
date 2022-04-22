import * as stream from "stream";

// rewrite of the function above as a class
// it works, but does not handle any errors and such
export class CloneReadable extends stream.Readable {
  private _readableStream: stream.Readable;
  private _options: any;

  constructor(readableStream: stream.Readable, options: any) {
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

  _read() {}
}
