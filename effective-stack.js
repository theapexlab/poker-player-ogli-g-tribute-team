const lib = {
  calculate: function (gameState) {
    const bigBlind = (2 * gameState.small_blind)
    const myPlayerBet = (parseInt(gameState.players[gameState.in_action].bet))
    const myPlayerStack = (parseInt(gameState.players[gameState.in_action].stack))
    const myPlayerSum = (myPlayerBet + myPlayerStack) / bigBlind
    let activePlayers = 0
    let otherPlayersSumStack = 0

    gameState.players.forEach(function (player) {
      if ((player.id !== gameState.in_action) && (player.status === 'active')) {
        activePlayers += 1
        const stack = parseInt(player.stack)
        const bet = parseInt(player.bet)
        otherPlayersSumStack += (stack + bet) / bigBlind
      }
    })

    let otherPlayerAverageStack = otherPlayersSumStack / activePlayers

    // console.log(myPlayerStack, otherPlayerAverageStack)
    if (myPlayerSum < otherPlayerAverageStack) {
      return myPlayerSum
    } else {
      return otherPlayerAverageStack
    }
  }

  // calculate: function (gameState) {
  //   const myStack = MyStack.calculate(gameState)
  //   const otherPlayerAvg = lib.otherPlayerAvg(gameState)
  //   return Math.min(myStack, otherPlayerAvg)
  // }
}

module.exports = lib
