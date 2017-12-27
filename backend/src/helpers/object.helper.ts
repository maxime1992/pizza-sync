export const renameKeyInObject = (
  obj: { [key: string]: any },
  keyToRename: string,
  newKey: string
): { [key: string]: any } => {
  const { [keyToRename]: omit, ...objWithoutKey } = obj;

  return {
    ...objWithoutKey,
    [newKey]: obj[keyToRename],
  };
};

export const renameKeysInObject = (
  obj: { [key: string]: any },
  ids: string[] = [],
  keyToRename: string,
  newKey: string
) =>
  ids.reduce((acc, itemId) => {
    acc[itemId] = renameKeyInObject(obj[itemId], keyToRename, newKey);

    return acc;
  }, {});
