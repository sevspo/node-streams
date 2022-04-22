import stream from "stream";

export class LoggerTransformStream extends stream.Transform {
  private name: string;

  constructor(name: string, options: any) {
    super(options);
    this.name = name;
  }

  _transform(chunk: any, encoding: string, callback: Function) {
    console.log(this.name, chunk);
    this.push(chunk);
    callback(null, chunk);
  }
}
