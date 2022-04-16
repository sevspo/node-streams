import { Stream } from "stream";

export class RandomIntStream extends Stream.Readable {
  private _min: number;
  private _max: number;
  private _count: number;
  private _index: number;

  constructor(min: number, max: number, count: number) {
    super({ objectMode: true });
    this._min = min;
    this._max = max;
    this._count = count;
    this._index = 0;
  }

  _read() {
    if (this._index >= this._count) {
      this.push(null);
      return;
    }

    const value =
      Math.floor(Math.random() * (this._max - this._min + 1)) + this._min;

    setTimeout(() => {
      this.push(`${value}\n`);
      this._index++;
    }, 250);
  }
}
