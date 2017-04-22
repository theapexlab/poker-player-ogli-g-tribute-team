
const test = require('tape')
const Player = require('./Player')
const gameStateFixture = require('./test/game-state.json')
const cards2Table = require('./cards-2-table')

// test.skip('correct card value',
//   function (t) {
//     t.equal(playerJs.toNum('J'), 11)
//     t.end()
//   }
// )

test('should work', function (t) {
  Player.betRequest(gameStateFixture, function (bet) {
    t.equals
    t.end()
  })
})

test('cards 2 table convert should work', (t) => {
  let cards = [{rank: '4', suit: 'spades'}, {rank: '5', suit: 'spades'}]
  t.equal(cards2Table.convert(cards), '54s')

  cards = [{rank: '4', suit: 'spades'}, {rank: '4', suit: 'spades'}]
  t.equal(cards2Table.convert(cards), '44')

  cards = [{rank: '4', suit: 'spades'}, {rank: '5', suit: 'hearts'}]
  t.equal(cards2Table.convert(cards), '54o')

  cards = [{rank: '10', suit: 'spades'}, {rank: '4', suit: 'hearts'}]
  t.equal(cards2Table.convert(cards), 'T4o')

  t.end()
})

test('cards 2 table percentage should work', (t) => {
  let cards = [{rank: 'A', suit: 'spades'}, {rank: 'A', suit: 'spades'}]
  t.equal(cards2Table.getPercentage(cards), 0.59)

  cards = [{rank: 'J', suit: 'spades'}, {rank: 'K', suit: 'spades'}]
  t.equal(cards2Table.getPercentage(cards), 5.33)

  cards = [{rank: 'A', suit: 'spades'}, {rank: 'Q', suit: 'clubs'}]
  t.equal(cards2Table.getPercentage(cards), 10.65)

  cards = [{rank: 'J', suit: 'spades'}, {rank: 'J', suit: 'clubs'}]
  t.equal(cards2Table.getPercentage(cards), 2.96)

  t.end()
})

// test('strategy table', (t) => {
//   let query = {effStack: 50, playersBehind: 2, folded: true}
//   t.equal(strategyTable.query(query, strategyTableFixture), 13)

//   t.end()
// })

// test('poshelper poshelper', (t) => {
//   let pos = posHelper.posHelper(4, 2, 5)
//   t.eq(pos, {pos: 4, after: 1})

//   pos = posHelper.posHelper(2, 4, 5)
//   t.eq(pos, {pos: 3, after: 2})

//   t.end()
// })

// test('poshelper getPosition', (t) => {
//   let pos = posHelper.posHelper(4, 2, 5)
//   t.eq(pos, {pos: 4, after: 1})

//   pos = posHelper.posHelper(2, 4, 5)
//   t.eq(pos, {pos: 3, after: 2})

//   pos = posHelper.posHelper(2, 4, 4)
//   t.eq(pos, {pos: 3, after: 2})

//   pos = posHelper.posHelper(1, 2, 3)
//   t.eq(pos, {pos: 3, after: 2})

//   pos = posHelper.posHelper(2, 1, 3)
//   t.eq(pos, {pos: 3, after: 2})

//   t.end()
// })

// test('bet request should work', (t) => {
//   const spy = sinon.spy()
//   Player.betRequest(gameState, spy)
//   t.equal(spy.calledOnce, true)
//   t.end()
// })