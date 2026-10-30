/**
 * Fills `{name}` placeholders in a translated string. A missing value throws, so a
 * typo in a placeholder fails loudly in tests instead of rendering "{year}".
 */
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, name: string) => {
    const value = values[name];
    if (value === undefined) throw new Error(`Missing value for placeholder {${name}}`);
    return String(value);
  });
}
