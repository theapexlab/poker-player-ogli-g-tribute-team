module.exports = {
  query: function ({effStack, playersBehind, folded}, _table) {
    const table = _table || global.strategyTable
    if (!table) return 100
    const formattedFolded = folded ? 'TRUE' : 'FALSE'
    const records = table.filter((row) => {
      const isEffstackOk = (row.eff_stack_min <= effStack) && (row.eff_stack_max > effStack)
      return isEffstackOk && (playersBehind === row.players_behind) && (row.folded === formattedFolded)
    })
    if (!records.length) return 100
    return records[0].percentage
  }
}
