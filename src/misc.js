export function maybe(exp, d) {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
}