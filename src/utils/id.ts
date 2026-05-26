export const uid = (prefix = 'id'): string => {
  const r = Math.random().toString(36).slice(2, 9);
  return `${prefix}_${Date.now().toString(36)}_${r}`;
};

export const today = (): string => new Date().toISOString().slice(0, 10);
