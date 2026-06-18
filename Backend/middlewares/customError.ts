export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    
    // Mantiene el rastro de la pila de llamadas (stack trace) nativo de JS
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}