import stream from "stream";

export class WriteMemoryStream extends stream.Writable {
  private _data: number[] = [];

  get data() {
    return this._data;
  }

  constructor() {
    super({ objectMode: true });
  }

  _write(chunk: number, encoding: string, callback: Function) {
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
