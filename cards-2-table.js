const preflopTable = require('./preflop-table.json')
const _ = require('underscore')

/*
{
  "rank": "4",
  "suit": "spades"
},
clubs,spades,hearts,diamonds
 */

function toNum (c) {
  switch (c) {
    case 'J':
      return 11
    case 'Q':
      return 12
    case 'K':
      return 13
    case 'A':
      return 14
    default:
      return parseInt(c)
  }
}

function formatRank (rank) {
  switch (rank) {
    case '10':
      return 'T'
    default:
      return rank
  }
}

module.exports = {
  convert: function (cards) {
    let tableStr = ''
    const firstCardNum = toNum(cards[0].rank)
    const secondCardNum = toNum(cards[1].rank)

    const firstCardString = formatRank(cards[0].rank)
    const secondCardString = formatRank(cards[1].rank)

    if (firstCardNum > secondCardNum) tableStr += `${firstCardString}${secondCardString}`
    else tableStr += `${secondCardString}${firstCardString}`

    if (firstCardNum === secondCardNum) tableStr += '' // do nothing
    else if (cards[0].suit === cards[1].suit) tableStr += 's'
    else tableStr += 'o'

    return tableStr
  },

  getPercentage: function (cards) {
    const cardStr = this.convert(cards)
    const record = _.findWhere(preflopTable, {cards: cardStr})
    return Number(record.percentage)
  }
}
