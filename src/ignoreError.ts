export async function ignoreError(func: () => Promise<void>) {
  try {
    await func()
    // eslint-disable-next-line no-empty
  } catch (e) {}
}
