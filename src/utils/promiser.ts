// Adapted from: https://blog.logrocket.com/write-declarative-javascript-promise-wrapper/
export async function promiser<T>(
  promise: Promise<T>
): Promise<[T | null, null | unknown]> {
  try {
    const data = await promise;
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}
