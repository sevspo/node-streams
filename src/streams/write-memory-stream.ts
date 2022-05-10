import stream from "stream";
// todo: use the readable-steam package instead!

export class WriteMemoryStream extends stream.Writable {
  private _data: number[] = [];

  get data() {
    return this._data;
  }

  constructor(options?: stream.WritableOptions) {
    super(options);
  }

  _write(chunk: number, encoding: string, callback: () => void) {
    this._data.push(chunk);
    callback();
  }

  _destroy(
    error: Error | null,
    callback: (error?: Error | null) => void
  ): void {
    this._data = [];
    callback(error);
  }
}
