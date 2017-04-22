// var Logger = require('le_node')
// var log = new Logger({
//   token: 'fda2a63e-3dd4-4b70-9b73-097d51eb8d6d'
// })
const _ = require('underscore')
const cards2Table = require('./cards-2-table')
const MyStack = require('./my-stack')

// function toNum (c) {
//   switch (c) {
//     case 'J':
//       return 6
//     case 'Q':
//       return 7
//     case 'K':
//       return 8
//     case 'A':
//       return 10

//     default:
//       return parseInt(c) / 2
//   }
// }

// function getBigger (c1, c2) {
//   return c1 > c2 ? c1 : c2
// }

// function cardsValue (cards) {
//   return toNum(cards[0].rank) + toNum(cards[1].rank)
// }

// function isFolded (gameState) {
//   return gameState.pot === (gameState.small_blind * 3)
// }

function isRaised (gameState) {
  return gameState.pot > (gameState.small_blind * 5)
}

function debugLog (cards, raised, percentage, myStack) {
  console.log(cards2Table.convert(cards), percentage, myStack, 'bb', raised)
}

class Player {
  static get VERSION () {
    return '0.1'
  }

  static betRequest (gameState, bet) {
    const myPlayer = _.findWhere(gameState.players, {id: gameState.in_action})
    const cards = myPlayer.hole_cards
    // const cValue = cardsValue(cards)

    const percentage = cards2Table.getPercentage(cards)

    // const folded = isFolded(gameState)
    const raised = isRaised(gameState)
    const myStack = MyStack.calculate(gameState)

    // if (percentage < 18) {
    //   bet(myPlayer.stack)
    // } else {
    //   bet(0)
    // }

    let betValue = 0
    if (myStack <= 3) {
      if (!raised && percentage < 81) betValue = myPlayer.stack
      else if (percentage < 44) betValue = myPlayer.stack
    } else if (myStack > 3 && myStack <= 10) {
      if (!raised && percentage < 46) betValue = myPlayer.stack
      else if (percentage < 22) betValue = myPlayer.stack
    } else {
      if (!raised && percentage < 11) betValue = myPlayer.stack
      else if (percentage < 6) betValue = myPlayer.stack
    }

    if (betValue) debugLog(cards, raised, percentage, myStack)
    bet(betValue)

    // if (!raised && percentage < 18) {
    //   bet(myPlayer.stack)
    //   debugLog(cards, raised, myPlayer)
    //   console.log()
    // } else if (raised && percentage < 6) {
    //   bet(myPlayer.stack)
    //   debugLog(cards, raised, myPlayer)
    //   console.log()
    // } else {
    //   bet(0)
    // }

    // log.info(gameState)
    // log.info(`${JSON.stringify(myPlayer)} ${JSON.stringify(cards)} ${JSON.stringify(cValue)}`)
  }

  static showdown (gameState) {
  }
}

module.exports = Player
