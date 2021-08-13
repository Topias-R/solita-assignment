export function prettifyCamelCase(s: string): string {
  return (s[0].toUpperCase() + s.substr(1)).split(/([A-Z][a-z]+)/).join(' ');
}
