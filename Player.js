// @flow
// var Logger = require('le_node')
// var log = new Logger({
//   token: 'fda2a63e-3dd4-4b70-9b73-097d51eb8d6d'
// })
const _ = require('underscore')
const cards2Table = require('./cards-2-table')
// const MyStack = require('./my-stack')
const EffectiveStack = require('./effective-stack')
const HeadsUp = require('./heads-up')
// const EffectiveStack = require('./effective-stack')

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

function debugLog (cards, raised, percentage, myStack, isHeadsUp, headsUpCall) {
  let wasHeadsUp = isHeadsUp ? 'heads up PUSH' : ''
  if (headsUpCall) wasHeadsUp = 'heads up CALL'
  console.log(cards2Table.convert(cards), percentage, myStack, 'bb', raised, wasHeadsUp)
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
    const isHeadsUp = HeadsUp.calculate(gameState)
    // const myStack = MyStack.calculate(gameState)
    const effectiveStack = EffectiveStack.calculate(gameState)

    // if (percentage < 18) {
    //   bet(myPlayer.stack)
    // } else {
    //   bet(0)
    // }

    let betValue = 0
    // If not heads up
    if (effectiveStack <= 3) {
      if (!raised && percentage < 81) betValue = myPlayer.stack
      else if (percentage < 48) betValue = myPlayer.stack
    } else if (effectiveStack > 3 && effectiveStack <= 10) {
      if (!raised && percentage < 31) betValue = myPlayer.stack
      else if (percentage < 15) betValue = myPlayer.stack
    } else if (effectiveStack > 10 && effectiveStack <= 20) {
      if (!raised && percentage < 21) betValue = myPlayer.stack
      else if (percentage < 13) betValue = myPlayer.stack
    } else if (effectiveStack > 20 && effectiveStack <= 50) {
      if (!raised && percentage < 8) betValue = myPlayer.stack
      else if (percentage < 6) betValue = myPlayer.stack
    } else {
      if (!raised && percentage < 4) betValue = myPlayer.stack
      else if (percentage < 3.1) betValue = myPlayer.stack
    }

    // If headsup
    let headsUpCall = false
    if (isHeadsUp) {
      if (gameState.pot <= gameState.small_blind * 4) {
        if (effectiveStack <= 3) {
          betValue = myPlayer.stack
        } else if (effectiveStack > 3 && effectiveStack <= 6) {
          if (percentage < 78.7) betValue = myPlayer.stack
        } else if (effectiveStack > 6 && effectiveStack <= 10) {
          if (percentage < 61) betValue = myPlayer.stack
        } else if (effectiveStack > 10 && effectiveStack <= 15) {
          if (percentage < 50) betValue = myPlayer.stack
        } else if (effectiveStack > 15 && effectiveStack <= 25) {
          if (percentage < 26) betValue = myPlayer.stack
        } else if (effectiveStack > 25 && effectiveStack <= 50) {
          if (percentage < 18) betValue = myPlayer.stack
          else if (percentage < 3.1) betValue = myPlayer.stack
        }
      } else {
        headsUpCall = true
        if (effectiveStack <= 3) {
          if (percentage < 77) betValue = myPlayer.stack
        } else if (effectiveStack > 3 && effectiveStack <= 6) {
          if (percentage < 49) betValue = myPlayer.stack
        } else if (effectiveStack > 6 && effectiveStack <= 10) {
          if (percentage < 42) betValue = myPlayer.stack
        } else if (effectiveStack > 10 && effectiveStack <= 15) {
          if (percentage < 29) betValue = myPlayer.stack
        } else if (effectiveStack > 15 && effectiveStack <= 25) {
          if (percentage < 22) betValue = myPlayer.stack
        } else if (effectiveStack > 25 && effectiveStack <= 50) {
          if (percentage < 13) betValue = myPlayer.stack
          else if (percentage < 3.1) betValue = myPlayer.stack
        }
      }
    }

    bet(betValue)
    if (betValue) debugLog(cards, raised, percentage, effectiveStack, isHeadsUp, headsUpCall)
    // console.log(114, cards, raised, percentage, effectiveStack, isHeadsUp)

    // if (isNaN(effectiveStack)) console.log('nan detected', gameState)
    if (effectiveStack === 0) console.log('zero detected', gameState)

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
