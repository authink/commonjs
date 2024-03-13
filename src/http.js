export const http = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',

  methods() {
    return [this.GET, this.PUT, this.POST, this.DELETE]
  },

  valid(method) {
    return this.methods.includes(method.toUpperCase())
  },

  isGet(method) {
    return this.GET === method.toUpperCase()
  },

  isPost(method) {
    return this.POST === method.toUpperCase()
  },

  isPut(method) {
    return this.PUT === method.toUpperCase()
  },

  isBadRequest(code) {
    return code === 400
  },

  isUnauthorized(code) {
    return code === 401
  },

  isForbidden(code) {
    return code === 402
  }
}
