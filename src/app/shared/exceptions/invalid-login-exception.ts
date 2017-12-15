export class InvalidLoginException extends Error {
  constructor(message: string, stack: any) {
    super(message);
    this.stack = stack;
  }
}
