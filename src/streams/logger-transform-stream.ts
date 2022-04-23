import stream from "stream";

export class LoggerTransformStream extends stream.Transform {
  private name: string;

  constructor(name: string, options: stream.TransformOptions) {
    super(options);
    this.name = name;
  }

  _transform(
    chunk: unknown,
    encoding: string,
    callback: stream.TransformCallback
  ) {
    console.log(this.name, chunk);
    this.push(chunk);
    callback(null, chunk);
  }
}
