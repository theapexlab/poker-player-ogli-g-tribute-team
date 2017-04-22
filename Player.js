// var Logger = require('le_node')
// var log = new Logger({
//   token: 'fda2a63e-3dd4-4b70-9b73-097d51eb8d6d'
// })
const cards2Table = require('./cards-2-table')

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

function debugLog (cards, raised, myPlayer) {
  console.log(cards2Table.convert(cards), raised, myPlayer.stack)
}

class Player {
  static get VERSION () {
    return '0.1'
  }

  static betRequest (gameState, bet) {
    const myPlayer = gameState.players[gameState.in_action]
    const cards = myPlayer.hole_cards
    // const cValue = cardsValue(cards)

    const percentage = cards2Table.getPercentage(cards)

    // const folded = isFolded(gameState)
    const raised = isRaised(gameState)

    // if (percentage < 18) {
    //   bet(myPlayer.stack)
    // } else {
    //   bet(0)
    // }

    if (!raised && percentage < 18) {
      debugLog(cards, raised, myPlayer.stack)
      console.log()
      bet(myPlayer.stack)
    } else if (raised && percentage < 6) {
      debugLog(cards, raised)
      console.log()
      bet(myPlayer.stack)
    } else {
      bet(0)
    }

    // log.info(gameState)
    // log.info(`${JSON.stringify(myPlayer)} ${JSON.stringify(cards)} ${JSON.stringify(cValue)}`)
  }

  static showdown (gameState) {
  }
}

module.exports = Player
