export class ClientError extends Error {
  code: number
  statusCode: number

  constructor(code: number, message: string, statusCode: number = 400) {
    super(message)
    this.code = code
    this.statusCode = statusCode
  }
}

export class ServerError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number = 500) {
    super(message)
    this.statusCode = statusCode
  }
}
