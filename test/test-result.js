/* @flow */

import test from "tape"
import * as Result from ".."

test('ok', test => {
  const result = Result.ok('foo')
  test.equal(result.isOk, true, "result is ok")
  test.equal(result.type, 'Ok', "result.type is Ok")

  // Note: We know `result.type` is `Ok` given the check above,
  // but we need to wrap next assertion in this if statement so
  // that to refine Result type to Ok type so that flow won't error.
  if (result.type === 'Ok') {
    test.equal(result.value, 'foo' , "result.value is 'foo'")
  }

  test.equal(result.isError, false, "result isn't error")
  test.equal(result.toString(), `Ok("foo")`, "Stringifies correctly")
  test.end()
})


test('error', test => {
  const result = Result.error('Boom!')
  test.equal(result.type, 'Error', "result.type is Error")
  test.equal(result.isError, true, "result is error")

  // Note: We know `result.type` is `Ok` given the check above,
  // but we need to wrap next assertion in this if statement so
  // that to refine Result type to Ok type so that flow won't error.
  if (result.type === 'Error') {
    test.equal(result.error, 'Boom!' , "result.error is 'Boom!'")
  }
  test.equal(result.isOk, false, "result isn't ok")
  test.equal(result.toString(), `Error("Boom!")`, "Stringifies correctly")

  test.end()
})

test('map', test => {
  test.isEquivalent
  ( Result.map(parseInt, Result.ok('17'))
  , Result.ok(17)
  )

  test.isEquivalent
  ( Result
    .ok('17')
    .map(parseInt)
  , Result.ok(17)
  )

  test.isEquivalent
  ( Result.map(parseInt, Result.error('Bad input'))
  , Result.error('Bad input')
  )

  test.isEquivalent
  ( Result
    .error('Bad input')
    .map(parseInt)
  , Result.error('Bad input')
  )

  test.end()
})

test('map2', test => {
  test.isEquivalent
  ( Result.map2
    ( (x, y) => x + y
    , Result.ok(1)
    , Result.ok(2)
    )
  , Result.ok(3)
  )

  test.isEquivalent
  ( Result.map2
    ( (x, y) => x + y
    , Result.ok(1)
    , Result.error('NaN')
    )
  , Result.error('NaN')
  )

  test.isEquivalent
  ( Result.map2
    ( (x, y) => x + y
    , Result.error('Boom')
    , Result.ok(2)
    )
  , Result.error('Boom')
  )

  test.isEquivalent
  ( Result.map2
    ( (x, y) => x + y
    , Result.error('Boom')
    , Result.error('NaN')
    )
  , Result.error('Boom')
  )

  test.end()
})

test('map3', test => {
  test.isEquivalent
  ( Result.map3
    ( (a, b, c) => a + b + c
    , Result.ok(1)
    , Result.ok(2)
    , Result.ok(10)
    )
  , Result.ok(13)
  )

  test.isEquivalent
  ( Result.map3
    ( (a, b, c) => a + b + c
    , Result.ok(1)
    , Result.error('NaN')
    , Result.ok(10)
    )
  , Result.error('NaN')
  )

  test.isEquivalent
  ( Result.map3
  ( (a, b, c) => a + b + c
    , Result.error('Boom')
    , Result.ok(2)
    , Result.ok(10)
    )
  , Result.error('Boom')
  )

  test.isEquivalent
  ( Result.map3
    ( (a, b, c) => a + b + c
    , Result.error('Boom')
    , Result.error('NaN')
    , Result.ok(10)
    )
  , Result.error('Boom')
  )

  test.isEquivalent
  ( Result.map3
    ( (a, b, c) => a + b + c
    , Result.ok(2)
    , Result.ok(10)
    , Result.error('Oops')
    )
  , Result.error('Oops')
  )

  test.end()
})

test("map4", test => {
  test.isEquivalent
  ( Result.map4
    ( (a, b, c, d) => a + b + c + d
    , Result.ok(1)
    , Result.ok(2)
    , Result.ok(10)
    , Result.ok(7)
    )
  , Result.ok(20)
  )

  test.isEquivalent
  ( Result.map4
    ( (a, b, c, d) => a + b + c + d
    , Result.ok(1)
    , Result.ok(2)
    , Result.error('Oops')
    , Result.ok(7)
    )
  , Result.error('Oops')
  )

  test.isEquivalent
  ( Result.map4
    ( (a, b, c, d) => a + b + c + d
    , Result.ok(1)
    , Result.ok(2)
    , Result.ok(7)
    , Result.error('Oops')
    )
  , Result.error('Oops')
  )


  test.isEquivalent
  ( Result.map4
    ( (a, b, c, d) => a + b + c + d
    , Result.ok(1)
    , Result.error('Oops')
    , Result.ok(2)
    , Result.error('Boom')
    )
  , Result.error('Oops')
  )

  test.end()
})

test("map5", test => {

  test.isEquivalent
  ( Result.map5
    ( (a, b, c, d, e) => a + b + c + d + e
    , Result.ok(1)
    , Result.ok(2)
    , Result.ok(10)
    , Result.ok(7)
    , Result.ok(3)
    )
  , Result.ok(23)
  )

  test.isEquivalent
  ( Result.map5
    ( (a, b, c, d, e) => a + b + c + d + e
    , Result.ok(1)
    , Result.ok(2)
    , Result.error('Oops')
    , Result.ok(7)
    , Result.ok(3)
    )
  , Result.error('Oops')
  )

  test.isEquivalent
  ( Result.map5
    ( (a, b, c, d, e) => a + b + c + d + e
    , Result.ok(1)
    , Result.ok(2)
    , Result.ok(7)
    , Result.ok(3)
    , Result.error('Oops')
    )
  , Result.error('Oops')
  )

  test.isEquivalent
  ( Result.map5
    ( (a, b, c, d, e) => a + b + c + d + e
    , Result.ok(1)
    , Result.error('Oops')
    , Result.ok(2)
    , Result.error('Boom')
    , Result.ok(7)
    )
  , Result.error('Oops')
  )

  test.end()
})

const toInt = text => {
  const int = parseInt(text, 10)
  const result =
    ( (int | 0) === int
    ? Result.ok(int)
    : Result.error('Is not an Integer')
    )
  return result
}


test('chain', test => {
  const toValidMonth = month =>
    ( (month >= 1 && month <= 12)
    ? Result.ok(month)
    : Result.error("months must be between 1 and 12")
    )


  test.isEquivalent
  ( Result.chain(toInt("9"), toValidMonth)
  , Result.ok(9)
  )

  test.isEquivalent
  ( toInt("4")
    .chain(toValidMonth)
  , Result.ok(4)
  )

  test.isEquivalent
  ( toInt("a")
    .chain(toValidMonth)
  , Result.error('Is not an Integer')
  )


  test.isEquivalent
  ( toInt("0")
    .chain(toValidMonth)
  , Result.error('months must be between 1 and 12')
  )

  test.end()
})


test('withDefault', test => {
  test.isEquivalent
  ( Result.withDefault(0, toInt("123"))
  , 123
  )

  test.isEquivalent
  ( toInt("abc")
    .withDefault(0)
  , 0
  )


  test.end()
})

const readInt = input => {
  const match = input.match(/[^\d]/);
  const result =
    ( match == null
    ? Result.ok(parseInt(input))
    : Result.error({
        message: `Character "${match[0]}" is not a number`,
        character: match[0]
      })
    )
  return result
}


test('format', test => {
  const toMessage = error =>
    error.message;

  test.isEquivalent
  ( Result.format(toMessage, readInt("123"))
  , Result.ok(123)
  )

  test.isEquivalent
  ( readInt("1234")
    .format(toMessage)
  , Result.ok(1234)
  )

  test.isEquivalent
  ( readInt("abc")
    .format(toMessage)
  , Result.error('Character "a" is not a number')
  )

  test.end()
})

test('capture', test => {
  const square = x => Result.ok(x * x)
  const fail = x => Result.error(x - 10)

  test.isEquivalent
  ( Result
    .ok(2)
    .capture(square)
    .capture(square)
  , Result.ok(2)
  )

  test.isEquivalent
  ( Result
    .ok(2)
    .capture(fail)
    .capture(square)
  , Result.ok(2)
  )

  test.isEquivalent
  ( Result
    .error(3)
    .capture(square)
    .capture(fail)
  , Result.ok(9)
  )

  test.isEquivalent
  ( Result
    .error(3)
    .capture(fail)
    .capture(fail)
  , Result.error(-17)
  )

  test.end()
})

test('and', test => {
  const two = Result.ok(2)
  const late = Result.error("Late error")

  test.isEquivalent
  ( two.and(late)
  , Result.error('Late error')
  )

  test.isEquivalent
  ( Result.and(two, late)
  , Result.error('Late error')
  )


  const early = Result.error("Early error")


  test.isEquivalent
  ( early.and(two)
  , Result.error('Early error')
  )

  test.isEquivalent
  ( Result.and(early, two)
  , Result.error('Early error')
  )

  test.isEquivalent
  ( early.and(late)
  , Result.error('Early error')
  )

  test.isEquivalent
  ( Result.and(early, late)
  , Result.error('Early error')
  )


  const other = Result.ok("Another")

  test.isEquivalent
  ( two.and(other)
  , Result.ok("Another")
  )


  test.isEquivalent
  ( Result.and(two, other)
  , Result.ok("Another")
  )

  test.end()
})


test('or', test => {
  const two = Result.ok(2)
  const late = Result.error("Late error")

  test.isEquivalent
  ( two.or(late)
  , Result.ok(2)
  )

  test.isEquivalent
  ( Result.or(two, late)
  , Result.ok(2)
  )

  const early = Result.error("Early error")

  test.isEquivalent
  ( early.or(two)
  , Result.ok(2)
  )

  test.isEquivalent
  ( Result.or(early, two)
  , Result.ok(2)
  )

  test.isEquivalent
  ( early.or(late)
  , Result.error('Late error')
  )

  test.isEquivalent
  ( Result.or(early, late)
  , Result.error('Late error')
  )

  const other = Result.ok("Another")

  test.isEquivalent
  ( two.or(other)
  , Result.ok(2)
  )

  test.isEquivalent
  ( Result.or(two, other)
  , Result.ok(2)
  )

  test.end()
})
