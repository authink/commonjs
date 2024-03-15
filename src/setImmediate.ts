export function setImmediate(task: () => void): void {
  queueMicrotask(task)
}
