/**
 * normalizeArray
 *
 * @param {any} arr An array of type [{id: 'id1', ...}]
 * @returns {id1: {id: 'id1', ...}}
 */
function normalizeArray(arr) {
  return arr.reduce((acc, next) => {
    acc.byId[next.id] = next
    acc.allIds.push(next.id)

    return acc
  }, { byId: {}, allIds: [] })
}

module.exports = { normalizeArray }
