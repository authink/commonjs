export function setImmediate(task) {
  queueMicrotask(task)
}
