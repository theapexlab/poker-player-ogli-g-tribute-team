const _ = require('underscore')
module.exports = {
  calculate: function (gameState) {
    const myPlayer = _.findWhere(gameState.players, {id: gameState.in_action})
    const myStack = myPlayer.stack
    return myStack / (gameState.small_blind * 2)
  }
}
