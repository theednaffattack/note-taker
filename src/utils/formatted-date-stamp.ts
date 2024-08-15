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
