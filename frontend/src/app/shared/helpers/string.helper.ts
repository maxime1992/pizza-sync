/**
 * clean the name of a pizza to match the format of the img on the server
 */
export function cleanPizzaName(name: string): string {
  return name.trim().toLowerCase().replace('_', '-').replace(' ', '-').replace('(', '').replace(')', '')
}
