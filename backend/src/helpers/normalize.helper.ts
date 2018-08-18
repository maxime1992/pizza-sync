export function normalizeArray(
  array: { id: string }[]
): { entities: {}; ids: string[] } {
  if (!array) {
    return { entities: {}, ids: [] };
  }

  return array.reduce(
    (acc, next) => {
      acc.entities[next.id] = next;
      acc.ids.push(next.id);

      return acc;
    },
    { entities: {}, ids: [] }
  );
}
