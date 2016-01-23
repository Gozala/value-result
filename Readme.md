# value-result [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

This library provides facilities for managing `Result`s. A `Result` is a data value representing result of a computation that may fail.

`Result<error, value>` is the type used for returning and propagating errors. It is either `Ok<value>`, representing success and containing a `value` or an `Error<error>`, representing error and containing an `error` value.

`Result` is a handy for representing results of computations that may fail, most prominently used for I/O.

## Mapping

#### `map`

`map` can be used to apply a function to a result. If the result is `Ok`, it will be converted. If the result is an `Error`, the same error value will propagate through.

```js
Result.map(parseInt, Result.ok('17')) // => Ok(17)
Result
  .ok('17')
  .map(parseInt) // => Ok(17)

Result.map(parseInt, Result.error('Bad input')) // Error('Bad input')
Result
  .error('Bad input')
  .map(parseInt) // Error('Bad input')
```

## Chaining

#### `chain`

`chain` can be used to chain together a sequence of computations that may fail.

```js
const toValidMonth = month =>
  ( (month >= 1 && month <= 12)
  ? Result.ok(month)
  : Result.error("months must be between 1 and 12")
  )

const toInt = text => {
  const int = parseInt(text, 10)
  const result =
    ( (int | 0) === int
    ? Result.ok(int)
    : Result.error('Is not an Integer')
    )
  return result
}

Result.chain(toInt("9"), toValidMonth) // Ok(9)
toInt("4")
  .chain(toValidMonth) // => Ok(4)

toInt("a")
  .chain(toValidMonth) // => Error('Is not an Integer')

toInt("0")
  .chain(toValidMonth) // => Error('months must be between 1 and 12')
```

## Handling Errors

#### `withDefault`

`withDefault` can be used to extract the potential `Ok` value from the `Result`. But since `Result` maybe be an `Error` you need to provide a default `value` to be returned instead for such cases:

```js
Result.withDefault(0, toInt("123")) // => 123
toInt("abc")
  .withDefault(0) // => 0
```

`format` Format the error value of a result. If the result is Ok, it stays exactly the same, but if the result is an Err we will format the error. For example, say the errors we get have too much information:

#### `format`

`format` lets format the error value of a result. If the result is Ok, it stays exactly the same, but if the result is an Error it will format the error. For example, say the errors we get have too much information:

```js
const readInt = input => {
  const match = input.match(/[^\d]/);
  const result =
    ( match == null
    ? Result.ok(parseInt(input))
    : Result.error({
        message: `Character "${match[0]}" is not a number`,
        character: match[0],
        position: match.index
      })
    )
  return result
}

const toMessage = error =>
  error.message;

Result.format(toMessage, readInt("123")) // => Ok(123)
readInt("1234")
  .format(toMessage) // => Ok(1234)

readInt("abc")
  .format(toMessage) // => Error('Character "a" is not a number')
```

#### `capture`

`capture` can be used to control flow based on result values:

```js
const square = x => Result.ok(x * x)
const fail = x => Result.error(x - 10)

Result
  .ok(2)
  .capture(square)
  .capture(square) // => Ok(2)

Result
  .ok(2)
  .capture(fail)
  .capture(square) // => Ok(2)

Result
  .error(3)
  .capture(square)
  .capture(fail) // => Ok(9)

Result
  .error(3)
  .capture(fail)
  .capture(fail) // => Error(-17)
```

## Other

#### `and`

Returns `right` result if the `left` result is `Ok`, otherwise returns the `Error` value of the `left`.

```js
const two = Result.ok(2)
const late = Result.error("Late error")

two.and(late) // => Error('Late error')
Result.and(two, late) // => Error('Late error')

const early = Result.error("Early error")

early.and(two) // => Error('Early error')
Result.and(early, two) // => Error('Early error')

early.and(late) // => Error('Early error')
Result.and(early, late) // => Error('Early error')

const other = Result.ok("Another")

two.and(other) // => Ok("Another")
Result.and(two, other) // => Ok("Another")
```

#### `or`

Returns `right` if the result is `Error`, otherwise returns the `Ok` value of the `left`.

```js
const two = Result.ok(2)
const late = Result.error("Late error")

two.or(late) // => Ok(2)
Result.or(two, late) // => Ok(2)

const early = Result.error("Early error")

early.or(two) // => Ok(2)
Result.or(early, two) // => Ok(2)

early.or(late) // => Error('Late error')
Result.or(early, late) // => Error('Late error')

const other = Result.ok("Another")
two.or(other) // => Ok(2)
Result.or(two, other) // => Ok(2)
```

## Install

    npm install value-result

## Prior art

Library is pretty is inspired by:

- [Result][result-elm] type from [Elm][].
- [Result][result-rust] type from [Rust][].

[flow]:http://flowtype.org
[Elm]:http://elm-lang.org
[Rust]:http://rust-lang.org
[result-rust]:https://doc.rust-lang.org/std/result/index.html
[result-elm]:http://package.elm-lang.org/packages/elm-lang/core/3.0.0/Result

[npm-url]: https://npmjs.org/package/value-result
[npm-image]: https://img.shields.io/npm/v/value-result.svg?style=flat

[travis-url]: https://travis-ci.org/Gozala/value-result
[travis-image]: https://img.shields.io/travis/Gozala/value-result.svg?style=flat
