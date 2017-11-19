export function normalizeArray(
  array: { id: string }[]
): { byId: {}; allIds: string[] } {
  if (!array) {
    return { byId: {}, allIds: [] };
  }

  return array.reduce(
    (acc, next) => {
      acc.byId[next.id] = next;
      acc.allIds.push(next.id);

      return acc;
    },
    { byId: {}, allIds: [] }
  );
}
