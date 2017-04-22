const _ = require('underscore')
module.exports = {
  calculate: (gameState) => {
    const activePlayers = _.where(gameState.players, {status: 'active'})
    return activePlayers.length === 2
  }
}