class ConflictError extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.message = 'Поле title должно быть уникальным';
    this.statusCode = 409;
  }
}

export default ConflictError;
