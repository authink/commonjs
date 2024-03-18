export function emailValidator(message: string) {
  return (rule: unknown, value: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!value || regex.test(value)) {
      return Promise.resolve()
    }
    return Promise.reject(message)
  }
}

export function phoneValidator(message: string) {
  return (rule: unknown, value: string) => {
    const regex = /^1[3-9]\d{9}$/
    if (!value || regex.test(value)) {
      return Promise.resolve()
    }
    return Promise.reject(message)
  }
}
