/**
 *
 * @param length number
 * @returns Return a random id
 */
export function makeId(length: number) {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))
  return text
}
