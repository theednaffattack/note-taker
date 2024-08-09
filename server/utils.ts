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

// Adapted from: https://stackoverflow.com/a/29774197
export function formattedDateStamp() {
  // Make YYYY_MM_DD
  let yourDate = new Date();
  yourDate.toISOString().split("T")[0];

  // Handle timezone
  const offset = yourDate.getTimezoneOffset();
  yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
  return yourDate.toISOString().split("T")[0];
}
