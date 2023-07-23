export class Error403 extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);

    this.name = 'CustomError';
    this.statusCode = 403;
  }
}
