export const http = {
  GET: 'GET' as const,
  PUT: 'PUT' as const,
  POST: 'POST' as const,
  DELETE: 'DELETE' as const,

  methods(): ReadonlyArray<string> {
    return [this.GET, this.PUT, this.POST, this.DELETE]
  },

  valid(method: string): boolean {
    return this.methods().includes(method.toUpperCase())
  },

  isGet(method: string): boolean {
    return this.GET === method.toUpperCase()
  },

  isPost(method: string): boolean {
    return this.POST === method.toUpperCase()
  },

  isPut(method: string): boolean {
    return this.PUT === method.toUpperCase()
  },

  isBadRequest(code: number): boolean {
    return code === 400
  },

  isUnauthorized(code: number): boolean {
    return code === 401
  },

  isForbidden(code: number): boolean {
    return code === 403
  },
}
