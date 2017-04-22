
const test = require('tape')
const Player = require('./Player')
const gameStateFixture = require('./test/game-state.json')
const gameStateFixture2 = require('./test/game-state-2.json')
const gameStateFixture3 = require('./test/game-state-3.json')
const gameStateFixture4 = require('./test/game-state-4.json')
const gameStateFixture5 = require('./test/game-state-5.json')
const cards2Table = require('./cards-2-table')
const myStack = require('./my-stack')
const effectiveStack = require('./effective-stack')

// test.skip('correct card value',
//   function (t) {
//     t.equal(playerJs.toNum('J'), 11)
//     t.end()
//   }
// )

test('should work1', function (t) {
  Player.betRequest(gameStateFixture, function (bet) {
    console.log(bet)
    t.equals(bet, 0)
    t.end()
  })
})

test('should work2', function (t) {
  Player.betRequest(gameStateFixture2, function (bet) {
    t.equals(bet, 0)
    t.end()
  })
})

test('should work3', function (t) {
  Player.betRequest(gameStateFixture3, function (bet) {
    t.equals(bet, 0)
    t.end()
  })
})

test('should work4', function (t) {
  const myGameState = JSON.parse(JSON.stringify(gameStateFixture3))
  myGameState.pot = 150
  Player.betRequest(myGameState, function (bet) {
    t.equals(bet, 10000)
    t.end()
  })
})

test('should work5', function (t) {
  Player.betRequest(gameStateFixture5, function (bet) {
    t.equals(bet, 10000)
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
  t.equal(cards2Table.getPercentage(cards), 0.5)

  cards = [{rank: 'J', suit: 'spades'}, {rank: 'K', suit: 'spades'}]
  t.equal(cards2Table.getPercentage(cards), 12.2)

  cards = [{rank: 'A', suit: 'spades'}, {rank: 'Q', suit: 'clubs'}]
  t.equal(cards2Table.getPercentage(cards), 4.7)

  cards = [{rank: 'J', suit: 'spades'}, {rank: 'J', suit: 'clubs'}]
  t.equal(cards2Table.getPercentage(cards), 3)

  cards = [{rank: '8', suit: 'spades'}, {rank: '5', suit: 'clubs'}]
  t.equal(cards2Table.getPercentage(cards), 78.3)

  t.end()
})

test('my stack', (t) => {
  const resp = myStack.calculate(gameStateFixture)
  t.equal(resp, 79.5)
  console.log(resp)
  t.end()
})

test('eff stack 1', (t) => {
  const resp = effectiveStack.calculate(gameStateFixture)
  t.equal(resp, 1010 / 20)
  t.end()
})

test('eff stack 2', (t) => {
  const resp = effectiveStack.calculate(gameStateFixture4)
  t.equal(resp, 2132 / 3 / 20)
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
