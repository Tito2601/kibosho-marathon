/** Small formatting helpers (blueprint §4). */

/** Zero-pad a number to two digits: 7 -> "07". */
export function pad(n: number): string {
  return (n < 10 ? "0" : "") + n;
}
